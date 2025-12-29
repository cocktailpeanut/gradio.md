#!/usr/bin/env node
'use strict';

const https = require('https');
const path = require('path');
const { mkdir, stat, writeFile } = require('fs/promises');

const REPO_OWNER = 'gradio-app';
const REPO_NAME = 'gradio';
const GUIDES_PATH = 'guides';
const DEFAULT_OUTPUT = 'gradio.md';
const INCLUDE_SOURCE_NOTES = true;
const STRIP_FRONTMATTER = true;
const CONCURRENCY = 6;

const ORDER_KEYS = ['order', 'weight', 'sidebar_position', 'position'];

function printUsage() {
  const text = [
    'Usage: npx gradio.md [output-path]',
    '',
    'If output-path is a directory, gradio.md will be created inside it.',
    'If omitted, the output is ./gradio.md.',
    '',
    'Environment:',
    '  GITHUB_TOKEN  Optional GitHub token for higher rate limits.',
  ].join('\n');
  console.log(text);
}

function parseArgs(argv) {
  const outputArgs = [];
  for (const arg of argv) {
    if (arg === '--help' || arg === '-h') {
      printUsage();
      process.exit(0);
    }
    if (arg.startsWith('-')) {
      throw new Error(`Unknown option: ${arg}`);
    }
    outputArgs.push(arg);
  }
  if (outputArgs.length > 1) {
    throw new Error('Too many arguments. Provide at most one output path.');
  }
  return { outputArg: outputArgs[0] || '' };
}

async function resolveOutputPath(input) {
  if (!input) {
    return path.resolve(process.cwd(), DEFAULT_OUTPUT);
  }

  const raw = input.trim();
  const resolved = path.resolve(process.cwd(), raw);
  const hasTrailingSeparator = /[\\/]+$/.test(raw);

  try {
    const stats = await stat(resolved);
    if (stats.isDirectory()) {
      return path.join(resolved, DEFAULT_OUTPUT);
    }
    return resolved;
  } catch (err) {
    if (!err || err.code !== 'ENOENT') {
      throw err;
    }
  }

  if (hasTrailingSeparator) {
    return path.join(resolved, DEFAULT_OUTPUT);
  }

  if (path.extname(resolved)) {
    return resolved;
  }

  return path.join(resolved, DEFAULT_OUTPUT);
}

function fetchOnce(url, headers) {
  return new Promise((resolve, reject) => {
    const options = new URL(url);
    options.headers = headers;

    const req = https.get(options, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode || 0,
          headers: res.headers,
          body: data,
        });
      });
    });

    req.on('error', (err) => reject(err));
  });
}

async function fetchRaw(url, headers, redirects = 0) {
  if (redirects > 5) {
    throw new Error(`Too many redirects for ${url}`);
  }
  const response = await fetchOnce(url, headers);
  if (response.status >= 300 && response.status < 400 && response.headers.location) {
    const nextUrl = new URL(response.headers.location, url).toString();
    return fetchRaw(nextUrl, headers, redirects + 1);
  }
  return response;
}

async function fetchJson(url, headers) {
  const response = await fetchRaw(url, headers);
  if (response.status < 200 || response.status >= 300) {
    const message = response.body ? response.body.slice(0, 300) : '';
    throw new Error(`Request failed (${response.status}) for ${url}. ${message}`);
  }
  return JSON.parse(response.body);
}

async function fetchText(url, headers) {
  const response = await fetchRaw(url, headers);
  if (response.status < 200 || response.status >= 300) {
    const message = response.body ? response.body.slice(0, 300) : '';
    throw new Error(`Request failed (${response.status}) for ${url}. ${message}`);
  }
  return response.body;
}

function splitFrontmatter(content) {
  const match = content.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/);
  if (!match) {
    return { frontmatter: null, body: content };
  }
  return {
    frontmatter: match[1],
    body: content.slice(match[0].length),
  };
}

function parseFrontmatter(raw) {
  if (!raw) {
    return {};
  }
  const data = {};
  const lines = raw.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    const match = trimmed.match(/^([A-Za-z0-9_-]+)\s*:\s*(.+)$/);
    if (!match) {
      continue;
    }
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    data[match[1]] = value;
  }
  return data;
}

