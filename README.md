# gradio.md

Node.js CLI to crawl the Gradio GitHub repo, collect markdown files under the guides folder, and aggregate them into a single `gradio.md` file.

## Usage

### Basic

generate a `gradio.md` file in the current folder:

```bash
npx gradio.md
```

### Advanced

Generate to custom output path (directory or file):

```bash
npx gradio.md ./output                      => generate a gradio.md in ./output
npx gradio.md ./output/gradio.md            => generate ./output/gradio.md
npx gradio.md /absolute/path/to/gradio.md   => generate /absolute/path/to/gradio.md
```

Notes:
- Set `GITHUB_TOKEN` if you hit GitHub API rate limits.
- If the output path is a directory, `gradio.md` is created inside it.
- Ordering uses frontmatter keys (`order`, `weight`, `sidebar_position`, `position`) or a numeric filename prefix, then falls back to path sorting.