function extractOrder(frontmatter) {
  for (const key of ORDER_KEYS) {
    if (Object.prototype.hasOwnProperty.call(frontmatter, key)) {
      const value = Number(String(frontmatter[key]).trim());
      if (Number.isFinite(value)) {
        return value;
      }
    }
  }
  return null;
}

function extractNumericPrefix(filePath) {
  const base = path.basename(filePath);
  const match = base.match(/^(\d+)[-_ .]/);
  if (!match) {
    return null;
  }
  const value = Number(match[1]);
  return Number.isFinite(value) ? value : null;
}

function isMarkdown(filePath) {
  return filePath.endsWith('.md') || filePath.endsWith('.mdx');
}

async function mapWithConcurrency(items, limit, mapper) {
  const results = new Array(items.length);
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const current = index;
      index += 1;
      results[current] = await mapper(items[current], current);
    }
  }

  const workers = [];
  const count = Math.min(limit, items.length);
  for (let i = 0; i < count; i += 1) {
    workers.push(worker());
  }
  await Promise.all(workers);
  return results;
}

function buildSortKey(entry) {
  const order = entry.orderValue !== null ? entry.orderValue : Number.POSITIVE_INFINITY;
  return {
    order,
    path: entry.path,
  };
}

async function main() {
  const { outputArg } = parseArgs(process.argv.slice(2));
  const outputPath = await resolveOutputPath(outputArg);
  const guidesPath = GUIDES_PATH;
  const owner = REPO_OWNER;
  const repo = REPO_NAME;

  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  const headers = {
    'User-Agent': 'gradio-guides-aggregator',
    Accept: 'application/vnd.github+json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  console.log(`Fetching repository metadata for ${owner}/${repo}...`);
  const repoInfo = await fetchJson(`https://api.github.com/repos/${owner}/${repo}`, headers);
  const branch = repoInfo.default_branch;
  if (!branch) {
    throw new Error('Unable to determine default branch.');
  }

  console.log(`Resolving tree for branch ${branch}...`);
  const branchInfo = await fetchJson(
    `https://api.github.com/repos/${owner}/${repo}/branches/${encodeURIComponent(branch)}`,
    headers
  );
  const treeSha = branchInfo.commit && branchInfo.commit.commit && branchInfo.commit.commit.tree && branchInfo.commit.commit.tree.sha;
  if (!treeSha) {
    throw new Error('Unable to resolve tree SHA for branch.');
  }

  const treeInfo = await fetchJson(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/${treeSha}?recursive=1`,
    headers
  );
  if (treeInfo.truncated) {
    console.warn('Warning: Git tree response truncated, results may be incomplete.');
  }

  const targetPrefix = `${guidesPath}/`;
  const guideEntries = (treeInfo.tree || []).filter((entry) => {
    return entry.type === 'blob' && entry.path.startsWith(targetPrefix) && isMarkdown(entry.path);
  });

  if (guideEntries.length === 0) {
    throw new Error(`No markdown files found under ${guidesPath}/.`);
  }

  console.log(`Found ${guideEntries.length} markdown files. Downloading...`);

  const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });

  const files = await mapWithConcurrency(guideEntries, CONCURRENCY, async (entry) => {
    const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${entry.path}`;
    const content = await fetchText(rawUrl, headers);
    const { frontmatter, body } = splitFrontmatter(content);
    const frontmatterData = parseFrontmatter(frontmatter);
    const orderValue = extractOrder(frontmatterData) ?? extractNumericPrefix(entry.path);

    return {
      path: entry.path,
      content,
      body,
      orderValue,
    };
  });

  files.sort((a, b) => {
    const aKey = buildSortKey(a);
    const bKey = buildSortKey(b);
    if (aKey.order !== bKey.order) {
      return aKey.order - bKey.order;
    }
    return collator.compare(aKey.path, bKey.path);
  });

  const sections = files.map((file) => {
    const content = STRIP_FRONTMATTER ? file.body : file.content;
    const cleaned = content.trimEnd();
    const note = INCLUDE_SOURCE_NOTES ? `<!-- Source: ${file.path} -->\n` : '';
    return `${note}${cleaned}`;
  });

  const output = `${sections.join('\n\n---\n\n')}\n`;
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, output, 'utf8');

  console.log(`Wrote ${files.length} guides to ${outputPath}`);
}

main().catch((err) => {
  console.error(`Error: ${err.message}`);
  process.exitCode = 1;
});
