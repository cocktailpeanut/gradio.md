<!-- Source: guides/02_building-interfaces/00_the-interface-class.md -->
# The `Interface` class

As mentioned in the [Quickstart](/main/guides/quickstart), the `gr.Interface` class is a high-level abstraction in Gradio that allows you to quickly create a demo for any Python function simply by specifying the input types and the output types. Revisiting our first demo:

$code_hello_world_4


We see that the `Interface` class is initialized with three required parameters:

- `fn`: the function to wrap a user interface (UI) around
- `inputs`: which Gradio component(s) to use for the input. The number of components should match the number of arguments in your function.
- `outputs`: which Gradio component(s) to use for the output. The number of components should match the number of return values from your function.

In this Guide, we'll dive into `gr.Interface` and the various ways it can be customized, but before we do that, let's get a better understanding of Gradio components.

## Gradio Components

Gradio includes more than 30 pre-built components (as well as many [community-built _custom components_](https://www.gradio.app/custom-components/gallery)) that can be used as inputs or outputs in your demo. These components correspond to common data types in machine learning and data science, e.g. the `gr.Image` component is designed to handle input or output images, the `gr.Label` component displays classification labels and probabilities, the `gr.LinePlot` component displays line plots, and so on. 

## Components Attributes

We used the default versions of the `gr.Textbox` and `gr.Slider`, but what if you want to change how the UI components look or behave?

Let's say you want to customize the slider to have values from 1 to 10, with a default of 2. And you wanted to customize the output text field — you want it to be larger and have a label.

If you use the actual classes for `gr.Textbox` and `gr.Slider` instead of the string shortcuts, you have access to much more customizability through component attributes.

$code_hello_world_2
$demo_hello_world_2

## Multiple Input and Output Components

Suppose you had a more complex function, with multiple outputs as well. In the example below, we define a function that takes a string, boolean, and number, and returns a string and number. 

$code_hello_world_3
$demo_hello_world_3

Just as each component in the `inputs` list corresponds to one of the parameters of the function, in order, each component in the `outputs` list corresponds to one of the values returned by the function, in order.

## An Image Example

Gradio supports many types of components, such as `Image`, `DataFrame`, `Video`, or `Label`. Let's try an image-to-image function to get a feel for these!

$code_sepia_filter
$demo_sepia_filter

When using the `Image` component as input, your function will receive a NumPy array with the shape `(height, width, 3)`, where the last dimension represents the RGB values. We'll return an image as well in the form of a NumPy array. 

Gradio handles the preprocessing and postprocessing to convert images to NumPy arrays and vice versa. You can also control the preprocessing performed with the `type=` keyword argument. For example, if you wanted your function to take a file path to an image instead of a NumPy array, the input `Image` component could be written as:

```python
gr.Image(type="filepath")
```

You can read more about the built-in Gradio components and how to customize them in the [Gradio docs](https://gradio.app/docs).

## Example Inputs

You can provide example data that a user can easily load into `Interface`. This can be helpful to demonstrate the types of inputs the model expects, as well as to provide a way to explore your dataset in conjunction with your model. To load example data, you can provide a **nested list** to the `examples=` keyword argument of the Interface constructor. Each sublist within the outer list represents a data sample, and each element within the sublist represents an input for each input component. The format of example data for each component is specified in the [Docs](https://gradio.app/docs#components).

$code_calculator
$demo_calculator

You can load a large dataset into the examples to browse and interact with the dataset through Gradio. The examples will be automatically paginated (you can configure this through the `examples_per_page` argument of `Interface`).

Continue learning about examples in the [More On Examples](https://gradio.app/guides/more-on-examples) guide.

## Descriptive Content

In the previous example, you may have noticed the `title=` and `description=` keyword arguments in the `Interface` constructor that helps users understand your app.

There are three arguments in the `Interface` constructor to specify where this content should go:

- `title`: which accepts text and can display it at the very top of interface, and also becomes the page title.
- `description`: which accepts text, markdown or HTML and places it right under the title.
- `article`: which also accepts text, markdown or HTML and places it below the interface.

![annotated](https://github.com/gradio-app/gradio/blob/main/guides/assets/annotated.png?raw=true)

Another useful keyword argument is `label=`, which is present in every `Component`. This modifies the label text at the top of each `Component`. You can also add the `info=` keyword argument to form elements like `Textbox` or `Radio` to provide further information on their usage.

```python
gr.Number(label='Age', info='In years, must be greater than 0')
```

## Additional Inputs within an Accordion

If your prediction function takes many inputs, you may want to hide some of them within a collapsed accordion to avoid cluttering the UI. The `Interface` class takes an `additional_inputs` argument which is similar to `inputs` but any input components included here are not visible by default. The user must click on the accordion to show these components. The additional inputs are passed into the prediction function, in order, after the standard inputs.

You can customize the appearance of the accordion by using the optional `additional_inputs_accordion` argument, which accepts a string (in which case, it becomes the label of the accordion), or an instance of the `gr.Accordion()` class (e.g. this lets you control whether the accordion is open or closed by default).

Here's an example:

$code_interface_with_additional_inputs
$demo_interface_with_additional_inputs

---

<!-- Source: guides/01_getting-started/01_quickstart.md -->
# Quickstart

Gradio is an open-source Python package that allows you to quickly **build** a demo or web application for your machine learning model, API, or any arbitrary Python function. You can then **share** a link to your demo or web application in just a few seconds using Gradio's built-in sharing features. *No JavaScript, CSS, or web hosting experience needed!*

<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/gif-version.gif" style="padding-bottom: 10px">

It just takes a few lines of Python to create your own demo, so let's get started 💫


## Installation

**Prerequisite**: Gradio requires [Python 3.10 or higher](https://www.python.org/downloads/).


We recommend installing Gradio using `pip`, which is included by default in Python. Run this in your terminal or command prompt:

```bash
pip install --upgrade gradio
```


Tip: It is best to install Gradio in a virtual environment. Detailed installation instructions for all common operating systems <a href="https://www.gradio.app/main/guides/installing-gradio-in-a-virtual-environment">are provided here</a>. 

## Building Your First Demo

You can run Gradio in your favorite code editor, Jupyter notebook, Google Colab, or anywhere else you write Python. Let's write your first Gradio app:


$code_hello_world_4


Tip: We shorten the imported name from <code>gradio</code> to <code>gr</code>. This is a widely adopted convention for better readability of code. 

Now, run your code. If you've written the Python code in a file named `app.py`, then you would run `python app.py` from the terminal.

The demo below will open in a browser on [http://localhost:7860](http://localhost:7860) if running from a file. If you are running within a notebook, the demo will appear embedded within the notebook.

$demo_hello_world_4

Type your name in the textbox on the left, drag the slider, and then press the Submit button. You should see a friendly greeting on the right.

Tip: When developing locally, you can run your Gradio app in <strong>hot reload mode</strong>, which automatically reloads the Gradio app whenever you make changes to the file. To do this, simply type in <code>gradio</code> before the name of the file instead of <code>python</code>. In the example above, you would type: `gradio app.py` in your terminal. You can also enable <strong>vibe mode</strong> by using the <code>--vibe</code> flag, e.g. <code>gradio --vibe app.py</code>, which provides an in-browser chat that can be used to write or edit your Gradio app using natural language. Learn more in the <a href="https://www.gradio.app/guides/developing-faster-with-reload-mode">Hot Reloading Guide</a>.


**Understanding the `Interface` Class**

You'll notice that in order to make your first demo, you created an instance of the `gr.Interface` class. The `Interface` class is designed to create demos for machine learning models which accept one or more inputs, and return one or more outputs. 

The `Interface` class has three core arguments:

- `fn`: the function to wrap a user interface (UI) around
- `inputs`: the Gradio component(s) to use for the input. The number of components should match the number of arguments in your function.
- `outputs`: the Gradio component(s) to use for the output. The number of components should match the number of return values from your function.

The `fn` argument is very flexible -- you can pass *any* Python function that you want to wrap with a UI. In the example above, we saw a relatively simple function, but the function could be anything from a music generator to a tax calculator to the prediction function of a pretrained machine learning model.

The `inputs` and `outputs` arguments take one or more Gradio components. As we'll see, Gradio includes more than [30 built-in components](https://www.gradio.app/docs/gradio/introduction) (such as the `gr.Textbox()`, `gr.Image()`, and `gr.HTML()` components) that are designed for machine learning applications. 

Tip: For the `inputs` and `outputs` arguments, you can pass in the name of these components as a string (`"textbox"`) or an instance of the class (`gr.Textbox()`).

If your function accepts more than one argument, as is the case above, pass a list of input components to `inputs`, with each input component corresponding to one of the arguments of the function, in order. The same holds true if your function returns more than one value: simply pass in a list of components to `outputs`. This flexibility makes the `Interface` class a very powerful way to create demos.

We'll dive deeper into the `gr.Interface` on our series on [building Interfaces](https://www.gradio.app/main/guides/the-interface-class).

## Sharing Your Demo

What good is a beautiful demo if you can't share it? Gradio lets you easily share a machine learning demo without having to worry about the hassle of hosting on a web server. Simply set `share=True` in `launch()`, and a publicly accessible URL will be created for your demo. Let's revisit our example demo,  but change the last line as follows:

```python
import gradio as gr

def greet(name):
    return "Hello " + name + "!"

demo = gr.Interface(fn=greet, inputs="textbox", outputs="textbox")
    
demo.launch(share=True)  # Share your demo with just 1 extra parameter 🚀
```

When you run this code, a public URL will be generated for your demo in a matter of seconds, something like:

👉 &nbsp; `https://a23dsf231adb.gradio.live`

Now, anyone around the world can try your Gradio demo from their browser, while the machine learning model and all computation continues to run locally on your computer.

To learn more about sharing your demo, read our dedicated guide on [sharing your Gradio application](https://www.gradio.app/guides/sharing-your-app).


## An Overview of Gradio

So far, we've been discussing the `Interface` class, which is a high-level class that lets you build demos quickly with Gradio. But what else does Gradio include?

### Custom Demos with `gr.Blocks`

Gradio offers a low-level approach for designing web apps with more customizable layouts and data flows with the `gr.Blocks` class. Blocks supports things like controlling where components appear on the page, handling multiple data flows and more complex interactions (e.g. outputs can serve as inputs to other functions), and updating properties/visibility of components based on user interaction — still all in Python. 

You can build very custom and complex applications using `gr.Blocks()`. For example, the popular image generation [Automatic1111 Web UI](https://github.com/AUTOMATIC1111/stable-diffusion-webui) is built using Gradio Blocks. We dive deeper into the `gr.Blocks` on our series on [building with Blocks](https://www.gradio.app/guides/blocks-and-event-listeners).

### Chatbots with `gr.ChatInterface`

Gradio includes another high-level class, `gr.ChatInterface`, which is specifically designed to create Chatbot UIs. Similar to `Interface`, you supply a function and Gradio creates a fully working Chatbot UI. If you're interested in creating a chatbot, you can jump straight to [our dedicated guide on `gr.ChatInterface`](https://www.gradio.app/guides/creating-a-chatbot-fast).

### The Gradio Python & JavaScript Ecosystem

That's the gist of the core `gradio` Python library, but Gradio is actually so much more! It's an entire ecosystem of Python and JavaScript libraries that let you build machine learning applications, or query them programmatically, in Python or JavaScript. Here are other related parts of the Gradio ecosystem:

* [Gradio Python Client](https://www.gradio.app/guides/getting-started-with-the-python-client) (`gradio_client`): query any Gradio app programmatically in Python.
* [Gradio JavaScript Client](https://www.gradio.app/guides/getting-started-with-the-js-client) (`@gradio/client`): query any Gradio app programmatically in JavaScript.
* [Hugging Face Spaces](https://huggingface.co/spaces): the most popular place to host Gradio applications — for free!

## What's Next?

Keep learning about Gradio sequentially using the Gradio Guides, which include explanations as well as example code and embedded interactive demos. Next up: [let's dive deeper into the Interface class](https://www.gradio.app/guides/the-interface-class).

Or, if you already know the basics and are looking for something specific, you can search the more [technical API documentation](https://www.gradio.app/docs/).


## Gradio Sketch

You can also build Gradio applications without writing any code. Simply type `gradio sketch` into your terminal to open up an editor that lets you define and modify Gradio components, adjust their layouts, add events, all through a web editor. Or [use this hosted version of Gradio Sketch, running on Hugging Face Spaces](https://huggingface.co/spaces/aliabid94/Sketch).

---

<!-- Source: guides/02_building-interfaces/01_more-on-examples.md -->
# More on Examples

In the [previous Guide](/main/guides/the-interface-class), we discussed how to provide example inputs for your demo to make it easier for users to try it out. Here, we dive into more details.

## Providing Examples

Adding examples to an Interface is as easy as providing a list of lists to the `examples`
keyword argument.
Each sublist is a data sample, where each element corresponds to an input of the prediction function.
The inputs must be ordered in the same order as the prediction function expects them.

If your interface only has one input component, then you can provide your examples as a regular list instead of a list of lists.

### Loading Examples from a Directory

You can also specify a path to a directory containing your examples. If your Interface takes only a single file-type input, e.g. an image classifier, you can simply pass a directory filepath to the `examples=` argument, and the `Interface` will load the images in the directory as examples.
In the case of multiple inputs, this directory must
contain a log.csv file with the example values.
In the context of the calculator demo, we can set `examples='/demo/calculator/examples'` and in that directory we include the following `log.csv` file:

```csv
num,operation,num2
5,"add",3
4,"divide",2
5,"multiply",3
```

This can be helpful when browsing flagged data. Simply point to the flagged directory and the `Interface` will load the examples from the flagged data.

### Providing Partial Examples

Sometimes your app has many input components, but you would only like to provide examples for a subset of them. In order to exclude some inputs from the examples, pass `None` for all data samples corresponding to those particular components.

## Caching examples

You may wish to provide some cached examples of your model for users to quickly try out, in case your model takes a while to run normally.
If `cache_examples=True`, your Gradio app will run all of the examples and save the outputs when you call the `launch()` method. This data will be saved in a directory called `gradio_cached_examples` in your working directory by default. You can also set this directory with the `GRADIO_EXAMPLES_CACHE` environment variable, which can be either an absolute path or a relative path to your working directory.

Whenever a user clicks on an example, the output will automatically be populated in the app now, using data from this cached directory instead of actually running the function. This is useful so users can quickly try out your model without adding any load!

Alternatively, you can set `cache_examples="lazy"`. This means that each particular example will only get cached after it is first used (by any user) in the Gradio app. This is helpful if your prediction function is long-running and you do not want to wait a long time for your Gradio app to start.

Keep in mind once the cache is generated, it will not be updated automatically in future launches. If the examples or function logic change, delete the cache folder to clear the cache and rebuild it with another `launch()`.

---

<!-- Source: guides/03_building-with-blocks/01_blocks-and-event-listeners.md -->
# Blocks and Event Listeners

We briefly described the Blocks class in the [Quickstart](/main/guides/quickstart#custom-demos-with-gr-blocks) as a way to build custom demos. Let's dive deeper. 


## Blocks Structure

Take a look at the demo below.

$code_hello_blocks
$demo_hello_blocks

- First, note the `with gr.Blocks() as demo:` clause. The Blocks app code will be contained within this clause.
- Next come the Components. These are the same Components used in `Interface`. However, instead of being passed to some constructor, Components are automatically added to the Blocks as they are created within the `with` clause.
- Finally, the `click()` event listener. Event listeners define the data flow within the app. In the example above, the listener ties the two Textboxes together. The Textbox `name` acts as the input and Textbox `output` acts as the output to the `greet` method. This dataflow is triggered when the Button `greet_btn` is clicked. Like an Interface, an event listener can take multiple inputs or outputs.

You can also attach event listeners using decorators - skip the `fn` argument and assign `inputs` and `outputs` directly:

$code_hello_blocks_decorator

## Event Listeners and Interactivity

In the example above, you'll notice that you are able to edit Textbox `name`, but not Textbox `output`. This is because any Component that acts as an input to an event listener is made interactive. However, since Textbox `output` acts only as an output, Gradio determines that it should not be made interactive. You can override the default behavior and directly configure the interactivity of a Component with the boolean `interactive` keyword argument, e.g. `gr.Textbox(interactive=True)`.

```python
output = gr.Textbox(label="Output", interactive=True)
```

_Note_: What happens if a Gradio component is neither an input nor an output? If a component is constructed with a default value, then it is presumed to be displaying content and is rendered non-interactive. Otherwise, it is rendered interactive. Again, this behavior can be overridden by specifying a value for the `interactive` argument.

## Types of Event Listeners

Take a look at the demo below:

$code_blocks_hello
$demo_blocks_hello

Instead of being triggered by a click, the `welcome` function is triggered by typing in the Textbox `inp`. This is due to the `change()` event listener. Different Components support different event listeners. For example, the `Video` Component supports a `play()` event listener, triggered when a user presses play. See the [Docs](http://gradio.app/docs#components) for the event listeners for each Component.

## Multiple Data Flows

A Blocks app is not limited to a single data flow the way Interfaces are. Take a look at the demo below:

$code_reversible_flow
$demo_reversible_flow

Note that `num1` can act as input to `num2`, and also vice-versa! As your apps get more complex, you will have many data flows connecting various Components.

Here's an example of a "multi-step" demo, where the output of one model (a speech-to-text model) gets fed into the next model (a sentiment classifier).

$code_blocks_speech_text_sentiment
$demo_blocks_speech_text_sentiment

## Function Input List vs Dict

The event listeners you've seen so far have a single input component. If you'd like to have multiple input components pass data to the function, you have two options on how the function can accept input component values:

1. as a list of arguments, or
2. as a single dictionary of values, keyed by the component

Let's see an example of each:
$code_calculator_list_and_dict

Both `add()` and `sub()` take `a` and `b` as inputs. However, the syntax is different between these listeners.

1. To the `add_btn` listener, we pass the inputs as a list. The function `add()` takes each of these inputs as arguments. The value of `a` maps to the argument `num1`, and the value of `b` maps to the argument `num2`.
2. To the `sub_btn` listener, we pass the inputs as a set (note the curly brackets!). The function `sub()` takes a single dictionary argument `data`, where the keys are the input components, and the values are the values of those components.

It is a matter of preference which syntax you prefer! For functions with many input components, option 2 may be easier to manage.

$demo_calculator_list_and_dict

## Function Return List vs Dict

Similarly, you may return values for multiple output components either as:

1. a list of values, or
2. a dictionary keyed by the component

Let's first see an example of (1), where we set the values of two output components by returning two values:

```python
with gr.Blocks() as demo:
    food_box = gr.Number(value=10, label="Food Count")
    status_box = gr.Textbox()

    def eat(food):
        if food > 0:
            return food - 1, "full"
        else:
            return 0, "hungry"

    gr.Button("Eat").click(
        fn=eat,
        inputs=food_box,
        outputs=[food_box, status_box]
    )
```

Above, each return statement returns two values corresponding to `food_box` and `status_box`, respectively.

**Note:** if your event listener has a single output component, you should **not** return it as a single-item list. This will not work, since Gradio does not know whether to interpret that outer list as part of your return value. You should instead just return that value directly.

Now, let's see option (2). Instead of returning a list of values corresponding to each output component in order, you can also return a dictionary, with the key corresponding to the output component and the value as the new value. This also allows you to skip updating some output components.

```python
with gr.Blocks() as demo:
    food_box = gr.Number(value=10, label="Food Count")
    status_box = gr.Textbox()

    def eat(food):
        if food > 0:
            return {food_box: food - 1, status_box: "full"}
        else:
            return {status_box: "hungry"}

    gr.Button("Eat").click(
        fn=eat,
        inputs=food_box,
        outputs=[food_box, status_box]
    )
```

Notice how when there is no food, we only update the `status_box` element. We skipped updating the `food_box` component.

Dictionary returns are helpful when an event listener affects many components on return, or conditionally affects outputs and not others.

Keep in mind that with dictionary returns, we still need to specify the possible outputs in the event listener.

## Updating Component Configurations

The return value of an event listener function is usually the updated value of the corresponding output Component. Sometimes we want to update the configuration of the Component as well, such as the visibility. In this case, we return a new Component, setting the properties we want to change.

$code_blocks_essay_simple
$demo_blocks_essay_simple

See how we can configure the Textbox itself through a new `gr.Textbox()` method. The `value=` argument can still be used to update the value along with Component configuration. Any arguments we do not set will preserve their previous values.

## Not Changing a Component's Value

In some cases, you may want to leave a component's value unchanged. Gradio includes a special function, `gr.skip()`, which can be returned from your function. Returning this function will keep the output component (or components') values as is. Let us illustrate with an example:

$code_skip
$demo_skip

Note the difference between returning `None` (which generally resets a component's value to an empty state) versus returning `gr.skip()`, which leaves the component value unchanged.

Tip: if you have multiple output components, and you want to leave all of their values unchanged, you can just return a single `gr.skip()` instead of returning a tuple of skips, one for each element.

## Running Events Consecutively

You can also run events consecutively by using the `then` method of an event listener. This will run an event after the previous event has finished running. This is useful for running events that update components in multiple steps.

For example, in the chatbot example below, we first update the chatbot with the user message immediately, and then update the chatbot with the computer response after a simulated delay.

$code_chatbot_consecutive
$demo_chatbot_consecutive

The `.then()` method of an event listener executes the subsequent event regardless of whether the previous event raised any errors. If you'd like to only run subsequent events if the previous event executed successfully, use the `.success()` method, which takes the same arguments as `.then()`. Conversely, if you'd like to only run subsequent events if the previous event failed (i.e., raised an error), use the `.failure()` method. This is particularly useful for error handling workflows, such as displaying error messages or restoring previous states when an operation fails.

## Binding Multiple Triggers to a Function

Often times, you may want to bind multiple triggers to the same function. For example, you may want to allow a user to click a submit button, or press enter to submit a form. You can do this using the `gr.on` method and passing a list of triggers to the `trigger`.

$code_on_listener_basic
$demo_on_listener_basic

You can use decorator syntax as well:

$code_on_listener_decorator

You can use `gr.on` to create "live" events by binding to the `change` event of components that implement it. If you do not specify any triggers, the function will automatically bind to all `change` event of all input components that include a `change` event (for example `gr.Textbox` has a `change` event whereas `gr.Button` does not).

$code_on_listener_live
$demo_on_listener_live

You can follow `gr.on` with `.then`, just like any regular event listener. This handy method should save you from having to write a lot of repetitive code!

## Binding a Component Value Directly to a Function of Other Components

If you want to set a Component's value to always be a function of the value of other Components, you can use the following shorthand:

```python
with gr.Blocks() as demo:
  num1 = gr.Number()
  num2 = gr.Number()
  product = gr.Number(lambda a, b: a * b, inputs=[num1, num2])
```

This functionally the same as:
```python
with gr.Blocks() as demo:
  num1 = gr.Number()
  num2 = gr.Number()
  product = gr.Number()

  gr.on(
    [num1.change, num2.change, demo.load], 
    lambda a, b: a * b, 
    inputs=[num1, num2], 
    outputs=product
  )
```

---

<!-- Source: guides/04_additional-features/01_queuing.md -->
# Queuing

Every Gradio app comes with a built-in queuing system that can scale to thousands of concurrent users. Because many of your event listeners may involve heavy processing, Gradio automatically creates a queue to handle every event listener in the backend. Every event listener in your app automatically has a queue to process incoming events.

## Configuring the Queue

By default, each event listener has its own queue, which handles one request at a time. This can be configured via two arguments:

- `concurrency_limit`: This sets the maximum number of concurrent executions for an event listener. By default, the limit is 1 unless configured otherwise in `Blocks.queue()`. You can also set it to `None` for no limit (i.e., an unlimited number of concurrent executions). For example:

```python
import gradio as gr

with gr.Blocks() as demo:
    prompt = gr.Textbox()
    image = gr.Image()
    generate_btn = gr.Button("Generate Image")
    generate_btn.click(image_gen, prompt, image, concurrency_limit=5)
```

In the code above, up to 5 requests can be processed simultaneously for this event listener. Additional requests will be queued until a slot becomes available.

If you want to manage multiple event listeners using a shared queue, you can use the `concurrency_id` argument:

- `concurrency_id`: This allows event listeners to share a queue by assigning them the same ID. For example, if your setup has only 2 GPUs but multiple functions require GPU access, you can create a shared queue for all those functions. Here's how that might look:

```python
import gradio as gr

with gr.Blocks() as demo:
    prompt = gr.Textbox()
    image = gr.Image()
    generate_btn_1 = gr.Button("Generate Image via model 1")
    generate_btn_2 = gr.Button("Generate Image via model 2")
    generate_btn_3 = gr.Button("Generate Image via model 3")
    generate_btn_1.click(image_gen_1, prompt, image, concurrency_limit=2, concurrency_id="gpu_queue")
    generate_btn_2.click(image_gen_2, prompt, image, concurrency_id="gpu_queue")
    generate_btn_3.click(image_gen_3, prompt, image, concurrency_id="gpu_queue")
```

In this example, all three event listeners share a queue identified by `"gpu_queue"`. The queue can handle up to 2 concurrent requests at a time, as defined by the `concurrency_limit`.

### Notes

- To ensure unlimited concurrency for an event listener, set `concurrency_limit=None`.  This is useful if your function is calling e.g. an external API which handles the rate limiting of requests itself.
- The default concurrency limit for all queues can be set globally using the `default_concurrency_limit` parameter in `Blocks.queue()`. 

These configurations make it easy to manage the queuing behavior of your Gradio app.

---

<!-- Source: guides/05_chatbots/01_creating-a-chatbot-fast.md -->
# How to Create a Chatbot with Gradio

Tags: LLM, CHATBOT, NLP

## Introduction

Chatbots are a popular application of large language models (LLMs). Using Gradio, you can easily build a chat application and share that with your users, or try it yourself using an intuitive UI.

This tutorial uses `gr.ChatInterface()`, which is a high-level abstraction that allows you to create your chatbot UI fast, often with a _few lines of Python_. It can be easily adapted to support multimodal chatbots, or chatbots that require further customization.

**Prerequisites**: please make sure you are using the latest version of Gradio:

```bash
$ pip install --upgrade gradio
```

## Note for OpenAI-API compatible endpoints

If you have a chat server serving an OpenAI-API compatible endpoint (such as Ollama), you can spin up a ChatInterface in a single line of Python. First, also run `pip install openai`. Then, with your own URL, model, and optional token:

```python
import gradio as gr

gr.load_chat("http://localhost:11434/v1/", model="llama3.2", token="***").launch()
```

Read about `gr.load_chat` in [the docs](https://www.gradio.app/docs/gradio/load_chat). If you have your own model, keep reading to see how to create an application around any chat model in Python!

## Defining a chat function

To create a chat application with `gr.ChatInterface()`, the first thing you should do is define your **chat function**. In the simplest case, your chat function should accept two arguments: `message` and `history` (the arguments can be named anything, but must be in this order).

- `message`: a `str` representing the user's most recent message.
- `history`: a list of openai-style dictionaries with `role` and `content` keys, representing the previous conversation history. May also include additional keys representing message metadata.

The `history` would look like this:

```python
[
    {"role": "user", "content": [{"type": "text", "text": "What is the capital of France?"}]},
    {"role": "assistant", "content": [{"type": "text", "text": "Paris"}]}
]
```

while the next `message` would be:

```py
"And what is its largest city?"
```

Your chat function simply needs to return: 

* a `str` value, which is the chatbot's response based on the chat `history` and most recent `message`, for example, in this case:

```
Paris is also the largest city.
```

Let's take a look at a few example chat functions:

**Example: a chatbot that randomly responds with yes or no**

Let's write a chat function that responds `Yes` or `No` randomly.

Here's our chat function:

```python
import random

def random_response(message, history):
    return random.choice(["Yes", "No"])
```

Now, we can plug this into `gr.ChatInterface()` and call the `.launch()` method to create the web interface:

```python
import gradio as gr

gr.ChatInterface(
    fn=random_response, 
).launch()
```

That's it! Here's our running demo, try it out:

$demo_chatinterface_random_response

**Example: a chatbot that alternates between agreeing and disagreeing**

Of course, the previous example was very simplistic, it didn't take user input or the previous history into account! Here's another simple example showing how to incorporate a user's input as well as the history.

```python
import gradio as gr

def alternatingly_agree(message, history):
    if len([h for h in history if h['role'] == "assistant"]) % 2 == 0:
        return f"Yes, I do think that: {message}"
    else:
        return "I don't think so"

gr.ChatInterface(
    fn=alternatingly_agree, 
).launch()
```

We'll look at more realistic examples of chat functions in our next Guide, which shows [examples of using `gr.ChatInterface` with popular LLMs](../guides/chatinterface-examples). 

## Streaming chatbots

In your chat function, you can use `yield` to generate a sequence of partial responses, each replacing the previous ones. This way, you'll end up with a streaming chatbot. It's that simple!

```python
import time
import gradio as gr

def slow_echo(message, history):
    for i in range(len(message)):
        time.sleep(0.3)
        yield "You typed: " + message[: i+1]

gr.ChatInterface(
    fn=slow_echo, 
).launch()
```

While the response is streaming, the "Submit" button turns into a "Stop" button that can be used to stop the generator function.

Tip: Even though you are yielding the latest message at each iteration, Gradio only sends the "diff" of each message from the server to the frontend, which reduces latency and data consumption over your network.

## Customizing the Chat UI

If you're familiar with Gradio's `gr.Interface` class, the `gr.ChatInterface` includes many of the same arguments that you can use to customize the look and feel of your Chatbot. For example, you can:

- add a title and description above your chatbot using `title` and `description` arguments.
- add a theme or custom css using `theme` and `css` arguments respectively in the `launch()` method.
- add `examples` and even enable `cache_examples`, which make your Chatbot easier for users to try it out.
- customize the chatbot (e.g. to change the height or add a placeholder) or textbox (e.g. to add a max number of characters or add a placeholder).

**Adding examples**

You can add preset examples to your `gr.ChatInterface` with the `examples` parameter, which takes a list of string examples. Any examples will appear as "buttons" within the Chatbot before any messages are sent. If you'd like to include images or other files as part of your examples, you can do so by using this dictionary format for each example instead of a string: `{"text": "What's in this image?", "files": ["cheetah.jpg"]}`. Each file will be a separate message that is added to your Chatbot history.

You can change the displayed text for each example by using the `example_labels` argument. You can add icons to each example as well using the `example_icons` argument. Both of these arguments take a list of strings, which should be the same length as the `examples` list.

If you'd like to cache the examples so that they are pre-computed and the results appear instantly, set `cache_examples=True`.

**Customizing the chatbot or textbox component**

If you want to customize the `gr.Chatbot` or `gr.Textbox` that compose the `ChatInterface`, then you can pass in your own chatbot or textbox components. Here's an example of how we to apply the parameters we've discussed in this section:

```python
import gradio as gr

def yes_man(message, history):
    if message.endswith("?"):
        return "Yes"
    else:
        return "Ask me anything!"

gr.ChatInterface(
    yes_man,
    chatbot=gr.Chatbot(height=300),
    textbox=gr.Textbox(placeholder="Ask me a yes or no question", container=False, scale=7),
    title="Yes Man",
    description="Ask Yes Man any question",
    examples=["Hello", "Am I cool?", "Are tomatoes vegetables?"],
    cache_examples=True,
).launch(theme="ocean")
```

Here's another example that adds a "placeholder" for your chat interface, which appears before the user has started chatting. The `placeholder` argument of `gr.Chatbot` accepts Markdown or HTML:

```python
gr.ChatInterface(
    yes_man,
    chatbot=gr.Chatbot(placeholder="<strong>Your Personal Yes-Man</strong><br>Ask Me Anything"),
...
```

The placeholder appears vertically and horizontally centered in the chatbot.

## Multimodal Chat Interface

You may want to add multimodal capabilities to your chat interface. For example, you may want users to be able to upload images or files to your chatbot and ask questions about them. You can make your chatbot "multimodal" by passing in a single parameter (`multimodal=True`) to the `gr.ChatInterface` class.

When `multimodal=True`, the signature of your chat function changes slightly: the first parameter of your function (what we referred to as `message` above) should accept a dictionary consisting of the submitted text and uploaded files that looks like this: 

```py
{
    "text": "user input", 
    "files": [
        "updated_file_1_path.ext",
        "updated_file_2_path.ext", 
        ...
    ]
}
```

This second parameter of your chat function, `history`, will be in the same openai-style dictionary format as before. However, if the history contains uploaded files, the `content` key will be a dictionary with a "type" key whose value is "file" and the file will be represented as a dictionary. All the files will be grouped in message in the history. So after uploading two files and asking a question, your history might look like this:

```python
[
    {"role": "user", "content": [{"type": "file", "file": {"path": "cat1.png"}},
                                 {"type": "file", "file": {"path": "cat1.png"}},
                                 {"type": "text", "text": "What's the difference between these two images?"}]}
]
```

The return type of your chat function does *not change* when setting `multimodal=True` (i.e. in the simplest case, you should still return a string value). We discuss more complex cases, e.g. returning files [below](#returning-complex-responses).

If you are customizing a multimodal chat interface, you should pass in an instance of `gr.MultimodalTextbox` to the `textbox` parameter. You can customize the `MultimodalTextbox` further by passing in the `sources` parameter, which is a list of sources to enable. Here's an example that illustrates how to set up and customize and multimodal chat interface:
 

```python
import gradio as gr

def count_images(message, history):
    num_images = len(message["files"])
    total_images = 0
    for message in history:
        for content in message["content"]:
            if content["type"] == "file":
                total_images += 1
    return f"You just uploaded {num_images} images, total uploaded: {total_images+num_images}"

demo = gr.ChatInterface(
    fn=count_images, 
    examples=[
        {"text": "No files", "files": []}
    ], 
    multimodal=True,
    textbox=gr.MultimodalTextbox(file_count="multiple", file_types=["image"], sources=["upload", "microphone"])
)

demo.launch()
```

## Additional Inputs

You may want to add additional inputs to your chat function and expose them to your users through the chat UI. For example, you could add a textbox for a system prompt, or a slider that sets the number of tokens in the chatbot's response. The `gr.ChatInterface` class supports an `additional_inputs` parameter which can be used to add additional input components.

The `additional_inputs` parameters accepts a component or a list of components. You can pass the component instances directly, or use their string shortcuts (e.g. `"textbox"` instead of `gr.Textbox()`). If you pass in component instances, and they have _not_ already been rendered, then the components will appear underneath the chatbot within a `gr.Accordion()`. 

Here's a complete example:

$code_chatinterface_system_prompt

If the components you pass into the `additional_inputs` have already been rendered in a parent `gr.Blocks()`, then they will _not_ be re-rendered in the accordion. This provides flexibility in deciding where to lay out the input components. In the example below, we position the `gr.Textbox()` on top of the Chatbot UI, while keeping the slider underneath.

```python
import gradio as gr
import time

def echo(message, history, system_prompt, tokens):
    response = f"System prompt: {system_prompt}\n Message: {message}."
    for i in range(min(len(response), int(tokens))):
        time.sleep(0.05)
        yield response[: i+1]

with gr.Blocks() as demo:
    system_prompt = gr.Textbox("You are helpful AI.", label="System Prompt")
    slider = gr.Slider(10, 100, render=False)

    gr.ChatInterface(
        echo, additional_inputs=[system_prompt, slider],
    )

demo.launch()
```

**Examples with additional inputs**

You can also add example values for your additional inputs. Pass in a list of lists to the `examples` parameter, where each inner list represents one sample, and each inner list should be `1 + len(additional_inputs)` long. The first element in the inner list should be the example value for the chat message, and each subsequent element should be an example value for one of the additional inputs, in order. When additional inputs are provided, examples are rendered in a table underneath the chat interface.

If you need to create something even more custom, then its best to construct the chatbot UI using the low-level `gr.Blocks()` API. We have [a dedicated guide for that here](/guides/creating-a-custom-chatbot-with-blocks).

## Additional Outputs

In the same way that you can accept additional inputs into your chat function, you can also return additional outputs. Simply pass in a list of components to the `additional_outputs` parameter in `gr.ChatInterface` and return additional values for each component from your chat function. Here's an example that extracts code and outputs it into a separate `gr.Code` component:

$code_chatinterface_artifacts

**Note:** unlike the case of additional inputs, the components passed in `additional_outputs` must be already defined in your `gr.Blocks` context -- they are not rendered automatically. If you need to render them after your `gr.ChatInterface`, you can set `render=False` when they are first defined and then `.render()` them in the appropriate section of your `gr.Blocks()` as we do in the example above.

## Returning Complex Responses

We mentioned earlier that in the simplest case, your chat function should return a `str` response, which will be rendered as Markdown in the chatbot. However, you can also return more complex responses as we discuss below:


**Returning files or Gradio components**

Currently, the following Gradio components can be displayed inside the chat interface:
* `gr.Image`
* `gr.Plot`
* `gr.Audio`
* `gr.HTML`
* `gr.Video`
* `gr.Gallery`
* `gr.File`

Simply return one of these components from your function to use it with `gr.ChatInterface`. Here's an example that returns an audio file:

```py
import gradio as gr

def music(message, history):
    if message.strip():
        return gr.Audio("https://github.com/gradio-app/gradio/raw/main/test/test_files/audio_sample.wav")
    else:
        return "Please provide the name of an artist"

gr.ChatInterface(
    music,
    textbox=gr.Textbox(placeholder="Which artist's music do you want to listen to?", scale=7),
).launch()
```

Similarly, you could return image files with `gr.Image`, video files with `gr.Video`, or arbitrary files with the `gr.File` component.

**Returning Multiple Messages**

You can return multiple assistant messages from your chat function simply by returning a `list` of messages, each of which is a valid chat type. This lets you, for example, send a message along with files, as in the following example:

$code_chatinterface_echo_multimodal


**Displaying intermediate thoughts or tool usage**

The `gr.ChatInterface` class supports displaying intermediate thoughts or tool usage direct in the chatbot.

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/nested-thought.png)

 To do this, you will need to return a `gr.ChatMessage` object from your chat function. Here is the schema of the `gr.ChatMessage` data class as well as two internal typed dictionaries:
 
 ```py
MessageContent = Union[str, FileDataDict, FileData, Component]

@dataclass
class ChatMessage:
    content: MessageContent | list[MessageContent]
    metadata: MetadataDict = None
    options: list[OptionDict] = None

class MetadataDict(TypedDict):
    title: NotRequired[str]
    id: NotRequired[int | str]
    parent_id: NotRequired[int | str]
    log: NotRequired[str]
    duration: NotRequired[float]
    status: NotRequired[Literal["pending", "done"]]

class OptionDict(TypedDict):
    label: NotRequired[str]
    value: str
 ```
 
As you can see, the `gr.ChatMessage` dataclass is similar to the openai-style message format, e.g. it has a "content" key that refers to the chat message content. But it also includes a "metadata" key whose value is a dictionary. If this dictionary includes a "title" key, the resulting message is displayed as an intermediate thought with the title being displayed on top of the thought. Here's an example showing the usage:

$code_chatinterface_thoughts

You can even show nested thoughts, which is useful for agent demos in which one tool may call other tools. To display nested thoughts, include "id" and "parent_id" keys in the "metadata" dictionary. Read our [dedicated guide on displaying intermediate thoughts and tool usage](/guides/agents-and-tool-usage) for more realistic examples.

**Providing preset responses**

When returning an assistant message, you may want to provide preset options that a user can choose in response. To do this, again, you will again return a `gr.ChatMessage` instance from your chat function. This time, make sure to set the `options` key specifying the preset responses.

As shown in the schema for `gr.ChatMessage` above, the value corresponding to the `options` key should be a list of dictionaries, each with a `value` (a string that is the value that should be sent to the chat function when this response is clicked) and an optional `label` (if provided, is the text displayed as the preset response instead of the `value`). 

This example illustrates how to use preset responses:

$code_chatinterface_options

## Modifying the Chatbot Value Directly

You may wish to modify the value of the chatbot with your own events, other than those prebuilt in the `gr.ChatInterface`. For example, you could create a dropdown that prefills the chat history with certain conversations or add a separate button to clear the conversation history. The `gr.ChatInterface` supports these events, but you need to use the `gr.ChatInterface.chatbot_value` as the input or output component in such events. In this example, we use a `gr.Radio` component to prefill the the chatbot with certain conversations:

$code_chatinterface_prefill

## Using Your Chatbot via API

Once you've built your Gradio chat interface and are hosting it on [Hugging Face Spaces](https://hf.space) or somewhere else, then you can query it with a simple API. The API route will be the name of the function you pass to the ChatInterface. So if `gr.ChatInterface(respond)`, then the API route is `/respond`. The endpoint just expects the user's message and will return the response, internally keeping track of the message history.

![](https://github.com/gradio-app/gradio/assets/1778297/7b10d6db-6476-4e2e-bebd-ecda802c3b8f)

To use the endpoint, you should use either the [Gradio Python Client](/guides/getting-started-with-the-python-client) or the [Gradio JS client](/guides/getting-started-with-the-js-client). Or, you can deploy your Chat Interface to other platforms, such as a:

* Slack bot [[tutorial]](../guides/creating-a-slack-bot-from-a-gradio-app)
* Website widget [[tutorial]](../guides/creating-a-website-widget-from-a-gradio-chatbot)

## Chat History

You can enable persistent chat history for your ChatInterface, allowing users to maintain multiple conversations and easily switch between them. When enabled, conversations are stored locally and privately in the user's browser using local storage. So if you deploy a ChatInterface e.g. on [Hugging Face Spaces](https://hf.space), each user will have their own separate chat history that won't interfere with other users' conversations. This means multiple users can interact with the same ChatInterface simultaneously while maintaining their own private conversation histories.

To enable this feature, simply set `gr.ChatInterface(save_history=True)` (as shown in the example in the next section). Users will then see their previous conversations in a side panel and can continue any previous chat or start a new one.

## Collecting User Feedback

To gather feedback on your chat model, set `gr.ChatInterface(flagging_mode="manual")` and users will be able to thumbs-up or thumbs-down assistant responses. Each flagged response, along with the entire chat history, will get saved in a CSV file in the app working directory (this can be configured via the `flagging_dir` parameter). 

You can also change the feedback options via `flagging_options` parameter. The default options are "Like" and "Dislike", which appear as the thumbs-up and thumbs-down icons. Any other options appear under a dedicated flag icon. This example shows a ChatInterface that has both chat history (mentioned in the previous section) and user feedback enabled:

$code_chatinterface_streaming_echo

Note that in this example, we set several flagging options: "Like", "Spam", "Inappropriate", "Other". Because the case-sensitive string "Like" is one of the flagging options, the user will see a thumbs-up icon next to each assistant message. The three other flagging options will appear in a dropdown under the flag icon.

## What's Next?

Now that you've learned about the `gr.ChatInterface` class and how it can be used to create chatbot UIs quickly, we recommend reading one of the following:

* [Our next Guide](../guides/chatinterface-examples) shows examples of how to use `gr.ChatInterface` with popular LLM libraries.
* If you'd like to build very custom chat applications from scratch, you can build them using the low-level Blocks API, as [discussed in this Guide](../guides/creating-a-custom-chatbot-with-blocks).
* Once you've deployed your Gradio Chat Interface, its easy to use in other applications because of the built-in API. Here's a tutorial on [how to deploy a Gradio chat interface as a Discord bot](../guides/creating-a-discord-bot-from-a-gradio-app).

---

<!-- Source: guides/06_data-science-and-plots/01_creating-plots.md -->
# Creating Plots

Gradio is a great way to create extremely customizable dashboards. Gradio comes with three native Plot components: `gr.LinePlot`, `gr.ScatterPlot` and `gr.BarPlot`. All these plots have the same API. Let's take a look how to set them up.

## Creating a Plot with a pd.Dataframe

Plots accept a pandas Dataframe as their value. The plot also takes `x` and `y` which represent the names of the columns that represent the x and y axes respectively. Here's a simple example:

$code_plot_guide_line
$demo_plot_guide_line

All plots have the same API, so you could swap this out with a `gr.ScatterPlot`:

$code_plot_guide_scatter
$demo_plot_guide_scatter

The y axis column in the dataframe should have a numeric type, but the x axis column can be anything from strings, numbers, categories, or datetimes.

$code_plot_guide_scatter_nominal
$demo_plot_guide_scatter_nominal

## Breaking out Series by Color

You can break out your plot into series using the `color` argument.

$code_plot_guide_series_nominal
$demo_plot_guide_series_nominal

If you wish to assign series specific colors, use the `color_map` arg, e.g. `gr.ScatterPlot(..., color_map={'white': '#FF9988', 'asian': '#88EEAA', 'black': '#333388'})`

The color column can be numeric type as well.

$code_plot_guide_series_quantitative
$demo_plot_guide_series_quantitative

## Aggregating Values

You can aggregate values into groups using the `x_bin` and `y_aggregate` arguments. If your x-axis is numeric, providing an `x_bin` will create a histogram-style binning:

$code_plot_guide_aggregate_quantitative
$demo_plot_guide_aggregate_quantitative

If your x-axis is a string type instead, they will act as the category bins automatically:

$code_plot_guide_aggregate_nominal
$demo_plot_guide_aggregate_nominal

## Selecting Regions

You can use the `.select` listener to select regions of a plot. Click and drag on the plot below to select part of the plot.

$code_plot_guide_selection
$demo_plot_guide_selection

You can combine this and the `.double_click` listener to create some zoom in/out effects by changing `x_lim` which sets the bounds of the x-axis:

$code_plot_guide_zoom
$demo_plot_guide_zoom

If you had multiple plots with the same x column, your event listeners could target the x limits of all other plots so that the x-axes stay in sync.

$code_plot_guide_zoom_sync
$demo_plot_guide_zoom_sync

## Making an Interactive Dashboard

Take a look how you can have an interactive dashboard where the plots are functions of other Components.

$code_plot_guide_interactive
$demo_plot_guide_interactive

It's that simple to filter and control the data presented in your visualization!

---

<!-- Source: guides/07_streaming/01_streaming-ai-generated-audio.md -->
# Streaming AI Generated Audio

Tags: AUDIO, STREAMING

In this guide, we'll build a novel AI application to showcase Gradio's audio output streaming. We're going to a build a talking [Magic 8 Ball](https://en.wikipedia.org/wiki/Magic_8_Ball) 🎱

A Magic 8 Ball is a toy that answers any question after you shake it. Our application will do the same but it will also speak its response!

We won't cover all the implementation details in this blog post but the code is freely available on [Hugging Face Spaces](https://huggingface.co/spaces/gradio/magic-8-ball).

## The Overview

Just like the classic Magic 8 Ball, a user should ask it a question orally and then wait for a response. Under the hood, we'll use Whisper to transcribe the audio and then use an LLM to generate a magic-8-ball-style answer. Finally, we'll use Parler TTS to read the response aloud.

## The UI

First let's define the UI and put placeholders for all the python logic.

```python
import gradio as gr

with gr.Blocks() as block:
    gr.HTML(
        f"""
        <h1 style='text-align: center;'> Magic 8 Ball 🎱 </h1>
        <h3 style='text-align: center;'> Ask a question and receive wisdom </h3>
        <p style='text-align: center;'> Powered by <a href="https://github.com/huggingface/parler-tts"> Parler-TTS</a>
        """
    )
    with gr.Group():
        with gr.Row():
            audio_out = gr.Audio(label="Spoken Answer", streaming=True, autoplay=True)
            answer = gr.Textbox(label="Answer")
            state = gr.State()
        with gr.Row():
            audio_in = gr.Audio(label="Speak your question", sources="microphone", type="filepath")

    audio_in.stop_recording(generate_response, audio_in, [state, answer, audio_out])\
        .then(fn=read_response, inputs=state, outputs=[answer, audio_out])

block.launch()
```

We're placing the output Audio and Textbox components and the input Audio component in separate rows. In order to stream the audio from the server, we'll set `streaming=True` in the output Audio component. We'll also set `autoplay=True` so that the audio plays as soon as it's ready.
We'll be using the Audio input component's `stop_recording` event to trigger our application's logic when a user stops recording from their microphone.

We're separating the logic into two parts. First, `generate_response` will take the recorded audio, transcribe it and generate a response with an LLM. We're going to store the response in a `gr.State` variable that then gets passed to the `read_response` function that generates the audio.

We're doing this in two parts because only `read_response` will require a GPU. Our app will run on Hugging Faces [ZeroGPU](https://huggingface.co/zero-gpu-explorers) which has time-based quotas. Since generating the response can be done with Hugging Face's Inference API, we shouldn't include that code in our GPU function as it will needlessly use our GPU quota.

## The Logic

As mentioned above, we'll use [Hugging Face's Inference API](https://huggingface.co/docs/huggingface_hub/guides/inference) to transcribe the audio and generate a response from an LLM. After instantiating the client, I use the `automatic_speech_recognition` method (this automatically uses Whisper running on Hugging Face's Inference Servers) to transcribe the audio. Then I pass the question to an LLM (Mistal-7B-Instruct) to generate a response. We are prompting the LLM to act like a magic 8 ball with the system message.

Our `generate_response` function will also send empty updates to the output textbox and audio components (returning `None`). 
This is because I want the Gradio progress tracker to be displayed over the components but I don't want to display the answer until the audio is ready.


```python
from huggingface_hub import InferenceClient

client = InferenceClient(token=os.getenv("HF_TOKEN"))

def generate_response(audio):
    gr.Info("Transcribing Audio", duration=5)
    question = client.automatic_speech_recognition(audio).text

    messages = [{"role": "system", "content": ("You are a magic 8 ball."
                                              "Someone will present to you a situation or question and your job "
                                              "is to answer with a cryptic adage or proverb such as "
                                              "'curiosity killed the cat' or 'The early bird gets the worm'."
                                              "Keep your answers short and do not include the phrase 'Magic 8 Ball' in your response. If the question does not make sense or is off-topic, say 'Foolish questions get foolish answers.'"
                                              "For example, 'Magic 8 Ball, should I get a dog?', 'A dog is ready for you but are you ready for the dog?'")},
                {"role": "user", "content": f"Magic 8 Ball please answer this question -  {question}"}]
    
    response = client.chat_completion(messages, max_tokens=64, seed=random.randint(1, 5000),
                                      model="mistralai/Mistral-7B-Instruct-v0.3")

    response = response.choices[0].message.content.replace("Magic 8 Ball", "").replace(":", "")
    return response, None, None
```


Now that we have our text response, we'll read it aloud with Parler TTS. The `read_response` function will be a python generator that yields the next chunk of audio as it's ready.


We'll be using the [Mini v0.1](https://huggingface.co/parler-tts/parler_tts_mini_v0.1) for the feature extraction but the [Jenny fine tuned version](https://huggingface.co/parler-tts/parler-tts-mini-jenny-30H) for the voice. This is so that the voice is consistent across generations.


Streaming audio with transformers requires a custom Streamer class. You can see the implementation [here](https://huggingface.co/spaces/gradio/magic-8-ball/blob/main/streamer.py). Additionally, we'll convert the output to bytes so that it can be streamed faster from the backend. 


```python
from streamer import ParlerTTSStreamer
from transformers import AutoTokenizer, AutoFeatureExtractor, set_seed
import numpy as np
import spaces
import torch
from threading import Thread


device = "cuda:0" if torch.cuda.is_available() else "mps" if torch.backends.mps.is_available() else "cpu"
torch_dtype = torch.float16 if device != "cpu" else torch.float32

repo_id = "parler-tts/parler_tts_mini_v0.1"

jenny_repo_id = "ylacombe/parler-tts-mini-jenny-30H"

model = ParlerTTSForConditionalGeneration.from_pretrained(
    jenny_repo_id, torch_dtype=torch_dtype, low_cpu_mem_usage=True
).to(device)

tokenizer = AutoTokenizer.from_pretrained(repo_id)
feature_extractor = AutoFeatureExtractor.from_pretrained(repo_id)

sampling_rate = model.audio_encoder.config.sampling_rate
frame_rate = model.audio_encoder.config.frame_rate

@spaces.GPU
def read_response(answer):

    play_steps_in_s = 2.0
    play_steps = int(frame_rate * play_steps_in_s)

    description = "Jenny speaks at an average pace with a calm delivery in a very confined sounding environment with clear audio quality."
    description_tokens = tokenizer(description, return_tensors="pt").to(device)

    streamer = ParlerTTSStreamer(model, device=device, play_steps=play_steps)
    prompt = tokenizer(answer, return_tensors="pt").to(device)

    generation_kwargs = dict(
        input_ids=description_tokens.input_ids,
        prompt_input_ids=prompt.input_ids,
        streamer=streamer,
        do_sample=True,
        temperature=1.0,
        min_new_tokens=10,
    )

    set_seed(42)
    thread = Thread(target=model.generate, kwargs=generation_kwargs)
    thread.start()

    for new_audio in streamer:
        print(f"Sample of length: {round(new_audio.shape[0] / sampling_rate, 2)} seconds")
        yield answer, numpy_to_mp3(new_audio, sampling_rate=sampling_rate)
```

## Conclusion

You can see our final application [here](https://huggingface.co/spaces/gradio/magic-8-ball)!

---

<!-- Source: guides/08_custom-components/01_custom-components-in-five-minutes.md -->
# Custom Components in 5 minutes

Gradio includes the ability for developers to create their own custom components and use them in Gradio apps. You can publish your components as Python packages so that other users can use them as well.

Users will be able to use all of Gradio's existing functions, such as `gr.Blocks`, `gr.Interface`, API usage, themes, etc. with Custom Components. This guide will cover how to get started making custom components.

## Installation

You will need to have:

* Python 3.10+ (<a href="https://www.python.org/downloads/" target="_blank">install here</a>)
* pip 21.3+ (`python -m pip install --upgrade pip`)
* Node.js 20+ (<a href="https://nodejs.dev/en/download/package-manager/" target="_blank">install here</a>)
* npm 9+ (<a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/" target="_blank">install here</a>)
* Gradio 5+ (`pip install --upgrade gradio`)

## The Workflow

The Custom Components workflow consists of 4 steps: create, dev, build, and publish.

1. create: creates a template for you to start developing a custom component.
2. dev: launches a development server with a sample app & hot reloading allowing you to easily develop your custom component
3. build: builds a python package containing to your custom component's Python and JavaScript code -- this makes things official!
4. publish: uploads your package to [PyPi](https://pypi.org/) and/or a sample app to [HuggingFace Spaces](https://hf.co/spaces).

Each of these steps is done via the Custom Component CLI. You can invoke it with `gradio cc` or `gradio component`

Tip: Run `gradio cc --help` to get a help menu of all available commands. There are some commands that are not covered in this guide. You can also append `--help` to any command name to bring up a help page for that command, e.g. `gradio cc create --help`.

## 1. create

Bootstrap a new template by running the following in any working directory:

```bash
gradio cc create MyComponent --template SimpleTextbox
```

Instead of `MyComponent`, give your component any name.

Instead of `SimpleTextbox`, you can use any Gradio component as a template. `SimpleTextbox` is actually a special component that a stripped-down version of the `Textbox` component that makes it particularly useful when creating your first custom component.
Some other components that are good if you are starting out: `SimpleDropdown`, `SimpleImage`, or `File`.

Tip: Run `gradio cc show` to get a list of available component templates.

The `create` command will:

1. Create a directory with your component's name in lowercase with the following structure:
```directory
- backend/ <- The python code for your custom component
- frontend/ <- The javascript code for your custom component
- demo/ <- A sample app using your custom component. Modify this to develop your component!
- pyproject.toml <- Used to build the package and specify package metadata.
```

2. Install the component in development mode

Each of the directories will have the code you need to get started developing!

## 2. dev

Once you have created your new component, you can start a development server by `entering the directory` and running

```bash
gradio cc dev
```

You'll see several lines that are printed to the console.
The most important one is the one that says:

> Frontend Server (Go here): http://localhost:7861/

The port number might be different for you.
Click on that link to launch the demo app in hot reload mode.
Now, you can start making changes to the backend and frontend you'll see the results reflected live in the sample app!
We'll go through a real example in a later guide.

Tip: You don't have to run dev mode from your custom component directory. The first argument to `dev` mode is the path to the directory. By default it uses the current directory.

## 3. build

Once you are satisfied with your custom component's implementation, you can `build` it to use it outside of the development server.

From your component directory, run:

```bash
gradio cc build
```

This will create a `tar.gz` and `.whl` file in a `dist/` subdirectory.
If you or anyone installs that `.whl` file (`pip install <path-to-whl>`) they will be able to use your custom component in any gradio app!

The `build` command will also generate documentation for your custom component. This takes the form of an interactive space and a static `README.md`. You can disable this by passing `--no-generate-docs`. You can read more about the documentation generator in [the dedicated guide](https://gradio.app/guides/documenting-custom-components).

## 4. publish

Right now, your package is only available on a `.whl` file on your computer.
You can share that file with the world with the `publish` command!

Simply run the following command from your component directory:

```bash
gradio cc publish
```

This will guide you through the following process:

1. Upload your distribution files to PyPi. This makes it easier to upload the demo to Hugging Face spaces. Otherwise your package must be at a publicly available url. If you decide to upload to PyPi, you will need a PyPI username and password. You can get one [here](https://pypi.org/account/register/).
2. Upload a demo of your component to hugging face spaces. This is also optional.


Here is an example of what publishing looks like:

<video autoplay muted loop>
  <source src="https://gradio-builds.s3.amazonaws.com/assets/text_with_attachments_publish.mov" type="video/mp4" />
</video>


## Conclusion

Now that you know the high-level workflow of creating custom components, you can go in depth in the next guides!
After reading the guides, check out this [collection](https://huggingface.co/collections/gradio/custom-components-65497a761c5192d981710b12) of custom components on the HuggingFace Hub so you can learn from other's code.

Tip: If you want to start off from someone else's custom component see this [guide](./frequently-asked-questions#do-i-always-need-to-start-my-component-from-scratch).

---

<!-- Source: guides/09_gradio-clients-and-lite/01_getting-started-with-the-python-client.md -->
# Getting Started with the Gradio Python client

Tags: CLIENT, API, SPACES

The Gradio Python client makes it very easy to use any Gradio app as an API. As an example, consider this [Hugging Face Space that transcribes audio files](https://huggingface.co/spaces/abidlabs/whisper) that are recorded from the microphone.

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/whisper-screenshot.jpg)

Using the `gradio_client` library, we can easily use the Gradio as an API to transcribe audio files programmatically.

Here's the entire code to do it:

```python
from gradio_client import Client, handle_file

client = Client("abidlabs/whisper")

client.predict(
    audio=handle_file("audio_sample.wav")
)

>> "This is a test of the whisper speech recognition model."
```

The Gradio client works with any hosted Gradio app! Although the Client is mostly used with apps hosted on [Hugging Face Spaces](https://hf.space), your app can be hosted anywhere, such as your own server.

**Prerequisites**: To use the Gradio client, you do _not_ need to know the `gradio` library in great detail. However, it is helpful to have general familiarity with Gradio's concepts of input and output components.

## Installation

If you already have a recent version of `gradio`, then the `gradio_client` is included as a dependency. But note that this documentation reflects the latest version of the `gradio_client`, so upgrade if you're not sure!

The lightweight `gradio_client` package can be installed from pip (or pip3) and is tested to work with **Python versions 3.10 or higher**:

```bash
$ pip install --upgrade gradio_client
```

## Connecting to a Gradio App on Hugging Face Spaces

Start by connecting instantiating a `Client` object and connecting it to a Gradio app that is running on Hugging Face Spaces.

```python
from gradio_client import Client

client = Client("abidlabs/en2fr")  # a Space that translates from English to French
```

You can also connect to private Spaces by passing in your HF token with the `token` parameter. You can get your HF token here: https://huggingface.co/settings/tokens

```python
from gradio_client import Client

client = Client("abidlabs/my-private-space", token="...")
```


## Duplicating a Space for private use

While you can use any public Space as an API, you may get rate limited by Hugging Face if you make too many requests. For unlimited usage of a Space, simply duplicate the Space to create a private Space,
and then use it to make as many requests as you'd like!

The `gradio_client` includes a class method: `Client.duplicate()` to make this process simple (you'll need to pass in your [Hugging Face token](https://huggingface.co/settings/tokens) or be logged in using the Hugging Face CLI):

```python
import os
from gradio_client import Client, handle_file

HF_TOKEN = os.environ.get("HF_TOKEN")

client = Client.duplicate("abidlabs/whisper", token=HF_TOKEN)
client.predict(handle_file("audio_sample.wav"))

>> "This is a test of the whisper speech recognition model."
```

If you have previously duplicated a Space, re-running `duplicate()` will _not_ create a new Space. Instead, the Client will attach to the previously-created Space. So it is safe to re-run the `Client.duplicate()` method multiple times.

**Note:** if the original Space uses GPUs, your private Space will as well, and your Hugging Face account will get billed based on the price of the GPU. To minimize charges, your Space will automatically go to sleep after 1 hour of inactivity. You can also set the hardware using the `hardware` parameter of `duplicate()`.

## Connecting a general Gradio app

If your app is running somewhere else, just provide the full URL instead, including the "http://" or "https://". Here's an example of making predictions to a Gradio app that is running on a share URL:

```python
from gradio_client import Client

client = Client("https://bec81a83-5b5c-471e.gradio.live")
```

## Connecting to a Gradio app with auth

If the Gradio application you are connecting to [requires a username and password](/guides/sharing-your-app#authentication), then provide them as a tuple to the `auth` argument of the `Client` class:

```python
from gradio_client import Client

Client(
  space_name,
  auth=[username, password]
)
```


## Inspecting the API endpoints

Once you have connected to a Gradio app, you can view the APIs that are available to you by calling the `Client.view_api()` method. For the Whisper Space, we see the following:

```bash
Client.predict() Usage Info
---------------------------
Named API endpoints: 1

 - predict(audio, api_name="/predict") -> output
    Parameters:
     - [Audio] audio: filepath (required)  
    Returns:
     - [Textbox] output: str 
```

We see  that we have 1 API endpoint in this space, and shows us how to use the API endpoint to make a prediction: we should call the `.predict()` method (which we will explore below), providing a parameter `input_audio` of type `str`, which is a `filepath or URL`.

We should also provide the `api_name='/predict'` argument to the `predict()` method. Although this isn't necessary if a Gradio app has only 1 named endpoint, it does allow us to call different endpoints in a single app if they are available.

## The "View API" Page

As an alternative to running the `.view_api()` method, you can click on the "Use via API" link in the footer of the Gradio app, which shows us the same information, along with example usage. 

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/view-api.png)

The View API page also includes an "API Recorder" that lets you interact with the Gradio UI normally and converts your interactions into the corresponding code to run with the Python Client.

## Making a prediction

The simplest way to make a prediction is simply to call the `.predict()` function with the appropriate arguments:

```python
from gradio_client import Client

client = Client("abidlabs/en2fr")
client.predict("Hello", api_name='/predict')

>> Bonjour
```

If there are multiple parameters, then you should pass them as separate arguments to `.predict()`, like this:

```python
from gradio_client import Client

client = Client("gradio/calculator")
client.predict(4, "add", 5)

>> 9.0
```

It is recommended to provide key-word arguments instead of positional arguments:


```python
from gradio_client import Client

client = Client("gradio/calculator")
client.predict(num1=4, operation="add", num2=5)

>> 9.0
```

This allows you to take advantage of default arguments. For example, this Space includes the default value for the Slider component so you do not need to provide it when accessing it with the client.

```python
from gradio_client import Client

client = Client("abidlabs/image_generator")
client.predict(text="an astronaut riding a camel")
```

The default value is the initial value of the corresponding Gradio component. If the component does not have an initial value, but if the corresponding argument in the predict function has a default value of `None`, then that parameter is also optional in the client. Of course, if you'd like to override it, you can include it as well:

```python
from gradio_client import Client

client = Client("abidlabs/image_generator")
client.predict(text="an astronaut riding a camel", steps=25)
```

For providing files or URLs as inputs, you should pass in the filepath or URL to the file enclosed within `gradio_client.handle_file()`. This takes care of uploading the file to the Gradio server and ensures that the file is preprocessed correctly:

```python
from gradio_client import Client, handle_file

client = Client("abidlabs/whisper")
client.predict(
    audio=handle_file("https://audio-samples.github.io/samples/mp3/blizzard_unconditional/sample-0.mp3")
)

>> "My thought I have nobody by a beauty and will as you poured. Mr. Rochester is serve in that so don't find simpus, and devoted abode, to at might in a r—"
```

## Running jobs asynchronously

One should note that `.predict()` is a _blocking_ operation as it waits for the operation to complete before returning the prediction.

In many cases, you may be better off letting the job run in the background until you need the results of the prediction. You can do this by creating a `Job` instance using the `.submit()` method, and then later calling `.result()` on the job to get the result. For example:

```python
from gradio_client import Client

client = Client(space="abidlabs/en2fr")
job = client.submit("Hello", api_name="/predict")  # This is not blocking

# Do something else

job.result()  # This is blocking

>> Bonjour
```

## Adding callbacks

Alternatively, one can add one or more callbacks to perform actions after the job has completed running, like this:

```python
from gradio_client import Client

def print_result(x):
    print("The translated result is: {x}")

client = Client(space="abidlabs/en2fr")

job = client.submit("Hello", api_name="/predict", result_callbacks=[print_result])

# Do something else

>> The translated result is: Bonjour

```

## Status

The `Job` object also allows you to get the status of the running job by calling the `.status()` method. This returns a `StatusUpdate` object with the following attributes: `code` (the status code, one of a set of defined strings representing the status. See the `utils.Status` class), `rank` (the current position of this job in the queue), `queue_size` (the total queue size), `eta` (estimated time this job will complete), `success` (a boolean representing whether the job completed successfully), and `time` (the time that the status was generated).

```py
from gradio_client import Client

client = Client(src="gradio/calculator")
job = client.submit(5, "add", 4, api_name="/predict")
job.status()

>> <Status.STARTING: 'STARTING'>
```

_Note_: The `Job` class also has a `.done()` instance method which returns a boolean indicating whether the job has completed.

## Cancelling Jobs

The `Job` class also has a `.cancel()` instance method that cancels jobs that have been queued but not started. For example, if you run:

```py
client = Client("abidlabs/whisper")
job1 = client.submit(handle_file("audio_sample1.wav"))
job2 = client.submit(handle_file("audio_sample2.wav"))
job1.cancel()  # will return False, assuming the job has started
job2.cancel()  # will return True, indicating that the job has been canceled
```

If the first job has started processing, then it will not be canceled. If the second job
has not yet started, it will be successfully canceled and removed from the queue.

## Generator Endpoints

Some Gradio API endpoints do not return a single value, rather they return a series of values. You can get the series of values that have been returned at any time from such a generator endpoint by running `job.outputs()`:

```py
from gradio_client import Client

client = Client(src="gradio/count_generator")
job = client.submit(3, api_name="/count")
while not job.done():
    time.sleep(0.1)
job.outputs()

>> ['0', '1', '2']
```

Note that running `job.result()` on a generator endpoint only gives you the _first_ value returned by the endpoint.

The `Job` object is also iterable, which means you can use it to display the results of a generator function as they are returned from the endpoint. Here's the equivalent example using the `Job` as a generator:

```py
from gradio_client import Client

client = Client(src="gradio/count_generator")
job = client.submit(3, api_name="/count")

for o in job:
    print(o)

>> 0
>> 1
>> 2
```

You can also cancel jobs that that have iterative outputs, in which case the job will finish as soon as the current iteration finishes running.

```py
from gradio_client import Client
import time

client = Client("abidlabs/test-yield")
job = client.submit("abcdef")
time.sleep(3)
job.cancel()  # job cancels after 2 iterations
```

## Demos with Session State

Gradio demos can include [session state](https://www.gradio.app/guides/state-in-blocks), which provides a way for demos to persist information from user interactions within a page session.

For example, consider the following demo, which maintains a list of words that a user has submitted in a `gr.State` component. When a user submits a new word, it is added to the state, and the number of previous occurrences of that word is displayed:

```python
import gradio as gr

def count(word, list_of_words):
    return list_of_words.count(word), list_of_words + [word]

with gr.Blocks() as demo:
    words = gr.State([])
    textbox = gr.Textbox()
    number = gr.Number()
    textbox.submit(count, inputs=[textbox, words], outputs=[number, words])
    
demo.launch()
```

If you were to connect this this Gradio app using the Python Client, you would notice that the API information only shows a single input and output:

```csv
Client.predict() Usage Info
---------------------------
Named API endpoints: 1

 - predict(word, api_name="/count") -> value_31
    Parameters:
     - [Textbox] word: str (required)  
    Returns:
     - [Number] value_31: float 
```

That is because the Python client handles state automatically for you -- as you make a series of requests, the returned state from one request is stored internally and automatically supplied for the subsequent request. If you'd like to reset the state, you can do that by calling `Client.reset_session()`.

---

<!-- Source: guides/10_mcp/01_building-mcp-server-with-gradio.md -->
# Building an MCP Server with Gradio

Tags: MCP, TOOL, LLM, SERVER

In this guide, we will describe how to launch your Gradio app so that it functions as an MCP Server.

Punchline: it's as simple as setting `mcp_server=True` in `.launch()`. 

### Prerequisites

If not already installed, please install Gradio with the MCP extra:

```bash
pip install "gradio[mcp]"
```

This will install the necessary dependencies, including the `mcp` package. Also, you will need an LLM application that supports tool calling using the MCP protocol, such as Claude Desktop, Cursor, or Cline (these are known as "MCP Clients").

## What is an MCP Server?

An MCP (Model Control Protocol) server is a standardized way to expose tools so that they can be used by  LLMs. A tool can provide an LLM functionality that it does not have natively, such as the ability to generate images or calculate the prime factors of a number. 

## Example: Counting Letters in a Word

LLMs are famously not great at counting the number of letters in a word (e.g. the number of "r"-s in "strawberry"). But what if we equip them with a tool to help? Let's start by writing a simple Gradio app that counts the number of letters in a word or phrase:

$code_letter_counter

Notice that we have: (1) included a detailed docstring for our function, and (2) set `mcp_server=True` in `.launch()`. This is all that's needed for your Gradio app to serve as an MCP server! Now, when you run this app, it will:

1. Start the regular Gradio web interface
2. Start the MCP server
3. Print the MCP server URL in the console

The MCP server will be accessible at:
```
http://your-server:port/gradio_api/mcp/
```

Gradio automatically converts the `letter_counter` function into an MCP tool that can be used by LLMs. The docstring of the function and the type hints of arguments will be used to generate the description of the tool and its parameters. The name of the function will be used as the name of your tool. Any initial values you provide to your input components (e.g. "strawberry" and "r" in the `gr.Textbox` components above) will be used as the default values if your LLM doesn't specify a value for that particular input parameter.

Now, all you need to do is add this URL endpoint to your MCP Client (e.g. Claude Desktop, Cursor, or Cline), which typically means pasting this config in the settings:

```
{
  "mcpServers": {
    "gradio": {
      "url": "http://your-server:port/gradio_api/mcp/"
    }
  }
}
```

(By the way, you can find the exact config to copy-paste by going to the "View API" link in the footer of your Gradio app, and then clicking on "MCP").

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/view-api-mcp.png)

## Key features of the Gradio <> MCP Integration

1. **Tool Conversion**: Each API endpoint in your Gradio app is automatically converted into an MCP tool with a corresponding name, description, and input schema. To view the tools and schemas, visit http://your-server:port/gradio_api/mcp/schema or go to the "View API" link in the footer of your Gradio app, and then click on "MCP".


2. **Environment variable support**. There are two ways to enable the MCP server functionality:

*  Using the `mcp_server` parameter, as shown above:
   ```python
   demo.launch(mcp_server=True)
   ```

* Using environment variables:
   ```bash
   export GRADIO_MCP_SERVER=True
   ```

3. **File Handling**: The Gradio MCP server automatically handles file data conversions, including:
   - Processing image files and returning them in the correct format
   - Managing temporary file storage

    By default, the Gradio MCP server accepts input images and files as full URLs ("http://..." or "https:/..."). For convenience, an additional STDIO-based MCP server is also generated, which can be used to upload files to any remote Gradio app and which returns a URL that can be used for subsequent tool calls.

4. **Hosted MCP Servers on 󠀠🤗 Spaces**: You can publish your Gradio application for free on Hugging Face Spaces, which will allow you to have a free hosted MCP server. Here's an example of such a Space: https://huggingface.co/spaces/abidlabs/mcp-tools. Notice that you can add this config to your MCP Client to start using the tools from this Space immediately:

```
{
  "mcpServers": {
    "gradio": {
      "url": "https://abidlabs-mcp-tools.hf.space/gradio_api/mcp/"
    }
  }
}
```

<video src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/mcp_guide1.mp4" style="width:100%" controls preload> </video>


## Converting an Existing Space

If there's an existing Space that you'd like to use an MCP server, you'll need to do three things:

1. First, [duplicate the Space](https://huggingface.co/docs/hub/en/spaces-more-ways-to-create#duplicating-a-space) if it is not your own Space. This will allow you to make changes to the app. If the Space requires a GPU, set the hardware of the duplicated Space to be same as the original Space. You can make it either a public Space or a private Space, since it is possible to use either as an MCP server, as described below.
2. Then, add docstrings to the functions that you'd like the LLM to be able to call as a tool. The docstring should be in the same format as the example code above.
3. Finally, add `mcp_server=True` in `.launch()`.

That's it!

## Private Spaces

You can use either a public Space or a private Space as an MCP server. If you'd like to use a private Space as an MCP server (or a ZeroGPU Space with your own quota), then you will need to provide your [Hugging Face token](https://huggingface.co/settings/token) when you make your request. To do this, simply add it as a header in your config like this:

```
{
  "mcpServers": {
    "gradio": {
      "url": "https://abidlabs-mcp-tools.hf.space/gradio_api/mcp/",
      "headers": {
        "Authorization": "Bearer <YOUR-HUGGING-FACE-TOKEN>"
      }
    }
  }
}
```

## Authentication and Credentials

You may wish to authenticate users more precisely or let them provide other kinds of credentials or tokens in order to provide a custom experience for different users. 

Gradio allows you to access the underlying `starlette.Request` that has made the tool call, which means that you can access headers, originating IP address, or any other information that is part of the network request. To do this, simply add a parameter in your function of the type `gr.Request`, and Gradio will automatically inject the request object as the parameter.

Here's an example:

```py
import gradio as gr

def echo_headers(x, request: gr.Request):
    return str(dict(request.headers))

gr.Interface(echo_headers, "textbox", "textbox").launch(mcp_server=True)
```

This MCP server will simply ignore the user's input and echo back all of the headers from a user's request. One can build more complex apps using the same idea. See the [docs on `gr.Request`](https://www.gradio.app/main/docs/gradio/request) for more information (note that only the core Starlette attributes of the `gr.Request` object will be present, attributes such as Gradio's `.session_hash` will not be present).

### Using the gr.Header class

A common pattern in MCP server development is to use authentication headers to call services on behalf of your users. Instead of using a `gr.Request` object like in the example above, you can use a `gr.Header` argument. Gradio will automatically extract that header from the incoming request (if it exists) and pass it to your function.

In the example below, the `X-API-Token` header is extracted from the incoming request and passed in as the `x_api_token` argument to `make_api_request_on_behalf_of_user`.

The benefit of using `gr.Header` is that the MCP connection docs will automatically display the headers you need to supply when connecting to the server! See the image below:

```python
import gradio as gr

def make_api_request_on_behalf_of_user(prompt: str, x_api_token: gr.Header):
    """Make a request to everyone's favorite API.
    Args:
        prompt: The prompt to send to the API.
    Returns:
        The response from the API.
    Raises:
        AssertionError: If the API token is not valid.
    """
    return "Hello from the API" if not x_api_token else "Hello from the API with token!"


demo = gr.Interface(
    make_api_request_on_behalf_of_user,
    [
        gr.Textbox(label="Prompt"),
    ],
    gr.Textbox(label="Response"),
)

demo.launch(mcp_server=True)
```

![MCP Header Connection Page](https://github.com/user-attachments/assets/e264eedf-a91a-476b-880d-5be0d5934134)

### Sending Progress Updates

The Gradio MCP server automatically sends progress updates to your MCP Client based on the queue in the Gradio application. If you'd like to send custom progress updates, you can do so using the same mechanism as you would use to display progress updates in the UI of your Gradio app: by using the `gr.Progress` class!

Here's an example of how to do this:

$code_mcp_progress

[Here are the docs](https://www.gradio.app/docs/gradio/progress) for the `gr.Progress` class, which can also automatically track `tqdm` calls.

Note: by default, progress notifications are enabled for all MCP tools, even if the corresponding Gradio functions do not include a `gr.Progress`. However, this can add some overhead to the MCP tool (typically ~500ms). To disable progress notification, you can set `queue=False` in your Gradio event handler to skip the overhead related to subscribing to the queue's progress updates.


## Modifying Tool Descriptions

Gradio automatically sets the tool name based on the name of your function, and the description from the docstring of your function. But you may want to change how the description appears to your LLM. You can do this by using the `api_description` parameter in `Interface`, `ChatInterface`, or any event listener. This parameter takes three different kinds of values:

* `None` (default): the tool description is automatically created from the docstring of the function (or its parent's docstring if it does not have a docstring but inherits from a method that does.)
* `False`: no tool description appears to the LLM.
* `str`: an arbitrary string to use as the tool description.

In addition to modifying the tool descriptions, you can also toggle which tools appear to the LLM. You can do this by setting the `show_api` parameter, which is by default `True`. Setting it to `False` hides the endpoint from the API docs and from the MCP server. If you expose multiple tools, users of your app will also be able to toggle which tools they'd like to add to their MCP server by checking boxes in the "view MCP or API" panel.

Here's an example that shows the `api_description` and `show_api` parameters in actions:

$code_mcp_tools



## MCP Resources and Prompts

In addition to tools (which execute functions generally and are the default for any function exposed through the Gradio MCP integration), MCP supports two other important primitives: **resources** (for exposing data) and **prompts** (for defining reusable templates). Gradio provides decorators to easily create MCP servers with all three capabilities.


### Creating MCP Resources

Use the `@gr.mcp.resource` decorator on any function to expose data through your Gradio app. Resources can be static (always available at a fixed URI) or templated (with parameters in the URI).

$code_mcp_resources_and_prompts

In this example:
- The `get_greeting` function is exposed as a resource with a URI template `greeting://{name}`
- When an MCP client requests `greeting://Alice`, it receives "Hello, Alice!"
- Resources can also return images and other types of files or binary data. In order to return non-text data, you should specify the `mime_type` parameter in `@gr.mcp.resource()` and return a Base64 string from your function.

### Creating MCP Prompts  

Prompts help standardize how users interact with your tools. They're especially useful for complex workflows that require specific formatting or multiple steps.

The `greet_user` function in the example above is decorated with `@gr.mcp.prompt()`, which:
- Makes it available as a prompt template in MCP clients
- Accepts parameters (`name` and `style`) to customize the output
- Returns a structured prompt that guides the LLM's behavior


## Adding MCP-Only Functions

So far, all of our MCP tools, resources, or prompts have corresponded to event listeners in the UI. This works well for functions that directly update the UI, but may not work if you wish to expose a "pure logic" function that should return raw data (e.g. a JSON object) without directly causing a UI update.

In order to expose such an MCP tool, you can create a pure Gradio API endpoint using `gr.api` (see [full docs here](https://www.gradio.app/main/docs/gradio/api)). Here's an example of creating an MCP tool that slices a list:

$code_mcp_tool_only

Note that if you use this approach, your function signature must be fully typed, including the return value, as these signature are used to determine the typing information for the MCP tool.

## Gradio with FastMCP

In some cases, you may decide not to use Gradio's built-in integration and instead manually create an FastMCP Server that calls a Gradio app. This approach is useful when you want to:

- Store state / identify users between calls instead of treating every tool call completely independently
- Start the Gradio app MCP server when a tool is called (if you are running multiple Gradio apps locally and want to save memory / GPU)

This is very doable thanks to the [Gradio Python Client](https://www.gradio.app/guides/getting-started-with-the-python-client) and the [MCP Python SDK](https://github.com/modelcontextprotocol/python-sdk)'s `FastMCP` class. Here's an example of creating a custom MCP server that connects to various Gradio apps hosted on [HuggingFace Spaces](https://huggingface.co/spaces) using the `stdio` protocol:

```python
from mcp.server.fastmcp import FastMCP
from gradio_client import Client
import sys
import io
import json 

mcp = FastMCP("gradio-spaces")

clients = {}

def get_client(space_id: str) -> Client:
    """Get or create a Gradio client for the specified space."""
    if space_id not in clients:
        clients[space_id] = Client(space_id)
    return clients[space_id]


@mcp.tool()
async def generate_image(prompt: str, space_id: str = "ysharma/SanaSprint") -> str:
    """Generate an image using Flux.
    
    Args:
        prompt: Text prompt describing the image to generate
        space_id: HuggingFace Space ID to use 
    """
    client = get_client(space_id)
    result = client.predict(
            prompt=prompt,
            model_size="1.6B",
            seed=0,
            randomize_seed=True,
            width=1024,
            height=1024,
            guidance_scale=4.5,
            num_inference_steps=2,
            api_name="/infer"
    )
    return result


@mcp.tool()
async def run_dia_tts(prompt: str, space_id: str = "ysharma/Dia-1.6B") -> str:
    """Text-to-Speech Synthesis.
    
    Args:
        prompt: Text prompt describing the conversation between speakers S1, S2
        space_id: HuggingFace Space ID to use 
    """
    client = get_client(space_id)
    result = client.predict(
            text_input=f"""{prompt}""",
            audio_prompt_input=None, 
            max_new_tokens=3072,
            cfg_scale=3,
            temperature=1.3,
            top_p=0.95,
            cfg_filter_top_k=30,
            speed_factor=0.94,
            api_name="/generate_audio"
    )
    return result


if __name__ == "__main__":
    import sys
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    
    mcp.run(transport='stdio')
```

This server exposes two tools:
1. `run_dia_tts` - Generates a conversation for the given transcript in the form of `[S1]first-sentence. [S2]second-sentence. [S1]...`
2. `generate_image` - Generates images using a fast text-to-image model

To use this MCP Server with Claude Desktop (as MCP Client):

1. Save the code to a file (e.g., `gradio_mcp_server.py`)
2. Install the required dependencies: `pip install mcp gradio-client`
3. Configure Claude Desktop to use your server by editing the configuration file at `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
    "mcpServers": {
        "gradio-spaces": {
            "command": "python",
            "args": [
                "/absolute/path/to/gradio_mcp_server.py"
            ]
        }
    }
}
```

4. Restart Claude Desktop

Now, when you ask Claude about generating an image or transcribing audio, it can use your Gradio-powered tools to accomplish these tasks.


## Troubleshooting your MCP Servers

The MCP protocol is still in its infancy and you might see issues connecting to an MCP Server that you've built. We generally recommend using the [MCP Inspector Tool](https://github.com/modelcontextprotocol/inspector) to try connecting and debugging your MCP Server.

Here are some things that may help:

**1. Ensure that you've provided type hints and valid docstrings for your functions**

As mentioned earlier, Gradio reads the docstrings for your functions and the type hints of input arguments to generate the description of the tool and parameters. A valid function and docstring looks like this (note the "Args:" block with indented parameter names underneath):

```py
def image_orientation(image: Image.Image) -> str:
    """
    Returns whether image is portrait or landscape.

    Args:
        image (Image.Image): The image to check.
    """
    return "Portrait" if image.height > image.width else "Landscape"
```

Note: You can preview the schema that is created for your MCP server by visiting the `http://your-server:port/gradio_api/mcp/schema` URL.

**2. Try accepting input arguments as `str`**

Some MCP Clients do not recognize parameters that are numeric or other complex types, but all of the MCP Clients that we've tested accept `str` input parameters. When in doubt, change your input parameter to be a `str` and then cast to a specific type in the function, as in this example:

```py
def prime_factors(n: str):
    """
    Compute the prime factorization of a positive integer.

    Args:
        n (str): The integer to factorize. Must be greater than 1.
    """
    n_int = int(n)
    if n_int <= 1:
        raise ValueError("Input must be an integer greater than 1.")

    factors = []
    while n_int % 2 == 0:
        factors.append(2)
        n_int //= 2

    divisor = 3
    while divisor * divisor <= n_int:
        while n_int % divisor == 0:
            factors.append(divisor)
            n_int //= divisor
        divisor += 2

    if n_int > 1:
        factors.append(n_int)

    return factors
```

**3. Ensure that your MCP Client Supports Streamable HTTP**

Some MCP Clients do not yet support streamable HTTP-based MCP Servers. In those cases, you can use a tool such as [mcp-remote](https://github.com/geelen/mcp-remote). First install [Node.js](https://nodejs.org/en/download/). Then, add the following to your own MCP Client config:

```
{
  "mcpServers": {
    "gradio": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "http://your-server:port/gradio_api/mcp/"
      ]
    }
  }
}
```

**4. Restart your MCP Client and MCP Server**

Some MCP Clients require you to restart them every time you update the MCP configuration. Other times, if the connection between the MCP Client and servers breaks, you might need to restart the MCP server. If all else fails, try restarting both your MCP Client and MCP Servers!

---

<!-- Source: guides/11_other-tutorials/01_using-hugging-face-integrations.md -->
# Using Hugging Face Integrations

Related spaces: https://huggingface.co/spaces/gradio/en2es
Tags: HUB, SPACES, EMBED

Contributed by <a href="https://huggingface.co/osanseviero">Omar Sanseviero</a> 🦙

## Introduction

The Hugging Face Hub is a central platform that has hundreds of thousands of [models](https://huggingface.co/models), [datasets](https://huggingface.co/datasets) and [demos](https://huggingface.co/spaces) (also known as Spaces). 

Gradio has multiple features that make it extremely easy to leverage existing models and Spaces on the Hub. This guide walks through these features.


## Demos with the Hugging Face Inference Endpoints

Hugging Face has a service called [Serverless Inference Endpoints](https://huggingface.co/docs/api-inference/index), which allows you to send HTTP requests to models on the Hub. The API includes a generous free tier, and you can switch to [dedicated Inference Endpoints](https://huggingface.co/inference-endpoints/dedicated) when you want to use it in production. Gradio integrates directly with Serverless Inference Endpoints so that you can create a demo simply by specifying a model's name (e.g. `Helsinki-NLP/opus-mt-en-es`), like this:

```python
import gradio as gr

demo = gr.load("Helsinki-NLP/opus-mt-en-es", src="models")

demo.launch()
```

For any Hugging Face model supported in Inference Endpoints, Gradio automatically infers the expected input and output and make the underlying server calls, so you don't have to worry about defining the prediction function. 

Notice that we just put specify the model name and state that the `src` should be `models` (Hugging Face's Model Hub). There is no need to install any dependencies (except `gradio`) since you are not loading the model on your computer.

You might notice that the first inference takes a little bit longer. This happens since the Inference Endpoints is loading the model in the server. You get some benefits afterward:

- The inference will be much faster.
- The server caches your requests.
- You get built-in automatic scaling.

## Hosting your Gradio demos on Spaces

[Hugging Face Spaces](https://hf.co/spaces) allows anyone to host their Gradio demos freely, and uploading your Gradio demos take a couple of minutes. You can head to [hf.co/new-space](https://huggingface.co/new-space), select the Gradio SDK, create an `app.py` file, and voila! You have a demo you can share with anyone else. To learn more, read [this guide how to host on Hugging Face Spaces using the website](https://huggingface.co/blog/gradio-spaces).

Alternatively, you can create a Space programmatically, making use of the [huggingface_hub client library](https://huggingface.co/docs/huggingface_hub/index) library. Here's an example:

```python
from huggingface_hub import (
    create_repo,
    get_full_repo_name,
    upload_file,
)
create_repo(name=target_space_name, token=hf_token, repo_type="space", space_sdk="gradio")
repo_name = get_full_repo_name(model_id=target_space_name, token=hf_token)
file_url = upload_file(
    path_or_fileobj="file.txt",
    path_in_repo="app.py",
    repo_id=repo_name,
    repo_type="space",
    token=hf_token,
)
```

Here, `create_repo` creates a gradio repo with the target name under a specific account using that account's Write Token. `repo_name` gets the full repo name of the related repo. Finally `upload_file` uploads a file inside the repo with the name `app.py`.


## Loading demos from Spaces

You can also use and remix existing Gradio demos on Hugging Face Spaces. For example, you could take two existing Gradio demos on Spaces and put them as separate tabs and create a new demo. You can run this new demo locally, or upload it to Spaces, allowing endless possibilities to remix and create new demos!

Here's an example that does exactly that:

```python
import gradio as gr

with gr.Blocks() as demo:
  with gr.Tab("Translate to Spanish"):
    gr.load("gradio/en2es", src="spaces")
  with gr.Tab("Translate to French"):
    gr.load("abidlabs/en2fr", src="spaces")

demo.launch()
```

Notice that we use `gr.load()`, the same method we used to load models using Inference Endpoints. However, here we specify that the `src` is `spaces` (Hugging Face Spaces). 

Note: loading a Space in this way may result in slight differences from the original Space. In particular, any attributes that apply to the entire Blocks, such as the theme or custom CSS/JS, will not be loaded. You can copy these properties from the Space you are loading into your own `Blocks` object. 

## Demos with the `Pipeline` in `transformers`

Hugging Face's popular `transformers` library has a very easy-to-use abstraction, [`pipeline()`](https://huggingface.co/docs/transformers/v4.16.2/en/main_classes/pipelines#transformers.pipeline) that handles most of the complex code to offer a simple API for common tasks. By specifying the task and an (optional) model, you can build a demo around an existing model with few lines of Python:

```python
import gradio as gr

from transformers import pipeline

pipe = pipeline("translation", model="Helsinki-NLP/opus-mt-en-es")

def predict(text):
  return pipe(text)[0]["translation_text"]

demo = gr.Interface(
  fn=predict,
  inputs='text',
  outputs='text',
)

demo.launch()
```

But `gradio` actually makes it even easier to convert a `pipeline` to a demo, simply by using the `gradio.Interface.from_pipeline` methods, which skips the need to specify the input and output components:

```python
from transformers import pipeline
import gradio as gr

pipe = pipeline("translation", model="Helsinki-NLP/opus-mt-en-es")

demo = gr.Interface.from_pipeline(pipe)
demo.launch()
```

The previous code produces the following interface, which you can try right here in your browser:

<gradio-app space="gradio/en2es"></gradio-app>


## Recap

That's it! Let's recap the various ways Gradio and Hugging Face work together:

1. You can build a demo around Inference Endpoints without having to load the model, by using `gr.load()`.
2. You host your Gradio demo on Hugging Face Spaces, either using the GUI or entirely in Python.
3. You can load demos from Hugging Face Spaces to remix and create new Gradio demos using `gr.load()`.
4. You can convert a `transformers` pipeline into a Gradio demo using `from_pipeline()`.

🤗

---

<!-- Source: guides/cn/01_getting-started/01_quickstart.md -->
# 快速开始

**先决条件**：Gradio 需要 Python 3.10 或更高版本，就是这样！

## Gradio 是做什么的？

与他人分享您的机器学习模型、API 或数据科学流程的*最佳方式之一*是创建一个**交互式应用程序**，让您的用户或同事可以在他们的浏览器中尝试演示。

Gradio 允许您**使用 Python 构建演示并共享这些演示**。通常只需几行代码！那么我们开始吧。

## Hello, World

要通过一个简单的“Hello, World”示例运行 Gradio，请遵循以下三个步骤：

1. 使用 pip 安装 Gradio：

```bash
pip install gradio
```

2. 将下面的代码作为 Python 脚本运行或在 Jupyter Notebook 中运行（或者 [Google Colab](https://colab.research.google.com/drive/18ODkJvyxHutTN0P5APWyGFO_xwNcgHDZ?usp=sharing)）：

$code_hello_world

我们将导入的名称缩短为 `gr`，以便以后在使用 Gradio 的代码中更容易理解。这是一种广泛采用的约定，您应该遵循，以便与您的代码一起工作的任何人都可以轻松理解。

3. 在 Jupyter Notebook 中，该演示将自动显示；如果从脚本运行，则会在浏览器中弹出，网址为 [http://localhost:7860](http://localhost:7860)：

$demo_hello_world

在本地开发时，如果您想将代码作为 Python 脚本运行，您可以使用 Gradio CLI 以**重载模式**启动应用程序，这将提供无缝和快速的开发。了解有关[自动重载指南](https://gradio.app/developing-faster-with-reload-mode/)中重新加载的更多信息。

```bash
gradio app.py
```

注意：您也可以运行 `python app.py`，但它不会提供自动重新加载机制。

## `Interface` 类

您会注意到为了创建演示，我们创建了一个 `gr.Interface`。`Interface` 类可以将任何 Python 函数与用户界面配对。在上面的示例中，我们看到了一个简单的基于文本的函数，但该函数可以是任何内容，从音乐生成器到税款计算器再到预训练的机器学习模型的预测函数。

`Interface` 类的核心是使用三个必需参数进行初始化：

- `fn`：要在其周围包装 UI 的函数
- `inputs`：用于输入的组件（例如 `"text"`、`"image"` 或 `"audio"`）
- `outputs`：用于输出的组件（例如 `"text"`、`"image"` 或 `"label"`）

让我们更详细地了解用于提供输入和输出的组件。

## 组件属性 (Components Attributes)

我们在前面的示例中看到了一些简单的 `Textbox` 组件，但是如果您想更改 UI 组件的外观或行为怎么办？

假设您想自定义输入文本字段 - 例如，您希望它更大并具有文本占位符。如果我们使用实际的 `Textbox` 类而不是使用字符串快捷方式，您可以通过组件属性获得更多的自定义功能。

$code_hello_world_2
$demo_hello_world_2

## 多个输入和输出组件

假设您有一个更复杂的函数，具有多个输入和输出。在下面的示例中，我们定义了一个接受字符串、布尔值和数字，并返回字符串和数字的函数。请看一下如何传递输入和输出组件的列表。

$code_hello_world_3
$demo_hello_world_3

只需将组件包装在列表中。`inputs` 列表中的每个组件对应函数的一个参数，顺序相同。`outputs` 列表中的每个组件对应函数返回的一个值，同样是顺序。

## 图像示例

Gradio 支持许多类型的组件，例如 `Image`、`DataFrame`、`Video` 或 `Label`。让我们尝试一个图像到图像的函数，以了解这些组件的感觉！

$code_sepia_filter
$demo_sepia_filter

使用 `Image` 组件作为输入时，您的函数将接收到一个形状为`（高度，宽度，3）` 的 NumPy 数组，其中最后一个维度表示 RGB 值。我们还将返回一个图像，形式为 NumPy 数组。

您还可以使用 `type=` 关键字参数设置组件使用的数据类型。例如，如果您希望函数接受图像文件路径而不是 NumPy 数组，输入 `Image` 组件可以写成：

```python
gr.Image(type="filepath")
```

还要注意，我们的输入 `Image` 组件附带有一个编辑按钮🖉，允许裁剪和缩放图像。通过这种方式操作图像可以帮助揭示机器学习模型中的偏见或隐藏的缺陷！

您可以在[Gradio 文档](https://gradio.app/docs)中阅读有关许多组件以及如何使用它们的更多信息。

## Blocks：更灵活和可控

Gradio 提供了两个类来构建应用程序：

1. **Interface**，提供了用于创建演示的高级抽象，我们到目前为止一直在讨论。

2. **Blocks**，用于以更灵活的布局和数据流设计 Web 应用程序的低级 API。Blocks 允许您执行诸如特性多个数据流和演示，控制组件在页面上的出现位置，处理复杂的数据流（例如，输出可以作为其他函数的输入），并基于用户交互更新组件的属性 / 可见性等操作 - 仍然全部使用 Python。如果您需要这种可定制性，请尝试使用 `Blocks`！

## Hello, Blocks

让我们看一个简单的示例。请注意，此处的 API 与 `Interface` 不同。

$code_hello_blocks
$demo_hello_blocks

需要注意的事项：

- `Blocks` 可以使用 `with` 子句创建，此子句中创建的任何组件都会自动添加到应用程序中。
- 组件以按创建顺序垂直放置在应用程序中。（稍后我们将介绍自定义布局！）
- 创建了一个 `Button`，然后在此按钮上添加了一个 `click` 事件监听器。对于这个 API，应该很熟悉！与 `Interface` 类似，`click` 方法接受一个 Python 函数、输入组件和输出组件。

## 更复杂的应用

下面是一个应用程序，以让您对 `Blocks` 可以实现的更多内容有所了解：

$code_blocks_flipper
$demo_blocks_flipper

这里有更多的东西！在[building with blocks](https://gradio.app/building_with_blocks)部分中，我们将介绍如何创建像这样的复杂的 `Blocks` 应用程序。

恭喜，您已经熟悉了 Gradio 的基础知识！ 🥳 转到我们的[下一个指南](https://gradio.app/key_features)了解更多关于 Gradio 的主要功能。

---

<!-- Source: guides/cn/02_building-interfaces/01_interface-state.md -->
# 接口状态 (Interface State)

本指南介绍了 Gradio 中如何处理状态。了解全局状态和会话状态的区别，以及如何同时使用它们。

## 全局状态 (Global State)

您的函数可能使用超出单个函数调用的持久性数据。如果数据是所有函数调用和所有用户都可访问的内容，您可以在函数调用外部创建一个变量，并在函数内部访问它。例如，您可能会在函数外部加载一个大模型，并在函数内部使用它，以便每个函数调用都不需要重新加载模型。

$code_score_tracker

在上面的代码中，'scores' 数组在所有用户之间共享。如果多个用户访问此演示，他们的得分将全部添加到同一列表中，并且返回的前 3 个得分将从此共享引用中收集。

## 全局状态 (Global State)

Gradio 支持的另一种数据持久性是会话状态，其中数据在页面会话中的多个提交之间持久存在。但是，不同用户之间的数据*不*共享。要将数据存储在会话状态中，需要执行以下三个步骤：

1. 将额外的参数传递给您的函数，表示接口的状态。
2. 在函数的末尾，作为额外的返回值返回状态的更新值。
3. 在创建界面时添加 `'state'` 输入和 `'state'` 输出组件。

聊天机器人就是需要会话状态的一个例子 - 您希望访问用户之前的提交，但不能将聊天记录存储在全局变量中，因为这样聊天记录会在不同用户之间混乱。

$code_chatbot_dialogpt
$demo_chatbot_dialogpt

请注意，在每个页面中，状态在提交之间保持不变，但是如果在另一个标签中加载此演示（或刷新页面），演示将不共享聊天记录。

`state` 的默认值为 None。如果您将默认值传递给函数的状态参数，则该默认值将用作状态的默认值。`Interface` 类仅支持单个输入和输出状态变量，但可以是具有多个元素的列表。对于更复杂的用例，您可以使用 Blocks，[它支持多个 `State` 变量](/state_in_blocks/)。

---

<!-- Source: guides/cn/03_building-with-blocks/01_blocks-and-event-listeners.md -->
# 区块和事件监听器 (Blocks and Event Listeners)

我们在[快速入门](https://gradio.app/blocks-and-event-listeners)中简要介绍了区块。让我们深入探讨一下。本指南将涵盖区块的结构、事件监听器及其类型、连续运行事件、更新配置以及使用字典与列表。

## 区块结构 (Blocks Structure)

请查看下面的演示。

$code_hello_blocks
$demo_hello_blocks

- 首先，注意 `with gr.Blocks() as demo:` 子句。区块应用程序代码将被包含在该子句中。
- 接下来是组件。这些组件是在 `Interface` 中使用的相同组件。但是，与将组件传递给某个构造函数不同，组件在 `with` 子句内创建时会自动添加到区块中。
- 最后，`click()` 事件监听器。事件监听器定义了应用程序内的数据流。在上面的示例中，监听器将两个文本框相互关联。文本框 `name` 作为输入，文本框 `output` 作为 `greet` 方法的输出。当单击按钮 `greet_btn` 时触发此数据流。与界面类似，事件监听器可以具有多个输入或输出。

## 事件监听器与交互性 (Event Listeners and Interactivity)

在上面的示例中，您会注意到可以编辑文本框 `name`，但无法编辑文本框 `output`。这是因为作为事件监听器的任何组件都具有交互性。然而，由于文本框 `output` 仅作为输出，它没有交互性。您可以使用 `interactive=` 关键字参数直接配置组件的交互性。

```python
output = gr.Textbox(label="输出", interactive=True)
```

## 事件监听器的类型 (Types of Event Listeners)

请查看下面的演示：

$code_blocks_hello
$demo_blocks_hello

`welcome` 函数不是由点击触发的，而是由在文本框 `inp` 中输入文字触发的。这是由于 `change()` 事件监听器。不同的组件支持不同的事件监听器。例如，`Video` 组件支持一个 `play()` 事件监听器，当用户按下播放按钮时触发。有关每个组件的事件监听器，请参见[文档](http://gradio.app/docs/components)。

## 多个数据流 (Multiple Data Flows)

区块应用程序不像界面那样限制于单个数据流。请查看下面的演示：

$code_reversible_flow
$demo_reversible_flow

请注意，`num1` 可以充当 `num2` 的输入，反之亦然！随着应用程序变得更加复杂，您将能够连接各种组件的多个数据流。

下面是一个 " 多步骤 " 示例，其中一个模型的输出（语音到文本模型）被传递给下一个模型（情感分类器）。

$code_blocks_speech_text_sentiment
$demo_blocks_speech_text_sentiment

## 函数输入列表与字典 (Function Input List vs Dict)

到目前为止，您看到的事件监听器都只有一个输入组件。如果您希望有多个输入组件将数据传递给函数，有两种选项可供函数接受输入组件值：

1. 作为参数列表，或
2. 作为以组件为键的单个值字典

让我们分别看一个例子：
$code_calculator_list_and_dict

`add()` 和 `sub()` 都将 `a` 和 `b` 作为输入。然而，这些监听器之间的语法不同。

1. 对于 `add_btn` 监听器，我们将输入作为列表传递。函数 `add()` 将每个输入作为参数。`a` 的值映射到参数 `num1`，`b` 的值映射到参数 `num2`。
2. 对于 `sub_btn` 监听器，我们将输入作为集合传递（注意花括号！）。函数 `sub()` 接受一个名为 `data` 的单个字典参数，其中键是输入组件，值是这些组件的值。

使用哪种语法是个人偏好！对于具有许多输入组件的函数，选项 2 可能更容易管理。

$demo_calculator_list_and_dict

## 函数返回列表与字典 (Function Return List vs Dict)

类似地，您可以返回多个输出组件的值，可以是：

1. 值列表，或
2. 以组件为键的字典

首先让我们看一个（1）的示例，其中我们通过返回两个值来设置两个输出组件的值：

```python
with gr.Blocks() as demo:
    food_box = gr.Number(value=10, label="Food Count")
    status_box = gr.Textbox()
    def eat(food):
        if food > 0:
            return food - 1, "full"
        else:
            return 0, "hungry"
    gr.Button("EAT").click(
        fn=eat,
        inputs=food_box,
        outputs=[food_box, status_box]
    )
```

上面的每个返回语句分别返回与 `food_box` 和 `status_box` 相对应的两个值。

除了返回与每个输出组件顺序相对应的值列表外，您还可以返回一个字典，其中键对应于输出组件，值作为新值。这还允许您跳过更新某些输出组件。

```python
with gr.Blocks() as demo:
    food_box = gr.Number(value=10, label="Food Count")
    status_box = gr.Textbox()
    def eat(food):
        if food > 0:
            return {food_box: food - 1, status_box: "full"}
        else:
            return {status_box: "hungry"}
    gr.Button("EAT").click(
        fn=eat,
        inputs=food_box,
        outputs=[food_box, status_box]
    )
```

注意，在没有食物的情况下，我们只更新 `status_box` 元素。我们跳过更新 `food_box` 组件。

字典返回在事件监听器影响多个组件的返回值或有条件地影响输出时非常有用。

请记住，对于字典返回，我们仍然需要在事件监听器中指定可能的输出组件。

## 更新组件配置 (Updating Component Configurations)

事件监听器函数的返回值通常是相应输出组件的更新值。有时我们还希望更新组件的配置，例如可见性。在这种情况下，我们返回一个 `gr.update()` 对象，而不仅仅是更新组件的值。

$code_blocks_essay_simple
$demo_blocks_essay_simple

请注意，我们可以通过 `gr.update()` 方法自我配置文本框。`value=` 参数仍然可以用于更新值以及组件配置。

## 连续运行事件 (Running Events Consecutively)

你也可以使用事件监听器的 `then` 方法按顺序运行事件。在前一个事件运行完成后，这将运行下一个事件。这对于多步更新组件的事件非常有用。

例如，在下面的聊天机器人示例中，我们首先立即使用用户消息更新聊天机器人，然后在模拟延迟后使用计算机回复更新聊天机器人。

$code_chatbot_simple
$demo_chatbot_simple

事件监听器的 `.then()` 方法会执行后续事件，无论前一个事件是否引发任何错误。如果只想在前一个事件成功执行后才运行后续事件，请使用 `.success()` 方法，该方法与 `.then()` 接受相同的参数。

## 连续运行事件 (Running Events Continuously)

您可以使用事件监听器的 `every` 参数按固定计划运行事件。这将在客户端连接打开的情况下，每隔一定秒数运行一次事件。如果连接关闭，事件将在下一次迭代后停止运行。
请注意，这不考虑事件本身的运行时间。因此，使用 `every=gr.Timer(5)` 运行时间为 1 秒的函数实际上每 6 秒运行一次。

以下是每秒更新的正弦曲线示例！

$code_sine_curve
$demo_sine_curve

## 收集事件数据 (Gathering Event Data)

您可以通过将相关的事件数据类作为类型提示添加到事件监听器函数的参数中，收集有关事件的特定数据。

例如，使用 `gradio.SelectData` 参数可以为 `.select()` 的事件数据添加类型提示。当用户选择触发组件的一部分时，将触发此事件，并且事件数据包含有关用户的具体选择的信息。如果用户在 `Textbox` 中选择了特定单词，在 `Gallery` 中选择了特定图像或在 `DataFrame` 中选择了特定单元格，则事件数据参数将包含有关具体选择的信息。

在下面的双人井字游戏演示中，用户可以选择 `DataFrame` 中的一个单元格进行移动。事件数据参数包含有关所选单元格的信息。我们可以首先检查单元格是否为空，然后用用户的移动更新单元格。

$code_tictactoe

$demo_tictactoe

---

<!-- Source: guides/cn/04_integrating-other-frameworks/01_using-hugging-face-integrations.md -->
# 使用 Hugging Face 集成

相关空间：https://huggingface.co/spaces/gradio/helsinki_translation_en_es
标签：HUB，SPACES，EMBED

由 <a href="https://huggingface.co/osanseviero">Omar Sanseviero</a> 贡献🦙

## 介绍

Hugging Face Hub 是一个集成平台，拥有超过 190,000 个[模型](https://huggingface.co/models)，32,000 个[数据集](https://huggingface.co/datasets)和 40,000 个[演示](https://huggingface.co/spaces)，也被称为 Spaces。虽然 Hugging Face 以其🤗 transformers 和 diffusers 库而闻名，但 Hub 还支持许多机器学习库，如 PyTorch，TensorFlow，spaCy 等，涵盖了从计算机视觉到强化学习等各个领域。

Gradio 拥有多个功能，使其非常容易利用 Hub 上的现有模型和 Spaces。本指南将介绍这些功能。

## 使用 `pipeline` 进行常规推理

首先，让我们构建一个简单的界面，将英文翻译成西班牙文。在赫尔辛基大学共享的一千多个模型中，有一个[现有模型](https://huggingface.co/Helsinki-NLP/opus-mt-en-es)，名为 `opus-mt-en-es`，可以正好做到这一点！

🤗 transformers 库有一个非常易于使用的抽象层，[`pipeline()`](https://huggingface.co/docs/transformers/v4.16.2/en/main_classes/pipelines#transformers.pipeline)处理大部分复杂代码，为常见任务提供简单的 API。通过指定任务和（可选）模型，您可以使用几行代码使用现有模型：

```python
import gradio as gr

from transformers import pipeline

pipe = pipeline("translation", model="Helsinki-NLP/opus-mt-en-es")

def predict(text):
  return pipe(text)[0]["translation_text"]

demo = gr.Interface(
  fn=predict,
  inputs='text',
  outputs='text',
)

demo.launch()
```

但是，`gradio` 实际上使将 `pipeline` 转换为演示更加容易，只需使用 `gradio.Interface.from_pipeline` 方法，无需指定输入和输出组件：

```python
from transformers import pipeline
import gradio as gr

pipe = pipeline("translation", model="Helsinki-NLP/opus-mt-en-es")

demo = gr.Interface.from_pipeline(pipe)
demo.launch()
```

上述代码生成了以下界面，您可以在浏览器中直接尝试：

<gradio-app space="Helsinki-NLP/opus-mt-en-es"></gradio-app>

## Using Hugging Face Inference Endpoints

Hugging Face 提供了一个名为[Serverless Inference Endpoints](https://huggingface.co/inference-api)的免费服务，允许您向 Hub 中的模型发送 HTTP 请求。对于基于 transformers 或 diffusers 的模型，API 的速度可以比自己运行推理快 2 到 10 倍。该 API 是免费的（受速率限制），您可以在想要在生产中使用时切换到专用的[推理端点](https://huggingface.co/pricing)。

让我们尝试使用推理 API 而不是自己加载模型的方式进行相同的演示。鉴于 Inference Endpoints 支持的 Hugging Face 模型，Gradio 可以自动推断出预期的输入和输出，并进行底层服务器调用，因此您不必担心定义预测函数。以下是代码示例！

```python
import gradio as gr

demo = gr.load("Helsinki-NLP/opus-mt-en-es", src="models")

demo.launch()
```

请注意，我们只需指定模型名称并说明 `src` 应为 `models`（Hugging Face 的 Model Hub）。由于您不会在计算机上加载模型，因此无需安装任何依赖项（除了 `gradio`）。

您可能会注意到，第一次推理大约需要 20 秒。这是因为推理 API 正在服务器中加载模型。之后您会获得一些好处：

- 推理速度更快。
- 服务器缓存您的请求。
- 您获得内置的自动缩放功能。

## 托管您的 Gradio 演示

[Hugging Face Spaces](https://hf.co/spaces)允许任何人免费托管其 Gradio 演示，上传 Gradio 演示只需几分钟。您可以前往[hf.co/new-space](https://huggingface.co/new-space)，选择 Gradio SDK，创建一个 `app.py` 文件，完成！您将拥有一个可以与任何人共享的演示。要了解更多信息，请阅读[此指南以使用网站在 Hugging Face Spaces 上托管](https://huggingface.co/blog/gradio-spaces)。

或者，您可以通过使用[huggingface_hub client library](https://huggingface.co/docs/huggingface_hub/index)库来以编程方式创建一个 Space。这是一个示例：

```python
from huggingface_hub import (
    create_repo,
    get_full_repo_name,
    upload_file,
)
create_repo(name=target_space_name, token=hf_token, repo_type="space", space_sdk="gradio")
repo_name = get_full_repo_name(model_id=target_space_name, token=hf_token)
file_url = upload_file(
    path_or_fileobj="file.txt",
    path_in_repo="app.py",
    repo_id=repo_name,
    repo_type="space",
    token=hf_token,
)
```

在这里，`create_repo` 使用特定帐户的 Write Token 在特定帐户下创建一个带有目标名称的 gradio repo。`repo_name` 获取相关存储库的完整存储库名称。最后，`upload_file` 将文件上传到存储库中，并将其命名为 `app.py`。

## 在其他网站上嵌入您的 Space 演示

在本指南中，您已经看到了许多嵌入的 Gradio 演示。您也可以在自己的网站上这样做！第一步是创建一个包含您想展示的演示的 Hugging Face Space。然后，[按照此处的步骤将 Space 嵌入到您的网站上](/sharing-your-app/#embedding-hosted-spaces)。

## 从 Spaces 加载演示

您还可以在 Hugging Face Spaces 上使用和混合现有的 Gradio 演示。例如，您可以将两个现有的 Gradio 演示放在单独的选项卡中并创建一个新的演示。您可以在本地运行此新演示，或将其上传到 Spaces，为混合和创建新的演示提供无限可能性！

以下是一个完全实现此目标的示例：

```python
import gradio as gr

with gr.Blocks() as demo:
  with gr.Tab("Translate to Spanish"):
    gr.load("gradio/helsinki_translation_en_es", src="spaces")
  with gr.Tab("Translate to French"):
    gr.load("abidlabs/en2fr", src="spaces")

demo.launch()
```

请注意，我们使用了 `gr.load()`，这与使用推理 API 加载模型所使用的方法相同。但是，在这里，我们指定 `src` 为 `spaces`（Hugging Face Spaces）。

## 小结

就是这样！让我们回顾一下 Gradio 和 Hugging Face 共同工作的各种方式：

1. 您可以使用 `from_pipeline()` 将 `transformers` pipeline 转换为 Gradio 演示
2. 您可以使用 `gr.load()` 轻松地围绕推理 API 构建演示，而无需加载模型
3. 您可以在 Hugging Face Spaces 上托管您的 Gradio 演示，可以使用 GUI 或完全使用 Python。
4. 您可以将托管在 Hugging Face Spaces 上的 Gradio 演示嵌入到自己的网站上。
5. 您可以使用 `gr.load()` 从 Hugging Face Spaces 加载演示，以重新混合和创建新的 Gradio 演示。

🤗

---

<!-- Source: guides/cn/05_tabular-data-science-and-plots/01_connecting-to-a-database.md -->
# 连接到数据库

相关空间：https://huggingface.co/spaces/gradio/chicago-bike-share-dashboard
标签：TABULAR, PLOTS

## 介绍

本指南介绍如何使用 Gradio 连接您的应用程序到数据库。我们将会
连接到在 AWS 上托管的 PostgreSQL 数据库，但 Gradio 对于您连接的数据库类型和托管位置没有任何限制。因此，只要您能编写 Python 代码来连接
您的数据，您就可以使用 Gradio 在 Web 界面中显示它 💪

## 概述

我们将分析来自芝加哥的自行车共享数据。数据托管在 kaggle [这里](https://www.kaggle.com/datasets/evangower/cyclistic-bike-share?select=202203-divvy-tripdata.csv)。
我们的目标是创建一个仪表盘，让我们的业务利益相关者能够回答以下问题：

1. 电动自行车是否比普通自行车更受欢迎？
2. 哪些出发自行车站点最受欢迎？

在本指南结束时，我们将拥有一个如下所示的功能齐全的应用程序：

<gradio-app space="gradio/chicago-bike-share-dashboard"> </gradio-app>

## 步骤 1 - 创建数据库

我们将在 Amazon 的 RDS 服务上托管我们的数据。如果还没有 AWS 账号，请创建一个
并在免费层级上创建一个 PostgreSQL 数据库。

**重要提示**：如果您计划在 HuggingFace Spaces 上托管此演示，请确保数据库在 **8080** 端口上。Spaces
将阻止除端口 80、443 或 8080 之外的所有外部连接，如此[处所示](https://huggingface.co/docs/hub/spaces-overview#networking)。
RDS 不允许您在 80 或 443 端口上创建 postgreSQL 实例。

创建完数据库后，从 Kaggle 下载数据集并将其上传到数据库中。
为了演示的目的，我们只会上传 2022 年 3 月的数据。

## 步骤 2.a - 编写 ETL 代码

我们将查询数据库，按自行车类型（电动、标准或有码）进行分组，并获取总骑行次数。
我们还将查询每个站点的出发骑行次数，并获取前 5 个。

然后，我们将使用 matplotlib 将查询结果可视化。

我们将使用 pandas 的[read_sql](https://pandas.pydata.org/docs/reference/api/pandas.read_sql.html)
方法来连接数据库。这需要安装 `psycopg2` 库。

为了连接到数据库，我们将指定数据库的用户名、密码和主机作为环境变量。
这样可以通过避免将敏感信息以明文形式存储在应用程序文件中，使我们的应用程序更安全。

```python
import os
import pandas as pd
import matplotlib.pyplot as plt

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
PORT = 8080
DB_NAME = "bikeshare"

connection_string = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}?port={PORT}&dbname={DB_NAME}"

def get_count_ride_type():
    df = pd.read_sql(
    """
        SELECT COUNT(ride_id) as n, rideable_type
        FROM rides
        GROUP BY rideable_type
        ORDER BY n DESC
    """,
    con=connection_string
    )
    fig_m, ax = plt.subplots()
    ax.bar(x=df['rideable_type'], height=df['n'])
    ax.set_title("Number of rides by bycycle type")
    ax.set_ylabel("Number of Rides")
    ax.set_xlabel("Bicycle Type")
    return fig_m


def get_most_popular_stations():

    df = pd.read_sql(
        """
    SELECT COUNT(ride_id) as n, MAX(start_station_name) as station
    FROM RIDES
    WHERE start_station_name is NOT NULL
    GROUP BY start_station_id
    ORDER BY n DESC
    LIMIT 5
    """,
    con=connection_string
    )
    fig_m, ax = plt.subplots()
    ax.bar(x=df['station'], height=df['n'])
    ax.set_title("Most popular stations")
    ax.set_ylabel("Number of Rides")
    ax.set_xlabel("Station Name")
    ax.set_xticklabels(
        df['station'], rotation=45, ha="right", rotation_mode="anchor"
    )
    ax.tick_params(axis="x", labelsize=8)
    fig_m.tight_layout()
    return fig_m
```

如果您在本地运行我们的脚本，可以像下面这样将凭据作为环境变量传递：

```bash
DB_USER='username' DB_PASSWORD='password' DB_HOST='host' python app.py
```

## 步骤 2.c - 编写您的 gradio 应用程序

我们将使用两个单独的 `gr.Plot` 组件将我们的 matplotlib 图表并排显示在一起，使用 `gr.Row()`。
因为我们已经在 `demo.load()` 事件触发器中封装了获取数据的函数，
我们的演示将在每次网页加载时从数据库**动态**获取最新数据。🪄

```python
import gradio as gr

with gr.Blocks() as demo:
    with gr.Row():
        bike_type = gr.Plot()
        station = gr.Plot()

    demo.load(get_count_ride_type, inputs=None, outputs=bike_type)
    demo.load(get_most_popular_stations, inputs=None, outputs=station)

demo.launch()
```

## 步骤 3 - 部署

如果您运行上述代码，您的应用程序将在本地运行。
您甚至可以通过将 `share=True` 参数传递给 `launch` 来获得一个临时共享链接。

但是如果您想要一个永久的部署解决方案呢？
让我们将我们的 Gradio 应用程序部署到免费的 HuggingFace Spaces 平台上。

如果您之前没有使用过 Spaces，请按照之前的指南[这里](/using_hugging_face_integrations)进行操作。
您将需要将 `DB_USER`、`DB_PASSWORD` 和 `DB_HOST` 变量添加为 "Repo Secrets"。您可以在 " 设置 " 选项卡中进行此操作。

![secrets](/assets/guides/secrets.png)

## 结论

恭喜你！您知道如何将您的 Gradio 应用程序连接到云端托管的数据库！☁️

我们的仪表板现在正在[Spaces](https://huggingface.co/spaces/gradio/chicago-bike-share-dashboard)上运行。
完整代码在[这里](https://huggingface.co/spaces/gradio/chicago-bike-share-dashboard/blob/main/app.py)

正如您所见，Gradio 使您可以连接到您的数据并以您想要的方式显示！🔥

---

<!-- Source: guides/cn/06_client-libraries/01_getting-started-with-the-python-client.md -->
# 使用 Gradio Python 客户端入门

Tags: CLIENT, API, SPACES

Gradio Python 客户端使得将任何 Gradio 应用程序作为 API 使用变得非常容易。例如，考虑一下从麦克风录制的[Whisper 音频文件](https://huggingface.co/spaces/abidlabs/whisper)的转录。

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/whisper-screenshot.jpg)

使用 `gradio_client` 库，我们可以轻松地将 Gradio 用作 API，以编程方式转录音频文件。

下面是完成此操作的整个代码：

```python
from gradio_client import Client

client = Client("abidlabs/whisper")
client.predict("audio_sample.wav")

>> "这是Whisper语音识别模型的测试。"
```

Gradio 客户端适用于任何托管在 Hugging Face Spaces 上的 Gradio 应用程序，无论是图像生成器、文本摘要生成器、有状态聊天机器人、税金计算器还是其他任何应用程序！Gradio 客户端主要用于托管在[Hugging Face Spaces](https://hf.space)上的应用程序，但你的应用程序可以托管在任何地方，比如你自己的服务器。

**先决条件**：要使用 Gradio 客户端，你不需要详细了解 `gradio` 库。但是，了解 Gradio 的输入和输出组件的概念会有所帮助。

## 安装

如果你已经安装了最新版本的 `gradio`，那么 `gradio_client` 就作为依赖项包含在其中。

否则，可以使用 pip（或 pip3）安装轻量级的 `gradio_client` 包，并且已经测试可以在 Python 3.9 或更高版本上运行：

```bash
$ pip install gradio_client
```

## 连接到运行中的 Gradio 应用程序

首先创建一个 `Client` 对象，并将其连接到运行在 Hugging Face Spaces 上或其他任何地方的 Gradio 应用程序。

## 连接到 Hugging Face 空间

```python
from gradio_client import Client

client = Client("abidlabs/en2fr")  # 一个将英文翻译为法文的Space
```

你还可以通过在 `hf_token` 参数中传递你的 HF 令牌来连接到私有空间。你可以在这里获取你的 HF 令牌：https://huggingface.co/settings/tokens

```python
from gradio_client import Client

client = Client("abidlabs/my-private-space", hf_token="...")
```

## 复制空间以供私人使用

虽然你可以将任何公共空间用作 API，但如果你发出太多请求，你可能会受到 Hugging Face 的频率限制。要无限制地使用一个空间，只需将其复制以创建一个私有空间，然后可以根据需要进行多个请求！

`gradio_client` 包括一个类方法：`Client.duplicate()`，使这个过程变得简单（你需要传递你的[Hugging Face 令牌](https://huggingface.co/settings/tokens)或使用 Hugging Face CLI 登录）：

```python
import os
from gradio_client import Client

HF_TOKEN = os.environ.get("HF_TOKEN")

client = Client.duplicate("abidlabs/whisper", hf_token=HF_TOKEN)
client.predict("audio_sample.wav")

>> "This is a test of the whisper speech recognition model."
```

> > " 这是 Whisper 语音识别模型的测试。"

如果之前已复制了一个空间，重新运行 `duplicate()` 将*不会*创建一个新的空间。相反，客户端将连接到之前创建的空间。因此，多次运行 `Client.duplicate()` 方法是安全的。

**注意：** 如果原始空间使用了 GPU，你的私有空间也将使用 GPU，并且你的 Hugging Face 账户将根据 GPU 的价格计费。为了降低费用，在 1 小时没有活动后，你的空间将自动休眠。你还可以使用 `duplicate()` 的 `hardware` 参数来设置硬件。

## 连接到通用 Gradio 应用程序

如果你的应用程序运行在其他地方，只需提供完整的 URL，包括 "http://" 或 "https://"。下面是一个在共享 URL 上运行的 Gradio 应用程序进行预测的示例：

```python
from gradio_client import Client

client = Client("https://bec81a83-5b5c-471e.gradio.live")
```

## 检查 API 端点

一旦连接到 Gradio 应用程序，可以通过调用 `Client.view_api()` 方法查看可用的 API 端点。对于 Whisper 空间，我们可以看到以下信息：

```bash
Client.predict() Usage Info
---------------------------
Named API endpoints: 1

 - predict(input_audio, api_name="/predict") -> value_0
    Parameters:
     - [Audio] input_audio: str (filepath or URL)
    Returns:
     - [Textbox] value_0: str (value)
```

这显示了在此空间中有 1 个 API 端点，并显示了如何使用 API 端点进行预测：我们应该调用 `.predict()` 方法（我们将在下面探讨），提供类型为 `str` 的参数 `input_audio`，它是一个`文件路径或 URL`。

我们还应该提供 `api_name='/predict'` 参数给 `predict()` 方法。虽然如果一个 Gradio 应用程序只有一个命名的端点，这不是必需的，但它允许我们在单个应用程序中调用不同的端点（如果它们可用）。如果一个应用程序有无名的 API 端点，可以通过运行 `.view_api(all_endpoints=True)` 来显示它们。

## 进行预测

进行预测的最简单方法是只需使用相应的参数调用 `.predict()` 函数：

```python
from gradio_client import Client

client = Client("abidlabs/en2fr", api_name='/predict')
client.predict("Hello")

>> Bonjour
```

如果有多个参数，那么你应该将它们作为单独的参数传递给 `.predict()`，就像这样：

````python
from gradio_client import Client

client = Client("gradio/calculator")
client.predict(4, "add", 5)

>> 9.0


对于某些输入，例如图像，你应该传递文件的文件路径或URL。同样，对应的输出类型，你将获得一个文件路径或URL。


```python
from gradio_client import Client

client = Client("abidlabs/whisper")
client.predict("https://audio-samples.github.io/samples/mp3/blizzard_unconditional/sample-0.mp3")

>> "My thought I have nobody by a beauty and will as you poured. Mr. Rochester is serve in that so don't find simpus, and devoted abode, to at might in a r—"

````

## 异步运行任务（Running jobs asynchronously）

应注意`.predict()`是一个*阻塞*操作，因为它在返回预测之前等待操作完成。

在许多情况下，直到你需要预测结果之前，你最好让作业在后台运行。你可以通过使用`.submit()`方法创建一个`Job`实例，然后稍后调用`.result()`在作业上获取结果。例如：

```python
from gradio_client import Client

client = Client(space="abidlabs/en2fr")
job = client.submit("Hello", api_name="/predict")  # 这不是阻塞的

# 做其他事情

job.result()  # 这是阻塞的

>> Bonjour
```

## 添加回调 （Adding callbacks）

或者，可以添加一个或多个回调来在作业完成后执行操作，像这样：

```python
from gradio_client import Client

def print_result(x):
    print(" 翻译的结果是：{x}")

client = Client(space="abidlabs/en2fr")

job = client.submit("Hello", api_name="/predict", result_callbacks=[print_result])

# 做其他事情

>> 翻译的结果是：Bonjour

```

## 状态 （Status）

`Job`对象还允许您通过调用`.status()`方法获取运行作业的状态。这将返回一个`StatusUpdate`对象，具有以下属性：`code`（状态代码，其中之一表示状态的一组定义的字符串。参见`utils.Status`类）、`rank`（此作业在队列中的当前位置）、`queue_size`（总队列大小）、`eta`（此作业将完成的预计时间）、`success`（表示作业是否成功完成的布尔值）和`time`（生成状态的时间）。

```py
from gradio_client import Client

client = Client(src="gradio/calculator")
job = client.submit(5, "add", 4, api_name="/predict")
job.status()

>> <Status.STARTING: 'STARTING'>
```

_注意_：`Job`类还有一个`.done()`实例方法，返回一个布尔值，指示作业是否已完成。

## 取消作业 （Cancelling Jobs）

`Job`类还有一个`.cancel()`实例方法，取消已排队但尚未开始的作业。例如，如果你运行：

```py
client = Client("abidlabs/whisper")
job1 = client.submit("audio_sample1.wav")
job2 = client.submit("audio_sample2.wav")
job1.cancel()  # 将返回 False，假设作业已开始
job2.cancel()  # 将返回 True，表示作业已取消
```

如果第一个作业已开始处理，则它将不会被取消。如果第二个作业尚未开始，则它将成功取消并从队列中删除。

## 生成器端点 （Generator Endpoints）

某些Gradio API端点不返回单个值，而是返回一系列值。你可以随时从这样的生成器端点获取返回的一系列值，方法是运行`job.outputs()`：

```py
from gradio_client import Client

client = Client(src="gradio/count_generator")
job = client.submit(3, api_name="/count")
while not job.done():
    time.sleep(0.1)
job.outputs()

>> ['0', '1', '2']
```

请注意，在生成器端点上运行`job.result()`只会获得端点返回的*第一个*值。

`Job`对象还是可迭代的，这意味着您可以使用它按照从端点返回的结果逐个显示生成器函数的结果。以下是使用`Job`作为生成器的等效示例：

```py
from gradio_client import Client

client = Client(src="gradio/count_generator")
job = client.submit(3, api_name="/count")

for o in job:
    print(o)

>> 0
>> 1
>> 2
```

你还可以取消具有迭代输出的作业，在这种情况下，作业将在当前迭代完成运行后完成。

```py
from gradio_client import Client
import time

client = Client("abidlabs/test-yield")
job = client.submit("abcdef")
time.sleep(3)
job.cancel()  # 作业在运行 2 个迭代后取消
```

---

<!-- Source: guides/02_building-interfaces/02_flagging.md -->

# Flagging

You may have noticed the "Flag" button that appears by default in your `Interface`. When a user using your demo sees input with interesting output, such as erroneous or unexpected model behaviour, they can flag the input for you to review. Within the directory provided by the `flagging_dir=` argument to the `Interface` constructor, a CSV file will log the flagged inputs. If the interface involves file data, such as for Image and Audio components, folders will be created to store those flagged data as well.

For example, with the calculator interface shown above, we would have the flagged data stored in the flagged directory shown below:

```directory
+-- calculator.py
+-- flagged/
|   +-- logs.csv
```

_flagged/logs.csv_

```csv
num1,operation,num2,Output
5,add,7,12
6,subtract,1.5,4.5
```

With the sepia interface shown earlier, we would have the flagged data stored in the flagged directory shown below:

```directory
+-- sepia.py
+-- flagged/
|   +-- logs.csv
|   +-- im/
|   |   +-- 0.png
|   |   +-- 1.png
|   +-- Output/
|   |   +-- 0.png
|   |   +-- 1.png
```

_flagged/logs.csv_

```csv
im,Output
im/0.png,Output/0.png
im/1.png,Output/1.png
```

If you wish for the user to provide a reason for flagging, you can pass a list of strings to the `flagging_options` argument of Interface. Users will have to select one of the strings when flagging, which will be saved as an additional column to the CSV.

---

<!-- Source: guides/03_building-with-blocks/02_controlling-layout.md -->
# Controlling Layout

By default, Components in Blocks are arranged vertically. Let's take a look at how we can rearrange Components. Under the hood, this layout structure uses the [flexbox model of web development](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox).

## Rows

Elements within a `with gr.Row` clause will all be displayed horizontally. For example, to display two Buttons side by side:

```python
with gr.Blocks() as demo:
    with gr.Row():
        btn1 = gr.Button("Button 1")
        btn2 = gr.Button("Button 2")
```

You can set every element in a Row to have the same height. Configure this with the `equal_height` argument.

```python
with gr.Blocks() as demo:
    with gr.Row(equal_height=True):
        textbox = gr.Textbox()
        btn2 = gr.Button("Button 2")
```

The widths of elements in a Row can be controlled via a combination of `scale` and `min_width` arguments that are present in every Component.

- `scale` is an integer that defines how an element will take up space in a Row. If scale is set to `0`, the element will not expand to take up space. If scale is set to `1` or greater, the element will expand. Multiple elements in a row will expand proportional to their scale. Below, `btn2` will expand twice as much as `btn1`, while `btn0` will not expand at all:

```python
with gr.Blocks() as demo:
    with gr.Row():
        btn0 = gr.Button("Button 0", scale=0)
        btn1 = gr.Button("Button 1", scale=1)
        btn2 = gr.Button("Button 2", scale=2)
```

- `min_width` will set the minimum width the element will take. The Row will wrap if there isn't sufficient space to satisfy all `min_width` values.

Learn more about Rows in the [docs](https://gradio.app/docs/row).

## Columns and Nesting

Components within a Column will be placed vertically atop each other. Since the vertical layout is the default layout for Blocks apps anyway, to be useful, Columns are usually nested within Rows. For example:

$code_rows_and_columns
$demo_rows_and_columns

See how the first column has two Textboxes arranged vertically. The second column has an Image and Button arranged vertically. Notice how the relative widths of the two columns is set by the `scale` parameter. The column with twice the `scale` value takes up twice the width.

Learn more about Columns in the [docs](https://gradio.app/docs/column).

# Fill Browser Height / Width

To make an app take the full width of the browser by removing the side padding, use `gr.Blocks(fill_width=True)`. 

To make top level Components expand to take the full height of the browser, use `fill_height` and apply scale to the expanding Components.

```python
import gradio as gr

with gr.Blocks(fill_height=True) as demo:
    gr.Chatbot(scale=1)
    gr.Textbox(scale=0)
```

## Dimensions

Some components support setting height and width. These parameters accept either a number (interpreted as pixels) or a string. Using a string allows the direct application of any CSS unit to the encapsulating Block element.

Below is an example illustrating the use of viewport width (vw):

```python
import gradio as gr

with gr.Blocks() as demo:
    im = gr.ImageEditor(width="50vw")

demo.launch()
```

## Tabs and Accordions

You can also create Tabs using the `with gr.Tab('tab_name'):` clause. Any component created inside of a `with gr.Tab('tab_name'):` context appears in that tab. Consecutive Tab clauses are grouped together so that a single tab can be selected at one time, and only the components within that Tab's context are shown.

For example:

$code_blocks_flipper
$demo_blocks_flipper

Also note the `gr.Accordion('label')` in this example. The Accordion is a layout that can be toggled open or closed. Like `Tabs`, it is a layout element that can selectively hide or show content. Any components that are defined inside of a `with gr.Accordion('label'):` will be hidden or shown when the accordion's toggle icon is clicked.

Learn more about [Tabs](https://gradio.app/docs/tab) and [Accordions](https://gradio.app/docs/accordion) in the docs.

## Sidebar

The sidebar is a collapsible panel that renders child components on the left side of the screen and can be expanded or collapsed.

For example:

$code_blocks_sidebar

Learn more about [Sidebar](https://gradio.app/docs/gradio/sidebar) in the docs.


## Multi-step walkthroughs

In order to provide a guided set of ordered steps, a controlled workflow, you can use the `Walkthrough` component with accompanying `Step` components.

The `Walkthrough` component has a visual style and user experience tailored for this usecase.

Authoring this component is very similar to `Tab`, except it is the app developers responsibility to progress through each step, by setting the appropriate ID for the parent `Walkthrough` which should correspond to an ID provided to an indvidual `Step`. 

$demo_walkthrough

Learn more about [Walkthrough](https://gradio.app/docs/gradio/walkthrough) in the docs.


## Visibility

Both Components and Layout elements have a `visible` argument that can set initially and also updated. Setting `gr.Column(visible=...)` on a Column can be used to show or hide a set of Components.

$code_blocks_form
$demo_blocks_form

## Defining and Rendering Components Separately

In some cases, you might want to define components before you actually render them in your UI. For instance, you might want to show an examples section using `gr.Examples` above the corresponding `gr.Textbox` input. Since `gr.Examples` requires as a parameter the input component object, you will need to first define the input component, but then render it later, after you have defined the `gr.Examples` object.

The solution to this is to define the `gr.Textbox` outside of the `gr.Blocks()` scope and use the component's `.render()` method wherever you'd like it placed in the UI.

Here's a full code example:

```python
input_textbox = gr.Textbox()

with gr.Blocks() as demo:
    gr.Examples(["hello", "bonjour", "merhaba"], input_textbox)
    input_textbox.render()
```

Similarly, if you have already defined a component in a Gradio app, but wish to unrender it so that you can define in a different part of your application, then you can call the `.unrender()` method. In the following example, the `Textbox` will appear in the third column:

```py
import gradio as gr

with gr.Blocks() as demo:
    with gr.Row():
        with gr.Column():
            gr.Markdown("Row 1")
            textbox = gr.Textbox()
        with gr.Column():
            gr.Markdown("Row 2")
            textbox.unrender()
        with gr.Column():
            gr.Markdown("Row 3")
            textbox.render()

demo.launch()
```

---

<!-- Source: guides/04_additional-features/02_streaming-outputs.md -->
# Streaming outputs

In some cases, you may want to stream a sequence of outputs rather than show a single output at once. For example, you might have an image generation model and you want to show the image that is generated at each step, leading up to the final image. Or you might have a chatbot which streams its response one token at a time instead of returning it all at once.

In such cases, you can supply a **generator** function into Gradio instead of a regular function. Creating generators in Python is very simple: instead of a single `return` value, a function should `yield` a series of values instead. Usually the `yield` statement is put in some kind of loop. Here's an example of an generator that simply counts up to a given number:

```python
def my_generator(x):
    for i in range(x):
        yield i
```

You supply a generator into Gradio the same way as you would a regular function. For example, here's a a (fake) image generation model that generates noise for several steps before outputting an image using the `gr.Interface` class:

$code_fake_diffusion
$demo_fake_diffusion

Note that we've added a `time.sleep(1)` in the iterator to create an artificial pause between steps so that you are able to observe the steps of the iterator (in a real image generation model, this probably wouldn't be necessary).

Similarly, Gradio can handle streaming inputs, e.g. an image generation model that reruns every time a user types a letter in a textbox. This is covered in more details in our guide on building [reactive Interfaces](/guides/reactive-interfaces). 

## Streaming Media

Gradio can stream audio and video directly from your generator function.
This lets your user hear your audio or see your video nearly as soon as it's `yielded` by your function.
All you have to do is 

1. Set `streaming=True` in your `gr.Audio` or `gr.Video` output component.
2. Write a python generator that yields the next "chunk" of audio or video.
3. Set `autoplay=True` so that the media starts playing automatically.

For audio, the next "chunk" can be either an `.mp3` or `.wav` file or a `bytes` sequence of audio.
For video, the next "chunk" has to be either `.mp4` file or a file with `h.264` codec with a `.ts` extension.
For smooth playback, make sure chunks are consistent lengths and larger than 1 second.

We'll finish with some simple examples illustrating these points.

### Streaming Audio

```python
import gradio as gr
from time import sleep

def keep_repeating(audio_file):
    for _ in range(10):
        sleep(0.5)
        yield audio_file

gr.Interface(keep_repeating,
             gr.Audio(sources=["microphone"], type="filepath"),
             gr.Audio(streaming=True, autoplay=True)
).launch()
```

### Streaming Video

```python
import gradio as gr
from time import sleep

def keep_repeating(video_file):
    for _ in range(10):
        sleep(0.5)
        yield video_file

gr.Interface(keep_repeating,
             gr.Video(sources=["webcam"], format="mp4"),
             gr.Video(streaming=True, autoplay=True)
).launch()
```

## End-to-End Examples

For an end-to-end example of streaming media, see the object detection from video [guide](/main/guides/object-detection-from-video) or the streaming AI-generated audio with [transformers](https://huggingface.co/docs/transformers/index) [guide](/main/guides/streaming-ai-generated-audio).

---

<!-- Source: guides/05_chatbots/02_chatinterface-examples.md -->
# Using Popular LLM libraries and APIs

Tags: LLM, CHATBOT, API

In this Guide, we go through several examples of how to use `gr.ChatInterface` with popular LLM libraries and API providers.

We will cover the following libraries and API providers:

* [Llama Index](#llama-index)
* [LangChain](#lang-chain)
* [OpenAI](#open-ai)
* [Hugging Face `transformers`](#hugging-face-transformers)
* [SambaNova](#samba-nova)
* [Hyperbolic](#hyperbolic)
* [Anthropic's Claude](#anthropics-claude)

For many LLM libraries and providers, there exist community-maintained integration libraries that make it even easier to spin up Gradio apps. We reference these libraries in the appropriate sections below.

## Llama Index

Let's start by using `llama-index` on top of `openai` to build a RAG chatbot on any text or PDF files that you can demo and share in less than 30 lines of code. You'll need to have an OpenAI key for this example (keep reading for the free, open-source equivalent!)

$code_llm_llamaindex

## LangChain

Here's an example using `langchain` on top of `openai` to build a general-purpose chatbot. As before, you'll need to have an OpenAI key for this example.

$code_llm_langchain

Tip: For quick prototyping, the community-maintained <a href='https://github.com/AK391/langchain-gradio'>langchain-gradio repo</a>  makes it even easier to build chatbots on top of LangChain.

## OpenAI

Of course, we could also use the `openai` library directy. Here a similar example to the LangChain , but this time with streaming as well:

Tip: For quick prototyping, the  <a href='https://github.com/gradio-app/openai-gradio'>openai-gradio library</a> makes it even easier to build chatbots on top of OpenAI models.


## Hugging Face `transformers`

Of course, in many cases you want to run a chatbot locally. Here's the equivalent example using the SmolLM2-135M-Instruct model using the Hugging Face `transformers` library.

$code_llm_hf_transformers

## SambaNova

The SambaNova Cloud API provides access to full-precision open-source models, such as the Llama family. Here's an example of how to build a Gradio app around the SambaNova API

$code_llm_sambanova

Tip: For quick prototyping, the  <a href='https://github.com/gradio-app/sambanova-gradio'>sambanova-gradio library</a> makes it even easier to build chatbots on top of SambaNova models.

## Hyperbolic

The Hyperbolic AI API provides access to many open-source models, such as the Llama family. Here's an example of how to build a Gradio app around the Hyperbolic

$code_llm_hyperbolic

Tip: For quick prototyping, the  <a href='https://github.com/HyperbolicLabs/hyperbolic-gradio'>hyperbolic-gradio library</a> makes it even easier to build chatbots on top of Hyperbolic models.


## Anthropic's Claude 

Anthropic's Claude model can also be used via API. Here's a simple 20 questions-style game built on top of the Anthropic API:

$code_llm_claude

---

<!-- Source: guides/06_data-science-and-plots/02_time-plots.md -->
# Time Plots

Creating visualizations with a time x-axis is a common use case. Let's dive in!

## Creating a Plot with a pd.Dataframe

Time plots need a datetime column on the x-axis. Here's a simple example with some flight data:

$code_plot_guide_temporal
$demo_plot_guide_temporal

## Aggregating by Time

You may wish to bin data by time buckets. Use `x_bin` to do so, using a string suffix with "s", "m", "h" or "d", such as "15m" or "1d".

$code_plot_guide_aggregate_temporal
$demo_plot_guide_aggregate_temporal

## DateTime Components

You can use `gr.DateTime` to accept input datetime data. This works well with plots for defining the x-axis range for the data.

$code_plot_guide_datetime
$demo_plot_guide_datetime

Note how `gr.DateTime` can accept a full datetime string, or a shorthand using `now - [0-9]+[smhd]` format to refer to a past time.

You will often have many time plots in which case you'd like to keep the x-axes in sync. The `DateTimeRange` custom component keeps a set of datetime plots in sync, and also uses the `.select` listener of plots to allow you to zoom into plots while keeping plots in sync. 

Because it is a custom component, you first need to `pip install gradio_datetimerange`. Then run the following:

$code_plot_guide_datetimerange
$demo_plot_guide_datetimerange

Try zooming around in the plots and see how DateTimeRange updates. All the plots updates their `x_lim` in sync. You also have a "Back" link in the component to allow you to quickly zoom in and out.

## RealTime Data

In many cases, you're working with live, realtime date, not a static dataframe. In this case, you'd update the plot regularly with a `gr.Timer()`. Assuming there's a `get_data` method that gets the latest dataframe:

```python
with gr.Blocks() as demo:
    timer = gr.Timer(5)
    plot1 = gr.BarPlot(x="time", y="price")
    plot2 = gr.BarPlot(x="time", y="price", color="origin")

    timer.tick(lambda: [get_data(), get_data()], outputs=[plot1, plot2])
```

You can also use the `every` shorthand to attach a `Timer` to a component that has a function value:

```python
with gr.Blocks() as demo:
    timer = gr.Timer(5)
    plot1 = gr.BarPlot(get_data, x="time", y="price", every=timer)
    plot2 = gr.BarPlot(get_data, x="time", y="price", color="origin", every=timer)
```

---

<!-- Source: guides/07_streaming/02_object-detection-from-webcam-with-webrtc.md -->
# Real Time Object Detection from a Webcam Stream with FastRTC

Tags: VISION, STREAMING, WEBCAM

In this guide, we'll use YOLOv10 to perform real-time object detection in Gradio from a user's webcam feed. We'll utilize [FastRTC](https://fastrtc.org/) a companion library from the gradio team for building low latency streaming web applications. You can see the finished product in action below:

<video src="https://github.com/user-attachments/assets/4584cec6-8c1a-401b-9b61-a4fe0718b558" controls
height="600" width="600" style="display: block; margin: auto;" autoplay="true" loop="true">
</video>

## Setting up

Start by installing all the dependencies. Add the following lines to a `requirements.txt` file and run `pip install -r requirements.txt`:

```bash
opencv-python
fastrtc
onnxruntime-gpu
```

We'll use the ONNX runtime to speed up YOLOv10 inference. This guide assumes you have access to a GPU. If you don't, change `onnxruntime-gpu` to `onnxruntime`. Without a GPU, the model will run slower, resulting in a laggy demo.

We'll use OpenCV for image manipulation and the [WebRTC](https://webrtc.org/) protocol to achieve near-zero latency.

**Note**: If you want to deploy this app on any cloud provider, you'll need to use your Hugging Face token to connect to a TURN server. Learn more in this [guide](https://fastrtc.org/deployment/). If you're not familiar with TURN servers, consult this [guide](https://www.twilio.com/docs/stun-turn/faq#faq-what-is-nat).

## The Inference Function

We'll download the YOLOv10 model from the Hugging Face hub and instantiate a custom inference class to use this model. 

The implementation of the inference class isn't covered in this guide, but you can find the source code [here](https://huggingface.co/spaces/freddyaboulton/webrtc-yolov10n/blob/main/inference.py#L9) if you're interested. This implementation borrows heavily from this [github repository](https://github.com/ibaiGorordo/ONNX-YOLOv8-Object-Detection).

We're using the `yolov10-n` variant because it has the lowest latency. See the [Performance](https://github.com/THU-MIG/yolov10?tab=readme-ov-file#performance) section of the README in the YOLOv10 GitHub repository.

```python
from huggingface_hub import hf_hub_download
from inference import YOLOv10

model_file = hf_hub_download(
    repo_id="onnx-community/yolov10n", filename="onnx/model.onnx"
)

model = YOLOv10(model_file)

def detection(image, conf_threshold=0.3):
    image = cv2.resize(image, (model.input_width, model.input_height))
    new_image = model.detect_objects(image, conf_threshold)
    return new_image
```

Our inference function, `detection`, accepts a numpy array from the webcam and a desired confidence threshold. Object detection models like YOLO identify many objects and assign a confidence score to each. The lower the confidence, the higher the chance of a false positive. We'll let users adjust the confidence threshold.

The function returns a numpy array corresponding to the same input image with all detected objects in bounding boxes.

## The Gradio Demo

The Gradio demo is straightforward, but we'll implement a few specific features:

1. Use the `WebRTC` custom component to ensure input and output are sent to/from the server with WebRTC. 
2. The [WebRTC](https://github.com/freddyaboulton/gradio-webrtc) component will serve as both an input and output component.
3. Utilize the `time_limit` parameter of the `stream` event. This parameter sets a processing time for each user's stream. In a multi-user setting, such as on Spaces, we'll stop processing the current user's stream after this period and move on to the next. 

We'll also apply custom CSS to center the webcam and slider on the page.

```python
import gradio as gr
from fastrtc import WebRTC

css = """.my-group {max-width: 600px !important; max-height: 600px !important;}
         .my-column {display: flex !important; justify-content: center !important; align-items: center !important;}"""

with gr.Blocks(css=css) as demo:
    gr.HTML(
        """
        <h1 style='text-align: center'>
        YOLOv10 Webcam Stream (Powered by WebRTC ⚡️)
        </h1>
        """
    )
    with gr.Column(elem_classes=["my-column"]):
        with gr.Group(elem_classes=["my-group"]):
            image = WebRTC(label="Stream", rtc_configuration=rtc_configuration)
            conf_threshold = gr.Slider(
                label="Confidence Threshold",
                minimum=0.0,
                maximum=1.0,
                step=0.05,
                value=0.30,
            )

        image.stream(
            fn=detection, inputs=[image, conf_threshold], outputs=[image], time_limit=10
        )

if __name__ == "__main__":
    demo.launch()
```

## Conclusion

Our app is hosted on Hugging Face Spaces [here](https://huggingface.co/spaces/freddyaboulton/webrtc-yolov10n). 

You can use this app as a starting point to build real-time image applications with Gradio. Don't hesitate to open issues in the space or in the [FastRTC GitHub repo](https://github.com/gradio-app/fastrtc) if you have any questions or encounter problems.

---

<!-- Source: guides/08_custom-components/02_key-component-concepts.md -->
# Gradio Components: The Key Concepts

In this section, we discuss a few important concepts when it comes to components in Gradio.
It's important to understand these concepts when developing your own component.
Otherwise, your component may behave very different to other Gradio components!

Tip:  You can skip this section if you are familiar with the internals of the Gradio library, such as each component's preprocess and postprocess methods.

## Interactive vs Static

Every component in Gradio comes in a `static` variant, and most come in an `interactive` version as well.
The `static` version is used when a component is displaying a value, and the user can **NOT** change that value by interacting with it. 
The `interactive` version is used when the user is able to change the value by interacting with the Gradio UI.

Let's see some examples:

```python
import gradio as gr

with gr.Blocks() as demo:
   gr.Textbox(value="Hello", interactive=True)
   gr.Textbox(value="Hello", interactive=False)

demo.launch()

```
This will display two textboxes.
The only difference: you'll be able to edit the value of the Gradio component on top, and you won't be able to edit the variant on the bottom (i.e. the textbox will be disabled).

Perhaps a more interesting example is with the `Image` component:

```python
import gradio as gr

with gr.Blocks() as demo:
   gr.Image(interactive=True)
   gr.Image(interactive=False)

demo.launch()
```

The interactive version of the component is much more complex -- you can upload images or snap a picture from your webcam -- while the static version can only be used to display images.

Not every component has a distinct interactive version. For example, the `gr.AnnotatedImage` only appears as a static version since there's no way to interactively change the value of the annotations or the image.

### What you need to remember

* Gradio will use the interactive version (if available) of a component if that component is used as the **input** to any event; otherwise, the static version will be used.

* When you design custom components, you **must** accept the boolean interactive keyword in the constructor of your Python class. In the frontend, you **may** accept the `interactive` property, a `bool` which represents whether the component should be static or interactive. If you do not use this property in the frontend, the component will appear the same in interactive or static mode.

## The value and how it is preprocessed/postprocessed

The most important attribute of a component is its `value`.
Every component has a `value`.
The value that is typically set by the user in the frontend (if the component is interactive) or displayed to the user (if it is static). 
It is also this value that is sent to the backend function when a user triggers an event, or returned by the user's function e.g. at the end of a prediction.

So this value is passed around quite a bit, but sometimes the format of the value needs to change between the frontend and backend. 
Take a look at this example:

```python
import numpy as np
import gradio as gr

def sepia(input_img):
    sepia_filter = np.array([
        [0.393, 0.769, 0.189], 
        [0.349, 0.686, 0.168], 
        [0.272, 0.534, 0.131]
    ])
    sepia_img = input_img.dot(sepia_filter.T)
    sepia_img /= sepia_img.max()
    return sepia_img

demo = gr.Interface(sepia, gr.Image(width=200, height=200), "image")
demo.launch()
```

This will create a Gradio app which has an `Image` component as the input and the output. 
In the frontend, the Image component will actually **upload** the file to the server and send the **filepath** but this is converted to a `numpy` array before it is sent to a user's function. 
Conversely, when the user returns a `numpy` array from their function, the numpy array is converted to a file so that it can be sent to the frontend and displayed by the `Image` component.

Tip: By default, the `Image` component sends numpy arrays to the python function because it is a common choice for machine learning engineers, though the Image component also supports other formats using the `type` parameter.  Read the `Image` docs [here](https://www.gradio.app/docs/image) to learn more.

Each component does two conversions:

1. `preprocess`: Converts the `value` from the format sent by the frontend to the format expected by the python function. This usually involves going from a web-friendly **JSON** structure to a **python-native** data structure, like a `numpy` array or `PIL` image. The `Audio`, `Image` components are good examples of `preprocess` methods.

2. `postprocess`: Converts the value returned by the python function to the format expected by the frontend. This usually involves going from a **python-native** data-structure, like a `PIL` image to a **JSON** structure.

### What you need to remember

* Every component must implement `preprocess` and `postprocess` methods. In the rare event that no conversion needs to happen, simply return the value as-is. `Textbox` and `Number` are examples of this. 

* As a component author, **YOU** control the format of the data displayed in the frontend as well as the format of the data someone using your component will receive. Think of an ergonomic data-structure a **python** developer will find intuitive, and control the conversion from a **Web-friendly JSON** data structure (and vice-versa) with `preprocess` and `postprocess.`

## The "Example Version" of a Component

Gradio apps support providing example inputs -- and these are very useful in helping users get started using your Gradio app. 
In `gr.Interface`, you can provide examples using the `examples` keyword, and in `Blocks`, you can provide examples using the special `gr.Examples` component.

At the bottom of this screenshot, we show a miniature example image of a cheetah that, when clicked, will populate the same image in the input Image component:

![img](https://user-images.githubusercontent.com/1778297/277548211-a3cb2133-2ffc-4cdf-9a83-3e8363b57ea6.png)


To enable the example view, you must have the following two files in the top of the `frontend` directory:

* `Example.svelte`: this corresponds to the "example version" of your component
* `Index.svelte`: this corresponds to the "regular version"

In the backend, you typically don't need to do anything. The user-provided example `value` is processed using the same `.postprocess()` method described earlier. If you'd like to do process the data differently (for example, if the `.postprocess()` method is computationally expensive), then you can write your own `.process_example()` method for your custom component, which will be used instead. 

The `Example.svelte` file and `process_example()` method will be covered in greater depth in the dedicated [frontend](./frontend) and [backend](./backend) guides respectively.

### What you need to remember

* If you expect your component to be used as input, it is important to define an "Example" view.
* If you don't, Gradio will use a default one but it won't be as informative as it can be!

## Conclusion

Now that you know the most important pieces to remember about Gradio components, you can start to design and build your own!

---

<!-- Source: guides/09_gradio-clients-and-lite/02_getting-started-with-the-js-client.md -->
# Getting Started with the Gradio JavaScript Client

Tags: CLIENT, API, SPACES

The Gradio JavaScript Client makes it very easy to use any Gradio app as an API. As an example, consider this [Hugging Face Space that transcribes audio files](https://huggingface.co/spaces/abidlabs/whisper) that are recorded from the microphone.

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/whisper-screenshot.jpg)

Using the `@gradio/client` library, we can easily use the Gradio as an API to transcribe audio files programmatically.

Here's the entire code to do it:

```js
import { Client, handle_file } from "@gradio/client";

const response = await fetch(
	"https://github.com/audio-samples/audio-samples.github.io/raw/master/samples/wav/ted_speakers/SalmanKhan/sample-1.wav"
);
const audio_file = await response.blob();

const app = await Client.connect("abidlabs/whisper");
const transcription = await app.predict("/predict", [handle_file(audio_file)]);

console.log(transcription.data);
// [ "I said the same phrase 30 times." ]
```

The Gradio Client works with any hosted Gradio app, whether it be an image generator, a text summarizer, a stateful chatbot, a tax calculator, or anything else! The Gradio Client is mostly used with apps hosted on [Hugging Face Spaces](https://hf.space), but your app can be hosted anywhere, such as your own server.

**Prequisites**: To use the Gradio client, you do _not_ need to know the `gradio` library in great detail. However, it is helpful to have general familiarity with Gradio's concepts of input and output components.

## Installation via npm

Install the @gradio/client package to interact with Gradio APIs using Node.js version >=18.0.0 or in browser-based projects. Use npm or any compatible package manager:

```bash
npm i @gradio/client
```

This command adds @gradio/client to your project dependencies, allowing you to import it in your JavaScript or TypeScript files.

## Installation via CDN

For quick addition to your web project, you can use the jsDelivr CDN to load the latest version of @gradio/client directly into your HTML:

```html
<script type="module">
	import { Client } from "https://cdn.jsdelivr.net/npm/@gradio/client/dist/index.min.js";
	...
</script>
```

Be sure to add this to the `<head>` of your HTML. This will install the latest version but we advise hardcoding the version in production. You can find all available versions [here](https://www.jsdelivr.com/package/npm/@gradio/client). This approach is ideal for experimental or prototying purposes, though has some limitations. A complete example would look like this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <script type="module">
        import { Client } from "https://cdn.jsdelivr.net/npm/@gradio/client/dist/index.min.js";
        const client = await Client.connect("abidlabs/en2fr");
        const result = await client.predict("/predict", {
            text: "My name is Hannah"
        });
        console.log(result);
    </script>
</head>
</html>
```

## Connecting to a running Gradio App

Start by connecting instantiating a `client` instance and connecting it to a Gradio app that is running on Hugging Face Spaces or generally anywhere on the web.

## Connecting to a Hugging Face Space

```js
import { Client } from "@gradio/client";

const app = await Client.connect("abidlabs/en2fr"); // a Space that translates from English to French
```

You can also connect to private Spaces by passing in your HF token with the `token` property of the options parameter. You can get your HF token here: https://huggingface.co/settings/tokens

```js
import { Client } from "@gradio/client";

const app = await Client.connect("abidlabs/my-private-space", { token: "hf_..." })
```

## Duplicating a Space for private use

While you can use any public Space as an API, you may get rate limited by Hugging Face if you make too many requests. For unlimited usage of a Space, simply duplicate the Space to create a private Space, and then use it to make as many requests as you'd like! You'll need to pass in your [Hugging Face token](https://huggingface.co/settings/tokens)).

`Client.duplicate` is almost identical to `Client.connect`, the only difference is under the hood:

```js
import { Client, handle_file } from "@gradio/client";

const response = await fetch(
	"https://audio-samples.github.io/samples/mp3/blizzard_unconditional/sample-0.mp3"
);
const audio_file = await response.blob();

const app = await Client.duplicate("abidlabs/whisper", { token: "hf_..." });
const transcription = await app.predict("/predict", [handle_file(audio_file)]);
```

If you have previously duplicated a Space, re-running `Client.duplicate` will _not_ create a new Space. Instead, the client will attach to the previously-created Space. So it is safe to re-run the `Client.duplicate` method multiple times with the same space.

**Note:** if the original Space uses GPUs, your private Space will as well, and your Hugging Face account will get billed based on the price of the GPU. To minimize charges, your Space will automatically go to sleep after 5 minutes of inactivity. You can also set the hardware using the `hardware` and `timeout` properties of `duplicate`'s options object like this:

```js
import { Client } from "@gradio/client";

const app = await Client.duplicate("abidlabs/whisper", {
	token: "hf_...",
	timeout: 60,
	hardware: "a10g-small"
});
```

## Connecting a general Gradio app

If your app is running somewhere else, just provide the full URL instead, including the "http://" or "https://". Here's an example of making predictions to a Gradio app that is running on a share URL:

```js
import { Client } from "@gradio/client";

const app = Client.connect("https://bec81a83-5b5c-471e.gradio.live");
```

## Connecting to a Gradio app with auth

If the Gradio application you are connecting to [requires a username and password](/guides/sharing-your-app#authentication), then provide them as a tuple to the `auth` argument of the `Client` class:

```js
import { Client } from "@gradio/client";

Client.connect(
  space_name,
  { auth: [username, password] }
)
```


## Inspecting the API endpoints

Once you have connected to a Gradio app, you can view the APIs that are available to you by calling the `Client`'s `view_api` method.

For the Whisper Space, we can do this:

```js
import { Client } from "@gradio/client";

const app = await Client.connect("abidlabs/whisper");

const app_info = await app.view_api();

console.log(app_info);
```

And we will see the following:

```json
{
	"named_endpoints": {
		"/predict": {
			"parameters": [
				{
					"label": "text",
					"component": "Textbox",
					"type": "string"
				}
			],
			"returns": [
				{
					"label": "output",
					"component": "Textbox",
					"type": "string"
				}
			]
		}
	},
	"unnamed_endpoints": {}
}
```

This shows us that we have 1 API endpoint in this space, and shows us how to use the API endpoint to make a prediction: we should call the `.predict()` method (which we will explore below), providing a parameter `input_audio` of type `string`, which is a url to a file.

We should also provide the `api_name='/predict'` argument to the `predict()` method. Although this isn't necessary if a Gradio app has only 1 named endpoint, it does allow us to call different endpoints in a single app if they are available. If an app has unnamed API endpoints, these can also be displayed by running `.view_api(all_endpoints=True)`.

## The "View API" Page

As an alternative to running the `.view_api()` method, you can click on the "Use via API" link in the footer of the Gradio app, which shows us the same information, along with example usage. 

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/view-api.png)

The View API page also includes an "API Recorder" that lets you interact with the Gradio UI normally and converts your interactions into the corresponding code to run with the JS Client.


## Making a prediction

The simplest way to make a prediction is simply to call the `.predict()` method with the appropriate arguments:

```js
import { Client } from "@gradio/client";

const app = await Client.connect("abidlabs/en2fr");
const result = await app.predict("/predict", ["Hello"]);
```

If there are multiple parameters, then you should pass them as an array to `.predict()`, like this:

```js
import { Client } from "@gradio/client";

const app = await Client.connect("gradio/calculator");
const result = await app.predict("/predict", [4, "add", 5]);
```

For certain inputs, such as images, you should pass in a `Buffer`, `Blob` or `File` depending on what is most convenient. In node, this would be a `Buffer` or `Blob`; in a browser environment, this would be a `Blob` or `File`.

```js
import { Client, handle_file } from "@gradio/client";

const response = await fetch(
	"https://audio-samples.github.io/samples/mp3/blizzard_unconditional/sample-0.mp3"
);
const audio_file = await response.blob();

const app = await Client.connect("abidlabs/whisper");
const result = await app.predict("/predict", [handle_file(audio_file)]);
```

## Using events

If the API you are working with can return results over time, or you wish to access information about the status of a job, you can use the iterable interface for more flexibility. This is especially useful for iterative endpoints or generator endpoints that will produce a series of values over time as discrete responses.

```js
import { Client } from "@gradio/client";

function log_result(payload) {
	const {
		data: [translation]
	} = payload;

	console.log(`The translated result is: ${translation}`);
}

const app = await Client.connect("abidlabs/en2fr");
const job = app.submit("/predict", ["Hello"]);

for await (const message of job) {
	log_result(message);
}
```

## Status

The event interface also allows you to get the status of the running job by instantiating the client with the `events` options passing `status` and `data` as an array:


```ts
import { Client } from "@gradio/client";

const app = await Client.connect("abidlabs/en2fr", {
	events: ["status", "data"]
});
```

This ensures that status messages are also reported to the client.

`status`es are returned as an object with the following attributes: `status` (a human readbale status of the current job, `"pending" | "generating" | "complete" | "error"`), `code` (the detailed gradio code for the job), `position` (the current position of this job in the queue), `queue_size` (the total queue size), `eta` (estimated time this job will complete), `success` (a boolean representing whether the job completed successfully), and `time` ( as `Date` object detailing the time that the status was generated).

```js
import { Client } from "@gradio/client";

function log_status(status) {
	console.log(
		`The current status for this job is: ${JSON.stringify(status, null, 2)}.`
	);
}

const app = await Client.connect("abidlabs/en2fr", {
	events: ["status", "data"]
});
const job = app.submit("/predict", ["Hello"]);

for await (const message of job) {
	if (message.type === "status") {
		log_status(message);
	}
}
```

## Cancelling Jobs

The job instance also has a `.cancel()` method that cancels jobs that have been queued but not started. For example, if you run:

```js
import { Client } from "@gradio/client";

const app = await Client.connect("abidlabs/en2fr");
const job_one = app.submit("/predict", ["Hello"]);
const job_two = app.submit("/predict", ["Friends"]);

job_one.cancel();
job_two.cancel();
```

If the first job has started processing, then it will not be canceled but the client will no longer listen for updates (throwing away the job). If the second job has not yet started, it will be successfully canceled and removed from the queue.

## Generator Endpoints

Some Gradio API endpoints do not return a single value, rather they return a series of values. You can listen for these values in real time using the iterable interface:

```js
import { Client } from "@gradio/client";

const app = await Client.connect("gradio/count_generator");
const job = app.submit(0, [9]);

for await (const message of job) {
	console.log(message.data);
}
```

This will log out the values as they are generated by the endpoint.

You can also cancel jobs that that have iterative outputs, in which case the job will finish immediately.

```js
import { Client } from "@gradio/client";

const app = await Client.connect("gradio/count_generator");
const job = app.submit(0, [9]);

for await (const message of job) {
	console.log(message.data);
}

setTimeout(() => {
	job.cancel();
}, 3000);
```

---

<!-- Source: guides/10_mcp/02_file-upload-mcp.md -->
# The File Upload MCP Server

Tags: MCP, TOOL, LLM, SERVER, DOCS

If you've tried to to use a remote Gradio MCP server that takes a file as input (image, video, audio), you've probably run into this error:

<img src="https://huggingface.co/datasets/freddyaboulton/bucket/resolve/main/MCPError.png">

The reason is that since the Gradio server is hosted on a different machine, any input files must be available via a public URL so that they can downloaded in the remote machine.

There are many ways to host files on the internet, but they all require adding a manual step to your workflow. In the age of LLM agents, shouldn't we expect them to handle this step for you?

In this post, we'll show how you can connect your LLM to the "File Upload" MCP server so that it can handle the file uploading for you when appropriate!

## Using the File Upload MCP Server

As of version 5.36.0, Gradio now comes with a built-in MCP server that can upload files to a running Gradio application. In the `View API` page of the server, you should see the following code snippet if any of the tools require file inputs:

<img src="https://huggingface.co/datasets/freddyaboulton/bucket/resolve/main/MCPConnectionDocs.png">

The command to start the MCP server takes two arguments:

- The URL (or Hugging Face space id) of the gradio application to upload the files to. In this case, `http://127.0.0.1:7860`.
- The local directory on your computer with which the server is allowed to upload files from (`<UPLOAD_DIRECTORY>`). For security, please make this directory as narrow as possible to prevent unintended file uploads.

As stated in the image, you need to install [uv](https://docs.astral.sh/uv/getting-started/installation/) (a python package manager that can run python scripts) before connecting from your MCP client. 

If you have gradio installed locally and you don't want to install uv, you can replace the `uvx` command with the path to gradio binary. It should look like this:

```json
"upload-files": {
    "command": "<absoluate-path-to-gradio>",
    "args": [
    "upload-mcp",
    "http://localhost:7860/",
    "/Users/freddyboulton/Pictures"
    ]
}
```

After connecting to the upload server, your LLM agent will know when to upload files for you automatically!

<img src="https://huggingface.co/datasets/freddyaboulton/bucket/resolve/main/Ghibliafy.png">

## Conclusion

In this guide, we've covered how you can connect to the Upload File MCP Server so that your agent can upload files before using Gradio MCP servers. Remember to set the `<UPLOAD_DIRECTORY>` as small as possible to prevent unintended file uploads!

---

<!-- Source: guides/cn/01_getting-started/02_key-features.md -->
# 主要特点

让我们来介绍一下 Gradio 最受欢迎的一些功能！这里是 Gradio 的主要特点：

1. [添加示例输入](#example-inputs)
2. [传递自定义错误消息](#errors)
3. [添加描述内容](#descriptive-content)
4. [设置旗标](#flagging)
5. [预处理和后处理](#preprocessing-and-postprocessing)
6. [样式化演示](#styling)
7. [排队用户](#queuing)
8. [迭代输出](#iterative-outputs)
9. [进度条](#progress-bars)
10. [批处理函数](#batch-functions)
11. [在协作笔记本上运行](#colab-notebooks)

## 示例输入

您可以提供用户可以轻松加载到 "Interface" 中的示例数据。这对于演示模型期望的输入类型以及演示数据集和模型一起探索的方式非常有帮助。要加载示例数据，您可以将嵌套列表提供给 Interface 构造函数的 `examples=` 关键字参数。外部列表中的每个子列表表示一个数据样本，子列表中的每个元素表示每个输入组件的输入。有关每个组件的示例数据格式在[Docs](https://gradio.app/docs/components)中有说明。

$code_calculator
$demo_calculator

您可以将大型数据集加载到示例中，通过 Gradio 浏览和与数据集进行交互。示例将自动分页（可以通过 Interface 的 `examples_per_page` 参数进行配置）。

继续了解示例，请参阅[更多示例](https://gradio.app/more-on-examples)指南。

## 错误

您希望向用户传递自定义错误消息。为此，with `gr.Error("custom message")` 来显示错误消息。如果在上面的计算器示例中尝试除以零，将显示自定义错误消息的弹出模态窗口。了解有关错误的更多信息，请参阅[文档](https://gradio.app/docs/error)。

## 描述性内容

在前面的示例中，您可能已经注意到 Interface 构造函数中的 `title=` 和 `description=` 关键字参数，帮助用户了解您的应用程序。

Interface 构造函数中有三个参数用于指定此内容应放置在哪里：

- `title`：接受文本，并可以将其显示在界面的顶部，也将成为页面标题。
- `description`：接受文本、Markdown 或 HTML，并将其放置在标题正下方。
- `article`：也接受文本、Markdown 或 HTML，并将其放置在界面下方。

![annotated](/assets/guides/annotated.png)

如果您使用的是 `Blocks` API，则可以 with `gr.Markdown(...)` 或 `gr.HTML(...)` 组件在任何位置插入文本、Markdown 或 HTML，其中描述性内容位于 `Component` 构造函数内部。

另一个有用的关键字参数是 `label=`，它存在于每个 `Component` 中。这修改了每个 `Component` 顶部的标签文本。还可以为诸如 `Textbox` 或 `Radio` 之类的表单元素添加 `info=` 关键字参数，以提供有关其用法的进一步信息。

```python
gr.Number(label='年龄', info='以年为单位，必须大于0')
```

## 旗标

默认情况下，"Interface" 将有一个 "Flag" 按钮。当用户测试您的 `Interface` 时，如果看到有趣的输出，例如错误或意外的模型行为，他们可以将输入标记为您进行查看。在由 `Interface` 构造函数的 `flagging_dir=` 参数提供的目录中，将记录标记的输入到一个 CSV 文件中。如果界面涉及文件数据，例如图像和音频组件，将创建文件夹来存储这些标记的数据。

例如，对于上面显示的计算器界面，我们将在下面的旗标目录中存储标记的数据：

```directory
+-- calculator.py
+-- flagged/
|   +-- logs.csv
```

_flagged/logs.csv_

```csv
num1,operation,num2,Output
5,add,7,12
6,subtract,1.5,4.5
```

与早期显示的冷色界面相对应，我们将在下面的旗标目录中存储标记的数据：

```directory
+-- sepia.py
+-- flagged/
|   +-- logs.csv
|   +-- im/
|   |   +-- 0.png
|   |   +-- 1.png
|   +-- Output/
|   |   +-- 0.png
|   |   +-- 1.png
```

_flagged/logs.csv_

```csv
im,Output
im/0.png,Output/0.png
im/1.png,Output/1.png
```

如果您希望用户提供旗标原因，可以将字符串列表传递给 Interface 的 `flagging_options` 参数。用户在进行旗标时必须选择其中一个字符串，这将作为附加列保存到 CSV 中。

## 预处理和后处理 (Preprocessing and Postprocessing)

![annotated](/assets/img/dataflow.svg)

如您所见，Gradio 包括可以处理各种不同数据类型的组件，例如图像、音频和视频。大多数组件都可以用作输入或输出。

当组件用作输入时，Gradio 自动处理*预处理*，将数据从用户浏览器发送的类型（例如网络摄像头快照的 base64 表示）转换为您的函数可以接受的形式（例如 `numpy` 数组）。

同样，当组件用作输出时，Gradio 自动处理*后处理*，将数据从函数返回的形式（例如图像路径列表）转换为可以在用户浏览器中显示的形式（例如以 base64 格式显示图像的 `Gallery`）。

您可以使用构建图像组件时的参数控制*预处理*。例如，如果您使用以下参数实例化 `Image` 组件，它将将图像转换为 `PIL` 类型，并将其重塑为`(100, 100)`，而不管提交时的原始大小如何：

```py
img = gr.Image(width=100, height=100, type="pil")
```

相反，这里我们保留图像的原始大小，但在将其转换为 numpy 数组之前反转颜色：

```py
img = gr.Image(invert_colors=True, type="numpy")
```

后处理要容易得多！Gradio 自动识别返回数据的格式（例如 `Image` 是 `numpy` 数组还是 `str` 文件路径？），并将其后处理为可以由浏览器显示的格式。

请查看[文档](https://gradio.app/docs)，了解每个组件的所有与预处理相关的参数。

## 样式 (Styling)

Gradio 主题是自定义应用程序外观和感觉的最简单方法。您可以选择多种主题或创建自己的主题。要这样做，请将 `theme=` 参数传递给 `Interface` 构造函数。例如：

```python
demo = gr.Interface(..., theme=gr.themes.Monochrome())
```

Gradio 带有一组预先构建的主题，您可以从 `gr.themes.*` 加载。您可以扩展这些主题或从头开始创建自己的主题 - 有关更多详细信息，请参阅[主题指南](https://gradio.app/theming-guide)。

要增加额外的样式能力，您可以 with `css=` 关键字将任何 CSS 传递给您的应用程序。
Gradio 应用程序的基类是 `gradio-container`，因此以下是一个更改 Gradio 应用程序背景颜色的示例：

```python
with `gr.Interface(css=".gradio-container {background-color: red}") as demo:
    ...
```

## 队列 (Queuing)

如果您的应用程序预计会有大量流量，请 with `queue()` 方法来控制处理速率。这将排队处理调用，因此一次只处理一定数量的请求。队列使用 Websockets，还可以防止网络超时，因此如果您的函数的推理时间很长（> 1 分钟），应使用队列。

with `Interface`：

```python
demo = gr.Interface(...).queue()
demo.launch()
```

with `Blocks`：

```python
with gr.Blocks() as demo：
    #...
demo.queue()
demo.launch()
```

您可以通过以下方式控制一次处理的请求数量：

```python
demo.queue(concurrency_count=3)
```

查看有关配置其他队列参数的[队列文档](/docs/#queue)。

在 Blocks 中指定仅对某些函数进行排队：

```python
with gr.Blocks() as demo2：
    num1 = gr.Number()
    num2 = gr.Number()
    output = gr.Number()
    gr.Button("Add").click(
        lambda a, b: a + b, [num1, num2], output)
    gr.Button("Multiply").click(
        lambda a, b: a * b, [num1, num2], output, queue=True)
demo2.launch()
```

## 迭代输出 (Iterative Outputs)

在某些情况下，您可能需要传输一系列输出而不是一次显示单个输出。例如，您可能有一个图像生成模型，希望显示生成的每个步骤的图像，直到最终图像。或者您可能有一个聊天机器人，它逐字逐句地流式传输响应，而不是一次返回全部响应。

在这种情况下，您可以将**生成器**函数提供给 Gradio，而不是常规函数。在 Python 中创建生成器非常简单：函数不应该有一个单独的 `return` 值，而是应该 with `yield` 连续返回一系列值。通常，`yield` 语句放置在某种循环中。下面是一个简单示例，生成器只是简单计数到给定数字：

```python
def my_generator(x):
    for i in range(x):
        yield i
```

您以与常规函数相同的方式将生成器提供给 Gradio。例如，这是一个（虚拟的）图像生成模型，它在输出图像之前生成数个步骤的噪音：

$code_fake_diffusion
$demo_fake_diffusion

请注意，我们在迭代器中添加了 `time.sleep(1)`，以创建步骤之间的人工暂停，以便您可以观察迭代器的步骤（在真实的图像生成模型中，这可能是不必要的）。

将生成器提供给 Gradio **需要**在底层 Interface 或 Blocks 中启用队列（请参阅上面的队列部分）。

## 进度条

Gradio 支持创建自定义进度条，以便您可以自定义和控制向用户显示的进度更新。要启用此功能，只需为方法添加一个默认值为 `gr.Progress` 实例的参数即可。然后，您可以直接调用此实例并传入 0 到 1 之间的浮点数来更新进度级别，或者 with `Progress` 实例的 `tqdm()` 方法来跟踪可迭代对象上的进度，如下所示。必须启用队列以进行进度更新。

$code_progress_simple
$demo_progress_simple

如果您 with `tqdm` 库，并且希望从函数内部的任何 `tqdm.tqdm` 自动报告进度更新，请将默认参数设置为 `gr.Progress(track_tqdm=True)`！

## 批处理函数 (Batch Functions)

Gradio 支持传递*批处理*函数。批处理函数只是接受输入列表并返回预测列表的函数。

例如，这是一个批处理函数，它接受两个输入列表（一个单词列表和一个整数列表），并返回修剪过的单词列表作为输出：

```python
import time

def trim_words(words, lens):
    trimmed_words = []
    time.sleep(5)
    for w, l in zip(words, lens):
        trimmed_words.append(w[:int(l)])
    return [trimmed_words]
    for w, l in zip(words, lens):
```

使用批处理函数的优点是，如果启用了队列，Gradio 服务器可以自动*批处理*传入的请求并并行处理它们，从而可能加快演示速度。以下是 Gradio 代码的示例（请注意 `batch=True` 和 `max_batch_size=16` - 这两个参数都可以传递给事件触发器或 `Interface` 类）

with `Interface`：

```python
demo = gr.Interface(trim_words, ["textbox", "number"], ["output"],
                    batch=True, max_batch_size=16)
demo.queue()
demo.launch()
```

with `Blocks`：

```python
import gradio as gr

with gr.Blocks() as demo:
    with gr.Row():
        word = gr.Textbox(label="word")
        leng = gr.Number(label="leng")
        output = gr.Textbox(label="Output")
    with gr.Row():
        run = gr.Button()

    event = run.click(trim_words, [word, leng], output, batch=True, max_batch_size=16)

demo.queue()
demo.launch()
```

在上面的示例中，可以并行处理 16 个请求（总推理时间为 5 秒），而不是分别处理每个请求（总推理时间为 80 秒）。许多 Hugging Face 的 `transformers` 和 `diffusers` 模型在 Gradio 的批处理模式下自然工作：这是[使用批处理生成图像的示例演示](https://github.com/gradio-app/gradio/blob/main/demo/diffusers_with_batching/run.py)

注意：使用 Gradio 的批处理函数 **requires** 在底层 Interface 或 Blocks 中启用队列（请参阅上面的队列部分）。

## Gradio 笔记本 (Colab Notebooks)

Gradio 可以在任何运行 Python 的地方运行，包括本地 Jupyter 笔记本和协作笔记本，如[Google Colab](https://colab.research.google.com/)。对于本地 Jupyter 笔记本和 Google Colab 笔记本，Gradio 在本地服务器上运行，您可以在浏览器中与之交互。（注意：对于 Google Colab，这是通过[服务工作器隧道](https://github.com/tensorflow/tensorboard/blob/master/docs/design/colab_integration.md)实现的，您的浏览器需要启用 cookies。）对于其他远程笔记本，Gradio 也将在服务器上运行，但您需要使用[SSH 隧道](https://coderwall.com/p/ohk6cg/remote-access-to-ipython-notebooks-via-ssh)在本地浏览器中查看应用程序。通常，更简单的选择是使用 Gradio 内置的公共链接，[在下一篇指南中讨论](/sharing-your-app/#sharing-demos)。

---

<!-- Source: guides/cn/02_building-interfaces/02_reactive-interfaces.md -->
# 反应式界面 (Reactive Interfaces)

本指南介绍了如何使 Gradio 界面自动刷新或连续流式传输数据。

## 实时界面 (Live Interfaces)

您可以通过在界面中设置 `live=True` 来使界面自动刷新。现在，只要用户输入发生变化，界面就会重新计算。

$code_calculator_live
$demo_calculator_live

注意，因为界面在更改时会自动重新提交，所以没有提交按钮。

## 流式组件 (Streaming Components)

某些组件具有“流式”模式，比如麦克风模式下的 `Audio` 组件或网络摄像头模式下的 `Image` 组件。流式传输意味着数据会持续发送到后端，并且 `Interface` 函数会持续重新运行。

当在 `gr.Interface(live=True)` 中同时使用 `gr.Audio(sources=['microphone'])` 和 `gr.Audio(sources=['microphone'], streaming=True)` 时，两者的区别在于第一个 `Component` 会在用户停止录制时自动提交数据并运行 `Interface` 函数，而第二个 `Component` 会在录制过程中持续发送数据并运行 `Interface` 函数。

以下是从网络摄像头实时流式传输图像的示例代码。

$code_stream_frames

---

<!-- Source: guides/cn/03_building-with-blocks/02_controlling-layout.md -->
# 控制布局 (Controlling Layout)

默认情况下，块中的组件是垂直排列的。让我们看看如何重新排列组件。在幕后，这种布局结构使用了[Web 开发的 flexbox 模型](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)。

## Row 行

`with gr.Row` 下的元素将水平显示。例如，要并排显示两个按钮：

```python
with gr.Blocks() as demo:
    with gr.Row():
        btn1 = gr.Button("按钮1")
        btn2 = gr.Button("按钮2")
```

要使行中的每个元素具有相同的高度，请使用 `style` 方法的 `equal_height` 参数。

```python
with gr.Blocks() as demo:
    with gr.Row(equal_height=True):
        textbox = gr.Textbox()
        btn2 = gr.Button("按钮2")
```

可以通过每个组件中存在的 `scale` 和 `min_width` 参数来控制行中元素的宽度。

- `scale` 是一个整数，定义了元素在行中的占用空间。如果将 scale 设置为 `0`，则元素不会扩展占用空间。如果将 scale 设置为 `1` 或更大，则元素将扩展。行中的多个元素将按比例扩展。在下面的示例中，`btn1` 将比 `btn2` 扩展两倍，而 `btn0` 将根本不会扩展：

```python
with gr.Blocks() as demo:
    with gr.Row():
        btn0 = gr.Button("按钮0", scale=0)
        btn1 = gr.Button("按钮1", scale=1)
        btn2 = gr.Button("按钮2", scale=2)
```

- `min_width` 将设置元素的最小宽度。如果没有足够的空间满足所有的 `min_width` 值，行将换行。

在[文档](https://gradio.app/docs/row)中了解有关行的更多信息。

## 列和嵌套 (Columns and Nesting)

列中的组件将垂直放置在一起。由于默认布局对于块应用程序来说是垂直布局，因此为了有用，列通常嵌套在行中。例如：

$code_rows_and_columns
$demo_rows_and_columns

查看第一列如何垂直排列两个文本框。第二列垂直排列图像和按钮。注意两列的相对宽度由 `scale` 参数设置。具有两倍 `scale` 值的列占据两倍的宽度。

在[文档](https://gradio.app/docs/column)中了解有关列的更多信息。

## 选项卡和手风琴 (Tabs and Accordions)

您还可以使用 `with gr.Tab('tab_name'):` 语句创建选项卡。在 `with gr.Tab('tab_name'):` 上下文中创建的任何组件都将显示在该选项卡中。连续的 Tab 子句被分组在一起，以便一次只能选择一个选项卡，并且只显示该选项卡上下文中的组件。

例如：

$code_blocks_flipper
$demo_blocks_flipper

还请注意本示例中的 `gr.Accordion('label')`。手风琴是一种可以切换打开或关闭的布局。与 `Tabs` 一样，它是可以选择性隐藏或显示内容的布局元素。在 `with gr.Accordion('label'):` 内定义的任何组件在单击手风琴的切换图标时都会被隐藏或显示。

在文档中了解有关[Tabs](https://gradio.app/docs/tab)和[Accordions](https://gradio.app/docs/accordion)的更多信息。

## 可见性 (Visibility)

组件和布局元素都有一个 `visible` 参数，可以在初始时设置，并使用 `gr.update()` 进行更新。在 Column 上设置 `gr.update(visible=...)` 可用于显示或隐藏一组组件。

$code_blocks_form
$demo_blocks_form

## 可变数量的输出 (Variable Number of Outputs)

通过以动态方式调整组件的可见性，可以创建支持 _可变数量输出_ 的 Gradio 演示。这是一个非常简单的例子，其中输出文本框的数量由输入滑块控制：

例如：

$code_variable_outputs
$demo_variable_outputs

## 分开定义和渲染组件 (Defining and Rendering Components Separately)

在某些情况下，您可能希望在实际渲染 UI 之前定义组件。例如，您可能希望在相应的 `gr.Textbox` 输入上方显示示例部分，使用 `gr.Examples`。由于 `gr.Examples` 需要一个参数作为输入组件对象，您需要先定义输入组件，然后在定义 `gr.Examples` 对象之后再渲染它。

解决方法是在 `gr.Blocks()` 范围之外定义 `gr.Textbox`，并在 UI 中想要放置它的位置使用组件的 `.render()` 方法。

这是一个完整的代码示例：

```python
input_textbox = gr.Textbox()

with gr.Blocks() as demo:
    gr.Examples(["hello", "bonjour", "merhaba"], input_textbox)
    input_textbox.render()
```

---

<!-- Source: guides/cn/06_client-libraries/02_getting-started-with-the-js-client.md -->
# 使用Gradio JavaScript客户端快速入门

Tags: CLIENT, API, SPACES

Gradio JavaScript客户端使得使用任何Gradio应用作为API非常简单。例如，考虑一下这个[从麦克风录音的Hugging Face Space，用于转录音频文件](https://huggingface.co/spaces/abidlabs/whisper)。

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/whisper-screenshot.jpg)

使用`@gradio/client`库，我们可以轻松地以编程方式使用Gradio作为API来转录音频文件。

以下是完成此操作的完整代码：

```js
import { Client } from "@gradio/client";

const response = await fetch(
	"https://github.com/audio-samples/audio-samples.github.io/raw/master/samples/wav/ted_speakers/SalmanKhan/sample-1.wav"
);
const audio_file = await response.blob();

const app = await Client.connect("abidlabs/whisper");
const transcription = await app.predict("/predict", [audio_file]);

console.log(transcription.data);
// [ "I said the same phrase 30 times." ]
```

Gradio客户端适用于任何托管的Gradio应用，无论是图像生成器、文本摘要生成器、有状态的聊天机器人、税收计算器还是其他任何应用！Gradio客户端通常与托管在[Hugging Face Spaces](https://hf.space)上的应用一起使用，但您的应用可以托管在任何地方，比如您自己的服务器。

**先决条件**：要使用Gradio客户端，您不需要深入了解`gradio`库的细节。但是，熟悉Gradio的输入和输出组件的概念会有所帮助。

## 安装

可以使用您选择的软件包管理器从npm注册表安装轻量级的`@gradio/client`包，并支持18及以上的Node版本：

```bash
npm i @gradio/client
```

## 连接到正在运行的Gradio应用

首先，通过实例化`Client`对象并将其连接到在Hugging Face Spaces或任何其他位置运行的Gradio应用来建立连接。

## 连接到Hugging Face Space

```js
import { Client } from "@gradio/client";

const app = Client.connect("abidlabs/en2fr"); // 一个从英语翻译为法语的 Space
```

您还可以通过在options参数的`hf_token`属性中传入您的HF token来连接到私有Spaces。您可以在此处获取您的HF token：https://huggingface.co/settings/tokens

```js
import { Client } from "@gradio/client";

const app = Client.connect("abidlabs/my-private-space", { hf_token="hf_..." })
```

## 为私人使用复制一个Space

虽然您可以将任何公共Space用作API，但是如果您发出的请求过多，Hugging Face可能会对您进行速率限制。为了无限制使用Space，只需复制Space以创建私有Space，然后使用它来进行任意数量的请求！

`@gradio/client`还导出了另一个函数`duplicate`，以使此过程变得简单（您将需要传入您的[Hugging Face token](https://huggingface.co/settings/tokens)）。

`duplicate`与`Client`几乎相同，唯一的区别在于底层实现：

```js
import { Client } from "@gradio/client";

const response = await fetch(
	"https://audio-samples.github.io/samples/mp3/blizzard_unconditional/sample-0.mp3"
);
const audio_file = await response.blob();

const app = await Client.duplicate("abidlabs/whisper", { hf_token: "hf_..." });
const transcription = app.predict("/predict", [audio_file]);
```

如果您之前复制过一个Space，则重新运行`duplicate`不会创建一个新的Space。而是客户端将连接到先前创建的Space。因此，可以安全地多次使用相同的Space重新运行`duplicate`方法。

**注意：**如果原始Space使用了GPU，您的私有Space也将使用GPU，并且将根据GPU的价格向您的Hugging Face账户计费。为了最大程度地减少费用，在5分钟不活动后，您的Space将自动进入休眠状态。您还可以使用`duplicate`的options对象的`hardware`和`timeout`属性来设置硬件，例如：

```js
import { Client } from "@gradio/client";

const app = await Client.duplicate("abidlabs/whisper", {
	hf_token: "hf_...",
	timeout: 60,
	hardware: "a10g-small"
});
```

## 连接到通用的Gradio应用

如果您的应用程序在其他地方运行，只需提供完整的URL，包括"http://"或"https://"。以下是向运行在共享URL上的Gradio应用进行预测的示例：

```js
import { Client } from "@gradio/client";

const app = Client.connect("https://bec81a83-5b5c-471e.gradio.live");
```

## 检查API端点

一旦连接到Gradio应用程序，可以通过调用`Client`的`view_api`方法来查看可用的API端点。

对于Whisper Space，我们可以这样做：

```js
import { Client } from "@gradio/client";

const app = await Client.connect("abidlabs/whisper");

const app_info = await app.view_info();

console.log(app_info);
```

然后我们会看到以下内容：

```json
{
	"named_endpoints": {
		"/predict": {
			"parameters": [
				{
					"label": "text",
					"component": "Textbox",
					"type": "string"
				}
			],
			"returns": [
				{
					"label": "output",
					"component": "Textbox",
					"type": "string"
				}
			]
		}
	},
	"unnamed_endpoints": {}
}
```

这告诉我们该Space中有1个API端点，并显示了如何使用API端点进行预测：我们应该调用`.predict()`方法（下面将进行更多探索），并提供类型为`string`的参数`input_audio`，它是指向文件的URL。

我们还应该提供`api_name='/predict'`参数给`predict()`方法。虽然如果一个Gradio应用只有1个命名的端点，这不是必需的，但它可以允许我们在单个应用中调用不同的端点。如果应用有未命名的API端点，可以通过运行`.view_api(all_endpoints=True)`来显示它们。

## 进行预测

进行预测的最简单方法就是使用适当的参数调用`.predict()`方法：

```js
import { Client } from "@gradio/client";

const app = await Client.connect("abidlabs/en2fr");
const result = await app.predict("/predict", ["Hello"]);
```

如果有多个参数，您应该将它们作为一个数组传递给`.predict()`，像这样：

```js
import { Client } from "@gradio/client";

const app = await Client.connect("gradio/calculator");
const result = await app.predict("/predict", [4, "add", 5]);
```

对于某些输入，例如图像，您应该根据所需要的方便程度传入`Buffer`、`Blob`或`File`。在Node.js中，可以使用`Buffer`或`Blob`；在浏览器环境中，可以使用`Blob`或`File`。

```js
import { Client } from "@gradio/client";

const response = await fetch(
	"https://audio-samples.github.io/samples/mp3/blizzard_unconditional/sample-0.mp3"
);
const audio_file = await response.blob();

const app = await Client.connect("abidlabs/whisper");
const result = await Client.connect.predict("/predict", [audio_file]);
```

## 使用事件

如果您使用的API可以随时间返回结果，或者您希望访问有关作业状态的信息，您可以使用事件接口获取更大的灵活性。这对于迭代的或生成器的端点特别有用，因为它们会生成一系列离散的响应值。

```js
import { Client } from "@gradio/client";

function log_result(payload) {
	const {
		data: [translation]
	} = payload;

	console.log(`翻译结果为：${translation}`);
}

const app = await Client.connect("abidlabs/en2fr");
const job = app.submit("/predict", ["Hello"]);

job.on("data", log_result);
```

## 状态

事件接口还可以通过监听`"status"`事件来获取运行作业的状态。这将返回一个对象，其中包含以下属性：`status`（当前作业的人类可读状态，`"pending" | "generating" | "complete" | "error"`），`code`（作业的详细gradio code），`position`（此作业在队列中的当前位置），`queue_size`（总队列大小），`eta`（作业完成的预计时间），`success`（表示作业是否成功完成的布尔值）和`time`（作业状态生成的时间，是一个`Date`对象）。

```js
import { Client } from "@gradio/client";

function log_status(status) {
	console.log(`此作业的当前状态为：${JSON.stringify(status, null, 2)}`);
}

const app = await Client.connect("abidlabs/en2fr");
const job = app.submit("/predict", ["Hello"]);

job.on("status", log_status);
```

## 取消作业

作业实例还具有`.cancel()`方法，用于取消已排队但尚未启动的作业。例如，如果您运行以下命令：

```js
import { Client } from "@gradio/client";

const app = await Client.connect("abidlabs/en2fr");
const job_one = app.submit("/predict", ["Hello"]);
const job_two = app.submit("/predict", ["Friends"]);

job_one.cancel();
job_two.cancel();
```

如果第一个作业已经开始处理，那么它将不会被取消，但客户端将不再监听更新（丢弃该作业）。如果第二个作业尚未启动，它将被成功取消并从队列中移除。

## 生成器端点

某些Gradio API端点不返回单个值，而是返回一系列值。您可以使用事件接口实时侦听这些值：

```js
import { Client } from "@gradio/client";

const app = await Client.connect("gradio/count_generator");
const job = app.submit(0, [9]);

job.on("data", (data) => console.log(data));
```

这将按生成端点生成的值进行日志记录。

您还可以取消具有迭代输出的作业，在这种情况下，作业将立即完成。

```js
import { Client } from "@gradio/client";

const app = await Client.connect("gradio/count_generator");
const job = app.submit(0, [9]);

job.on("data", (data) => console.log(data));

setTimeout(() => {
	job.cancel();
}, 3000);
```

---

<!-- Source: guides/02_building-interfaces/03_interface-state.md -->
# Interface State

So far, we've assumed that your demos are *stateless*: that they do not persist information beyond a single function call. What if you want to modify the behavior of your demo based on previous interactions with the demo? There are two approaches in Gradio: *global state* and *session state*.

## Global State

If the state is something that should be accessible to all function calls and all users, you can create a variable outside the function call and access it inside the function. For example, you may load a large model outside the function and use it inside the function so that every function call does not need to reload the model.

$code_score_tracker

In the code above, the `scores` array is shared between all users. If multiple users are accessing this demo, their scores will all be added to the same list, and the returned top 3 scores will be collected from this shared reference.

## Session State

Another type of data persistence Gradio supports is session state, where data persists across multiple submits within a page session. However, data is _not_ shared between different users of your model. To store data in a session state, you need to do three things:

1. Pass in an extra parameter into your function, which represents the state of the interface.
2. At the end of the function, return the updated value of the state as an extra return value.
3. Add the `'state'` input and `'state'` output components when creating your `Interface`

Here's a simple app to illustrate session state - this app simply stores users previous submissions and displays them back to the user:


$code_interface_state
$demo_interface_state


Notice how the state persists across submits within each page, but if you load this demo in another tab (or refresh the page), the demos will not share chat history. Here, we could not store the submission history in a global variable, otherwise the submission history would then get jumbled between different users.

The initial value of the `State` is `None` by default. If you pass a parameter to the `value` argument of `gr.State()`, it is used as the default value of the state instead. 

Note: the `Interface` class only supports a single session state variable (though it can be a list with multiple elements). For more complex use cases, you can use Blocks, [which supports multiple `State` variables](/guides/state-in-blocks/). Alternatively, if you are building a chatbot that maintains user state, consider using the `ChatInterface` abstraction, [which manages state automatically](/guides/creating-a-chatbot-fast).

---

<!-- Source: guides/03_building-with-blocks/03_state-in-blocks.md -->
# Managing State

When building a Gradio application with `gr.Blocks()`, you may want to share certain values between users (e.g. a count of visitors to your page), or persist values for a single user across certain interactions (e.g. a chat history). This referred to as **state** and there are three general ways to manage state in a Gradio application:

* **Global state**: persist and share values among all users of your Gradio application while your Gradio application is running
* **Session state**: persist values for each user of your Gradio application while they are using your Gradio application in a single session. If they refresh the page, session state will be reset.
* **Browser state**: persist values for each user of your Gradio application in the browser's localStorage, allowing data to persist even after the page is refreshed or closed.

## Global State

Global state in Gradio apps is very simple: any variable created outside of a function is shared globally between all users.

This makes managing global state very simple and without the need for external services. For example, in this application, the `visitor_count` variable is shared between all users

```py
import gradio as gr

# Shared between all users
visitor_count = 0

def increment_counter():
    global visitor_count
    visitor_count += 1
    return visitor_count

with gr.Blocks() as demo:    
    number = gr.Textbox(label="Total Visitors", value="Counting...")
    demo.load(increment_counter, inputs=None, outputs=number)

demo.launch()
```

This means that any time you do _not_ want to share a value between users, you should declare it _within_ a function. But what if you need to share values between function calls, e.g. a chat history? In that case, you should use one of the subsequent approaches to manage state.

## Session State

Gradio supports session state, where data persists across multiple submits within a page session. To reiterate, session data is _not_ shared between different users of your model, and does _not_ persist if a user refreshes the page to reload the Gradio app. To store data in a session state, you need to do three things:

1. Create a `gr.State()` object. If there is a default value to this stateful object, pass that into the constructor. Note that `gr.State` objects must be [deepcopy-able](https://docs.python.org/3/library/copy.html), otherwise you will need to use a different approach as described below.
2. In the event listener, put the `State` object as an input and output as needed.
3. In the event listener function, add the variable to the input parameters and the return value.

Let's take a look at a simple example. We have a simple checkout app below where you add items to a cart. You can also see the size of the cart.

$code_simple_state

Notice how we do this with state:

1. We store the cart items in a `gr.State()` object, initialized here to be an empty list.
2. When adding items to the cart, the event listener uses the cart as both input and output - it returns the updated cart with all the items inside. 
3. We can attach a `.change` listener to cart, that uses the state variable as input as well.

You can think of `gr.State` as an invisible Gradio component that can store any kind of value. Here, `cart` is not visible in the frontend but is used for calculations.

The `.change` listener for a state variable triggers after any event listener changes the value of a state variable. If the state variable holds a sequence (like a `list`, `set`, or `dict`), a change is triggered if any of the elements inside change. If it holds an object or primitive, a change is triggered if the **hash** of the  value changes. So if you define a custom class and create a `gr.State` variable that is an instance of that class, make sure that the the class includes a sensible `__hash__` implementation.

The value of a session State variable is cleared when the user refreshes the page. The value is stored on in the app backend for 60 minutes after the user closes the tab (this can be configured by the `delete_cache` parameter in `gr.Blocks`).

Learn more about `State` in the [docs](https://gradio.app/docs/gradio/state).

**What about objects that cannot be deepcopied?**

As mentioned earlier, the value stored in `gr.State` must be [deepcopy-able](https://docs.python.org/3/library/copy.html). If you are working with a complex object that cannot be deepcopied, you can take a different approach to manually read the user's `session_hash` and store a global `dictionary` with instances of your object for each user. Here's how you would do that:

```py
import gradio as gr

class NonDeepCopyable:
    def __init__(self):
        from threading import Lock
        self.counter = 0
        self.lock = Lock()  # Lock objects cannot be deepcopied
    
    def increment(self):
        with self.lock:
            self.counter += 1
            return self.counter

# Global dictionary to store user-specific instances
instances = {}

def initialize_instance(request: gr.Request):
    instances[request.session_hash] = NonDeepCopyable()
    return "Session initialized!"

def cleanup_instance(request: gr.Request):
    if request.session_hash in instances:
        del instances[request.session_hash]

def increment_counter(request: gr.Request):
    if request.session_hash in instances:
        instance = instances[request.session_hash]
        return instance.increment()
    return "Error: Session not initialized"

with gr.Blocks() as demo:
    output = gr.Textbox(label="Status")
    counter = gr.Number(label="Counter Value")
    increment_btn = gr.Button("Increment Counter")
    increment_btn.click(increment_counter, inputs=None, outputs=counter)
    
    # Initialize instance when page loads
    demo.load(initialize_instance, inputs=None, outputs=output)    
    # Clean up instance when page is closed/refreshed
    demo.unload(cleanup_instance)    

demo.launch()
```

## Browser State

Gradio also supports browser state, where data persists in the browser's localStorage even after the page is refreshed or closed. This is useful for storing user preferences, settings, API keys, or other data that should persist across sessions. To use local state:

1. Create a `gr.BrowserState` object. You can optionally provide an initial default value and a key to identify the data in the browser's localStorage.
2. Use it like a regular `gr.State` component in event listeners as inputs and outputs.

Here's a simple example that saves a user's username and password across sessions:

$code_browserstate

Note: The value stored in `gr.BrowserState` does not persist if the Grado app is restarted. To persist it, you can hardcode specific values of `storage_key` and `secret` in the `gr.BrowserState` component and restart the Gradio app on the same server name and server port. However, this should only be done if you are running trusted Gradio apps, as in principle, this can allow one Gradio app to access localStorage data that was created by a different Gradio app.

---

<!-- Source: guides/04_additional-features/03_streaming-inputs.md -->
# Streaming inputs

Tip: Check out [FastRTC](https://fastrtc.org/), our companion library for building low latency streaming web apps with a familiar Gradio syntax. 

In the previous guide, we covered how to stream a sequence of outputs from an event handler. Gradio also allows you to stream images from a user's camera or audio chunks from their microphone **into** your event handler. This can be used to create real-time object detection apps or conversational chat applications with Gradio.

Currently, the `gr.Image` and the `gr.Audio` components support input streaming via the `stream` event.
Let's create the simplest streaming app possible, which simply returns the webcam stream unmodified.

$code_streaming_simple
$demo_streaming_simple

Try it out! The streaming event is triggered when the user starts recording. Under the hood, the webcam will take a photo every 0.1 seconds and send it to the server. The server will then return that image.

There are two unique keyword arguments for the `stream` event:

* `time_limit` - This is the amount of time the gradio server will spend processing the event. Media streams are naturally unbounded so it's important to set a time limit so that one user does not hog the Gradio queue. The time limit only counts the time spent processing the stream, not the time spent waiting in the queue. The orange bar displayed at the bottom of the input image represents the remaining time. When the time limit expires, the user will automatically rejoin the queue.

* `stream_every` - This is the frequency (in seconds) with which the stream will capture input and send it to the server. For demos like image detection or manipulation, setting a smaller value is desired to get a "real-time" effect. For demos like speech transcription, a higher value is useful so that the transcription algorithm has more context of what's being said.

## A Realistic Image Demo

Let's create a demo where a user can choose a filter to apply to their webcam stream. Users can choose from an edge-detection filter, a cartoon filter, or simply flipping the stream vertically.

$code_streaming_filter
$demo_streaming_filter

You will notice that if you change the filter value it will immediately take effect in the output stream. That is an important difference of stream events in comparison to other Gradio events. The input values of the stream can be changed while the stream is being processed. 

Tip: We set the "streaming" parameter of the image output component to be "True". Doing so lets the server automatically convert our output images into base64 format, a format that is efficient for streaming.

## Unified Image Demos

For some image streaming demos, like the one above, we don't need to display separate input and output components. Our app would look cleaner if we could just display the modified output stream.

We can do so by just specifying the input image component as the output of the stream event.

$code_streaming_filter_unified
$demo_streaming_filter_unified

## Keeping track of past inputs or outputs

Your streaming function should be stateless. It should take the current input and return its corresponding output. However, there are cases where you may want to keep track of past inputs or outputs. For example, you may want to keep a buffer of the previous `k` inputs to improve the accuracy of your transcription demo. You can do this with Gradio's `gr.State()` component.

Let's showcase this with a sample demo:

```python
def transcribe_handler(current_audio, state, transcript):
    next_text = transcribe(current_audio, history=state)
    state.append(current_audio)
    state = state[-3:]
    return state, transcript + next_text

with gr.Blocks() as demo:
    with gr.Row():
        with gr.Column():
            mic = gr.Audio(sources="microphone")
            state = gr.State(value=[])
        with gr.Column():
            transcript = gr.Textbox(label="Transcript")
    mic.stream(transcribe_handler, [mic, state, transcript], [state, transcript],
               time_limit=10, stream_every=1)


demo.launch()
```

## End-to-End Examples

For an end-to-end example of streaming from the webcam, see the object detection from webcam [guide](/main/guides/object-detection-from-webcam-with-webrtc).

---

<!-- Source: guides/05_chatbots/03_agents-and-tool-usage.md -->
# Building a UI for an LLM Agent

Tags: LLM, AGENTS, CHAT

The Gradio Chatbot can natively display intermediate thoughts and tool usage in a collapsible accordion next to a chat message. This makes it perfect for creating UIs for LLM agents and chain-of-thought (CoT) or reasoning demos. This guide will show you how to display thoughts and tool usage with `gr.Chatbot` and `gr.ChatInterface`.

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/nested-thoughts.png)

## The `ChatMessage` dataclass

Every element of the chatbot value is a dictionary of `role` and `content` keys. You can always use plain python dictionaries to add new values to the chatbot but Gradio also provides the `ChatMessage` dataclass to help you with IDE autocompletion. The schema of `ChatMessage` is as follows:

 ```py
MessageContent = Union[str, FileDataDict, FileData, Component]

@dataclass
class ChatMessage:
    content: MessageContent | [MessageContent]
    role: Literal["user", "assistant"]
    metadata: MetadataDict = None
    options: list[OptionDict] = None

class MetadataDict(TypedDict):
    title: NotRequired[str]
    id: NotRequired[int | str]
    parent_id: NotRequired[int | str]
    log: NotRequired[str]
    duration: NotRequired[float]
    status: NotRequired[Literal["pending", "done"]]

class OptionDict(TypedDict):
    label: NotRequired[str]
    value: str
 ```


For our purposes, the most important key is the `metadata` key, which accepts a dictionary. If this dictionary includes a `title` for the message, it will be displayed in a collapsible accordion representing a thought. It's that simple! Take a look at this example:


```python
import gradio as gr

with gr.Blocks() as demo:
    chatbot = gr.Chatbot(
        value=[
            gr.ChatMessage(
                role="user", 
                content="What is the weather in San Francisco?"
            ),
            gr.ChatMessage(
                role="assistant", 
                content="I need to use the weather API tool?",
                metadata={"title":  "🧠 Thinking"}
            )
        ]
    )

demo.launch()
```



In addition to `title`, the dictionary provided to `metadata` can take several optional keys:

* `log`: an optional string value to be displayed in a subdued font next to the thought title.
* `duration`: an optional numeric value representing the duration of the thought/tool usage, in seconds. Displayed in a subdued font next inside parentheses next to the thought title.
* `status`: if set to `"pending"`, a spinner appears next to the thought title and the accordion is initialized open.  If `status` is `"done"`, the thought accordion is initialized closed. If `status` is not provided, the thought accordion is initialized open and no spinner is displayed.
* `id` and `parent_id`: if these are provided, they can be used to nest thoughts inside other thoughts.

Below, we show several complete examples of using `gr.Chatbot` and `gr.ChatInterface` to display tool use or thinking UIs.

## Building with Agents

### A real example using transformers.agents

We'll create a Gradio application simple agent that has access to a text-to-image tool.

Tip: Make sure you read the [smolagents documentation](https://huggingface.co/docs/smolagents/index) first

We'll start by importing the necessary classes from transformers and gradio. 

```python
import gradio as gr
from gradio import ChatMessage
from transformers import Tool, ReactCodeAgent  # type: ignore
from transformers.agents import stream_to_gradio, HfApiEngine  # type: ignore

# Import tool from Hub
image_generation_tool = Tool.from_space(
    space_id="black-forest-labs/FLUX.1-schnell",
    name="image_generator",
    description="Generates an image following your prompt. Returns a PIL Image.",
    api_name="/infer",
)

llm_engine = HfApiEngine("Qwen/Qwen2.5-Coder-32B-Instruct")
# Initialize the agent with both tools and engine
agent = ReactCodeAgent(tools=[image_generation_tool], llm_engine=llm_engine)
```

Then we'll build the UI:

```python
def interact_with_agent(prompt, history):
    messages = []
    yield messages
    for msg in stream_to_gradio(agent, prompt):
        messages.append(asdict(msg))
        yield messages
    yield messages


demo = gr.ChatInterface(
    interact_with_agent,
    chatbot= gr.Chatbot(
        label="Agent",
        avatar_images=(
            None,
            "https://em-content.zobj.net/source/twitter/53/robot-face_1f916.png",
        ),
    ),
    examples=[
        ["Generate an image of an astronaut riding an alligator"],
        ["I am writing a children's book for my daughter. Can you help me with some illustrations?"],
    ],
)
```

You can see the full demo code [here](https://huggingface.co/spaces/gradio/agent_chatbot/blob/main/app.py).


![transformers_agent_code](https://github.com/freddyaboulton/freddyboulton/assets/41651716/c8d21336-e0e6-4878-88ea-e6fcfef3552d)


### A real example using langchain agents

We'll create a UI for langchain agent that has access to a search engine.

We'll begin with imports and setting up the langchain agent. Note that you'll need an .env file with the following environment variables set - 

```
SERPAPI_API_KEY=
HF_TOKEN=
OPENAI_API_KEY=
```

```python
from langchain import hub
from langchain.agents import AgentExecutor, create_openai_tools_agent, load_tools
from langchain_openai import ChatOpenAI
from gradio import ChatMessage
import gradio as gr

from dotenv import load_dotenv

load_dotenv()

model = ChatOpenAI(temperature=0, streaming=True)

tools = load_tools(["serpapi"])

# Get the prompt to use - you can modify this!
prompt = hub.pull("hwchase17/openai-tools-agent")
agent = create_openai_tools_agent(
    model.with_config({"tags": ["agent_llm"]}), tools, prompt
)
agent_executor = AgentExecutor(agent=agent, tools=tools).with_config(
    {"run_name": "Agent"}
)
```

Then we'll create the Gradio UI

```python
async def interact_with_langchain_agent(prompt, messages):
    messages.append(ChatMessage(role="user", content=prompt))
    yield messages
    async for chunk in agent_executor.astream(
        {"input": prompt}
    ):
        if "steps" in chunk:
            for step in chunk["steps"]:
                messages.append(ChatMessage(role="assistant", content=step.action.log,
                                  metadata={"title": f"🛠️ Used tool {step.action.tool}"}))
                yield messages
        if "output" in chunk:
            messages.append(ChatMessage(role="assistant", content=chunk["output"]))
            yield messages


with gr.Blocks() as demo:
    gr.Markdown("# Chat with a LangChain Agent 🦜⛓️ and see its thoughts 💭")
    chatbot = gr.Chatbot(
        label="Agent",
        avatar_images=(
            None,
            "https://em-content.zobj.net/source/twitter/141/parrot_1f99c.png",
        ),
    )
    input = gr.Textbox(lines=1, label="Chat Message")
    input.submit(interact_with_langchain_agent, [input_2, chatbot_2], [chatbot_2])

demo.launch()
```

![langchain_agent_code](https://github.com/freddyaboulton/freddyboulton/assets/41651716/762283e5-3937-47e5-89e0-79657279ea67)

That's it! See our finished langchain demo [here](https://huggingface.co/spaces/gradio/langchain-agent).


## Building with Visibly Thinking LLMs


The Gradio Chatbot can natively display intermediate thoughts of a _thinking_ LLM. This makes it perfect for creating UIs that show how an AI model "thinks" while generating responses. Below guide will show you how to build a chatbot that displays Gemini AI's thought process in real-time.


### A real example using Gemini 2.0 Flash Thinking API

Let's create a complete chatbot that shows its thoughts and responses in real-time. We'll use Google's Gemini API for accessing Gemini 2.0 Flash Thinking LLM and Gradio for the UI.

We'll begin with imports and setting up the gemini client. Note that you'll need to [acquire a Google Gemini API key](https://aistudio.google.com/apikey) first -

```python
import gradio as gr
from gradio import ChatMessage
from typing import Iterator
import google.generativeai as genai

genai.configure(api_key="your-gemini-api-key")
model = genai.GenerativeModel("gemini-2.0-flash-thinking-exp-1219")
```

First, let's set up our streaming function that handles the model's output:

```python
def stream_gemini_response(user_message: str, messages: list) -> Iterator[list]:
    """
    Streams both thoughts and responses from the Gemini model.
    """
    # Initialize response from Gemini
    response = model.generate_content(user_message, stream=True)
    
    # Initialize buffers
    thought_buffer = ""
    response_buffer = ""
    thinking_complete = False
    
    # Add initial thinking message
    messages.append(
        ChatMessage(
            role="assistant",
            content="",
            metadata={"title": "⏳Thinking: *The thoughts produced by the Gemini2.0 Flash model are experimental"}
        )
    )
    
    for chunk in response:
        parts = chunk.candidates[0].content.parts
        current_chunk = parts[0].text
        
        if len(parts) == 2 and not thinking_complete:
            # Complete thought and start response
            thought_buffer += current_chunk
            messages[-1] = ChatMessage(
                role="assistant",
                content=thought_buffer,
                metadata={"title": "⏳Thinking: *The thoughts produced by the Gemini2.0 Flash model are experimental"}
            )
            
            # Add response message
            messages.append(
                ChatMessage(
                    role="assistant",
                    content=parts[1].text
                )
            )
            thinking_complete = True
            
        elif thinking_complete:
            # Continue streaming response
            response_buffer += current_chunk
            messages[-1] = ChatMessage(
                role="assistant",
                content=response_buffer
            )
            
        else:
            # Continue streaming thoughts
            thought_buffer += current_chunk
            messages[-1] = ChatMessage(
                role="assistant",
                content=thought_buffer,
                metadata={"title": "⏳Thinking: *The thoughts produced by the Gemini2.0 Flash model are experimental"}
            )
        
        yield messages
```

Then, let's create the Gradio interface:

```python
with gr.Blocks() as demo:
    gr.Markdown("# Chat with Gemini 2.0 Flash and See its Thoughts 💭")
    
    chatbot = gr.Chatbot(
        label="Gemini2.0 'Thinking' Chatbot",
        render_markdown=True,
    )
    
    input_box = gr.Textbox(
        lines=1,
        label="Chat Message",
        placeholder="Type your message here and press Enter..."
    )
    
    # Set up event handlers
    msg_store = gr.State("")  # Store for preserving user message
    
    input_box.submit(
        lambda msg: (msg, msg, ""),  # Store message and clear input
        inputs=[input_box],
        outputs=[msg_store, input_box, input_box],
        queue=False
    ).then(
        user_message,  # Add user message to chat
        inputs=[msg_store, chatbot],
        outputs=[input_box, chatbot],
        queue=False
    ).then(
        stream_gemini_response,  # Generate and stream response
        inputs=[msg_store, chatbot],
        outputs=chatbot
    )

demo.launch()
```

This creates a chatbot that:

- Displays the model's thoughts in a collapsible section
- Streams the thoughts and final response in real-time
- Maintains a clean chat history

 That's it! You now have a chatbot that not only responds to users but also shows its thinking process, creating a more transparent and engaging interaction. See our finished Gemini 2.0 Flash Thinking demo [here](https://huggingface.co/spaces/ysharma/Gemini2-Flash-Thinking).


 ## Building with Citations 

The Gradio Chatbot can display citations from LLM responses, making it perfect for creating UIs that show source documentation and references. This guide will show you how to build a chatbot that displays Claude's citations in real-time.

### A real example using Anthropic's Citations API
Let's create a complete chatbot that shows both responses and their supporting citations. We'll use Anthropic's Claude API with citations enabled and Gradio for the UI.

We'll begin with imports and setting up the Anthropic client. Note that you'll need an `ANTHROPIC_API_KEY` environment variable set:

```python
import gradio as gr
import anthropic
import base64
from typing import List, Dict, Any

client = anthropic.Anthropic()
```

First, let's set up our message formatting functions that handle document preparation:

```python
def encode_pdf_to_base64(file_obj) -> str:
    """Convert uploaded PDF file to base64 string."""
    if file_obj is None:
        return None
    with open(file_obj.name, 'rb') as f:
        return base64.b64encode(f.read()).decode('utf-8')

def format_message_history(
    history: list, 
    enable_citations: bool,
    doc_type: str,
    text_input: str,
    pdf_file: str
) -> List[Dict]:
    """Convert Gradio chat history to Anthropic message format."""
    formatted_messages = []
    
    # Add previous messages
    for msg in history[:-1]:
        if msg["role"] == "user":
            formatted_messages.append({"role": "user", "content": msg["content"]})
    
    # Prepare the latest message with document
    latest_message = {"role": "user", "content": []}
    
    if enable_citations:
        if doc_type == "plain_text":
            latest_message["content"].append({
                "type": "document",
                "source": {
                    "type": "text",
                    "media_type": "text/plain",
                    "data": text_input.strip()
                },
                "title": "Text Document",
                "citations": {"enabled": True}
            })
        elif doc_type == "pdf" and pdf_file:
            pdf_data = encode_pdf_to_base64(pdf_file)
            if pdf_data:
                latest_message["content"].append({
                    "type": "document",
                    "source": {
                        "type": "base64",
                        "media_type": "application/pdf",
                        "data": pdf_data
                    },
                    "title": pdf_file.name,
                    "citations": {"enabled": True}
                })
    
    # Add the user's question
    latest_message["content"].append({"type": "text", "text": history[-1]["content"]})
    
    formatted_messages.append(latest_message)
    return formatted_messages
```

Then, let's create our bot response handler that processes citations:

```python
def bot_response(
    history: list,
    enable_citations: bool,
    doc_type: str,
    text_input: str,
    pdf_file: str
) -> List[Dict[str, Any]]:
    try:
        messages = format_message_history(history, enable_citations, doc_type, text_input, pdf_file)
        response = client.messages.create(model="claude-3-5-sonnet-20241022", max_tokens=1024, messages=messages)
        
        # Initialize main response and citations
        main_response = ""
        citations = []
        
        # Process each content block
        for block in response.content:
            if block.type == "text":
                main_response += block.text
                if enable_citations and hasattr(block, 'citations') and block.citations:
                    for citation in block.citations:
                        if citation.cited_text not in citations:
                            citations.append(citation.cited_text)
        
        # Add main response
        history.append({"role": "assistant", "content": main_response})
        
        # Add citations in a collapsible section
        if enable_citations and citations:
            history.append({
                "role": "assistant",
                "content": "\n".join([f"• {cite}" for cite in citations]),
                "metadata": {"title": "📚 Citations"}
            })
        
        return history
            
    except Exception as e:
        history.append({
            "role": "assistant",
            "content": "I apologize, but I encountered an error while processing your request."
        })
        return history
```

Finally, let's create the Gradio interface:

```python
with gr.Blocks() as demo:
    gr.Markdown("# Chat with Citations")
    
    with gr.Row(scale=1):
        with gr.Column(scale=4):
            chatbot = gr.Chatbot(bubble_full_width=False, show_label=False, scale=1)
            msg = gr.Textbox(placeholder="Enter your message here...", show_label=False, container=False)
            
        with gr.Column(scale=1):
            enable_citations = gr.Checkbox(label="Enable Citations", value=True, info="Toggle citation functionality" )
            doc_type_radio = gr.Radio( choices=["plain_text", "pdf"], value="plain_text", label="Document Type", info="Choose the type of document to use")
            text_input = gr.Textbox(label="Document Content", lines=10, info="Enter the text you want to reference")
            pdf_input = gr.File(label="Upload PDF", file_types=[".pdf"], file_count="single", visible=False)
    
    # Handle message submission
    msg.submit(
        user_message,
        [msg, chatbot, enable_citations, doc_type_radio, text_input, pdf_input],
        [msg, chatbot]
    ).then(
        bot_response,
        [chatbot, enable_citations, doc_type_radio, text_input, pdf_input],
        chatbot
    )

demo.launch()
```

This creates a chatbot that:
- Supports both plain text and PDF documents for Claude to cite from 
- Displays Citations in collapsible sections using our `metadata` feature
- Shows source quotes directly from the given documents

The citations feature works particularly well with the Gradio Chatbot's `metadata` support, allowing us to create collapsible sections that keep the chat interface clean while still providing easy access to source documentation.

That's it! You now have a chatbot that not only responds to users but also shows its sources, creating a more transparent and trustworthy interaction. See our finished Citations demo [here](https://huggingface.co/spaces/ysharma/anthropic-citations-with-gradio-metadata-key).

---

<!-- Source: guides/06_data-science-and-plots/03_filters-tables-and-stats.md -->
# Filters, Tables and Stats

Your dashboard will likely consist of more than just plots. Let's take a look at some of the other common components of a dashboard.

## Filters

Use any of the standard Gradio form components to filter your data. You can do this via event listeners or function-as-value syntax. Let's look at the event listener approach first:

$code_plot_guide_filters_events
$demo_plot_guide_filters_events

And this would be the function-as-value approach for the same demo.

$code_plot_guide_filters

## Tables and Stats

Add `gr.DataFrame` and `gr.Label` to your dashboard for some hard numbers.

$code_plot_guide_tables_stats
$demo_plot_guide_tables_stats

---

<!-- Source: guides/07_streaming/03_object-detection-from-video.md -->
# Streaming Object Detection from Video

Tags: VISION, STREAMING, VIDEO

In this guide we'll use the [RT-DETR](https://huggingface.co/docs/transformers/en/model_doc/rt_detr) model to detect objects in a user uploaded video. We'll stream the results from the server using the new video streaming features introduced in Gradio 5.0.

![video_object_detection_stream_latest](https://github.com/user-attachments/assets/4e27ac58-5ded-495d-9e0d-5e87e68b1355)

## Setting up the Model

First, we'll install the following requirements in our system:

```
opencv-python
torch
transformers>=4.43.0
spaces
```

Then, we'll download the model from the Hugging Face Hub:

```python
from transformers import RTDetrForObjectDetection, RTDetrImageProcessor

image_processor = RTDetrImageProcessor.from_pretrained("PekingU/rtdetr_r50vd")
model = RTDetrForObjectDetection.from_pretrained("PekingU/rtdetr_r50vd").to("cuda")
```
We're moving the model to the GPU. We'll be deploying our model to Hugging Face Spaces and running the inference in the [free ZeroGPU cluster](https://huggingface.co/zero-gpu-explorers). 


## The Inference Function

Our inference function will accept a video and a desired confidence threshold.
Object detection models identify many objects and assign a confidence score to each object. The lower the confidence, the higher the chance of a false positive. So we will let our users set the confidence threshold.

Our function will iterate over the frames in the video and run the RT-DETR model over each frame.
We will then draw the bounding boxes for each detected object in the frame and save the frame to a new output video.
The function will yield each output video in chunks of two seconds.

In order to keep inference times as low as possible on ZeroGPU (there is a time-based quota),
we will halve the original frames-per-second in the output video and resize the input frames to be half the original 
size before running the model.

The code for the inference function is below - we'll go over it piece by piece.

```python
import spaces
import cv2
from PIL import Image
import torch
import time
import numpy as np
import uuid

from draw_boxes import draw_bounding_boxes

SUBSAMPLE = 2

@spaces.GPU
def stream_object_detection(video, conf_threshold):
    cap = cv2.VideoCapture(video)

    # This means we will output mp4 videos
    video_codec = cv2.VideoWriter_fourcc(*"mp4v") # type: ignore
    fps = int(cap.get(cv2.CAP_PROP_FPS))

    desired_fps = fps // SUBSAMPLE
    width  = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)) // 2
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT)) // 2

    iterating, frame = cap.read()

    n_frames = 0

    # Use UUID to create a unique video file
    output_video_name = f"output_{uuid.uuid4()}.mp4"

    # Output Video
    output_video = cv2.VideoWriter(output_video_name, video_codec, desired_fps, (width, height)) # type: ignore
    batch = []

    while iterating:
        frame = cv2.resize( frame, (0,0), fx=0.5, fy=0.5)
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        if n_frames % SUBSAMPLE == 0:
            batch.append(frame)
        if len(batch) == 2 * desired_fps:
            inputs = image_processor(images=batch, return_tensors="pt").to("cuda")

            with torch.no_grad():
                outputs = model(**inputs)

            boxes = image_processor.post_process_object_detection(
                outputs,
                target_sizes=torch.tensor([(height, width)] * len(batch)),
                threshold=conf_threshold)
            
            for i, (array, box) in enumerate(zip(batch, boxes)):
                pil_image = draw_bounding_boxes(Image.fromarray(array), box, model, conf_threshold)
                frame = np.array(pil_image)
                # Convert RGB to BGR
                frame = frame[:, :, ::-1].copy()
                output_video.write(frame)

            batch = []
            output_video.release()
            yield output_video_name
            output_video_name = f"output_{uuid.uuid4()}.mp4"
            output_video = cv2.VideoWriter(output_video_name, video_codec, desired_fps, (width, height)) # type: ignore

        iterating, frame = cap.read()
        n_frames += 1
```

1. **Reading from the Video**

One of the industry standards for creating videos in python is OpenCV so we will use it in this app.

The `cap` variable is how we will read from the input video. Whenever we call `cap.read()`, we are reading the next frame in the video.

In order to stream video in Gradio, we need to yield a different video file for each "chunk" of the output video.
We create the next video file to write to with the `output_video = cv2.VideoWriter(output_video_name, video_codec, desired_fps, (width, height))` line. The `video_codec` is how we specify the type of video file. Only "mp4" and "ts" files are supported for video sreaming at the moment.


2. **The Inference Loop**

For each frame in the video, we will resize it to be half the size. OpenCV reads files in `BGR` format, so will convert to the expected `RGB` format of transfomers. That's what the first two lines of the while loop are doing. 

We take every other frame and add it to a `batch` list so that the output video is half the original FPS. When the batch covers two seconds of video, we will run the model. The two second threshold was chosen to keep the processing time of each batch small enough so that video is smoothly displayed in the server while not requiring too many separate forward passes. In order for video streaming to work properly in Gradio, the batch size should be at least 1 second. 

We run the forward pass of the model and then use the `post_process_object_detection` method of the model to scale the detected bounding boxes to the size of the input frame.

We make use of a custom function to draw the bounding boxes (source [here](https://huggingface.co/spaces/gradio/rt-detr-object-detection/blob/main/draw_boxes.py#L14)). We then have to convert from `RGB` to `BGR` before writing back to the output video.

Once we have finished processing the batch, we create a new output video file for the next batch.

## The Gradio Demo

The UI code is pretty similar to other kinds of Gradio apps. 
We'll use a standard two-column layout so that users can see the input and output videos side by side.

In order for streaming to work, we have to set `streaming=True` in the output video. Setting the video
to autoplay is not necessary but it's a better experience for users.

```python
import gradio as gr

with gr.Blocks() as app:
    gr.HTML(
        """
    <h1 style='text-align: center'>
    Video Object Detection with <a href='https://huggingface.co/PekingU/rtdetr_r101vd_coco_o365' target='_blank'>RT-DETR</a>
    </h1>
    """)
    with gr.Row():
        with gr.Column():
            video = gr.Video(label="Video Source")
            conf_threshold = gr.Slider(
                label="Confidence Threshold",
                minimum=0.0,
                maximum=1.0,
                step=0.05,
                value=0.30,
            )
        with gr.Column():
            output_video = gr.Video(label="Processed Video", streaming=True, autoplay=True)

    video.upload(
        fn=stream_object_detection,
        inputs=[video, conf_threshold],
        outputs=[output_video],
    )


```


## Conclusion

You can check out our demo hosted on Hugging Face Spaces [here](https://huggingface.co/spaces/gradio/rt-detr-object-detection). 

It is also embedded on this page below

$demo_rt-detr-object-detection

---

<!-- Source: guides/08_custom-components/03_configuration.md -->
# Configuring Your Custom Component

The custom components workflow focuses on [convention over configuration](https://en.wikipedia.org/wiki/Convention_over_configuration) to reduce the number of decisions you as a developer need to make when developing your custom component.
That being said, you can still configure some aspects of the custom component package and directory.
This guide will cover how.

## The Package Name

By default, all custom component packages are called `gradio_<component-name>` where `component-name` is the name of the component's python class in lowercase.

As an example, let's walkthrough changing the name of a component from `gradio_mytextbox` to `supertextbox`. 

1. Modify the `name` in the `pyproject.toml` file. 

```bash
[project]
name = "supertextbox"
```

2. Change all occurrences of `gradio_<component-name>` in `pyproject.toml` to `<component-name>`

```bash
[tool.hatch.build]
artifacts = ["/backend/supertextbox/templates", "*.pyi"]

[tool.hatch.build.targets.wheel]
packages = ["/backend/supertextbox"]
```

3. Rename the `gradio_<component-name>` directory in `backend/` to `<component-name>`

```bash
mv backend/gradio_mytextbox backend/supertextbox
```


Tip: Remember to change the import statement in `demo/app.py`!

## Top Level Python Exports

By default, only the custom component python class is a top level export. 
This means that when users type `from gradio_<component-name> import ...`, the only class that will be available is the custom component class.
To add more classes as top level exports, modify the `__all__` property in `__init__.py`

```python
from .mytextbox import MyTextbox
from .mytextbox import AdditionalClass, additional_function

__all__ = ['MyTextbox', 'AdditionalClass', 'additional_function']
```

## Python Dependencies

You can add python dependencies by modifying the `dependencies` key in `pyproject.toml`

```bash
dependencies = ["gradio", "numpy", "PIL"]
```


Tip: Remember to run `gradio cc install` when you add dependencies!

## Javascript Dependencies

You can add JavaScript dependencies by modifying the `"dependencies"` key in `frontend/package.json`

```json
"dependencies": {
    "@gradio/atoms": "0.2.0-beta.4",
    "@gradio/statustracker": "0.3.0-beta.6",
    "@gradio/utils": "0.2.0-beta.4",
    "your-npm-package": "<version>"
}
```

## Directory Structure

By default, the CLI will place the Python code in `backend` and the JavaScript code in `frontend`.
It is not recommended to change this structure since it makes it easy for a potential contributor to look at your source code and know where everything is.
However, if you did want to this is what you would have to do:

1. Place the Python code in the subdirectory of your choosing. Remember to modify the `[tool.hatch.build]` `[tool.hatch.build.targets.wheel]` in the `pyproject.toml` to match!

2. Place the JavaScript code in the subdirectory of your choosing.

2. Add the `FRONTEND_DIR` property on the component python class. It must be the relative path from the file where the class is defined to the location of the JavaScript directory.

```python
class SuperTextbox(Component):
    FRONTEND_DIR = "../../frontend/"
```

The JavaScript and Python directories must be under the same common directory!

## Conclusion


Sticking to the defaults will make it easy for others to understand and contribute to your custom component.
After all, the beauty of open source is that anyone can help improve your code!
But if you ever need to deviate from the defaults, you know how!

---

<!-- Source: guides/09_gradio-clients-and-lite/03_querying-gradio-apps-with-curl.md -->
# Querying Gradio Apps with Curl

Tags: CURL, API, SPACES

It is possible to use any Gradio app as an API using cURL, the command-line tool that is pre-installed on many operating systems. This is particularly useful if you are trying to query a Gradio app from an environment other than Python or Javascript (since specialized Gradio clients exist for both [Python](/guides/getting-started-with-the-python-client) and [Javascript](/guides/getting-started-with-the-js-client)).

As an example, consider this Gradio demo that translates text from English to French: https://abidlabs-en2fr.hf.space/.

Using `curl`, we can translate text programmatically.

Here's the code to do it:

```bash
$ curl -X POST https://abidlabs-en2fr.hf.space/call/predict -H "Content-Type: application/json" -d '{
  "data": ["Hello, my friend."] 
}'

>> {"event_id": $EVENT_ID}   
```

```bash
$ curl -N https://abidlabs-en2fr.hf.space/call/predict/$EVENT_ID

>> event: complete
>> data: ["Bonjour, mon ami."]
```


Note: making a prediction and getting a result requires two `curl` requests: a `POST` and a `GET`. The `POST` request returns an `EVENT_ID` and prints  it to the console, which is used in the second `GET` request to fetch the results. You can combine these into a single command using `awk` and `read` to parse the results of the first command and pipe into the second, like this:

```bash
$ curl -X POST https://abidlabs-en2fr.hf.space/call/predict -H "Content-Type: application/json" -d '{
  "data": ["Hello, my friend."] 
}' \
  | awk -F'"' '{ print $4}'  \
  | read EVENT_ID; curl -N https://abidlabs-en2fr.hf.space/call/predict/$EVENT_ID

>> event: complete
>> data: ["Bonjour, mon ami."]
```

In the rest of this Guide, we'll explain these two steps in more detail and provide additional examples of querying Gradio apps with `curl`.


**Prerequisites**: For this Guide, you do _not_ need to know how to build Gradio apps in great detail. However, it is helpful to have general familiarity with Gradio's concepts of input and output components.

## Installation

You generally don't need to install cURL, as it comes pre-installed on many operating systems. Run:

```bash
curl --version
```

to confirm that `curl` is installed. If it is not already installed, you can install it by visiting https://curl.se/download.html. 


## Step 0: Get the URL for your Gradio App 

To query a Gradio app, you'll need its full URL. This is usually just the URL that the Gradio app is hosted on, for example: https://bec81a83-5b5c-471e.gradio.live


**Hugging Face Spaces**

However, if you are querying a Gradio on Hugging Face Spaces, you will need to use the URL of the embedded Gradio app, not the URL of the Space webpage. For example:

```bash
❌ Space URL: https://huggingface.co/spaces/abidlabs/en2fr
✅ Gradio app URL: https://abidlabs-en2fr.hf.space/
```

You can get the Gradio app URL by clicking the "view API" link at the bottom of the page. Or, you can right-click on the page and then click on "View Frame Source" or the equivalent in your browser to view the URL of the embedded Gradio app.

While you can use any public Space as an API, you may get rate limited by Hugging Face if you make too many requests. For unlimited usage of a Space, simply duplicate the Space to create a private Space,
and then use it to make as many requests as you'd like!

Note: to query private Spaces, you will need to pass in your Hugging Face (HF) token. You can get your HF token here: https://huggingface.co/settings/tokens. In this case, you will need to include an additional header in both of your `curl` calls that we'll discuss below:

```bash
-H "Authorization: Bearer $HF_TOKEN"
```

Now, we are ready to make the two `curl` requests.

## Step 1: Make a Prediction (POST)

The first of the two `curl` requests is `POST` request that submits the input payload to the Gradio app. 

The syntax of the `POST` request is as follows:

```bash
$ curl -X POST $URL/call/$API_NAME -H "Content-Type: application/json" -d '{
  "data": $PAYLOAD
}'
```

Here:

* `$URL` is the URL of the Gradio app as obtained in Step 0
* `$API_NAME` is the name of the API endpoint for the event that you are running. You can get the API endpoint names by clicking the "view API" link at the bottom of the page.
*  `$PAYLOAD` is a valid JSON data list containing the input payload, one element for each input component.

When you make this `POST` request successfully, you will get an event id that is printed to the terminal in this format:

```bash
>> {"event_id": $EVENT_ID}   
```

This `EVENT_ID` will be needed in the subsequent `curl` request to fetch the results of the prediction. 

Here are some examples of how to make the `POST` request

**Basic Example**

Revisiting the example at the beginning of the page, here is how to make the `POST` request for a simple Gradio application that takes in a single input text component:

```bash
$ curl -X POST https://abidlabs-en2fr.hf.space/call/predict -H "Content-Type: application/json" -d '{
  "data": ["Hello, my friend."] 
}'
```

**Multiple Input Components**

This [Gradio demo](https://huggingface.co/spaces/gradio/hello_world_3) accepts three inputs: a string corresponding to the `gr.Textbox`, a boolean value corresponding to the `gr.Checkbox`, and a numerical value corresponding to the `gr.Slider`. Here is the `POST` request:

```bash
curl -X POST https://gradio-hello-world-3.hf.space/call/predict -H "Content-Type: application/json" -d '{
  "data": ["Hello", true, 5]
}'
```

**Private Spaces**

As mentioned earlier, if you are making a request to a private Space, you will need to pass in a [Hugging Face token](https://huggingface.co/settings/tokens) that has read access to the Space. The request will look like this:

```bash
$ curl -X POST https://private-space.hf.space/call/predict -H "Content-Type: application/json" -H "Authorization: Bearer $HF_TOKEN" -d '{
  "data": ["Hello, my friend."] 
}'
```

**Files**

If you are using `curl` to query a Gradio application that requires file inputs, the files *need* to be provided as URLs, and The URL needs to be enclosed in a dictionary in this format:

```bash
{"path": $URL}
```

Here is an example `POST` request:

```bash
$ curl -X POST https://gradio-image-mod.hf.space/call/predict -H "Content-Type: application/json" -d '{
  "data": [{"path": "https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png"}] 
}'
```


**Stateful Demos**

If your Gradio demo [persists user state](/guides/interface-state) across multiple interactions (e.g. is a chatbot), you can pass in a `session_hash` alongside the `data`. Requests with the same `session_hash` are assumed to be part of the same user session. Here's how that might look:

```bash
# These two requests will share a session

curl -X POST https://gradio-chatinterface-random-response.hf.space/call/chat -H "Content-Type: application/json" -d '{
  "data": ["Are you sentient?"],
  "session_hash": "randomsequence1234"
}'

curl -X POST https://gradio-chatinterface-random-response.hf.space/call/chat -H "Content-Type: application/json" -d '{
  "data": ["Really?"],
  "session_hash": "randomsequence1234"
}'

# This request will be treated as a new session

curl -X POST https://gradio-chatinterface-random-response.hf.space/call/chat -H "Content-Type: application/json" -d '{
  "data": ["Are you sentient?"],
  "session_hash": "newsequence5678"
}'
```



## Step 2: GET the result

Once you have received the `EVENT_ID` corresponding to your prediction, you can stream the results. Gradio stores these results  in a least-recently-used cache in the Gradio app. By default, the cache can store 2,000 results (across all users and endpoints of the app). 

To stream the results for your prediction, make a `GET` request with the following syntax:

```bash
$ curl -N $URL/call/$API_NAME/$EVENT_ID
```


Tip: If you are fetching results from a private Space, include a header with your HF token like this: `-H "Authorization: Bearer $HF_TOKEN"` in the `GET` request.

This should produce a stream of responses in this format:

```bash
event: ... 
data: ...
event: ... 
data: ...
...
```

Here: `event` can be one of the following:
* `generating`: indicating an intermediate result
* `complete`: indicating that the prediction is complete and the final result 
* `error`: indicating that the prediction was not completed successfully
* `heartbeat`: sent every 15 seconds to keep the request alive

The `data` is in the same format as the input payload: valid JSON data list containing the output result, one element for each output component.

Here are some examples of what results you should expect if a request is completed successfully:

**Basic Example**

Revisiting the example at the beginning of the page, we would expect the result to look like this:

```bash
event: complete
data: ["Bonjour, mon ami."]
```

**Multiple Outputs**

If your endpoint returns multiple values, they will appear as elements of the `data` list:

```bash
event: complete
data: ["Good morning Hello. It is 5 degrees today", -15.0]
```

**Streaming Example**

If your Gradio app [streams a sequence of values](/guides/streaming-outputs), then they will be streamed directly to your terminal, like this:

```bash
event: generating
data: ["Hello, w!"]
event: generating
data: ["Hello, wo!"]
event: generating
data: ["Hello, wor!"]
event: generating
data: ["Hello, worl!"]
event: generating
data: ["Hello, world!"]
event: complete
data: ["Hello, world!"]
```

**File Example**

If your Gradio app returns a file, the file will be represented as a dictionary in this format (including potentially some additional keys):

```python
{
    "orig_name": "example.jpg",
    "path": "/path/in/server.jpg",
    "url": "https:/example.com/example.jpg",
    "meta": {"_type": "gradio.FileData"}
}
```

In your terminal, it may appear like this:

```bash
event: complete
data: [{"path": "/tmp/gradio/359933dc8d6cfe1b022f35e2c639e6e42c97a003/image.webp", "url": "https://gradio-image-mod.hf.space/c/file=/tmp/gradio/359933dc8d6cfe1b022f35e2c639e6e42c97a003/image.webp", "size": null, "orig_name": "image.webp", "mime_type": null, "is_stream": false, "meta": {"_type": "gradio.FileData"}}]
```

## Authentication

What if your Gradio application has [authentication enabled](/guides/sharing-your-app#authentication)? In that case, you'll need to make an additional `POST` request with cURL to authenticate yourself before you make any queries. Here are the complete steps:

First, login with a `POST` request supplying a valid username and password:

```bash
curl -X POST $URL/login \
     -d "username=$USERNAME&password=$PASSWORD" \
     -c cookies.txt
```

If the credentials are correct, you'll get `{"success":true}` in response and the cookies will be saved in `cookies.txt`.

Next, you'll need to include these cookies when you make the original `POST` request, like this:

```bash
$ curl -X POST $URL/call/$API_NAME -b cookies.txt -H "Content-Type: application/json" -d '{
  "data": $PAYLOAD
}'
```

Finally, you'll need to `GET` the results, again supplying the cookies from the file:

```bash
curl -N $URL/call/$API_NAME/$EVENT_ID -b cookies.txt
```

---

<!-- Source: guides/10_mcp/03_building-an-mcp-client-with-gradio.md -->
# Using the Gradio Chatbot as an MCP Client

This guide will walk you through a Model Context Protocol (MCP) Client and Server implementation with Gradio. You'll build a Gradio Chatbot that uses Anthropic's Claude API to respond to user messages, but also, as an MCP Client, generates images (by connecting to an MCP Server, which is a separate Gradio app). 

<video src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/mcp-guides.mp4" style="width:100%" controls preload> </video>

## What is MCP?

The Model Context Protocol (MCP) standardizes how applications provide context to LLMs. It allows Claude to interact with external tools, like image generators, file systems, or APIs, etc.

## Prerequisites

- Python 3.10+
- An Anthropic API key
- Basic understanding of Python programming

## Setup

First, install the required packages:

```bash
pip install gradio anthropic mcp
```

Create a `.env` file in your project directory and add your Anthropic API key:

```
ANTHROPIC_API_KEY=your_api_key_here
```

## Part 1: Building the MCP Server

The server provides tools that Claude can use. In this example, we'll create a server that generates images through [a HuggingFace space](https://huggingface.co/spaces/ysharma/SanaSprint).

Create a file named `gradio_mcp_server.py`:

```python
from mcp.server.fastmcp import FastMCP
import json
import sys
import io
import time
from gradio_client import Client

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

mcp = FastMCP("huggingface_spaces_image_display")

@mcp.tool()
async def generate_image(prompt: str, width: int = 512, height: int = 512) -> str:
    """Generate an image using SanaSprint model.
    
    Args:
        prompt: Text prompt describing the image to generate
        width: Image width (default: 512)
        height: Image height (default: 512)
    """
    client = Client("https://ysharma-sanasprint.hf.space/")
    
    try:
        result = client.predict(
            prompt,
            "0.6B",
            0,
            True,
            width,
            height,
            4.0,
            2,
            api_name="/infer"
        )
        
        if isinstance(result, list) and len(result) >= 1:
            image_data = result[0]
            if isinstance(image_data, dict) and "url" in image_data:
                return json.dumps({
                    "type": "image",
                    "url": image_data["url"],
                    "message": f"Generated image for prompt: {prompt}"
                })
        
        return json.dumps({
            "type": "error",
            "message": "Failed to generate image"
        })
        
    except Exception as e:
        return json.dumps({
            "type": "error",
            "message": f"Error generating image: {str(e)}"
        })

if __name__ == "__main__":
    mcp.run(transport='stdio')
```

### What this server does:

1. It creates an MCP server that exposes a `generate_image` tool
2. The tool connects to the SanaSprint model hosted on HuggingFace Spaces
3. It handles the asynchronous nature of image generation by polling for results
4. When an image is ready, it returns the URL in a structured JSON format

## Part 2: Building the MCP Client with Gradio

Now let's create a Gradio chat interface as MCP Client that connects Claude to our MCP server.

Create a file named `app.py`:

```python
import asyncio
import os
import json
from typing import List, Dict, Any, Union
from contextlib import AsyncExitStack

import gradio as gr
from gradio.components.chatbot import ChatMessage
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
from anthropic import Anthropic
from dotenv import load_dotenv

load_dotenv()

loop = asyncio.new_event_loop()
asyncio.set_event_loop(loop)

class MCPClientWrapper:
    def __init__(self):
        self.session = None
        self.exit_stack = None
        self.anthropic = Anthropic()
        self.tools = []
    
    def connect(self, server_path: str) -> str:
        return loop.run_until_complete(self._connect(server_path))
    
    async def _connect(self, server_path: str) -> str:
        if self.exit_stack:
            await self.exit_stack.aclose()
        
        self.exit_stack = AsyncExitStack()
        
        is_python = server_path.endswith('.py')
        command = "python" if is_python else "node"
        
        server_params = StdioServerParameters(
            command=command,
            args=[server_path],
            env={"PYTHONIOENCODING": "utf-8", "PYTHONUNBUFFERED": "1"}
        )
        
        stdio_transport = await self.exit_stack.enter_async_context(stdio_client(server_params))
        self.stdio, self.write = stdio_transport
        
        self.session = await self.exit_stack.enter_async_context(ClientSession(self.stdio, self.write))
        await self.session.initialize()
        
        response = await self.session.list_tools()
        self.tools = [{ 
            "name": tool.name,
            "description": tool.description,
            "input_schema": tool.inputSchema
        } for tool in response.tools]
        
        tool_names = [tool["name"] for tool in self.tools]
        return f"Connected to MCP server. Available tools: {', '.join(tool_names)}"
    
    def process_message(self, message: str, history: List[Union[Dict[str, Any], ChatMessage]]) -> tuple:
        if not self.session:
            return history + [
                {"role": "user", "content": message}, 
                {"role": "assistant", "content": "Please connect to an MCP server first."}
            ], gr.Textbox(value="")
        
        new_messages = loop.run_until_complete(self._process_query(message, history))
        return history + [{"role": "user", "content": message}] + new_messages, gr.Textbox(value="")
    
    async def _process_query(self, message: str, history: List[Union[Dict[str, Any], ChatMessage]]):
        claude_messages = []
        for msg in history:
            if isinstance(msg, ChatMessage):
                role, content = msg.role, msg.content
            else:
                role, content = msg.get("role"), msg.get("content")
            
            if role in ["user", "assistant", "system"]:
                claude_messages.append({"role": role, "content": content})
        
        claude_messages.append({"role": "user", "content": message})
        
        response = self.anthropic.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=1000,
            messages=claude_messages,
            tools=self.tools
        )

        result_messages = []
        
        for content in response.content:
            if content.type == 'text':
                result_messages.append({
                    "role": "assistant", 
                    "content": content.text
                })
                
            elif content.type == 'tool_use':
                tool_name = content.name
                tool_args = content.input
                
                result_messages.append({
                    "role": "assistant",
                    "content": f"I'll use the {tool_name} tool to help answer your question.",
                    "metadata": {
                        "title": f"Using tool: {tool_name}",
                        "log": f"Parameters: {json.dumps(tool_args, ensure_ascii=True)}",
                        "status": "pending",
                        "id": f"tool_call_{tool_name}"
                    }
                })
                
                result_messages.append({
                    "role": "assistant",
                    "content": "```json\n" + json.dumps(tool_args, indent=2, ensure_ascii=True) + "\n```",
                    "metadata": {
                        "parent_id": f"tool_call_{tool_name}",
                        "id": f"params_{tool_name}",
                        "title": "Tool Parameters"
                    }
                })
                
                result = await self.session.call_tool(tool_name, tool_args)
                
                if result_messages and "metadata" in result_messages[-2]:
                    result_messages[-2]["metadata"]["status"] = "done"
                
                result_messages.append({
                    "role": "assistant",
                    "content": "Here are the results from the tool:",
                    "metadata": {
                        "title": f"Tool Result for {tool_name}",
                        "status": "done",
                        "id": f"result_{tool_name}"
                    }
                })
                
                result_content = result.content
                if isinstance(result_content, list):
                    result_content = "\n".join(str(item) for item in result_content)
                
                try:
                    result_json = json.loads(result_content)
                    if isinstance(result_json, dict) and "type" in result_json:
                        if result_json["type"] == "image" and "url" in result_json:
                            result_messages.append({
                                "role": "assistant",
                                "content": {"path": result_json["url"], "alt_text": result_json.get("message", "Generated image")},
                                "metadata": {
                                    "parent_id": f"result_{tool_name}",
                                    "id": f"image_{tool_name}",
                                    "title": "Generated Image"
                                }
                            })
                        else:
                            result_messages.append({
                                "role": "assistant",
                                "content": "```\n" + result_content + "\n```",
                                "metadata": {
                                    "parent_id": f"result_{tool_name}",
                                    "id": f"raw_result_{tool_name}",
                                    "title": "Raw Output"
                                }
                            })
                except:
                    result_messages.append({
                        "role": "assistant",
                        "content": "```\n" + result_content + "\n```",
                        "metadata": {
                            "parent_id": f"result_{tool_name}",
                            "id": f"raw_result_{tool_name}",
                            "title": "Raw Output"
                        }
                    })
                
                claude_messages.append({"role": "user", "content": f"Tool result for {tool_name}: {result_content}"})
                next_response = self.anthropic.messages.create(
                    model="claude-3-5-sonnet-20241022",
                    max_tokens=1000,
                    messages=claude_messages,
                )
                
                if next_response.content and next_response.content[0].type == 'text':
                    result_messages.append({
                        "role": "assistant",
                        "content": next_response.content[0].text
                    })

        return result_messages

client = MCPClientWrapper()

def gradio_interface():
    with gr.Blocks(title="MCP Weather Client") as demo:
        gr.Markdown("# MCP Weather Assistant")
        gr.Markdown("Connect to your MCP weather server and chat with the assistant")
        
        with gr.Row(equal_height=True):
            with gr.Column(scale=4):
                server_path = gr.Textbox(
                    label="Server Script Path",
                    placeholder="Enter path to server script (e.g., weather.py)",
                    value="gradio_mcp_server.py"
                )
            with gr.Column(scale=1):
                connect_btn = gr.Button("Connect")
        
        status = gr.Textbox(label="Connection Status", interactive=False)
        
        chatbot = gr.Chatbot(
            value=[], 
            height=500,
            show_copy_button=True,
            avatar_images=("👤", "🤖")
        )
        
        with gr.Row(equal_height=True):
            msg = gr.Textbox(
                label="Your Question",
                placeholder="Ask about weather or alerts (e.g., What's the weather in New York?)",
                scale=4
            )
            clear_btn = gr.Button("Clear Chat", scale=1)
        
        connect_btn.click(client.connect, inputs=server_path, outputs=status)
        msg.submit(client.process_message, [msg, chatbot], [chatbot, msg])
        clear_btn.click(lambda: [], None, chatbot)
        
    return demo

if __name__ == "__main__":
    if not os.getenv("ANTHROPIC_API_KEY"):
        print("Warning: ANTHROPIC_API_KEY not found in environment. Please set it in your .env file.")
    
    interface = gradio_interface()
    interface.launch(debug=True)
```

### What this MCP Client does:

- Creates a friendly Gradio chat interface for user interaction
- Connects to the MCP server you specify
- Handles conversation history and message formatting
- Makes call to Claude API with tool definitions
- Processes tool usage requests from Claude
- Displays images and other tool outputs in the chat
- Sends tool results back to Claude for interpretation

## Running the Application

To run your MCP application:

- Start a terminal window and run the MCP Client:
   ```bash
   python app.py
   ```
- Open the Gradio interface at the URL shown (typically http://127.0.0.1:7860)
- In the Gradio interface, you'll see a field for the MCP Server path. It should default to `gradio_mcp_server.py`.
- Click "Connect" to establish the connection to the MCP server.
- You should see a message indicating the server connection was successful.

## Example Usage

Now you can chat with Claude and it will be able to generate images based on your descriptions.

Try prompts like:
- "Can you generate an image of a mountain landscape at sunset?"
- "Create an image of a cool tabby cat"
- "Generate a picture of a panda wearing sunglasses"

Claude will recognize these as image generation requests and automatically use the `generate_image` tool from your MCP server.


## How it Works

Here's the high-level flow of what happens during a chat session:

1. Your prompt enters the Gradio interface
2. The client forwards your prompt to Claude
3. Claude analyzes the prompt and decides to use the `generate_image` tool
4. The client sends the tool call to the MCP server
5. The server calls the external image generation API
6. The image URL is returned to the client
7. The client sends the image URL back to Claude
8. Claude provides a response that references the generated image
9. The Gradio chat interface displays both Claude's response and the image


## Next Steps

Now that you have a working MCP system, here are some ideas to extend it:

- Add more tools to your server
- Improve error handling 
- Add private Huggingface Spaces with authentication for secure tool access
- Create custom tools that connect to your own APIs or services
- Implement streaming responses for better user experience

## Conclusion

Congratulations! You've successfully built an MCP Client and Server that allows Claude to generate images based on text prompts. This is just the beginning of what you can do with Gradio and MCP. This guide enables you to build complex AI applications that can use Claude or any other powerful LLM to interact with virtually any external tool or service.

Read our other Guide on using [Gradio apps as MCP Servers](./building-mcp-server-with-gradio).

---

<!-- Source: guides/cn/01_getting-started/03_sharing-your-app.md -->
# 分享您的应用

如何分享您的 Gradio 应用：

1. [使用 share 参数分享演示](#sharing-demos)
2. [在 HF Spaces 上托管](#hosting-on-hf-spaces)
3. [嵌入托管的空间](#embedding-hosted-spaces)
4. [使用 Web 组件嵌入](#embedding-with-web-components)
5. [使用 API 页面](#api-page)
6. [在页面上添加身份验证](#authentication)
7. [访问网络请求](#accessing-the-network-request-directly)
8. [在 FastAPI 中挂载](#mounting-within-another-fastapi-app)
9. [安全性](#security-and-file-access)

## 分享演示

通过在 `launch()` 方法中设置 `share=True`，可以轻松公开分享 Gradio 演示。就像这样：

```python
demo.launch(share=True)
```

这将生成一个公开的可分享链接，您可以将其发送给任何人！当您发送此链接时，对方用户可以在其浏览器中尝试模型。因为处理过程发生在您的设备上（只要您的设备保持开启！），您不必担心任何打包依赖项的问题。一个分享链接通常看起来像这样：**XXXXX.gradio.app**。尽管链接是通过 Gradio URL 提供的，但我们只是您本地服务器的代理，并不会存储通过您的应用发送的任何数据。

但请记住，这些链接可以被公开访问，这意味着任何人都可以使用您的模型进行预测！因此，请确保不要通过您编写的函数公开任何敏感信息，也不要允许在您的设备上进行任何关键更改。如果您设置 `share=False`（默认值，在 colab 笔记本中除外），则只创建一个本地链接，可以通过[端口转发](https://www.ssh.com/ssh/tunneling/example)与特定用户共享。

<img style="width: 40%" src="/assets/guides/sharing.svg">

分享链接在 72 小时后过期。

## 在 HF Spaces 上托管

如果您想在互联网上获得您的 Gradio 演示的永久链接，请使用 Hugging Face Spaces。 [Hugging Face Spaces](http://huggingface.co/spaces/) 提供了免费托管您的机器学习模型的基础设施！

在您创建了一个免费的 Hugging Face 账户后，有三种方法可以将您的 Gradio 应用部署到 Hugging Face Spaces：

1. 从终端：在应用目录中运行 `gradio deploy`。CLI 将收集一些基本元数据，然后启动您的应用。要更新您的空间，可以重新运行此命令或启用 Github Actions 选项，在 `git push` 时自动更新 Spaces。
2. 从浏览器：将包含 Gradio 模型和所有相关文件的文件夹拖放到 [此处](https://huggingface.co/new-space)。
3. 将 Spaces 与您的 Git 存储库连接，Spaces 将从那里拉取 Gradio 应用。有关更多信息，请参阅 [此指南如何在 Hugging Face Spaces 上托管](https://huggingface.co/blog/gradio-spaces)。

<video autoplay muted loop>
  <source src="/assets/guides/hf_demo.mp4" type="video/mp4" />
</video>

## 嵌入托管的空间

一旦您将应用托管在 Hugging Face Spaces（或您自己的服务器上），您可能希望将演示嵌入到不同的网站上，例如您的博客或个人作品集。嵌入交互式演示使人们可以在他们的浏览器中尝试您构建的机器学习模型，而无需下载或安装任何内容！最好的部分是，您甚至可以将交互式演示嵌入到静态网站中，例如 GitHub 页面。

有两种方法可以嵌入您的 Gradio 演示。您可以在 Hugging Face Space 页面的“嵌入此空间”下拉选项中直接找到这两个选项的快速链接：

![嵌入此空间下拉选项](/assets/guides/embed_this_space.png)

### 使用 Web 组件嵌入

与 IFrames 相比，Web 组件通常为用户提供更好的体验。Web 组件进行延迟加载，这意味着它们不会减慢您网站的加载时间，并且它们会根据 Gradio 应用的大小自动调整其高度。

要使用 Web 组件嵌入：

1.  通过在您的网站中添加以下脚本来导入 gradio JS 库（在 URL 中替换{GRADIO_VERSION}为您使用的 Gradio 库的版本）。

        ```html

    &lt;script type="module"
    src="https://gradio.s3-us-west-2.amazonaws.com/{GRADIO_VERSION}/gradio.js">
    &lt;/script>
    ```

2.  在您想放置应用的位置添加
    `html
&lt;gradio-app src="https://$your_space_host.hf.space">&lt;/gradio-app>
    `
    元素。将 `src=` 属性设置为您的 Space 的嵌入 URL，您可以在“嵌入此空间”按钮中找到。例如：

        ```html

    &lt;gradio-app src="https://abidlabs-pytorch-image-classifier.hf.space">&lt;/gradio-app>
    ```

<script>
fetch("https://pypi.org/pypi/gradio/json"
).then(r => r.json()
).then(obj => {
    let v = obj.info.version;
    content = document.querySelector('.prose');
    content.innerHTML = content.innerHTML.replaceAll("{GRADIO_VERSION}", v);
});
</script>

您可以在 <a href="https://www.gradio.app">Gradio 首页 </a> 上查看 Web 组件的示例。

您还可以使用传递给 `<gradio-app>` 标签的属性来自定义 Web 组件的外观和行为：

- `src`：如前所述，`src` 属性链接到您想要嵌入的托管 Gradio 演示的 URL
- `space`：一个可选的缩写，如果您的 Gradio 演示托管在 Hugging Face Space 上。接受 `username/space_name` 而不是完整的 URL。示例：`gradio/Echocardiogram-Segmentation`。如果提供了此属性，则不需要提供 `src`。
- `control_page_title`：一个布尔值，指定是否将 html 标题设置为 Gradio 应用的标题（默认为 `"false"`）
- `initial_height`：加载 Gradio 应用时 Web 组件的初始高度（默认为 `"300px"`）。请注意，最终高度是根据 Gradio 应用的大小设置的。
- `container`：是否显示边框框架和有关 Space 托管位置的信息（默认为 `"true"`）
- `info`：是否仅显示有关 Space 托管位置的信息在嵌入的应用程序下方（默认为 `"true"`）
- `autoscroll`：在预测完成后是否自动滚动到输出（默认为 `"false"`）
- `eager`：在页面加载时是否立即加载 Gradio 应用（默认为 `"false"`）
- `theme_mode`：是否使用 `dark`，`light` 或默认的 `system` 主题模式（默认为 `"system"`）

以下是使用这些属性创建一个懒加载且初始高度为 0px 的 Gradio 应用的示例。

```html
&lt;gradio-app space="gradio/Echocardiogram-Segmentation" eager="true"
initial_height="0px">&lt;/gradio-app>
```

_ 注意：Gradio 的 CSS 永远不会影响嵌入页面，但嵌入页面可以影响嵌入的 Gradio 应用的样式。请确保父页面中的任何 CSS 不是如此通用，以至于它也可能适用于嵌入的 Gradio 应用并导致样式破裂。例如，元素选择器如 `header { ... }` 和 `footer { ... }` 最可能引起问题。_

### 使用 IFrames 嵌入

如果您无法向网站添加 javascript（例如），则可以改为使用 IFrames 进行嵌入，请添加以下元素：

```html
&lt;iframe src="https://$your_space_host.hf.space">&lt;/iframe>
```

同样，您可以在“嵌入此空间”按钮中找到您的 Space 的嵌入 URL 的 `src=` 属性。

注意：如果您使用 IFrames，您可能希望添加一个固定的 `height` 属性，并设置 `style="border:0;"` 以去除边框。此外，如果您的应用程序需要诸如访问摄像头或麦克风之类的权限，您还需要使用 `allow` 属性提供它们。

## API 页面

$demo_hello_world

如果您点击并打开上面的空间，您会在应用的页脚看到一个“通过 API 使用”链接。

![通过 API 使用](/assets/guides/use_via_api.png)

这是一个文档页面，记录了用户可以使用的 REST API 来查询“Interface”函数。`Blocks` 应用程序也可以生成 API 页面，但必须为每个事件监听器显式命名 API，例如：

```python
btn.click(add, [num1, num2], output, api_name="addition")
```

这将记录自动生成的 API 页面的端点 `/api/addition/`。

_注意_：对于启用了[队列功能](https://gradio.app/key-features#queuing)的 Gradio 应用程序，如果用户向您的 API 端点发出 POST 请求，他们可以绕过队列。要禁用此行为，请在 `queue()` 方法中设置 `api_open=False`。

## 鉴权

您可能希望在您的应用程序前面放置一个鉴权页面，以限制谁可以打开您的应用程序。使用 `launch()` 方法中的 `auth=` 关键字参数，您可以提供一个包含用户名和密码的元组，或者一个可接受的用户名 / 密码元组列表；以下是一个为单个名为“admin”的用户提供基于密码的身份验证的示例：

```python
demo.launch(auth=("admin", "pass1234"))
```

对于更复杂的身份验证处理，您甚至可以传递一个以用户名和密码作为参数的函数，并返回 True 以允许身份验证，否则返回 False。这可用于访问第三方身份验证服务等其他功能。

以下是一个接受任何用户名和密码相同的登录的函数示例：

```python
def same_auth(username, password):
    return username == password
demo.launch(auth=same_auth)
```

为了使身份验证正常工作，必须在浏览器中启用第三方 Cookie。
默认情况下，Safari、Chrome 隐私模式不会启用此功能。

## 直接访问网络请求

当用户向您的应用程序进行预测时，您可能需要底层的网络请求，以获取请求标头（例如用于高级身份验证）、记录客户端的 IP 地址或其他原因。Gradio 支持与 FastAPI 类似的方式：只需添加一个类型提示为 `gr.Request` 的函数参数，Gradio 将将网络请求作为该参数传递进来。以下是一个示例：

```python
import gradio as gr

def echo(name, request: gr.Request):
    if request:
        print("Request headers dictionary:", request.headers)
        print("IP address:", request.client.host)
    return name

io = gr.Interface(echo, "textbox", "textbox").launch()
```

注意：如果直接调用函数而不是通过 UI（例如在缓存示例时），则 `request` 将为 `None`。您应该明确处理此情况，以确保您的应用程序不会抛出任何错误。这就是为什么我们有显式检查 `if request`。

## 嵌入到另一个 FastAPI 应用程序中

在某些情况下，您可能已经有一个现有的 FastAPI 应用程序，并且您想要为 Gradio 演示添加一个路径。
您可以使用 `gradio.mount_gradio_app()` 来轻松实现此目的。

以下是一个完整的示例：

$code_custom_path

请注意，此方法还允许您在自定义路径上运行 Gradio 应用程序（例如上面的 `http://localhost:8000/gradio`）。

## 安全性和文件访问

与他人共享 Gradio 应用程序（通过 Spaces、您自己的服务器或临时共享链接进行托管）将主机机器上的某些文件**暴露**给您的 Gradio 应用程序的用户。

特别是，Gradio 应用程序允许用户访问以下三类文件：

- **与 Gradio 脚本所在目录（或子目录）中的文件相同。** 例如，如果您的 Gradio 脚本的路径是 `/home/usr/scripts/project/app.py`，并且您从 `/home/usr/scripts/project/` 启动它，则共享 Gradio 应用程序的用户将能够访问 `/home/usr/scripts/project/` 中的任何文件。这样做是为了您可以在 Gradio 应用程序中轻松引用这些文件（例如应用程序的“示例”）。

- **Gradio 创建的临时文件。** 这些是由 Gradio 作为运行您的预测函数的一部分创建的文件。例如，如果您的预测函数返回一个视频文件，则 Gradio 将该视频保存到临时文件中，然后将临时文件的路径发送到前端。您可以通过设置环境变量 `GRADIO_TEMP_DIR` 为绝对路径（例如 `/home/usr/scripts/project/temp/`）来自定义 Gradio 创建的临时文件的位置。

- **通过 `launch()` 中的 `allowed_paths` 参数允许的文件。** 此参数允许您传递一个包含其他目录或确切文件路径的列表，以允许用户访问它们。（默认情况下，此参数为空列表）。

Gradio**不允许**访问以下内容：

- **点文件**（其名称以 '.' 开头的任何文件）或其名称以 '.' 开头的任何目录中的任何文件。

- **通过 `launch()` 中的 `blocked_paths` 参数允许的文件。** 您可以将其他目录或确切文件路径的列表传递给 `launch()` 中的 `blocked_paths` 参数。此参数优先于 Gradio 默认或 `allowed_paths` 允许的文件。

- **主机机器上的任何其他路径**。用户不应能够访问主机上的其他任意路径。

请确保您正在运行最新版本的 `gradio`，以使这些安全设置生效。

---

<!-- Source: guides/cn/02_building-interfaces/03_more-on-examples.md -->
# 更多示例 (More on Examples)

本指南介绍了有关示例的更多内容：从目录中加载示例，提供部分示例和缓存。如果你对示例还不熟悉，请查看 [关键特性](../key-features/#example-inputs) 指南中的介绍。

## 提供示例 (Providing Examples)

正如 [关键特性](../key-features/#example-inputs) 指南中所介绍的，向接口添加示例就像提供一个列表的列表给 `examples` 关键字参数一样简单。
每个子列表都是一个数据样本，其中每个元素对应于预测函数的一个输入。
输入必须按照与预测函数期望的顺序排序。

如果你的接口只有一个输入组件，那么可以将示例提供为常规列表，而不是列表的列表。

### 从目录加载示例 (Loading Examples from a Directory)

你还可以指定一个包含示例的目录路径。如果你的接口只接受单个文件类型的输入（例如图像分类器），你只需将目录文件路径传递给 `examples=` 参数，`Interface` 将加载目录中的图像作为示例。
对于多个输入，该目录必须包含一个带有示例值的 log.csv 文件。
在计算器演示的上下文中，我们可以设置 `examples='/demo/calculator/examples'` ，在该目录中包含以下 `log.csv` 文件：
contain a log.csv file with the example values.
In the context of the calculator demo, we can set `examples='/demo/calculator/examples'` and in that directory we include the following `log.csv` file:

```csv
num,operation,num2
5,"add",3
4,"divide",2
5,"multiply",3
```

当浏览标记数据时，这将非常有用。只需指向标记目录，`Interface` 将从标记数据加载示例。

### 提供部分示例

有时你的应用程序有许多输入组件，但你只想为其中的一部分提供示例。为了在示例中排除某些输入，对于那些特定输入对应的所有数据样本都传递 `None`。

## 示例缓存 (Caching examples)

你可能希望为用户提供一些模型的缓存示例，以便他们可以快速尝试，以防您的模型运行时间较长。
如果 `cache_examples=True` ，当你调用 `launch()` 方法时，`Interface` 将运行所有示例，并保存输出。这些数据将保存在一个名为 `gradio_cached_examples` 的目录中。

每当用户点击示例时，输出将自动填充到应用程序中，使用来自该缓存目录的数据，而不是实际运行函数。这对于用户可以快速尝试您的模型而不增加任何负载是非常有用的！

请记住一旦生成了缓存，它将不会在以后的启动中更新。如果示例或函数逻辑发生更改，请删除缓存文件夹以清除缓存并使用另一个 `launch()` 重新构建它。

---

<!-- Source: guides/cn/03_building-with-blocks/03_state-in-blocks.md -->
# 分块状态 (State in Blocks)

我们已经介绍了[接口状态](https://gradio.app/interface-state)，这篇指南将介绍分块状态，它的工作原理大致相同。

## 全局状态 (Global State)

分块中的全局状态与接口中的全局状态相同。在函数调用外创建的任何变量都是在所有用户之间共享的引用。

## 会话状态 (Session State)

Gradio 在分块应用程序中同样支持会话**状态**，即在页面会话中跨多次提交保持的数据。需要再次强调，会话数据*不会*在模型的不同用户之间共享。要在会话状态中存储数据，需要完成以下三个步骤：

1. 创建一个 `gr.State()` 对象。如果此可状态对象有一个默认值，请将其传递给构造函数。
2. 在事件监听器中，将 `State` 对象作为输入和输出。
3. 在事件监听器函数中，将变量添加到输入参数和返回值中。

让我们来看一个猜词游戏的例子。

$code_hangman
$demo_hangman

让我们看看在这个游戏中如何完成上述的 3 个步骤：

1. 我们将已使用的字母存储在 `used_letters_var` 中。在 `State` 的构造函数中，将其初始值设置为空列表`[]`。
2. 在 `btn.click()` 中，我们在输入和输出中都引用了 `used_letters_var`。
3. 在 `guess_letter` 中，我们将此 `State` 的值传递给 `used_letters`，然后在返回语句中返回更新后的该 `State` 的值。

对于更复杂的应用程序，您可能会在一个单独的分块应用程序中使用许多存储会话状态的 `State` 变量。

在[文档](https://gradio.app/docs/state)中了解更多关于 `State` 的信息。

---

<!-- Source: guides/02_building-interfaces/04_reactive-interfaces.md -->
# Reactive Interfaces

Finally, we cover how to get Gradio demos to refresh automatically or continuously stream data.

## Live Interfaces

You can make interfaces automatically refresh by setting `live=True` in the interface. Now the interface will recalculate as soon as the user input changes.

$code_calculator_live
$demo_calculator_live

Note there is no submit button, because the interface resubmits automatically on change.

## Streaming Components

Some components have a "streaming" mode, such as `Audio` component in microphone mode, or the `Image` component in webcam mode. Streaming means data is sent continuously to the backend and the `Interface` function is continuously being rerun.

The difference between `gr.Audio(source='microphone')` and `gr.Audio(source='microphone', streaming=True)`, when both are used in `gr.Interface(live=True)`, is that the first `Component` will automatically submit data and run the `Interface` function when the user stops recording, whereas the second `Component` will continuously send data and run the `Interface` function _during_ recording.

Here is example code of streaming images from the webcam.

$code_stream_frames

Streaming can also be done in an output component. A `gr.Audio(streaming=True)` output component can take a stream of audio data yielded piece-wise by a generator function and combines them into a single audio file. For a detailed example, see our guide on performing [automatic speech recognition](/guides/real-time-speech-recognition) with Gradio.

---

<!-- Source: guides/03_building-with-blocks/04_dynamic-apps-with-render-decorator.md -->
# Dynamic Apps with the Render Decorator

The components and event listeners you define in a Blocks so far have been fixed - once the demo was launched, new components and listeners could not be added, and existing one could not be removed. 

The `@gr.render` decorator introduces the ability to dynamically change this. Let's take a look. 

## Dynamic Number of Components

In the example below, we will create a variable number of Textboxes. When the user edits the input Textbox, we create a Textbox for each letter in the input. Try it out below:

$code_render_split_simple
$demo_render_split_simple

See how we can now create a variable number of Textboxes using our custom logic - in this case, a simple `for` loop. The `@gr.render` decorator enables this with the following steps:

1. Create a function and attach the @gr.render decorator to it.
2. Add the input components to the `inputs=` argument of @gr.render, and create a corresponding argument in your function for each component. This function will automatically re-run on any change to a component.
3. Add all components inside the function that you want to render based on the inputs.

Now whenever the inputs change, the function re-runs, and replaces the components created from the previous function run with the latest run. Pretty straightforward! Let's add a little more complexity to this app:

$code_render_split
$demo_render_split

By default, `@gr.render` re-runs are triggered by the `.load` listener to the app and the `.change` listener to any input component provided. We can override this by explicitly setting the triggers in the decorator, as we have in this app to only trigger on `input_text.submit` instead. 
If you are setting custom triggers, and you also want an automatic render at the start of the app, make sure to add `demo.load` to your list of triggers.

## Dynamic Event Listeners

If you're creating components, you probably want to attach event listeners to them as well. Let's take a look at an example that takes in a variable number of Textbox as input, and merges all the text into a single box.

$code_render_merge_simple
$demo_render_merge_simple

Let's take a look at what's happening here:

1. The state variable `text_count` is keeping track of the number of Textboxes to create. By clicking on the Add button, we increase `text_count` which triggers the render decorator.
2. Note that in every single Textbox we create in the render function, we explicitly set a `key=` argument. This key allows us to preserve the value of this Component between re-renders. If you type in a value in a textbox, and then click the Add button, all the Textboxes re-render, but their values aren't cleared because the `key=` maintains the the value of a Component across a render.
3. We've stored the Textboxes created in a list, and provide this list as input to the merge button event listener. Note that **all event listeners that use Components created inside a render function must also be defined inside that render function**. The event listener can still reference Components outside the render function, as we do here by referencing `merge_btn` and `output` which are both defined outside the render function.

Just as with Components, whenever a function re-renders, the event listeners created from the previous render are cleared and the new event listeners from the latest run are attached. 

This allows us to create highly customizable and complex interactions! 

## Closer Look at `keys=` parameter

The `key=` argument is used to let Gradio know that the same component is being generated when your render function re-runs. This does two things:

1. The same element in the browser is re-used from the previous render for this Component. This gives browser performance gains - as there's no need to destroy and rebuild a component on a render - and preserves any browser attributes that the Component may have had. If your Component is nested within layout items like `gr.Row`, make sure they are keyed as well because the keys of the parents must also match.
2. Properties that may be changed by the user or by other event listeners are preserved. By default, only the "value" of Component is preserved, but you can specify any list of properties to preserve using the `preserved_by_key=` kwarg.

See the example below:

$code_render_preserve_key
$demo_render_preserve_key

You'll see in this example, when you change the `number_of_boxes` slider, there's a new re-render to update the number of box rows. If you click the "Change Label" buttons, they change the `label` and `info` properties of the corresponding textbox. You can also enter text in any textbox to change its value. If you change number of boxes after this, the re-renders "reset" the `info`, but the `label` and any entered `value` is still preserved.

Note you can also key any event listener, e.g. `button.click(key=...)` if the same listener is being recreated with the same inputs and outputs across renders. This gives performance benefits, and also prevents errors from occurring if an event was triggered in a previous render, then a re-render occurs, and then the previous event finishes processing. By keying your listener, Gradio knows where to send the data properly. 

## Putting it Together

Let's look at two examples that use all the features above. First, try out the to-do list app below: 

$code_todo_list
$demo_todo_list

Note that almost the entire app is inside a single `gr.render` that reacts to the tasks `gr.State` variable. This variable is a nested list, which presents some complexity. If you design a `gr.render` to react to a list or dict structure, ensure you do the following:

1. Any event listener that modifies a state variable in a manner that should trigger a re-render must set the state variable as an output. This lets Gradio know to check if the variable has changed behind the scenes. 
2. In a `gr.render`, if a variable in a loop is used inside an event listener function, that variable should be "frozen" via setting it to itself as a default argument in the function header. See how we have `task=task` in both `mark_done` and `delete`. This freezes the variable to its "loop-time" value.

Let's take a look at one last example that uses everything we learned. Below is an audio mixer. Provide multiple audio tracks and mix them together.

$code_audio_mixer
$demo_audio_mixer

Two things to note in this app:
1. Here we provide `key=` to all the components! We need to do this so that if we add another track after setting the values for an existing track, our input values to the existing track do not get reset on re-render.
2. When there are lots of components of different types and arbitrary counts passed to an event listener, it is easier to use the set and dictionary notation for inputs rather than list notation. Above, we make one large set of all the input `gr.Audio` and `gr.Slider` components when we pass the inputs to the `merge` function. In the function body we query the component values as a dict.

The `gr.render` expands gradio capabilities extensively - see what you can make out of it!

---

<!-- Source: guides/04_additional-features/04_alerts.md -->
# Alerts

You may wish to display alerts to the user. To do so, raise a `gr.Error("custom message")` in your function to halt the execution of your function and display an error message to the user.

You can also issue `gr.Warning("custom message")` or `gr.Info("custom message")` by having them as standalone lines in your function, which will immediately display modals while continuing the execution of your function. The only difference between `gr.Info()` and `gr.Warning()` is the color of the alert. 

```python
def start_process(name):
    gr.Info("Starting process")
    if name is None:
        gr.Warning("Name is empty")
    ...
    if success == False:
        raise gr.Error("Process failed")
```

Tip: Note that `gr.Error()` is an exception that has to be raised, while `gr.Warning()` and `gr.Info()` are functions that are called directly.

---

<!-- Source: guides/05_chatbots/04_creating-a-custom-chatbot-with-blocks.md -->
# How to Create a Custom Chatbot with Gradio Blocks

Tags: NLP, TEXT, CHAT
Related spaces: https://huggingface.co/spaces/gradio/chatbot_streaming, https://huggingface.co/spaces/project-baize/Baize-7B,

## Introduction

**Important Note**: if you are getting started, we recommend using the `gr.ChatInterface` to create chatbots -- its a high-level abstraction that makes it possible to create beautiful chatbot applications fast, often with a single line of code. [Read more about it here](/guides/creating-a-chatbot-fast).

This tutorial will show how to make chatbot UIs from scratch with Gradio's low-level Blocks API. This will give you full control over your Chatbot UI. You'll start by first creating a a simple chatbot to display text, a second one to stream text responses, and finally a chatbot that can handle media files as well. The chatbot interface that we create will look something like this:

$demo_chatbot_streaming

**Prerequisite**: We'll be using the `gradio.Blocks` class to build our Chatbot demo.
You can [read the Guide to Blocks first](https://gradio.app/blocks-and-event-listeners) if you are not already familiar with it. Also please make sure you are using the **latest version** version of Gradio: `pip install --upgrade gradio`.

## A Simple Chatbot Demo

Let's start with recreating the simple demo above. As you may have noticed, our bot simply randomly responds "How are you?", "Today is a great day", or "I'm very hungry" to any input. Here's the code to create this with Gradio:

$code_chatbot_simple

There are three Gradio components here:

- A `Chatbot`, whose value stores the entire history of the conversation, as a list of response pairs between the user and bot.
- A `Textbox` where the user can type their message, and then hit enter/submit to trigger the chatbot response
- A `ClearButton` button to clear the Textbox and entire Chatbot history

We have a single function, `respond()`, which takes in the entire history of the chatbot, appends a random message, waits 1 second, and then returns the updated chat history. The `respond()` function also clears the textbox when it returns.

Of course, in practice, you would replace `respond()` with your own more complex function, which might call a pretrained model or an API, to generate a response.

$demo_chatbot_simple

Tip: For better type hinting and auto-completion in your IDE, you can use the `gr.ChatMessage` dataclass:

```python
from gradio import ChatMessage

def chat_function(message, history):
    history.append(ChatMessage(role="user", content=message))
    history.append(ChatMessage(role="assistant", content="Hello, how can I help you?"))
    return history
```

## Add Streaming to your Chatbot

There are several ways we can improve the user experience of the chatbot above. First, we can stream responses so the user doesn't have to wait as long for a message to be generated. Second, we can have the user message appear immediately in the chat history, while the chatbot's response is being generated. Here's the code to achieve that:

$code_chatbot_streaming

You'll notice that when a user submits their message, we now _chain_ two event events with `.then()`:

1. The first method `user()` updates the chatbot with the user message and clears the input field. Because we want this to happen instantly, we set `queue=False`, which would skip any queue had it been enabled. The chatbot's history is appended with `{"role": "user", "content": user_message}`.

2. The second method, `bot()` updates the chatbot history with the bot's response. Finally, we construct the message character by character and `yield` the intermediate outputs as they are being constructed. Gradio automatically turns any function with the `yield` keyword [into a streaming output interface](/guides/key-features/#iterative-outputs).


Of course, in practice, you would replace `bot()` with your own more complex function, which might call a pretrained model or an API, to generate a response.


## Adding Markdown, Images, Audio, or Videos

The `gr.Chatbot` component supports a subset of markdown including bold, italics, and code. For example, we could write a function that responds to a user's message, with a bold **That's cool!**, like this:

```py
def bot(history):
    response = {"role": "assistant", "content": "**That's cool!**"}
    history.append(response)
    return history
```

In addition, it can handle media files, such as images, audio, and video. You can use the `MultimodalTextbox` component to easily upload all types of media files to your chatbot. You can customize the `MultimodalTextbox` further by passing in the `sources` parameter, which is a list of sources to enable. To pass in a media file, we must pass in the file a dictionary with a `path` key pointing to a local file and an `alt_text` key. The `alt_text` is optional, so you can also just pass in a tuple with a single element `{"path": "filepath"}`, like this:

```python
def add_message(history, message):
    for x in message["files"]:
        history.append({"role": "user", "content": {"path": x}})
    if message["text"] is not None:
        history.append({"role": "user", "content": message["text"]})
    return history, gr.MultimodalTextbox(value=None, interactive=False, file_types=["image"], sources=["upload", "microphone"])
```

Putting this together, we can create a _multimodal_ chatbot with a multimodal textbox for a user to submit text and media files. The rest of the code looks pretty much the same as before:

$code_chatbot_multimodal
$demo_chatbot_multimodal

And you're done! That's all the code you need to build an interface for your chatbot model. Finally, we'll end our Guide with some links to Chatbots that are running on Spaces so that you can get an idea of what else is possible:

- [project-baize/Baize-7B](https://huggingface.co/spaces/project-baize/Baize-7B): A stylized chatbot that allows you to stop generation as well as regenerate responses.
- [MAGAer13/mPLUG-Owl](https://huggingface.co/spaces/MAGAer13/mPLUG-Owl): A multimodal chatbot that allows you to upvote and downvote responses.

---

<!-- Source: guides/06_data-science-and-plots/04_connecting-to-a-database.md -->
# Connecting to a Database

The data you wish to visualize may be stored in a database. Let's use SQLAlchemy to quickly extract database content into pandas Dataframe format so we can use it in gradio.

First install `pip install sqlalchemy` and then let's see some examples.

## SQLite

```python
from sqlalchemy import create_engine
import pandas as pd

engine = create_engine('sqlite:///your_database.db')

with gr.Blocks() as demo:
    gr.LinePlot(pd.read_sql_query("SELECT time, price from flight_info;", engine), x="time", y="price")
```

Let's see a a more interactive plot involving filters that modify your SQL query:

```python
from sqlalchemy import create_engine
import pandas as pd

engine = create_engine('sqlite:///your_database.db')

with gr.Blocks() as demo:
    origin = gr.Dropdown(["DFW", "DAL", "HOU"], value="DFW", label="Origin")

    gr.LinePlot(lambda origin: pd.read_sql_query(f"SELECT time, price from flight_info WHERE origin = {origin};", engine), inputs=origin, x="time", y="price")
```

## Postgres, mySQL, and other databases

If you're using a different database format, all you have to do is swap out the engine, e.g.

```python
engine = create_engine('postgresql://username:password@host:port/database_name')
```

```python
engine = create_engine('mysql://username:password@host:port/database_name')
```

```python
engine = create_engine('oracle://username:password@host:port/database_name')
```

---

<!-- Source: guides/07_streaming/04_conversational-chatbot.md -->
# Building Conversational Chatbots with Gradio

Tags: AUDIO, STREAMING, CHATBOTS

## Introduction

The next generation of AI user interfaces is moving towards audio-native experiences. Users will be able to speak to chatbots and receive spoken responses in return. Several models have been built under this paradigm, including GPT-4o and [mini omni](https://github.com/gpt-omni/mini-omni).

In this guide, we'll walk you through building your own conversational chat application using mini omni as an example. You can see a demo of the finished app below:

<video src="https://github.com/user-attachments/assets/db36f4db-7535-49f1-a2dd-bd36c487ebdf" controls
height="600" width="600" style="display: block; margin: auto;" autoplay="true" loop="true">
</video>

## Application Overview

Our application will enable the following user experience:

1. Users click a button to start recording their message
2. The app detects when the user has finished speaking and stops recording
3. The user's audio is passed to the omni model, which streams back a response
4. After omni mini finishes speaking, the user's microphone is reactivated
5. All previous spoken audio, from both the user and omni, is displayed in a chatbot component

Let's dive into the implementation details.

## Processing User Audio

We'll stream the user's audio from their microphone to the server and determine if the user has stopped speaking on each new chunk of audio.

Here's our `process_audio` function:

```python
import numpy as np
from utils import determine_pause

def process_audio(audio: tuple, state: AppState):
    if state.stream is None:
        state.stream = audio[1]
        state.sampling_rate = audio[0]
    else:
        state.stream = np.concatenate((state.stream, audio[1]))

    pause_detected = determine_pause(state.stream, state.sampling_rate, state)
    state.pause_detected = pause_detected

    if state.pause_detected and state.started_talking:
        return gr.Audio(recording=False), state
    return None, state
```

This function takes two inputs:
1. The current audio chunk (a tuple of `(sampling_rate, numpy array of audio)`)
2. The current application state

We'll use the following `AppState` dataclass to manage our application state:

```python
from dataclasses import dataclass

@dataclass
class AppState:
    stream: np.ndarray | None = None
    sampling_rate: int = 0
    pause_detected: bool = False
    stopped: bool = False
    conversation: list = []
```

The function concatenates new audio chunks to the existing stream and checks if the user has stopped speaking. If a pause is detected, it returns an update to stop recording. Otherwise, it returns `None` to indicate no changes.

The implementation of the `determine_pause` function is specific to the omni-mini project and can be found [here](https://huggingface.co/spaces/gradio/omni-mini/blob/eb027808c7bfe5179b46d9352e3fa1813a45f7c3/app.py#L98).

## Generating the Response

After processing the user's audio, we need to generate and stream the chatbot's response. Here's our `response` function:

```python
import io
import tempfile
from pydub import AudioSegment

def response(state: AppState):
    if not state.pause_detected and not state.started_talking:
        return None, AppState()
    
    audio_buffer = io.BytesIO()

    segment = AudioSegment(
        state.stream.tobytes(),
        frame_rate=state.sampling_rate,
        sample_width=state.stream.dtype.itemsize,
        channels=(1 if len(state.stream.shape) == 1 else state.stream.shape[1]),
    )
    segment.export(audio_buffer, format="wav")

    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as f:
        f.write(audio_buffer.getvalue())
    
    state.conversation.append({"role": "user",
                                "content": {"path": f.name,
                                "mime_type": "audio/wav"}})
    
    output_buffer = b""

    for mp3_bytes in speaking(audio_buffer.getvalue()):
        output_buffer += mp3_bytes
        yield mp3_bytes, state

    with tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as f:
        f.write(output_buffer)
    
    state.conversation.append({"role": "assistant",
                    "content": {"path": f.name,
                                "mime_type": "audio/mp3"}})
    yield None, AppState(conversation=state.conversation)
```

This function:
1. Converts the user's audio to a WAV file
2. Adds the user's message to the conversation history
3. Generates and streams the chatbot's response using the `speaking` function
4. Saves the chatbot's response as an MP3 file
5. Adds the chatbot's response to the conversation history

Note: The implementation of the `speaking` function is specific to the omni-mini project and can be found [here](https://huggingface.co/spaces/gradio/omni-mini/blob/main/app.py#L116).

## Building the Gradio App

Now let's put it all together using Gradio's Blocks API:

```python
import gradio as gr

def start_recording_user(state: AppState):
    if not state.stopped:
        return gr.Audio(recording=True)

with gr.Blocks() as demo:
    with gr.Row():
        with gr.Column():
            input_audio = gr.Audio(
                label="Input Audio", sources="microphone", type="numpy"
            )
        with gr.Column():
            chatbot = gr.Chatbot(label="Conversation")
            output_audio = gr.Audio(label="Output Audio", streaming=True, autoplay=True)
    state = gr.State(value=AppState())

    stream = input_audio.stream(
        process_audio,
        [input_audio, state],
        [input_audio, state],
        stream_every=0.5,
        time_limit=30,
    )
    respond = input_audio.stop_recording(
        response,
        [state],
        [output_audio, state]
    )
    respond.then(lambda s: s.conversation, [state], [chatbot])

    restart = output_audio.stop(
        start_recording_user,
        [state],
        [input_audio]
    )
    cancel = gr.Button("Stop Conversation", variant="stop")
    cancel.click(lambda: (AppState(stopped=True), gr.Audio(recording=False)), None,
                [state, input_audio], cancels=[respond, restart])

if __name__ == "__main__":
    demo.launch()
```

This setup creates a user interface with:
- An input audio component for recording user messages
- A chatbot component to display the conversation history
- An output audio component for the chatbot's responses
- A button to stop and reset the conversation

The app streams user audio in 0.5-second chunks, processes it, generates responses, and updates the conversation history accordingly.

## Conclusion

This guide demonstrates how to build a conversational chatbot application using Gradio and the mini omni model. You can adapt this framework to create various audio-based chatbot demos. To see the full application in action, visit the Hugging Face Spaces demo: https://huggingface.co/spaces/gradio/omni-mini

Feel free to experiment with different models, audio processing techniques, or user interface designs to create your own unique conversational AI experiences!

---

<!-- Source: guides/08_custom-components/04_backend.md -->
# The Backend 🐍

This guide will cover everything you need to know to implement your custom component's backend processing.

## Which Class to Inherit From

All components inherit from one of three classes `Component`, `FormComponent`, or `BlockContext`.
You need to inherit from one so that your component behaves like all other gradio components.
When you start from a template with `gradio cc create --template`, you don't need to worry about which one to choose since the template uses the correct one. 
For completeness, and in the event that you need to make your own component from scratch, we explain what each class is for.

* `FormComponent`: Use this when you want your component to be grouped together in the same `Form` layout with other `FormComponents`. The `Slider`, `Textbox`, and `Number` components are all `FormComponents`.
* `BlockContext`: Use this when you want to place other components "inside" your component. This enabled `with MyComponent() as component:` syntax.
* `Component`: Use this for all other cases.

Tip: If your component supports streaming output, inherit from the `StreamingOutput` class.

Tip: If you inherit from `BlockContext`, you also need to set the metaclass to be `ComponentMeta`. See example below.

```python
from gradio.blocks import BlockContext
from gradio.component_meta import ComponentMeta




@document()
class Row(BlockContext, metaclass=ComponentMeta):
    pass
```

## The methods you need to implement

When you inherit from any of these classes, the following methods must be implemented.
Otherwise the Python interpreter will raise an error when you instantiate your component!

### `preprocess` and `postprocess`

Explained in the [Key Concepts](./key-component-concepts#the-value-and-how-it-is-preprocessed-postprocessed) guide. 
They handle the conversion from the data sent by the frontend to the format expected by the python function.

```python
    def preprocess(self, x: Any) -> Any:
        """
        Convert from the web-friendly (typically JSON) value in the frontend to the format expected by the python function.
        """
        return x

    def postprocess(self, y):
        """
        Convert from the data returned by the python function to the web-friendly (typically JSON) value expected by the frontend.
        """
        return y
```

### `process_example`

Takes in the original Python value and returns the modified value that should be displayed in the examples preview in the app. 
If not provided, the `.postprocess()` method is used instead. Let's look at the following example from the `SimpleDropdown` component.

```python
def process_example(self, input_data):
    return next((c[0] for c in self.choices if c[1] == input_data), None)
```

Since `self.choices` is a list of tuples corresponding to (`display_name`, `value`), this converts the value that a user provides to the display value (or if the value is not present in `self.choices`, it is converted to `None`).


### `api_info`

A JSON-schema representation of the value that the `preprocess` expects. 
This powers api usage via the gradio clients. 
You do **not** need to implement this yourself if you components specifies a `data_model`. 
The `data_model` in the following section.

```python
def api_info(self) -> dict[str, list[str]]:
    """
    A JSON-schema representation of the value that the `preprocess` expects and the `postprocess` returns.
    """
    pass
```

### `example_payload`

An example payload for your component, e.g. something that can be passed into the `.preprocess()` method
of your component. The example input is displayed in the `View API` page of a Gradio app that uses your custom component. 
Must be JSON-serializable. If your component expects a file, it is best to use a publicly accessible URL.

```python
def example_payload(self) -> Any:
    """
    The example inputs for this component for API usage. Must be JSON-serializable.
    """
    pass
```

### `example_value`

An example value for your component, e.g. something that can be passed into the `.postprocess()` method
of your component. This is used as the example value in the default app that is created in custom component development.

```python
def example_payload(self) -> Any:
    """
    The example inputs for this component for API usage. Must be JSON-serializable.
    """
    pass
```

### `flag`

Write the component's value to a format that can be stored in the `csv` or `json` file used for flagging.
You do **not** need to implement this yourself if you components specifies a `data_model`. 
The `data_model` in the following section.

```python
def flag(self, x: Any | GradioDataModel, flag_dir: str | Path = "") -> str:
    pass
```

### `read_from_flag`
Convert from the format stored in the `csv` or `json` file used for flagging to the component's python `value`.
You do **not** need to implement this yourself if you components specifies a `data_model`. 
The `data_model` in the following section.

```python
def read_from_flag(
    self,
    x: Any,
) -> GradioDataModel | Any:
    """
    Convert the data from the csv or jsonl file into the component state.
    """
    return x
```

## The `data_model`

The `data_model` is how you define the expected data format your component's value will be stored in the frontend.
It specifies the data format your `preprocess` method expects and the format the `postprocess` method returns.
It is not necessary to define a `data_model` for your component but it greatly simplifies the process of creating a custom component.
If you define a custom component you only need to implement four methods - `preprocess`, `postprocess`, `example_payload`, and `example_value`!

You define a `data_model` by defining a [pydantic model](https://docs.pydantic.dev/latest/concepts/models/#basic-model-usage) that inherits from either `GradioModel` or `GradioRootModel`.

This is best explained with an example. Let's look at the core `Video` component, which stores the video data as a JSON object with two keys `video` and `subtitles` which point to separate files.

```python
from gradio.data_classes import FileData, GradioModel

class VideoData(GradioModel):
    video: FileData
    subtitles: Optional[FileData] = None

class Video(Component):
    data_model = VideoData
```

By adding these four lines of code, your component automatically implements the methods needed for API usage, the flagging methods, and example caching methods!
It also has the added benefit of self-documenting your code.
Anyone who reads your component code will know exactly the data it expects.

Tip: If your component expects files to be uploaded from the frontend, your must use the `FileData` model! It will be explained in the following section. 

Tip: Read the pydantic docs [here](https://docs.pydantic.dev/latest/concepts/models/#basic-model-usage).

The difference between a `GradioModel` and a `GradioRootModel` is that the `RootModel` will not serialize the data to a dictionary.
For example, the `Names` model will serialize the data to `{'names': ['freddy', 'pete']}` whereas the `NamesRoot` model will serialize it to `['freddy', 'pete']`.

```python
from typing import List

class Names(GradioModel):
    names: List[str]

class NamesRoot(GradioRootModel):
    root: List[str]
```

Even if your component does not expect a "complex" JSON data structure it can be beneficial to define a `GradioRootModel` so that you don't have to worry about implementing the API and flagging methods.

Tip: Use classes from the Python typing library to type your models. e.g. `List` instead of `list`.

## Handling Files

If your component expects uploaded files as input, or returns saved files to the frontend, you **MUST** use the `FileData` to type the files in your `data_model`.

When you use the `FileData`:

* Gradio knows that it should allow serving this file to the frontend. Gradio automatically blocks requests to serve arbitrary files in the computer running the server.

* Gradio will automatically place the file in a cache so that duplicate copies of the file don't get saved.

* The client libraries will automatically know that they should upload input files prior to sending the request. They will also automatically download files.

If you do not use the `FileData`, your component will not work as expected!


## Adding Event Triggers To Your Component

The events triggers for your component are defined in the `EVENTS` class attribute.
This is a list that contains the string names of the events.
Adding an event to this list will automatically add a method with that same name to your component!

You can import the `Events` enum from `gradio.events` to access commonly used events in the core gradio components.

For example, the following code will define `text_submit`, `file_upload` and `change` methods in the `MyComponent` class.

```python
from gradio.events import Events
from gradio.components import FormComponent

class MyComponent(FormComponent):

    EVENTS = [
        "text_submit",
        "file_upload",
        Events.change
    ]
```


Tip: Don't forget to also handle these events in the JavaScript code!

## Conclusion

---

<!-- Source: guides/09_gradio-clients-and-lite/04_gradio-and-llm-agents.md -->
# Gradio & LLM Agents 🤝

Large Language Models (LLMs) are very impressive but they can be made even more powerful if we could give them skills to accomplish specialized tasks.

The [gradio_tools](https://github.com/freddyaboulton/gradio-tools) library can turn any [Gradio](https://github.com/gradio-app/gradio) application into a [tool](https://python.langchain.com/en/latest/modules/agents/tools.html) that an [agent](https://docs.langchain.com/docs/components/agents/agent) can use to complete its task. For example, an LLM could use a Gradio tool to transcribe a voice recording it finds online and then summarize it for you. Or it could use a different Gradio tool to apply OCR to a document on your Google Drive and then answer questions about it.

This guide will show how you can use `gradio_tools` to grant your LLM Agent access to the cutting edge Gradio applications hosted in the world. Although `gradio_tools` are compatible with more than one agent framework, we will focus on [Langchain Agents](https://docs.langchain.com/docs/components/agents/) in this guide.

## Some background

### What are agents?

A [LangChain agent](https://docs.langchain.com/docs/components/agents/agent) is a Large Language Model (LLM) that takes user input and reports an output based on using one of many tools at its disposal.

### What is Gradio?

[Gradio](https://github.com/gradio-app/gradio) is the defacto standard framework for building Machine Learning Web Applications and sharing them with the world - all with just python! 🐍

## gradio_tools - An end-to-end example

To get started with `gradio_tools`, all you need to do is import and initialize your tools and pass them to the langchain agent!

In the following example, we import the `StableDiffusionPromptGeneratorTool` to create a good prompt for stable diffusion, the
`StableDiffusionTool` to create an image with our improved prompt, the `ImageCaptioningTool` to caption the generated image, and
the `TextToVideoTool` to create a video from a prompt.

We then tell our agent to create an image of a dog riding a skateboard, but to please improve our prompt ahead of time. We also ask
it to caption the generated image and create a video for it. The agent can decide which tool to use without us explicitly telling it.

```python
import os

if not os.getenv("OPENAI_API_KEY"):
    raise ValueError("OPENAI_API_KEY must be set")

from langchain.agents import initialize_agent
from langchain.llms import OpenAI
from gradio_tools import (StableDiffusionTool, ImageCaptioningTool, StableDiffusionPromptGeneratorTool,
                          TextToVideoTool)

from langchain.memory import ConversationBufferMemory

llm = OpenAI(temperature=0)
memory = ConversationBufferMemory(memory_key="chat_history")
tools = [StableDiffusionTool().langchain, ImageCaptioningTool().langchain,
         StableDiffusionPromptGeneratorTool().langchain, TextToVideoTool().langchain]


agent = initialize_agent(tools, llm, memory=memory, agent="conversational-react-description", verbose=True)
output = agent.run(input=("Please create a photo of a dog riding a skateboard "
                          "but improve my prompt prior to using an image generator."
                          "Please caption the generated image and create a video for it using the improved prompt."))
```

You'll note that we are using some pre-built tools that come with `gradio_tools`. Please see this [doc](https://github.com/freddyaboulton/gradio-tools#gradio-tools-gradio--llm-agents) for a complete list of the tools that come with `gradio_tools`.
If you would like to use a tool that's not currently in `gradio_tools`, it is very easy to add your own. That's what the next section will cover.

## gradio_tools - creating your own tool

The core abstraction is the `GradioTool`, which lets you define a new tool for your LLM as long as you implement a standard interface:

```python
class GradioTool(BaseTool):

    def __init__(self, name: str, description: str, src: str) -> None:

    @abstractmethod
    def create_job(self, query: str) -> Job:
        pass

    @abstractmethod
    def postprocess(self, output: Tuple[Any] | Any) -> str:
        pass
```

The requirements are:

1. The name for your tool
2. The description for your tool. This is crucial! Agents decide which tool to use based on their description. Be precise and be sure to include example of what the input and the output of the tool should look like.
3. The url or space id, e.g. `freddyaboulton/calculator`, of the Gradio application. Based on this value, `gradio_tool` will create a [gradio client](https://github.com/gradio-app/gradio/blob/main/client/python/README.md) instance to query the upstream application via API. Be sure to click the link and learn more about the gradio client library if you are not familiar with it.
4. create_job - Given a string, this method should parse that string and return a job from the client. Most times, this is as simple as passing the string to the `submit` function of the client. More info on creating jobs [here](https://github.com/gradio-app/gradio/blob/main/client/python/README.md#making-a-prediction)
5. postprocess - Given the result of the job, convert it to a string the LLM can display to the user.
6. _Optional_ - Some libraries, e.g. [MiniChain](https://github.com/srush/MiniChain/tree/main), may need some info about the underlying gradio input and output types used by the tool. By default, this will return gr.Textbox() but
   if you'd like to provide more accurate info, implement the `_block_input(self, gr)` and `_block_output(self, gr)` methods of the tool. The `gr` variable is the gradio module (the result of `import gradio as gr`). It will be
   automatically imported by the `GradiTool` parent class and passed to the `_block_input` and `_block_output` methods.

And that's it!

Once you have created your tool, open a pull request to the `gradio_tools` repo! We welcome all contributions.

## Example tool - Stable Diffusion

Here is the code for the StableDiffusion tool as an example:

```python
from gradio_tool import GradioTool
import os

class StableDiffusionTool(GradioTool):
    """Tool for calling stable diffusion from llm"""

    def __init__(
        self,
        name="StableDiffusion",
        description=(
            "An image generator. Use this to generate images based on "
            "text input. Input should be a description of what the image should "
            "look like. The output will be a path to an image file."
        ),
        src="gradio-client-demos/stable-diffusion",
        token=None,
    ) -> None:
        super().__init__(name, description, src, token)

    def create_job(self, query: str) -> Job:
        return self.client.submit(query, "", 9, fn_index=1)

    def postprocess(self, output: str) -> str:
        return [os.path.join(output, i) for i in os.listdir(output) if not i.endswith("json")][0]

    def _block_input(self, gr) -> "gr.components.Component":
        return gr.Textbox()

    def _block_output(self, gr) -> "gr.components.Component":
        return gr.Image()
```

Some notes on this implementation:

1. All instances of `GradioTool` have an attribute called `client` that is a pointed to the underlying [gradio client](https://github.com/gradio-app/gradio/tree/main/client/python#gradio_client-use-a-gradio-app-as-an-api----in-3-lines-of-python). That is what you should use
   in the `create_job` method.
2. `create_job` just passes the query string to the `submit` function of the client with some other parameters hardcoded, i.e. the negative prompt string and the guidance scale. We could modify our tool to also accept these values from the input string in a subsequent version.
3. The `postprocess` method simply returns the first image from the gallery of images created by the stable diffusion space. We use the `os` module to get the full path of the image.

## Conclusion

You now know how to extend the abilities of your LLM with the 1000s of gradio spaces running in the wild!
Again, we welcome any contributions to the [gradio_tools](https://github.com/freddyaboulton/gradio-tools) library.
We're excited to see the tools you all build!

---

<!-- Source: guides/10_mcp/04_using-docs-mcp.md -->
# Using the Gradio Docs MCP Server

Tags: MCP, TOOL, LLM, SERVER, DOCS

In this guide, we will describe how to use the official Gradio Docs MCP Server.

### Prerequisites

You will need an LLM application that supports tool calling using the MCP protocol, such as Claude Desktop, Cursor, or Cline (these are known as "MCP Clients").

## Why an MCP Server?

If you're using LLMs in your workflow, adding this server will augment them with just the right context on gradio - which makes your experience a lot faster and smoother. 

<video src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/mcp-docs.mp4" style="width:100%" controls preload> </video>

The server is running on Spaces and was launched entirely using Gradio, you can see all the code [here](https://huggingface.co/spaces/gradio/docs-mcp). For more on building an mcp server with gradio, see the [previous guide](./building-an-mcp-client-with-gradio). 

## Installing in the Clients 

For clients that support streamable HTTP (e.g. Cursor, Windsurf, Cline), simply add the following configuration to your MCP config:

```json
{
  "mcpServers": {
    "gradio": {
      "url": "https://gradio-docs-mcp.hf.space/gradio_api/mcp/"
    }
  }
}
```

We've included step-by-step instructions for Cursor below, but you can consult the docs for Windsurf [here](https://docs.windsurf.com/windsurf/mcp), and Cline [here](https://docs.cline.bot/mcp-servers/configuring-mcp-servers) which are similar to set up. 



### Cursor 

1. Make sure you're using the latest version of Cursor, and go to Cursor > Settings > Cursor Settings > MCP 
2. Click on '+ Add new global MCP server' 
3. Copy paste this json into the file that opens and then save it. 
```json
{
  "mcpServers": {
    "gradio": {
      "url": "https://gradio-docs-mcp.hf.space/gradio_api/mcp/"
    }
  }
}
```
4. That's it! You should see the tools load and the status go green in the settings page. You may have to click the refresh icon or wait a few seconds. 

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/cursor-mcp.png)

### Claude Desktop

1. Since Claude Desktop only supports stdio, you will need to [install Node.js](https://nodejs.org/en/download/) to get this to work. 
2. Make sure you're using the latest version of Claude Desktop, and go to Claude > Settings > Developer > Edit Config 
3. Open the file with your favorite editor and copy paste this json, then save the file. 
```json
{
  "mcpServers": {
    "gradio": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://gradio-docs-mcp.hf.space/gradio_api/mcp/"
      ]
    }
  }
}
```
4. Quit and re-open Claude Desktop, and you should be good to go. You should see it loaded in the Search and Tools icon or on the developer settings page. 
 
![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/claude-desktop-mcp.gif)

## Tools 

There are currently only two tools in the server: `gradio_docs_mcp_load_gradio_docs` and `gradio_docs_mcp_search_gradio_docs`. 

1. `gradio_docs_mcp_load_gradio_docs`: This tool takes no arguments and will load an /llms.txt style summary of Gradio's latest, full documentation. Very useful context the LLM can parse before answering questions or generating code. 

2. `gradio_docs_mcp_search_gradio_docs`: This tool takes a query as an argument and will run embedding search on Gradio's docs, guides, and demos to return the most useful context for the LLM to parse.

---

<!-- Source: guides/cn/02_building-interfaces/04_four-kinds-of-interfaces.md -->
# Gradio 界面的 4 种类型

到目前为止，我们一直假设构建 Gradio 演示需要同时具备输入和输出。但对于机器学习演示来说，并不总是如此：例如，*无条件图像生成模型*不需要任何输入，但会生成一张图像作为输出。

事实证明，`gradio.Interface` 类实际上可以处理 4 种不同类型的演示：

1. **Standard demos 标准演示**：同时具有独立的输入和输出（例如图像分类器或语音转文本模型）
2. **Output-only demos 仅输出演示**：不接受任何输入，但会产生输出（例如无条件图像生成模型）
3. **Input-only demos 仅输入演示**：不产生任何输出，但会接受某种形式的输入（例如保存您上传到外部持久数据库的图像的演示）
4. **Unified demos 统一演示**：同时具有输入和输出组件，但这些组件是*相同的*。这意味着生成的输出将覆盖输入（例如文本自动完成模型）

根据演示类型的不同，用户界面（UI）会有略微不同的外观：

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/interfaces4.png)

我们来看一下如何使用 `Interface` 类构建每种类型的演示，以及示例：

## 标准演示 (Standard demos)

要创建具有输入和输出组件的演示，只需在 `Interface()` 中设置 `inputs` 和 `outputs` 参数的值。以下是一个简单图像滤镜的示例演示：

$code_sepia_filter
$demo_sepia_filter

## 仅输出演示 (Output-only demos)

那么仅包含输出的演示呢？为了构建这样的演示，只需将 `Interface()` 中的 `inputs` 参数值设置为 `None`。以下是模拟图像生成模型的示例演示：

$code_fake_gan_no_input
$demo_fake_gan_no_input

## 仅输入演示 (Input-only demos)

同样地，要创建仅包含输入的演示，将 `Interface()` 中的 `outputs` 参数值设置为 `None`。以下是将任何上传的图像保存到磁盘的示例演示：

$code_save_file_no_output
$demo_save_file_no_output

## 统一演示 (Unified demos)

这种演示将单个组件同时作为输入和输出。只需将 `Interface()` 中的 `inputs` 和 `outputs` 参数值设置为相同的组件即可创建此演示。以下是文本生成模型的示例演示：

$code_unified_demo_text_generation
$demo_unified_demo_text_generation

---

<!-- Source: guides/cn/03_building-with-blocks/04_custom-CSS-and-JS.md -->
# 自定义的 JS 和 CSS

本指南介绍了如何更灵活地为 Blocks 添加样式，并添加 JavaScript 代码到事件监听器中。

**警告**：在自定义的 JS 和 CSS 中使用查询选择器不能保证能在所有 Gradio 版本中正常工作，因为 Gradio 的 HTML DOM 可能会发生变化。我们建议谨慎使用查询选择器。

## 自定义的 CSS

Gradio 主题是自定义应用程序外观和感觉的最简单方式。您可以从各种主题中进行选择，或者创建自己的主题。要实现这一点，请将 `theme=` kwarg 传递给 `Blocks` 构造函数。例如：

```python
with gr.Blocks(theme=gr.themes.Glass()):
    ...
```

Gradio 自带一套预构建的主题，您可以从 `gr.themes.*` 中加载这些主题。您可以扩展这些主题，或者从头开始创建自己的主题 - 有关更多详细信息，请参阅[主题指南](/theming-guide)。

要增加附加的样式能力，您可以使用 `css=` kwarg 将任何 CSS 传递给您的应用程序。

Gradio 应用程序的基类是 `gradio-container`，因此下面是一个示例，用于更改 Gradio 应用程序的背景颜色：

```python
with gr.Blocks(css=".gradio-container {background-color: red}") as demo:
    ...
```

如果您想在您的 CSS 中引用外部文件，请使用 `"file="` 作为文件路径的前缀（可以是相对路径或绝对路径），例如：

```python
with gr.Blocks(css=".gradio-container {background: url('file=clouds.jpg')}") as demo:
    ...
```

您还可以将 CSS 文件的文件路径传递给 `css` 参数。

## `elem_id` 和 `elem_classes` 参数

您可以使用 `elem_id` 来为任何组件添加 HTML 元素 `id`，并使用 `elem_classes` 添加一个类或类列表。这将使您能够更轻松地使用 CSS 选择元素。这种方法更有可能在 Gradio 版本之间保持稳定，因为内置的类名或 id 可能会发生变化（但正如上面的警告中所提到的，如果您使用自定义 CSS，我们不能保证在 Gradio 版本之间完全兼容，因为 DOM 元素本身可能会发生变化）。

```python
css = """
#warning {background-color: #FFCCCB}
.feedback textarea {font-size: 24px !important}
"""

with gr.Blocks(css=css) as demo:
    box1 = gr.Textbox(value="Good Job", elem_classes="feedback")
    box2 = gr.Textbox(value="Failure", elem_id="warning", elem_classes="feedback")
```

CSS `#warning` 规则集仅针对第二个文本框，而 `.feedback` 规则集将同时作用于两个文本框。请注意，在针对类时，您可能需要使用 `!important` 选择器来覆盖默认的 Gradio 样式。

## 自定义的 JS

事件监听器具有 `_js` 参数，可以接受 JavaScript 函数作为字符串，并像 Python 事件监听器函数一样处理它。您可以传递 JavaScript 函数和 Python 函数（在这种情况下，先运行 JavaScript 函数），或者仅传递 JavaScript（并将 Python 的 `fn` 设置为 `None`）。请查看下面的代码：

$code_blocks_js_methods
$demo_blocks_js_methods

---

<!-- Source: guides/02_building-interfaces/05_four-kinds-of-interfaces.md -->
# The 4 Kinds of Gradio Interfaces

So far, we've always assumed that in order to build an Gradio demo, you need both inputs and outputs. But this isn't always the case for machine learning demos: for example, _unconditional image generation models_ don't take any input but produce an image as the output.

It turns out that the `gradio.Interface` class can actually handle 4 different kinds of demos:

1. **Standard demos**: which have both separate inputs and outputs (e.g. an image classifier or speech-to-text model)
2. **Output-only demos**: which don't take any input but produce on output (e.g. an unconditional image generation model)
3. **Input-only demos**: which don't produce any output but do take in some sort of input (e.g. a demo that saves images that you upload to a persistent external database)
4. **Unified demos**: which have both input and output components, but the input and output components _are the same_. This means that the output produced overrides the input (e.g. a text autocomplete model)

Depending on the kind of demo, the user interface (UI) looks slightly different:

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/interfaces4.png)

Let's see how to build each kind of demo using the `Interface` class, along with examples:

## Standard demos

To create a demo that has both the input and the output components, you simply need to set the values of the `inputs` and `outputs` parameter in `Interface()`. Here's an example demo of a simple image filter:

$code_sepia_filter
$demo_sepia_filter

## Output-only demos

What about demos that only contain outputs? In order to build such a demo, you simply set the value of the `inputs` parameter in `Interface()` to `None`. Here's an example demo of a mock image generation model:

$code_fake_gan_no_input
$demo_fake_gan_no_input

## Input-only demos

Similarly, to create a demo that only contains inputs, set the value of `outputs` parameter in `Interface()` to be `None`. Here's an example demo that saves any uploaded image to disk:

$code_save_file_no_output
$demo_save_file_no_output

## Unified demos

A demo that has a single component as both the input and the output. It can simply be created by setting the values of the `inputs` and `outputs` parameter as the same component. Here's an example demo of a text generation model:

$code_unified_demo_text_generation
$demo_unified_demo_text_generation

It may be the case that none of the 4 cases fulfill your exact needs. In this case, you need to use the `gr.Blocks()` approach!

---

<!-- Source: guides/04_additional-features/05_progress-bars.md -->
# Progress Bars

Gradio supports the ability to create custom Progress Bars so that you have customizability and control over the progress update that you show to the user. In order to enable this, simply add an argument to your method that has a default value of a `gr.Progress` instance. Then you can update the progress levels by calling this instance directly with a float between 0 and 1, or using the `tqdm()` method of the `Progress` instance to track progress over an iterable, as shown below.

$code_progress_simple
$demo_progress_simple

If you use the `tqdm` library, you can even report progress updates automatically from any `tqdm.tqdm` that already exists within your function by setting the default argument as `gr.Progress(track_tqdm=True)`!

---

<!-- Source: guides/05_chatbots/05_chatbot-specific-events.md -->
# Chatbot-Specific Events

Tags: LLM, CHAT

Users expect modern chatbot UIs to let them easily interact with individual chat messages: for example, users might want to retry message generations, undo messages, or click on a like/dislike button to upvote or downvote a generated message.

Thankfully, the Gradio Chatbot exposes several events, such as `.retry`, `.undo`, `.like`, and `.clear`, to let you build this functionality into your application. As an application developer, you can attach functions to any of these event, allowing you to run arbitrary Python functions e.g. when a user interacts with a message.

In this demo, we'll build a UI that implements these events. You can see our finished demo deployed on Hugging Face spaces here:

$demo_chatbot_retry_undo_like

Tip: `gr.ChatInterface` automatically uses the `retry` and `.undo` events so it's best to start there in order get a fully working application quickly.


## The UI

First, we'll build the UI without handling these events and build from there. 
We'll use the Hugging Face InferenceClient in order to get started without setting up
any API keys.

This is what the first draft of our application looks like:

```python
from huggingface_hub import InferenceClient
import gradio as gr

client = InferenceClient()

def respond(
    prompt: str,
    history,
):
    if not history:
        history = [{"role": "system", "content": "You are a friendly chatbot"}]
    history.append({"role": "user", "content": prompt})

    yield history

    response = {"role": "assistant", "content": ""}
    for message in client.chat_completion( # type: ignore
        history,
        temperature=0.95,
        top_p=0.9,
        max_tokens=512,
        stream=True,
        model="openai/gpt-oss-20b"
    ):
        response["content"] += message.choices[0].delta.content or "" if message.choices else ""
        yield history + [response]


with gr.Blocks() as demo:
    gr.Markdown("# Chat with GPT-OSS 20b 🤗")
    chatbot = gr.Chatbot(
        label="Agent",
        avatar_images=(
            None,
            "https://em-content.zobj.net/source/twitter/376/hugging-face_1f917.png",
        ),
    )
    prompt = gr.Textbox(max_lines=1, label="Chat Message")
    prompt.submit(respond, [prompt, chatbot], [chatbot])
    prompt.submit(lambda: "", None, [prompt])

if __name__ == "__main__":
    demo.launch()
```

## The Undo Event

Our undo event will populate the textbox with the previous user message and also remove all subsequent assistant responses.

In order to know the index of the last user message, we can pass `gr.UndoData` to our event handler function like so:

```python
def handle_undo(history, undo_data: gr.UndoData):
    return history[:undo_data.index], history[undo_data.index]['content'][0]["text"]
```

We then pass this function to the `undo` event!

```python
    chatbot.undo(handle_undo, chatbot, [chatbot, prompt])
```

You'll notice that every bot response will now have an "undo icon" you can use to undo the response - 

![undo_event](https://github.com/user-attachments/assets/180b5302-bc4a-4c3e-903c-f14ec2adcaa6)

Tip: You can also access the content of the user message with `undo_data.value`

## The Retry Event

The retry event will work similarly. We'll use `gr.RetryData` to get the index of the previous user message and remove all the subsequent messages from the history. Then we'll use the `respond` function to generate a new response. We could also get the previous prompt via the `value` property of `gr.RetryData`.

```python
def handle_retry(history, retry_data: gr.RetryData):
    new_history = history[:retry_data.index]
    previous_prompt = history[retry_data.index]['content'][0]["text"]
    yield from respond(previous_prompt, new_history)
...

chatbot.retry(handle_retry, chatbot, chatbot)
```

You'll see that the bot messages have a "retry" icon now -

![retry_event](https://github.com/user-attachments/assets/cec386a7-c4cd-4fb3-a2d7-78fd806ceac6)

Tip: The Hugging Face inference API caches responses, so in this demo, the retry button will not generate a new response.

## The Like Event

By now you should hopefully be seeing the pattern!
To let users like a message, we'll add a `.like` event to our chatbot.
We'll pass it a function that accepts a `gr.LikeData` object.
In this case, we'll just print the message that was either liked or disliked.

```python
def handle_like(data: gr.LikeData):
    if data.liked:
        print("You upvoted this response: ", data.value)
    else:
        print("You downvoted this response: ", data.value)

chatbot.like(handle_like, None, None)
```

## The Edit Event

Same idea with the edit listener! with `gr.Chatbot(editable=True)`, you can capture user edits. The `gr.EditData` object tells us the index of the message edited and the new text of the mssage. Below, we use this object to edit the history, and delete any subsequent messages. 

```python
def handle_edit(history, edit_data: gr.EditData):
    new_history = history[:edit_data.index]
    new_history[-1]['content'] = [{"text": edit_data.value, "type": "text"}]
    return new_history

...

chatbot.edit(handle_edit, chatbot, chatbot)
```

## The Clear Event

As a bonus, we'll also cover the `.clear()` event, which is triggered when the user clicks the clear icon to clear all messages. As a developer, you can attach additional events that should happen when this icon is clicked, e.g. to handle clearing of additional chatbot state:

```python
from uuid import uuid4
import gradio as gr


def clear():
    print("Cleared uuid")
    return uuid4()


def chat_fn(user_input, history, uuid):
    return f"{user_input} with uuid {uuid}"


with gr.Blocks() as demo:
    uuid_state = gr.State(
        uuid4
    )
    chatbot = gr.Chatbot()
    chatbot.clear(clear, outputs=[uuid_state])

    gr.ChatInterface(
        chat_fn,
        additional_inputs=[uuid_state],
        chatbot=chatbot,
    )

demo.launch()
```

In this example, the `clear` function, bound to the `chatbot.clear` event, returns a new UUID into our session state, when the chat history is cleared via the trash icon. This can be seen in the `chat_fn` function, which references the UUID saved in our session state.

This example also shows that you can use these events with `gr.ChatInterface` by passing in a custom `gr.Chatbot` object.

## Conclusion

That's it! You now know how you can implement the retry, undo, like, and clear events for the Chatbot.

---

<!-- Source: guides/07_streaming/05_real-time-speech-recognition.md -->
# Real Time Speech Recognition

Tags: ASR, SPEECH, STREAMING

## Introduction

Automatic speech recognition (ASR), the conversion of spoken speech to text, is a very important and thriving area of machine learning. ASR algorithms run on practically every smartphone, and are becoming increasingly embedded in professional workflows, such as digital assistants for nurses and doctors. Because ASR algorithms are designed to be used directly by customers and end users, it is important to validate that they are behaving as expected when confronted with a wide variety of speech patterns (different accents, pitches, and background audio conditions).

Using `gradio`, you can easily build a demo of your ASR model and share that with a testing team, or test it yourself by speaking through the microphone on your device.

This tutorial will show how to take a pretrained speech-to-text model and deploy it with a Gradio interface. We will start with a **_full-context_** model, in which the user speaks the entire audio before the prediction runs. Then we will adapt the demo to make it **_streaming_**, meaning that the audio model will convert speech as you speak. 

### Prerequisites

Make sure you have the `gradio` Python package already [installed](/getting_started). You will also need a pretrained speech recognition model. In this tutorial, we will build demos from 2 ASR libraries:

- Transformers (for this, `pip install torch transformers torchaudio`)

Make sure you have at least one of these installed so that you can follow along the tutorial. You will also need `ffmpeg` [installed on your system](https://www.ffmpeg.org/download.html), if you do not already have it, to process files from the microphone.

Here's how to build a real time speech recognition (ASR) app:

1. [Set up the Transformers ASR Model](#1-set-up-the-transformers-asr-model)
2. [Create a Full-Context ASR Demo with Transformers](#2-create-a-full-context-asr-demo-with-transformers)
3. [Create a Streaming ASR Demo with Transformers](#3-create-a-streaming-asr-demo-with-transformers)

## 1. Set up the Transformers ASR Model

First, you will need to have an ASR model that you have either trained yourself or you will need to download a pretrained model. In this tutorial, we will start by using a pretrained ASR model from the model, `whisper`.

Here is the code to load `whisper` from Hugging Face `transformers`.

```python
from transformers import pipeline

p = pipeline("automatic-speech-recognition", model="openai/whisper-base.en")
```

That's it!

## 2. Create a Full-Context ASR Demo with Transformers

We will start by creating a _full-context_ ASR demo, in which the user speaks the full audio before using the ASR model to run inference. This is very easy with Gradio -- we simply create a function around the `pipeline` object above.

We will use `gradio`'s built in `Audio` component, configured to take input from the user's microphone and return a filepath for the recorded audio. The output component will be a plain `Textbox`.

$code_asr
$demo_asr

The `transcribe` function takes a single parameter, `audio`, which is a numpy array of the audio the user recorded. The `pipeline` object expects this in float32 format, so we convert it first to float32, and then extract the transcribed text.

## 3. Create a Streaming ASR Demo with Transformers

To make this a *streaming* demo, we need to make these changes:

1. Set `streaming=True` in the `Audio` component
2. Set `live=True` in the `Interface`
3. Add a `state` to the interface to store the recorded audio of a user

Tip: You can also set `time_limit` and `stream_every` parameters in the interface. The `time_limit` caps the amount of time each user's stream can take. The default is 30 seconds so users won't be able to stream audio for more than 30 seconds. The `stream_every` parameter controls how frequently data is sent to your function. By default it is 0.5 seconds.

Take a look below.

$code_stream_asr

Notice that we now have a state variable because we need to track all the audio history. `transcribe` gets called whenever there is a new small chunk of audio, but we also need to keep track of all the audio spoken so far in the state. As the interface runs, the `transcribe` function gets called, with a record of all the previously spoken audio in the `stream` and the new chunk of audio as `new_chunk`. We return the new full audio to be stored back in its current state, and we also return the transcription. Here, we naively append the audio together and call the `transcriber` object on the entire audio. You can imagine more efficient ways of handling this, such as re-processing only the last 5 seconds of audio whenever a new chunk of audio is received. 

$demo_stream_asr

Now the ASR model will run inference as you speak!

---

<!-- Source: guides/08_custom-components/05_frontend.md -->
# The Frontend 🌐⭐️

This guide will cover everything you need to know to implement your custom component's frontend.

Tip: Gradio components use Svelte. Writing Svelte is fun! If you're not familiar with it, we recommend checking out their interactive [guide](https://learn.svelte.dev/tutorial/welcome-to-svelte).

## The directory structure 

The frontend code should have, at minimum, three files:

* `Index.svelte`: This is the main export and where your component's layout and logic should live.
* `Example.svelte`: This is where the example view of the component is defined.

Feel free to add additional files and subdirectories. 
If you want to export any additional modules, remember to modify the `package.json` file

```json
"exports": {
    ".": "./Index.svelte",
    "./example": "./Example.svelte",
    "./package.json": "./package.json"
},
```

## The Index.svelte file

Your component should expose the following props that will be passed down from the parent Gradio application.

```typescript
import type { LoadingStatus } from "@gradio/statustracker";
import type { Gradio } from "@gradio/utils";

export let gradio: Gradio<{
    event_1: never;
    event_2: never;
}>;

export let elem_id = "";
export let elem_classes: string[] = [];
export let scale: number | null = null;
export let min_width: number | undefined = undefined;
export let loading_status: LoadingStatus | undefined = undefined;
export let mode: "static" | "interactive";
```

* `elem_id` and `elem_classes` allow Gradio app developers to target your component with custom CSS and JavaScript from the Python `Blocks` class.

* `scale` and `min_width` allow Gradio app developers to control how much space your component takes up in the UI.

* `loading_status` is used to display a loading status over the component when it is the output of an event.

* `mode` is how the parent Gradio app tells your component whether the `interactive` or `static` version should be displayed.

* `gradio`: The `gradio` object is created by the parent Gradio app. It stores some application-level configuration that will be useful in your component, like internationalization. You must use it to dispatch events from your component.

A minimal `Index.svelte` file would look like:

```svelte
<script lang="ts">
	import type { LoadingStatus } from "@gradio/statustracker";
    import { Block } from "@gradio/atoms";
	import { StatusTracker } from "@gradio/statustracker";
	import type { Gradio } from "@gradio/utils";

	export let gradio: Gradio<{
		event_1: never;
		event_2: never;
	}>;

    export let value = "";
	export let elem_id = "";
	export let elem_classes: string[] = [];
	export let scale: number | null = null;
	export let min_width: number | undefined = undefined;
	export let loading_status: LoadingStatus | undefined = undefined;
    export let mode: "static" | "interactive";
</script>

<Block
	visible={true}
	{elem_id}
	{elem_classes}
	{scale}
	{min_width}
	allow_overflow={false}
	padding={true}
>
	{#if loading_status}
		<StatusTracker
			autoscroll={gradio.autoscroll}
			i18n={gradio.i18n}
			{...loading_status}
		/>
	{/if}
    <p>{value}</p>
</Block>
```

## The Example.svelte file

The `Example.svelte` file should expose the following props:

```typescript
    export let value: string;
    export let type: "gallery" | "table";
    export let selected = false;
    export let index: number;
```

* `value`: The example value that should be displayed.

* `type`: This is a variable that can be either `"gallery"` or `"table"` depending on how the examples are displayed. The `"gallery"` form is used when the examples correspond to a single input component, while the `"table"` form is used when a user has multiple input components, and the examples need to populate all of them. 

* `selected`: You can also adjust how the examples are displayed if a user "selects" a particular example by using the selected variable.

* `index`: The current index of the selected value.

* Any additional props your "non-example" component takes!

This is the `Example.svelte` file for the code `Radio` component:

```svelte
<script lang="ts">
	export let value: string;
	export let type: "gallery" | "table";
	export let selected = false;
</script>

<div
	class:table={type === "table"}
	class:gallery={type === "gallery"}
	class:selected
>
	{value}
</div>

<style>
	.gallery {
		padding: var(--size-1) var(--size-2);
	}
</style>
```

## Handling Files

If your component deals with files, these files **should** be uploaded to the backend server. 
The `@gradio/client` npm package provides the `upload` and `prepare_files` utility functions to help you do this.

The `prepare_files` function will convert the browser's `File` datatype to gradio's internal `FileData` type.
You should use the `FileData` data in your component to keep track of uploaded files.

The `upload` function will upload an array of `FileData` values to the server.

Here's an example of loading files from an `<input>` element when its value changes.


```svelte
<script lang="ts">
    import { upload, prepare_files, type FileData } from "@gradio/client";
    export let root;
    export let value;
    let uploaded_files;

    async function handle_upload(file_data: FileData[]): Promise<void> {
        await tick();
        uploaded_files = await upload(file_data, root);
    }

    async function loadFiles(files: FileList): Promise<void> {
        let _files: File[] = Array.from(files);
        if (!files.length) {
            return;
        }
        if (file_count === "single") {
            _files = [files[0]];
        }
        let file_data = await prepare_files(_files);
        await handle_upload(file_data);
    }

    async function loadFilesFromUpload(e: Event): Promise<void> {
		const target = e.target;

		if (!target.files) return;
		await loadFiles(target.files);
	}
</script>

<input
    type="file"
    on:change={loadFilesFromUpload}
    multiple={true}
/>
```

The component exposes a prop named `root`. 
This is passed down by the parent gradio app and it represents the base url that the files will be uploaded to and fetched from.

For WASM support, you should get the upload function from the `Context` and pass that as the third parameter of the `upload` function.

```typescript
<script lang="ts">
    import { getContext } from "svelte";
    const upload_fn = getContext<typeof upload_files>("upload_files");

    async function handle_upload(file_data: FileData[]): Promise<void> {
        await tick();
        await upload(file_data, root, upload_fn);
    }
</script>
```

## Leveraging Existing Gradio Components

Most of Gradio's frontend components are published on [npm](https://www.npmjs.com/), the javascript package repository.
This means that you can use them to save yourself time while incorporating common patterns in your component, like uploading files.
For example, the `@gradio/upload` package has `Upload` and `ModifyUpload` components for properly uploading files to the Gradio server. 
Here is how you can use them to create a user interface to upload and display PDF files.

```svelte
<script>
	import { type FileData, Upload, ModifyUpload } from "@gradio/upload";
	import { Empty, UploadText, BlockLabel } from "@gradio/atoms";
</script>

<BlockLabel Icon={File} label={label || "PDF"} />
{#if value === null && interactive}
    <Upload
        filetype="application/pdf"
        on:load={handle_load}
        {root}
        >
        <UploadText type="file" i18n={gradio.i18n} />
    </Upload>
{:else if value !== null}
    {#if interactive}
        <ModifyUpload i18n={gradio.i18n} on:clear={handle_clear}/>
    {/if}
    <iframe title={value.orig_name || "PDF"} src={value.data} height="{height}px" width="100%"></iframe>
{:else}
    <Empty size="large"> <File/> </Empty>	
{/if}
```

You can also combine existing Gradio components to create entirely unique experiences.
Like rendering a gallery of chatbot conversations. 
The possibilities are endless, please read the documentation on our javascript packages [here](https://gradio.app/main/docs/js).
We'll be adding more packages and documentation over the coming weeks!

## Matching Gradio Core's Design System

You can explore our component library via Storybook. You'll be able to interact with our components and see them in their various states.

For those interested in design customization, we provide the CSS variables consisting of our color palette, radii, spacing, and the icons we use - so you can easily match up your custom component with the style of our core components. This Storybook will be regularly updated with any new additions or changes.

[Storybook Link](https://gradio.app/main/docs/js/storybook)

## Custom configuration

If you want to make use of the vast vite ecosystem, you can use the `gradio.config.js` file to configure your component's build process. This allows you to make use of tools like tailwindcss, mdsvex, and more.

Currently, it is possible to configure the following:

Vite options:
- `plugins`: A list of vite plugins to use.

Svelte options:
- `preprocess`: A list of svelte preprocessors to use.
- `extensions`: A list of file extensions to compile to `.svelte` files.
- `build.target`: The target to build for, this may be necessary to support newer javascript features. See the [esbuild docs](https://esbuild.github.io/api/#target) for more information.

The `gradio.config.js` file should be placed in the root of your component's `frontend` directory. A default config file is created for you when you create a new component. But you can also create your own config file, if one doesn't exist, and use it to customize your component's build process.

### Example for a Vite plugin

Custom components can use Vite plugins to customize the build process. Check out the [Vite Docs](https://vitejs.dev/guide/using-plugins.html) for more information. 

Here we configure [TailwindCSS](https://tailwindcss.com), a utility-first CSS framework. Setup is easiest using the version 4 prerelease. 

```
npm install tailwindcss@next @tailwindcss/vite@next
```

In `gradio.config.js`:

```typescript
import tailwindcss from "@tailwindcss/vite";
export default {
    plugins: [tailwindcss()]
};
```

Then create a `style.css` file with the following content:

```css
@import "tailwindcss";
```

Import this file into `Index.svelte`. Note, that you need to import the css file containing `@import` and cannot just use a `<style>` tag and use `@import` there. 

```svelte
<script lang="ts">
[...]
import "./style.css";
[...]
</script>
```

### Example for Svelte options

In `gradio.config.js` you can also specify a some Svelte options to apply to the Svelte compilation. In this example we will add support for [`mdsvex`](https://mdsvex.pngwn.io), a Markdown preprocessor for Svelte. 

In order to do this we will need to add a [Svelte Preprocessor](https://svelte.dev/docs/svelte-compiler#preprocess) to the `svelte` object in `gradio.config.js` and configure the [`extensions`](https://github.com/sveltejs/vite-plugin-svelte/blob/HEAD/docs/config.md#config-file) field. Other options are not currently supported.

First, install the `mdsvex` plugin:

```bash
npm install mdsvex
```

Then add the following to `gradio.config.js`:

```typescript
import { mdsvex } from "mdsvex";

export default {
    svelte: {
        preprocess: [
            mdsvex()
        ],
        extensions: [".svelte", ".svx"]
    }
};
```

Now we can create `mdsvex` documents in our component's `frontend` directory and they will be compiled to `.svelte` files.

```md
<!-- HelloWorld.svx -->

<script lang="ts">
    import { Block } from "@gradio/atoms";

    export let title = "Hello World";
</script>

<Block label="Hello World">

# {title}

This is a markdown file.

</Block>
```

We can then use the `HelloWorld.svx` file in our components:

```svelte
<script lang="ts">
    import HelloWorld from "./HelloWorld.svx";
</script>

<HelloWorld />
```

## Conclusion

You now know how to create delightful frontends for your components!

---

<!-- Source: guides/10_mcp/05_building-chatgpt-apps-with-gradio.md -->
# Building ChatGPT Apps with Gradio and Apps SDK

[Apps in ChatGPT](https://openai.com/index/introducing-apps-in-chatgpt/) are a great way to let users try your machine learning models or other kinds of apps entirely by chatting in familiar chat application. OpenAI has released the [Apps SDK](https://developers.openai.com/apps-sdk/quickstart) for developers to build complete applications, but you can use Gradio to build ChatGPT apps very quickly, based off of your Gradio MCP server. We will also see how Gradio's built-in [share links](https://www.gradio.app/guides/sharing-your-app#sharing-demos) make it especially easy to iterate on your ChatGPT app!

### Introduction

Building a ChatGPT app requires doing two things:

* Building a Gradio MCP server with at least one tool exposed. If you're not already familiar with building a Gradio MCP server, we recommend reading [this guide first](https://www.gradio.app/guides/building-mcp-server-with-gradio).

* Building a custom UI with HTML, JavaScript, and CSS that will be displayed when your tool is called, an exposing that as an MCP resource. 

We will walk through the steps in more detail below.

### Prerequisites

* You will need to enable "developer mode" in ChatGPT under Settings → Apps & Connectors → Advanced settings in ChatGPT. This currently requires a paid ChatGPT account.
* You need to have `gradio>=6.0` installed with the `mcp` add-on:

```bash
pip install --upgrade gradio[mcp]
```

Now, let's walk through two examples of how you can build build ChatGPT apps with Gradio. 

### Example 1: Letter Counter App

The first example is an ChatGPT app that counts the occurrence of letters in a word and displays a card with the word and specified letters highlighted, like this:

<video src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/letter-counter-app-recording.mp4" controls></video>


So how do we build this? You can find the complete code for the letter counter app [in a single file here](https://github.com/gradio-app/gradio/blob/main/demo/mcp_letter_counter_app/run.py), or follow the steps below:

1. Start by writing your Python function. In our case, the function is simply a letter counter:

```py
def letter_counter(word: str, letter: str) -> int:
    """
    Count the number of letters in a word or phrase.

    Parameters:
        word (str): The word or phrase to count the letters of.
        letter (str): The letter to count the occurrences of.
    """
    return word.count(letter)
```

2. Then, wrap your Python function with a Gradio UI, something along these lines:

```py
with gr.Blocks() as demo:
    with gr.Row():
        with gr.Column():
            word = gr.Textbox(label="Word")
            letter = gr.Textbox(label="Letter")
            btn = gr.Button("Count Letters")
        with gr.Column():
            count = gr.Number(label="Count")

    btn.click(letter_counter, inputs=[word, letter], outputs=count)
```

3. Now, launch your Gradio app with the MCP server enabled, i.e. with `mcp_server=True`

```py
    demo.launch(mcp_server=True)
```

As covered in [earlier guides](https://www.gradio.app/guides/building-mcp-server-with-gradio), you will now be able to test the tool using any MCP Client, such as the MCP Inspector tool. Test it and confirm that it behaves as you expect.

4. Create a UI for your ChatGPT app and expose it as a resource. This part requires writing some frontend code and may be unfamiliar at first, but a few examples will help you create an app that works well for your use case. In our case, we'll create a card with HTML, Javascript, and CSS. Inside the card, we'll display the word presented by the user, highlighting each occurrence of the specified letter. Note that we access the user's tool input using `window.openai?.toolInput?.word` and `window.openai?.toolInput?.letter`. The `window.openai` object is automatically inserted by ChatGPT with the data from the user's tool call. This is what the complete function looks like:

```py
@gr.mcp.resource("ui://widget/app.html", mime_type="text/html+skybridge")
def app_html():
    visual = """
    <div id="letter-card-container"></div>
    <script>
        const container = document.getElementById('letter-card-container');

        function render() {
            const word = window.openai?.toolInput?.word || "strawberry";
            const letter = window.openai?.toolInput?.letter || "r";

            let letterHTML = '';
            for (let i = 0; i < word.length; i++) {
                const char = word[i];
                const color = char.toLowerCase() === letter.toLowerCase() ? '#b8860b' : '#000000';
                letterHTML += `<span style="color: ${color};">${char}</span>`;
            }

            container.innerHTML = `
                <div style="
                    background: linear-gradient(135deg, #f5f5dc 0%, #e8e4d0 100%);
                    background-image:
                        repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(139, 121, 94, 0.03) 2px, rgba(139, 121, 94, 0.03) 4px),
                        linear-gradient(135deg, #f5f5dc 0%, #e8e4d0 100%);
                    border-radius: 16px;
                    padding: 40px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
                    max-width: 600px;
                    margin: 20px auto;
                    font-family: 'Georgia', serif;
                    text-align: center;
                ">
                    <div style="
                        font-size: 48px;
                        font-weight: bold;
                        letter-spacing: 8px;
                        line-height: 1.5;
                    ">
                        ${letterHTML}
                    </div>
                </div>
            `;
        }
        render();
        window.addEventListener("openai:set_globals", (event) => {
            if (event.detail?.globals?.toolInput) {
                render();
            }
        }, { passive: true });
    </script>
    """
    return visual
```

Note that we've provided a URI for the `gr.mcp.resource` at `ui://widget/app.html`. This is arbitrary, but we'll need to use the same URI later on. We also need to specify the mimetype of the resource to be `mime_type="text/html+skybridge"`. Finally, note that we attached an event listener in the JavaScript for "openai:set_globals", which is generally a good practice as it allows the widget to update whenever a new tool call is triggered. 

5. Create an event in your Gradio app corresponding to the resource function. This is necessary because your Gradio app only picks up MCP tools, resources, prompts, etc. if they are associated with a Gradio event. Typically, the convention is to simply display the code for your MCP resource in a `gr.Code` component, e.g. like this:

```py
    html = gr.Code(language="html", max_lines=20)
    
    # ... the rest of your Gradio app

    btn.click(app_html, outputs=html)
```

6. Add `_meta` attributes to your MCP tool. We need to connect the MCP tool that we created to the UI that we created for our app. We can do this by adding this decorator to our MCP tool function:

```py
@gr.mcp.tool(
    _meta={
        "openai/outputTemplate": "ui://widget/app.html",
        "openai/resultCanProduceWidget": True,
        "openai/widgetAccessible": True,
    }
)
```

The key thing to observe is that the `"openai/outputTemplate"` must match the URI of the MCP resource that we created earlier.

7. Relaunch your Gradio app with `share=True`. This will make it very easy to test within ChatGPT. Note the MCP server URL that is printed to your terminal, e.g. `https://2e879c6066d729b11b.gradio.live/gradio_api/mcp/`.

```py
    demo.launch(share=True, mcp_server=True)
```

This will print a public URL that your Gradio app will be running on.

8. Now, navigate to ChatGPT (https://chat.com/). As mentioned earlier, you need to enable "developer mode" in ChatGPT under Settings → Apps & Connectors → Advanced settings in ChatGPT. Then, navigate to Settings → Apps & Connectors and click the "Create" button. Give your connector a name, a description (optional), and paste in the MCP server URL that was printed to your terminal. Choose "No authentication" and create.

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/letter-counter-setup.png)

And that's it! Once the Connector has been created, you can start prompting it by saying something like, "Use @letter-counter to count the number of r's in Gradio."

### Example 2: An Image Brightener

Next, let's see a more complex ChatGPT app for image enhancement. The ChatGPT app includes a "Brighten" button that lets the user call the tool directly from the app UI.

<video src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/mcp-image-app.mp4" controls></video>

Here's the complete code for this app:

$code_mcp_image_app

We won't break down the code in as much detail since many of the pieces are the same. But note the following differences from the earlier example:

* Calling tools from the widget: The app uses `window.openai.callTool()` to invoke the MCP tool directly from a button click, without requiring ChatGPT to call it:

```javascript
const result = await window.openai.callTool('power_law_image', {
    input_path: imageEl.src
});
```

* Parsing tool call results: The result from `callTool()` contains a `content` array that needs to be parsed to extract data:

```javascript
function extractImageUrl(data) {
    if (data?.content) {
        for (const item of data.content) {
            if (item.type === 'text' && item.text?.startsWith('Image URL: ')) {
                return item.text.substring('Image URL: '.length).trim();
            }
        }
    }
}
```

* Updating UI based on tool results: After calling the tool, the app immediately updates the displayed image with the new result:

```javascript
const newUrl = extractImageUrl(result);
if (newUrl) imageEl.src = newUrl;
```

With these examples, you've seen how to build both simple reactive widgets and more advanced interactive apps that can call tools directly from the UI. By combining Gradio's MCP server capabilities with the OpenAI Apps SDK, it's time to start create richer ChatGPT integrations that enhance the conversational experience with custom visualizations and user interactions!

---

<!-- Source: guides/cn/03_building-with-blocks/05_using-blocks-like-functions.md -->
# 使用 Gradio 块像函数一样

Tags: TRANSLATION, HUB, SPACES

**先决条件**: 本指南是在块介绍的基础上构建的。请确保[先阅读该指南](https://gradio.app/blocks-and-event-listeners)。

## 介绍

你知道吗，除了作为一个全栈机器学习演示，Gradio 块应用其实也是一个普通的 Python 函数！？

这意味着如果你有一个名为 `demo` 的 Gradio 块（或界面）应用，你可以像使用任何 Python 函数一样使用 `demo`。

所以，像 `output = demo("Hello", "friend")` 这样的操作会在输入为 "Hello" 和 "friend" 的情况下运行 `demo` 中定义的第一个事件，并将其存储在变量 `output` 中。

如果以上内容让你打瞌睡 🥱，请忍耐一下！通过将应用程序像函数一样使用，你可以轻松地组合 Gradio 应用。
接下来的部分将展示如何实现。

## 将块视为函数

假设我们有一个将英文文本翻译为德文文本的演示块。

$code_english_translator

我已经将它托管在 Hugging Face Spaces 上的 [gradio/english_translator](https://huggingface.co/spaces/gradio/english_translator)。

你也可以在下面看到演示：

$demo_english_translator

现在，假设你有一个生成英文文本的应用程序，但你还想额外生成德文文本。

你可以选择：

1. 将我的英德翻译的源代码复制粘贴到你的应用程序中。

2. 在你的应用程序中加载我的英德翻译，并将其当作普通的 Python 函数处理。

选项 1 从技术上讲总是有效的，但它经常引入不必要的复杂性。

选项 2 允许你借用所需的功能，而不会过于紧密地耦合我们的应用程序。

你只需要在源文件中调用 `Blocks.load` 类方法即可。
之后，你就可以像使用普通的 Python 函数一样使用我的翻译应用程序了！

下面的代码片段和演示展示了如何使用 `Blocks.load`。

请注意，变量 `english_translator` 是我的英德翻译应用程序，但它在 `generate_text` 中像普通函数一样使用。

$code_generate_english_german

$demo_generate_english_german

## 如何控制使用应用程序中的哪个函数

如果你正在加载的应用程序定义了多个函数，你可以使用 `fn_index` 和 `api_name` 参数指定要使用的函数。

在英德演示的代码中，你会看到以下代码行：

translate_btn.click(translate, inputs=english, outputs=german, api_name="translate-to-german")

这个 `api_name` 在我们的应用程序中给这个函数一个唯一的名称。你可以使用这个名称告诉 Gradio 你想使用
上游空间中的哪个函数：

english_generator(text, api_name="translate-to-german")[0]["generated_text"]

你也可以使用 `fn_index` 参数。
假设我的应用程序还定义了一个英语到西班牙语的翻译函数。
为了在我们的文本生成应用程序中使用它，我们将使用以下代码：

english_generator(text, fn_index=1)[0]["generated_text"]

Gradio 空间中的函数是从零开始索引的，所以西班牙语翻译器将是我的空间中的第二个函数，
因此你会使用索引 1。

## 结语

我们展示了将块应用视为普通 Python 函数的方法，这有助于在不同的应用程序之间组合功能。
任何块应用程序都可以被视为一个函数，但一个强大的模式是在将其视为函数之前，
在[自己的应用程序中加载](https://huggingface.co/spaces)托管在[Hugging Face Spaces](https://huggingface.co/spaces)上的应用程序。
您也可以加载托管在[Hugging Face Model Hub](https://huggingface.co/models)上的模型——有关示例，请参阅[使用 Hugging Face 集成](/using_hugging_face_integrations)指南。

### 开始构建！⚒️

## Parting Remarks

我们展示了如何将 Blocks 应用程序视为常规 Python 函数，以便在不同的应用程序之间组合功能。
任何 Blocks 应用程序都可以被视为函数，但是一种有效的模式是在将其视为自己应用程序的函数之前，先`加载`托管在[Hugging Face Spaces](https://huggingface.co/spaces)上的应用程序。
您还可以加载托管在[Hugging Face Model Hub](https://huggingface.co/models)上的模型-请参见[使用 Hugging Face 集成指南](/using_hugging_face_integrations)中的示例。

### Happy building! ⚒️

---

<!-- Source: guides/03_building-with-blocks/06_custom_HTML_components.md -->
# Custom Components with `gr.HTML`

If you wish to create custom HTML in your app, use the `gr.HTML` component. Here's a basic "HTML-only" example:

```python
gr.HTML(value="<h1>Hello World!</h1>")
```

You can also use html-templates to organize your HTML. Take a look at the example below:

```python
gr.HTML(value="John", html_template"<h1>Hello, {{value}}!</h1><p>${value.length} letters</p>")
```

"John" becomes `value` when injected into the template, resulting in:

```html
<h1>Hello, John!</h1><p>4 letters</p>
```

Notice how we support two types of templating syntaxes: `${}` for custom JavaScript expressions, and `{{}}` for Handlebars templating. You can use either or both in your templates - `${}` allows for completely custom JS logic, while Handlebars provides structured templating for loops and conditionals.

Let's look at another example for displaying a list of items:

```python
gr.HTML(value=["apple", "banana", "cherry"], html_templates="""
    <h1>${value.length} fruits:</h1>
    <ul>
      {{#each value}}
        <li>{{this}}</li>
      {{/each}}
    </ul>
""")
```

By default, the content of gr.HTML will have some CSS styles applied to match the Gradio theme. You can disable this with `apply_default_css=False`. You can also provide your own CSS styles via the `css_template` argument as shown in the next example.

Let's build a simple star rating component using `gr.HTML`, and then extend it with more features.

$code_star_rating_simple
$demo_star_rating_simple

Note how we used the `css_template` argument to add custom CSS that styles the HTML inside the `gr.HTML` component.

Let's see how the template automatically updates when we update the value.

$code_star_rating_templates
$demo_star_rating_templates

We may wish to pass additional props beyond just `value` to the `html_template`. Simply add these props to your templates and pass them as kwargs to the `gr.HTML` component. For example, lets add `size` and `max_stars` props to the star rating component.

$code_star_rating_props
$demo_star_rating_props

Note how both `html_template` and `css_template` can format these extra props. Note also how any of these props can be updated via Gradio event listeners.

## Triggering Events and Custom Input Components

The `gr.HTML` component can also be used to create custom input components by triggering events. You will provide `js_on_load`, javascript code that runs when the component loads. The code has access to the `trigger` function to trigger events that Gradio can listen to, and the object `props` which has access to all the props of the component, including `value`.

$code_star_rating_events
$demo_star_rating_events

Take a look at the `js_on_load` code above. We add click event listeners to each star image to update the value via `props.value` when a star is clicked. This also re-renders the template to show the updated value. We also add a click event listener to the submit button that triggers the `submit` event. In our app, we listen to this trigger to run a function that outputs the `value` of the star rating.

You can update any other props of the component via `props.<prop_name>`, and trigger events via `trigger('<event_name>')`. The trigger event can also be send event data, e.g.

```js
trigger('event_name', { key: value, count: 123 });
```

This event data will be accessible the Python event listener functions via gr.EventData.

```python
def handle_event(evt: gr.EventData):
    print(evt.key)
    print(evt.count)

star_rating.event(fn=handle_event, inputs=[], outputs=[])
```

Keep in mind that event listeners attached in `js_on_load` are only attached once when the component is first rendered. If your component creates new elements dynamically that need event listeners, attach the event listener to a parent element that exists when the component loads, and check for the target. For example:

```js
element.addEventListener('click', (e) =>
    if (e.target && e.target.matches('.child-element')) {
        props.value = e.target.dataset.value;
    }
);
```

## Component Classes

If you are reusing the same HTML component in multiple places, you can create a custom component class by subclassing `gr.HTML` and setting default values for the templates and other arguments. Here's an example of creating a reusable StarRating component.

$code_star_rating_component
$demo_star_rating_component

Note: Gradio requires all components to accept certain arguments, such as `render`. You do not need
to handle these arguments, but you do need to accept them in your component constructor and pass
them to the parent `gr.HTML` class. Otherwise, your component may not behave correctly. The easiest
way is to add `**kwargs` to your `__init__` method and pass it to `super().__init__()`, just like in the code example above.

We've created several custom HTML components as reusable components as examples you can reference in [this directory](https://github.com/gradio-app/gradio/tree/main/gradio/components/custom_html_components).

### API / MCP support

To make your custom HTML component work with Gradio's built-in support for API and MCP (Model Context Protocol) usage, you need to define how its data should be serialized. There are two ways to do this:

**Option 1: Define an `api_info()` method**

Add an `api_info()` method that returns a JSON schema dictionary describing your component's data format. This is what we do in the StarRating class above.

**Option 2: Define a Pydantic data model**

For more complex data structures, you can define a Pydantic model that inherits from `GradioModel` or `GradioRootModel`:

```python
from gradio.data_classes import GradioModel, GradioRootModel

class MyComponentData(GradioModel):
    items: List[str]
    count: int

class MyComponent(gr.HTML):
    data_model = MyComponentData
```

Use `GradioModel` when your data is a dictionary with named fields, or `GradioRootModel` when your data is a simple type (string, list, etc.) that doesn't need to be wrapped in a dictionary. By defining a `data_model`, your component automatically implements API methods.

## Security Considerations

Keep in mind that using `gr.HTML` to create custom components involves injecting raw HTML and JavaScript into your Gradio app. Be cautious about using untrusted user input into `html_template` and `js_on_load`, as this could lead to cross-site scripting (XSS) vulnerabilities. 

You should also expect that any Python event listeners that take your `gr.HTML` component as input could have any arbitrary value passed to them, not just the values you expect the frontend to be able to set for `value`. Sanitize and validate user input appropriately in public applications.

## Next Steps

Check out some examples of custom components that you can build in [this directory](https://github.com/gradio-app/gradio/tree/main/gradio/components/custom_html_components).

---

<!-- Source: guides/04_additional-features/06_batch-functions.md -->
# Batch functions

Gradio supports the ability to pass _batch_ functions. Batch functions are just
functions which take in a list of inputs and return a list of predictions.

For example, here is a batched function that takes in two lists of inputs (a list of
words and a list of ints), and returns a list of trimmed words as output:

```py
import time

def trim_words(words, lens):
    trimmed_words = []
    time.sleep(5)
    for w, l in zip(words, lens):
        trimmed_words.append(w[:int(l)])
    return [trimmed_words]
```

The advantage of using batched functions is that if you enable queuing, the Gradio server can automatically _batch_ incoming requests and process them in parallel,
potentially speeding up your demo. Here's what the Gradio code looks like (notice the `batch=True` and `max_batch_size=16`)

With the `gr.Interface` class:

```python
demo = gr.Interface(
    fn=trim_words, 
    inputs=["textbox", "number"], 
    outputs=["output"],
    batch=True, 
    max_batch_size=16
)

demo.launch()
```

With the `gr.Blocks` class:

```py
import gradio as gr

with gr.Blocks() as demo:
    with gr.Row():
        word = gr.Textbox(label="word")
        leng = gr.Number(label="leng")
        output = gr.Textbox(label="Output")
    with gr.Row():
        run = gr.Button()

    event = run.click(trim_words, [word, leng], output, batch=True, max_batch_size=16)

demo.launch()
```

In the example above, 16 requests could be processed in parallel (for a total inference time of 5 seconds), instead of each request being processed separately (for a total
inference time of 80 seconds). Many Hugging Face `transformers` and `diffusers` models work very naturally with Gradio's batch mode: here's [an example demo using diffusers to
generate images in batches](https://github.com/gradio-app/gradio/blob/main/demo/diffusers_with_batching/run.py)

---

<!-- Source: guides/05_chatbots/06_creating-a-discord-bot-from-a-gradio-app.md -->
# 🚀 Creating Discord Bots with Gradio 🚀

Tags: CHAT, DEPLOY, DISCORD

You can make your Gradio app available as a Discord bot to let users in your Discord server interact with it directly. 

## How does it work?

The Discord bot will listen to messages mentioning it in channels. When it receives a message (which can include text as well as files), it will send it to your Gradio app via Gradio's built-in API. Your bot will reply with the response it receives from the API. 

Because Gradio's API is very flexible, you can create Discord bots that support text, images, audio, streaming, chat history, and a wide variety of other features very easily. 

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/Screen%20Recording%202024-12-18%20at%204.26.55%E2%80%AFPM.gif)

## Prerequisites

* Install the latest version of `gradio` and the `discord.py` libraries:

```
pip install --upgrade gradio discord.py~=2.0
```

* Have a running Gradio app. This app can be running locally or on Hugging Face Spaces. In this example, we will be using the [Gradio Playground Space](https://huggingface.co/spaces/abidlabs/gradio-playground-bot), which takes in an image and/or text and generates the code to generate the corresponding Gradio app.

Now, we are ready to get started!


### 1. Create a Discord application

First, go to the [Discord apps dashboard](https://discord.com/developers/applications). Look for the "New Application" button and click it. Give your application a name, and then click "Create".

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/discord-4.png)

On the resulting screen, you will see basic information about your application. Under the Settings section, click on the "Bot" option. You can update your bot's username if you would like.

Then click on the "Reset Token" button. A new token will be generated. Copy it as we will need it for the next step.

Scroll down to the section that says "Privileged Gateway Intents". Your bot will need certain permissions to work correctly. In this tutorial, we will only be using the "Message Content Intent" so click the toggle to enable this intent. Save the changes.

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/discord-3.png)



### 2. Write a Discord bot

Let's start by writing a very simple Discord bot, just to make sure that everything is working. Write the following Python code in a file called `bot.py`, pasting the discord bot token from the previous step:

```python
# bot.py
import discord

TOKEN = #PASTE YOUR DISCORD BOT TOKEN HERE

client = discord.Client()

@client.event
async def on_ready():
    print(f'{client.user} has connected to Discord!')

client.run(TOKEN)
```

Now, run this file: `python bot.py`, which should run and print a message like:

```text
We have logged in as GradioPlaygroundBot#1451
```

If that is working, we are ready to add Gradio-specific code. We will be using the [Gradio Python Client](https://www.gradio.app/guides/getting-started-with-the-python-client) to query the Gradio Playground Space mentioned above. Here's the updated `bot.py` file:

```python
import discord
from gradio_client import Client, handle_file
import httpx
import os

TOKEN = #PASTE YOUR DISCORD BOT TOKEN HERE

intents = discord.Intents.default()
intents.message_content = True

client = discord.Client(intents=intents)
gradio_client = Client("abidlabs/gradio-playground-bot")

def download_image(attachment):
    response = httpx.get(attachment.url)
    image_path = f"./images/{attachment.filename}"
    os.makedirs("./images", exist_ok=True)
    with open(image_path, "wb") as f:
        f.write(response.content)
    return image_path

@client.event
async def on_ready():
    print(f'We have logged in as {client.user}')

@client.event
async def on_message(message):
    # Ignore messages from the bot itself
    if message.author == client.user:
        return

    # Check if the bot is mentioned in the message and reply
    if client.user in message.mentions:
        # Extract the message content without the bot mention
        clean_message = message.content.replace(f"<@{client.user.id}>", "").strip()

        # Handle images (only the first image is used)
        files = []
        if message.attachments:
            for attachment in message.attachments:
                if any(attachment.filename.lower().endswith(ext) for ext in ['png', 'jpg', 'jpeg', 'gif', 'webp']):
                    image_path = download_image(attachment)
                    files.append(handle_file(image_path))
                    break
        
        # Stream the responses to the channel
        for response in gradio_client.submit(
            message={"text": clean_message, "files": files},
        ):
            await message.channel.send(response[-1])

client.run(TOKEN)
```

### 3. Add the bot to your Discord Server

Now we are ready to install the bot on our server. Go back to the [Discord apps dashboard](https://discord.com/developers/applications). Under the Settings section, click on the "OAuth2" option. Scroll down to the "OAuth2 URL Generator" box and select the "bot" checkbox:

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/discord-2.png)



Then in "Bot Permissions" box that pops up underneath, enable the following permissions:

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/discord-1.png)


Copy the generated URL that appears underneath, which should look something like:

```text
https://discord.com/oauth2/authorize?client_id=1319011745452265575&permissions=377957238784&integration_type=0&scope=bot
```

Paste it into your browser, which should allow you to add the Discord bot to any Discord server that you manage.


### 4. That's it!

Now you can mention your bot from any channel in your Discord server, optionally attach an image, and it will respond with generated Gradio app code!

The bot will:
1. Listen for mentions
2. Process any attached images
3. Send the text and images to your Gradio app
4. Stream the responses back to the Discord channel

 This is just a basic example - you can extend it to handle more types of files, add error handling, or integrate with different Gradio apps.

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/Screen%20Recording%202024-12-18%20at%204.26.55%E2%80%AFPM.gif)

If you build a Discord bot from a Gradio app, feel free to share it on X and tag [the Gradio account](https://x.com/Gradio), and we are happy to help you amplify!

---

<!-- Source: guides/07_streaming/06_automatic-voice-detection.md -->
# Multimodal Gradio App Powered by Groq with Automatic Speech Detection

Tags: AUDIO, STREAMING, CHATBOTS, VOICE

## Introduction
Modern voice applications should feel natural and responsive, moving beyond the traditional "click-to-record" pattern. By combining Groq's fast inference capabilities with automatic speech detection, we can create a more intuitive interaction model where users can simply start talking whenever they want to engage with the AI.

> Credits: VAD and Gradio code inspired by [WillHeld's Diva-audio-chat](https://huggingface.co/spaces/WillHeld/diva-audio-chat/tree/main).

In this tutorial, you will learn how to create a multimodal Gradio and Groq app that has automatic speech detection. You can also watch the full video tutorial which includes a demo of the application:

<iframe width="560" height="315" src="https://www.youtube.com/embed/azXaioGdm2Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Background

Many voice apps currently work by the user clicking record, speaking, then stopping the recording. While this can be a powerful demo, the most natural mode of interaction with voice requires the app to dynamically detect when the user is speaking, so they can talk back and forth without having to continually click a record button. 

Creating a natural interaction with voice and text requires a dynamic and low-latency response. Thus, we need both automatic voice detection and fast inference. With @ricky0123/vad-web powering speech detection and Groq powering the LLM, both of these requirements are met. Groq provides a lightning fast response, and Gradio allows for easy creation of impressively functional apps.

This tutorial shows you how to build a calorie tracking app where you speak to an AI that automatically detects when you start and stop your response, and provides its own text response back to guide you with questions that allow it to give a calorie estimate of your last meal.

## Key Components

- **Gradio**: Provides the web interface and audio handling capabilities
- **@ricky0123/vad-web**: Handles voice activity detection
- **Groq**: Powers fast LLM inference for natural conversations
- **Whisper**: Transcribes speech to text

### Setting Up the Environment

First, let’s install and import our essential libraries and set up a client for using the Groq API. Here’s how to do it:

`requirements.txt`
```
gradio
groq
numpy
soundfile
librosa
spaces
xxhash
datasets
```

`app.py`
```python
import groq
import gradio as gr
import soundfile as sf
from dataclasses import dataclass, field
import os

# Initialize Groq client securely
api_key = os.environ.get("GROQ_API_KEY")
if not api_key:
    raise ValueError("Please set the GROQ_API_KEY environment variable.")
client = groq.Client(api_key=api_key)
```

Here, we’re pulling in key libraries to interact with the Groq API, build a sleek UI with Gradio, and handle audio data. We’re accessing the Groq API key securely with a key stored in an environment variable, which is a security best practice for avoiding leaking the API key.

---

### State Management for Seamless Conversations

We need a way to keep track of our conversation history, so the chatbot remembers past interactions, and manage other states like whether recording is currently active. To do this, let’s create an `AppState` class:

```python
@dataclass
class AppState:
    conversation: list = field(default_factory=list)
    stopped: bool = False
    model_outs: Any = None
```

Our `AppState` class is a handy tool for managing conversation history and tracking whether recording is on or off. Each instance will have its own fresh list of conversations, making sure chat history is isolated to each session. 

---

### Transcribing Audio with Whisper on Groq

Next, we’ll create a function to transcribe the user’s audio input into text using Whisper, a powerful transcription model hosted on Groq. This transcription will also help us determine whether there’s meaningful speech in the input. Here’s how:

```python
def transcribe_audio(client, file_name):
    if file_name is None:
        return None

    try:
        with open(file_name, "rb") as audio_file:
            response = client.audio.transcriptions.with_raw_response.create(
                model="whisper-large-v3-turbo",
                file=("audio.wav", audio_file),
                response_format="verbose_json",
            )
            completion = process_whisper_response(response.parse())
            return completion
    except Exception as e:
        print(f"Error in transcription: {e}")
        return f"Error in transcription: {str(e)}"
```

This function opens the audio file and sends it to Groq’s Whisper model for transcription, requesting detailed JSON output. verbose_json is needed to get information to determine if speech was included in the audio. We also handle any potential errors so our app doesn’t fully crash if there’s an issue with the API request. 

```python
def process_whisper_response(completion):
    """
    Process Whisper transcription response and return text or null based on no_speech_prob
    
    Args:
        completion: Whisper transcription response object
        
    Returns:
        str or None: Transcribed text if no_speech_prob <= 0.7, otherwise None
    """
    if completion.segments and len(completion.segments) > 0:
        no_speech_prob = completion.segments[0].get('no_speech_prob', 0)
        print("No speech prob:", no_speech_prob)

        if no_speech_prob > 0.7:
            return None
            
        return completion.text.strip()
    
    return None
```

We also need to interpret the audio data response. The process_whisper_response function takes the resulting completion from Whisper and checks if the audio was just background noise or had actual speaking that was transcribed. It uses a threshold of 0.7 to interpret the no_speech_prob, and will return None if there was no speech. Otherwise, it will return the text transcript of the conversational response from the human.


---

### Adding Conversational Intelligence with LLM Integration

Our chatbot needs to provide intelligent, friendly responses that flow naturally. We’ll use a Groq-hosted Llama-3.2 for this:

```python
def generate_chat_completion(client, history):
    messages = []
    messages.append(
        {
            "role": "system",
            "content": "In conversation with the user, ask questions to estimate and provide (1) total calories, (2) protein, carbs, and fat in grams, (3) fiber and sugar content. Only ask *one question at a time*. Be conversational and natural.",
        }
    )

    for message in history:
        messages.append(message)

    try:
        completion = client.chat.completions.create(
            model="llama-3.2-11b-vision-preview",
            messages=messages,
        )
        return completion.choices[0].message.content
    except Exception as e:
        return f"Error in generating chat completion: {str(e)}"
```

We’re defining a system prompt to guide the chatbot’s behavior, ensuring it asks one question at a time and keeps things conversational. This setup also includes error handling to ensure the app gracefully manages any issues.

---

### Voice Activity Detection for Hands-Free Interaction

To make our chatbot hands-free, we’ll add Voice Activity Detection (VAD) to automatically detect when someone starts or stops speaking. Here’s how to implement it using ONNX in JavaScript:

```javascript
async function main() {
  const script1 = document.createElement("script");
  script1.src = "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.14.0/dist/ort.js";
  document.head.appendChild(script1)
  const script2 = document.createElement("script");
  script2.onload = async () =>  {
    console.log("vad loaded");
    var record = document.querySelector('.record-button');
    record.textContent = "Just Start Talking!"
    
    const myvad = await vad.MicVAD.new({
      onSpeechStart: () => {
        var record = document.querySelector('.record-button');
        var player = document.querySelector('#streaming-out')
        if (record != null && (player == null || player.paused)) {
          record.click();
        }
      },
      onSpeechEnd: (audio) => {
        var stop = document.querySelector('.stop-button');
        if (stop != null) {
          stop.click();
        }
      }
    })
    myvad.start()
  }
  script2.src = "https://cdn.jsdelivr.net/npm/@ricky0123/vad-web@0.0.7/dist/bundle.min.js";
}
```

This script loads our VAD model and sets up functions to start and stop recording automatically. When the user starts speaking, it triggers the recording, and when they stop, it ends the recording.

---

### Building a User Interface with Gradio

Now, let’s create an intuitive and visually appealing user interface with Gradio. This interface will include an audio input for capturing voice, a chat window for displaying responses, and state management to keep things synchronized.

```python
with gr.Blocks() as demo:
    with gr.Row():
        input_audio = gr.Audio(
            label="Input Audio",
            sources=["microphone"],
            type="numpy",
            streaming=False,
            waveform_options=gr.WaveformOptions(waveform_color="#B83A4B"),
        )
    with gr.Row():
        chatbot = gr.Chatbot(label="Conversation")
    state = gr.State(value=AppState())
demo.launch(theme=theme, js=js)
```

In this code block, we’re using Gradio’s `Blocks` API to create an interface with an audio input, a chat display, and an application state manager. The color customization for the waveform adds a nice visual touch.

---

### Handling Recording and Responses

Finally, let’s link the recording and response components to ensure the app reacts smoothly to user inputs and provides responses in real-time.

```python
    stream = input_audio.start_recording(
        process_audio,
        [input_audio, state],
        [input_audio, state],
    )
    respond = input_audio.stop_recording(
        response, [state, input_audio], [state, chatbot]
    )
```

These lines set up event listeners for starting and stopping the recording, processing the audio input, and generating responses. By linking these events, we create a cohesive experience where users can simply talk, and the chatbot handles the rest.

---

## Summary

1. When you open the app, the VAD system automatically initializes and starts listening for speech
2. As soon as you start talking, it triggers the recording automatically
3. When you stop speaking, the recording ends and:
   - The audio is transcribed using Whisper
   - The transcribed text is sent to the LLM
   - The LLM generates a response about calorie tracking
   - The response is displayed in the chat interface
4. This creates a natural back-and-forth conversation where you can simply talk about your meals and get instant feedback on nutritional content

This app demonstrates how to create a natural voice interface that feels responsive and intuitive. By combining Groq's fast inference with automatic speech detection, we've eliminated the need for manual recording controls while maintaining high-quality interactions. The result is a practical calorie tracking assistant that users can simply talk to as naturally as they would to a human nutritionist.

Link to GitHub repository: [Groq Gradio Basics](https://github.com/bklieger-groq/gradio-groq-basics/tree/main/calorie-tracker)

---

<!-- Source: guides/08_custom-components/06_frequently-asked-questions.md -->
# Frequently Asked Questions

## What do I need to install before using Custom Components?

Before using Custom Components, make sure you have Python 3.10+, Node.js v18+, npm 9+, and Gradio 4.0+ (preferably Gradio 5.0+) installed.

## Are custom components compatible between Gradio 4.0 and 5.0?

Custom components built with Gradio 5.0 should be compatible with Gradio 4.0. If you built your custom component in Gradio 4.0 you will have to rebuild your component to be compatible with Gradio 5.0. Simply follow these steps:
1. Update the `@gradio/preview` package. `cd` into the `frontend` directory and run `npm update`.
2.  Modify the `dependencies` key in `pyproject.toml` to pin the maximum allowed Gradio version at version 5, e.g. `dependencies = ["gradio>=4.0,<6.0"]`.
3. Run the build and publish commands

## What templates can I use to create my custom component?
Run `gradio cc show` to see the list of built-in templates.
You can also start off from other's custom components!
Simply `git clone` their repository and make your modifications.

## What is the development server?
When you run `gradio cc dev`, a development server will load and run a Gradio app of your choosing.
This is like when you run `python <app-file>.py`, however the `gradio` command will hot reload so you can instantly see your changes. 

## The development server didn't work for me 

**1. Check your terminal and browser console**

Make sure there are no syntax errors or other obvious problems in your code. Exceptions triggered from python will be displayed in the terminal. Exceptions from javascript will be displayed in the browser console and/or the terminal.

**2. Are you developing on Windows?**

Chrome on Windows will block the local compiled svelte files for security reasons. We recommend developing your custom component in the windows subsystem for linux (WSL) while the team looks at this issue.

**3. Inspect the window.__GRADIO_CC__ variable**

In the browser console, print the `window.__GRADIO__CC` variable (just type it into the console). If it is an empty object, that means
that the CLI could not find your custom component source code. Typically, this happens when the custom component is installed in a different virtual environment than the one used to run the dev command. Please use the `--python-path` and `gradio-path` CLI arguments to specify the path of the python and gradio executables for the environment your component is installed in. For example, if you are using a virtualenv located at `/Users/mary/venv`, pass in `/Users/mary/bin/python` and `/Users/mary/bin/gradio` respectively.

If the `window.__GRADIO__CC` variable is not empty (see below for an example), then the dev server should be working correctly. 

![](https://gradio-builds.s3.amazonaws.com/demo-files/gradio_CC_DEV.png)

**4. Make sure you are using a virtual environment**
It is highly recommended you use a virtual environment to prevent conflicts with other python dependencies installed in your system.


## Do I always need to start my component from scratch?
No! You can start off from an existing gradio component as a template, see the [five minute guide](./custom-components-in-five-minutes).
You can also start from an existing custom component if you'd like to tweak it further. Once you find the source code of a custom component you like, clone the code to your computer and run `gradio cc install`. Then you can run the development server to make changes.If you run into any issues, contact the author of the component by opening an issue in their repository. The [gallery](https://www.gradio.app/custom-components/gallery) is a good place to look for published components. For example, to start from the [PDF component](https://www.gradio.app/custom-components/gallery?id=freddyaboulton%2Fgradio_pdf), clone the space with `git clone https://huggingface.co/spaces/freddyaboulton/gradio_pdf`, `cd` into the `src` directory, and run `gradio cc install`.


## Do I need to host my custom component on HuggingFace Spaces?
You can develop and build your custom component without hosting or connecting to HuggingFace.
If you would like to share your component with the gradio community, it is recommended to publish your package to PyPi and host a demo on HuggingFace so that anyone can install it or try it out.

## What methods are mandatory for implementing a custom component in Gradio?

You must implement the `preprocess`, `postprocess`, `example_payload`, and `example_value` methods. If your component does not use a data model, you must also define the `api_info`, `flag`, and `read_from_flag` methods. Read more in the [backend guide](./backend).

## What is the purpose of a `data_model` in Gradio custom components?

A `data_model` defines the expected data format for your component, simplifying the component development process and self-documenting your code. It streamlines API usage and example caching.

## Why is it important to use `FileData` for components dealing with file uploads?

Utilizing `FileData` is crucial for components that expect file uploads. It ensures secure file handling, automatic caching, and streamlined client library functionality.

## How can I add event triggers to my custom Gradio component?

You can define event triggers in the `EVENTS` class attribute by listing the desired event names, which automatically adds corresponding methods to your component.

## Can I implement a custom Gradio component without defining a `data_model`?

Yes, it is possible to create custom components without a `data_model`, but you are going to have to manually implement `api_info`, `flag`, and `read_from_flag` methods.

## Are there sample custom components I can learn from?

We have prepared this [collection](https://huggingface.co/collections/gradio/custom-components-65497a761c5192d981710b12) of custom components on the HuggingFace Hub that you can use to get started!

## How can I find custom components created by the Gradio community?

We're working on creating a gallery to make it really easy to discover new custom components.
In the meantime, you can search for HuggingFace Spaces that are tagged as a `gradio-custom-component` [here](https://huggingface.co/search/full-text?q=gradio-custom-component&type=space)

---

<!-- Source: guides/03_building-with-blocks/07_custom-CSS-and-JS.md -->
# Customizing your demo with CSS and Javascript

Gradio allows you to customize your demo in several ways. You can customize the layout of your demo, add custom HTML, and add custom theming as well. This tutorial will go beyond that and walk you through how to add custom CSS and JavaScript code to your demo in order to add custom styling, animations, custom UI functionality, analytics, and more.

## Adding custom CSS to your demo

Gradio themes are the easiest way to customize the look and feel of your app. You can choose from a variety of themes, or create your own. To do so, pass the `theme=` kwarg to the `launch()` method of the `Blocks` constructor. For example:

```python
with gr.Blocks() as demo:
    ... # your code here
demo.launch(theme=gr.themes.Glass())
    ...
```

Gradio comes with a set of prebuilt themes which you can load from `gr.themes.*`. You can extend these themes or create your own themes from scratch - see the [Theming guide](/guides/theming-guide) for more details.

For additional styling ability, you can pass any CSS to your app as a string using the `css=` kwarg in the `launch()` method. You can also pass a pathlib.Path to a css file or a list of such paths to the `css_paths=` kwarg in the `launch()` method.

**Warning**: The use of query selectors in custom JS and CSS is _not_ guaranteed to work across Gradio versions that bind to Gradio's own HTML elements as the Gradio HTML DOM may change. We recommend using query selectors sparingly.

The base class for the Gradio app is `gradio-container`, so here's an example that changes the background color of the Gradio app:

```python
with gr.Blocks() as demo:
    ... # your code here
demo.launch(css=".gradio-container {background-color: red}")
    ...
```

If you'd like to reference external files in your css, preface the file path (which can be a relative or absolute path) with `"/gradio_api/file="`, for example:

```python
with gr.Blocks() as demo:
    ... # your code here
demo.launch(css=".gradio-container {background: url('/gradio_api/file=clouds.jpg')}")
    ...
```

Note: By default, most files in the host machine are not accessible to users running the Gradio app. As a result, you should make sure that any referenced files (such as `clouds.jpg` here) are either URLs or [allowed paths, as described here](/main/guides/file-access).


## The `elem_id` and `elem_classes` Arguments

You can `elem_id` to add an HTML element `id` to any component, and `elem_classes` to add a class or list of classes. This will allow you to select elements more easily with CSS. This approach is also more likely to be stable across Gradio versions as built-in class names or ids may change (however, as mentioned in the warning above, we cannot guarantee complete compatibility between Gradio versions if you use custom CSS as the DOM elements may themselves change).

```python
css = """
#warning {background-color: #FFCCCB}
.feedback textarea {font-size: 24px !important}
"""

with gr.Blocks() as demo:
    box1 = gr.Textbox(value="Good Job", elem_classes="feedback")
    box2 = gr.Textbox(value="Failure", elem_id="warning", elem_classes="feedback")
demo.launch(css=css)
```

The CSS `#warning` ruleset will only target the second Textbox, while the `.feedback` ruleset will target both. Note that when targeting classes, you might need to put the `!important` selector to override the default Gradio styles.

## Adding custom JavaScript to your demo

There are 3 ways to add javascript code to your Gradio demo:

1. You can add JavaScript code as a string to the `js` parameter of the `Blocks` or `Interface` initializer. This will run the JavaScript code when the demo is first loaded.

Below is an example of adding custom js to show an animated welcome message when the demo first loads.

$code_blocks_js_load
$demo_blocks_js_load


2. When using `Blocks` and event listeners, events have a `js` argument that can take a JavaScript function as a string and treat it just like a Python event listener function. You can pass both a JavaScript function and a Python function (in which case the JavaScript function is run first) or only Javascript (and set the Python `fn` to `None`). Take a look at the code below:
   
$code_blocks_js_methods
$demo_blocks_js_methods

3. Lastly, you can add JavaScript code to the `head` param of the `Blocks` initializer. This will add the code to the head of the HTML document. For example, you can add Google Analytics to your demo like so:


```python
head = f"""
<script async src="https://www.googletagmanager.com/gtag/js?id={google_analytics_tracking_id}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){{dataLayer.push(arguments);}}
  gtag('js', new Date());
  gtag('config', '{google_analytics_tracking_id}');
</script>
"""

with gr.Blocks() as demo:
    gr.HTML("<h1>My App</h1>")

demo.launch(head=head)
```

The `head` parameter accepts any HTML tags you would normally insert into the `<head>` of a page. For example, you can also include `<meta>` tags to `head` in order to update the social sharing preview for your Gradio app like this:

```py
import gradio as gr

custom_head = """
<!-- HTML Meta Tags -->
<title>Sample App</title>
<meta name="description" content="An open-source web application showcasing various features and capabilities.">

<!-- Facebook Meta Tags -->
<meta property="og:url" content="https://example.com">
<meta property="og:type" content="website">
<meta property="og:title" content="Sample App">
<meta property="og:description" content="An open-source web application showcasing various features and capabilities.">
<meta property="og:image" content="https://cdn.britannica.com/98/152298-050-8E45510A/Cheetah.jpg">

<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:creator" content="@example_user">
<meta name="twitter:title" content="Sample App">
<meta name="twitter:description" content="An open-source web application showcasing various features and capabilities.">
<meta name="twitter:image" content="https://cdn.britannica.com/98/152298-050-8E45510A/Cheetah.jpg">
<meta property="twitter:domain" content="example.com">
<meta property="twitter:url" content="https://example.com">  
"""

with gr.Blocks(title="My App") as demo:
    gr.HTML("<h1>My App</h1>")

demo.launch(head=custom_head)
```



Note that injecting custom JS can affect browser behavior and accessibility (e.g. keyboard shortcuts may be lead to unexpected behavior if your Gradio app is embedded in another webpage). You should test your interface across different browsers and be mindful of how scripts may interact with browser defaults. Here's an example where pressing `Shift + s` triggers the `click` event of a specific `Button` component if the browser focus is _not_ on an input component (e.g. `Textbox` component):

```python
import gradio as gr

shortcut_js = """
<script>
function shortcuts(e) {
    var event = document.all ? window.event : e;
    switch (e.target.tagName.toLowerCase()) {
        case "input":
        case "textarea":
        break;
        default:
        if (e.key.toLowerCase() == "s" && e.shiftKey) {
            document.getElementById("my_btn").click();
        }
    }
}
document.addEventListener('keypress', shortcuts, false);
</script>
"""

with gr.Blocks() as demo:
    action_button = gr.Button(value="Name", elem_id="my_btn")
    textbox = gr.Textbox()
    action_button.click(lambda : "button pressed", None, textbox)
    
demo.launch(head=shortcut_js)
```

---

<!-- Source: guides/04_additional-features/07_sharing-your-app.md -->
# Sharing Your App

In this Guide, we dive more deeply into the various aspects of sharing a Gradio app with others. We will cover:

1. [Sharing demos with the share parameter](#sharing-demos)
2. [Hosting on HF Spaces](#hosting-on-hf-spaces)
3. [Sharing Deep Links](#sharing-deep-links)
4. [Embedding hosted spaces](#embedding-hosted-spaces)
5. [Using the API page](#api-page)
6. [Accessing network requests](#accessing-the-network-request-directly)
7. [Mounting within FastAPI](#mounting-within-another-fast-api-app)
8. [Authentication](#authentication)
9. [MCP Servers](#mcp-servers)
10. [Rate Limits](#rate-limits)
11. [Analytics](#analytics)
12. [Progressive Web Apps (PWAs)](#progressive-web-app-pwa)

## Sharing Demos

Gradio demos can be easily shared publicly by setting `share=True` in the `launch()` method. Like this:

```python
import gradio as gr

def greet(name):
    return "Hello " + name + "!"

demo = gr.Interface(fn=greet, inputs="textbox", outputs="textbox")

demo.launch(share=True)  # Share your demo with just 1 extra parameter 🚀
```

This generates a public, shareable link that you can send to anybody! When you send this link, the user on the other side can try out the model in their browser. Because the processing happens on your device (as long as your device stays on), you don't have to worry about any packaging any dependencies.

![sharing](https://github.com/gradio-app/gradio/blob/main/guides/assets/sharing.svg?raw=true)


A share link usually looks something like this: **https://07ff8706ab.gradio.live**. Although the link is served through the Gradio Share Servers, these servers are only a proxy for your local server, and do not store any data sent through your app. Share links expire after 1 week. (it is [also possible to set up your own Share Server](https://github.com/huggingface/frp/) on your own cloud server to overcome this restriction.)

Tip: Keep in mind that share links are publicly accessible, meaning that anyone can use your model for prediction! Therefore, make sure not to expose any sensitive information through the functions you write, or allow any critical changes to occur on your device. Or you can [add authentication to your Gradio app](#authentication) as discussed below.

Note that by default, `share=False`, which means that your server is only running locally. (This is the default, except in Google Colab notebooks, where share links are automatically created). As an alternative to using share links, you can use use [SSH port-forwarding](https://www.ssh.com/ssh/tunneling/example) to share your local server with specific users.


## Hosting on HF Spaces

If you'd like to have a permanent link to your Gradio demo on the internet, use Hugging Face Spaces. [Hugging Face Spaces](http://huggingface.co/spaces/) provides the infrastructure to permanently host your machine learning model for free!

After you have [created a free Hugging Face account](https://huggingface.co/join), you have two methods to deploy your Gradio app to Hugging Face Spaces:

1. From terminal: run `gradio deploy` in your app directory. The CLI will gather some basic metadata, upload all the files in the current directory (respecting any `.gitignore` file that may be present in the root of the directory), and then launch your app on Spaces. To update your Space, you can re-run this command or enable the Github Actions option in the CLI to automatically update the Spaces on `git push`.

2. From your browser: Drag and drop a folder containing your Gradio model and all related files [here](https://huggingface.co/new-space). See [this guide how to host on Hugging Face Spaces](https://huggingface.co/blog/gradio-spaces) for more information, or watch the embedded video:

<video autoplay muted loop>
  <source src="https://github.com/gradio-app/gradio/blob/main/guides/assets/hf_demo.mp4?raw=true" type="video/mp4" />
</video>

## Sharing Deep Links

You can add a button to your Gradio app that creates a unique URL you can use to share your app and all components **as they currently are** with others. This is useful for sharing unique and interesting generations from your application , or for saving a snapshot of your app at a particular point in time.

To add a deep link button to your app, place the `gr.DeepLinkButton` component anywhere in your app.
For the URL to be accessible to others, your app must be available at a public URL. So be sure to host your app like Hugging Face Spaces or use the `share=True` parameter when launching your app.

Let's see an example of how this works. Here's a simple Gradio chat ap that uses the `gr.DeepLinkButton` component. After a couple of messages, click the deep link button and paste it into a new browser tab to see the app as it is at that point in time.

$code_deep_link
$demo_deep_link


## Embedding Hosted Spaces

Once you have hosted your app on Hugging Face Spaces (or on your own server), you may want to embed the demo on a different website, such as your blog or your portfolio. Embedding an interactive demo allows people to try out the machine learning model that you have built, without needing to download or install anything — right in their browser! The best part is that you can embed interactive demos even in static websites, such as GitHub pages.

There are two ways to embed your Gradio demos. You can find quick links to both options directly on the Hugging Face Space page, in the "Embed this Space" dropdown option:

![Embed this Space dropdown option](https://github.com/gradio-app/gradio/blob/main/guides/assets/embed_this_space.png?raw=true)

### Embedding with Web Components

Web components typically offer a better experience to users than IFrames. Web components load lazily, meaning that they won't slow down the loading time of your website, and they automatically adjust their height based on the size of the Gradio app.

To embed with Web Components:

1. Import the gradio JS library into into your site by adding the script below in your site (replace {GRADIO_VERSION} in the URL with the library version of Gradio you are using).

```html
<script
	type="module"
	src="https://gradio.s3-us-west-2.amazonaws.com/{GRADIO_VERSION}/gradio.js"
></script>
```

2. Add

```html
<gradio-app src="https://$your_space_host.hf.space"></gradio-app>
```

element where you want to place the app. Set the `src=` attribute to your Space's embed URL, which you can find in the "Embed this Space" button. For example:

```html
<gradio-app
	src="https://abidlabs-pytorch-image-classifier.hf.space"
></gradio-app>
```

<script>
fetch("https://pypi.org/pypi/gradio/json"
).then(r => r.json()
).then(obj => {
    let v = obj.info.version;
    content = document.querySelector('.prose');
    content.innerHTML = content.innerHTML.replaceAll("{GRADIO_VERSION}", v);
});
</script>

You can see examples of how web components look <a href="https://www.gradio.app">on the Gradio landing page</a>.

You can also customize the appearance and behavior of your web component with attributes that you pass into the `<gradio-app>` tag:

- `src`: as we've seen, the `src` attributes links to the URL of the hosted Gradio demo that you would like to embed
- `space`: an optional shorthand if your Gradio demo is hosted on Hugging Face Space. Accepts a `username/space_name` instead of a full URL. Example: `gradio/Echocardiogram-Segmentation`. If this attribute attribute is provided, then `src` does not need to be provided.
- `control_page_title`: a boolean designating whether the html title of the page should be set to the title of the Gradio app (by default `"false"`)
- `initial_height`: the initial height of the web component while it is loading the Gradio app, (by default `"300px"`). Note that the final height is set based on the size of the Gradio app.
- `container`: whether to show the border frame and information about where the Space is hosted (by default `"true"`)
- `info`: whether to show just the information about where the Space is hosted underneath the embedded app (by default `"true"`)
- `autoscroll`: whether to autoscroll to the output when prediction has finished (by default `"false"`)
- `eager`: whether to load the Gradio app as soon as the page loads (by default `"false"`)
- `theme_mode`: whether to use the `dark`, `light`, or default `system` theme mode (by default `"system"`)
- `render`: an event that is triggered once the embedded space has finished rendering.

Here's an example of how to use these attributes to create a Gradio app that does not lazy load and has an initial height of 0px.

```html
<gradio-app
	space="gradio/Echocardiogram-Segmentation"
	eager="true"
	initial_height="0px"
></gradio-app>
```

Here's another example of how to use the `render` event. An event listener is used to capture the `render` event and will call the `handleLoadComplete()` function once rendering is complete.

```html
<script>
	function handleLoadComplete() {
		console.log("Embedded space has finished rendering");
	}

	const gradioApp = document.querySelector("gradio-app");
	gradioApp.addEventListener("render", handleLoadComplete);
</script>
```

_Note: While Gradio's CSS will never impact the embedding page, the embedding page can affect the style of the embedded Gradio app. Make sure that any CSS in the parent page isn't so general that it could also apply to the embedded Gradio app and cause the styling to break. Element selectors such as `header { ... }` and `footer { ... }` will be the most likely to cause issues._

### Embedding with IFrames

To embed with IFrames instead (if you cannot add javascript to your website, for example), add this element:

```html
<iframe src="https://$your_space_host.hf.space"></iframe>
```

Again, you can find the `src=` attribute to your Space's embed URL, which you can find in the "Embed this Space" button.

Note: if you use IFrames, you'll probably want to add a fixed `height` attribute and set `style="border:0;"` to remove the border. In addition, if your app requires permissions such as access to the webcam or the microphone, you'll need to provide that as well using the `allow` attribute.

## API Page

You can use almost any Gradio app as an API! In the footer of a Gradio app [like this one](https://huggingface.co/spaces/gradio/hello_world), you'll see a "Use via API" link.

![Use via API](https://github.com/gradio-app/gradio/blob/main/guides/assets/use_via_api.png?raw=true)

This is a page that lists the endpoints that can be used to query the Gradio app, via our supported clients: either [the Python client](https://gradio.app/guides/getting-started-with-the-python-client/), or [the JavaScript client](https://gradio.app/guides/getting-started-with-the-js-client/). For each endpoint, Gradio automatically generates the parameters and their types, as well as example inputs, like this.

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/view-api.png)

The endpoints are automatically created when you launch a Gradio application. If you are using Gradio `Blocks`, you can also name each event listener, such as

```python
btn.click(add, [num1, num2], output, api_name="addition")
```

This will add and document the endpoint `/addition/` to the automatically generated API page. Read more about the [API page here](./view-api-page).

## Accessing the Network Request Directly

When a user makes a prediction to your app, you may need the underlying network request, in order to get the request headers (e.g. for advanced authentication), log the client's IP address, getting the query parameters, or for other reasons. Gradio supports this in a similar manner to FastAPI: simply add a function parameter whose type hint is `gr.Request` and Gradio will pass in the network request as that parameter. Here is an example:

```python
import gradio as gr

def echo(text, request: gr.Request):
    if request:
        print("Request headers dictionary:", request.headers)
        print("IP address:", request.client.host)
        print("Query parameters:", dict(request.query_params))
    return text

io = gr.Interface(echo, "textbox", "textbox").launch()
```

Note: if your function is called directly instead of through the UI (this happens, for
example, when examples are cached, or when the Gradio app is called via API), then `request` will be `None`.
You should handle this case explicitly to ensure that your app does not throw any errors. That is why
we have the explicit check `if request`.

## Mounting Within Another FastAPI App

In some cases, you might have an existing FastAPI app, and you'd like to add a path for a Gradio demo.
You can easily do this with `gradio.mount_gradio_app()`.

Here's a complete example:

$code_custom_path

Note that this approach also allows you run your Gradio apps on custom paths (`http://localhost:8000/gradio` in the example above).


## Authentication

### Password-protected app

You may wish to put an authentication page in front of your app to limit who can open your app. With the `auth=` keyword argument in the `launch()` method, you can provide a tuple with a username and password, or a list of acceptable username/password tuples; Here's an example that provides password-based authentication for a single user named "admin":

```python
demo.launch(auth=("admin", "pass1234"))
```

For more complex authentication handling, you can even pass a function that takes a username and password as arguments, and returns `True` to allow access, `False` otherwise.

Here's an example of a function that accepts any login where the username and password are the same:

```python
def same_auth(username, password):
    return username == password
demo.launch(auth=same_auth)
```

If you have multiple users, you may wish to customize the content that is shown depending on the user that is logged in. You can retrieve the logged in user by [accessing the network request directly](#accessing-the-network-request-directly) as discussed above, and then reading the `.username` attribute of the request. Here's an example:


```python
import gradio as gr

def update_message(request: gr.Request):
    return f"Welcome, {request.username}"

with gr.Blocks() as demo:
    m = gr.Markdown()
    demo.load(update_message, None, m)

demo.launch(auth=[("Abubakar", "Abubakar"), ("Ali", "Ali")])
```

Note: For authentication to work properly, third party cookies must be enabled in your browser. This is not the case by default for Safari or for Chrome Incognito Mode.

If users visit the `/logout` page of your Gradio app, they will automatically be logged out and session cookies deleted. This allows you to add logout functionality to your Gradio app as well. Let's update the previous example to include a log out button:

```python
import gradio as gr

def update_message(request: gr.Request):
    return f"Welcome, {request.username}"

with gr.Blocks() as demo:
    m = gr.Markdown()
    logout_button = gr.Button("Logout", link="/logout")
    demo.load(update_message, None, m)

demo.launch(auth=[("Pete", "Pete"), ("Dawood", "Dawood")])
```
By default, visiting `/logout` logs the user out from **all sessions** (e.g. if they are logged in from multiple browsers or devices, all will be signed out). If you want to log out only from the **current session**, add the query parameter `all_session=false` (i.e. `/logout?all_session=false`).

Note: Gradio's built-in authentication provides a straightforward and basic layer of access control but does not offer robust security features for applications that require stringent access controls (e.g.  multi-factor authentication, rate limiting, or automatic lockout policies).

### OAuth (Login via Hugging Face)

Gradio natively supports OAuth login via Hugging Face. In other words, you can easily add a _"Sign in with Hugging Face"_ button to your demo, which allows you to get a user's HF username as well as other information from their HF profile. Check out [this Space](https://huggingface.co/spaces/Wauplin/gradio-oauth-demo) for a live demo.

To enable OAuth, you must set `hf_oauth: true` as a Space metadata in your README.md file. This will register your Space
as an OAuth application on Hugging Face. Next, you can use `gr.LoginButton` to add a login button to
your Gradio app. Once a user is logged in with their HF account, you can retrieve their profile by adding a parameter of type
`gr.OAuthProfile` to any Gradio function. The user profile will be automatically injected as a parameter value. If you want
to perform actions on behalf of the user (e.g. list user's private repos, create repo, etc.), you can retrieve the user
token by adding a parameter of type `gr.OAuthToken`. You must define which scopes you will use in your Space metadata
(see [documentation](https://huggingface.co/docs/hub/spaces-oauth#scopes) for more details).

Here is a short example:

$code_login_with_huggingface

When the user clicks on the login button, they get redirected in a new page to authorize your Space.

<center>
<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/oauth_sign_in.png" style="width:300px; max-width:80%">
</center>

Users can revoke access to their profile at any time in their [settings](https://huggingface.co/settings/connected-applications).

As seen above, OAuth features are available only when your app runs in a Space. However, you often need to test your app
locally before deploying it. To test OAuth features locally, your machine must be logged in to Hugging Face. Please run `huggingface-cli login` or set `HF_TOKEN` as environment variable with one of your access token. You can generate a new token in your settings page (https://huggingface.co/settings/tokens). Then, clicking on the `gr.LoginButton` will log in to your local Hugging Face profile, allowing you to debug your app with your Hugging Face account before deploying it to a Space.

**Security Note**: It is important to note that adding a `gr.LoginButton` does not restrict users from using your app, in the same way that adding [username-password authentication](/guides/sharing-your-app#password-protected-app) does. This means that users of your app who have not logged in with Hugging Face can still access and run events in your Gradio app -- the difference is that the `gr.OAuthProfile` or `gr.OAuthToken` will be `None` in the corresponding functions.


### OAuth (with external providers)

It is also possible to authenticate with external OAuth providers (e.g. Google OAuth) in your Gradio apps. To do this, first mount your Gradio app within a FastAPI app ([as discussed above](#mounting-within-another-fast-api-app)). Then, you must write an *authentication function*, which gets the user's username from the OAuth provider and returns it. This function should be passed to the `auth_dependency` parameter in `gr.mount_gradio_app`.

Similar to [FastAPI dependency functions](https://fastapi.tiangolo.com/tutorial/dependencies/), the function specified by `auth_dependency` will run before any Gradio-related route in your FastAPI app. The function should accept a single parameter: the FastAPI `Request` and return either a string (representing a user's username) or `None`. If a string is returned, the user will be able to access the Gradio-related routes in your FastAPI app.

First, let's show a simplistic example to illustrate the `auth_dependency` parameter:

```python
from fastapi import FastAPI, Request
import gradio as gr

app = FastAPI()

def get_user(request: Request):
    return request.headers.get("user")

demo = gr.Interface(lambda s: f"Hello {s}!", "textbox", "textbox")

app = gr.mount_gradio_app(app, demo, path="/demo", auth_dependency=get_user)

if __name__ == '__main__':
    uvicorn.run(app)
```

In this example, only requests that include a "user" header will be allowed to access the Gradio app. Of course, this does not add much security, since any user can add this header in their request.

Here's a more complete example showing how to add Google OAuth to a Gradio app (assuming you've already created OAuth Credentials on the [Google Developer Console](https://console.cloud.google.com/project)):

```python
import os
from authlib.integrations.starlette_client import OAuth, OAuthError
from fastapi import FastAPI, Depends, Request
from starlette.config import Config
from starlette.responses import RedirectResponse
from starlette.middleware.sessions import SessionMiddleware
import uvicorn
import gradio as gr

app = FastAPI()

# Replace these with your own OAuth settings
GOOGLE_CLIENT_ID = "..."
GOOGLE_CLIENT_SECRET = "..."
SECRET_KEY = "..."

config_data = {'GOOGLE_CLIENT_ID': GOOGLE_CLIENT_ID, 'GOOGLE_CLIENT_SECRET': GOOGLE_CLIENT_SECRET}
starlette_config = Config(environ=config_data)
oauth = OAuth(starlette_config)
oauth.register(
    name='google',
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'},
)

SECRET_KEY = os.environ.get('SECRET_KEY') or "a_very_secret_key"
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)

# Dependency to get the current user
def get_user(request: Request):
    user = request.session.get('user')
    if user:
        return user['name']
    return None

@app.get('/')
def public(user: dict = Depends(get_user)):
    if user:
        return RedirectResponse(url='/gradio')
    else:
        return RedirectResponse(url='/login-demo')

@app.route('/logout')
async def logout(request: Request):
    request.session.pop('user', None)
    return RedirectResponse(url='/')

@app.route('/login')
async def login(request: Request):
    redirect_uri = request.url_for('auth')
    # If your app is running on https, you should ensure that the
    # `redirect_uri` is https, e.g. uncomment the following lines:
    #
    # from urllib.parse import urlparse, urlunparse
    # redirect_uri = urlunparse(urlparse(str(redirect_uri))._replace(scheme='https'))
    return await oauth.google.authorize_redirect(request, redirect_uri)

@app.route('/auth')
async def auth(request: Request):
    try:
        access_token = await oauth.google.authorize_access_token(request)
    except OAuthError:
        return RedirectResponse(url='/')
    request.session['user'] = dict(access_token)["userinfo"]
    return RedirectResponse(url='/')

with gr.Blocks() as login_demo:
    gr.Button("Login", link="/login")

app = gr.mount_gradio_app(app, login_demo, path="/login-demo")

def greet(request: gr.Request):
    return f"Welcome to Gradio, {request.username}"

with gr.Blocks() as main_demo:
    m = gr.Markdown("Welcome to Gradio!")
    gr.Button("Logout", link="/logout")
    main_demo.load(greet, None, m)

app = gr.mount_gradio_app(app, main_demo, path="/gradio", auth_dependency=get_user)

if __name__ == '__main__':
    uvicorn.run(app)
```

There are actually two separate Gradio apps in this example! One that simply displays a log in button (this demo is accessible to any user), while the other main demo is only accessible to users that are logged in. You can try this example out on [this Space](https://huggingface.co/spaces/gradio/oauth-example).

## MCP Servers

Gradio apps can function as MCP (Model Context Protocol) servers, allowing LLMs to use your app's functions as tools. By simply setting `mcp_server=True` in the `.launch()` method, Gradio automatically converts your app's functions into MCP tools that can be called by MCP clients like Claude Desktop, Cursor, or Cline. The server exposes tools based on your function names, docstrings, and type hints, and can handle file uploads, authentication headers, and progress updates. You can also create MCP-only functions using `gr.api` and expose resources and prompts using decorators. For a comprehensive guide on building MCP servers with Gradio, see [Building an MCP Server with Gradio](https://www.gradio.app/guides/building-mcp-server-with-gradio).

## Rate Limits

When publishing your app publicly, and making it available via API or via MCP server, you might want to set rate limits to prevent users from abusing your app. You can identify users using their IP address (using the `gr.Request` object [as discussed above](#accessing-the-network-request-directly)) or, if they are logged in via Hugging Face OAuth, using their username. To see a complete example of how to set rate limits, please see [this Gradio app](https://github.com/gradio-app/gradio/blob/main/demo/rate_limit/run.py).

## Analytics

By default, Gradio collects certain analytics to help us better understand the usage of the `gradio` library. This includes the following information:

* What environment the Gradio app is running on (e.g. Colab Notebook, Hugging Face Spaces)
* What input/output components are being used in the Gradio app
* Whether the Gradio app is utilizing certain advanced features, such as `auth` or `show_error`
* The IP address which is used solely to measure the number of unique developers using Gradio
* The version of Gradio that is running

No information is collected from _users_ of your Gradio app. If you'd like to disable analytics altogether, you can do so by setting the `analytics_enabled` parameter to `False` in `gr.Blocks`, `gr.Interface`, or `gr.ChatInterface`. Or, you can set the GRADIO_ANALYTICS_ENABLED environment variable to `"False"` to apply this to all Gradio apps created across your system.

*Note*: this reflects the analytics policy as of `gradio>=4.32.0`.

## Progressive Web App (PWA)

[Progressive Web Apps (PWAs)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) are web applications that are regular web pages or websites, but can appear to the user like installable platform-specific applications.

Gradio apps can be easily served as PWAs by setting the `pwa=True` parameter in the `launch()` method. Here's an example:

```python
import gradio as gr

def greet(name):
    return "Hello " + name + "!"

demo = gr.Interface(fn=greet, inputs="textbox", outputs="textbox")

demo.launch(pwa=True)  # Launch your app as a PWA
```

This will generate a PWA that can be installed on your device. Here's how it looks:

![Installing PWA](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/install-pwa.gif)

When you specify `favicon_path` in the `launch()` method, the icon will be used as the app's icon. Here's an example:

```python
demo.launch(pwa=True, favicon_path="./hf-logo.svg")  # Use a custom icon for your PWA
```

![Custom PWA Icon](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/pwa-favicon.png)

---

<!-- Source: guides/05_chatbots/07_creating-a-slack-bot-from-a-gradio-app.md -->
# 🚀 Creating a Slack Bot from a Gradio App 🚀

Tags: CHAT, DEPLOY, SLACK

You can make your Gradio app available as a Slack bot to let users in your Slack workspace interact with it directly. 

## How does it work?

The Slack bot will listen to messages mentioning it in channels. When it receives a message (which can include text as well as files), it will send it to your Gradio app via Gradio's built-in API. Your bot will reply with the response it receives from the API. 

Because Gradio's API is very flexible, you can create Slack bots that support text, images, audio, streaming, chat history, and a wide variety of other features very easily. 

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/Screen%20Recording%202024-12-19%20at%203.30.00%E2%80%AFPM.gif)

## Prerequisites

* Install the latest version of `gradio` and the `slack-bolt` library:

```bash
pip install --upgrade gradio slack-bolt~=1.0
```

* Have a running Gradio app. This app can be running locally or on Hugging Face Spaces. In this example, we will be using the [Gradio Playground Space](https://huggingface.co/spaces/abidlabs/gradio-playground-bot), which takes in an image and/or text and generates the code to generate the corresponding Gradio app.

Now, we are ready to get started!

### 1. Create a Slack App

1. Go to [api.slack.com/apps](https://api.slack.com/apps) and click "Create New App"
2. Choose "From scratch" and give your app a name
3. Select the workspace where you want to develop your app
4. Under "OAuth & Permissions", scroll to "Scopes" and add these Bot Token Scopes:
   - `app_mentions:read`
   - `chat:write`
   - `files:read`
   - `files:write`
5. In the same "OAuth & Permissions" page, scroll back up and click the button to install the app to your workspace.
6. Note the "Bot User OAuth Token" (starts with `xoxb-`) that appears as we'll need it later
7. Click on "Socket Mode" in the menu bar. When the page loads, click the toggle to "Enable Socket Mode"
8. Give your token a name, such as `socket-token` and copy the token that is generated (starts with `xapp-`) as we'll need it later.
9. Finally, go to the "Event Subscription" option in the menu bar. Click the toggle to "Enable Events" and subscribe to the `app_mention` bot event.

### 2. Write a Slack bot

Let's start by writing a very simple Slack bot, just to make sure that everything is working. Write the following Python code in a file called `bot.py`, pasting the two tokens from step 6 and step 8 in the previous section.

```py
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler

SLACK_BOT_TOKEN = # PASTE YOUR SLACK BOT TOKEN HERE
SLACK_APP_TOKEN = # PASTE YOUR SLACK APP TOKEN HERE

app = App(token=SLACK_BOT_TOKEN)

@app.event("app_mention")
def handle_app_mention_events(body, say):
    user_id = body["event"]["user"]
    say(f"Hi <@{user_id}>! You mentioned me and said: {body['event']['text']}")

if __name__ == "__main__":
    handler = SocketModeHandler(app, SLACK_APP_TOKEN)
    handler.start()
```

If that is working, we are ready to add Gradio-specific code. We will be using the [Gradio Python Client](https://www.gradio.app/guides/getting-started-with-the-python-client) to query the Gradio Playground Space mentioned above. Here's the updated `bot.py` file:

```python
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler

SLACK_BOT_TOKEN = # PASTE YOUR SLACK BOT TOKEN HERE
SLACK_APP_TOKEN = # PASTE YOUR SLACK APP TOKEN HERE

app = App(token=SLACK_BOT_TOKEN)
gradio_client = Client("abidlabs/gradio-playground-bot")

def download_image(url, filename):
    headers = {"Authorization": f"Bearer {SLACK_BOT_TOKEN}"}
    response = httpx.get(url, headers=headers)
    image_path = f"./images/{filename}"
    os.makedirs("./images", exist_ok=True)
    with open(image_path, "wb") as f:
        f.write(response.content)
    return image_path

def slackify_message(message):   
    # Replace markdown links with slack format and remove code language specifier after triple backticks
    pattern = r'\[(.*?)\]\((.*?)\)'
    cleaned = re.sub(pattern, r'<\2|\1>', message)
    cleaned = re.sub(r'```\w+\n', '```', cleaned)
    return cleaned.strip()

@app.event("app_mention")
def handle_app_mention_events(body, say):
    # Extract the message content without the bot mention
    text = body["event"]["text"]
    bot_user_id = body["authorizations"][0]["user_id"]
    clean_message = text.replace(f"<@{bot_user_id}>", "").strip()
    
    # Handle images if present
    files = []
    if "files" in body["event"]:
        for file in body["event"]["files"]:
            if file["filetype"] in ["png", "jpg", "jpeg", "gif", "webp"]:
                image_path = download_image(file["url_private_download"], file["name"])
                files.append(handle_file(image_path))
                break
    
    # Submit to Gradio and send responses back to Slack
    for response in gradio_client.submit(
        message={"text": clean_message, "files": files},
    ):
        cleaned_response = slackify_message(response[-1])
        say(cleaned_response)

if __name__ == "__main__":
    handler = SocketModeHandler(app, SLACK_APP_TOKEN)
    handler.start()
```
### 3. Add the bot to your Slack Workplace

Now, create a new channel or navigate to an existing channel in your Slack workspace where you want to use the bot. Click the "+" button next to "Channels" in your Slack sidebar and follow the prompts to create a new channel.

Finally, invite your bot to the channel:
1. In your new channel, type `/invite @YourBotName`
2. Select your bot from the dropdown
3. Click "Invite to Channel"

### 4. That's it!

Now you can mention your bot in any channel it's in, optionally attach an image, and it will respond with generated Gradio app code!

The bot will:
1. Listen for mentions
2. Process any attached images
3. Send the text and images to your Gradio app
4. Stream the responses back to the Slack channel

This is just a basic example - you can extend it to handle more types of files, add error handling, or integrate with different Gradio apps!

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/Screen%20Recording%202024-12-19%20at%203.30.00%E2%80%AFPM.gif)

If you build a Slack bot from a Gradio app, feel free to share it on X and tag [the Gradio account](https://x.com/Gradio), and we are happy to help you amplify!

---

<!-- Source: guides/08_custom-components/07_pdf-component-example.md -->
# Case Study: A Component to Display PDFs

Let's work through an example of building a custom gradio component for displaying PDF files.
This component will come in handy for showcasing [document question answering](https://huggingface.co/models?pipeline_tag=document-question-answering&sort=trending) models, which typically work on PDF input.
This is a sneak preview of what our finished component will look like:

![demo](https://gradio-builds.s3.amazonaws.com/assets/PDFDisplay.png)

## Step 0: Prerequisites
Make sure you have gradio 5.0 or higher installed as well as node 20+.
As of the time of publication, the latest release is 4.1.1.
Also, please read the [Five Minute Tour](./custom-components-in-five-minutes) of custom components and the [Key Concepts](./key-component-concepts) guide before starting.


## Step 1: Creating the custom component

Navigate to a directory of your choosing and run the following command:

```bash
gradio cc create PDF
```


Tip: You should change the name of the component.
Some of the screenshots assume the component is called `PDF` but the concepts are the same!

This will create a subdirectory called `pdf` in your current working directory.
There are three main subdirectories in `pdf`: `frontend`, `backend`, and `demo`.
If you open `pdf` in your code editor, it will look like this:

![directory structure](https://gradio-builds.s3.amazonaws.com/assets/pdf-guide/CodeStructure.png)

Tip: For this demo we are not templating off a current gradio component. But you can see the list of available templates with `gradio cc show` and then pass the template name to the `--template` option, e.g. `gradio cc create <Name> --template <foo>`

## Step 2: Frontend - modify javascript dependencies

We're going to use the [pdfjs](https://mozilla.github.io/pdf.js/) javascript library to display the pdfs in the frontend. 
Let's start off by adding it to our frontend project's dependencies, as well as adding a couple of other projects we'll need.

From within the `frontend` directory, run `npm install @gradio/client @gradio/upload @gradio/icons @gradio/button` and `npm install --save-dev pdfjs-dist@3.11.174`.
Also, let's uninstall the `@zerodevx/svelte-json-view` dependency by running `npm uninstall @zerodevx/svelte-json-view`.

The complete `package.json` should look like this:

```json
{
  "name": "gradio_pdf",
  "version": "0.2.0",
  "description": "Gradio component for displaying PDFs",
  "type": "module",
  "author": "",
  "license": "ISC",
  "private": false,
  "main_changeset": true,
  "exports": {
    ".": "./Index.svelte",
    "./example": "./Example.svelte",
    "./package.json": "./package.json"
  },
  "devDependencies": {
    "pdfjs-dist": "3.11.174"
  },
  "dependencies": {
    "@gradio/atoms": "0.2.0",
    "@gradio/statustracker": "0.3.0",
    "@gradio/utils": "0.2.0",
    "@gradio/client": "0.7.1",
    "@gradio/upload": "0.3.2",
    "@gradio/icons": "0.2.0",
    "@gradio/button": "0.2.3",
    "pdfjs-dist": "3.11.174"
  }
}
```


Tip: Running `npm install` will install the latest version of the package available. You can install a specific version with `npm install package@<version>`.  You can find all of the gradio javascript package documentation [here](https://www.gradio.app/main/docs/js). It is recommended you use the same versions as me as the API can change.

Navigate to `Index.svelte` and delete mentions of `JSONView`

```ts
import { JsonView } from "@zerodevx/svelte-json-view";
```

```svelte
<JsonView json={value} />
```

## Step 3: Frontend - Launching the Dev Server

Run the `dev` command to launch the development server.
This will open the demo in `demo/app.py` in an environment where changes to the `frontend` and `backend` directories will reflect instantaneously in the launched app.

After launching the dev server, you should see a link printed to your console that says `Frontend Server (Go here): ... `.
 
![](https://gradio-builds.s3.amazonaws.com/assets/pdf-guide/dev_server_terminal.png)

You should see the following:

![](https://gradio-builds.s3.amazonaws.com/assets/pdf-guide/frontend_start.png)


Its not impressive yet but we're ready to start coding!

## Step 4: Frontend - The basic skeleton

We're going to start off by first writing the skeleton of our frontend and then adding the pdf rendering logic.
Add the following imports and expose the following properties to the top of your file in the `<script>` tag.
You may get some warnings from your code editor that some props are not used.
That's ok.

```ts
    import { tick } from "svelte";
    import type { Gradio } from "@gradio/utils";
    import { Block, BlockLabel } from "@gradio/atoms";
    import { File } from "@gradio/icons";
    import { StatusTracker } from "@gradio/statustracker";
    import type { LoadingStatus } from "@gradio/statustracker";
    import type { FileData } from "@gradio/client";
    import { Upload, ModifyUpload } from "@gradio/upload";

	export let elem_id = "";
	export let elem_classes: string[] = [];
	export let visible = true;
	export let value: FileData | null = null;
	export let container = true;
	export let scale: number | null = null;
	export let root: string;
	export let height: number | null = 500;
	export let label: string;
	export let proxy_url: string;
	export let min_width: number | undefined = undefined;
	export let loading_status: LoadingStatus;
	export let gradio: Gradio<{
		change: never;
		upload: never;
	}>;

    let _value = value;
    let old_value = _value;
```


Tip: The `gradio`` object passed in here contains some metadata about the application as well as some utility methods. One of these utilities is a dispatch method. We want to dispatch change and upload events whenever our PDF is changed or updated. This line provides type hints that these are the only events we will be dispatching.

We want our frontend component to let users upload a PDF document if there isn't one already loaded.
If it is loaded, we want to display it underneath a "clear" button that lets our users upload a new document. 
We're going to use the `Upload` and `ModifyUpload` components that come with the `@gradio/upload` package to do this.
Underneath the `</script>` tag, delete all the current code and add the following:

```svelte
<Block {visible} {elem_id} {elem_classes} {container} {scale} {min_width}>
    {#if loading_status}
        <StatusTracker
            autoscroll={gradio.autoscroll}
            i18n={gradio.i18n}
            {...loading_status}
        />
    {/if}
    <BlockLabel
        show_label={label !== null}
        Icon={File}
        float={value === null}
        label={label || "File"}
    />
    {#if _value}
        <ModifyUpload i18n={gradio.i18n} absolute />
    {:else}
        <Upload
            filetype={"application/pdf"}
            file_count="single"
            {root}
        >
            Upload your PDF
        </Upload>
    {/if}
</Block>
```

You should see the following when you navigate to your app after saving your current changes:

![](https://gradio-builds.s3.amazonaws.com/assets/pdf-guide/frontend_1.png)

## Step 5: Frontend - Nicer Upload Text

The `Upload your PDF` text looks a bit small and barebones. 
Lets customize it!

Create a new file called `PdfUploadText.svelte` and copy the following code.
Its creating a new div to display our "upload text" with some custom styling.

Tip: Notice that we're leveraging Gradio core's existing css variables here: `var(--size-60)` and `var(--body-text-color-subdued)`. This allows our component to work nicely in light mode and dark mode, as well as with Gradio's built-in themes.


```svelte
<script lang="ts">
	import { Upload as UploadIcon } from "@gradio/icons";
	export let hovered = false;

</script>

<div class="wrap">
	<span class="icon-wrap" class:hovered><UploadIcon /> </span>
    Drop PDF
    <span class="or">- or -</span>
    Click to Upload
</div>

<style>
	.wrap {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: var(--size-60);
		color: var(--block-label-text-color);
		line-height: var(--line-md);
		height: 100%;
		padding-top: var(--size-3);
	}

	.or {
		color: var(--body-text-color-subdued);
		display: flex;
	}

	.icon-wrap {
		width: 30px;
		margin-bottom: var(--spacing-lg);
	}

	@media (--screen-md) {
		.wrap {
			font-size: var(--text-lg);
		}
	}

	.hovered {
		color: var(--color-accent);
	}
</style>
```

Now import `PdfUploadText.svelte` in your `<script>` and pass it to the `Upload` component!

```svelte
	import PdfUploadText from "./PdfUploadText.svelte";

...

    <Upload
        filetype={"application/pdf"}
        file_count="single"
        {root}
    >
        <PdfUploadText />
    </Upload>
```

After saving your code, the frontend should now look like this:

![](https://gradio-builds.s3.amazonaws.com/assets/pdf-guide/better_upload.png)

## Step 6: PDF Rendering logic

This is the most advanced javascript part.
It took me a while to figure it out!
Do not worry if you have trouble, the important thing is to not be discouraged 💪
Ask for help in the gradio [discord](https://discord.gg/hugging-face-879548962464493619) if you need and ask for help.

With that out of the way, let's start off by importing `pdfjs` and loading the code of the pdf worker from the mozilla cdn.

```ts
	import pdfjsLib from "pdfjs-dist";
    ...
    pdfjsLib.GlobalWorkerOptions.workerSrc =  "https://cdn.bootcss.com/pdf.js/3.11.174/pdf.worker.js";
```

Also create the following variables:

```ts
    let pdfDoc;
    let numPages = 1;
    let currentPage = 1;
    let canvasRef;
```

Now, we will use `pdfjs` to render a given page of the PDF onto an `html` document.
Add the following code to `Index.svelte`:

```ts
    async function get_doc(value: FileData) {
        const loadingTask = pdfjsLib.getDocument(value.url);
        pdfDoc = await loadingTask.promise;
        numPages = pdfDoc.numPages;
        render_page();
    }

    function render_page() {
    // Render a specific page of the PDF onto the canvas
        pdfDoc.getPage(currentPage).then(page => {
            const ctx  = canvasRef.getContext('2d')
            ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
            let viewport = page.getViewport({ scale: 1 });
            let scale = height / viewport.height;
            viewport = page.getViewport({ scale: scale });

            const renderContext = {
                canvasContext: ctx,
                viewport,
            };
            canvasRef.width = viewport.width;
            canvasRef.height = viewport.height;
            page.render(renderContext);
        });
    }

    // If the value changes, render the PDF of the currentPage
    $: if(JSON.stringify(old_value) != JSON.stringify(_value)) {
        if (_value){
            get_doc(_value);
        }
        old_value = _value;
        gradio.dispatch("change");
    }
```


Tip: The `$:` syntax in svelte is how you declare statements to be reactive. Whenever any of the inputs of the statement change, svelte will automatically re-run that statement.

Now place the `canvas` underneath the `ModifyUpload` component:

```svelte
<div class="pdf-canvas" style="height: {height}px">
    <canvas bind:this={canvasRef}></canvas>
</div>
```

And add the following styles to the `<style>` tag:

```svelte
<style>
    .pdf-canvas {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
```

## Step 7: Handling The File Upload And Clear

Now for the fun part - actually rendering the PDF when the file is uploaded!
Add the following functions to the `<script>` tag:

```ts
    async function handle_clear() {
        _value = null;
        await tick();
        gradio.dispatch("change");
    }

    async function handle_upload({detail}: CustomEvent<FileData>): Promise<void> {
        value = detail;
        await tick();
        gradio.dispatch("change");
        gradio.dispatch("upload");
    }
```


Tip: The `gradio.dispatch` method is actually what is triggering the `change` or `upload` events in the backend. For every event defined in the component's backend, we will explain how to do this in Step 9, there must be at least one `gradio.dispatch("<event-name>")` call. These are called `gradio` events and they can be listended from the entire Gradio application. You can dispatch a built-in `svelte` event with the `dispatch` function. These events can only be listened to from the component's direct parent. Learn about svelte events from the [official documentation](https://learn.svelte.dev/tutorial/component-events).

Now we will run these functions whenever the `Upload` component uploads a file and whenever the `ModifyUpload` component clears the current file. The `<Upload>` component dispatches a `load` event with a payload of type `FileData` corresponding to the uploaded file. The `on:load` syntax tells `Svelte` to automatically run this function in response to the event.

```svelte
    <ModifyUpload i18n={gradio.i18n} on:clear={handle_clear} absolute />
    
    ...
    
    <Upload
        on:load={handle_upload}
        filetype={"application/pdf"}
        file_count="single"
        {root}
    >
        <PdfUploadText/>
    </Upload>
```

Congratulations! You have a working pdf uploader!

![upload-gif](https://gradio-builds.s3.amazonaws.com/assets/pdf-guide/pdf_component_gif_docs.gif)

## Step 8: Adding buttons to navigate pages

If a user uploads a PDF document with multiple pages, they will only be able to see the first one.
Let's add some buttons to help them navigate the page.
We will use the `BaseButton` from `@gradio/button` so that they look like regular Gradio buttons.

Import the `BaseButton` and add the following functions that will render the next and previous page of the PDF.

```ts
    import { BaseButton } from "@gradio/button";

    ...

    function next_page() {
        if (currentPage >= numPages) {
            return;
        }
        currentPage++;
        render_page();
    }

    function prev_page() {
        if (currentPage == 1) {
            return;
        }
        currentPage--;
        render_page();
    }
```

Now we will add them underneath the canvas in a separate `<div>`

```svelte
    ...

    <ModifyUpload i18n={gradio.i18n} on:clear={handle_clear} absolute />
    <div class="pdf-canvas" style="height: {height}px">
        <canvas bind:this={canvasRef}></canvas>
    </div>
    <div class="button-row">
        <BaseButton on:click={prev_page}>
            ⬅️
        </BaseButton>
        <span class="page-count"> {currentPage} / {numPages} </span>
        <BaseButton on:click={next_page}>
            ➡️
        </BaseButton>
    </div>
    
    ...

<style>
    .button-row {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: center;
        align-items: center;
    }

    .page-count {
        margin: 0 10px;
        font-family: var(--font-mono);
    }
```

Congratulations! The frontend is almost complete 🎉

![multipage-pdf-gif](https://gradio-builds.s3.amazonaws.com/assets/pdf-guide/pdf_multipage.gif)

## Step 8.5: The Example view

We're going to want users of our component to get a preview of the PDF if its used as an `example` in a `gr.Interface` or `gr.Examples`.

To do so, we're going to add some of the pdf rendering logic in `Index.svelte` to `Example.svelte`.


```svelte
<script lang="ts">
	export let value: string;
	export let type: "gallery" | "table";
	export let selected = false;
	import pdfjsLib from "pdfjs-dist";
	pdfjsLib.GlobalWorkerOptions.workerSrc =  "https://cdn.bootcss.com/pdf.js/3.11.174/pdf.worker.js";
	
	let pdfDoc;
	let canvasRef;

	async function get_doc(url: string) {
		const loadingTask = pdfjsLib.getDocument(url);
		pdfDoc = await loadingTask.promise;
		renderPage();
		}

	function renderPage() {
		// Render a specific page of the PDF onto the canvas
			pdfDoc.getPage(1).then(page => {
				const ctx  = canvasRef.getContext('2d')
				ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
				
				const viewport = page.getViewport({ scale: 0.2 });
				
				const renderContext = {
					canvasContext: ctx,
					viewport
				};
				canvasRef.width = viewport.width;
				canvasRef.height = viewport.height;
				page.render(renderContext);
			});
		}
	
	$: get_doc(value);
</script>

<div
	class:table={type === "table"}
	class:gallery={type === "gallery"}
	class:selected
	style="justify-content: center; align-items: center; display: flex; flex-direction: column;"
>
	<canvas bind:this={canvasRef}></canvas>
</div>

<style>
	.gallery {
		padding: var(--size-1) var(--size-2);
	}
</style>
```


Tip: Exercise for the reader - reduce the code duplication between `Index.svelte` and `Example.svelte` 😊


You will not be able to render examples until we make some changes to the backend code in the next step!

## Step 9: The backend

The backend changes needed are smaller.
We're almost done!

What we're going to do is:
* Add `change` and `upload` events to our component.
* Add a `height` property to let users control the height of the PDF.
* Set the `data_model` of our component to be `FileData`. This is so that Gradio can automatically cache and safely serve any files that are processed by our component.
* Modify the `preprocess` method to return a string corresponding to the path of our uploaded PDF.
* Modify the `postprocess` to turn a path to a PDF created in an event handler to a `FileData`.

When all is said an done, your component's backend code should look like this:

```python
from __future__ import annotations
from typing import Any, Callable, TYPE_CHECKING

from gradio.components.base import Component
from gradio.data_classes import FileData
from gradio import processing_utils
if TYPE_CHECKING:
    from gradio.components import Timer

class PDF(Component):

    EVENTS = ["change", "upload"]

    data_model = FileData

    def __init__(self, value: Any = None, *,
                 height: int | None = None,
                 label: str | I18nData | None = None,
                 info: str | I18nData | None = None,
                 show_label: bool | None = None,
                 container: bool = True,
                 scale: int | None = None,
                 min_width: int | None = None,
                 interactive: bool | None = None,
                 visible: bool = True,
                 elem_id: str | None = None,
                 elem_classes: list[str] | str | None = None,
                 render: bool = True,
                 load_fn: Callable[..., Any] | None = None,
                 every: Timer | float | None = None):
        super().__init__(value, label=label, info=info,
                         show_label=show_label, container=container,
                         scale=scale, min_width=min_width,
                         interactive=interactive, visible=visible,
                         elem_id=elem_id, elem_classes=elem_classes,
                         render=render, load_fn=load_fn, every=every)
        self.height = height

    def preprocess(self, payload: FileData) -> str:
        return payload.path

    def postprocess(self, value: str | None) -> FileData:
        if not value:
            return None
        return FileData(path=value)

    def example_payload(self):
        return "https://gradio-builds.s3.amazonaws.com/assets/pdf-guide/fw9.pdf"

    def example_value(self):
        return "https://gradio-builds.s3.amazonaws.com/assets/pdf-guide/fw9.pdf"
```

## Step 10: Add a demo and publish!

To test our backend code, let's add a more complex demo that performs Document Question and Answering with huggingface transformers.

In our `demo` directory, create a `requirements.txt` file with the following packages

```
torch
transformers
pdf2image
pytesseract
```


Tip: Remember to install these yourself and restart the dev server! You may need to install extra non-python dependencies for `pdf2image`. See [here](https://pypi.org/project/pdf2image/). Feel free to write your own demo if you have trouble.


```python
import gradio as gr
from gradio_pdf import PDF
from pdf2image import convert_from_path
from transformers import pipeline
from pathlib import Path

dir_ = Path(__file__).parent

p = pipeline(
    "document-question-answering",
    model="impira/layoutlm-document-qa",
)

def qa(question: str, doc: str) -> str:
    img = convert_from_path(doc)[0]
    output = p(img, question)
    return sorted(output, key=lambda x: x["score"], reverse=True)[0]['answer']


demo = gr.Interface(
    qa,
    [gr.Textbox(label="Question"), PDF(label="Document")],
    gr.Textbox(),
)

demo.launch()
```

See our demo in action below!

<video autoplay muted loop>
  <source src="https://gradio-builds.s3.amazonaws.com/assets/pdf-guide/PDFDemo.mov" type="video/mp4" />
</video>

Finally lets build our component with `gradio cc build` and publish it with the `gradio cc publish` command!
This will guide you through the process of uploading your component to [PyPi](https://pypi.org/) and [HuggingFace Spaces](https://huggingface.co/spaces).


Tip: You may need to add the following lines to the `Dockerfile` of your HuggingFace Space.

```Dockerfile
RUN mkdir -p /tmp/cache/
RUN chmod a+rwx -R /tmp/cache/
RUN apt-get update && apt-get install -y poppler-utils tesseract-ocr

ENV TRANSFORMERS_CACHE=/tmp/cache/
```

## Conclusion

In order to use our new component in **any** gradio 4.0 app, simply install it with pip, e.g. `pip install gradio-pdf`. Then you can use it like the built-in `gr.File()` component (except that it will only accept and display PDF files).

Here is a simple demo with the Blocks api:

```python
import gradio as gr
from gradio_pdf import PDF

with gr.Blocks() as demo:
    pdf = PDF(label="Upload a PDF", interactive=True)
    name = gr.Textbox()
    pdf.upload(lambda f: f, pdf, name)

demo.launch()
```


I hope you enjoyed this tutorial!
The complete source code for our component is [here](https://huggingface.co/spaces/freddyaboulton/gradio_pdf/tree/main/src).
Please don't hesitate to reach out to the gradio community on the [HuggingFace Discord](https://discord.gg/hugging-face-879548962464493619) if you get stuck.

---

<!-- Source: guides/09_gradio-clients-and-lite/07_fastapi-app-with-the-gradio-client.md -->
# Building a Web App with the Gradio Python Client

Tags: CLIENT, API, WEB APP

In this blog post, we will demonstrate how to use the `gradio_client` [Python library](getting-started-with-the-python-client/), which enables developers to make requests to a Gradio app programmatically, by creating an end-to-end example web app using FastAPI. The web app we will be building is called "Acapellify," and it will allow users to upload video files as input and return a version of that video without instrumental music. It will also display a gallery of generated videos.

**Prerequisites**

Before we begin, make sure you are running Python 3.9 or later, and have the following libraries installed:

- `gradio_client`
- `fastapi`
- `uvicorn`

You can install these libraries from `pip`:

```bash
$ pip install gradio_client fastapi uvicorn
```

You will also need to have ffmpeg installed. You can check to see if you already have ffmpeg by running in your terminal:

```bash
$ ffmpeg version
```

Otherwise, install ffmpeg [by following these instructions](https://www.hostinger.com/tutorials/how-to-install-ffmpeg).

## Step 1: Write the Video Processing Function

Let's start with what seems like the most complex bit -- using machine learning to remove the music from a video.

Luckily for us, there's an existing Space we can use to make this process easier: [https://huggingface.co/spaces/abidlabs/music-separation](https://huggingface.co/spaces/abidlabs/music-separation). This Space takes an audio file and produces two separate audio files: one with the instrumental music and one with all other sounds in the original clip. Perfect to use with our client!

Open a new Python file, say `main.py`, and start by importing the `Client` class from `gradio_client` and connecting it to this Space:

```py
from gradio_client import Client, handle_file

client = Client("abidlabs/music-separation")

def acapellify(audio_path):
    result = client.predict(handle_file(audio_path), api_name="/predict")
    return result[0]
```

That's all the code that's needed -- notice that the API endpoints returns two audio files (one without the music, and one with just the music) in a list, and so we just return the first element of the list.

---

**Note**: since this is a public Space, there might be other users using this Space as well, which might result in a slow experience. You can duplicate this Space with your own [Hugging Face token](https://huggingface.co/settings/tokens) and create a private Space that only you have will have access to and bypass the queue. To do that, simply replace the first two lines above with:

```py
from gradio_client import Client

client = Client.duplicate("abidlabs/music-separation", token=YOUR_HF_TOKEN)
```

Everything else remains the same!

---

Now, of course, we are working with video files, so we first need to extract the audio from the video files. For this, we will be using the `ffmpeg` library, which does a lot of heavy lifting when it comes to working with audio and video files. The most common way to use `ffmpeg` is through the command line, which we'll call via Python's `subprocess` module:

Our video processing workflow will consist of three steps:

1. First, we start by taking in a video filepath and extracting the audio using `ffmpeg`.
2. Then, we pass in the audio file through the `acapellify()` function above.
3. Finally, we combine the new audio with the original video to produce a final acapellified video.

Here's the complete code in Python, which you can add to your `main.py` file:

```python
import subprocess

def process_video(video_path):
    old_audio = os.path.basename(video_path).split(".")[0] + ".m4a"
    subprocess.run(['ffmpeg', '-y', '-i', video_path, '-vn', '-acodec', 'copy', old_audio])

    new_audio = acapellify(old_audio)

    new_video = f"acap_{video_path}"
    subprocess.call(['ffmpeg', '-y', '-i', video_path, '-i', new_audio, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-strict', 'experimental', f"static/{new_video}"])
    return new_video
```

You can read up on [ffmpeg documentation](https://ffmpeg.org/ffmpeg.html) if you'd like to understand all of the command line parameters, as they are beyond the scope of this tutorial.

## Step 2: Create a FastAPI app (Backend Routes)

Next up, we'll create a simple FastAPI app. If you haven't used FastAPI before, check out [the great FastAPI docs](https://fastapi.tiangolo.com/). Otherwise, this basic template, which we add to `main.py`, will look pretty familiar:

```python
import os
from fastapi import FastAPI, File, UploadFile, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()
os.makedirs("static", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

videos = []

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse(
        "home.html", {"request": request, "videos": videos})

@app.post("/uploadvideo/")
async def upload_video(video: UploadFile = File(...)):
    video_path = video.filename
    with open(video_path, "wb+") as fp:
        fp.write(video.file.read())

    new_video = process_video(video.filename)
    videos.append(new_video)
    return RedirectResponse(url='/', status_code=303)
```

In this example, the FastAPI app has two routes: `/` and `/uploadvideo/`.

The `/` route returns an HTML template that displays a gallery of all uploaded videos.

The `/uploadvideo/` route accepts a `POST` request with an `UploadFile` object, which represents the uploaded video file. The video file is "acapellified" via the `process_video()` method, and the output video is stored in a list which stores all of the uploaded videos in memory.

Note that this is a very basic example and if this were a production app, you will need to add more logic to handle file storage, user authentication, and security considerations.

## Step 3: Create a FastAPI app (Frontend Template)

Finally, we create the frontend of our web application. First, we create a folder called `templates` in the same directory as `main.py`. We then create a template, `home.html` inside the `templates` folder. Here is the resulting file structure:

```csv
├── main.py
├── templates
│   └── home.html
```

Write the following as the contents of `home.html`:

```html
&lt;!DOCTYPE html> &lt;html> &lt;head> &lt;title>Video Gallery&lt;/title>
&lt;style> body { font-family: sans-serif; margin: 0; padding: 0;
background-color: #f5f5f5; } h1 { text-align: center; margin-top: 30px;
margin-bottom: 20px; } .gallery { display: flex; flex-wrap: wrap;
justify-content: center; gap: 20px; padding: 20px; } .video { border: 2px solid
#ccc; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); border-radius: 5px; overflow:
hidden; width: 300px; margin-bottom: 20px; } .video video { width: 100%; height:
200px; } .video p { text-align: center; margin: 10px 0; } form { margin-top:
20px; text-align: center; } input[type="file"] { display: none; } .upload-btn {
display: inline-block; background-color: #3498db; color: #fff; padding: 10px
20px; font-size: 16px; border: none; border-radius: 5px; cursor: pointer; }
.upload-btn:hover { background-color: #2980b9; } .file-name { margin-left: 10px;
} &lt;/style> &lt;/head> &lt;body> &lt;h1>Video Gallery&lt;/h1> {% if videos %}
&lt;div class="gallery"> {% for video in videos %} &lt;div class="video">
&lt;video controls> &lt;source src="{{ url_for('static', path=video) }}"
type="video/mp4"> Your browser does not support the video tag. &lt;/video>
&lt;p>{{ video }}&lt;/p> &lt;/div> {% endfor %} &lt;/div> {% else %} &lt;p>No
videos uploaded yet.&lt;/p> {% endif %} &lt;form action="/uploadvideo/"
method="post" enctype="multipart/form-data"> &lt;label for="video-upload"
class="upload-btn">Choose video file&lt;/label> &lt;input type="file"
name="video" id="video-upload"> &lt;span class="file-name">&lt;/span> &lt;button
type="submit" class="upload-btn">Upload&lt;/button> &lt;/form> &lt;script> //
Display selected file name in the form const fileUpload =
document.getElementById("video-upload"); const fileName =
document.querySelector(".file-name"); fileUpload.addEventListener("change", (e)
=> { fileName.textContent = e.target.files[0].name; }); &lt;/script> &lt;/body>
&lt;/html>
```

## Step 4: Run your FastAPI app

Finally, we are ready to run our FastAPI app, powered by the Gradio Python Client!

Open up a terminal and navigate to the directory containing `main.py`. Then run the following command in the terminal:

```bash
$ uvicorn main:app
```

You should see an output that looks like this:

```csv
Loaded as API: https://abidlabs-music-separation.hf.space ✔
INFO:     Started server process [1360]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

And that's it! Start uploading videos and you'll get some "acapellified" videos in response (might take seconds to minutes to process depending on the length of your videos). Here's how the UI looks after uploading two videos:

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/acapellify.png)

If you'd like to learn more about how to use the Gradio Python Client in your projects, [read the dedicated Guide](/guides/getting-started-with-the-python-client/).

---

<!-- Source: guides/03_building-with-blocks/08_using-blocks-like-functions.md -->
# Using Gradio Blocks Like Functions

Tags: TRANSLATION, HUB, SPACES

**Prerequisite**: This Guide builds on the Blocks Introduction. Make sure to [read that guide first](https://gradio.app/blocks-and-event-listeners).

## Introduction

Did you know that apart from being a full-stack machine learning demo, a Gradio Blocks app is also a regular-old python function!?

This means that if you have a gradio Blocks (or Interface) app called `demo`, you can use `demo` like you would any python function.

So doing something like `output = demo("Hello", "friend")` will run the first event defined in `demo` on the inputs "Hello" and "friend" and store it
in the variable `output`.

If I put you to sleep 🥱, please bear with me! By using apps like functions, you can seamlessly compose Gradio apps.
The following section will show how.

## Treating Blocks like functions

Let's say we have the following demo that translates english text to german text.

$code_english_translator

I already went ahead and hosted it in Hugging Face spaces at [gradio/english_translator](https://huggingface.co/spaces/gradio/english_translator).

You can see the demo below as well:

$demo_english_translator

Now, let's say you have an app that generates english text, but you wanted to additionally generate german text.

You could either:

1. Copy the source code of my english-to-german translation and paste it in your app.

2. Load my english-to-german translation in your app and treat it like a normal python function.

Option 1 technically always works, but it often introduces unwanted complexity.

Option 2 lets you borrow the functionality you want without tightly coupling our apps.

All you have to do is call the `Blocks.load` class method in your source file.
After that, you can use my translation app like a regular python function!

The following code snippet and demo shows how to use `Blocks.load`.

Note that the variable `english_translator` is my english to german app, but its used in `generate_text` like a regular function.

$code_generate_english_german

$demo_generate_english_german

## How to control which function in the app to use

If the app you are loading defines more than one function, you can specify which function to use
with the `fn_index` and `api_name` parameters.

In the code for our english to german demo, you'll see the following line:

```python
translate_btn.click(translate, inputs=english, outputs=german, api_name="translate-to-german")
```

The `api_name` gives this function a unique name in our app. You can use this name to tell gradio which
function in the upstream space you want to use:

```python
english_generator(text, api_name="translate-to-german")[0]["generated_text"]
```

You can also use the `fn_index` parameter.
Imagine my app also defined an english to spanish translation function.
In order to use it in our text generation app, we would use the following code:

```python
english_generator(text, fn_index=1)[0]["generated_text"]
```

Functions in gradio spaces are zero-indexed, so since the spanish translator would be the second function in my space,
you would use index 1.

## Parting Remarks

We showed how treating a Blocks app like a regular python helps you compose functionality across different apps.
Any Blocks app can be treated like a function, but a powerful pattern is to `load` an app hosted on
[Hugging Face Spaces](https://huggingface.co/spaces) prior to treating it like a function in your own app.
You can also load models hosted on the [Hugging Face Model Hub](https://huggingface.co/models) - see the [Using Hugging Face Integrations](/using_hugging_face_integrations) guide for an example.

Happy building! ⚒️

---

<!-- Source: guides/04_additional-features/08_file-access.md -->
# Security and File Access

Sharing your Gradio app with others (by hosting it on Spaces, on your own server, or through temporary share links) **exposes** certain files on your machine to the internet. Files that are exposed can be accessed at a special URL:

```bash
http://<your-gradio-app-url>/gradio_api/file=<local-file-path>
```

This guide explains which files are exposed as well as some best practices for making sure the files on your machine are secure.

## Files Gradio allows users to access 

- **1. Static files**. You can designate static files or directories using the `gr.set_static_paths` function. Static files  are not be copied to the Gradio cache (see below) and will be served directly from your computer. This can help save disk space and reduce the time your app takes to launch but be mindful of possible security implications as any static files are accessible to all useres of your Gradio app.

- **2. Files in the `allowed_paths` parameter in `launch()`**. This parameter allows you to pass in a list of additional directories or exact filepaths you'd like to allow users to have access to. (By default, this parameter is an empty list).

- **3. Files in Gradio's cache**. After you launch your Gradio app, Gradio copies certain files into a temporary cache and makes these files accessible to users. Let's unpack this in more detail below.


## The Gradio cache

First, it's important to understand why Gradio has a cache at all. Gradio copies files to a cache directory before returning them to the frontend. This prevents files from being overwritten by one user while they are still needed by another user of your application. For example, if your prediction function returns a video file, then Gradio will move that video to the cache after your prediction function runs and returns a URL the frontend can use to show the video. Any file in the cache is available via URL to all users of your running application.

Tip: You can customize the location of the cache by setting the `GRADIO_TEMP_DIR` environment variable to an absolute path, such as `/home/usr/scripts/project/temp/`. 

### Files Gradio moves to the cache

Gradio moves three kinds of files into the cache

1. Files specified by the developer before runtime, e.g. cached examples, default values of components, or files passed into parameters such as the `avatar_images` of `gr.Chatbot`

2. File paths returned by a prediction function in your Gradio application, if they ALSO meet one of the conditions below:

* It is in the `allowed_paths` parameter of the `Blocks.launch` method.
* It is in the current working directory of the python interpreter.
* It is in the temp directory obtained by `tempfile.gettempdir()`.

**Note:** files in the current working directory whose name starts with a period (`.`) will not be moved to the cache, even if they are returned from a prediction function, since they often contain sensitive information. 

If none of these criteria are met, the prediction function that is returning that file will raise an exception instead of moving the file to cache. Gradio performs this check so that arbitrary files on your machine cannot be accessed.

3. Files uploaded by a user to your Gradio app (e.g. through the `File` or `Image` input components).

Tip: If at any time Gradio blocks a file that you would like it to process, add its path to the `allowed_paths` parameter.

## The files Gradio will not allow others to access

While running, Gradio apps will NOT ALLOW users to access:

- **Files that you explicitly block via the `blocked_paths` parameter in `launch()`**. You can pass in a list of additional directories or exact filepaths to the `blocked_paths` parameter in `launch()`. This parameter takes precedence over the files that Gradio exposes by default, or by the `allowed_paths` parameter or the `gr.set_static_paths` function.

- **Any other paths on the host machine**. Users should NOT be able to access other arbitrary paths on the host.

## Uploading Files

Sharing your Gradio application will also allow users to upload files to your computer or server. You can set a maximum file size for uploads to prevent abuse and to preserve disk space. You can do this with the `max_file_size` parameter of `.launch`. For example, the following two code snippets limit file uploads to 5 megabytes per file.

```python
import gradio as gr

demo = gr.Interface(lambda x: x, "image", "image")

demo.launch(max_file_size="5mb")
# or
demo.launch(max_file_size=5 * gr.FileSize.MB)
```

## Best Practices

* Set a `max_file_size` for your application.
* Do not return arbitrary user input from a function that is connected to a file-based output component (`gr.Image`, `gr.File`, etc.). For example, the following interface would allow anyone to move an arbitrary file in your local directory to the cache: `gr.Interface(lambda s: s, "text", "file")`. This is because the user input is treated as an arbitrary file path. 
* Make `allowed_paths` as small as possible. If a path in `allowed_paths` is a directory, any file within that directory can be accessed. Make sure the entires of `allowed_paths` only contains files related to your application.
* Run your gradio application from the same directory the application file is located in. This will narrow the scope of files Gradio will be allowed to move into the cache. For example, prefer `python app.py` to `python Users/sources/project/app.py`.


## Example: Accessing local files
Both `gr.set_static_paths` and the `allowed_paths` parameter in launch expect absolute paths. Below is a minimal example to display a local `.png` image file in an HTML block.

```txt
├── assets
│   └── logo.png
└── app.py
```
For the example directory structure, `logo.png` and any other files in the `assets` folder can be accessed from your Gradio app in `app.py` as follows:

```python
from pathlib import Path

import gradio as gr

gr.set_static_paths(paths=[Path.cwd().absolute()/"assets"])

with gr.Blocks() as demo:
    gr.HTML("<img src='/gradio_api/file=assets/logo.png'>")

demo.launch()
```

---

<!-- Source: guides/05_chatbots/08_creating-a-website-widget-from-a-gradio-chatbot.md -->
# 🚀 Creating a Website Chat Widget with Gradio 🚀

Tags: CHAT, DEPLOY, WEB

You can make your Gradio Chatbot available as an embedded chat widget on your website, similar to popular customer service widgets like Intercom. This is particularly useful for:

- Adding AI assistance to your documentation pages
- Providing interactive help on your portfolio or product website
- Creating a custom chatbot interface for your Gradio app

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/Screen%20Recording%202024-12-19%20at%203.32.46%E2%80%AFPM.gif)

## How does it work?

The chat widget appears as a small button in the corner of your website. When clicked, it opens a chat interface that communicates with your Gradio app via the JavaScript Client API. Users can ask questions and receive responses directly within the widget.


## Prerequisites

* A running Gradio app (local or on Hugging Face Spaces). In this example, we'll use the [Gradio Playground Space](https://huggingface.co/spaces/abidlabs/gradio-playground-bot), which helps generate code for Gradio apps based on natural language descriptions.

### 1. Create and Style the Chat Widget

First, add this HTML and CSS to your website:

```html
<div id="chat-widget" class="chat-widget">
    <button id="chat-toggle" class="chat-toggle">💬</button>
    <div id="chat-container" class="chat-container hidden">
        <div id="chat-header">
            <h3>Gradio Assistant</h3>
            <button id="close-chat">×</button>
        </div>
        <div id="chat-messages"></div>
        <div id="chat-input-area">
            <input type="text" id="chat-input" placeholder="Ask a question...">
            <button id="send-message">Send</button>
        </div>
    </div>
</div>

<style>
.chat-widget {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
}

.chat-toggle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #007bff;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
}

.chat-container {
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 300px;
    height: 400px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
}

.chat-container.hidden {
    display: none;
}

#chat-header {
    padding: 10px;
    background: #007bff;
    color: white;
    border-radius: 10px 10px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#chat-messages {
    flex-grow: 1;
    overflow-y: auto;
    padding: 10px;
}

#chat-input-area {
    padding: 10px;
    border-top: 1px solid #eee;
    display: flex;
}

#chat-input {
    flex-grow: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 8px;
}

.message {
    margin: 8px 0;
    padding: 8px;
    border-radius: 4px;
}

.user-message {
    background: #e9ecef;
    margin-left: 20px;
}

.bot-message {
    background: #f8f9fa;
    margin-right: 20px;
}
</style>
```

### 2. Add the JavaScript

Then, add the following JavaScript code (which uses the Gradio JavaScript Client to connect to the Space) to your website by including this in the `<head>` section of your website:

```html
<script type="module">
    import { Client } from "https://cdn.jsdelivr.net/npm/@gradio/client/dist/index.min.js";
    
    async function initChatWidget() {
        const client = await Client.connect("https://abidlabs-gradio-playground-bot.hf.space");
        
        const chatToggle = document.getElementById('chat-toggle');
        const chatContainer = document.getElementById('chat-container');
        const closeChat = document.getElementById('close-chat');
        const chatInput = document.getElementById('chat-input');
        const sendButton = document.getElementById('send-message');
        const messagesContainer = document.getElementById('chat-messages');
    
        chatToggle.addEventListener('click', () => {
            chatContainer.classList.remove('hidden');
        });
    
        closeChat.addEventListener('click', () => {
            chatContainer.classList.add('hidden');
        });
    
        async function sendMessage() {
            const userMessage = chatInput.value.trim();
            if (!userMessage) return;

            appendMessage(userMessage, 'user');
            chatInput.value = '';

            try {
                const result = await client.predict("/chat", {
                    message: {"text": userMessage, "files": []}
                });
                const message = result.data[0];
                console.log(result.data[0]);
                const botMessage = result.data[0].join('\n');
                appendMessage(botMessage, 'bot');
            } catch (error) {
                console.error('Error:', error);
                appendMessage('Sorry, there was an error processing your request.', 'bot');
            }
        }
    
        function appendMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}-message`;
            
            if (sender === 'bot') {
                messageDiv.innerHTML = marked.parse(text);
            } else {
                messageDiv.textContent = text;
            }
            
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    
        sendButton.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
    
    initChatWidget();
</script>
```

### 3. That's it!

Your website now has a chat widget that connects to your Gradio app! Users can click the chat button to open the widget and start interacting with your app.

### Customization

You can customize the appearance of the widget by modifying the CSS. Some ideas:
- Change the colors to match your website's theme
- Adjust the size and position of the widget
- Add animations for opening/closing
- Modify the message styling

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/Screen%20Recording%202024-12-19%20at%203.32.46%E2%80%AFPM.gif)

If you build a website widget from a Gradio app, feel free to share it on X and tag [the Gradio account](https://x.com/Gradio), and we are happy to help you amplify!

---

<!-- Source: guides/08_custom-components/08_multimodal-chatbot-part1.md -->
# Build a Custom Multimodal Chatbot - Part 1

This is the first in a two part series where we build a custom Multimodal Chatbot component.
In part 1, we will modify the Gradio Chatbot component to display text and media files (video, audio, image) in the same message.
In part 2, we will build a custom Textbox component that will be able to send multimodal messages (text and media files) to the chatbot.

You can follow along with the author of this post as he implements the chatbot component in the following YouTube video!

<iframe width="560" height="315" src="https://www.youtube.com/embed/IVJkOHTBPn0?si=bs-sBv43X-RVA8ly" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Here's a preview of what our multimodal chatbot component will look like:

![MultiModal Chatbot](https://gradio-builds.s3.amazonaws.com/assets/MultimodalChatbot.png)


## Part 1 - Creating our project

For this demo we will be tweaking the existing Gradio `Chatbot` component to display text and media files in the same message.
Let's create a new custom component directory by templating off of the `Chatbot` component source code.

```bash
gradio cc create MultimodalChatbot --template Chatbot
```

And we're ready to go!

Tip: Make sure to modify the `Author` key in the `pyproject.toml` file.

## Part 2a - The backend data_model

Open up the `multimodalchatbot.py` file in your favorite code editor and let's get started modifying the backend of our component.

The first thing we will do is create the `data_model` of our component.
The `data_model` is the data format that your python component will receive and send to the javascript client running the UI.
You can read more about the `data_model` in the [backend guide](./backend).

For our component, each chatbot message will consist of two keys: a `text` key that displays the text message and an optional list of media files that can be displayed underneath the text.

Import the `FileData` and `GradioModel` classes from `gradio.data_classes` and modify the existing `ChatbotData` class to look like the following:

```python
class FileMessage(GradioModel):
    file: FileData
    alt_text: Optional[str] = None


class MultimodalMessage(GradioModel):
    text: Optional[str] = None
    files: Optional[List[FileMessage]] = None


class ChatbotData(GradioRootModel):
    root: List[Tuple[Optional[MultimodalMessage], Optional[MultimodalMessage]]]


class MultimodalChatbot(Component):
    ...
    data_model = ChatbotData
```


Tip: The `data_model`s are implemented using `Pydantic V2`. Read the documentation [here](https://docs.pydantic.dev/latest/).

We've done the hardest part already!

## Part 2b - The pre and postprocess methods

For the `preprocess` method, we will keep it simple and pass a list of `MultimodalMessage`s to the python functions that use this component as input. 
This will let users of our component access the chatbot data with `.text` and `.files` attributes.
This is a design choice that you can modify in your implementation!
We can return the list of messages with the `root` property of the `ChatbotData` like so:

```python
def preprocess(
    self,
    payload: ChatbotData | None,
) -> List[MultimodalMessage] | None:
    if payload is None:
        return payload
    return payload.root
```


Tip: Learn about the reasoning behind the `preprocess` and `postprocess` methods in the [key concepts guide](./key-component-concepts)

In the `postprocess` method we will coerce each message returned by the python function to be a `MultimodalMessage` class. 
We will also clean up any indentation in the `text` field so that it can be properly displayed as markdown in the frontend.

We can leave the `postprocess` method as is and modify the `_postprocess_chat_messages`

```python
def _postprocess_chat_messages(
    self, chat_message: MultimodalMessage | dict | None
) -> MultimodalMessage | None:
    if chat_message is None:
        return None
    if isinstance(chat_message, dict):
        chat_message = MultimodalMessage(**chat_message)
    chat_message.text = inspect.cleandoc(chat_message.text or "")
    for file_ in chat_message.files:
        file_.file.mime_type = client_utils.get_mimetype(file_.file.path)
    return chat_message
```

Before we wrap up with the backend code, let's modify the `example_value` and `example_payload` method to return a valid dictionary representation of the `ChatbotData`:

```python
def example_value(self) -> Any:
    return [[{"text": "Hello!", "files": []}, None]]

def example_payload(self) -> Any:
    return [[{"text": "Hello!", "files": []}, None]]
```

Congrats - the backend is complete!

## Part 3a - The Index.svelte file

The frontend for the `Chatbot` component is divided into two parts - the `Index.svelte` file and the `shared/Chatbot.svelte` file.
The `Index.svelte` file applies some processing to the data received from the server and then delegates the rendering of the conversation to the `shared/Chatbot.svelte` file.
First we will modify the `Index.svelte` file to apply processing to the new data type the backend will return.

Let's begin by porting our custom types  from our python `data_model` to typescript.
Open `frontend/shared/utils.ts` and add the following type definitions at the top of the file:

```ts
export type FileMessage = {
	file: FileData;
	alt_text?: string;
};


export type MultimodalMessage = {
	text: string;
	files?: FileMessage[];
}
```

Now let's import them in `Index.svelte` and modify the type annotations for `value` and `_value`.

```ts
import type { FileMessage, MultimodalMessage } from "./shared/utils";

export let value: [
    MultimodalMessage | null,
    MultimodalMessage | null
][] = [];

let _value: [
    MultimodalMessage | null,
    MultimodalMessage | null
][];
```

We need to normalize each message to make sure each file has a proper URL to fetch its contents from.
We also need to format any embedded file links in the `text` key.
Let's add a `process_message` utility function and apply it whenever the `value` changes.

```ts
function process_message(msg: MultimodalMessage | null): MultimodalMessage | null {
    if (msg === null) {
        return msg;
    }
    msg.text = redirect_src_url(msg.text);
    msg.files = msg.files.map(normalize_messages);
    return msg;
}

$: _value = value
    ? value.map(([user_msg, bot_msg]) => [
            process_message(user_msg),
            process_message(bot_msg)
        ])
    : [];
```

## Part 3b - the Chatbot.svelte file

Let's begin similarly to the `Index.svelte` file and let's first modify the type annotations.
Import `Mulimodal` message at the top of the `<script>` section and use it to type the `value` and `old_value` variables.

```ts
import type { MultimodalMessage } from "./utils";

export let value:
    | [
            MultimodalMessage | null,
            MultimodalMessage | null
        ][]
    | null;
let old_value:
    | [
            MultimodalMessage | null,
            MultimodalMessage | null
        ][]
    | null = null;
```

We also need to modify the `handle_select` and `handle_like` functions:

```ts
function handle_select(
    i: number,
    j: number,
    message: MultimodalMessage | null
): void {
    dispatch("select", {
        index: [i, j],
        value: message
    });
}

function handle_like(
    i: number,
    j: number,
    message: MultimodalMessage | null,
    liked: boolean
): void {
    dispatch("like", {
        index: [i, j],
        value: message,
        liked: liked
    });
}
```

Now for the fun part, actually rendering the text and files in the same message!

You should see some code like the following that determines whether a file or a markdown message should be displayed depending on the type of the message:

```svelte
{#if typeof message === "string"}
    <Markdown
        {message}
        {latex_delimiters}
        {sanitize_html}
        {render_markdown}
        {line_breaks}
        on:load={scroll}
    />
{:else if message !== null && message.file?.mime_type?.includes("audio")}
    <audio
        data-testid="chatbot-audio"
        controls
        preload="metadata"
        ...
```

We will modify this code to always display the text message and then loop through the files and display all of them that are present:

```svelte
<Markdown
    message={message.text}
    {latex_delimiters}
    {sanitize_html}
    {render_markdown}
    {line_breaks}
    on:load={scroll}
/>
{#each message.files as file, k}
    {#if file !== null && file.file.mime_type?.includes("audio")}
        <audio
            data-testid="chatbot-audio"
            controls
            preload="metadata"
            src={file.file?.url}
            title={file.alt_text}
            on:play
            on:pause
            on:ended
        />
    {:else if message !== null && file.file?.mime_type?.includes("video")}
        <video
            data-testid="chatbot-video"
            controls
            src={file.file?.url}
            title={file.alt_text}
            preload="auto"
            on:play
            on:pause
            on:ended
        >
            <track kind="captions" />
        </video>
    {:else if message !== null && file.file?.mime_type?.includes("image")}
        <img
            data-testid="chatbot-image"
            src={file.file?.url}
            alt={file.alt_text}
        />
    {:else if message !== null && file.file?.url !== null}
        <a
            data-testid="chatbot-file"
            href={file.file?.url}
            target="_blank"
            download={window.__is_colab__
                ? null
                : file.file?.orig_name || file.file?.path}
        >
            {file.file?.orig_name || file.file?.path}
        </a>
    {:else if pending_message && j === 1}
        <Pending {layout} />
    {/if}
{/each}
```

We did it! 🎉

## Part 4 - The demo

For this tutorial, let's keep the demo simple and just display a static conversation between a hypothetical user and a bot.
This demo will show how both the user and the bot can send files. 
In part 2 of this tutorial series we will build a fully functional chatbot demo!

The demo code will look like the following:

```python
import gradio as gr
from gradio_multimodalchatbot import MultimodalChatbot
from gradio.data_classes import FileData

user_msg1 = {"text": "Hello, what is in this image?",
             "files": [{"file": FileData(path="https://gradio-builds.s3.amazonaws.com/diffusion_image/cute_dog.jpg")}]
             }
bot_msg1 = {"text": "It is a very cute dog",
            "files": []}

user_msg2 = {"text": "Describe this audio clip please.",
             "files": [{"file": FileData(path="cantina.wav")}]}
bot_msg2 = {"text": "It is the cantina song from Star Wars",
            "files": []}

user_msg3 = {"text": "Give me a video clip please.",
             "files": []}
bot_msg3 = {"text": "Here is a video clip of the world",
            "files": [{"file": FileData(path="world.mp4")},
                      {"file": FileData(path="cantina.wav")}]}

conversation = [[user_msg1, bot_msg1], [user_msg2, bot_msg2], [user_msg3, bot_msg3]]

with gr.Blocks() as demo:
    MultimodalChatbot(value=conversation, height=800)


demo.launch()
```


Tip: Change the filepaths so that they correspond to files on your machine. Also, if you are running in development mode, make sure the files are located in the top level of your custom component directory.

## Part 5 - Deploying and Conclusion

Let's build and deploy our demo with `gradio cc build` and `gradio cc deploy`!

You can check out our component deployed to [HuggingFace Spaces](https://huggingface.co/spaces/freddyaboulton/gradio_multimodalchatbot) and all of the source code is available [here](https://huggingface.co/spaces/freddyaboulton/gradio_multimodalchatbot/tree/main/src).

See you in the next installment of this series!

---

<!-- Source: guides/04_additional-features/09_multipage-apps.md -->
# Multipage Apps

Your Gradio app can support multiple pages with the `Blocks.route()` method. Here's what a multipage Gradio app generally looks like:

```python
with gr.Blocks() as demo:  # Main page
    name = gr.Textbox(label="Name")
    ...
with demo.route("Second page", "/second"):
    num = gr.Number()
    ...

demo.launch()
```

This allows you to define links to separate pages, each with a separate URL, which are  linked to the top of the Gradio app in an automatically-generated navbar. 

Here's a complete example:

$code_multipage

All of these pages will share the same backend, including the same queue.

Note: multipage apps do not support interactions between pages, e.g. an event listener on one page cannot output to a component on another page. Use `gr.Tabs()` for this type of functionality instead of pages.

**Separate Files**

For maintainability, you may want to write the code for different pages in different files. Because any Gradio Blocks can be imported and rendered inside another Blocks using the `.render()` method, you can do this as follows.

Create one main file, say `app.py` and create separate Python files for each page:

```
- app.py
- main_page.py
- second_page.py
```

The Python file corresponding to each page should consist of a regular Gradio Blocks, Interface, or ChatInterface application, e.g.

`main_page.py`

```py
import gradio as gr

with gr.Blocks() as demo:
    gr.Image()

if __name__ == "__main__":
    demo.launch()
```

`second_page.py`

```py
import gradio as gr

with gr.Blocks() as demo:
    t = gr.Textbox()
    demo.load(lambda : "Loaded", None, t)

if __name__ == "__main__":
    demo.launch()
```

In your main `app.py` file, simply import the Gradio demos from the page files and `.render()` them:

`app.py`

```py
import gradio as gr

import main_page, second_page

with gr.Blocks() as demo:
    main_page.demo.render()
with demo.route("Second Page"):
    second_page.demo.render()

if __name__ == "__main__":
    demo.launch()
```

This allows you to run each page as an independent Gradio app for testing, while also creating a single file `app.py` that serves as the entrypoint for the complete multipage app.

## Customizing the Navbar

By default, Gradio automatically generates a navigation bar for multipage apps that displays all your pages with "Home" as the title for the main page. You can customize the navbar behavior using the `gr.Navbar` component.

### Per-Page Navbar Configuration

You can have different navbar configurations for each page of your app:

```python
import gradio as gr

with gr.Blocks() as demo:
    # Navbar for the main page
    navbar = gr.Navbar(
        visible=True,
        main_page_name="Dashboard",
        value=[("About", "https://example.com/about")]
    )
    
    gr.Textbox(label="Main page content")

with demo.route("Settings"):
    # Different navbar for the Settings page
    navbar = gr.Navbar(
        visible=True,
        main_page_name="Home",
        value=[("Documentation", "https://docs.example.com")]
    )
    gr.Textbox(label="Settings page")

demo.launch()
```


**Important Notes:**
- You can have one `gr.Navbar` component per page. Each page's navbar configuration is independent.
- The `main_page_name` parameter customizes the title of the home page link in the navbar.
- The `value` parameter allows you to add additional links to the navbar, which can be internal pages or external URLs.
- If no `gr.Navbar` component is present on a page, the default navbar behavior is used (visible with "Home" as the home page title).
- You can update the navbar properties using standard Gradio event handling, just like with any other component.

Here's an example that demonstrates the last point:

$code_navbar_customization

---

<!-- Source: guides/08_custom-components/09_documenting-custom-components.md -->
# Documenting Custom Components

In 4.15, we added a  new `gradio cc docs` command to the Gradio CLI to generate rich documentation for your custom component. This command will generate documentation for users automatically, but to get the most out of it, you need to do a few things.

## How do I use it?

The documentation will be generated when running `gradio cc build`. You can pass the `--no-generate-docs` argument to turn off this behaviour.

There is also a standalone `docs` command that allows for greater customisation. If you are running this command manually it should be run _after_ the `version` in your `pyproject.toml` has been bumped but before building the component.

All arguments are optional.

```bash
gradio cc docs
  path # The directory of the custom component.
  --demo-dir # Path to the demo directory.
  --demo-name # Name of the demo file
  --space-url # URL of the Hugging Face Space to link to
  --generate-space # create a documentation space.
  --no-generate-space # do not create a documentation space
  --readme-path # Path to the README.md file.
  --generate-readme # create a REAMDE.md file
  --no-generate-readme # do not create a README.md file
  --suppress-demo-check # suppress validation checks and warnings
```

## What gets generated?

The `gradio cc docs` command will generate an interactive Gradio app and a static README file with various features. You can see an example here:

- [Gradio app deployed on Hugging Face Spaces]()
- [README.md rendered by GitHub]()

The README.md and space both have the following features:

- A description.
- Installation instructions.
- A fully functioning code snippet.
- Optional links to PyPi, GitHub, and Hugging Face Spaces.
- API documentation including:
  - An argument table for component initialisation showing types, defaults, and descriptions.
  - A description of how the component affects the user's predict function.
  - A table of events and their descriptions.
  - Any additional interfaces or classes that may be used during initialisation or in the pre- or post- processors.

Additionally, the Gradio includes:

- A live demo.
- A richer, interactive version of the parameter tables.
- Nicer styling!

## What do I need to do?

The documentation generator uses existing standards to extract the necessary information, namely Type Hints and Docstrings. There are no Gradio-specific APIs for documentation, so following best practices will generally yield the best results.

If you already use type hints and docstrings in your component source code, you don't need to do much to benefit from this feature, but there are some details that you should be aware of.

### Python version

To get the best documentation experience, you need to use Python `3.10` or greater when generating documentation. This is because some introspection features used to generate the documentation were only added in `3.10`.

### Type hints

Python type hints are used extensively to provide helpful information for users. 

<details> 
<summary> What are type hints?</summary>


If you need to become more familiar with type hints in Python, they are a simple way to express what Python types are expected for arguments and return values of functions and methods. They provide a helpful in-editor experience, aid in maintenance, and integrate with various other tools. These types can be simple primitives, like `list` `str` `bool`; they could be more compound types like `list[str]`, `str | None` or `tuple[str, float | int]`; or they can be more complex types using utility classed like [`TypedDict`](https://peps.python.org/pep-0589/#abstract).

[Read more about type hints in Python.](https://realpython.com/lessons/type-hinting/)


</details>

#### What do I need to add hints to?

You do not need to add type hints to every part of your code. For the documentation to work correctly, you will need to add type hints to the following component methods:

- `__init__` parameters should be typed.
- `postprocess` parameters and return value should be typed.
- `preprocess` parameters and return value should be typed.

If you are using `gradio cc create`, these types should already exist, but you may need to tweak them based on any changes you make.

##### `__init__`

Here, you only need to type the parameters. If you have cloned a template with `gradio` cc create`, these should already be in place. You will only need to add new hints for anything you have added or changed:

```py
def __init__(
  self,
  value: str | None = None,
  *,
  sources: Literal["upload", "microphone"] = "upload,
  every: Timer | float | None = None,
  ...
):
  ...
```

##### `preprocess` and `postprocess`

The `preprocess` and `postprocess` methods determine the value passed to the user function and the value that needs to be returned.

Even if the design of your component is primarily as an input or an output, it is worth adding type hints to both the input parameters and the return values because Gradio has no way of limiting how components can be used.

In this case, we specifically care about:

- The return type of `preprocess`.
- The input type of `postprocess`.

```py
def preprocess(
  self, payload: FileData | None # input is optional
) -> tuple[int, str] | str | None:

# user function input  is the preprocess return ▲
# user function output is the postprocess input ▼

def postprocess(
  self, value: tuple[int, str] | None
) -> FileData | bytes | None: # return is optional
  ...
```

### Docstrings

Docstrings are also used extensively to extract more meaningful, human-readable descriptions of certain parts of the API.

<details> 
<summary> What are docstrings?</summary>


If you need to become more familiar with docstrings in Python, they are a way to annotate parts of your code with human-readable decisions and explanations. They offer a rich in-editor experience like type hints, but unlike type hints, they don't have any specific syntax requirements. They are simple strings and can take almost any form. The only requirement is where they appear. Docstrings should be "a string literal that occurs as the first statement in a module, function, class, or method definition".

[Read more about Python docstrings.](https://peps.python.org/pep-0257/#what-is-a-docstring)

</details>

While docstrings don't have any syntax requirements, we need a particular structure for documentation purposes.

As with type hint, the specific information we care about is as follows:

- `__init__` parameter docstrings.
- `preprocess` return docstrings.
- `postprocess` input parameter docstrings.

Everything else is optional.

Docstrings should always take this format to be picked up by the documentation generator:

#### Classes

```py
"""
A description of the class.

This can span multiple lines and can _contain_ *markdown*.
"""
```

#### Methods and functions 

Markdown in these descriptions will not be converted into formatted text.

```py
"""
Parameters:
    param_one: A description for this parameter.
    param_two: A description for this parameter.
Returns:
    A description for this return value.
"""
```

### Events

In custom components, events are expressed as a list stored on the `events` field of the component class. While we do not need types for events, we _do_ need a human-readable description so users can understand the behaviour of the event.

To facilitate this, we must create the event in a specific way.

There are two ways to add events to a custom component.

#### Built-in events

Gradio comes with a variety of built-in events that may be enough for your component. If you are using built-in events, you do not need to do anything as they already have descriptions we can extract:

```py
from gradio.events import Events

class ParamViewer(Component):
  ...

  EVENTS = [
    Events.change,
    Events.upload,
  ]
```

#### Custom events

You can define a custom event if the built-in events are unsuitable for your use case. This is a straightforward process, but you must create the event in this way for docstrings to work correctly:

```py
from gradio.events import Events, EventListener

class ParamViewer(Component):
  ...

  EVENTS = [
    Events.change,
    EventListener(
        "bingbong",
        doc="This listener is triggered when the user does a bingbong."
      )
  ]
```

### Demo

The `demo/app.py`, often used for developing the component, generates the live demo and code snippet. The only strict rule here is that the `demo.launch()` command must be contained with a `__name__ == "__main__"` conditional as below:

```py
if __name__ == "__main__":
  demo.launch()
```

The documentation generator will scan for such a clause and error if absent. If you are _not_ launching the demo inside the `demo/app.py`, then you can pass `--suppress-demo-check` to turn off this check.

#### Demo recommendations

Although there are no additional rules, there are some best practices you should bear in mind to get the best experience from the documentation generator.

These are only guidelines, and every situation is unique, but they are sound principles to remember.

##### Keep the demo compact

Compact demos look better and make it easier for users to understand what the demo does. Try to remove as many extraneous UI elements as possible to focus the users' attention on the core use case. 

Sometimes, it might make sense to have a `demo/app.py` just for the docs and an additional, more complex app for your testing purposes. You can also create other spaces, showcasing more complex examples and linking to them from the main class docstring or the `pyproject.toml` description.

#### Keep the code concise

The 'getting started' snippet utilises the demo code, which should be as short as possible to keep users engaged and avoid confusion.

It isn't the job of the sample snippet to demonstrate the whole API; this snippet should be the shortest path to success for a new user. It should be easy to type or copy-paste and easy to understand. Explanatory comments should be brief and to the point.

#### Avoid external dependencies

As mentioned above, users should be able to copy-paste a snippet and have a fully working app. Try to avoid third-party library dependencies to facilitate this.

You should carefully consider any examples; avoiding examples that require additional files or that make assumptions about the environment is generally a good idea.

#### Ensure the `demo` directory is self-contained

Only the `demo` directory will be uploaded to Hugging Face spaces in certain instances, as the component will be installed via PyPi if possible. It is essential that this directory is self-contained and any files needed for the correct running of the demo are present.

### Additional URLs

The documentation generator will generate a few buttons, providing helpful information and links to users. They are obtained automatically in some cases, but some need to be explicitly included in the `pyproject.yaml`. 

- PyPi Version and link - This is generated automatically.
- GitHub Repository - This is populated via the `pyproject.toml`'s `project.urls.repository`.
- Hugging Face Space - This is populated via the `pyproject.toml`'s `project.urls.space`.

An example `pyproject.toml` urls section might look like this:

```toml
[project.urls]
repository = "https://github.com/user/repo-name"
space = "https://huggingface.co/spaces/user/space-name"
```

---

<!-- Source: guides/04_additional-features/10_environment-variables.md -->
# Environment Variables

Environment variables in Gradio provide a way to customize your applications and launch settings without changing the codebase. In this guide, we'll explore the key environment variables supported in Gradio and how to set them.

## Key Environment Variables

### 1. `GRADIO_SERVER_PORT`

- **Description**: Specifies the port on which the Gradio app will run.
- **Default**: `7860`
- **Example**:
  ```bash
  export GRADIO_SERVER_PORT=8000
  ```

### 2. `GRADIO_SERVER_NAME`

- **Description**: Defines the host name for the Gradio server. To make Gradio accessible from any IP address, set this to `"0.0.0.0"`
- **Default**: `"127.0.0.1"` 
- **Example**:
  ```bash
  export GRADIO_SERVER_NAME="0.0.0.0"
  ```

### 3. `GRADIO_NUM_PORTS`

- **Description**: Defines the number of ports to try when starting the Gradio server.
- **Default**: `100`
- **Example**:
  ```bash
  export GRADIO_NUM_PORTS=200
  ```

### 4. `GRADIO_ANALYTICS_ENABLED`

- **Description**: Whether Gradio should provide 
- **Default**: `"True"`
- **Options**: `"True"`, `"False"`
- **Example**:
  ```sh
  export GRADIO_ANALYTICS_ENABLED="True"
  ```

### 5. `GRADIO_DEBUG`

- **Description**: Enables or disables debug mode in Gradio. If debug mode is enabled, the main thread does not terminate allowing error messages to be printed in environments such as Google Colab.
- **Default**: `0`
- **Example**:
  ```sh
  export GRADIO_DEBUG=1
  ```

### 6. `GRADIO_FLAGGING_MODE`

- **Description**: Controls whether users can flag inputs/outputs in the Gradio interface. See [the Guide on flagging](/guides/using-flagging) for more details.
- **Default**: `"manual"`
- **Options**: `"never"`, `"manual"`, `"auto"`
- **Example**:
  ```sh
  export GRADIO_FLAGGING_MODE="never"
  ```

### 7. `GRADIO_TEMP_DIR`

- **Description**: Specifies the directory where temporary files created by Gradio are stored.
- **Default**: System default temporary directory
- **Example**:
  ```sh
  export GRADIO_TEMP_DIR="/path/to/temp"
  ```

### 8. `GRADIO_ROOT_PATH`

- **Description**: Sets the root path for the Gradio application. Useful if running Gradio [behind a reverse proxy](/guides/running-gradio-on-your-web-server-with-nginx).
- **Default**: `""`
- **Example**:
  ```sh
  export GRADIO_ROOT_PATH="/myapp"
  ```

### 9. `GRADIO_SHARE`

- **Description**: Enables or disables sharing the Gradio app.
- **Default**: `"False"`
- **Options**: `"True"`, `"False"`
- **Example**:
  ```sh
  export GRADIO_SHARE="True"
  ```

### 10. `GRADIO_ALLOWED_PATHS`

- **Description**: Sets a list of complete filepaths or parent directories that gradio is allowed to serve. Must be absolute paths. Warning: if you provide directories, any files in these directories or their subdirectories are accessible to all users of your app. Multiple items can be specified by separating items with commas.
- **Default**: `""`
- **Example**:
  ```sh
  export GRADIO_ALLOWED_PATHS="/mnt/sda1,/mnt/sda2"
  ```

### 11. `GRADIO_BLOCKED_PATHS`

- **Description**: Sets a list of complete filepaths or parent directories that gradio is not allowed to serve (i.e. users of your app are not allowed to access). Must be absolute paths. Warning: takes precedence over `allowed_paths` and all other directories exposed by Gradio by default. Multiple items can be specified by separating items with commas.
- **Default**: `""`
- **Example**:
  ```sh
  export GRADIO_BLOCKED_PATHS="/users/x/gradio_app/admin,/users/x/gradio_app/keys"
  ```

### 12. `FORWARDED_ALLOW_IPS`

- **Description**: This is not a Gradio-specific environment variable, but rather one used in server configurations, specifically `uvicorn` which is used by Gradio internally. This environment variable is useful when deploying applications behind a reverse proxy. It defines a list of IP addresses that are trusted to forward traffic to your application. When set, the application will trust the `X-Forwarded-For` header from these IP addresses to determine the original IP address of the user making the request. This means that if you use the `gr.Request` [object's](https://www.gradio.app/docs/gradio/request) `client.host` property, it will correctly get the user's IP address instead of the IP address of the reverse proxy server. Note that only trusted IP addresses (i.e. the IP addresses of your reverse proxy servers) should be added, as any server with these IP addresses can modify the `X-Forwarded-For` header and spoof the client's IP address.
- **Default**: `"127.0.0.1"`
- **Example**:
  ```sh
  export FORWARDED_ALLOW_IPS="127.0.0.1,192.168.1.100"
  ```

### 13. `GRADIO_CACHE_EXAMPLES`

- **Description**: Whether or not to cache examples by default in `gr.Interface()`, `gr.ChatInterface()` or in `gr.Examples()` when no explicit argument is passed for the `cache_examples` parameter. You can set this environment variable to either the string "true" or "false".
- **Default**: `"false"`
- **Example**:
  ```sh
  export GRADIO_CACHE_EXAMPLES="true"
  ```


### 14. `GRADIO_CACHE_MODE`

- **Description**: How to cache examples. Only applies if `cache_examples` is set to `True` either via enviornment variable or by an explicit parameter, AND no no explicit argument is passed for the `cache_mode` parameter in `gr.Interface()`, `gr.ChatInterface()` or in `gr.Examples()`. Can be set to either the strings "lazy" or "eager." If "lazy", examples are cached after their first use for all users of the app. If "eager", all examples are cached at app launch.

- **Default**: `"eager"`
- **Example**:
  ```sh
  export GRADIO_CACHE_MODE="lazy"
  ```


### 15. `GRADIO_EXAMPLES_CACHE`

- **Description**:  If you set `cache_examples=True` in `gr.Interface()`, `gr.ChatInterface()` or in `gr.Examples()`, Gradio will run your prediction function and save the results to disk. By default, this is in the `.gradio/cached_examples//` subdirectory within your app's working directory. You can customize the location of cached example files created by Gradio by setting the environment variable `GRADIO_EXAMPLES_CACHE` to an absolute path or a path relative to your working directory.
- **Default**: `".gradio/cached_examples/"`
- **Example**:
  ```sh
  export GRADIO_EXAMPLES_CACHE="custom_cached_examples/"
  ```


### 16. `GRADIO_SSR_MODE`

- **Description**: Controls whether server-side rendering (SSR) is enabled. When enabled, the initial HTML is rendered on the server rather than the client, which can improve initial page load performance and SEO.

- **Default**: `"False"` (except on Hugging Face Spaces, where this environment variable sets it to `True`)
- **Options**: `"True"`, `"False"`
- **Example**:
  ```sh
  export GRADIO_SSR_MODE="True"
  ```

### 17. `GRADIO_NODE_SERVER_NAME`

- **Description**: Defines the host name for the Gradio node server. (Only applies if `ssr_mode` is set to `True`.)
- **Default**: `GRADIO_SERVER_NAME` if it is set, otherwise `"127.0.0.1"`
- **Example**:
  ```sh
  export GRADIO_NODE_SERVER_NAME="0.0.0.0"
  ```

### 18. `GRADIO_NODE_NUM_PORTS`

- **Description**: Defines the number of ports to try when starting the Gradio node server. (Only applies if `ssr_mode` is set to `True`.)
- **Default**: `100`
- **Example**:
  ```sh
  export GRADIO_NODE_NUM_PORTS=200
  ```

### 19. `GRADIO_RESET_EXAMPLES_CACHE`

- **Description**: If set to "True", Gradio will delete and recreate the examples cache directory when the app starts instead of reusing the cached example if they already exist. 
- **Default**: `"False"`
- **Options**: `"True"`, `"False"`
- **Example**:
  ```sh
  export GRADIO_RESET_EXAMPLES_CACHE="True"
  ```

### 20. `GRADIO_CHAT_FLAGGING_MODE`

- **Description**: Controls whether users can flag messages in `gr.ChatInterface` applications. Similar to `GRADIO_FLAGGING_MODE` but specifically for chat interfaces.
- **Default**: `"never"`
- **Options**: `"never"`, `"manual"`
- **Example**:
  ```sh
  export GRADIO_CHAT_FLAGGING_MODE="manual"
  ```

### 21. `GRADIO_WATCH_DIRS`

- **Description**: Specifies directories to watch for file changes when running Gradio in development mode. When files in these directories change, the Gradio app will automatically reload. Multiple directories can be specified by separating them with commas. This is primarily used by the `gradio` CLI command for development workflows.
- **Default**: `""`
- **Example**:
  ```sh
  export GRADIO_WATCH_DIRS="/path/to/src,/path/to/templates"
  ```

### 22. `GRADIO_VIBE_MODE`

- **Description**: Enables the Vibe editor mode, which provides an in-browser chat that can be used to write or edit your Gradio app using natural language. When enabled, anyone who can access the Gradio endpoint can modify files and run arbitrary code on the host machine. Use with extreme caution in production environments.
- **Default**: `""`
- **Options**: Any non-empty string enables the mode
- **Example**:
  ```sh
  export GRADIO_VIBE_MODE="1"
  ```

### 23. `GRADIO_MCP_SERVER`

- **Description**: Enables the MCP (Model Context Protocol) server functionality in Gradio. When enabled, the Gradio app will be set up as an MCP server and documented functions will be added as MCP tools that can be used by LLMs. This allows LLMs to interact with your Gradio app's functionality through the MCP protocol.
- **Default**: `"False"`
- **Options**: `"True"`, `"False"`
- **Example**:
  ```sh
  export GRADIO_MCP_SERVER="True"
  ```





## How to Set Environment Variables

To set environment variables in your terminal, use the `export` command followed by the variable name and its value. For example:

```sh
export GRADIO_SERVER_PORT=8000
```

If you're using a `.env` file to manage your environment variables, you can add them like this:

```sh
GRADIO_SERVER_PORT=8000
GRADIO_SERVER_NAME="localhost"
```

Then, use a tool like `dotenv` to load these variables when running your application.

---

<!-- Source: guides/04_additional-features/11_resource-cleanup.md -->
# Resource Cleanup

Your Gradio application may create resources during its lifetime.
Examples of resources are `gr.State` variables, any variables you create and explicitly hold in memory, or files you save to disk. 
Over time, these resources can use up all of your server's RAM or disk space and crash your application.

Gradio provides some tools for you to clean up the resources created by your app:

1. Automatic deletion of `gr.State` variables.
2. Automatic cache cleanup with the `delete_cache` parameter.
2. The `Blocks.unload` event.

Let's take a look at each of them individually.

## Automatic deletion of `gr.State`

When a user closes their browser tab, Gradio will automatically delete any `gr.State` variables associated with that user session after 60 minutes. If the user connects again within those 60 minutes, no state will be deleted.

You can control the deletion behavior further with the following two parameters of `gr.State`:

1. `delete_callback` - An arbitrary function that will be called when the variable is deleted. This function must take the state value as input. This function is useful for deleting variables from GPU memory.
2. `time_to_live` - The number of seconds the state should be stored for after it is created or updated. This will delete variables before the session is closed, so it's useful for clearing state for potentially long running sessions.

## Automatic cache cleanup via `delete_cache`

Your Gradio application will save uploaded and generated files to a special directory called the cache directory. Gradio uses a hashing scheme to ensure that duplicate files are not saved to the cache but over time the size of the cache will grow (especially if your app goes viral 😉).

Gradio can periodically clean up the cache for you if you specify the `delete_cache` parameter of `gr.Blocks()`, `gr.Interface()`, or `gr.ChatInterface()`. 
This parameter is a tuple of the form `[frequency, age]` both expressed in number of seconds.
Every `frequency` seconds, the temporary files created by this Blocks instance will be deleted if more than `age` seconds have passed since the file was created. 
For example, setting this to (86400, 86400) will delete temporary files every day if they are older than a day old.
Additionally, the cache will be deleted entirely when the server restarts.

## The `unload` event

Additionally, Gradio now includes a `Blocks.unload()` event, allowing you to run arbitrary cleanup functions when users disconnect (this does not have a 60 minute delay).
Unlike other gradio events, this event does not accept inputs or outptus.
You can think of the `unload` event as the opposite of the `load` event.

## Putting it all together

The following demo uses all of these features. When a user visits the page, a special unique directory is created for that user.
As the user interacts with the app, images are saved to disk in that special directory.
When the user closes the page, the images created in that session are deleted via the `unload` event.
The state and files in the cache are cleaned up automatically as well.

$code_state_cleanup
$demo_state_cleanup

---

<!-- Source: guides/04_additional-features/12_themes.md -->
# Gradio Themes

Gradio themes are the easiest way to customize the look and feel of your app. You can choose from a variety of themes, or create your own. To do so, pass the `theme=` kwarg to the `launch()` method of `Interface`, `ChatInterface`, or `Blocks`. For example:

```python
demo = gr.Interface()
demo.launch(theme=gr.themes.Monochrome())
```

or

```python
with gr.Blocks() as demo:
    ... # your code here
demo.launch(theme=gr.themes.Soft())
    ...
```

Gradio comes with a set of prebuilt themes which you can load from `gr.themes.*`. You can extend these themes or create your own themes from scratch - see the [theming guide](https://gradio.app/guides/theming-guide) for more details.

For additional styling ability, you can pass any CSS (as well as custom JavaScript) to your Gradio application. This is discussed in more detail in our [custom JS and CSS guide](/guides/custom-CSS-and-JS).

---

<!-- Source: guides/04_additional-features/13_client-side-functions.md -->
# Client Side Functions

Gradio allows you to run certain "simple" functions directly in the browser by setting `js=True` in your event listeners. This will **automatically convert your Python code into JavaScript**, which significantly improves the responsiveness of your app by avoiding a round trip to the server for simple UI updates.

The difference in responsiveness is most noticeable on hosted applications (like Hugging Face Spaces), when the server is under heavy load, with high-latency connections, or when many users are accessing the app simultaneously.

## When to Use Client Side Functions

Client side functions are ideal for updating component properties (like visibility, placeholders, interactive state, or styling). 

Here's a basic example:

```py
import gradio as gr

with gr.Blocks() as demo:
    with gr.Row() as row:
        btn = gr.Button("Hide this row")
    
    # This function runs in the browser without a server roundtrip
    btn.click(
        lambda: gr.Row(visible=False), 
        None, 
        row, 
        js=True
    )

demo.launch()
```


## Limitations

Client side functions have some important restrictions:
* They can only update component properties (not values)
* They cannot take any inputs

Here are some functions that will work with `js=True`:

```py
# Simple property updates
lambda: gr.Textbox(lines=4)

# Multiple component updates
lambda: [gr.Textbox(lines=4), gr.Button(interactive=False)]

# Using gr.update() for property changes
lambda: gr.update(visible=True, interactive=False)
```

We are working to increase the space of functions that can be transpiled to JavaScript so that they can be run in the browser. [Follow the Groovy library for more info](https://github.com/abidlabs/groovy-transpiler).


## Complete Example

Here's a more complete example showing how client side functions can improve the user experience:

$code_todo_list_js


## Behind the Scenes

When you set `js=True`, Gradio:

1. Transpiles your Python function to JavaScript

2. Runs the function directly in the browser

3. Still sends the request to the server (for consistency and to handle any side effects)

This provides immediate visual feedback while ensuring your application state remains consistent.

---

<!-- Source: guides/04_additional-features/14_view-api-page.md -->
# API Page

You can use almost any Gradio app programmatically via the built-in API! In the footer of any Gradio app, you'll see a "Use via API" link. Clicking on the link opens up a detailed documentation page for the API that Gradio generates based on the function signatures in your Gradio app.

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/view-api-animated.gif)

## Configuring the API Page

**API endpoint names**

When you create a Gradio application, the API endpoint names are automatically generated based on the function names. You can change this by using the `api_name` parameter in `gr.Interface` or `gr.ChatInterface`. If you are using Gradio `Blocks`, you can name each event listener, like this:

```python
btn.click(add, [num1, num2], output, api_name="addition")
```

**Hiding API endpoints**

When building a complex Gradio app, you might want to hide certain API endpoints from appearing on the view API page, e.g. if they correspond to functions that simply update the UI. You can set the  `show_api` parameter to `False` in any `Blocks` event listener to achieve this, e.g. 

```python
btn.click(add, [num1, num2], output, show_api=False)
```

**Disabling API endpoints**

Hiding the API endpoint doesn't disable it. A user can still programmatically call the API endpoint if they know the name. If you want to disable an API endpoint altogether, set `api_name=False`, e.g. 

```python
btn.click(add, [num1, num2], output, api_name=False)
```

Note: setting an `api_name=False` also means that downstream apps will not be able to load your Gradio app using `gr.load()` as this function uses the Gradio API under the hood.

**Adding API endpoints**

You can also add new API routes to your Gradio application that do not correspond to events in your UI.

For example, in this Gradio application, we add a new route that adds numbers and slices a list:

```py
import gradio as gr
with gr.Blocks() as demo:
    with gr.Row():
        input = gr.Textbox()
        button = gr.Button("Submit")
    output = gr.Textbox()
    def fn(a: int, b: int, c: list[str]) -> tuple[int, str]:
        return a + b, c[a:b]
    gr.api(fn, api_name="add_and_slice")

_, url, _ = demo.launch()
```

This will create a new route `/add_and_slice` which will show up in the "view API" page. It can be programmatically called by the Python or JS Clients (discussed below) like this:

```py
from gradio_client import Client

client = Client(url)
result = client.predict(
        a=3,
        b=5,
        c=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        api_name="/add_and_slice"
)
print(result)
```

## The Clients

This API page not only lists all of the endpoints that can be used to query the Gradio app, but also shows the usage of both [the Gradio Python client](https://gradio.app/guides/getting-started-with-the-python-client/), and [the Gradio JavaScript client](https://gradio.app/guides/getting-started-with-the-js-client/). 

For each endpoint, Gradio automatically generates a complete code snippet with the parameters and their types, as well as example inputs, allowing you to immediately test an endpoint. Here's an example showing an image file input and `str` output:

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/view-api-snippet.png)


## The API Recorder 🪄

Instead of reading through the view API page, you can also use Gradio's built-in API recorder to generate the relevant code snippet. Simply click on the "API Recorder" button, use your Gradio app via the UI as you would normally, and then the API Recorder will generate the code using the Clients to recreate your all of your interactions programmatically.

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/api-recorder.gif)

## MCP Server

The API page also includes instructions on how to use the Gradio app as an Model Context Protocol (MCP) server, which is a standardized way to expose functions as tools so that they can be used by LLMs. 

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/view-api-mcp.png)

For the MCP sever, each tool, its description, and its parameters are listed, along with instructions on how to integrate with popular MCP Clients. Read more about Gradio's [MCP integration here](https://www.gradio.app/guides/building-mcp-server-with-gradio).

## OpenAPI Specification

You can access the complete OpenAPI (formerly Swagger) specification of your Gradio app's API at the endpoint `<your-gradio-app-url>/gradio_api/openapi.json`. The OpenAPI specification is a standardized, language-agnostic interface description for REST APIs that enables both humans and computers to discover and understand the capabilities of your service.

---

<!-- Source: guides/04_additional-features/15_internationalization.md -->
Tags: internationalization, i18n, language
Related spaces:

# Internationalization (i18n)

Gradio comes with ready-to-use internationalization (i18n) support:

- Built-in translations: Gradio automatically translates standard UI elements (like "Submit", "Clear", "Cancel") in more than 40 languages based on the user's browser locale.
- Custom translations: For app-specific text, Gradio provides the I18n class that lets you extend the built-in system with your own translations.

## Setting Up Translations

You can initialize the `I18n` class with multiple language dictionaries to add custom translations:

```python
import gradio as gr

# Create an I18n instance with translations for multiple languages
i18n = gr.I18n(
    en={"greeting": "Hello, welcome to my app!", "submit": "Submit"},
    es={"greeting": "¡Hola, bienvenido a mi aplicación!", "submit": "Enviar"},
    fr={"greeting": "Bonjour, bienvenue dans mon application!", "submit": "Soumettre"}
)

with gr.Blocks() as demo:
    # Use the i18n method to translate the greeting
    gr.Markdown(i18n("greeting"))
    with gr.Row():
        input_text = gr.Textbox(label="Input")
        output_text = gr.Textbox(label="Output")
    
    submit_btn = gr.Button(i18n("submit"))

# Pass the i18n instance to the launch method
demo.launch(i18n=i18n)
```

## How It Works

When you use the `i18n` instance with a translation key, Gradio will show the corresponding translation to users based on their browser's language settings or the language they've selected in your app.

If a translation isn't available for the user's locale, the system will fall back to English (if available) or display the key itself.

## Valid Locale Codes

Locale codes should follow the BCP 47 format (e.g., 'en', 'en-US', 'zh-CN'). The `I18n` class will warn you if you use an invalid locale code.

## Supported Component Properties

The following component properties typically support internationalization:

- `description`
- `info`
- `title`
- `placeholder`
- `value`
- `label`

Note that support may vary depending on the component, and some properties might have exceptions where internationalization is not applicable. You can check this by referring to the typehint for the parameter and if it contains `I18nData`, then it supports internationalization.

---

<!-- Source: guides/04_additional-features/16_custom-buttons.md -->
# Custom Buttons

Many Gradio components support custom buttons in their toolbar, allowing you to add interactive buttons that can trigger Python functions, JavaScript functions, or both. Custom buttons appear alongside built-in buttons (like "copy" or "download") in the component's toolbar.

## Basic Usage

To add custom buttons to a component, pass a list of `gr.Button()` instances to the `buttons` parameter:

```python
import gradio as gr

refresh_btn = gr.Button("Refresh", variant="secondary", size="sm")
clear_btn = gr.Button("Clear", variant="secondary", size="sm")

textbox = gr.Textbox(
    value="Sample text",
    label="Text Input",
    buttons=[refresh_btn, clear_btn]
)
```

You can also mix built-in buttons (as strings) with custom buttons:

```python
code = gr.Code(
    value="print('Hello')",
    language="python",
    buttons=["copy", "download", refresh_btn, export_btn]
)
```

## Connecting Button Events

Custom buttons work just like regular `gr.Button` components. You can connect them to Python functions or JavaScript functions using the `.click()` method:

### Python Functions

```python
def refresh_data():
    import random
    return f"Refreshed: {random.randint(1000, 9999)}"

refresh_btn.click(refresh_data, outputs=textbox)
```

### JavaScript Functions

```python
clear_btn.click(
    None,
    inputs=[],
    outputs=textbox,
    js="() => ''"
)
```

### Combined Python and JavaScript

You can use the same button for both Python and JavaScript logic:

```python
alert_btn.click(
    None,
    inputs=textbox,
    outputs=[],
    js="(text) => { alert('Text: ' + text); return []; }"
)
```

## Complete Example

Here's a complete example showing custom buttons with both Python and JavaScript functions:

$code_textbox_custom_buttons


## Notes

- Custom buttons appear in the component's toolbar, typically in the top-right corner
- Only the `value` of the Button is used, other attributes like `icon` are not used.
- Buttons are rendered in the order they appear in the `buttons` list
- Built-in buttons (like "copy", "download") can be hidden by omitting them from the list
- Custom buttons work with component events in the same way as as regular buttons

---

<!-- Source: guides/11_other-tutorials/create-immersive-demo.md -->
# Create a Real-Time Immersive Audio + Video Demo with FastRTC

Tags: REAL-TIME, IMMERSIVE, FASTRTC, VIDEO, AUDIO, STREAMING, GEMINI, WEBRTC

FastRTC is a library that lets you build low-latency real-time apps over WebRTC. In this guide, you’ll implement a fun demo where Gemini is an art critic and will critique your uploaded artwork:
- Streams your webcam and microphone to a Gemini real-time session
- Sends periodic video frames (and an optional uploaded image) to the model
- Streams back the model’s audio responses in real time
- Creates a polished full-screen Gradio `WebRTC` UI

### What you’ll build
<video autoplay loop>
  <source src="https://github.com/gradio-app/gradio/blob/main/guides/assets/art-critic.mp4?raw=true" type="video/mp4" />
</video>

### Prerequisites
- Python 3.10+
- A Gemini API key: `GEMINI_API_KEY`

Install the dependencies:

```bash
pip install "fastrtc[vad, tts]" gradio google-genai python-dotenv websockets pillow
```

## 1) Encoders for audio and images
Encoder functions to send audio as base64-encoded data and images as base64-encoded JPEG.

```python
import base64
import numpy as np
from io import BytesIO
from PIL import Image

def encode_audio(data: np.ndarray) -> dict:
    """Encode audio data (int16 mono) for Gemini."""
    return {
        "mime_type": "audio/pcm",
        "data": base64.b64encode(data.tobytes()).decode("UTF-8"),
    }

def encode_image(data: np.ndarray) -> dict:
    with BytesIO() as output_bytes:
        pil_image = Image.fromarray(data)
        pil_image.save(output_bytes, "JPEG")
        bytes_data = output_bytes.getvalue()
    base64_str = str(base64.b64encode(bytes_data), "utf-8")
    return {"mime_type": "image/jpeg", "data": base64_str}
```


## 2) Implement the Gemini audio-video handler
This handler:
- Opens a Gemini Live session on startup
- Receives streaming audio from Gemini and yields it back to the client
- Sends microphone audio as it arrives
- Sends a video frame at most once per second (to avoid flooding the API)
- Optionally sends an uploaded image (`gr.Image`) alongside the webcam frame

```python
import asyncio
import os
import time
import numpy as np
import websockets
from dotenv import load_dotenv
from google import genai
from fastrtc import AsyncAudioVideoStreamHandler, wait_for_item, WebRTCError

load_dotenv()

class GeminiHandler(AsyncAudioVideoStreamHandler):
    def __init__(self) -> None:
        super().__init__(
            "mono",
            output_sample_rate=24000,
            input_sample_rate=16000,
        )
        self.audio_queue = asyncio.Queue()
        self.video_queue = asyncio.Queue()
        self.session = None
        self.last_frame_time = 0.0
        self.quit = asyncio.Event()

    def copy(self) -> "GeminiHandler":
        return GeminiHandler()

    async def start_up(self):
        await self.wait_for_args()
        api_key = self.latest_args[3]
        hf_token = self.latest_args[4]
        if hf_token is None or hf_token == "":
            raise WebRTCError("HF Token is required")
        os.environ["HF_TOKEN"] = hf_token
        client = genai.Client(
            api_key=api_key, http_options={"api_version": "v1alpha"}
        )
        config = {"response_modalities": ["AUDIO"], "system_instruction": "You are an art critic that will critique the artwork passed in as an image to the user. Critique the artwork in a funny and lighthearted way. Be concise and to the point. Be friendly and engaging. Be helpful and informative. Be funny and lighthearted."}
        async with client.aio.live.connect(
            model="gemini-2.0-flash-exp",
            config=config,
        ) as session:
            self.session = session
            while not self.quit.is_set():
                turn = self.session.receive()
                try:
                    async for response in turn:
                        if data := response.data:
                            audio = np.frombuffer(data, dtype=np.int16).reshape(1, -1)
                        self.audio_queue.put_nowait(audio)
                except websockets.exceptions.ConnectionClosedOK:
                    print("connection closed")
                    break

    # Video: receive and (optionally) send frames to Gemini
    async def video_receive(self, frame: np.ndarray):
        self.video_queue.put_nowait(frame)
        if self.session and (time.time() - self.last_frame_time > 1.0):
            self.last_frame_time = time.time()
            await self.session.send(input=encode_image(frame))
            # If there is an uploaded image passed alongside the WebRTC component,
            # it will be available in latest_args[2]
            if self.latest_args[2] is not None:
                await self.session.send(input=encode_image(self.latest_args[2]))

    async def video_emit(self) -> np.ndarray:
        frame = await wait_for_item(self.video_queue, 0.01)
        if frame is not None:
            return frame
        # Fallback while waiting for first frame
        return np.zeros((100, 100, 3), dtype=np.uint8)

    # Audio: forward microphone audio to Gemini
    async def receive(self, frame: tuple[int, np.ndarray]) -> None:
        _, array = frame
        array = array.squeeze()  # (num_samples,)
        audio_message = encode_audio(array)
        if self.session:
            await self.session.send(input=audio_message)

    # Audio: emit Gemini’s audio back to the client
    async def emit(self):
        array = await wait_for_item(self.audio_queue, 0.01)
        if array is not None:
            return (self.output_sample_rate, array)
        return array

    async def shutdown(self) -> None:
        if self.session:
            self.quit.set()
            await self.session.close()
            self.quit.clear()
```


## 3) Setup Stream and Gradio UI
We’ll add an optional `gr.Image` input alongside the `WebRTC` component. The handler will access this in `self.latest_args[1]` when sending frames to Gemini.

```python
import gradio as gr
from fastrtc import Stream, WebRTC, get_hf_turn_credentials


stream = Stream(
    handler=GeminiHandler(),
    modality="audio-video",
    mode="send-receive",
    server_rtc_configuration=get_hf_turn_credentials(ttl=600*10000),
    rtc_configuration=get_hf_turn_credentials(),
    additional_inputs=[
        gr.Markdown(
            "## 🎨 Art Critic\n\n"
            "Provide an image of your artwork or hold it up to the webcam, and Gemini will critique it for you."
            "To get a Gemini API key, please visit the [Gemini API Key](https://aistudio.google.com/apikey) page."
            "To get an HF Token, please visit the [HF Token](https://huggingface.co/settings/tokens) page."
        ),
        gr.Image(label="Artwork", value="mona_lisa.jpg", type="numpy", sources=["upload", "clipboard"]),
        gr.Textbox(label="Gemini API Key", type="password"),
        gr.Textbox(label="HF Token", type="password"),
    ],
    ui_args={
        "icon": "https://www.gstatic.com/lamda/images/gemini_favicon_f069958c85030456e93de685481c559f160ea06b.png",
        "pulse_color": "rgb(255, 255, 255)",
        "icon_button_color": "rgb(255, 255, 255)",
        "title": "Gemini Audio Video Chat",
    },
    time_limit=90,
    concurrency_limit=5,
)

if __name__ == "__main__":
    stream.ui.launch()

```

### References
- Gemini Audio Video Chat reference code: [Hugging Face Space](https://huggingface.co/spaces/gradio/gemini-audio-video/blob/main/app.py)
- FastRTC docs: `https://fastrtc.org`
- Audio + video user guide: `https://fastrtc.org/userguide/audio-video/`
- Gradio component integration: `https://fastrtc.org/userguide/gradio/`
- Cookbook (live demos + code): `https://fastrtc.org/cookbook/`

---

<!-- Source: guides/11_other-tutorials/create-your-own-friends-with-a-gan.md -->
# Create Your Own Friends with a GAN

Related spaces: https://huggingface.co/spaces/NimaBoscarino/cryptopunks, https://huggingface.co/spaces/nateraw/cryptopunks-generator
Tags: GAN, IMAGE, HUB

Contributed by <a href="https://huggingface.co/NimaBoscarino">Nima Boscarino</a> and <a href="https://huggingface.co/nateraw">Nate Raw</a>

## Introduction

It seems that cryptocurrencies, [NFTs](https://www.nytimes.com/interactive/2022/03/18/technology/nft-guide.html), and the web3 movement are all the rage these days! Digital assets are being listed on marketplaces for astounding amounts of money, and just about every celebrity is debuting their own NFT collection. While your crypto assets [may be taxable, such as in Canada](https://www.canada.ca/en/revenue-agency/programs/about-canada-revenue-agency-cra/compliance/digital-currency/cryptocurrency-guide.html), today we'll explore some fun and tax-free ways to generate your own assortment of procedurally generated [CryptoPunks](https://www.larvalabs.com/cryptopunks).

Generative Adversarial Networks, often known just as _GANs_, are a specific class of deep-learning models that are designed to learn from an input dataset to create (_generate!_) new material that is convincingly similar to elements of the original training set. Famously, the website [thispersondoesnotexist.com](https://thispersondoesnotexist.com/) went viral with lifelike, yet synthetic, images of people generated with a model called StyleGAN2. GANs have gained traction in the machine learning world, and are now being used to generate all sorts of images, text, and even [music](https://salu133445.github.io/musegan/)!

Today we'll briefly look at the high-level intuition behind GANs, and then we'll build a small demo around a pre-trained GAN to see what all the fuss is about. Here's a [peek](https://nimaboscarino-cryptopunks.hf.space) at what we're going to be putting together.

### Prerequisites

Make sure you have the `gradio` Python package already [installed](/getting_started). To use the pretrained model, also install `torch` and `torchvision`.

## GANs: a very brief introduction

Originally proposed in [Goodfellow et al. 2014](https://arxiv.org/abs/1406.2661), GANs are made up of neural networks which compete with the intention of outsmarting each other. One network, known as the _generator_, is responsible for generating images. The other network, the _discriminator_, receives an image at a time from the generator along with a **real** image from the training data set. The discriminator then has to guess: which image is the fake?

The generator is constantly training to create images which are trickier for the discriminator to identify, while the discriminator raises the bar for the generator every time it correctly detects a fake. As the networks engage in this competitive (_adversarial!_) relationship, the images that get generated improve to the point where they become indistinguishable to human eyes!

For a more in-depth look at GANs, you can take a look at [this excellent post on Analytics Vidhya](https://www.analyticsvidhya.com/blog/2021/06/a-detailed-explanation-of-gan-with-implementation-using-tensorflow-and-keras/) or this [PyTorch tutorial](https://pytorch.org/tutorials/beginner/dcgan_faces_tutorial.html). For now, though, we'll dive into a demo!

## Step 1 — Create the Generator model

To generate new images with a GAN, you only need the generator model. There are many different architectures that the generator could use, but for this demo we'll use a pretrained GAN generator model with the following architecture:

```python
from torch import nn

class Generator(nn.Module):
    # Refer to the link below for explanations about nc, nz, and ngf
    # https://pytorch.org/tutorials/beginner/dcgan_faces_tutorial.html#inputs
    def __init__(self, nc=4, nz=100, ngf=64):
        super(Generator, self).__init__()
        self.network = nn.Sequential(
            nn.ConvTranspose2d(nz, ngf * 4, 3, 1, 0, bias=False),
            nn.BatchNorm2d(ngf * 4),
            nn.ReLU(True),
            nn.ConvTranspose2d(ngf * 4, ngf * 2, 3, 2, 1, bias=False),
            nn.BatchNorm2d(ngf * 2),
            nn.ReLU(True),
            nn.ConvTranspose2d(ngf * 2, ngf, 4, 2, 0, bias=False),
            nn.BatchNorm2d(ngf),
            nn.ReLU(True),
            nn.ConvTranspose2d(ngf, nc, 4, 2, 1, bias=False),
            nn.Tanh(),
        )

    def forward(self, input):
        output = self.network(input)
        return output
```

We're taking the generator from [this repo by @teddykoker](https://github.com/teddykoker/cryptopunks-gan/blob/main/train.py#L90), where you can also see the original discriminator model structure.

After instantiating the model, we'll load in the weights from the Hugging Face Hub, stored at [nateraw/cryptopunks-gan](https://huggingface.co/nateraw/cryptopunks-gan):

```python
from huggingface_hub import hf_hub_download
import torch

model = Generator()
weights_path = hf_hub_download('nateraw/cryptopunks-gan', 'generator.pth')
model.load_state_dict(torch.load(weights_path, map_location=torch.device('cpu'))) # Use 'cuda' if you have a GPU available
```

## Step 2 — Defining a `predict` function

The `predict` function is the key to making Gradio work! Whatever inputs we choose through the Gradio interface will get passed through our `predict` function, which should operate on the inputs and generate outputs that we can display with Gradio output components. For GANs it's common to pass random noise into our model as the input, so we'll generate a tensor of random numbers and pass that through the model. We can then use `torchvision`'s `save_image` function to save the output of the model as a `png` file, and return the file name:

```python
from torchvision.utils import save_image

def predict(seed):
    num_punks = 4
    torch.manual_seed(seed)
    z = torch.randn(num_punks, 100, 1, 1)
    punks = model(z)
    save_image(punks, "punks.png", normalize=True)
    return 'punks.png'
```

We're giving our `predict` function a `seed` parameter, so that we can fix the random tensor generation with a seed. We'll then be able to reproduce punks if we want to see them again by passing in the same seed.

_Note!_ Our model needs an input tensor of dimensions 100x1x1 to do a single inference, or (BatchSize)x100x1x1 for generating a batch of images. In this demo we'll start by generating 4 punks at a time.

## Step 3 — Creating a Gradio interface

At this point you can even run the code you have with `predict(<SOME_NUMBER>)`, and you'll find your freshly generated punks in your file system at `./punks.png`. To make a truly interactive demo, though, we'll build out a simple interface with Gradio. Our goals here are to:

- Set a slider input so users can choose the "seed" value
- Use an image component for our output to showcase the generated punks
- Use our `predict()` to take the seed and generate the images

With `gr.Interface()`, we can define all of that with a single function call:

```python
import gradio as gr

gr.Interface(
    predict,
    inputs=[
        gr.Slider(0, 1000, label='Seed', default=42),
    ],
    outputs="image",
).launch()
```


## Step 4 — Even more punks!

Generating 4 punks at a time is a good start, but maybe we'd like to control how many we want to make each time. Adding more inputs to our Gradio interface is as simple as adding another item to the `inputs` list that we pass to `gr.Interface`:

```python
gr.Interface(
    predict,
    inputs=[
        gr.Slider(0, 1000, label='Seed', default=42),
        gr.Slider(4, 64, label='Number of Punks', step=1, default=10), # Adding another slider!
    ],
    outputs="image",
).launch()
```

The new input will be passed to our `predict()` function, so we have to make some changes to that function to accept a new parameter:

```python
def predict(seed, num_punks):
    torch.manual_seed(seed)
    z = torch.randn(num_punks, 100, 1, 1)
    punks = model(z)
    save_image(punks, "punks.png", normalize=True)
    return 'punks.png'
```

When you relaunch your interface, you should see a second slider that'll let you control the number of punks!

## Step 5 - Polishing it up

Your Gradio app is pretty much good to go, but you can add a few extra things to really make it ready for the spotlight ✨

We can add some examples that users can easily try out by adding this to the `gr.Interface`:

```python
gr.Interface(
    # ...
    # keep everything as it is, and then add
    examples=[[123, 15], [42, 29], [456, 8], [1337, 35]],
).launch(cache_examples=True) # cache_examples is optional
```

The `examples` parameter takes a list of lists, where each item in the sublists is ordered in the same order that we've listed the `inputs`. So in our case, `[seed, num_punks]`. Give it a try!

You can also try adding a `title`, `description`, and `article` to the `gr.Interface`. Each of those parameters accepts a string, so try it out and see what happens 👀 `article` will also accept HTML, as [explored in a previous guide](/guides/key-features/#descriptive-content)!

When you're all done, you may end up with something like [this](https://nimaboscarino-cryptopunks.hf.space).

For reference, here is our full code:

```python
import torch
from torch import nn
from huggingface_hub import hf_hub_download
from torchvision.utils import save_image
import gradio as gr

class Generator(nn.Module):
    # Refer to the link below for explanations about nc, nz, and ngf
    # https://pytorch.org/tutorials/beginner/dcgan_faces_tutorial.html#inputs
    def __init__(self, nc=4, nz=100, ngf=64):
        super(Generator, self).__init__()
        self.network = nn.Sequential(
            nn.ConvTranspose2d(nz, ngf * 4, 3, 1, 0, bias=False),
            nn.BatchNorm2d(ngf * 4),
            nn.ReLU(True),
            nn.ConvTranspose2d(ngf * 4, ngf * 2, 3, 2, 1, bias=False),
            nn.BatchNorm2d(ngf * 2),
            nn.ReLU(True),
            nn.ConvTranspose2d(ngf * 2, ngf, 4, 2, 0, bias=False),
            nn.BatchNorm2d(ngf),
            nn.ReLU(True),
            nn.ConvTranspose2d(ngf, nc, 4, 2, 1, bias=False),
            nn.Tanh(),
        )

    def forward(self, input):
        output = self.network(input)
        return output

model = Generator()
weights_path = hf_hub_download('nateraw/cryptopunks-gan', 'generator.pth')
model.load_state_dict(torch.load(weights_path, map_location=torch.device('cpu'))) # Use 'cuda' if you have a GPU available

def predict(seed, num_punks):
    torch.manual_seed(seed)
    z = torch.randn(num_punks, 100, 1, 1)
    punks = model(z)
    save_image(punks, "punks.png", normalize=True)
    return 'punks.png'

gr.Interface(
    predict,
    inputs=[
        gr.Slider(0, 1000, label='Seed', default=42),
        gr.Slider(4, 64, label='Number of Punks', step=1, default=10),
    ],
    outputs="image",
    examples=[[123, 15], [42, 29], [456, 8], [1337, 35]],
).launch(cache_examples=True)
```

---

Congratulations! You've built out your very own GAN-powered CryptoPunks generator, with a fancy Gradio interface that makes it easy for anyone to use. Now you can [scour the Hub for more GANs](https://huggingface.co/models?other=gan) (or train your own) and continue making even more awesome demos 🤗

---

<!-- Source: guides/11_other-tutorials/creating-a-dashboard-from-bigquery-data.md -->
# Creating a Real-Time Dashboard from BigQuery Data

Tags: TABULAR, DASHBOARD, PLOTS

[Google BigQuery](https://cloud.google.com/bigquery) is a cloud-based service for processing very large data sets. It is a serverless and highly scalable data warehousing solution that enables users to analyze data [using SQL-like queries](https://www.oreilly.com/library/view/google-bigquery-the/9781492044451/ch01.html).

In this tutorial, we will show you how to query a BigQuery dataset in Python and display the data in a dashboard that updates in real time using `gradio`. The dashboard will look like this:

<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/bigquery-dashboard.gif">

We'll cover the following steps in this Guide:

1. Setting up your BigQuery credentials
2. Using the BigQuery client
3. Building the real-time dashboard (in just _7 lines of Python_)

We'll be working with the [New York Times' COVID dataset](https://www.nytimes.com/interactive/2021/us/covid-cases.html) that is available as a public dataset on BigQuery. The dataset, named `covid19_nyt.us_counties` contains the latest information about the number of confirmed cases and deaths from COVID across US counties.

**Prerequisites**: This Guide uses [Gradio Blocks](/guides/quickstart/#blocks-more-flexibility-and-control), so make your are familiar with the Blocks class.

## Setting up your BigQuery Credentials

To use Gradio with BigQuery, you will need to obtain your BigQuery credentials and use them with the [BigQuery Python client](https://pypi.org/project/google-cloud-bigquery/). If you already have BigQuery credentials (as a `.json` file), you can skip this section. If not, you can do this for free in just a couple of minutes.

1. First, log in to your Google Cloud account and go to the Google Cloud Console (https://console.cloud.google.com/)

2. In the Cloud Console, click on the hamburger menu in the top-left corner and select "APIs & Services" from the menu. If you do not have an existing project, you will need to create one.

3. Then, click the "+ Enabled APIs & services" button, which allows you to enable specific services for your project. Search for "BigQuery API", click on it, and click the "Enable" button. If you see the "Manage" button, then the BigQuery is already enabled, and you're all set.

4. In the APIs & Services menu, click on the "Credentials" tab and then click on the "Create credentials" button.

5. In the "Create credentials" dialog, select "Service account key" as the type of credentials to create, and give it a name. Also grant the service account permissions by giving it a role such as "BigQuery User", which will allow you to run queries.

6. After selecting the service account, select the "JSON" key type and then click on the "Create" button. This will download the JSON key file containing your credentials to your computer. It will look something like this:

```json
{
	"type": "service_account",
	"project_id": "your project",
	"private_key_id": "your private key id",
	"private_key": "private key",
	"client_email": "email",
	"client_id": "client id",
	"auth_uri": "https://accounts.google.com/o/oauth2/auth",
	"token_uri": "https://accounts.google.com/o/oauth2/token",
	"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
	"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/email_id"
}
```

## Using the BigQuery Client

Once you have the credentials, you will need to use the BigQuery Python client to authenticate using your credentials. To do this, you will need to install the BigQuery Python client by running the following command in the terminal:

```bash
pip install google-cloud-bigquery[pandas]
```

You'll notice that we've installed the pandas add-on, which will be helpful for processing the BigQuery dataset as a pandas dataframe. Once the client is installed, you can authenticate using your credentials by running the following code:

```py
from google.cloud import bigquery

client = bigquery.Client.from_service_account_json("path/to/key.json")
```

With your credentials authenticated, you can now use the BigQuery Python client to interact with your BigQuery datasets.

Here is an example of a function which queries the `covid19_nyt.us_counties` dataset in BigQuery to show the top 20 counties with the most confirmed cases as of the current day:

```py
import numpy as np

QUERY = (
    'SELECT * FROM `bigquery-public-data.covid19_nyt.us_counties` '
    'ORDER BY date DESC,confirmed_cases DESC '
    'LIMIT 20')

def run_query():
    query_job = client.query(QUERY)
    query_result = query_job.result()
    df = query_result.to_dataframe()
    # Select a subset of columns
    df = df[["confirmed_cases", "deaths", "county", "state_name"]]
    # Convert numeric columns to standard numpy types
    df = df.astype({"deaths": np.int64, "confirmed_cases": np.int64})
    return df
```

## Building the Real-Time Dashboard

Once you have a function to query the data, you can use the `gr.DataFrame` component from the Gradio library to display the results in a tabular format. This is a useful way to inspect the data and make sure that it has been queried correctly.

Here is an example of how to use the `gr.DataFrame` component to display the results. By passing in the `run_query` function to `gr.DataFrame`, we instruct Gradio to run the function as soon as the page loads and show the results. In addition, you also pass in the keyword `every` to tell the dashboard to refresh every hour (60\*60 seconds).

```py
import gradio as gr

with gr.Blocks() as demo:
    gr.DataFrame(run_query, every=gr.Timer(60*60))

demo.launch()
```

Perhaps you'd like to add a visualization to our dashboard. You can use the `gr.ScatterPlot()` component to visualize the data in a scatter plot. This allows you to see the relationship between different variables such as case count and case deaths in the dataset and can be useful for exploring the data and gaining insights. Again, we can do this in real-time
by passing in the `every` parameter.

Here is a complete example showing how to use the `gr.ScatterPlot` to visualize in addition to displaying data with the `gr.DataFrame`

```py
import gradio as gr

with gr.Blocks() as demo:
    gr.Markdown("# 💉 Covid Dashboard (Updated Hourly)")
    with gr.Row():
        gr.DataFrame(run_query, every=gr.Timer(60*60))
        gr.ScatterPlot(run_query, every=gr.Timer(60*60), x="confirmed_cases",
                        y="deaths", tooltip="county", width=500, height=500)

demo.queue().launch()  # Run the demo with queuing enabled
```

---

<!-- Source: guides/11_other-tutorials/creating-a-dashboard-from-supabase-data.md -->
# Create a Dashboard from Supabase Data

Tags: TABULAR, DASHBOARD, PLOTS

[Supabase](https://supabase.com/) is a cloud-based open-source backend that provides a PostgreSQL database, authentication, and other useful features for building web and mobile applications. In this tutorial, you will learn how to read data from Supabase and plot it in **real-time** on a Gradio Dashboard.

**Prerequisites:** To start, you will need a free Supabase account, which you can sign up for here: [https://app.supabase.com/](https://app.supabase.com/)

In this end-to-end guide, you will learn how to:

- Create tables in Supabase
- Write data to Supabase using the Supabase Python Client
- Visualize the data in a real-time dashboard using Gradio

If you already have data on Supabase that you'd like to visualize in a dashboard, you can skip the first two sections and go directly to [visualizing the data](#visualize-the-data-in-a-real-time-gradio-dashboard)!

## Create a table in Supabase

First of all, we need some data to visualize. Following this [excellent guide](https://supabase.com/blog/loading-data-supabase-python), we'll create fake commerce data and put it in Supabase.

1\. Start by creating a new project in Supabase. Once you're logged in, click the "New Project" button

2\. Give your project a name and database password. You can also choose a pricing plan (for our purposes, the Free Tier is sufficient!)

3\. You'll be presented with your API keys while the database spins up (can take up to 2 minutes).

4\. Click on "Table Editor" (the table icon) in the left pane to create a new table. We'll create a single table called `Product`, with the following schema:

<center>
<table>
<tr><td>product_id</td><td>int8</td></tr>
<tr><td>inventory_count</td><td>int8</td></tr>
<tr><td>price</td><td>float8</td></tr>
<tr><td>product_name</td><td>varchar</td></tr>
</table>
</center>

5\. Click Save to save the table schema.

Our table is now ready!

## Write data to Supabase

The next step is to write data to a Supabase dataset. We will use the Supabase Python library to do this.

6\. Install `supabase` by running the following command in your terminal:

```bash
pip install supabase
```

7\. Get your project URL and API key. Click the Settings (gear icon) on the left pane and click 'API'. The URL is listed in the Project URL box, while the API key is listed in Project API keys (with the tags `service_role`, `secret`)

8\. Now, run the following Python script to write some fake data to the table (note you have to put the values of `SUPABASE_URL` and `SUPABASE_SECRET_KEY` from step 7):

```python
import supabase

# Initialize the Supabase client
client = supabase.create_client('SUPABASE_URL', 'SUPABASE_SECRET_KEY')

# Define the data to write
import random

main_list = []
for i in range(10):
    value = {'product_id': i,
             'product_name': f"Item {i}",
             'inventory_count': random.randint(1, 100),
             'price': random.random()*100
            }
    main_list.append(value)

# Write the data to the table
data = client.table('Product').insert(main_list).execute()
```

Return to your Supabase dashboard and refresh the page, you should now see 10 rows populated in the `Product` table!

## Visualize the Data in a Real-Time Gradio Dashboard

Finally, we will read the data from the Supabase dataset using the same `supabase` Python library and create a realtime dashboard using `gradio`.

Note: We repeat certain steps in this section (like creating the Supabase client) in case you did not go through the previous sections. As described in Step 7, you will need the project URL and API Key for your database.

9\. Write a function that loads the data from the `Product` table and returns it as a pandas Dataframe:

```python
import supabase
import pandas as pd

client = supabase.create_client('SUPABASE_URL', 'SUPABASE_SECRET_KEY')

def read_data():
    response = client.table('Product').select("*").execute()
    df = pd.DataFrame(response.data)
    return df
```

10\. Create a small Gradio Dashboard with 2 Barplots that plots the prices and inventories of all of the items every minute and updates in real-time:

```python
import gradio as gr

with gr.Blocks() as dashboard:
    with gr.Row():
        gr.BarPlot(read_data, x="product_id", y="price", title="Prices", every=gr.Timer(60))
        gr.BarPlot(read_data, x="product_id", y="inventory_count", title="Inventory", every=gr.Timer(60))

dashboard.queue().launch()
```

Notice that by passing in a function to `gr.BarPlot()`, we have the BarPlot query the database as soon as the web app loads (and then again every 60 seconds because of the `every` parameter). Your final dashboard should look something like this:

<gradio-app space="gradio/supabase"></gradio-app>

## Conclusion

That's it! In this tutorial, you learned how to write data to a Supabase dataset, and then read that data and plot the results as bar plots. If you update the data in the Supabase database, you'll notice that the Gradio dashboard will update within a minute.

Try adding more plots and visualizations to this example (or with a different dataset) to build a more complex dashboard!

---

<!-- Source: guides/11_other-tutorials/creating-a-realtime-dashboard-from-google-sheets.md -->
# Creating a Real-Time Dashboard from Google Sheets

Tags: TABULAR, DASHBOARD, PLOTS

[Google Sheets](https://www.google.com/sheets/about/) are an easy way to store tabular data in the form of spreadsheets. With Gradio and pandas, it's easy to read data from public or private Google Sheets and then display the data or plot it. In this blog post, we'll build a small _real-time_ dashboard, one that updates when the data in the Google Sheets updates.

Building the dashboard itself will just be 9 lines of Python code using Gradio, and our final dashboard will look like this:

<gradio-app space="gradio/line-plot"></gradio-app>

**Prerequisites**: This Guide uses [Gradio Blocks](/guides/quickstart/#blocks-more-flexibility-and-control), so make you are familiar with the Blocks class.

The process is a little different depending on if you are working with a publicly accessible or a private Google Sheet. We'll cover both, so let's get started!

## Public Google Sheets

Building a dashboard from a public Google Sheet is very easy, thanks to the [`pandas` library](https://pandas.pydata.org/):

1\. Get the URL of the Google Sheets that you want to use. To do this, simply go to the Google Sheets, click on the "Share" button in the top-right corner, and then click on the "Get shareable link" button. This will give you a URL that looks something like this:

```html
https://docs.google.com/spreadsheets/d/1UoKzzRzOCt-FXLLqDKLbryEKEgllGAQUEJ5qtmmQwpU/edit#gid=0
```

2\. Now, let's modify this URL and then use it to read the data from the Google Sheets into a Pandas DataFrame. (In the code below, replace the `URL` variable with the URL of your public Google Sheet):

```python
import pandas as pd

URL = "https://docs.google.com/spreadsheets/d/1UoKzzRzOCt-FXLLqDKLbryEKEgllGAQUEJ5qtmmQwpU/edit#gid=0"
csv_url = URL.replace('/edit#gid=', '/export?format=csv&gid=')

def get_data():
    return pd.read_csv(csv_url)
```

3\. The data query is a function, which means that it's easy to display it real-time using the `gr.DataFrame` component, or plot it real-time using the `gr.LinePlot` component (of course, depending on the data, a different plot may be appropriate). To do this, just pass the function into the respective components, and set the `every` parameter based on how frequently (in seconds) you would like the component to refresh. Here's the Gradio code:

```python
import gradio as gr

with gr.Blocks() as demo:
    gr.Markdown("# 📈 Real-Time Line Plot")
    with gr.Row():
        with gr.Column():
            gr.DataFrame(get_data, every=gr.Timer(5))
        with gr.Column():
            gr.LinePlot(get_data, every=gr.Timer(5), x="Date", y="Sales", y_title="Sales ($ millions)", overlay_point=True, width=500, height=500)

demo.queue().launch()  # Run the demo with queuing enabled
```

And that's it! You have a dashboard that refreshes every 5 seconds, pulling the data from your Google Sheet.

## Private Google Sheets

For private Google Sheets, the process requires a little more work, but not that much! The key difference is that now, you must authenticate yourself to authorize access to the private Google Sheets.

### Authentication

To authenticate yourself, obtain credentials from Google Cloud. Here's [how to set up google cloud credentials](https://developers.google.com/workspace/guides/create-credentials):

1\. First, log in to your Google Cloud account and go to the Google Cloud Console (https://console.cloud.google.com/)

2\. In the Cloud Console, click on the hamburger menu in the top-left corner and select "APIs & Services" from the menu. If you do not have an existing project, you will need to create one.

3\. Then, click the "+ Enabled APIs & services" button, which allows you to enable specific services for your project. Search for "Google Sheets API", click on it, and click the "Enable" button. If you see the "Manage" button, then Google Sheets is already enabled, and you're all set.

4\. In the APIs & Services menu, click on the "Credentials" tab and then click on the "Create credentials" button.

5\. In the "Create credentials" dialog, select "Service account key" as the type of credentials to create, and give it a name. **Note down the email of the service account**

6\. After selecting the service account, select the "JSON" key type and then click on the "Create" button. This will download the JSON key file containing your credentials to your computer. It will look something like this:

```json
{
	"type": "service_account",
	"project_id": "your project",
	"private_key_id": "your private key id",
	"private_key": "private key",
	"client_email": "email",
	"client_id": "client id",
	"auth_uri": "https://accounts.google.com/o/oauth2/auth",
	"token_uri": "https://accounts.google.com/o/oauth2/token",
	"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
	"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/email_id"
}
```

### Querying

Once you have the credentials `.json` file, you can use the following steps to query your Google Sheet:

1\. Click on the "Share" button in the top-right corner of the Google Sheet. Share the Google Sheets with the email address of the service from Step 5 of authentication subsection (this step is important!). Then click on the "Get shareable link" button. This will give you a URL that looks something like this:

```html
https://docs.google.com/spreadsheets/d/1UoKzzRzOCt-FXLLqDKLbryEKEgllGAQUEJ5qtmmQwpU/edit#gid=0
```

2\. Install the [`gspread` library](https://docs.gspread.org/en/v5.7.0/), which makes it easy to work with the [Google Sheets API](https://developers.google.com/sheets/api/guides/concepts) in Python by running in the terminal: `pip install gspread`

3\. Write a function to load the data from the Google Sheet, like this (replace the `URL` variable with the URL of your private Google Sheet):

```python
import gspread
import pandas as pd

# Authenticate with Google and get the sheet
URL = 'https://docs.google.com/spreadsheets/d/1_91Vps76SKOdDQ8cFxZQdgjTJiz23375sAT7vPvaj4k/edit#gid=0'

gc = gspread.service_account("path/to/key.json")
sh = gc.open_by_url(URL)
worksheet = sh.sheet1

def get_data():
    values = worksheet.get_all_values()
    df = pd.DataFrame(values[1:], columns=values[0])
    return df

```

4\. The data query is a function, which means that it's easy to display it real-time using the `gr.DataFrame` component, or plot it real-time using the `gr.LinePlot` component (of course, depending on the data, a different plot may be appropriate). To do this, we just pass the function into the respective components, and set the `every` parameter based on how frequently (in seconds) we would like the component to refresh. Here's the Gradio code:

```python
import gradio as gr

with gr.Blocks() as demo:
    gr.Markdown("# 📈 Real-Time Line Plot")
    with gr.Row():
        with gr.Column():
            gr.DataFrame(get_data, every=gr.Timer(5))
        with gr.Column():
            gr.LinePlot(get_data, every=gr.Timer(5), x="Date", y="Sales", y_title="Sales ($ millions)", overlay_point=True, width=500, height=500)

demo.queue().launch()  # Run the demo with queuing enabled
```

You now have a Dashboard that refreshes every 5 seconds, pulling the data from your Google Sheet.

## Conclusion

And that's all there is to it! With just a few lines of code, you can use `gradio` and other libraries to read data from a public or private Google Sheet and then display and plot the data in a real-time dashboard.

---

<!-- Source: guides/11_other-tutorials/deploying-gradio-with-disco.md -->
# Self-Hosting a Gradio app with Disco

Tags: DEPLOYMENT


### Introduction

Gradio is a fantastic open-source Python library that allows you to build and share machine learning apps and demos with just a few lines of code. While Gradio offers free hosting on [Hugging Face Spaces](https://huggingface.co/spaces), you might want to deploy your app on your own server for more control, or to integrate it with other services.

This tutorial will guide you through deploying a Gradio application on your own server using [Disco](https://disco.cloud/), an open-source platform that simplifies the deployment process. With Disco, you can enjoy the benefits of self-hosting without the usual complexities of server setup and maintenance. By the end, you'll have a working Gradio app deployed on your own server with automatic HTTPS and continuous deployment from GitHub.

### Prerequisites

Before you begin, make sure you have the following:

- A server with a fresh install of Ubuntu (4GB of RAM or more is recommended). You can get one from providers like [DigitalOcean](https://www.digitalocean.com/), [Hetzner](https://www.hetzner.com/cloud) or [AWS EC2](https://aws.amazon.com/ec2/).
- A domain name that you can configure.
- A GitHub account.
- Basic knowledge of the command line.

### Step 1: Create a Server

First, you'll need a server to host your Gradio app. Choose a provider and create a new server with Ubuntu 24.04 as the operating system.

Once your server is up and running, take note of its IP address. You'll need it for the next step.

### Step 2: Configure DNS Settings

Before going further, you need to set up two domain names. Go to your domain registrar's DNS management panel and add these records:

1.  A domain for your Disco server (e.g., `disco.example.com`).
2.  A domain for your Gradio application (e.g., `gradio.example.com`).

For the server domain, create an **A record** pointing to your server's IP address:

- **Type**: A
- **Name**: disco
- **Value**: `<your_server_ip_address>`

For the application domain, create a **CNAME record** pointing to your server domain:

- **Type**: CNAME
- **Name**: gradio
- **Value**: `disco.example.com`

DNS changes can take a few minutes to propagate. You can verify that your server domain is resolving to the correct IP address by running `ping disco.example.com`

### Step 3: Test Your Server Connection

Now that your DNS is set up, let's test the SSH connection to your server from your local machine. This ensures you can access it before we hand things over to Disco.

```bash
# Replace with your server domain
ssh root@disco.example.com
```

If the connection is successful, great! **This is the last time you'll need to SSH into this server manually.** Now, exit the SSH session to return to your local machine. This is a crucial step!

```bash
exit
```

### Step 4: Install the Disco CLI on Your Local Machine

**Important:** From this point forward, all commands should be run from your **local machine's terminal**. You will not need to SSH into your server again.

Let's install the Disco command-line interface (CLI) on your local machine. This is the tool you'll use to manage your deployments.

```bash
curl https://cli-assets.letsdisco.dev/install.sh | sh
```

After the installation is complete, verify it's working by running:

```bash
disco --version
```

### Step 5: Initialize Your Server with Disco

Now, from your local machine, let's set up Disco on your server using the domain you configured.

```bash
# Replace with your server domain
disco init root@disco.example.com
```

This command will:

- Connect to your server using SSH.
- Install Docker.
- Set up the Disco server.
- Configure the initial SSL certificate.

Tip: Disco will automatically try to use your default SSH keys. If you use a non-standard key, you can specify the path with the `-i` flag, like so: `disco init -i /path/to/your/ssh/key root@disco.example.com`

### Step 6: Fork the Example Gradio App

For this tutorial, we'll use an example Gradio application. Go to this [example Gradio app repository](https://github.com/letsdiscodev/example-gradio-site) on GitHub and click the "Fork" button to create a copy of it in your own GitHub account.

### Step 7: Connect Disco to GitHub

To allow Disco to deploy your application from GitHub, you need to connect your GitHub account. Run the following command on your local machine:

```bash
disco github:apps:add
```

This command will open a browser window where you can authorize Disco with GitHub. You'll need to:

1. Give the GitHub application a name (any name will do).
2. Select the repository you just forked (`example-gradio-site`).
3. Click "Install".

### Step 8: Deploy Your Gradio App

Now you're ready to deploy your Gradio app. We'll use the `projects:add` command on your local machine. Below, replace `<your_github_username>` with your GitHub username and `gradio.example.com` with the application domain you configured earlier.

```bash
disco projects:add \
  --name gradio-app \
  --github <your_github_username>/example-gradio-site \
  --domain gradio.example.com
```

Disco will automatically pull your code from GitHub, build the Docker container, deploy it to your server, and set up HTTPS with Let's Encrypt for your domain.

### Step 9: Test Your Deployed App

Once the deployment is complete, open your web browser and navigate to your application's domain: `https://gradio.example.com`. You should see your Gradio app running live!

### Making Changes and Automatic Deployment

One of the best features of Disco is automatic deployment. Whenever you push changes to your GitHub repository, Disco will detect them, rebuild your application, and deploy it automatically.

To test this, modify the `app.py` file in your forked repository, then commit and push the changes to GitHub. Within seconds, your deployed app will be updated.

### Conclusion

Congratulations! You have successfully deployed a Gradio application on your own server using Disco. You now have a fully managed deployment pipeline with automatic HTTPS, fast deployments triggered by Git pushes, and complete control over your server and application.

This setup provides the best of both worlds: the flexibility and cost-effectiveness of self-hosting combined with the convenience of a platform-as-a-service. For more advanced configurations and features, be sure to check out the [Disco documentation](https://docs.letsdisco.dev/) and the [Gradio documentation](https://www.gradio.app/docs).

---

<!-- Source: guides/11_other-tutorials/deploying-gradio-with-docker.md -->
# Deploying a Gradio app with Docker

Tags: DEPLOYMENT, DOCKER


### Introduction

Gradio is a powerful and intuitive Python library designed for creating web apps that showcase machine learning models. These web apps can be run locally, or [deployed on Hugging Face Spaces ](https://huggingface.co/spaces)for free. Or, you can deploy them on your servers in Docker containers. Dockerizing Gradio apps offers several benefits:

- **Consistency**: Docker ensures that your Gradio app runs the same way, irrespective of where it is deployed, by packaging the application and its environment together.
- **Portability**: Containers can be easily moved across different systems or cloud environments.
- **Scalability**: Docker works well with orchestration systems like Kubernetes, allowing your app to scale up or down based on demand.

## How to Dockerize a Gradio App

Let's go through a simple example to understand how to containerize a Gradio app using Docker.

#### Step 1: Create Your Gradio App

First, we need a simple Gradio app. Let's create a Python file named `app.py` with the following content:

```python
import gradio as gr

def greet(name):
    return f"Hello {name}!"

iface = gr.Interface(fn=greet, inputs="text", outputs="text").launch()
```

This app creates a simple interface that greets the user by name.

#### Step 2: Create a Dockerfile

Next, we'll create a Dockerfile to specify how our app should be built and run in a Docker container. Create a file named `Dockerfile` in the same directory as your app with the following content:

```dockerfile
FROM python:3.10-slim

WORKDIR /usr/src/app
COPY . .
RUN pip install --no-cache-dir gradio
EXPOSE 7860
ENV GRADIO_SERVER_NAME="0.0.0.0"

CMD ["python", "app.py"]
```

This Dockerfile performs the following steps:
- Starts from a Python 3.10 slim image.
- Sets the working directory and copies the app into the container.
- Installs Gradio (you should install all other requirements as well).
- Exposes port 7860 (Gradio's default port).
- Sets the `GRADIO_SERVER_NAME` environment variable to ensure Gradio listens on all network interfaces.
- Specifies the command to run the app.

#### Step 3: Build and Run Your Docker Container

With the Dockerfile in place, you can build and run your container:

```bash
docker build -t gradio-app .
docker run -p 7860:7860 gradio-app
```

Your Gradio app should now be accessible at `http://localhost:7860`.

## Important Considerations

When running Gradio applications in Docker, there are a few important things to keep in mind:

#### Running the Gradio app on `"0.0.0.0"` and exposing port 7860

In the Docker environment, setting `GRADIO_SERVER_NAME="0.0.0.0"` as an environment variable (or directly in your Gradio app's `launch()` function) is crucial for allowing connections from outside the container. And the `EXPOSE 7860` directive in the Dockerfile tells Docker to expose Gradio's default port on the container to enable external access to the Gradio app. 

#### Enable Stickiness for Multiple Replicas

When deploying Gradio apps with multiple replicas, such as on AWS ECS, it's important to enable stickiness with `sessionAffinity: ClientIP`. This ensures that all requests from the same user are routed to the same instance. This is important because Gradio's communication protocol requires multiple separate connections from the frontend to the backend in order for events to be processed correctly. (If you use Terraform, you'll want to add a [stickiness block](https://registry.terraform.io/providers/hashicorp/aws/3.14.1/docs/resources/lb_target_group#stickiness) into your target group definition.)

#### Deploying Behind a Proxy

If you're deploying your Gradio app behind a proxy, like Nginx, it's essential to configure the proxy correctly. Gradio provides a [Guide that walks through the necessary steps](https://www.gradio.app/guides/running-gradio-on-your-web-server-with-nginx). This setup ensures your app is accessible and performs well in production environments.

---

<!-- Source: guides/11_other-tutorials/deploying-gradio-with-modal.md -->
# Deploying a Gradio app with Modal

Tags: DEPLOYMENT, MODAL


### Introduction

Gradio is a great way to test and demo your machine learning apps using a simple and intuitive Python API. When combined with Modal's developer-first cloud infrastructure, you can leverage powerful GPUs to run larger models faster. And you don't need an account with a cloud provider or any config files.

In this tutorial, we will walk you through setting up a Modal account, deploying a simple Gradio app on Modal, and discuss some of the nuance around Gradio's sticky session requirement and handling concurrency.

## Deploying a simple Gradio app on Modal
Let's deploy a Gradio-style "Hello, world" app that lets a user input their name and then responds with a short greeting. We're not going to use this code as-is in our app, but it's useful to see what the initial Gradio version looks like.

```python
import gradio as gr

# A simple Gradio interface for a greeting function
def greet(name):
    return f"Hello {name}!"

demo = gr.Interface(fn=greet, inputs="text", outputs="text")
demo.launch()
```

To deploy this app on Modal you'll need to
- define your container image,
- wrap the Gradio app in a Modal Function,
- and deploy it using Modal's CLI!

### Prerequisite: Install and set up Modal

Before you get started, you'll need to create a Modal account if you don't already have one. Then you can set up your environment by authenticating with those account credentials.

- Sign up at [modal.com](https://www.modal.com?utm_source=partner&utm_medium=github&utm_campaign=livekit). 
- Install the Modal client in your local development environment.
```bash
pip install modal
```
- Authenticate your account.
```
modal setup
```

Great, now we can start building our app!

### Step 1: Define our  `modal.Image`
To start, let's make a new file named `gradio_app.py`, import `modal`, and define our image. Modal `Images` are defined by sequentially calling methods on our `Image` instance. 

For this simple app, we'll 
- start with the `debian_slim` image,
- choose a Python version (3.12),
- and install the dependencies - only `fastapi` and `gradio`.

```python
import modal

app = modal.App("gradio-app")
web_image = modal.Image.debian_slim(python_version="3.12").uv_pip_install(
    "fastapi[standard]",
    "gradio",
)
```

Note, that you don't need to install `gradio` or `fastapi` in your local environement - only `modal` is required locally.

### Step 2: Wrap the Gradio app in a Modal-deployed FastAPI app
Like many Gradio apps, the example above is run by calling `launch()` on our demo at the end of the script. However, Modal doesn't run scripts, it runs functions - serverless functions to be exact.

To get Modal to serve our `demo`, we can leverage Gradio and Modal's support for `fastapi` apps. We do this with the `@modal.asgi_app()` function decorator which deploys the web app returned by the function. And we use the `mount_gradio_app` function to add our Gradio `demo` as a route in the web app.

```python
with web_image.imports():
	import gradio as gr
    from gradio.routes import mount_gradio_app
    from fastapi import FastAPI
     
@app.function(
    image=web_image,
    max_containers = 1, # we'll come to this later 
)
@modal.concurrent(max_inputs=100) # allow multiple users at one time
@modal.asgi_app()
def ui():
    """A simple Gradio interface for a greeting function."""
    def greet(name):
	    return f"Hello {name}!"
	
	demo = gr.Interface(fn=greet, inputs="text", outputs="text")

    return mount_gradio_app(app=FastAPI(), blocks=demo, path="/")
```

Let's quickly review what's going on here:
- We use the `Image.imports` context manager to define our imports. These will be available when your function runs in the cloud.
- We move our code inside a Python function, `ui`, and decorate it with `@app.function` which wraps it as a Modal serverless Function. We provide the image and other parameters (we'll cover this later) as inputs to the decorator.
- We add the `@modal.concurrent` decorator which allows multiple requests per container to be processed at the same time.
- We add the `@modal.asgi_app` decorator which tells Modal that this particular function is serving an ASGI app (here a `fastapi` app). To use this decorator, your ASGI app needs to be the return value from the function.

### Step 3: Deploying on Modal
To deploy the app, just run the following command:
```bash
modal deploy <path-to-file>
```

The first time you run your app, Modal will build and cache the image which, takes about 30 seconds. As long as you don't change the image, subsequent deployments will only take a few seconds.

After the image builds Modal will print the URL to your webapp and to your Modal dashboard. The webapp URL should look something like `https://{workspace}-{environment}--gradio-app-ui.modal.run`. Paste it into your web browser a try out your app!

## Important Considerations

### Sticky Sessions
Modal Functions are serverless which means that each client request is considered independent. While this facilitates autoscaling, it can also mean that extra care should be taken if your application requires any sort of server-side statefulness.

Gradio relies on a REST API, which is itself stateless. But it does require sticky sessions, meaning that every request from a particular client must be routed to the same container. However, Modal does not make any guarantees in this regard.

A simple way to satisfy this constraint is to set `max_containers = 1` in the `@app.function` decorator and setting the `max_inputs` argument of `@modal.concurrent` to a fairly large number - as we did above. This means that Modal won't spin up more than one container to serve requests to your app which effectively satisfies the sticky session requirement.

### Concurrency and Queues

Both Gradio and Modal have concepts of concurrency and queues, and getting the most of out of your compute resources requires understanding how these interact.

Modal queues client requests to each deployed Function and simultaneously executes requests up to the concurrency limit for that Function. If requests come in and the concurrency limit is already satisfied, Modal will spin up a new container - up to the maximum set for the Function. In our case, our Gradio app is represented by one Modal Function, so all requests share one queue and concurrency limit. Therefore Modal constrains the _total_ number of requests running at one time, regardless of what they are doing.

Gradio on the other hand, allows developers to utilize multiple queues each with its own concurrency limit. One or more event listeners can then be assigned to a queue which is useful to manage GPU resources for computationally expensive requests.

Thinking carefully about how these queues and limits interact can help you optimize your app's performance and resource optimization while avoiding unwanted results like shared or lost state.

### Creating a GPU Function

Another option to manage GPU utilization is to deploy your GPU computations in their own Modal Function and calling this remote Function from inside your Gradio app. This allows you to take full advantage of Modal's serverless autoscaling while routing all of the client HTTP requests to a single Gradio CPU container.

---

<!-- Source: guides/11_other-tutorials/developing-faster-with-reload-mode.md -->
# Developing Faster with Reload Mode and Vibe Mode

**Prerequisite**: This Guide requires you to know about Blocks. Make sure to [read the Guide to Blocks first](https://gradio.app/blocks-and-event-listeners).

This guide covers hot reloading, reloading in a Python IDE, and using gradio with Jupyter Notebooks.

## Why Hot Reloading?

When you are building a Gradio demo, particularly out of Blocks, you may find it cumbersome to keep re-running your code to test your changes.

To make it faster and more convenient to write your code, we've made it easier to "reload" your Gradio apps instantly when you are developing in a **Python IDE** (like VS Code, Sublime Text, PyCharm, or so on) or generally running your Python code from the terminal. We've also developed an analogous "magic command" that allows you to re-run cells faster if you use **Jupyter Notebooks** (or any similar environment like Colab).

This short Guide will cover both of these methods, so no matter how you write Python, you'll leave knowing how to build Gradio apps faster.

## Python IDE Reload 🔥

If you are building Gradio Blocks using a Python IDE, your file of code (let's name it `run.py`) might look something like this:

```python
import gradio as gr

with gr.Blocks() as demo:
    gr.Markdown("# Greetings from Gradio!")
    inp = gr.Textbox(placeholder="What is your name?")
    out = gr.Textbox()

    inp.change(fn=lambda x: f"Welcome, {x}!",
               inputs=inp,
               outputs=out)

if __name__ == "__main__":
    demo.launch()
```

The problem is that anytime that you want to make a change to your layout, events, or components, you have to close and rerun your app by writing `python run.py`.

Instead of doing this, you can run your code in **reload mode** by changing 1 word: `python` to `gradio`:

In the terminal, run `gradio run.py`. That's it!

Now, you'll see that after you'll see something like this:

```bash
Watching: '/Users/freddy/sources/gradio/gradio', '/Users/freddy/sources/gradio/demo/'

Running on local URL:  http://127.0.0.1:7860
```

The important part here is the line that says `Watching...` What's happening here is that Gradio will be observing the directory where `run.py` file lives, and if the file changes, it will automatically rerun the file for you. So you can focus on writing your code, and your Gradio demo will refresh automatically 🥳

Tip: the `gradio` command does not detect the parameters passed to the `launch()` methods because the `launch()` method is never called in reload mode. For example, setting `auth`, or `show_error` in `launch()` will not be reflected in the app.

There is one important thing to keep in mind when using the reload mode: Gradio specifically looks for a Gradio Blocks/Interface demo called `demo` in your code. If you have named your demo something else, you will need to pass in the name of your demo as the 2nd parameter in your code. So if your `run.py` file looked like this:

```python
import gradio as gr

with gr.Blocks() as my_demo:
    gr.Markdown("# Greetings from Gradio!")
    inp = gr.Textbox(placeholder="What is your name?")
    out = gr.Textbox()

    inp.change(fn=lambda x: f"Welcome, {x}!",
               inputs=inp,
               outputs=out)

if __name__ == "__main__":
    my_demo.launch()
```

Then you would launch it in reload mode like this: `gradio run.py --demo-name=my_demo`.

By default, the Gradio use UTF-8 encoding for scripts. **For reload mode**, If you are using encoding formats other than UTF-8 (such as cp1252), make sure you've done like this:

1. Configure encoding declaration of python script, for example: `# -*- coding: cp1252 -*-`
2. Confirm that your code editor has identified that encoding format. 
3. Run like this: `gradio run.py --encoding cp1252`

🔥 If your application accepts command line arguments, you can pass them in as well. Here's an example:

```python
import gradio as gr
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("--name", type=str, default="User")
args, unknown = parser.parse_known_args()

with gr.Blocks() as demo:
    gr.Markdown(f"# Greetings {args.name}!")
    inp = gr.Textbox()
    out = gr.Textbox()

    inp.change(fn=lambda x: x, inputs=inp, outputs=out)

if __name__ == "__main__":
    demo.launch()
```

Which you could run like this: `gradio run.py --name Gretel`

As a small aside, this auto-reloading happens if you change your `run.py` source code or the Gradio source code. Meaning that this can be useful if you decide to [contribute to Gradio itself](https://github.com/gradio-app/gradio/blob/main/CONTRIBUTING.md) ✅


## Controlling the Reload 🎛️

By default, reload mode will re-run your entire script for every change you make.
But there are some cases where this is not desirable.
For example, loading a machine learning model should probably only happen once to save time. There are also some Python libraries that use C or Rust extensions that throw errors when they are reloaded, like `numpy` and `tiktoken`.

In these situations, you can place code that you do not want to be re-run inside an `if gr.NO_RELOAD:`  codeblock. Here's an example of how you can use it to only load a transformers model once during the development process.

Tip: The value of `gr.NO_RELOAD` is `True`. So you don't have to change your script when you are done developing and want to run it in production. Simply run the file with `python` instead of `gradio`.

```python
import gradio as gr

if gr.NO_RELOAD:
	from transformers import pipeline
	pipe = pipeline("text-classification", model="cardiffnlp/twitter-roberta-base-sentiment-latest")

demo = gr.Interface(lambda s: {d["label"]: d["score"] for d in pipe(s)}, gr.Textbox(), gr.Label())

if __name__ == "__main__":
    demo.launch()
```

## Vibe Mode

You can also enable Gradio's **Vibe Mode**, which, which provides an in-browser chat that can be used to write or edit your Gradio app using natural language. To enable this, simply run use the `--vibe` flag with Gradio, e.g. `gradio --vibe app.py`.

Vibe Mode lets you describe commands using natural language and have an LLM write or edit the code in your Gradio app. The LLM is powered by Hugging Face's [Inference Providers](https://huggingface.co/docs/inference-providers/en/index), so you must be logged into Hugging Face locally to use this. 

Note: When Vibe Mode is enabled, anyone who can access the Gradio endpoint can modify files and run arbitrary code on the host machine. Use only for local development.

## Jupyter Notebook Magic 🔮

What about if you use Jupyter Notebooks (or Colab Notebooks, etc.) to develop code? We got something for you too!

We've developed a **magic command** that will create and run a Blocks demo for you. To use this, load the gradio extension at the top of your notebook:

`%load_ext gradio`

Then, in the cell that you are developing your Gradio demo, simply write the magic command **`%%blocks`** at the top, and then write the layout and components like you would normally:

```py
%%blocks

import gradio as gr

with gr.Blocks() as demo:
    gr.Markdown(f"# Greetings {args.name}!")
    inp = gr.Textbox()
    out = gr.Textbox()

    inp.change(fn=lambda x: x, inputs=inp, outputs=out)
```

Notice that:

- You do not need to launch your demo — Gradio does that for you automatically!

- Every time you rerun the cell, Gradio will re-render your app on the same port and using the same underlying web server. This means you'll see your changes _much, much faster_ than if you were rerunning the cell normally.

Here's what it looks like in a jupyter notebook:

![](https://gradio-builds.s3.amazonaws.com/demo-files/jupyter_reload.gif)

🪄 This works in colab notebooks too! [Here's a colab notebook](https://colab.research.google.com/drive/1zAuWoiTIb3O2oitbtVb2_ekv1K6ggtC1?usp=sharing) where you can see the Blocks magic in action. Try making some changes and re-running the cell with the Gradio code!

Tip: You may have to use `%%blocks --share` in Colab to get the demo to appear in the cell.

The Notebook Magic is now the author's preferred way of building Gradio demos. Regardless of how you write Python code, we hope either of these methods will give you a much better development experience using Gradio.

---

## Next Steps

Now that you know how to develop quickly using Gradio, start building your own!

If you are looking for inspiration, try exploring demos other people have built with Gradio, [browse public Hugging Face Spaces](http://hf.space/) 🤗

---

<!-- Source: guides/11_other-tutorials/from-openapi-spec.md -->
# Creating a Gradio app from an OpenAPI Spec

Tags: OPENAPI, SPEC

## Introduction

**[OpenAPI](https://www.openapis.org/)** is a widely adopted standard for describing RESTful APIs in a machine-readable format, typically as a JSON  file. 

You can create a Gradio UI from an OpenAPI Spec **in 1 line of Python**, instantly generating an interactive web interface for any API, making it accessible for demos, testing, or sharing with non-developers, without writing custom frontend code.

## How it works

Gradio now provides a convenient function, `gr.load_openapi`, that can automatically generate a Gradio app from an OpenAPI v3 specification. This function parses the spec, creates UI components for each endpoint and parameter, and lets you interact with the API directly from your browser.

Here's a minimal example:

```python
import gradio as gr

demo = gr.load_openapi(
    openapi_spec="https://petstore3.swagger.io/api/v3/openapi.json",
    base_url="https://petstore3.swagger.io/api/v3",
    paths=["/pet.*"],
    methods=["get", "post"],
)

demo.launch()
```

**Parameters:**
- **openapi_spec**: URL, file path, or Python dictionary containing the OpenAPI v3 spec (JSON format only).
- **base_url**: The base URL for the API endpoints (e.g., `https://api.example.com/v1`).
- **paths** (optional): List of endpoint path patterns (supports regex) to include. If not set, all paths are included.
- **methods** (optional): List of HTTP methods (e.g., `["get", "post"]`) to include. If not set, all methods are included.

The generated app will display a sidebar with available endpoints and create interactive forms for each operation, letting you make API calls and view responses in real time.

## Next steps

Once your Gradio app is running, you can share the URL with others so they can try out the API through a friendly web interface—no code required. For even more power, you can launch the app as an MCP (Model Control Protocol) server using [Gradio's MCP integration](https://www.gradio.app/guides/building-mcp-server-with-gradio), enabling programmatic access and orchestration of your API via the MCP ecosystem. This makes it easy to build, share, and automate API workflows with minimal effort.

---

<!-- Source: guides/11_other-tutorials/gradio-6-migration-guide.md -->
# Gradio 6 Migration Guide

We are excited to release Gradio 6, the latest major version of the Gradio library. Gradio 6 is significantly more performant, lighter, and easier to customize than previous versions of Gradio. The Gradio team is only planning on maintaining future versions of Gradio 6 so we encourage all developers to migrate to Gradio 6.x.

Gradio 6 includes several breaking changes that were made in order to standardize the Python API. This migration guide lists the breaking changes and the specific code changes needed in order to migrate. The easiest way to know whether you need to make changes is to upgrade your Gradio app to 5.50 (`pip install --upgrade gradio==5.50`). Gradio 5.50 emits deprecation warnings for any parameters removed in Gradio 6, allowing you to know whether your Gradio app will be compatible with Gradio 6.

Here, we walk through the breaking changes that were introduced in Gradio 6. Code snippets are provided, allowing you to migrate your code easily to Gradio 6. You can also copy-paste this document as Markdown if you are using an LLM to help migrate your code. 

## App-level Changes

### App-level parameters have been moved from `Blocks` to `launch()`

The `gr.Blocks` class constructor previously contained several parameters that applied to your entire Gradio app, specifically:

* `theme`: The theme for your Gradio app
* `css`: Custom CSS code as a string
* `css_paths`: Paths to custom CSS files
* `js`: Custom JavaScript code
* `head`: Custom HTML code to insert in the head of the page
* `head_paths`: Paths to custom HTML files to insert in the head

Since `gr.Blocks` can be nested and are not necessarily unique to a Gradio app, these parameters have now been moved to `Blocks.launch()`, which can only be called once for your entire Gradio app.

**Before (Gradio 5.x):**

```python
import gradio as gr

with gr.Blocks(
    theme=gr.themes.Soft(),
    css=".my-class { color: red; }",
) as demo:
    gr.Textbox(label="Input")

demo.launch()
```

**After (Gradio 6.x):**

```python
import gradio as gr

with gr.Blocks() as demo:
    gr.Textbox(label="Input")

demo.launch(
    theme=gr.themes.Soft(),
    css=".my-class { color: red; }",
)
```

This change makes it clearer that these parameters apply to the entire app and not to individual `Blocks` instances.

### `show_api` parameter replaced with `footer_links`

The `show_api` parameter in `launch()` has been replaced with a more flexible `footer_links` parameter that allows you to control which links appear in the footer of your Gradio app.

**In Gradio 5.x:**
- `show_api=True` (default) showed the API documentation link in the footer
- `show_api=False` hid the API documentation link

**In Gradio 6.x:**
- `footer_links` accepts a list of strings: `["api", "gradio", "settings"]`
- You can now control precisely which footer links are shown:
  - `"api"`: Shows the API documentation link
  - `"gradio"`: Shows the "Built with Gradio" link
  - `"settings"`: Shows the settings link

**Before (Gradio 5.x):**

```python
import gradio as gr

with gr.Blocks() as demo:
    gr.Textbox(label="Input")

demo.launch(show_api=False)
```

**After (Gradio 6.x):**

```python
import gradio as gr

with gr.Blocks() as demo:
    gr.Textbox(label="Input")

demo.launch(footer_links=["gradio", "settings"])
```

To replicate the old behavior:
- `show_api=True` → `footer_links=["api", "gradio", "settings"]` (or just omit the parameter, as this is the default)
- `show_api=False` → `footer_links=["gradio", "settings"]`

### Event listener parameters: `show_api` removed and `api_name=False` no longer supported

In event listeners (such as `.click()`, `.change()`, etc.), the `show_api` parameter has been removed, and `api_name` no longer accepts `False` as a valid value. These have been replaced with a new `api_visibility` parameter that provides more fine-grained control.

**In Gradio 5.x:**
- `show_api=True` (default) showed the endpoint in the API documentation
- `show_api=False` hid the endpoint from API docs but still allowed downstream apps to use it
- `api_name=False` completely disabled the API endpoint (no downstream apps could use it)

**In Gradio 6.x:**
- `api_visibility` accepts one of three string values:
  - `"public"`: The endpoint is shown in API docs and accessible to all (equivalent to old `show_api=True`)
  - `"undocumented"`: The endpoint is hidden from API docs but still accessible to downstream apps (equivalent to old `show_api=False`)
  - `"private"`: The endpoint is completely disabled and inaccessible (equivalent to old `api_name=False`)

**Before (Gradio 5.x):**

```python
import gradio as gr

with gr.Blocks() as demo:
    btn = gr.Button("Click me")
    output = gr.Textbox()
    
    btn.click(fn=lambda: "Hello", outputs=output, show_api=False)
    
demo.launch()
```

Or to completely disable the API:

```python
btn.click(fn=lambda: "Hello", outputs=output, api_name=False)
```

**After (Gradio 6.x):**

```python
import gradio as gr

with gr.Blocks() as demo:
    btn = gr.Button("Click me")
    output = gr.Textbox()
    
    btn.click(fn=lambda: "Hello", outputs=output, api_visibility="undocumented")
    
demo.launch()
```

Or to completely disable the API:

```python
btn.click(fn=lambda: "Hello", outputs=output, api_visibility="private")
```

To replicate the old behavior:
- `show_api=True` → `api_visibility="public"` (or just omit the parameter, as this is the default)
- `show_api=False` → `api_visibility="undocumented"`
- `api_name=False` → `api_visibility="private"`

### `like_user_message` moved from `.like()` event to constructor 

The `like_user_message` parameter has been moved from the `.like()` event listener to the Chatbot constructor.

**Before (Gradio 5.x):**
```python
chatbot = gr.Chatbot()
chatbot.like(print_like_dislike, None, None, like_user_message=True)
```

**After (Gradio 6.x):**
```python
chatbot = gr.Chatbot(like_user_message=True)
chatbot.like(print_like_dislike, None, None)
```


### Default API names for `Interface` and `ChatInterface` now use function names

The default API endpoint names for `gr.Interface` and `gr.ChatInterface` have changed to be consistent with how `gr.Blocks` events work and to better support MCP (Model Context Protocol) tools.

**In Gradio 5.x:**
- `gr.Interface` had a default API name of `/predict`
- `gr.ChatInterface` had a default API name of `/chat`

**In Gradio 6.x:**
- Both `gr.Interface` and `gr.ChatInterface` now use the name of the function you pass in as the default API endpoint name
- This makes the API more descriptive and consistent with `gr.Blocks` behavior

E.g. if your Gradio app is:

```python
import gradio as gr

def generate_text(prompt):
    return f"Generated: {prompt}"

demo = gr.Interface(fn=generate_text, inputs="text", outputs="text")
demo.launch()
```

Previously, the API endpoint that Gradio generated would be: `/predict`. Now, the API endpoint will be: `/generate_text`

**To maintain the old endpoint names:**

If you need to keep the old endpoint names for backward compatibility (e.g., if you have external services calling these endpoints), you can explicitly set the `api_name` parameter:

```python
demo = gr.Interface(fn=generate_text, inputs="text", outputs="text", api_name="predict")
```

Similarly for `ChatInterface`:

```python
demo = gr.ChatInterface(fn=chat_function, api_name="chat")
```

### `gr.Chatbot` and `gr.ChatInterface` tuple format removed

The tuple format for chatbot messages has been removed in Gradio 6.0. You must now use the messages format with dictionaries containing "role" and "content" keys.

**In Gradio 5.x:**
- You could use `type="tuples"` or the default tuple format: `[["user message", "assistant message"], ...]`
- The tuple format was a list of lists where each inner list had two elements: `[user_message, assistant_message]`

**In Gradio 6.x:**
- Only the messages format is supported: `type="messages"`
- Messages must be dictionaries with "role" and "content" keys: `[{"role": "user", "content": "Hello"}, {"role": "assistant", "content": "Hi there!"}]`

**Before (Gradio 5.x):**

```python
import gradio as gr

# Using tuple format
chatbot = gr.Chatbot(value=[["Hello", "Hi there!"]])
```

Or with `type="tuples"`:

```python
chatbot = gr.Chatbot(value=[["Hello", "Hi there!"]], type="tuples")
```

**After (Gradio 6.x):**

```python
import gradio as gr

# Must use messages format
chatbot = gr.Chatbot(
    value=[
        {"role": "user", "content": "Hello"},
        {"role": "assistant", "content": "Hi there!"}
    ],
    type="messages"
)
```

Similarly for `gr.ChatInterface`, if you were manually setting the chat history:

```python
# Before (Gradio 5.x)
demo = gr.ChatInterface(
    fn=chat_function,
    examples=[["Hello", "Hi there!"]]
)

# After (Gradio 6.x)
demo = gr.ChatInterface(
    fn=chat_function,
    examples=[{"role": "user", "content": "Hello"}, {"role": "assistant", "content": "Hi there!"}]
)
```

**Note:** If you're using `gr.ChatInterface` with a function that returns messages, the function should return messages in the new format. The tuple format is no longer supported.

### `gr.ChatInterface` `history` format now uses structured content

The `history` format in `gr.ChatInterface` has been updated to consistently use OpenAI-style structured content format. Content is now always a list of content blocks, even for simple text messages.

**In Gradio 5.x:**
- Content could be a simple string: `{"role": "user", "content": "Hello"}`
- Simple text messages used a string directly

**In Gradio 6.x:**
- Content is always a list of content blocks: `{"role": "user", "content": [{"type": "text", "text": "Hello"}]}`
- This format is consistent with OpenAI's message format and supports multimodal content (text, images, etc.)

**Before (Gradio 5.x):**

```python
history = [
    {"role": "user", "content": "What is the capital of France?"},
    {"role": "assistant", "content": "Paris"}
]
```

**After (Gradio 6.x):**

```python
history = [
    {"role": "user", "content": [{"type": "text", "text": "What is the capital of France?"}]},
    {"role": "assistant", "content": [{"type": "text", "text": "Paris"}]}
]
```

**With files:**

When files are uploaded in the chat, they are represented as content blocks with `"type": "file"`. All content blocks (files and text) are grouped together in the same message's content array:

```python
history = [
    {
        "role": "user",
        "content": [
            {"type": "file", "file": {"path": "cat1.png"}},
            {"type": "file", "file": {"path": "cat2.png"}},
            {"type": "text", "text": "What's the difference between these two images?"}
        ]
    }
]
```

This structured format allows for multimodal content (text, images, files, etc.) in chat messages, making it consistent with OpenAI's API format. All files uploaded in a single message are grouped together in the `content` array along with any text content.

### `cache_examples` parameter updated and `cache_mode` introduced

The `cache_examples` parameter (used in `Interface`, `ChatInterface`, and `Examples`) no longer accepts the string value `"lazy"`. It now strictly accepts boolean values (`True` or `False`). To control the caching strategy, a new `cache_mode` parameter has been introduced.

**In Gradio 5.x:**
- `cache_examples` accepted `True`, `False`, or `"lazy"`.

**In Gradio 6.x:**
- `cache_examples` only accepts `True` or `False`.
- `cache_mode` accepts `"eager"` (default) or `"lazy"`.

**Before (Gradio 5.x):**

```python
import gradio as gr

demo = gr.Interface(
    fn=predict, 
    inputs="text", 
    outputs="text", 
    examples=["Hello", "World"],
    cache_examples="lazy"
)
```

**After (Gradio 6.x):**

You must now set `cache_examples=True` and specify the mode separately:

```python
import gradio as gr

demo = gr.Interface(
    fn=predict, 
    inputs="text", 
    outputs="text", 
    examples=["Hello", "World"],
    cache_examples=True,
    cache_mode="lazy"
)
```

If you previously used `cache_examples=True` (which implied eager caching), no changes are required, as `cache_mode` defaults to `"eager"`.

## Component-level Changes

### `gr.Video` no longer accepts tuple values for video and subtitles

The tuple format for returning video with subtitles has been deprecated. Instead of returning a tuple `(video_path, subtitle_path)`, you should now use the `gr.Video` component directly with the `subtitles` parameter.

**In Gradio 5.x:**
- You could return a tuple of `(video_path, subtitle_path)` from a function
- The tuple format was `(str | Path, str | Path | None)`

**In Gradio 6.x:**
- Return a `gr.Video` component instance with the `subtitles` parameter
- This provides more flexibility and consistency with other components

**Before (Gradio 5.x):**

```python
import gradio as gr

def generate_video_with_subtitles(input):
    video_path = "output.mp4"
    subtitle_path = "subtitles.srt"
    return (video_path, subtitle_path)

demo = gr.Interface(
    fn=generate_video_with_subtitles,
    inputs="text",
    outputs=gr.Video()
)
demo.launch()
```

**After (Gradio 6.x):**

```python
import gradio as gr

def generate_video_with_subtitles(input):
    video_path = "output.mp4"
    subtitle_path = "subtitles.srt"
    return gr.Video(value=video_path, subtitles=subtitle_path)

demo = gr.Interface(
    fn=generate_video_with_subtitles,
    inputs="text",
    outputs=gr.Video()
)
demo.launch()
```

### `gr.HTML` `padding` parameter default changed to `False`

The default value of the `padding` parameter in `gr.HTML` has been changed from `True` to `False` for consistency with `gr.Markdown`.

**In Gradio 5.x:**
- `padding=True` was the default for `gr.HTML`
- HTML components had padding by default

**In Gradio 6.x:**
- `padding=False` is the default for `gr.HTML`
- This matches the default behavior of `gr.Markdown` for consistency

**To maintain the old behavior:**

If you want to keep the padding that was present in Gradio 5.x, explicitly set `padding=True`:

```python
html = gr.HTML("<div>Content</div>", padding=True)
```


### `gr.Dataframe` `row_count` and `col_count` parameters restructured

The `row_count` and `col_count` parameters in `gr.Dataframe` have been restructured to provide more flexibility and clarity. The tuple format for specifying fixed/dynamic behavior has been replaced with separate parameters for initial counts and limits.

**In Gradio 5.x:**
- `row_count: int | tuple[int, str]` - Could be an int or tuple like `(5, "fixed")` or `(5, "dynamic")`
- `col_count: int | tuple[int, str] | None` - Could be an int or tuple like `(3, "fixed")` or `(3, "dynamic")`

**In Gradio 6.x:**
- `row_count: int | None` - Just the initial number of rows to display
- `row_limits: tuple[int | None, int | None] | None` - Tuple specifying (min_rows, max_rows) constraints
- `column_count: int | None` - The initial number of columns to display
- `column_limits: tuple[int | None, int | None] | None` - Tuple specifying (min_columns, max_columns) constraints

**Before (Gradio 5.x):**

```python
import gradio as gr

# Fixed number of rows (users can't add/remove rows)
df = gr.Dataframe(row_count=(5, "fixed"), col_count=(3, "dynamic"))
```

Or with dynamic rows:

```python
# Dynamic rows (users can add/remove rows)
df = gr.Dataframe(row_count=(5, "dynamic"), col_count=(3, "fixed"))
```

Or with just integers (defaults to dynamic):

```python
df = gr.Dataframe(row_count=5, col_count=3)
```

**After (Gradio 6.x):**

```python
import gradio as gr

# Fixed number of rows (users can't add/remove rows)
df = gr.Dataframe(row_count=5, row_limits=(5, 5), column_count=3, column_limits=None)
```

Or with dynamic rows (users can add/remove rows):

```python
# Dynamic rows with no limits
df = gr.Dataframe(row_count=5, row_limits=None, column_count=3, column_limits=None)
```

Or with min/max constraints:

```python
# Rows between 3 and 10, columns between 2 and 5
df = gr.Dataframe(row_count=5, row_limits=(3, 10), column_count=3, column_limits=(2, 5))
```

**Migration examples:**

- `row_count=(5, "fixed")` → `row_count=5, row_limits=(5, 5)`
- `row_count=(5, "dynamic")` → `row_count=5, row_limits=None`
- `row_count=5` → `row_count=5, row_limits=None` (same behavior)
- `col_count=(3, "fixed")` → `column_count=3, column_limits=(3, 3)`
- `col_count=(3, "dynamic")` → `column_count=3, column_limits=None`
- `col_count=3` → `column_count=3, column_limits=None` (same behavior)

### `allow_tags=True` is now the default for `gr.Chatbot`

Due to the rise in LLMs returning HTML, markdown tags, and custom tags (such as `<thinking>` tags), the default value of `allow_tags` in `gr.Chatbot` has changed from `False` to `True` in Gradio 6.

**In Gradio 5.x:**
- `allow_tags=False` was the default
- All HTML and custom tags were sanitized/removed from chatbot messages (unless explicitly allowed)

**In Gradio 6.x:**
- `allow_tags=True` is the default
- All custom tags (non-standard HTML tags) are preserved in chatbot messages
- Standard HTML tags are still sanitized for security unless `sanitize_html=False`

**Before (Gradio 5.x):**

```python
import gradio as gr

chatbot = gr.Chatbot()
```

This would remove all tags from messages, including custom tags like `<thinking>`.

**After (Gradio 6.x):**

```python
import gradio as gr

chatbot = gr.Chatbot()
```

This will now preserve custom tags like `<thinking>` in the messages.

**To maintain the old behavior:**

If you want to continue removing all tags from chatbot messages (the old default behavior), explicitly set `allow_tags=False`:

```python
import gradio as gr

chatbot = gr.Chatbot(allow_tags=False)
```

**Note:** You can also specify a list of specific tags to allow:

```python
chatbot = gr.Chatbot(allow_tags=["thinking", "tool_call"])
```

This will only preserve `<thinking>` and `<tool_call>` tags while removing all other custom tags.



### Other removed component parameters

Several component parameters have been removed in Gradio 6.0. These parameters were previously deprecated and have now been fully removed.

#### `gr.Chatbot` removed parameters

**`bubble_full_width`** - This parameter has been removed as it no longer has any effect.


**`resizeable`** - This parameter (with the typo) has been removed. Use `resizable` instead.

**Before (Gradio 5.x):**
```python
chatbot = gr.Chatbot(resizeable=True)
```

**After (Gradio 6.x):**
```python
chatbot = gr.Chatbot(resizable=True)
```

**`show_copy_button`, `show_copy_all_button`, `show_share_button`** - These parameters have been removed. Use the `buttons` parameter instead.

**Before (Gradio 5.x):**
```python
chatbot = gr.Chatbot(show_copy_button=True, show_copy_all_button=True, show_share_button=True)
```

**After (Gradio 6.x):**
```python
chatbot = gr.Chatbot(buttons=["copy", "copy_all", "share"])
```

#### `gr.Audio` / `WaveformOptions` removed parameters

**`show_controls`** - This parameter in `WaveformOptions` has been removed. Use `show_recording_waveform` instead.

**Before (Gradio 5.x):**
```python
audio = gr.Audio(
    waveform_options=gr.WaveformOptions(show_controls=False)
)
```

**After (Gradio 6.x):**
```python
audio = gr.Audio(
    waveform_options=gr.WaveformOptions(show_recording_waveform=False)
)
```

**`min_length` and `max_length`** - These parameters have been removed. Use validators instead.

**Before (Gradio 5.x):**
```python
audio = gr.Audio(min_length=1, max_length=10)
```

**After (Gradio 6.x):**
```python
audio = gr.Audio(
    validator=lambda audio: gr.validators.is_audio_correct_length(audio, min_length=1, max_length=10)
)
```

**`show_download_button`, `show_share_button`** - These parameters have been removed. Use the `buttons` parameter instead.

**Before (Gradio 5.x):**
```python
audio = gr.Audio(show_download_button=True, show_share_button=True)
```

**After (Gradio 6.x):**
```python
audio = gr.Audio(buttons=["download", "share"])
```

**Note:** For components where `show_share_button` had a default of `None` (which would show the button on Spaces), you can use `buttons=["share"]` to always show it, or omit it from the list to hide it.

#### `gr.Image` removed parameters

**`mirror_webcam`** - This parameter has been removed. Use `webcam_options` with `gr.WebcamOptions` instead.

**Before (Gradio 5.x):**
```python
image = gr.Image(mirror_webcam=True)
```

**After (Gradio 6.x):**
```python
image = gr.Image(webcam_options=gr.WebcamOptions(mirror=True))
```

**`webcam_constraints`** - This parameter has been removed. Use `webcam_options` with `gr.WebcamOptions` instead.

**Before (Gradio 5.x):**
```python
image = gr.Image(webcam_constraints={"facingMode": "user"})
```

**After (Gradio 6.x):**
```python
image = gr.Image(webcam_options=gr.WebcamOptions(constraints={"facingMode": "user"}))
```

**`show_download_button`, `show_share_button`, `show_fullscreen_button`** - These parameters have been removed. Use the `buttons` parameter instead.

**Before (Gradio 5.x):**
```python
image = gr.Image(show_download_button=True, show_share_button=True, show_fullscreen_button=True)
```

**After (Gradio 6.x):**
```python
image = gr.Image(buttons=["download", "share", "fullscreen"])
```

#### `gr.Video` removed parameters

**`mirror_webcam`** - This parameter has been removed. Use `webcam_options` with `gr.WebcamOptions` instead.

**Before (Gradio 5.x):**
```python
video = gr.Video(mirror_webcam=True)
```

**After (Gradio 6.x):**
```python
video = gr.Video(webcam_options=gr.WebcamOptions(mirror=True))
```

**`webcam_constraints`** - This parameter has been removed. Use `webcam_options` with `gr.WebcamOptions` instead.

**Before (Gradio 5.x):**
```python
video = gr.Video(webcam_constraints={"facingMode": "user"})
```

**After (Gradio 6.x):**
```python
video = gr.Video(webcam_options=gr.WebcamOptions(constraints={"facingMode": "user"}))
```

**`min_length` and `max_length`** - These parameters have been removed. Use validators instead.

**Before (Gradio 5.x):**
```python
video = gr.Video(min_length=1, max_length=10)
```

**After (Gradio 6.x):**
```python
video = gr.Video(
    validator=lambda video: gr.validators.is_video_correct_length(video, min_length=1, max_length=10)
)
```

**`show_download_button`, `show_share_button`** - These parameters have been removed. Use the `buttons` parameter instead.

**Before (Gradio 5.x):**
```python
video = gr.Video(show_download_button=True, show_share_button=True)
```

**After (Gradio 6.x):**
```python
video = gr.Video(buttons=["download", "share"])
```

#### `gr.ImageEditor` removed parameters

**`crop_size`** - This parameter has been removed. Use `canvas_size` instead.

**Before (Gradio 5.x):**
```python
editor = gr.ImageEditor(crop_size=(512, 512))
```

**After (Gradio 6.x):**
```python
editor = gr.ImageEditor(canvas_size=(512, 512))
```

#### Removed components

**`gr.LogoutButton`** - This component has been removed. Use `gr.LoginButton` instead, which handles both login and logout processes.

**Before (Gradio 5.x):**
```python
logout_btn = gr.LogoutButton()
```

**After (Gradio 6.x):**
```python
login_btn = gr.LoginButton()
```

#### Native plot components removed parameters

The following parameters have been removed from `gr.LinePlot`, `gr.BarPlot`, and `gr.ScatterPlot`:

- `overlay_point` - This parameter has been removed.
- `width` - This parameter has been removed. Use CSS styling or container width instead.
- `stroke_dash` - This parameter has been removed.
- `interactive` - This parameter has been removed.
- `show_actions_button` - This parameter has been removed.
- `color_legend_title` - This parameter has been removed. Use `color_title` instead.
- `show_fullscreen_button`, `show_export_button` - These parameters have been removed. Use the `buttons` parameter instead.

**Before (Gradio 5.x):**
```python
plot = gr.LinePlot(
    value=data,
    x="date",
    y="downloads",
    overlay_point=True,
    width=900,
    show_fullscreen_button=True,
    show_export_button=True
)
```

**After (Gradio 6.x):**
```python
plot = gr.LinePlot(
    value=data,
    x="date",
    y="downloads",
    buttons=["fullscreen", "export"]
)
```

**Note:** For `color_legend_title`, use `color_title` instead:

**Before (Gradio 5.x):**
```python
plot = gr.ScatterPlot(color_legend_title="Category")
```

**After (Gradio 6.x):**
```python
plot = gr.ScatterPlot(color_title="Category")
```

#### `gr.Textbox` removed parameters

**`show_copy_button`** - This parameter has been removed. Use the `buttons` parameter instead.

**Before (Gradio 5.x):**
```python
text = gr.Textbox(show_copy_button=True)
```

**After (Gradio 6.x):**
```python
text = gr.Textbox(buttons=["copy"])
```

#### `gr.Markdown` removed parameters

**`show_copy_button`** - This parameter has been removed. Use the `buttons` parameter instead.

**Before (Gradio 5.x):**
```python
markdown = gr.Markdown(show_copy_button=True)
```

**After (Gradio 6.x):**
```python
markdown = gr.Markdown(buttons=["copy"])
```

#### `gr.Dataframe` removed parameters

**`show_copy_button`, `show_fullscreen_button`** - These parameters have been removed. Use the `buttons` parameter instead.

**Before (Gradio 5.x):**
```python
df = gr.Dataframe(show_copy_button=True, show_fullscreen_button=True)
```

**After (Gradio 6.x):**
```python
df = gr.Dataframe(buttons=["copy", "fullscreen"])
```

#### `gr.Slider` removed parameters

**`show_reset_button`** - This parameter has been removed. Use the `buttons` parameter instead.

**Before (Gradio 5.x):**
```python
slider = gr.Slider(show_reset_button=True)
```

**After (Gradio 6.x):**
```python
slider = gr.Slider(buttons=["reset"])
```


## CLI Changes

### `gradio sketch` command removed

The `gradio sketch` command-line tool has been deprecated and completely removed in Gradio 6. This tool was used to create Gradio apps through a visual interface.

**In Gradio 5.x:**
- You could run `gradio sketch` to launch an interactive GUI for building Gradio apps
- The tool would generate Python code visually

**In Gradio 6.x:**
- The `gradio sketch` command has been removed
- Running `gradio sketch` will raise a `DeprecationWarning`

## Python Client Changes

### `hf_token` parameter renamed to `token` in `Client`

The `hf_token` parameter in the `Client` class has been renamed to `token` for consistency and simplicity.

**Before (Gradio 5.x):**

```python
from gradio_client import Client

client = Client("abidlabs/my-private-space", hf_token="hf_...")
```

**After (Gradio 6.x):**

```python
from gradio_client import Client

client = Client("abidlabs/my-private-space", token="hf_...")
```

### `deploy_discord` method deprecated

The `deploy_discord` method in the `Client` class has been deprecated and will be removed in Gradio 6.0. This method was used to deploy Gradio apps as Discord bots.

**Before (Gradio 5.x):**

```python
from gradio_client import Client

client = Client("username/space-name")
client.deploy_discord(discord_bot_token="...")
```

**After (Gradio 6.x):**

The `deploy_discord` method is no longer available. Please see the [documentation on creating a Discord bot with Gradio](https://www.gradio.app/guides/creating-a-discord-bot-from-a-gradio-app) for alternative approaches.

### `AppError` now subclasses `Exception` instead of `ValueError`

The `AppError` exception class in the Python client now subclasses `Exception` directly instead of `ValueError`. This is a breaking change if you have code that specifically catches `ValueError` to handle `AppError` instances.

**Before (Gradio 5.x):**

```python
from gradio_client import Client
from gradio_client.exceptions import AppError

try:
    client = Client("username/space-name")
    result = client.predict("/predict", inputs)
except ValueError as e:
    # This would catch AppError in Gradio 5.x
    print(f"Error: {e}")
```

**After (Gradio 6.x):**

```python
from gradio_client import Client
from gradio_client.exceptions import AppError

try:
    client = Client("username/space-name")
    result = client.predict("/predict", inputs)
except AppError as e:
    # Explicitly catch AppError
    print(f"App error: {e}")
except ValueError as e:
    # This will no longer catch AppError
    print(f"Value error: {e}")
```

---

<!-- Source: guides/11_other-tutorials/Gradio-and-Comet.md -->
# Using Gradio and Comet

Tags: COMET, SPACES
Contributed by the Comet team

## Introduction

In this guide we will demonstrate some of the ways you can use Gradio with Comet. We will cover the basics of using Comet with Gradio and show you some of the ways that you can leverage Gradio's advanced features such as [Embedding with iFrames](https://www.gradio.app/guides/sharing-your-app/#embedding-with-iframes) and [State](https://www.gradio.app/docs/#state) to build some amazing model evaluation workflows.

Here is a list of the topics covered in this guide.

1. Logging Gradio UI's to your Comet Experiments
2. Embedding Gradio Applications directly into your Comet Projects
3. Embedding Hugging Face Spaces directly into your Comet Projects
4. Logging Model Inferences from your Gradio Application to Comet

## What is Comet?

[Comet](https://www.comet.com?utm_source=gradio&utm_medium=referral&utm_campaign=gradio-integration&utm_content=gradio-docs) is an MLOps Platform that is designed to help Data Scientists and Teams build better models faster! Comet provides tooling to Track, Explain, Manage, and Monitor your models in a single place! It works with Jupyter Notebooks and Scripts and most importantly it's 100% free!

## Setup

First, install the dependencies needed to run these examples

```shell
pip install comet_ml torch torchvision transformers gradio shap requests Pillow
```

Next, you will need to [sign up for a Comet Account](https://www.comet.com/signup?utm_source=gradio&utm_medium=referral&utm_campaign=gradio-integration&utm_content=gradio-docs). Once you have your account set up, [grab your API Key](https://www.comet.com/docs/v2/guides/getting-started/quickstart/#get-an-api-key?utm_source=gradio&utm_medium=referral&utm_campaign=gradio-integration&utm_content=gradio-docs) and configure your Comet credentials

If you're running these examples as a script, you can either export your credentials as environment variables

```shell
export COMET_API_KEY="<Your API Key>"
export COMET_WORKSPACE="<Your Workspace Name>"
export COMET_PROJECT_NAME="<Your Project Name>"
```

or set them in a `.comet.config` file in your working directory. You file should be formatted in the following way.

```shell
[comet]
api_key=<Your API Key>
workspace=<Your Workspace Name>
project_name=<Your Project Name>
```

If you are using the provided Colab Notebooks to run these examples, please run the cell with the following snippet before starting the Gradio UI. Running this cell allows you to interactively add your API key to the notebook.

```python
import comet_ml
comet_ml.init()
```

## 1. Logging Gradio UI's to your Comet Experiments

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/comet-ml/comet-examples/blob/master/integrations/model-evaluation/gradio/notebooks/Gradio_and_Comet.ipynb)

In this example, we will go over how to log your Gradio Applications to Comet and interact with them using the Gradio Custom Panel.

Let's start by building a simple Image Classification example using `resnet18`.

```python
import comet_ml

import requests
import torch
from PIL import Image
from torchvision import transforms

torch.hub.download_url_to_file("https://github.com/pytorch/hub/raw/master/images/dog.jpg", "dog.jpg")

if torch.cuda.is_available():
    device = "cuda"
else:
    device = "cpu"

model = torch.hub.load("pytorch/vision:v0.6.0", "resnet18", pretrained=True).eval()
model = model.to(device)

# Download human-readable labels for ImageNet.
response = requests.get("https://git.io/JJkYN")
labels = response.text.split("\n")


def predict(inp):
    inp = Image.fromarray(inp.astype("uint8"), "RGB")
    inp = transforms.ToTensor()(inp).unsqueeze(0)
    with torch.no_grad():
        prediction = torch.nn.functional.softmax(model(inp.to(device))[0], dim=0)
    return {labels[i]: float(prediction[i]) for i in range(1000)}


inputs = gr.Image()
outputs = gr.Label(num_top_classes=3)

io = gr.Interface(
    fn=predict, inputs=inputs, outputs=outputs, examples=["dog.jpg"]
)
io.launch(inline=False, share=True)

experiment = comet_ml.Experiment()
experiment.add_tag("image-classifier")

io.integrate(comet_ml=experiment)
```

The last line in this snippet will log the URL of the Gradio Application to your Comet Experiment. You can find the URL in the Text Tab of your Experiment.

<video width="560" height="315" controls>
    <source src="https://user-images.githubusercontent.com/7529846/214328034-09369d4d-8b94-4c4a-aa3c-25e3ed8394c4.mp4"></source>
</video>

Add the Gradio Panel to your Experiment to interact with your application.

<video width="560" height="315" controls>
    <source src="https://user-images.githubusercontent.com/7529846/214328194-95987f83-c180-4929-9bed-c8a0d3563ed7.mp4"></source>
</video>

## 2. Embedding Gradio Applications directly into your Comet Projects

<iframe width="560" height="315" src="https://www.youtube.com/embed/KZnpH7msPq0?start=9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

If you are permanently hosting your Gradio application, you can embed the UI using the Gradio Panel Extended custom Panel.

Go to your Comet Project page, and head over to the Panels tab. Click the `+ Add` button to bring up the Panels search page.

<img width="560" alt="adding-panels" src="https://user-images.githubusercontent.com/7529846/214329314-70a3ff3d-27fb-408c-a4d1-4b58892a3854.jpeg">

Next, search for Gradio Panel Extended in the Public Panels section and click `Add`.

<img width="560" alt="gradio-panel-extended" src="https://user-images.githubusercontent.com/7529846/214325577-43226119-0292-46be-a62a-0c7a80646ebb.png">

Once you have added your Panel, click `Edit` to access to the Panel Options page and paste in the URL of your Gradio application.

![Edit-Gradio-Panel-Options](https://user-images.githubusercontent.com/7529846/214573001-23814b5a-ca65-4ace-a8a5-b27cdda70f7a.gif)

<img width="560" alt="Edit-Gradio-Panel-URL" src="https://user-images.githubusercontent.com/7529846/214334843-870fe726-0aa1-4b21-bbc6-0c48f56c48d8.png">

## 3. Embedding Hugging Face Spaces directly into your Comet Projects

<iframe width="560" height="315" src="https://www.youtube.com/embed/KZnpH7msPq0?start=107" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

You can also embed Gradio Applications that are hosted on Hugging Faces Spaces into your Comet Projects using the Hugging Face Spaces Panel.

Go to your Comet Project page, and head over to the Panels tab. Click the `+ Add` button to bring up the Panels search page. Next, search for the Hugging Face Spaces Panel in the Public Panels section and click `Add`.

<img width="560" height="315" alt="huggingface-spaces-panel" src="https://user-images.githubusercontent.com/7529846/214325606-99aa3af3-b284-4026-b423-d3d238797e12.png">

Once you have added your Panel, click Edit to access to the Panel Options page and paste in the path of your Hugging Face Space e.g. `pytorch/ResNet`

<img width="560" height="315" alt="Edit-HF-Space" src="https://user-images.githubusercontent.com/7529846/214335868-c6f25dee-13db-4388-bcf5-65194f850b02.png">

## 4. Logging Model Inferences to Comet

<iframe width="560" height="315" src="https://www.youtube.com/embed/KZnpH7msPq0?start=176" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/comet-ml/comet-examples/blob/master/integrations/model-evaluation/gradio/notebooks/Logging_Model_Inferences_with_Comet_and_Gradio.ipynb)

In the previous examples, we demonstrated the various ways in which you can interact with a Gradio application through the Comet UI. Additionally, you can also log model inferences, such as SHAP plots, from your Gradio application to Comet.

In the following snippet, we're going to log inferences from a Text Generation model. We can persist an Experiment across multiple inference calls using Gradio's [State](https://www.gradio.app/docs/#state) object. This will allow you to log multiple inferences from a model to a single Experiment.

```python
import comet_ml
import gradio as gr
import shap
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

if torch.cuda.is_available():
    device = "cuda"
else:
    device = "cpu"

MODEL_NAME = "gpt2"

model = AutoModelForCausalLM.from_pretrained(MODEL_NAME)

# set model decoder to true
model.config.is_decoder = True
# set text-generation params under task_specific_params
model.config.task_specific_params["text-generation"] = {
    "do_sample": True,
    "max_length": 50,
    "temperature": 0.7,
    "top_k": 50,
    "no_repeat_ngram_size": 2,
}
model = model.to(device)

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
explainer = shap.Explainer(model, tokenizer)


def start_experiment():
    """Returns an APIExperiment object that is thread safe
    and can be used to log inferences to a single Experiment
    """
    try:
        api = comet_ml.API()
        workspace = api.get_default_workspace()
        project_name = comet_ml.config.get_config()["comet.project_name"]

        experiment = comet_ml.APIExperiment(
            workspace=workspace, project_name=project_name
        )
        experiment.log_other("Created from", "gradio-inference")

        message = f"Started Experiment: [{experiment.name}]({experiment.url})"

        return (experiment, message)

    except Exception as e:
        return None, None


def predict(text, state, message):
    experiment = state

    shap_values = explainer([text])
    plot = shap.plots.text(shap_values, display=False)

    if experiment is not None:
        experiment.log_other("message", message)
        experiment.log_html(plot)

    return plot


with gr.Blocks() as demo:
    start_experiment_btn = gr.Button("Start New Experiment")
    experiment_status = gr.Markdown()

    # Log a message to the Experiment to provide more context
    experiment_message = gr.Textbox(label="Experiment Message")
    experiment = gr.State()

    input_text = gr.Textbox(label="Input Text", lines=5, interactive=True)
    submit_btn = gr.Button("Submit")

    output = gr.HTML(interactive=True)

    start_experiment_btn.click(
        start_experiment, outputs=[experiment, experiment_status]
    )
    submit_btn.click(
        predict, inputs=[input_text, experiment, experiment_message], outputs=[output]
    )
```

Inferences from this snippet will be saved in the HTML tab of your experiment.

<video width="560" height="315" controls>
    <source src="https://user-images.githubusercontent.com/7529846/214328610-466e5c81-4814-49b9-887c-065aca14dd30.mp4"></source>
</video>

## Conclusion

We hope you found this guide useful and that it provides some inspiration to help you build awesome model evaluation workflows with Comet and Gradio.

## How to contribute Gradio demos on HF spaces on the Comet organization

- Create an account on Hugging Face [here](https://huggingface.co/join).
- Add Gradio Demo under your username, see this [course](https://huggingface.co/course/chapter9/4?fw=pt) for setting up Gradio Demo on Hugging Face.
- Request to join the Comet organization [here](https://huggingface.co/Comet).

## Additional Resources

- [Comet Documentation](https://www.comet.com/docs/v2/?utm_source=gradio&utm_medium=referral&utm_campaign=gradio-integration&utm_content=gradio-docs)

---

<!-- Source: guides/11_other-tutorials/Gradio-and-ONNX-on-Hugging-Face.md -->
# Gradio and ONNX on Hugging Face

Related spaces: https://huggingface.co/spaces/onnx/EfficientNet-Lite4
Tags: ONNX, SPACES
Contributed by Gradio and the <a href="https://onnx.ai/">ONNX</a> team

## Introduction

In this Guide, we'll walk you through:

- Introduction of ONNX, ONNX model zoo, Gradio, and Hugging Face Spaces
- How to setup a Gradio demo for EfficientNet-Lite4
- How to contribute your own Gradio demos for the ONNX organization on Hugging Face

Here's an [example](https://onnx-efficientnet-lite4.hf.space/) of an ONNX model.

## What is the ONNX Model Zoo?

Open Neural Network Exchange ([ONNX](https://onnx.ai/)) is an open standard format for representing machine learning models. ONNX is supported by a community of partners who have implemented it in many frameworks and tools. For example, if you have trained a model in TensorFlow or PyTorch, you can convert it to ONNX easily, and from there run it on a variety of devices using an engine/compiler like ONNX Runtime.

The [ONNX Model Zoo](https://github.com/onnx/models) is a collection of pre-trained, state-of-the-art models in the ONNX format contributed by community members. Accompanying each model are Jupyter notebooks for model training and running inference with the trained model. The notebooks are written in Python and include links to the training dataset as well as references to the original paper that describes the model architecture.

## What are Hugging Face Spaces & Gradio?

### Gradio

Gradio lets users demo their machine learning models as a web app all in python code. Gradio wraps a python function into a user interface and the demos can be launched inside jupyter notebooks, colab notebooks, as well as embedded in your own website and hosted on Hugging Face Spaces for free.

Get started [here](https://gradio.app/getting_started)

### Hugging Face Spaces

Hugging Face Spaces is a free hosting option for Gradio demos. Spaces comes with 3 SDK options: Gradio, Streamlit and Static HTML demos. Spaces can be public or private and the workflow is similar to github repos. There are over 2000+ spaces currently on Hugging Face. Learn more about spaces [here](https://huggingface.co/spaces/launch).

### Hugging Face Models

Hugging Face Model Hub also supports ONNX models and ONNX models can be filtered through the [ONNX tag](https://huggingface.co/models?library=onnx&sort=downloads)

## How did Hugging Face help the ONNX Model Zoo?

There are a lot of Jupyter notebooks in the ONNX Model Zoo for users to test models. Previously, users needed to download the models themselves and run those notebooks locally for testing. With Hugging Face, the testing process can be much simpler and more user-friendly. Users can easily try certain ONNX Model Zoo model on Hugging Face Spaces and run a quick demo powered by Gradio with ONNX Runtime, all on cloud without downloading anything locally. Note, there are various runtimes for ONNX, e.g., [ONNX Runtime](https://github.com/microsoft/onnxruntime), [MXNet](https://github.com/apache/incubator-mxnet).

## What is the role of ONNX Runtime?

ONNX Runtime is a cross-platform inference and training machine-learning accelerator. It makes live Gradio demos with ONNX Model Zoo model on Hugging Face possible.

ONNX Runtime inference can enable faster customer experiences and lower costs, supporting models from deep learning frameworks such as PyTorch and TensorFlow/Keras as well as classical machine learning libraries such as scikit-learn, LightGBM, XGBoost, etc. ONNX Runtime is compatible with different hardware, drivers, and operating systems, and provides optimal performance by leveraging hardware accelerators where applicable alongside graph optimizations and transforms. For more information please see the [official website](https://onnxruntime.ai/).

## Setting up a Gradio Demo for EfficientNet-Lite4

EfficientNet-Lite 4 is the largest variant and most accurate of the set of EfficientNet-Lite models. It is an integer-only quantized model that produces the highest accuracy of all of the EfficientNet models. It achieves 80.4% ImageNet top-1 accuracy, while still running in real-time (e.g. 30ms/image) on a Pixel 4 CPU. To learn more read the [model card](https://github.com/onnx/models/tree/main/vision/classification/efficientnet-lite4)

Here we walk through setting up a example demo for EfficientNet-Lite4 using Gradio

First we import our dependencies and download and load the efficientnet-lite4 model from the onnx model zoo. Then load the labels from the labels_map.txt file. We then setup our preprocessing functions, load the model for inference, and setup the inference function. Finally, the inference function is wrapped into a gradio interface for a user to interact with. See the full code below.

```python
import numpy as np
import math
import matplotlib.pyplot as plt
import cv2
import json
import gradio as gr
from huggingface_hub import hf_hub_download
from onnx import hub
import onnxruntime as ort

# loads ONNX model from ONNX Model Zoo
model = hub.load("efficientnet-lite4")
# loads the labels text file
labels = json.load(open("labels_map.txt", "r"))

# sets image file dimensions to 224x224 by resizing and cropping image from center
def pre_process_edgetpu(img, dims):
    output_height, output_width, _ = dims
    img = resize_with_aspectratio(img, output_height, output_width, inter_pol=cv2.INTER_LINEAR)
    img = center_crop(img, output_height, output_width)
    img = np.asarray(img, dtype='float32')
    # converts jpg pixel value from [0 - 255] to float array [-1.0 - 1.0]
    img -= [127.0, 127.0, 127.0]
    img /= [128.0, 128.0, 128.0]
    return img

# resizes the image with a proportional scale
def resize_with_aspectratio(img, out_height, out_width, scale=87.5, inter_pol=cv2.INTER_LINEAR):
    height, width, _ = img.shape
    new_height = int(100. * out_height / scale)
    new_width = int(100. * out_width / scale)
    if height > width:
        w = new_width
        h = int(new_height * height / width)
    else:
        h = new_height
        w = int(new_width * width / height)
    img = cv2.resize(img, (w, h), interpolation=inter_pol)
    return img

# crops the image around the center based on given height and width
def center_crop(img, out_height, out_width):
    height, width, _ = img.shape
    left = int((width - out_width) / 2)
    right = int((width + out_width) / 2)
    top = int((height - out_height) / 2)
    bottom = int((height + out_height) / 2)
    img = img[top:bottom, left:right]
    return img


sess = ort.InferenceSession(model)

def inference(img):
  img = cv2.imread(img)
  img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

  img = pre_process_edgetpu(img, (224, 224, 3))

  img_batch = np.expand_dims(img, axis=0)

  results = sess.run(["Softmax:0"], {"images:0": img_batch})[0]
  result = reversed(results[0].argsort()[-5:])
  resultdic = {}
  for r in result:
      resultdic[labels[str(r)]] = float(results[0][r])
  return resultdic

title = "EfficientNet-Lite4"
description = "EfficientNet-Lite 4 is the largest variant and most accurate of the set of EfficientNet-Lite model. It is an integer-only quantized model that produces the highest accuracy of all of the EfficientNet models. It achieves 80.4% ImageNet top-1 accuracy, while still running in real-time (e.g. 30ms/image) on a Pixel 4 CPU."
examples = [['catonnx.jpg']]
gr.Interface(inference, gr.Image(type="filepath"), "label", title=title, description=description, examples=examples).launch()
```

## How to contribute Gradio demos on HF spaces using ONNX models

- Add model to the [onnx model zoo](https://github.com/onnx/models/blob/main/.github/PULL_REQUEST_TEMPLATE.md)
- Create an account on Hugging Face [here](https://huggingface.co/join).
- See list of models left to add to ONNX organization, please refer to the table with the [Models list](https://github.com/onnx/models#models)
- Add Gradio Demo under your username, see this [blog post](https://huggingface.co/blog/gradio-spaces) for setting up Gradio Demo on Hugging Face.
- Request to join ONNX Organization [here](https://huggingface.co/onnx).
- Once approved transfer model from your username to ONNX organization
- Add a badge for model in model table, see examples in [Models list](https://github.com/onnx/models#models)

---

<!-- Source: guides/11_other-tutorials/Gradio-and-Wandb-Integration.md -->
# Gradio and W&B Integration

Related spaces: https://huggingface.co/spaces/akhaliq/JoJoGAN
Tags: WANDB, SPACES
Contributed by Gradio team

## Introduction

In this Guide, we'll walk you through:

- Introduction of Gradio, and Hugging Face Spaces, and Wandb
- How to setup a Gradio demo using the Wandb integration for JoJoGAN
- How to contribute your own Gradio demos after tracking your experiments on wandb to the Wandb organization on Hugging Face


## What is Wandb?

Weights and Biases (W&B) allows data scientists and machine learning scientists to track their machine learning experiments at every stage, from training to production. Any metric can be aggregated over samples and shown in panels in a customizable and searchable dashboard, like below:

<img alt="Screen Shot 2022-08-01 at 5 54 59 PM" src="https://user-images.githubusercontent.com/81195143/182252755-4a0e1ca8-fd25-40ff-8c91-c9da38aaa9ec.png">

## What are Hugging Face Spaces & Gradio?

### Gradio

Gradio lets users demo their machine learning models as a web app, all in a few lines of Python. Gradio wraps any Python function (such as a machine learning model's inference function) into a user interface and the demos can be launched inside jupyter notebooks, colab notebooks, as well as embedded in your own website and hosted on Hugging Face Spaces for free.

Get started [here](https://gradio.app/getting_started)

### Hugging Face Spaces

Hugging Face Spaces is a free hosting option for Gradio demos. Spaces comes with 3 SDK options: Gradio, Streamlit and Static HTML demos. Spaces can be public or private and the workflow is similar to github repos. There are over 2000+ spaces currently on Hugging Face. Learn more about spaces [here](https://huggingface.co/spaces/launch).

## Setting up a Gradio Demo for JoJoGAN

Now, let's walk you through how to do this on your own. We'll make the assumption that you're new to W&B and Gradio for the purposes of this tutorial.

Let's get started!

1. Create a W&B account

   Follow [these quick instructions](https://app.wandb.ai/login) to create your free account if you don’t have one already. It shouldn't take more than a couple minutes. Once you're done (or if you've already got an account), next, we'll run a quick colab.

2. Open Colab Install Gradio and W&B

   We'll be following along with the colab provided in the JoJoGAN repo with some minor modifications to use Wandb and Gradio more effectively.

   [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/mchong6/JoJoGAN/blob/main/stylize.ipynb)

   Install Gradio and Wandb at the top:

   ```sh
   pip install gradio wandb
   ```

3. Finetune StyleGAN and W&B experiment tracking

   This next step will open a W&B dashboard to track your experiments and a gradio panel showing pretrained models to choose from a drop down menu from a Gradio Demo hosted on Huggingface Spaces. Here's the code you need for that:

   ```python
   alpha =  1.0
   alpha = 1-alpha

   preserve_color = True
   num_iter = 100
   log_interval = 50

   samples = []
   column_names = ["Reference (y)", "Style Code(w)", "Real Face Image(x)"]

   wandb.init(project="JoJoGAN")
   config = wandb.config
   config.num_iter = num_iter
   config.preserve_color = preserve_color
   wandb.log(
   {"Style reference": [wandb.Image(transforms.ToPILImage()(target_im))]},
   step=0)

   # load discriminator for perceptual loss
   discriminator = Discriminator(1024, 2).eval().to(device)
   ckpt = torch.load('models/stylegan2-ffhq-config-f.pt', map_location=lambda storage, loc: storage)
   discriminator.load_state_dict(ckpt["d"], strict=False)

   # reset generator
   del generator
   generator = deepcopy(original_generator)

   g_optim = optim.Adam(generator.parameters(), lr=2e-3, betas=(0, 0.99))

   # Which layers to swap for generating a family of plausible real images -> fake image
   if preserve_color:
       id_swap = [9,11,15,16,17]
   else:
       id_swap = list(range(7, generator.n_latent))

   for idx in tqdm(range(num_iter)):
       mean_w = generator.get_latent(torch.randn([latents.size(0), latent_dim]).to(device)).unsqueeze(1).repeat(1, generator.n_latent, 1)
       in_latent = latents.clone()
       in_latent[:, id_swap] = alpha*latents[:, id_swap] + (1-alpha)*mean_w[:, id_swap]

       img = generator(in_latent, input_is_latent=True)

       with torch.no_grad():
           real_feat = discriminator(targets)
       fake_feat = discriminator(img)

       loss = sum([F.l1_loss(a, b) for a, b in zip(fake_feat, real_feat)])/len(fake_feat)

       wandb.log({"loss": loss}, step=idx)
       if idx % log_interval == 0:
           generator.eval()
           my_sample = generator(my_w, input_is_latent=True)
           generator.train()
           my_sample = transforms.ToPILImage()(utils.make_grid(my_sample, normalize=True, range=(-1, 1)))
           wandb.log(
           {"Current stylization": [wandb.Image(my_sample)]},
           step=idx)
       table_data = [
               wandb.Image(transforms.ToPILImage()(target_im)),
               wandb.Image(img),
               wandb.Image(my_sample),
           ]
       samples.append(table_data)

       g_optim.zero_grad()
       loss.backward()
       g_optim.step()

   out_table = wandb.Table(data=samples, columns=column_names)
   wandb.log({"Current Samples": out_table})
   ```
4. Save, Download, and Load Model

    Here's how to save and download your model.

   ```python
   from PIL import Image
   import torch
   torch.backends.cudnn.benchmark = True
   from torchvision import transforms, utils
   from util import *
   import math
   import random
   import numpy as np
   from torch import nn, autograd, optim
   from torch.nn import functional as F
   from tqdm import tqdm
   import lpips
   from model import *
   from e4e_projection import projection as e4e_projection
   
   from copy import deepcopy
   import imageio
   
   import os
   import sys
   import torchvision.transforms as transforms
   from argparse import Namespace
   from e4e.models.psp import pSp
   from util import *
   from huggingface_hub import hf_hub_download
   from google.colab import files
   
   torch.save({"g": generator.state_dict()}, "your-model-name.pt")
   
   files.download('your-model-name.pt')
   
   latent_dim = 512
   device="cuda"
   model_path_s = hf_hub_download(repo_id="akhaliq/jojogan-stylegan2-ffhq-config-f", filename="stylegan2-ffhq-config-f.pt")
   original_generator = Generator(1024, latent_dim, 8, 2).to(device)
   ckpt = torch.load(model_path_s, map_location=lambda storage, loc: storage)
   original_generator.load_state_dict(ckpt["g_ema"], strict=False)
   mean_latent = original_generator.mean_latent(10000)
   
   generator = deepcopy(original_generator)
   
   ckpt = torch.load("/content/JoJoGAN/your-model-name.pt", map_location=lambda storage, loc: storage)
   generator.load_state_dict(ckpt["g"], strict=False)
   generator.eval()
   
   plt.rcParams['figure.dpi'] = 150
   
   transform = transforms.Compose(
       [
           transforms.Resize((1024, 1024)),
           transforms.ToTensor(),
           transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5)),
       ]
   )
   
   def inference(img):
       img.save('out.jpg')
       aligned_face = align_face('out.jpg')
   
       my_w = e4e_projection(aligned_face, "out.pt", device).unsqueeze(0)
       with torch.no_grad():
           my_sample = generator(my_w, input_is_latent=True)
   
       npimage = my_sample[0].cpu().permute(1, 2, 0).detach().numpy()
       imageio.imwrite('filename.jpeg', npimage)
       return 'filename.jpeg'
   ````

5. Build a Gradio Demo

   ```python
   import gradio as gr
   
   title = "JoJoGAN"
   description = "Gradio Demo for JoJoGAN: One Shot Face Stylization. To use it, simply upload your image, or click one of the examples to load them. Read more at the links below."
   
   demo = gr.Interface(
       inference,
       gr.Image(type="pil"),
       gr.Image(type="file"),
       title=title,
       description=description
   )
   
   demo.launch(share=True)
   ```

6. Integrate Gradio into your W&B Dashboard

   The last step—integrating your Gradio demo with your W&B dashboard—is just one extra line:

   ```python
   demo.integrate(wandb=wandb)
   ```

   Once you call integrate, a demo will be created and you can integrate it into your dashboard or report.

   Outside of W&B with Web components, using the `gradio-app` tags, anyone can embed Gradio demos on HF spaces directly into their blogs, websites, documentation, etc.:
   
   ```html
   <gradio-app space="akhaliq/JoJoGAN"> </gradio-app>
   ```

7. (Optional) Embed W&B plots in your Gradio App

   It's also possible to embed W&B plots within Gradio apps. To do so, you can create a W&B Report of your plots and
   embed them within your Gradio app within a `gr.HTML` block.

   The Report will need to be public and you will need to wrap the URL within an iFrame like this:

   ```python
   import gradio as gr
   
   def wandb_report(url):
       iframe = f'<iframe src={url} style="border:none;height:1024px;width:100%">'
       return gr.HTML(iframe)
   
   with gr.Blocks() as demo:
       report_url = 'https://wandb.ai/_scott/pytorch-sweeps-demo/reports/loss-22-10-07-16-00-17---VmlldzoyNzU2NzAx'
       report = wandb_report(report_url)
   
   demo.launch(share=True)
   ```

## Conclusion

We hope you enjoyed this brief demo of embedding a Gradio demo to a W&B report! Thanks for making it to the end. To recap:

- Only one single reference image is needed for fine-tuning JoJoGAN which usually takes about 1 minute on a GPU in colab. After training, style can be applied to any input image. Read more in the paper.

- W&B tracks experiments with just a few lines of code added to a colab and you can visualize, sort, and understand your experiments in a single, centralized dashboard.

- Gradio, meanwhile, demos the model in a user friendly interface to share anywhere on the web.

## How to contribute Gradio demos on HF spaces on the Wandb organization

- Create an account on Hugging Face [here](https://huggingface.co/join).
- Add Gradio Demo under your username, see this [course](https://huggingface.co/course/chapter9/4?fw=pt) for setting up Gradio Demo on Hugging Face.
- Request to join wandb organization [here](https://huggingface.co/wandb).
- Once approved transfer model from your username to Wandb organization

---

<!-- Source: guides/11_other-tutorials/how-to-use-3D-model-component.md -->
# How to Use the 3D Model Component

Related spaces: https://huggingface.co/spaces/gradio/Model3D, https://huggingface.co/spaces/gradio/PIFu-Clothed-Human-Digitization, https://huggingface.co/spaces/gradio/dpt-depth-estimation-3d-obj
Tags: VISION, IMAGE

## Introduction

3D models are becoming more popular in machine learning and make for some of the most fun demos to experiment with. Using `gradio`, you can easily build a demo of your 3D image model and share it with anyone. The Gradio 3D Model component accepts 3 file types including: _.obj_, _.glb_, & _.gltf_.

This guide will show you how to build a demo for your 3D image model in a few lines of code; like the one below. Play around with 3D object by clicking around, dragging and zooming:

<gradio-app space="gradio/Model3D"> </gradio-app>

### Prerequisites

Make sure you have the `gradio` Python package already [installed](https://gradio.app/guides/quickstart).

## Taking a Look at the Code

Let's take a look at how to create the minimal interface above. The prediction function in this case will just return the original 3D model mesh, but you can change this function to run inference on your machine learning model. We'll take a look at more complex examples below.

```python
import gradio as gr
import os


def load_mesh(mesh_file_name):
    return mesh_file_name


demo = gr.Interface(
    fn=load_mesh,
    inputs=gr.Model3D(),
    outputs=gr.Model3D(
            clear_color=[0.0, 0.0, 0.0, 0.0],  label="3D Model"),
    examples=[
        [os.path.join(os.path.dirname(__file__), "files/Bunny.obj")],
        [os.path.join(os.path.dirname(__file__), "files/Duck.glb")],
        [os.path.join(os.path.dirname(__file__), "files/Fox.gltf")],
        [os.path.join(os.path.dirname(__file__), "files/face.obj")],
    ],
)

if __name__ == "__main__":
    demo.launch()
```

Let's break down the code above:

`load_mesh`: This is our 'prediction' function and for simplicity, this function will take in the 3D model mesh and return it.

Creating the Interface:

- `fn`: the prediction function that is used when the user clicks submit. In our case this is the `load_mesh` function.
- `inputs`: create a model3D input component. The input expects an uploaded file as a {str} filepath.
- `outputs`: create a model3D output component. The output component also expects a file as a {str} filepath.
  - `clear_color`: this is the background color of the 3D model canvas. Expects RGBa values.
  - `label`: the label that appears on the top left of the component.
- `examples`: list of 3D model files. The 3D model component can accept _.obj_, _.glb_, & _.gltf_ file types.
- `cache_examples`: saves the predicted output for the examples, to save time on inference.

## Exploring a more complex Model3D Demo:

Below is a demo that uses the DPT model to predict the depth of an image and then uses 3D Point Cloud to create a 3D object. Take a look at the [app.py](https://huggingface.co/spaces/gradio/dpt-depth-estimation-3d-obj/blob/main/app.py) file for a peek into the code and the model prediction function.
<gradio-app space="gradio/dpt-depth-estimation-3d-obj"> </gradio-app>

---

And you're done! That's all the code you need to build an interface for your Model3D model. Here are some references that you may find useful:

- Gradio's ["Getting Started" guide](https://gradio.app/getting_started/)
- The first [3D Model Demo](https://huggingface.co/spaces/gradio/Model3D) and [complete code](https://huggingface.co/spaces/gradio/Model3D/tree/main) (on Hugging Face Spaces)

---

<!-- Source: guides/11_other-tutorials/image-classification-in-pytorch.md -->
# Image Classification in PyTorch

Related spaces: https://huggingface.co/spaces/abidlabs/pytorch-image-classifier, https://huggingface.co/spaces/pytorch/ResNet, https://huggingface.co/spaces/pytorch/ResNext, https://huggingface.co/spaces/pytorch/SqueezeNet
Tags: VISION, RESNET, PYTORCH

## Introduction

Image classification is a central task in computer vision. Building better classifiers to classify what object is present in a picture is an active area of research, as it has applications stretching from autonomous vehicles to medical imaging.

Such models are perfect to use with Gradio's _image_ input component, so in this tutorial we will build a web demo to classify images using Gradio. We will be able to build the whole web application in Python, and it will look like the demo on the bottom of the page.

Let's get started!

### Prerequisites

Make sure you have the `gradio` Python package already [installed](/getting_started). We will be using a pretrained image classification model, so you should also have `torch` installed.

## Step 1 — Setting up the Image Classification Model

First, we will need an image classification model. For this tutorial, we will use a pretrained Resnet-18 model, as it is easily downloadable from [PyTorch Hub](https://pytorch.org/hub/pytorch_vision_resnet/). You can use a different pretrained model or train your own.

```python
import torch

model = torch.hub.load('pytorch/vision:v0.6.0', 'resnet18', pretrained=True).eval()
```

Because we will be using the model for inference, we have called the `.eval()` method.

## Step 2 — Defining a `predict` function

Next, we will need to define a function that takes in the _user input_, which in this case is an image, and returns the prediction. The prediction should be returned as a dictionary whose keys are class name and values are confidence probabilities. We will load the class names from this [text file](https://git.io/JJkYN).

In the case of our pretrained model, it will look like this:

```python
import requests
from PIL import Image
from torchvision import transforms

# Download human-readable labels for ImageNet.
response = requests.get("https://git.io/JJkYN")
labels = response.text.split("\n")

def predict(inp):
  inp = transforms.ToTensor()(inp).unsqueeze(0)
  with torch.no_grad():
    prediction = torch.nn.functional.softmax(model(inp)[0], dim=0)
    confidences = {labels[i]: float(prediction[i]) for i in range(1000)}
  return confidences
```

Let's break this down. The function takes one parameter:

- `inp`: the input image as a `PIL` image

Then, the function converts the image to a PIL Image and then eventually a PyTorch `tensor`, passes it through the model, and returns:

- `confidences`: the predictions, as a dictionary whose keys are class labels and whose values are confidence probabilities

## Step 3 — Creating a Gradio Interface

Now that we have our predictive function set up, we can create a Gradio Interface around it.

In this case, the input component is a drag-and-drop image component. To create this input, we use `Image(type="pil")` which creates the component and handles the preprocessing to convert that to a `PIL` image.

The output component will be a `Label`, which displays the top labels in a nice form. Since we don't want to show all 1,000 class labels, we will customize it to show only the top 3 images by constructing it as `Label(num_top_classes=3)`.

Finally, we'll add one more parameter, the `examples`, which allows us to prepopulate our interfaces with a few predefined examples. The code for Gradio looks like this:

```python
import gradio as gr

gr.Interface(fn=predict,
             inputs=gr.Image(type="pil"),
             outputs=gr.Label(num_top_classes=3),
             examples=["lion.jpg", "cheetah.jpg"]).launch()
```

This produces the following interface, which you can try right here in your browser (try uploading your own examples!):

<gradio-app space="gradio/pytorch-image-classifier">


---

And you're done! That's all the code you need to build a web demo for an image classifier. If you'd like to share with others, try setting `share=True` when you `launch()` the Interface!

---

<!-- Source: guides/11_other-tutorials/image-classification-with-vision-transformers.md -->
# Image Classification with Vision Transformers

Related spaces: https://huggingface.co/spaces/abidlabs/vision-transformer
Tags: VISION, TRANSFORMERS, HUB

## Introduction

Image classification is a central task in computer vision. Building better classifiers to classify what object is present in a picture is an active area of research, as it has applications stretching from facial recognition to manufacturing quality control.

State-of-the-art image classifiers are based on the _transformers_ architectures, originally popularized for NLP tasks. Such architectures are typically called vision transformers (ViT). Such models are perfect to use with Gradio's _image_ input component, so in this tutorial we will build a web demo to classify images using Gradio. We will be able to build the whole web application in a **single line of Python**, and it will look like the demo on the bottom of the page.

Let's get started!

### Prerequisites

Make sure you have the `gradio` Python package already [installed](/getting_started).

## Step 1 — Choosing a Vision Image Classification Model

First, we will need an image classification model. For this tutorial, we will use a model from the [Hugging Face Model Hub](https://huggingface.co/models?pipeline_tag=image-classification). The Hub contains thousands of models covering dozens of different machine learning tasks.

Expand the Tasks category on the left sidebar and select "Image Classification" as our task of interest. You will then see all of the models on the Hub that are designed to classify images.

At the time of writing, the most popular one is `google/vit-base-patch16-224`, which has been trained on ImageNet images at a resolution of 224x224 pixels. We will use this model for our demo.

## Step 2 — Loading the Vision Transformer Model with Gradio

When using a model from the Hugging Face Hub, we do not need to define the input or output components for the demo. Similarly, we do not need to be concerned with the details of preprocessing or postprocessing.
All of these are automatically inferred from the model tags.

Besides the import statement, it only takes a single line of Python to load and launch the demo.

We use the `gr.Interface.load()` method and pass in the path to the model including the `huggingface/` to designate that it is from the Hugging Face Hub.

```python
import gradio as gr

gr.Interface.load(
             "huggingface/google/vit-base-patch16-224",
             examples=["alligator.jpg", "laptop.jpg"]).launch()
```

Notice that we have added one more parameter, the `examples`, which allows us to prepopulate our interfaces with a few predefined examples.

This produces the following interface, which you can try right here in your browser. When you input an image, it is automatically preprocessed and sent to the Hugging Face Hub API, where it is passed through the model and returned as a human-interpretable prediction. Try uploading your own image!

<gradio-app space="gradio/vision-transformer">

---

And you're done! In one line of code, you have built a web demo for an image classifier. If you'd like to share with others, try setting `share=True` when you `launch()` the Interface!

---

<!-- Source: guides/11_other-tutorials/installing-gradio-in-a-virtual-environment.md -->
# Installing Gradio in a Virtual Environment

Tags: INSTALLATION

In this guide, we will describe step-by-step how to install `gradio` within a virtual environment. This guide will cover both Windows and MacOS/Linux systems.

## Virtual Environments

A virtual environment in Python is a self-contained directory that holds a Python installation for a particular version of Python, along with a number of additional packages. This environment is isolated from the main Python installation and other virtual environments. Each environment can have its own independent set of installed Python packages, which allows you to maintain different versions of libraries for different projects without conflicts.


Using virtual environments ensures that you can work on multiple Python projects on the same machine without any conflicts. This is particularly useful when different projects require different versions of the same library. It also simplifies dependency management and enhances reproducibility, as you can easily share the requirements of your project with others.


## Installing Gradio on Windows

To install Gradio on a Windows system in a virtual environment, follow these steps:

1. **Install Python**: Ensure you have Python 3.10 or higher installed. You can download it from [python.org](https://www.python.org/). You can verify the installation by running `python --version` or `python3 --version` in Command Prompt.


2. **Create a Virtual Environment**:
   Open Command Prompt and navigate to your project directory. Then create a virtual environment using the following command:

   ```bash
   python -m venv gradio-env
   ```

   This command creates a new directory `gradio-env` in your project folder, containing a fresh Python installation.

3. **Activate the Virtual Environment**:
   To activate the virtual environment, run:

   ```bash
   .\gradio-env\Scripts\activate
   ```

   Your command prompt should now indicate that you are working inside `gradio-env`. Note: you can choose a different name than `gradio-env` for your virtual environment in this step.


4. **Install Gradio**:
   Now, you can install Gradio using pip:

   ```bash
   pip install gradio
   ```

5. **Verification**:
   To verify the installation, run `python` and then type:

   ```python
   import gradio as gr
   print(gr.__version__)
   ```

   This will display the installed version of Gradio.

## Installing Gradio on MacOS/Linux

The installation steps on MacOS and Linux are similar to Windows but with some differences in commands.

1. **Install Python**:
   Python usually comes pre-installed on MacOS and most Linux distributions. You can verify the installation by running `python --version` in the terminal (note that depending on how Python is installed, you might have to use `python3` instead of `python` throughout these steps). 
   
   Ensure you have Python 3.10 or higher installed. If you do not have it installed, you can download it from [python.org](https://www.python.org/). 

2. **Create a Virtual Environment**:
   Open Terminal and navigate to your project directory. Then create a virtual environment using:

   ```bash
   python -m venv gradio-env
   ```

   Note: you can choose a different name than `gradio-env` for your virtual environment in this step.

3. **Activate the Virtual Environment**:
   To activate the virtual environment on MacOS/Linux, use:

   ```bash
   source gradio-env/bin/activate
   ```

4. **Install Gradio**:
   With the virtual environment activated, install Gradio using pip:

   ```bash
   pip install gradio
   ```

5. **Verification**:
   To verify the installation, run `python` and then type:

   ```python
   import gradio as gr
   print(gr.__version__)
   ```

   This will display the installed version of Gradio.

By following these steps, you can successfully install Gradio in a virtual environment on your operating system, ensuring a clean and managed workspace for your Python projects.

---

<!-- Source: guides/11_other-tutorials/named-entity-recognition.md -->
# Named-Entity Recognition

Related spaces: https://huggingface.co/spaces/rajistics/biobert_ner_demo, https://huggingface.co/spaces/abidlabs/ner, https://huggingface.co/spaces/rajistics/Financial_Analyst_AI
Tags: NER, TEXT, HIGHLIGHT

## Introduction

Named-entity recognition (NER), also known as token classification or text tagging, is the task of taking a sentence and classifying every word (or "token") into different categories, such as names of people or names of locations, or different parts of speech.

For example, given the sentence:

> Does Chicago have any Pakistani restaurants?

A named-entity recognition algorithm may identify:

- "Chicago" as a **location**
- "Pakistani" as an **ethnicity**

and so on.

Using `gradio` (specifically the `HighlightedText` component), you can easily build a web demo of your NER model and share that with the rest of your team.

Here is an example of a demo that you'll be able to build:

$demo_ner_pipeline

This tutorial will show how to take a pretrained NER model and deploy it with a Gradio interface. We will show two different ways to use the `HighlightedText` component -- depending on your NER model, either of these two ways may be easier to learn!

### Prerequisites

Make sure you have the `gradio` Python package already [installed](/getting_started). You will also need a pretrained named-entity recognition model. You can use your own, while in this tutorial, we will use one from the `transformers` library.

### Approach 1: List of Entity Dictionaries

Many named-entity recognition models output a list of dictionaries. Each dictionary consists of an _entity_, a "start" index, and an "end" index. This is, for example, how NER models in the `transformers` library operate:

```py
from transformers import pipeline
ner_pipeline = pipeline("ner")
ner_pipeline("Does Chicago have any Pakistani restaurants")
```

Output:

```bash
[{'entity': 'I-LOC',
  'score': 0.9988978,
  'index': 2,
  'word': 'Chicago',
  'start': 5,
  'end': 12},
 {'entity': 'I-MISC',
  'score': 0.9958592,
  'index': 5,
  'word': 'Pakistani',
  'start': 22,
  'end': 31}]
```

If you have such a model, it is very easy to hook it up to Gradio's `HighlightedText` component. All you need to do is pass in this **list of entities**, along with the **original text** to the model, together as dictionary, with the keys being `"entities"` and `"text"` respectively.

Here is a complete example:

$code_ner_pipeline
$demo_ner_pipeline

### Approach 2: List of Tuples

An alternative way to pass data into the `HighlightedText` component is a list of tuples. The first element of each tuple should be the word or words that are being classified into a particular entity. The second element should be the entity label (or `None` if they should be unlabeled). The `HighlightedText` component automatically strings together the words and labels to display the entities.

In some cases, this can be easier than the first approach. Here is a demo showing this approach using Spacy's parts-of-speech tagger:

$code_text_analysis
$demo_text_analysis

---

And you're done! That's all you need to know to build a web-based GUI for your NER model.

Fun tip: you can share your NER demo instantly with others simply by setting `share=True` in `launch()`.

---

<!-- Source: guides/11_other-tutorials/plot-component-for-maps.md -->
# How to Use the Plot Component for Maps

Tags: PLOTS, MAPS

## Introduction

This guide explains how you can use Gradio to plot geographical data on a map using the `gradio.Plot` component. The Gradio `Plot` component works with Matplotlib, Bokeh and Plotly. Plotly is what we will be working with in this guide. Plotly allows developers to easily create all sorts of maps with their geographical data. Take a look [here](https://plotly.com/python/maps/) for some examples.

## Overview

We will be using the New York City Airbnb dataset, which is hosted on kaggle [here](https://www.kaggle.com/datasets/dgomonov/new-york-city-airbnb-open-data). I've uploaded it to the Hugging Face Hub as a dataset [here](https://huggingface.co/datasets/gradio/NYC-Airbnb-Open-Data) for easier use and download. Using this data we will plot Airbnb locations on a map output and allow filtering based on price and location. Below is the demo that we will be building. ⚡️

$demo_map_airbnb

## Step 1 - Loading CSV data 💾

Let's start by loading the Airbnb NYC data from the Hugging Face Hub.

```python
from datasets import load_dataset

dataset = load_dataset("gradio/NYC-Airbnb-Open-Data", split="train")
df = dataset.to_pandas()

def filter_map(min_price, max_price, boroughs):
    new_df = df[(df['neighbourhood_group'].isin(boroughs)) &
            (df['price'] > min_price) & (df['price'] < max_price)]
    names = new_df["name"].tolist()
    prices = new_df["price"].tolist()
    text_list = [(names[i], prices[i]) for i in range(0, len(names))]
```

In the code above, we first load the csv data into a pandas dataframe. Let's begin by defining a function that we will use as the prediction function for the gradio app. This function will accept the minimum price and maximum price range as well as the list of boroughs to filter the resulting map. We can use the passed in values (`min_price`, `max_price`, and list of `boroughs`) to filter the dataframe and create `new_df`. Next we will create `text_list` of the names and prices of each Airbnb to use as labels on the map.

## Step 2 - Map Figure 🌐

Plotly makes it easy to work with maps. Let's take a look below how we can create a map figure.

```python
import plotly.graph_objects as go

fig = go.Figure(go.Scattermapbox(
            customdata=text_list,
            lat=new_df['latitude'].tolist(),
            lon=new_df['longitude'].tolist(),
            mode='markers',
            marker=go.scattermapbox.Marker(
                size=6
            ),
            hoverinfo="text",
            hovertemplate='<b>Name</b>: %{customdata[0]}<br><b>Price</b>: $%{customdata[1]}'
        ))

fig.update_layout(
    mapbox_style="open-street-map",
    hovermode='closest',
    mapbox=dict(
        bearing=0,
        center=go.layout.mapbox.Center(
            lat=40.67,
            lon=-73.90
        ),
        pitch=0,
        zoom=9
    ),
)
```

Above, we create a scatter plot on mapbox by passing it our list of latitudes and longitudes to plot markers. We also pass in our custom data of names and prices for additional info to appear on every marker we hover over. Next we use `update_layout` to specify other map settings such as zoom, and centering.

More info [here](https://plotly.com/python/scattermapbox/) on scatter plots using Mapbox and Plotly.

## Step 3 - Gradio App ⚡️

We will use two `gr.Number` components and a `gr.CheckboxGroup` to allow users of our app to specify price ranges and borough locations. We will then use the `gr.Plot` component as an output for our Plotly + Mapbox map we created earlier.

```python
with gr.Blocks() as demo:
    with gr.Column():
        with gr.Row():
            min_price = gr.Number(value=250, label="Minimum Price")
            max_price = gr.Number(value=1000, label="Maximum Price")
        boroughs = gr.CheckboxGroup(choices=["Queens", "Brooklyn", "Manhattan", "Bronx", "Staten Island"], value=["Queens", "Brooklyn"], label="Select Boroughs:")
        btn = gr.Button(value="Update Filter")
        map = gr.Plot()
    demo.load(filter_map, [min_price, max_price, boroughs], map)
    btn.click(filter_map, [min_price, max_price, boroughs], map)
```

We layout these components using the `gr.Column` and `gr.Row` and we'll also add event triggers for when the demo first loads and when our "Update Filter" button is clicked in order to trigger the map to update with our new filters.

This is what the full demo code looks like:

$code_map_airbnb

## Step 4 - Deployment 🤗

If you run the code above, your app will start running locally.
You can even get a temporary shareable link by passing the `share=True` parameter to `launch`.

But what if you want to a permanent deployment solution?
Let's deploy our Gradio app to the free HuggingFace Spaces platform.

If you haven't used Spaces before, follow the previous guide [here](/using_hugging_face_integrations).

## Conclusion 🎉

And you're all done! That's all the code you need to build a map demo.

Here's a link to the demo [Map demo](https://huggingface.co/spaces/gradio/map_airbnb) and [complete code](https://huggingface.co/spaces/gradio/map_airbnb/blob/main/run.py) (on Hugging Face Spaces)

---

<!-- Source: guides/11_other-tutorials/running-background-tasks.md -->
# Running Background Tasks

Related spaces: https://huggingface.co/spaces/freddyaboulton/gradio-google-forms
Tags: TASKS, SCHEDULED, TABULAR, DATA

## Introduction

This guide explains how you can run background tasks from your gradio app.
Background tasks are operations that you'd like to perform outside the request-response
lifecycle of your app either once or on a periodic schedule.
Examples of background tasks include periodically synchronizing data to an external database or
sending a report of model predictions via email.

## Overview

We will be creating a simple "Google-forms-style" application to gather feedback from users of the gradio library.
We will use a local sqlite database to store our data, but we will periodically synchronize the state of the database
with a [HuggingFace Dataset](https://huggingface.co/datasets) so that our user reviews are always backed up.
The synchronization will happen in a background task running every 60 seconds.

At the end of the demo, you'll have a fully working application like this one:

<gradio-app space="freddyaboulton/gradio-google-forms"> </gradio-app>

## Step 1 - Write your database logic 💾

Our application will store the name of the reviewer, their rating of gradio on a scale of 1 to 5, as well as
any comments they want to share about the library. Let's write some code that creates a database table to
store this data. We'll also write some functions to insert a review into that table and fetch the latest 10 reviews.

We're going to use the `sqlite3` library to connect to our sqlite database but gradio will work with any library.

The code will look like this:

```python
DB_FILE = "./reviews.db"
db = sqlite3.connect(DB_FILE)

# Create table if it doesn't already exist
try:
    db.execute("SELECT * FROM reviews").fetchall()
    db.close()
except sqlite3.OperationalError:
    db.execute(
        '''
        CREATE TABLE reviews (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                              name TEXT, review INTEGER, comments TEXT)
        ''')
    db.commit()
    db.close()

def get_latest_reviews(db: sqlite3.Connection):
    reviews = db.execute("SELECT * FROM reviews ORDER BY id DESC limit 10").fetchall()
    total_reviews = db.execute("Select COUNT(id) from reviews").fetchone()[0]
    reviews = pd.DataFrame(reviews, columns=["id", "date_created", "name", "review", "comments"])
    return reviews, total_reviews


def add_review(name: str, review: int, comments: str):
    db = sqlite3.connect(DB_FILE)
    cursor = db.cursor()
    cursor.execute("INSERT INTO reviews(name, review, comments) VALUES(?,?,?)", [name, review, comments])
    db.commit()
    reviews, total_reviews = get_latest_reviews(db)
    db.close()
    return reviews, total_reviews
```

Let's also write a function to load the latest reviews when the gradio application loads:

```python
def load_data():
    db = sqlite3.connect(DB_FILE)
    reviews, total_reviews = get_latest_reviews(db)
    db.close()
    return reviews, total_reviews
```

## Step 2 - Create a gradio app ⚡

Now that we have our database logic defined, we can use gradio create a dynamic web page to ask our users for feedback!

```python
with gr.Blocks() as demo:
    with gr.Row():
        with gr.Column():
            name = gr.Textbox(label="Name", placeholder="What is your name?")
            review = gr.Radio(label="How satisfied are you with using gradio?", choices=[1, 2, 3, 4, 5])
            comments = gr.Textbox(label="Comments", lines=10, placeholder="Do you have any feedback on gradio?")
            submit = gr.Button(value="Submit Feedback")
        with gr.Column():
            data = gr.Dataframe(label="Most recently created 10 rows")
            count = gr.Number(label="Total number of reviews")
    submit.click(add_review, [name, review, comments], [data, count])
    demo.load(load_data, None, [data, count])
```

## Step 3 - Synchronize with HuggingFace Datasets 🤗

We could call `demo.launch()` after step 2 and have a fully functioning application. However,
our data would be stored locally on our machine. If the sqlite file were accidentally deleted, we'd lose all of our reviews!
Let's back up our data to a dataset on the HuggingFace hub.

Create a dataset [here](https://huggingface.co/datasets) before proceeding.

Now at the **top** of our script, we'll use the [huggingface hub client library](https://huggingface.co/docs/huggingface_hub/index)
to connect to our dataset and pull the latest backup.

```python
TOKEN = os.environ.get('HUB_TOKEN')
repo = huggingface_hub.Repository(
    local_dir="data",
    repo_type="dataset",
    clone_from="<name-of-your-dataset>",
    use_auth_token=TOKEN
)
repo.git_pull()

shutil.copyfile("./data/reviews.db", DB_FILE)
```

Note that you'll have to get an access token from the "Settings" tab of your HuggingFace for the above code to work.
In the script, the token is securely accessed via an environment variable.

![access_token](https://github.com/gradio-app/gradio/blob/main/guides/assets/access_token.png?raw=true)

Now we will create a background task to synch our local database to the dataset hub every 60 seconds.
We will use the [AdvancedPythonScheduler](https://apscheduler.readthedocs.io/en/3.x/) to handle the scheduling.
However, this is not the only task scheduling library available. Feel free to use whatever you are comfortable with.

The function to back up our data will look like this:

```python
from apscheduler.schedulers.background import BackgroundScheduler

def backup_db():
    shutil.copyfile(DB_FILE, "./data/reviews.db")
    db = sqlite3.connect(DB_FILE)
    reviews = db.execute("SELECT * FROM reviews").fetchall()
    pd.DataFrame(reviews).to_csv("./data/reviews.csv", index=False)
    print("updating db")
    repo.push_to_hub(blocking=False, commit_message=f"Updating data at {datetime.datetime.now()}")


scheduler = BackgroundScheduler()
scheduler.add_job(func=backup_db, trigger="interval", seconds=60)
scheduler.start()
```

## Step 4 (Bonus) - Deployment to HuggingFace Spaces

You can use the HuggingFace [Spaces](https://huggingface.co/spaces) platform to deploy this application for free ✨

If you haven't used Spaces before, follow the previous guide [here](/using_hugging_face_integrations).
You will have to use the `HUB_TOKEN` environment variable as a secret in the Guides.

## Conclusion

Congratulations! You know how to run background tasks from your gradio app on a schedule ⏲️.

Checkout the application running on Spaces [here](https://huggingface.co/spaces/freddyaboulton/gradio-google-forms).
The complete code is [here](https://huggingface.co/spaces/freddyaboulton/gradio-google-forms/blob/main/app.py)

---

<!-- Source: guides/11_other-tutorials/running-gradio-on-your-web-server-with-nginx.md -->
# Running a Gradio App on your Web Server with Nginx

Tags: DEPLOYMENT, WEB SERVER, NGINX

## Introduction

Gradio is a Python library that allows you to quickly create customizable web apps for your machine learning models and data processing pipelines. Gradio apps can be deployed on [Hugging Face Spaces](https://hf.space) for free.

In some cases though, you might want to deploy a Gradio app on your own web server. You might already be using [Nginx](https://www.nginx.com/), a highly performant web server, to serve your website (say `https://www.example.com`), and you want to attach Gradio to a specific subpath on your website (e.g. `https://www.example.com/gradio-demo`).

In this Guide, we will guide you through the process of running a Gradio app behind Nginx on your own web server to achieve this.

**Prerequisites**

1. A Linux web server with [Nginx installed](https://www.nginx.com/blog/setting-up-nginx/) and [Gradio installed](/quickstart)
2. A working Gradio app saved as a python file on your web server

## Editing your Nginx configuration file

1. Start by editing the Nginx configuration file on your web server. By default, this is located at: `/etc/nginx/nginx.conf`

In the `http` block, add the following line to include server block configurations from a separate file:

```bash
include /etc/nginx/sites-enabled/*;
```

2. Create a new file in the `/etc/nginx/sites-available` directory (create the directory if it does not already exist), using a filename that represents your app, for example: `sudo nano /etc/nginx/sites-available/my_gradio_app`

3. Paste the following into your file editor:

```bash
server {
    listen 80;
    server_name example.com www.example.com;  # Change this to your domain name

    location /gradio-demo/ {  # Change this if you'd like to server your Gradio app on a different path
        proxy_pass http://127.0.0.1:7860/; # Change this if your Gradio app will be running on a different port
        proxy_buffering off;
        proxy_redirect off;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```


Tip: Setting the `X-Forwarded-Host` and `X-Forwarded-Proto` headers is important as Gradio uses these, in conjunction with the `root_path` parameter discussed below, to construct the public URL that your app is being served on. Gradio uses the public URL to fetch various static assets. If these headers are not set, your Gradio app may load in a broken state.

*Note:* The `$host` variable does not include the host port. If you are serving your Gradio application on a raw IP address and port, you should use the `$http_host` variable instead, in these lines:

```bash
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Host $host;
```

## Run your Gradio app on your web server

1. Before you launch your Gradio app, you'll need to set the `root_path` to be the same as the subpath that you specified in your nginx configuration. This is necessary for Gradio to run on any subpath besides the root of the domain.

    *Note:* Instead of a subpath, you can also provide a complete URL for `root_path` (beginning with `http` or `https`) in which case the `root_path` is treated as an absolute URL instead of a URL suffix (but in this case, you'll need to update the `root_path` if the domain changes).

Here's a simple example of a Gradio app with a custom `root_path` corresponding to the Nginx configuration above.

```python
import gradio as gr
import time

def test(x):
time.sleep(4)
return x

gr.Interface(test, "textbox", "textbox").queue().launch(root_path="/gradio-demo")
```

2. Start a `tmux` session by typing `tmux` and pressing enter (optional)

It's recommended that you run your Gradio app in a `tmux` session so that you can keep it running in the background easily

3. Then, start your Gradio app. Simply type in `python` followed by the name of your Gradio python file. By default, your app will run on `localhost:7860`, but if it starts on a different port, you will need to update the nginx configuration file above.

## Restart Nginx

1. If you are in a tmux session, exit by typing CTRL+B (or CMD+B), followed by the "D" key.

2. Finally, restart nginx by running `sudo systemctl restart nginx`.

And that's it! If you visit `https://example.com/gradio-demo` on your browser, you should see your Gradio app running there

---

<!-- Source: guides/11_other-tutorials/setting-up-a-demo-for-maximum-performance.md -->
# Setting Up a Demo for Maximum Performance

Tags: CONCURRENCY, LATENCY, PERFORMANCE

Let's say that your Gradio demo goes _viral_ on social media -- you have lots of users trying it out simultaneously, and you want to provide your users with the best possible experience or, in other words, minimize the amount of time that each user has to wait in the queue to see their prediction.

How can you configure your Gradio demo to handle the most traffic? In this Guide, we dive into some of the parameters of Gradio's `.queue()` method as well as some other related parameters, and discuss how to set these parameters in a way that allows you to serve lots of users simultaneously with minimal latency.

This is an advanced guide, so make sure you know the basics of Gradio already, such as [how to create and launch a Gradio Interface](https://gradio.app/guides/quickstart/). Most of the information in this Guide is relevant whether you are hosting your demo on [Hugging Face Spaces](https://hf.space) or on your own server.

## Overview of Gradio's Queueing System

By default, every Gradio demo includes a built-in queuing system that scales to thousands of requests. When a user of your app submits a request (i.e. submits an input to your function), Gradio adds the request to the queue, and requests are processed in order, generally speaking (this is not exactly true, as discussed below). When the user's request has finished processing, the Gradio server returns the result back to the user using server-side events (SSE). The SSE protocol has several advantages over simply using HTTP POST requests: 

(1) They do not time out -- most browsers raise a timeout error if they do not get a response to a POST request after a short period of time (e.g. 1 min). This can be a problem if your inference function takes longer than 1 minute to run or if many people are trying out your demo at the same time, resulting in increased latency.

(2) They allow the server to send multiple updates to the frontend. This means, for example, that the server can send a real-time ETA of how long your prediction will take to complete.

To configure the queue, simply call the `.queue()` method before launching an `Interface`, `TabbedInterface`, `ChatInterface` or any `Blocks`. Here's an example:

```py
import gradio as gr

app = gr.Interface(lambda x:x, "image", "image")
app.queue()  # <-- Sets up a queue with default parameters
app.launch()
```

**How Requests are Processed from the Queue**

When a Gradio server is launched, a pool of threads is used to execute requests from the queue. By default, the maximum size of this thread pool is `40` (which is the default inherited from FastAPI, on which the Gradio server is based). However, this does *not* mean that 40 requests are always processed in parallel from the queue. 

Instead, Gradio uses a **single-function-single-worker** model by default. This means that each worker thread is only assigned a single function from among all of the functions that could be part of your Gradio app. This ensures that you do not see, for example, out-of-memory errors, due to multiple workers calling a machine learning model at the same time. Suppose you have 3 functions in your Gradio app: A, B, and C. And you see the following sequence of 7 requests come in from users using your app:

```
1 2 3 4 5 6 7
-------------
A B A A C B A
```

Initially, 3 workers will get dispatched to handle requests 1, 2, and 5 (corresponding to functions: A, B, C). As soon as any of these workers finish, they will start processing the next function in the queue of the same function type, e.g. the worker that finished processing request 1 will start processing request 3, and so on.

If you want to change this behavior, there are several parameters that can be used to configure the queue and help reduce latency. Let's go through them one-by-one.


### The `default_concurrency_limit` parameter in `queue()`

The first parameter we will explore is the `default_concurrency_limit` parameter in `queue()`. This controls how many workers can execute the same event. By default, this is set to `1`, but you can set it to a higher integer: `2`, `10`, or even `None` (in the last case, there is no limit besides the total number of available workers). 

This is useful, for example, if your Gradio app does not call any resource-intensive functions. If your app only queries external APIs, then you can set the `default_concurrency_limit` much higher. Increasing this parameter can **linearly multiply the capacity of your server to handle requests**.

So why not set this parameter much higher all the time? Keep in mind that since requests are processed in parallel, each request will consume memory to store the data and weights for processing. This means that you might get out-of-memory errors if you increase the `default_concurrency_limit` too high. You may also start to get diminishing returns if the `default_concurrency_limit` is too high because of costs of switching between different worker threads.

**Recommendation**: Increase the `default_concurrency_limit` parameter as high as you can while you continue to see performance gains or until you hit memory limits on your machine. You can [read about Hugging Face Spaces machine specs here](https://huggingface.co/docs/hub/spaces-overview).


### The `concurrency_limit` parameter in events

You can also set the number of requests that can be processed in parallel for each event individually. These take priority over the  `default_concurrency_limit` parameter described previously.

To do this, set the `concurrency_limit` parameter of any event listener, e.g. `btn.click(..., concurrency_limit=20)` or in the `Interface` or `ChatInterface` classes: e.g. `gr.Interface(..., concurrency_limit=20)`. By default, this parameter is set to the global `default_concurrency_limit`.


### The `max_threads` parameter in `launch()`

If your demo uses non-async functions, e.g. `def` instead of `async def`, they will be run in a threadpool. This threadpool has a size of 40 meaning that only 40 threads can be created to run your non-async functions. If you are running into this limit, you can increase the threadpool size with `max_threads`. The default value is 40.

Tip: You should use async functions whenever possible to increase the number of concurrent requests your app can handle. Quick functions that are not CPU-bound are good candidates to be written as `async`. This [guide](https://fastapi.tiangolo.com/async/) is a good primer on the concept.


### The `max_size` parameter in `queue()`

A more blunt way to reduce the wait times is simply to prevent too many people from joining the queue in the first place. You can set the maximum number of requests that the queue processes using the `max_size` parameter of `queue()`. If a request arrives when the queue is already of the maximum size, it will not be allowed to join the queue and instead, the user will receive an error saying that the queue is full and to try again. By default, `max_size=None`, meaning that there is no limit to the number of users that can join the queue.

Paradoxically, setting a `max_size` can often improve user experience because it prevents users from being dissuaded by very long queue wait times. Users who are more interested and invested in your demo will keep trying to join the queue, and will be able to get their results faster.

**Recommendation**: For a better user experience, set a `max_size` that is reasonable given your expectations of how long users might be willing to wait for a prediction.

### The `max_batch_size` parameter in events

Another way to increase the parallelism of your Gradio demo is to write your function so that it can accept **batches** of inputs. Most deep learning models can process batches of samples more efficiently than processing individual samples.

If you write your function to process a batch of samples, Gradio will automatically batch incoming requests together and pass them into your function as a batch of samples. You need to set `batch` to `True` (by default it is `False`) and set a `max_batch_size` (by default it is `4`) based on the maximum number of samples your function is able to handle. These two parameters can be passed into `gr.Interface()` or to an event in Blocks such as `.click()`.

While setting a batch is conceptually similar to having workers process requests in parallel, it is often _faster_ than setting the `concurrency_count` for deep learning models. The downside is that you might need to adapt your function a little bit to accept batches of samples instead of individual samples.

Here's an example of a function that does _not_ accept a batch of inputs -- it processes a single input at a time:

```py
import time

def trim_words(word, length):
    return word[:int(length)]

```

Here's the same function rewritten to take in a batch of samples:

```py
import time

def trim_words(words, lengths):
    trimmed_words = []
    for w, l in zip(words, lengths):
        trimmed_words.append(w[:int(l)])
    return [trimmed_words]

```

The second function can be used with `batch=True` and an appropriate `max_batch_size` parameter.

**Recommendation**: If possible, write your function to accept batches of samples, and then set `batch` to `True` and the `max_batch_size` as high as possible based on your machine's memory limits.

## Upgrading your Hardware (GPUs, TPUs, etc.)

If you have done everything above, and your demo is still not fast enough, you can upgrade the hardware that your model is running on. Changing the model from running on CPUs to running on GPUs will usually provide a 10x-50x increase in inference time for deep learning models.

It is particularly straightforward to upgrade your Hardware on Hugging Face Spaces. Simply click on the "Settings" tab in your Space and choose the Space Hardware you'd like.

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/spaces-gpu-settings.png)

While you might need to adapt portions of your machine learning inference code to run on a GPU (here's a [handy guide](https://cnvrg.io/pytorch-cuda/) if you are using PyTorch), Gradio is completely agnostic to the choice of hardware and will work completely fine if you use it with CPUs, GPUs, TPUs, or any other hardware!

Note: your GPU memory is different than your CPU memory, so if you upgrade your hardware,
you might need to adjust the value of the `default_concurrency_limit` parameter described above.

## Conclusion

Congratulations! You know how to set up a Gradio demo for maximum performance. Good luck on your next viral demo!

---

<!-- Source: guides/11_other-tutorials/styling-the-gradio-dataframe.md -->
# How to Style the Gradio Dataframe

Tags: DATAFRAME, STYLE, COLOR

## Introduction

Data visualization is a crucial aspect of data analysis and machine learning. The Gradio `DataFrame` component is a popular way to display tabular data within a web application. 

But what if you want to stylize the table of data? What if you want to add background colors, partially highlight cells, or change the display precision of numbers? This Guide is for you!



Let's dive in!

**Prerequisites**: We'll be using the `gradio.Blocks` class in our examples.
You can [read the Guide to Blocks first](https://gradio.app/blocks-and-event-listeners) if you are not already familiar with it. Also please make sure you are using the **latest version** version of Gradio: `pip install --upgrade gradio`.


## The Pandas `Styler`

The Gradio `DataFrame` component now supports values of the type `Styler` from the `pandas` class. This allows us to reuse the rich existing API and documentation of the `Styler` class instead of inventing a new style format on our own. Here's a complete example of how it looks:

```python
import pandas as pd 
import gradio as gr

# Creating a sample dataframe
df = pd.DataFrame({
    "A" : [14, 4, 5, 4, 1], 
    "B" : [5, 2, 54, 3, 2], 
    "C" : [20, 20, 7, 3, 8], 
    "D" : [14, 3, 6, 2, 6], 
    "E" : [23, 45, 64, 32, 23]
}) 

# Applying style to highlight the maximum value in each row
styler = df.style.highlight_max(color = 'lightgreen', axis = 0)

# Displaying the styled dataframe in Gradio
with gr.Blocks() as demo:
    gr.DataFrame(styler)
    
demo.launch()
```

The Styler class can be used to apply conditional formatting and styling to dataframes, making them more visually appealing and interpretable. You can highlight certain values, apply gradients, or even use custom CSS to style the DataFrame. The Styler object is applied to a DataFrame and it returns a new object with the relevant styling properties, which can then be previewed directly, or rendered dynamically in a Gradio interface.

To read more about the Styler object, read the official `pandas` documentation at: https://pandas.pydata.org/docs/user_guide/style.html

Below, we'll explore a few examples:

### Highlighting Cells

Ok, so let's revisit the previous example. We start by creating a `pd.DataFrame` object and then highlight the highest value in each row with a light green color:

```python
import pandas as pd 

# Creating a sample dataframe
df = pd.DataFrame({
    "A" : [14, 4, 5, 4, 1], 
    "B" : [5, 2, 54, 3, 2], 
    "C" : [20, 20, 7, 3, 8], 
    "D" : [14, 3, 6, 2, 6], 
    "E" : [23, 45, 64, 32, 23]
}) 

# Applying style to highlight the maximum value in each row
styler = df.style.highlight_max(color = 'lightgreen', axis = 0)
```

Now, we simply pass this object into the Gradio `DataFrame` and we can visualize our colorful table of data in 4 lines of python:

```python
import gradio as gr

with gr.Blocks() as demo:
    gr.Dataframe(styler)
    
demo.launch()
```

Here's how it looks:

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/df-highlight.png)

### Font Colors

Apart from highlighting cells, you might want to color specific text within the cells. Here's how you can change text colors for certain columns:

```python
import pandas as pd 
import gradio as gr

# Creating a sample dataframe
df = pd.DataFrame({
    "A" : [14, 4, 5, 4, 1], 
    "B" : [5, 2, 54, 3, 2], 
    "C" : [20, 20, 7, 3, 8], 
    "D" : [14, 3, 6, 2, 6], 
    "E" : [23, 45, 64, 32, 23]
}) 

# Function to apply text color
def highlight_cols(x): 
    df = x.copy() 
    df.loc[:, :] = 'color: purple'
    df[['B', 'C', 'E']] = 'color: green'
    return df 

# Applying the style function
s = df.style.apply(highlight_cols, axis = None)

# Displaying the styled dataframe in Gradio
with gr.Blocks() as demo:
    gr.DataFrame(s)
    
demo.launch()
```

In this script, we define a custom function highlight_cols that changes the text color to purple for all cells, but overrides this for columns B, C, and E with green. Here's how it looks:

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/df-color.png)

### Display Precision 

Sometimes, the data you are dealing with might have long floating numbers, and you may want to display only a fixed number of decimals for simplicity. The pandas Styler object allows you to format the precision of numbers displayed. Here's how you can do this:

```python
import pandas as pd
import gradio as gr

# Creating a sample dataframe with floating numbers
df = pd.DataFrame({
    "A" : [14.12345, 4.23456, 5.34567, 4.45678, 1.56789], 
    "B" : [5.67891, 2.78912, 54.89123, 3.91234, 2.12345], 
    # ... other columns
}) 

# Setting the precision of numbers to 2 decimal places
s = df.style.format("{:.2f}")

# Displaying the styled dataframe in Gradio
with gr.Blocks() as demo:
    gr.DataFrame(s)
    
demo.launch()
```

In this script, the format method of the Styler object is used to set the precision of numbers to two decimal places. Much cleaner now:

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/df-precision.png)



## Custom Styling

So far, we've been restricting ourselves to styling that is supported by the Pandas `Styler` class. But what if you want to create custom styles like partially highlighting cells based on their values:

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/dataframe_custom_styling.png)


This isn't possible with `Styler`, but you can do this by creating your own **`styling`** array, which is a 2D array the same size and shape as your data. Each element in this list should be a CSS style string (e.g. `"background-color: green"`) that applies to the `<td>` element containing the cell value (or an empty string if no custom CSS should be applied). Similarly, you can create a **`display_value`** array which controls the value that is displayed in each cell (which can be different the underlying value which is the one that is used for searching/sorting).

Here's the complete code for how to can use custom styling with `gr.Dataframe` as in the screenshot above:

$code_dataframe_custom_styling


## Note about Interactivity

One thing to keep in mind is that the gradio `DataFrame` component only accepts custom styling objects when it is non-interactive (i.e. in "static" mode). If the `DataFrame` component is interactive, then the styling information is ignored and instead the raw table values are shown instead. 

The `DataFrame` component is by default non-interactive, unless it is used as an input to an event. In which case, you can force the component to be non-interactive by setting the `interactive` prop like this:

```python
c = gr.DataFrame(styler, interactive=False)
```

## Conclusion 🎉

This is just a taste of what's possible using the `gradio.DataFrame` component with the `Styler` class from `pandas`. Try it out and let us know what you think!

---

<!-- Source: guides/11_other-tutorials/theming-guide.md -->
# Theming

Tags: THEMES

## Introduction

Gradio features a built-in theming engine that lets you customize the look and feel of your app. You can choose from a variety of themes, or create your own. To do so, pass the `theme=` kwarg to the `launch()` method of `Blocks` or `Interface`. For example:

```python
with gr.Blocks() as demo:
    ... # your code here
demo.launch(theme=gr.themes.Soft())
    ...
```

<div class="wrapper">
<iframe
	src="https://gradio-theme-soft.hf.space?__theme=light"
	frameborder="0"
></iframe>
</div>

Gradio comes with a set of prebuilt themes which you can load from `gr.themes.*`. These are:


* `gr.themes.Base()` - the `"base"` theme sets the primary color to blue but otherwise has minimal styling, making it particularly useful as a base for creating new, custom themes.
* `gr.themes.Default()` - the `"default"` Gradio 5 theme, with a vibrant orange primary color and gray secondary color.
* `gr.themes.Origin()` - the `"origin"` theme is most similar to Gradio 4 styling. Colors, especially in light mode, are more subdued than the Gradio 5 default theme.
* `gr.themes.Citrus()` - the `"citrus"` theme uses a yellow primary color, highlights form elements that are in focus, and includes fun 3D effects when buttons are clicked.
* `gr.themes.Monochrome()` - the `"monochrome"` theme uses a black primary and white secondary color, and uses serif-style fonts, giving the appearance of a black-and-white newspaper. 
* `gr.themes.Soft()` - the `"soft"` theme uses a purple primary color and white secondary color. It also increases the border radius around buttons and form elements and highlights labels.
* `gr.themes.Glass()` - the `"glass"` theme has a blue primary color and a transclucent gray secondary color. The theme also uses vertical gradients to create a glassy effect.
* `gr.themes.Ocean()` - the `"ocean"` theme has a blue-green primary color and gray secondary color. The theme also uses horizontal gradients, especially for buttons and some form elements.


Each of these themes set values for hundreds of CSS variables. You can use prebuilt themes as a starting point for your own custom themes, or you can create your own themes from scratch. Let's take a look at each approach.

## Using the Theme Builder

The easiest way to build a theme is using the Theme Builder. To launch the Theme Builder locally, run the following code:

```python
import gradio as gr

gr.themes.builder()
```

$demo_theme_builder

You can use the Theme Builder running on Spaces above, though it runs much faster when you launch it locally via `gr.themes.builder()`.

As you edit the values in the Theme Builder, the app will preview updates in real time. You can download the code to generate the theme you've created so you can use it in any Gradio app.

In the rest of the guide, we will cover building themes programmatically.

## Extending Themes via the Constructor

Although each theme has hundreds of CSS variables, the values for most these variables are drawn from 8 core variables which can be set through the constructor of each prebuilt theme. Modifying these 8 arguments allows you to quickly change the look and feel of your app.

### Core Colors

The first 3 constructor arguments set the colors of the theme and are `gradio.themes.Color` objects. Internally, these Color objects hold brightness values for the palette of a single hue, ranging from 50, 100, 200..., 800, 900, 950. Other CSS variables are derived from these 3 colors.

The 3 color constructor arguments are:

- `primary_hue`: This is the color draws attention in your theme. In the default theme, this is set to `gradio.themes.colors.orange`.
- `secondary_hue`: This is the color that is used for secondary elements in your theme. In the default theme, this is set to `gradio.themes.colors.blue`.
- `neutral_hue`: This is the color that is used for text and other neutral elements in your theme. In the default theme, this is set to `gradio.themes.colors.gray`.

You could modify these values using their string shortcuts, such as

```python
with gr.Blocks() as demo:
    ... # your code here
demo.launch(theme=gr.themes.Default(primary_hue="red", secondary_hue="pink"))
    ...
```

or you could use the `Color` objects directly, like this:

```python
with gr.Blocks() as demo:
    ... # your code here
demo.launch(theme=gr.themes.Default(primary_hue=gr.themes.colors.red, secondary_hue=gr.themes.colors.pink))
```

<div class="wrapper">
<iframe
	src="https://gradio-theme-extended-step-1.hf.space?__theme=light"
	frameborder="0"
></iframe>
</div>

Predefined colors are:

- `slate`
- `gray`
- `zinc`
- `neutral`
- `stone`
- `red`
- `orange`
- `amber`
- `yellow`
- `lime`
- `green`
- `emerald`
- `teal`
- `cyan`
- `sky`
- `blue`
- `indigo`
- `violet`
- `purple`
- `fuchsia`
- `pink`
- `rose`

You could also create your own custom `Color` objects and pass them in.

### Core Sizing

The next 3 constructor arguments set the sizing of the theme and are `gradio.themes.Size` objects. Internally, these Size objects hold pixel size values that range from `xxs` to `xxl`. Other CSS variables are derived from these 3 sizes.

- `spacing_size`: This sets the padding within and spacing between elements. In the default theme, this is set to `gradio.themes.sizes.spacing_md`.
- `radius_size`: This sets the roundedness of corners of elements. In the default theme, this is set to `gradio.themes.sizes.radius_md`.
- `text_size`: This sets the font size of text. In the default theme, this is set to `gradio.themes.sizes.text_md`.

You could modify these values using their string shortcuts, such as

```python
with gr.Blocks() as demo:
    ... # your code here
demo.launch(theme=gr.themes.Default(spacing_size="sm", radius_size="none"))
    ...
```

or you could use the `Size` objects directly, like this:

```python
with gr.Blocks() as demo:
    ... # your code here
demo.launch(theme=gr.themes.Default(spacing_size=gr.themes.sizes.spacing_sm, radius_size=gr.themes.sizes.radius_none))
    ...
```

<div class="wrapper">
<iframe
	src="https://gradio-theme-extended-step-2.hf.space?__theme=light"
	frameborder="0"
></iframe>
</div>

The predefined size objects are:

- `radius_none`
- `radius_sm`
- `radius_md`
- `radius_lg`
- `spacing_sm`
- `spacing_md`
- `spacing_lg`
- `text_sm`
- `text_md`
- `text_lg`

You could also create your own custom `Size` objects and pass them in.

### Core Fonts

The final 2 constructor arguments set the fonts of the theme. You can pass a list of fonts to each of these arguments to specify fallbacks. If you provide a string, it will be loaded as a system font. If you provide a `gradio.themes.GoogleFont`, the font will be loaded from Google Fonts.

- `font`: This sets the primary font of the theme. In the default theme, this is set to `gradio.themes.GoogleFont("IBM Plex Sans")`.
- `font_mono`: This sets the monospace font of the theme. In the default theme, this is set to `gradio.themes.GoogleFont("IBM Plex Mono")`.

You could modify these values such as the following:

```python
with gr.Blocks() as demo:
    ... # your code here
demo.launch(theme=gr.themes.Default(font=[gr.themes.GoogleFont("Inconsolata"), "Arial", "sans-serif"]))
    ...
```

<div class="wrapper">
<iframe
	src="https://gradio-theme-extended-step-3.hf.space?__theme=light"
	frameborder="0"
></iframe>
</div>

## Extending Themes via `.set()`

You can also modify the values of CSS variables after the theme has been loaded. To do so, use the `.set()` method of the theme object to get access to the CSS variables. For example:

```python
theme = gr.themes.Default(primary_hue="blue").set(
    loader_color="#FF0000",
    slider_color="#FF0000",
)

with gr.Blocks() as demo:
    ... # your code here
demo.launch(theme=theme)
```

In the example above, we've set the `loader_color` and `slider_color` variables to `#FF0000`, despite the overall `primary_color` using the blue color palette. You can set any CSS variable that is defined in the theme in this manner.

Your IDE type hinting should help you navigate these variables. Since there are so many CSS variables, let's take a look at how these variables are named and organized.

### CSS Variable Naming Conventions

CSS variable names can get quite long, like `button_primary_background_fill_hover_dark`! However they follow a common naming convention that makes it easy to understand what they do and to find the variable you're looking for. Separated by underscores, the variable name is made up of:

1. The target element, such as `button`, `slider`, or `block`.
2. The target element type or sub-element, such as `button_primary`, or `block_label`.
3. The property, such as `button_primary_background_fill`, or `block_label_border_width`.
4. Any relevant state, such as `button_primary_background_fill_hover`.
5. If the value is different in dark mode, the suffix `_dark`. For example, `input_border_color_focus_dark`.

Of course, many CSS variable names are shorter than this, such as `table_border_color`, or `input_shadow`.

### CSS Variable Organization

Though there are hundreds of CSS variables, they do not all have to have individual values. They draw their values by referencing a set of core variables and referencing each other. This allows us to only have to modify a few variables to change the look and feel of the entire theme, while also getting finer control of individual elements that we may want to modify.

#### Referencing Core Variables

To reference one of the core constructor variables, precede the variable name with an asterisk. To reference a core color, use the `*primary_`, `*secondary_`, or `*neutral_` prefix, followed by the brightness value. For example:

```python
theme = gr.themes.Default(primary_hue="blue").set(
    button_primary_background_fill="*primary_200",
    button_primary_background_fill_hover="*primary_300",
)
```

In the example above, we've set the `button_primary_background_fill` and `button_primary_background_fill_hover` variables to `*primary_200` and `*primary_300`. These variables will be set to the 200 and 300 brightness values of the blue primary color palette, respectively.

Similarly, to reference a core size, use the `*spacing_`, `*radius_`, or `*text_` prefix, followed by the size value. For example:

```python
theme = gr.themes.Default(radius_size="md").set(
    button_primary_border_radius="*radius_xl",
)
```

In the example above, we've set the `button_primary_border_radius` variable to `*radius_xl`. This variable will be set to the `xl` setting of the medium radius size range.

#### Referencing Other Variables

Variables can also reference each other. For example, look at the example below:

```python
theme = gr.themes.Default().set(
    button_primary_background_fill="#FF0000",
    button_primary_background_fill_hover="#FF0000",
    button_primary_border="#FF0000",
)
```

Having to set these values to a common color is a bit tedious. Instead, we can reference the `button_primary_background_fill` variable in the `button_primary_background_fill_hover` and `button_primary_border` variables, using a `*` prefix.

```python
theme = gr.themes.Default().set(
    button_primary_background_fill="#FF0000",
    button_primary_background_fill_hover="*button_primary_background_fill",
    button_primary_border="*button_primary_background_fill",
)
```

Now, if we change the `button_primary_background_fill` variable, the `button_primary_background_fill_hover` and `button_primary_border` variables will automatically update as well.

This is particularly useful if you intend to share your theme - it makes it easy to modify the theme without having to change every variable.

Note that dark mode variables automatically reference each other. For example:

```python
theme = gr.themes.Default().set(
    button_primary_background_fill="#FF0000",
    button_primary_background_fill_dark="#AAAAAA",
    button_primary_border="*button_primary_background_fill",
    button_primary_border_dark="*button_primary_background_fill_dark",
)
```

`button_primary_border_dark` will draw its value from `button_primary_background_fill_dark`, because dark mode always draw from the dark version of the variable.

## Creating a Full Theme

Let's say you want to create a theme from scratch! We'll go through it step by step - you can also see the source of prebuilt themes in the gradio source repo for reference - [here's the source](https://github.com/gradio-app/gradio/blob/main/gradio/themes/monochrome.py) for the Monochrome theme.

Our new theme class will inherit from `gradio.themes.Base`, a theme that sets a lot of convenient defaults. Let's make a simple demo that creates a dummy theme called Seafoam, and make a simple app that uses it.

$code_theme_new_step_1

<div class="wrapper">
<iframe
	src="https://gradio-theme-new-step-1.hf.space?__theme=light"
	frameborder="0"
></iframe>
</div>

The Base theme is very barebones, and uses `gr.themes.Blue` as it primary color - you'll note the primary button and the loading animation are both blue as a result. Let's change the defaults core arguments of our app. We'll overwrite the constructor and pass new defaults for the core constructor arguments.

We'll use `gr.themes.Emerald` as our primary color, and set secondary and neutral hues to `gr.themes.Blue`. We'll make our text larger using `text_lg`. We'll use `Quicksand` as our default font, loaded from Google Fonts.

$code_theme_new_step_2

<div class="wrapper">
<iframe
	src="https://gradio-theme-new-step-2.hf.space?__theme=light"
	frameborder="0"
></iframe>
</div>

See how the primary button and the loading animation are now green? These CSS variables are tied to the `primary_hue` variable.

Let's modify the theme a bit more directly. We'll call the `set()` method to overwrite CSS variable values explicitly. We can use any CSS logic, and reference our core constructor arguments using the `*` prefix.

$code_theme_new_step_3

<div class="wrapper">
<iframe
	src="https://gradio-theme-new-step-3.hf.space?__theme=light"
	frameborder="0"
></iframe>
</div>

Look how fun our theme looks now! With just a few variable changes, our theme looks completely different.

You may find it helpful to explore the [source code of the other prebuilt themes](https://github.com/gradio-app/gradio/blob/main/gradio/themes) to see how they modified the base theme. You can also find your browser's Inspector useful to select elements from the UI and see what CSS variables are being used in the styles panel.

## Sharing Themes

Once you have created a theme, you can upload it to the HuggingFace Hub to let others view it, use it, and build off of it!

### Uploading a Theme

There are two ways to upload a theme, via the theme class instance or the command line. We will cover both of them with the previously created `seafoam` theme.

- Via the class instance

Each theme instance has a method called `push_to_hub` we can use to upload a theme to the HuggingFace hub.

```python
seafoam.push_to_hub(repo_name="seafoam",
                    version="0.0.1",
					token="<token>")
```

- Via the command line

First save the theme to disk

```python
seafoam.dump(filename="seafoam.json")
```

Then use the `upload_theme` command:

```bash
upload_theme\
"seafoam.json"\
"seafoam"\
--version "0.0.1"\
--token "<token>"
```

In order to upload a theme, you must have a HuggingFace account and pass your [Access Token](https://huggingface.co/docs/huggingface_hub/quick-start#login)
as the `token` argument. However, if you log in via the [HuggingFace command line](https://huggingface.co/docs/huggingface_hub/quick-start#login) (which comes installed with `gradio`),
you can omit the `token` argument.

The `version` argument lets you specify a valid [semantic version](https://www.geeksforgeeks.org/introduction-semantic-versioning/) string for your theme.
That way your users are able to specify which version of your theme they want to use in their apps. This also lets you publish updates to your theme without worrying
about changing how previously created apps look. The `version` argument is optional. If omitted, the next patch version is automatically applied.

### Theme Previews

By calling `push_to_hub` or `upload_theme`, the theme assets will be stored in a [HuggingFace space](https://huggingface.co/docs/hub/spaces-overview).

For example, the theme preview for the calm seafoam theme is here: [calm seafoam preview](https://huggingface.co/spaces/shivalikasingh/calm_seafoam).

<div class="wrapper">
<iframe
	src="https://shivalikasingh-calm-seafoam.hf.space/?__theme=light"
	frameborder="0"
></iframe>
</div>

### Discovering Themes

The [Theme Gallery](https://huggingface.co/spaces/gradio/theme-gallery) shows all the public gradio themes. After publishing your theme,
it will automatically show up in the theme gallery after a couple of minutes.

You can sort the themes by the number of likes on the space and from most to least recently created as well as toggling themes between light and dark mode.

<div class="wrapper">
<iframe
	src="https://gradio-theme-gallery.static.hf.space"
	frameborder="0"
></iframe>
</div>

### Downloading

To use a theme from the hub, use the `from_hub` method on the `ThemeClass` and pass it to your app:

```python
my_theme = gr.Theme.from_hub("gradio/seafoam")

with gr.Blocks() as demo:
    ... # your code here
demo.launch(theme=my_theme)
```

You can also pass the theme string directly to the `launch()` method of `Blocks` or `Interface` (e.g. `demo.launch(theme="gradio/seafoam")`)

You can pin your app to an upstream theme version by using semantic versioning expressions.

For example, the following would ensure the theme we load from the `seafoam` repo was between versions `0.0.1` and `0.1.0`:

```python
with gr.Blocks() as demo:
    ... # your code here
demo.launch(theme="gradio/seafoam@>=0.0.1,<0.1.0")
    ....
```

Enjoy creating your own themes! If you make one you're proud of, please share it with the world by uploading it to the hub!
If you tag us on [Twitter](https://twitter.com/gradio) we can give your theme a shout out!

<style>
.wrapper {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 25px;
    height: 0;
}
.wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>

---

<!-- Source: guides/11_other-tutorials/understanding-gradio-share-links.md -->
# Share Links and Share Servers

You may already know that you can share any Gradio app that you build by setting `share=True` in the `.launch()` method. In other words, if you do:

```py
import gradio as gr

with gr.Blocks() as demo:
    ...

demo.launch(share=True)
```

This creates a publicly accessible **share link** (which looks like: `https://xxxxx.gradio.live`) to your Gradio application immediately, letting you share your app with anyone (while keeping the code and model running in your local environment). The link is created on Gradio's **share server**, which does not host your Gradio app, but instead creates a _tunnel_ to your locally-running Gradio app. 

This is particlarly useful when you are prototyping and want to get immediate feedback on your machine learning app, without having to deal with the hassle of hosting or deploying your application.

<video controls>
  <source src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/share-links.mov" type="video/mp4">
</video>

At any given time, more than 5,000 Gradio apps are being shared through share links. But how is this link created, and how can you create your own share server? Read on!

### Fast Reverse Proxy (FRP)

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/frp-gradio-diagram.svg)

Gradio share links are powered by Fast Reverse Proxy (FRP), an [open-source tunneling solution](https://github.com/huggingface/frp). Here's how it works:

When you create a Gradio app with `share=True`, the FRP Client is automatically downloaded to your local machine (if not already installed). This client establishes a secure TLS tunnel to Gradio's Share Server, which hosts the FRP Server component capable of handling thousands of simultaneous connections.

Once the tunnel is established, Gradio's Share Server exposes your locally-running application to the internet under a unique domain in the format `xxxxx.gradio.live`. This entire process happens in the background, when you launch a Gradio app with `share=True`.

Next, we'll dive deeper into both the FRP Client and FRP Server, as they are used in Gradio.

### FRP Client

We use a [modified version of the FRP Client](https://github.com/huggingface/frp/tree/tls/client), which runs on your machine. We package binaries for the most common operating systems, and the FRP Client for your system is downloaded the first time you create a share link on your machine.

**Code**:
* The complete Go code for the client can be found [in this directory](https://github.com/huggingface/frp/tree/tls/client).
* We use this [Make script](https://github.com/huggingface/frp/blob/tls/Makefile) to package the Go code into binaries for each operating system.

**Troubleshooting**: Some antivirus programs (notably Windows Defender) block the download of the FRP Client. In this case, you'll see a message with details on how to install the file manually, something like:

```
Could not create share link. Missing file: /Users/.../frpc_darwin_arm64_v0.3. 

Please check your internet connection. This can happen if your antivirus software blocks the download of this file. You can install manually by following these steps: 

1. Download this file: https://cdn-media.huggingface.co/frpc-gradio-0.3/frpc_darwin_arm64
2. Rename the downloaded file to: frpc_darwin_arm64_v0.3
3. Move the file to this location: /Users/...
```

If this does not work, you may need to [whitelist this file with your antivirus](https://www.makeuseof.com/how-to-whitelist-files-windows-defender/) in order to use the share links.

### FRP Server

Gradio runs a share server, which is a modified version of the FRP server. This server handles the public-facing side of the tunnel, receiving incoming connections from the internet and routing them to the appropriate FRP client running on your local machine.

The official Gradio share server is hosted at `gradio.live`, and we make our best effort to keep it running reliably at all times. This is the server that's used by default when you set `share=True` in your Gradio applications. You can check the current operational status of the official Gradio share server at [https://status.gradio.app/](https://status.gradio.app/). 

If you prefer, you can also host your own FRP server. This gives you complete control over the tunneling infrastructure and can be useful for enterprise deployments or situations where you need custom domains or additional security measures, or if you want to avoid the 72 hour timeout that is in place for links created through Gradio's official share server. Here are the instructions for running your own [Gradio Share Server](https://github.com/huggingface/frp?tab=readme-ov-file#why-run-your-own-share-server).


**Code**:
* The complete Go code for the client can be found [in this directory](https://github.com/huggingface/frp/tree/dev/server).
* The Dockerfile to launch [the FRP Server](https://github.com/huggingface/frp/blob/dev/dockerfiles/Dockerfile-for-frps) can be found here.

**Troubleshooting**: Gradio's Share Server may occasionally go down, despite our best effort to keep it running. If the [status page](https://status.gradio.app/) shows that the Gradio server is down, we'll work on fixing it, no need to create an issue!

---

<!-- Source: guides/11_other-tutorials/using-flagging.md -->
# Using Flagging

Related spaces: https://huggingface.co/spaces/gradio/calculator-flagging-crowdsourced, https://huggingface.co/spaces/gradio/calculator-flagging-options, https://huggingface.co/spaces/gradio/calculator-flagging-basic
Tags: FLAGGING, DATA

## Introduction

When you demo a machine learning model, you might want to collect data from users who try the model, particularly data points in which the model is not behaving as expected. Capturing these "hard" data points is valuable because it allows you to improve your machine learning model and make it more reliable and robust.

Gradio simplifies the collection of this data by including a **Flag** button with every `Interface`. This allows a user or tester to easily send data back to the machine where the demo is running. In this Guide, we discuss more about how to use the flagging feature, both with `gradio.Interface` as well as with `gradio.Blocks`.

## The **Flag** button in `gradio.Interface`

Flagging with Gradio's `Interface` is especially easy. By default, underneath the output components, there is a button marked **Flag**. When a user testing your model sees input with interesting output, they can click the flag button to send the input and output data back to the machine where the demo is running. The sample is saved to a CSV log file (by default). If the demo involves images, audio, video, or other types of files, these are saved separately in a parallel directory and the paths to these files are saved in the CSV file.

There are [four parameters](https://gradio.app/docs/interface#initialization) in `gradio.Interface` that control how flagging works. We will go over them in greater detail.

- `flagging_mode`: this parameter can be set to either `"manual"` (default), `"auto"`, or `"never"`.
  - `manual`: users will see a button to flag, and samples are only flagged when the button is clicked.
  - `auto`: users will not see a button to flag, but every sample will be flagged automatically.
  - `never`: users will not see a button to flag, and no sample will be flagged.
- `flagging_options`: this parameter can be either `None` (default) or a list of strings.
  - If `None`, then the user simply clicks on the **Flag** button and no additional options are shown.
  - If a list of strings are provided, then the user sees several buttons, corresponding to each of the strings that are provided. For example, if the value of this parameter is `["Incorrect", "Ambiguous"]`, then buttons labeled **Flag as Incorrect** and **Flag as Ambiguous** appear. This only applies if `flagging_mode` is `"manual"`.
  - The chosen option is then logged along with the input and output.
- `flagging_dir`: this parameter takes a string.
  - It represents what to name the directory where flagged data is stored.
- `flagging_callback`: this parameter takes an instance of a subclass of the `FlaggingCallback` class
  - Using this parameter allows you to write custom code that gets run when the flag button is clicked
  - By default, this is set to an instance of `gr.JSONLogger`

## What happens to flagged data?

Within the directory provided by the `flagging_dir` argument, a JSON file will log the flagged data.

Here's an example: The code below creates the calculator interface embedded below it:

```python
import gradio as gr


def calculator(num1, operation, num2):
    if operation == "add":
        return num1 + num2
    elif operation == "subtract":
        return num1 - num2
    elif operation == "multiply":
        return num1 * num2
    elif operation == "divide":
        return num1 / num2


iface = gr.Interface(
    calculator,
    ["number", gr.Radio(["add", "subtract", "multiply", "divide"]), "number"],
    "number",
    flagging_mode="manual"
)

iface.launch()
```

<gradio-app space="gradio/calculator-flagging-basic"></gradio-app>

When you click the flag button above, the directory where the interface was launched will include a new flagged subfolder, with a csv file inside it. This csv file includes all the data that was flagged.

```directory
+-- flagged/
|   +-- logs.csv
```

_flagged/logs.csv_

```csv
num1,operation,num2,Output,timestamp
5,add,7,12,2022-01-31 11:40:51.093412
6,subtract,1.5,4.5,2022-01-31 03:25:32.023542
```

If the interface involves file data, such as for Image and Audio components, folders will be created to store those flagged data as well. For example an `image` input to `image` output interface will create the following structure.

```directory
+-- flagged/
|   +-- logs.csv
|   +-- image/
|   |   +-- 0.png
|   |   +-- 1.png
|   +-- Output/
|   |   +-- 0.png
|   |   +-- 1.png
```

_flagged/logs.csv_

```csv
im,Output timestamp
im/0.png,Output/0.png,2022-02-04 19:49:58.026963
im/1.png,Output/1.png,2022-02-02 10:40:51.093412
```

If you wish for the user to provide a reason for flagging, you can pass a list of strings to the `flagging_options` argument of Interface. Users will have to select one of these choices when flagging, and the option will be saved as an additional column to the CSV.

If we go back to the calculator example, the following code will create the interface embedded below it.

```python
iface = gr.Interface(
    calculator,
    ["number", gr.Radio(["add", "subtract", "multiply", "divide"]), "number"],
    "number",
    flagging_mode="manual",
    flagging_options=["wrong sign", "off by one", "other"]
)

iface.launch()
```

<gradio-app space="gradio/calculator-flagging-options"></gradio-app>

When users click the flag button, the csv file will now include a column indicating the selected option.

_flagged/logs.csv_

```csv
num1,operation,num2,Output,flag,timestamp
5,add,7,-12,wrong sign,2022-02-04 11:40:51.093412
6,subtract,1.5,3.5,off by one,2022-02-04 11:42:32.062512
```

## Flagging with Blocks

What about if you are using `gradio.Blocks`? On one hand, you have even more flexibility
with Blocks -- you can write whatever Python code you want to run when a button is clicked,
and assign that using the built-in events in Blocks.

At the same time, you might want to use an existing `FlaggingCallback` to avoid writing extra code.
This requires two steps:

1. You have to run your callback's `.setup()` somewhere in the code prior to the
   first time you flag data
2. When the flagging button is clicked, then you trigger the callback's `.flag()` method,
   making sure to collect the arguments correctly and disabling the typical preprocessing.

Here is an example with an image sepia filter Blocks demo that lets you flag
data using the default `CSVLogger`:

$code_blocks_flag
$demo_blocks_flag

## Privacy

Important Note: please make sure your users understand when the data they submit is being saved, and what you plan on doing with it. This is especially important when you use `flagging_mode=auto` (when all of the data submitted through the demo is being flagged)

### That's all! Happy building :)

---

<!-- Source: guides/11_other-tutorials/using-gradio-for-tabular-workflows.md -->
# Using Gradio for Tabular Data Science Workflows

Related spaces: https://huggingface.co/spaces/scikit-learn/gradio-skops-integration, https://huggingface.co/spaces/scikit-learn/tabular-playground, https://huggingface.co/spaces/merve/gradio-analysis-dashboard

## Introduction

Tabular data science is the most widely used domain of machine learning, with problems ranging from customer segmentation to churn prediction. Throughout various stages of the tabular data science workflow, communicating your work to stakeholders or clients can be cumbersome; which prevents data scientists from focusing on what matters, such as data analysis and model building. Data scientists can end up spending hours building a dashboard that takes in dataframe and returning plots, or returning a prediction or plot of clusters in a dataset. In this guide, we'll go through how to use `gradio` to improve your data science workflows. We will also talk about how to use `gradio` and [skops](https://skops.readthedocs.io/en/stable/) to build interfaces with only one line of code!

### Prerequisites

Make sure you have the `gradio` Python package already [installed](/getting_started).

## Let's Create a Simple Interface!

We will take a look at how we can create a simple UI that predicts failures based on product information.

```python
import gradio as gr
import pandas as pd
import joblib
import datasets


inputs = [gr.Dataframe(row_count = (2, "dynamic"), col_count=(4,"dynamic"), label="Input Data", interactive=1)]

outputs = [gr.Dataframe(row_count = (2, "dynamic"), col_count=(1, "fixed"), label="Predictions", headers=["Failures"])]

model = joblib.load("model.pkl")

# we will give our dataframe as example
df = datasets.load_dataset("merve/supersoaker-failures")
df = df["train"].to_pandas()

def infer(input_dataframe):
  return pd.DataFrame(model.predict(input_dataframe))

gr.Interface(fn = infer, inputs = inputs, outputs = outputs, examples = [[df.head(2)]]).launch()
```

Let's break down above code.

- `fn`: the inference function that takes input dataframe and returns predictions.
- `inputs`: the component we take our input with. We define our input as dataframe with 2 rows and 4 columns, which initially will look like an empty dataframe with the aforementioned shape. When the `row_count` is set to `dynamic`, you don't have to rely on the dataset you're inputting to pre-defined component.
- `outputs`: The dataframe component that stores outputs. This UI can take single or multiple samples to infer, and returns 0 or 1 for each sample in one column, so we give `row_count` as 2 and `col_count` as 1 above. `headers` is a list made of header names for dataframe.
- `examples`: You can either pass the input by dragging and dropping a CSV file, or a pandas DataFrame through examples, which headers will be automatically taken by the interface.

We will now create an example for a minimal data visualization dashboard. You can find a more comprehensive version in the related Spaces.

<gradio-app space="gradio/tabular-playground"></gradio-app>

```python
import gradio as gr
import pandas as pd
import datasets
import seaborn as sns
import matplotlib.pyplot as plt

df = datasets.load_dataset("merve/supersoaker-failures")
df = df["train"].to_pandas()
df.dropna(axis=0, inplace=True)

def plot(df):
  plt.scatter(df.measurement_13, df.measurement_15, c = df.loading,alpha=0.5)
  plt.savefig("scatter.png")
  df['failure'].value_counts().plot(kind='bar')
  plt.savefig("bar.png")
  sns.heatmap(df.select_dtypes(include="number").corr())
  plt.savefig("corr.png")
  plots = ["corr.png","scatter.png", "bar.png"]
  return plots

inputs = [gr.Dataframe(label="Supersoaker Production Data")]
outputs = [gr.Gallery(label="Profiling Dashboard", columns=(1,3))]

gr.Interface(plot, inputs=inputs, outputs=outputs, examples=[df.head(100)], title="Supersoaker Failures Analysis Dashboard").launch()
```

<gradio-app space="gradio/gradio-analysis-dashboard-minimal"></gradio-app>

We will use the same dataset we used to train our model, but we will make a dashboard to visualize it this time.

- `fn`: The function that will create plots based on data.
- `inputs`: We use the same `Dataframe` component we used above.
- `outputs`: The `Gallery` component is used to keep our visualizations.
- `examples`: We will have the dataset itself as the example.

## Easily load tabular data interfaces with one line of code using skops

`skops` is a library built on top of `huggingface_hub` and `sklearn`. With the recent `gradio` integration of `skops`, you can build tabular data interfaces with one line of code!

```python
import gradio as gr

# title and description are optional
title = "Supersoaker Defective Product Prediction"
description = "This model predicts Supersoaker production line failures. Drag and drop any slice from dataset or edit values as you wish in below dataframe component."

gr.load("huggingface/scikit-learn/tabular-playground", title=title, description=description).launch()
```

<gradio-app space="gradio/gradio-skops-integration"></gradio-app>

`sklearn` models pushed to Hugging Face Hub using `skops` include a `config.json` file that contains an example input with column names, the task being solved (that can either be `tabular-classification` or `tabular-regression`). From the task type, `gradio` constructs the `Interface` and consumes column names and the example input to build it. You can [refer to skops documentation on hosting models on Hub](https://skops.readthedocs.io/en/latest/auto_examples/plot_hf_hub.html#sphx-glr-auto-examples-plot-hf-hub-py) to learn how to push your models to Hub using `skops`.

---

<!-- Source: guides/11_other-tutorials/using-gradio-in-other-programming-languages.md -->
# Using Gradio in Other Programming Languages

The core `gradio` library is a Python library. But you can also use `gradio` to create UIs around programs written in other languages, thanks to Python's ability to interface with external processes. Using Python's `subprocess` module, you can call programs written in C++, Rust, or virtually any other language, allowing `gradio` to become a flexible UI layer for non-Python applications.

In this post, we'll walk through how to integrate `gradio` with C++ and Rust, using Python's `subprocess` module to invoke code written in these languages. We'll also discuss how to use Gradio with R, which is even easier, thanks to the [reticulate](https://rstudio.github.io/reticulate/) R package, which makes it possible to install and import Python modules in R.

## Using Gradio with C++

Let’s start with a simple example of integrating a C++ program into a Gradio app. Suppose we have the following C++ program that adds two numbers:

```cpp
// add.cpp
#include <iostream>

int main() {
    double a, b;
    std::cin >> a >> b;
    std::cout << a + b << std::endl;
    return 0;
}
```

This program reads two numbers from standard input, adds them, and outputs the result.

We can build a Gradio interface around this C++ program using Python's `subprocess` module. Here’s the corresponding Python code:

```python
import gradio as gr
import subprocess

def add_numbers(a, b):
    process = subprocess.Popen(
        ['./add'], 
        stdin=subprocess.PIPE, 
        stdout=subprocess.PIPE, 
        stderr=subprocess.PIPE
    )
    output, error = process.communicate(input=f"{a} {b}\n".encode())
    
    if error:
        return f"Error: {error.decode()}"
    return float(output.decode().strip())

demo = gr.Interface(
    fn=add_numbers, 
    inputs=[gr.Number(label="Number 1"), gr.Number(label="Number 2")], 
    outputs=gr.Textbox(label="Result")
)

demo.launch()
```

Here, `subprocess.Popen` is used to execute the compiled C++ program (`add`), pass the input values, and capture the output. You can compile the C++ program by running:

```bash
g++ -o add add.cpp
```

This example shows how easy it is to call C++ from Python using `subprocess` and build a Gradio interface around it.

## Using Gradio with Rust

Now, let’s move to another example: calling a Rust program to apply a sepia filter to an image. The Rust code could look something like this:

```rust
// sepia.rs
extern crate image;

use image::{GenericImageView, ImageBuffer, Rgba};

fn sepia_filter(input: &str, output: &str) {
    let img = image::open(input).unwrap();
    let (width, height) = img.dimensions();
    let mut img_buf = ImageBuffer::new(width, height);

    for (x, y, pixel) in img.pixels() {
        let (r, g, b, a) = (pixel[0] as f32, pixel[1] as f32, pixel[2] as f32, pixel[3]);
        let tr = (0.393 * r + 0.769 * g + 0.189 * b).min(255.0);
        let tg = (0.349 * r + 0.686 * g + 0.168 * b).min(255.0);
        let tb = (0.272 * r + 0.534 * g + 0.131 * b).min(255.0);
        img_buf.put_pixel(x, y, Rgba([tr as u8, tg as u8, tb as u8, a]));
    }

    img_buf.save(output).unwrap();
}

fn main() {
    let args: Vec<String> = std::env::args().collect();
    if args.len() != 3 {
        eprintln!("Usage: sepia <input_file> <output_file>");
        return;
    }
    sepia_filter(&args[1], &args[2]);
}
```

This Rust program applies a sepia filter to an image. It takes two command-line arguments: the input image path and the output image path. You can compile this program using:

```bash
cargo build --release
```

Now, we can call this Rust program from Python and use Gradio to build the interface:

```python
import gradio as gr
import subprocess

def apply_sepia(input_path):
    output_path = "output.png"
    
    process = subprocess.Popen(
        ['./target/release/sepia', input_path, output_path], 
        stdout=subprocess.PIPE, 
        stderr=subprocess.PIPE
    )
    process.wait()
    
    return output_path

demo = gr.Interface(
    fn=apply_sepia, 
    inputs=gr.Image(type="filepath", label="Input Image"), 
    outputs=gr.Image(label="Sepia Image")
)

demo.launch()
```

Here, when a user uploads an image and clicks submit, Gradio calls the Rust binary (`sepia`) to process the image, and returns the sepia-filtered output to Gradio.

This setup showcases how you can integrate performance-critical or specialized code written in Rust into a Gradio interface.

## Using Gradio with R (via `reticulate`)

Integrating Gradio with R is particularly straightforward thanks to the `reticulate` package, which allows you to run Python code directly in R. Let’s walk through an example of using Gradio in R. 

**Installation**

First, you need to install the `reticulate` package in R:

```r
install.packages("reticulate")
```


Once installed, you can use the package to run Gradio directly from within an R script.


```r
library(reticulate)

py_install("gradio", pip = TRUE)

gr <- import("gradio") # import gradio as gr
```

**Building a Gradio Application**

With gradio installed and imported, we now have access to gradio's app building methods. Let's build a simple app for an R function that returns a greeting

```r
greeting <- \(name) paste("Hello", name)

app <- gr$Interface(
  fn = greeting,
  inputs = gr$Text(label = "Name"),
  outputs = gr$Text(label = "Greeting"),
  title = "Hello! &#128515 &#128075"
)

app$launch(server_name = "localhost", 
           server_port = as.integer(3000))
```

Credit to [@IfeanyiIdiaye](https://github.com/Ifeanyi55) for contributing this section. You can see more examples [here](https://github.com/Ifeanyi55/Gradio-in-R/tree/main/Code), including using Gradio Blocks to build a machine learning application in R.

---

<!-- Source: guides/11_other-tutorials/wrapping-layouts.md -->
# Wrapping Layouts

Tags: LAYOUTS

## Introduction

Gradio features [blocks](https://www.gradio.app/docs/blocks) to easily layout applications. To use this feature, you need to stack or nest layout components and create a hierarchy with them. This isn't difficult to implement and maintain for small projects, but after the project gets more complex, this component hierarchy becomes difficult to maintain and reuse.

In this guide, we are going to explore how we can wrap the layout classes to create more maintainable and easy-to-read applications without sacrificing flexibility.

## Example

We are going to follow the implementation from this Huggingface Space example:

<gradio-app
space="gradio/wrapping-layouts">
</gradio-app>

## Implementation

The wrapping utility has two important classes. The first one is the ```LayoutBase``` class and the other one is the ```Application``` class.

We are going to look at the ```render``` and ```attach_event``` functions of them for brevity. You can look at the full implementation from [the example code](https://huggingface.co/spaces/WoWoWoWololo/wrapping-layouts/blob/main/app.py).

So let's start with the ```LayoutBase``` class.

### LayoutBase Class

1. Render Function

    Let's look at the ```render``` function in the ```LayoutBase``` class:

```python
# other LayoutBase implementations

def render(self) -> None:
    with self.main_layout:
        for renderable in self.renderables:
            renderable.render()

    self.main_layout.render()
```
This is a little confusing at first but if you consider the default implementation you can understand it easily.
Let's look at an example:

In the default implementation, this is what we're doing:

```python
with Row():
    left_textbox = Textbox(value="left_textbox")
    right_textbox = Textbox(value="right_textbox")
```

Now, pay attention to the Textbox variables. These variables' ```render``` parameter is true by default. So as we use the ```with``` syntax and create these variables, they are calling the ```render``` function under the ```with``` syntax.

We know the render function is called in the constructor with the implementation from the ```gradio.blocks.Block``` class:

```python
class Block:
    # constructor parameters are omitted for brevity
    def __init__(self, ...):
        # other assign functions 

        if render:
            self.render()
```

So our implementation looks like this:

```python
# self.main_layout -> Row()
with self.main_layout:
    left_textbox.render()
    right_textbox.render()
```

What this means is by calling the components' render functions under the ```with``` syntax, we are actually simulating the default implementation.

So now let's consider two nested ```with```s to see how the outer one works. For this, let's expand our example with the ```Tab``` component:

```python
with Tab():
    with Row():
        first_textbox = Textbox(value="first_textbox")
        second_textbox = Textbox(value="second_textbox")
```

Pay attention to the Row and Tab components this time. We have created the Textbox variables above and added them to Row with the ```with``` syntax. Now we need to add the Row component to the Tab component. You can see that the Row component is created with default parameters, so its render parameter is true, that's why the render function is going to be executed under the Tab component's ```with``` syntax.

To mimic this implementation, we need to call the ```render``` function of the ```main_layout``` variable after the ```with``` syntax of the ```main_layout``` variable.

So the implementation looks like this:

```python
with tab_main_layout:
    with row_main_layout:
        first_textbox.render()
        second_textbox.render()

    row_main_layout.render()

tab_main_layout.render()
```

The default implementation and our implementation are the same, but we are using the render function ourselves. So it requires a little work.

Now, let's take a look at the ```attach_event``` function.

2. Attach Event Function

    The function is left as not implemented because it is specific to the class, so each class has to implement its `attach_event` function.

```python
    # other LayoutBase implementations

    def attach_event(self, block_dict: Dict[str, Block]) -> None:
        raise NotImplementedError
```

Check out the ```block_dict``` variable in the ```Application``` class's ```attach_event``` function.

### Application Class

1. Render Function

```python
    # other Application implementations

    def _render(self):
        with self.app:
            for child in self.children:
                child.render()

        self.app.render()
```

From the explanation of the ```LayoutBase``` class's ```render``` function, we can understand the ```child.render``` part.

So let's look at the bottom part, why are we calling the ```app``` variable's ```render``` function? It's important to call this function because if we look at the implementation in the ```gradio.blocks.Blocks``` class, we can see that it is adding the components and event functions into the root component. To put it another way, it is creating and structuring the gradio application.

2. Attach Event Function

    Let's see how we can attach events to components:

```python
    # other Application implementations

    def _attach_event(self):
        block_dict: Dict[str, Block] = {}

        for child in self.children:
            block_dict.update(child.global_children_dict)

        with self.app:
            for child in self.children:
                try:
                    child.attach_event(block_dict=block_dict)
                except NotImplementedError:
                    print(f"{child.name}'s attach_event is not implemented")
```

You can see why the ```global_children_list``` is used in the ```LayoutBase``` class from the example code. With this, all the components in the application are gathered into one dictionary, so the component can access all the components with their names.

The ```with``` syntax is used here again to attach events to components. If we look at the ```__exit__``` function in the ```gradio.blocks.Blocks``` class, we can see that it is calling the ```attach_load_events``` function which is used for setting event triggers to components. So we have to use the ```with``` syntax to trigger the ```__exit__``` function.

Of course, we can call ```attach_load_events``` without using the ```with``` syntax, but the function needs a ```Context.root_block```, and it is set in the ```__enter__``` function. So we used the ```with``` syntax here rather than calling the function ourselves.

## Conclusion

In this guide, we saw

- How we can wrap the layouts
- How components are rendered
- How we can structure our application with wrapped layout classes

Because the classes used in this guide are used for demonstration purposes, they may still not be totally optimized or modular. But that would make the guide much longer!

I hope this guide helps you gain another view of the layout classes and gives you an idea about how you can use them for your needs. See the full implementation of our example [here](https://huggingface.co/spaces/WoWoWoWololo/wrapping-layouts/blob/main/app.py).

---

<!-- Source: guides/cn/04_integrating-other-frameworks/Gradio-and-Comet.md -->
# 使用 Gradio 和 Comet

Tags: COMET, SPACES
由 Comet 团队贡献

## 介绍

在这个指南中，我们将展示您可以如何使用 Gradio 和 Comet。我们将介绍使用 Comet 和 Gradio 的基本知识，并向您展示如何利用 Gradio 的高级功能，如 [使用 iFrames 进行嵌入](https://www.gradio.app/sharing-your-app/#embedding-with-iframes) 和 [状态](https://www.gradio.app/docs/#state) 来构建一些令人惊叹的模型评估工作流程。

下面是本指南涵盖的主题列表。

1. 将 Gradio UI 记录到您的 Comet 实验中
2. 直接将 Gradio 应用程序嵌入到您的 Comet 项目中
3. 直接将 Hugging Face Spaces 嵌入到您的 Comet 项目中
4. 将 Gradio 应用程序的模型推理记录到 Comet 中

## 什么是 Comet？

[Comet](https://www.comet.com?utm_source=gradio&utm_medium=referral&utm_campaign=gradio-integration&utm_content=gradio-docs) 是一个 MLOps 平台，旨在帮助数据科学家和团队更快地构建更好的模型！Comet 提供工具来跟踪、解释、管理和监控您的模型，集中在一个地方！它可以与 Jupyter 笔记本和脚本配合使用，最重要的是，它是 100% 免费的！

## 设置

首先，安装运行这些示例所需的依赖项

```shell
pip install comet_ml torch torchvision transformers gradio shap requests Pillow
```

接下来，您需要[注册一个 Comet 账户](https://www.comet.com/signup?utm_source=gradio&utm_medium=referral&utm_campaign=gradio-integration&utm_content=gradio-docs)。一旦您设置了您的账户，[获取您的 API 密钥](https://www.comet.com/docs/v2/guides/getting-started/quickstart/#get-an-api-key?utm_source=gradio&utm_medium=referral&utm_campaign=gradio-integration&utm_content=gradio-docs) 并配置您的 Comet 凭据

如果您将这些示例作为脚本运行，您可以将您的凭据导出为环境变量

```shell
export COMET_API_KEY="<您的 API 密钥>"
export COMET_WORKSPACE="<您的工作空间名称>"
export COMET_PROJECT_NAME="<您的项目名称>"
```

或者将它们设置在您的工作目录中的 `.comet.config` 文件中。您的文件应按以下方式格式化。

```shell
[comet]
api_key=<您的 API 密钥>
workspace=<您的工作空间名称>
project_name=<您的项目名称>
```

如果您使用提供的 Colab Notebooks 运行这些示例，请在开始 Gradio UI 之前运行带有以下片段的单元格。运行此单元格可以让您交互式地将 API 密钥添加到笔记本中。

```python
import comet_ml
comet_ml.init()
```

## 1. 将 Gradio UI 记录到您的 Comet 实验中

[![在 Colab 中打开](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/comet-ml/comet-examples/blob/master/integrations/model-evaluation/gradio/notebooks/Gradio_and_Comet.ipynb)

在这个例子中，我们将介绍如何将您的 Gradio 应用程序记录到 Comet，并使用 Gradio 自定义面板与其进行交互。

我们先通过使用 `resnet18` 构建一个简单的图像分类示例。

```python
import comet_ml

import requests
import torch
from PIL import Image
from torchvision import transforms

torch.hub.download_url_to_file("https://github.com/pytorch/hub/raw/master/images/dog.jpg", "dog.jpg")

if torch.cuda.is_available():
    device = "cuda"
else:
    device = "cpu"

model = torch.hub.load("pytorch/vision:v0.6.0", "resnet18", pretrained=True).eval()
model = model.to(device)

# 为 ImageNet 下载可读的标签。
response = requests.get("https://git.io/JJkYN")
labels = response.text.split("\n")


def predict(inp):
    inp = Image.fromarray(inp.astype("uint8"), "RGB")
    inp = transforms.ToTensor()(inp).unsqueeze(0)
    with torch.no_grad():
        prediction = torch.nn.functional.softmax(model(inp.to(device))[0], dim=0)
    return {labels[i]: float(prediction[i]) for i in range(1000)}


inputs = gr.Image()
outputs = gr.Label(num_top_classes=3)

io = gr.Interface(
    fn=predict, inputs=inputs, outputs=outputs, examples=["dog.jpg"]
)
io.launch(inline=False, share=True)

experiment = comet_ml.Experiment()
experiment.add_tag("image-classifier")

io.integrate(comet_ml=experiment)
```

此片段中的最后一行将将 Gradio 应用程序的 URL 记录到您的 Comet 实验中。您可以在实验的文本选项卡中找到该 URL。

<video width="560" height="315" controls>
    <source src="https://user-images.githubusercontent.com/7529846/214328034-09369d4d-8b94-4c4a-aa3c-25e3ed8394c4.mp4"></source>
</video>

将 Gradio 面板添加到您的实验中，与应用程序进行交互。

<video width="560" height="315" controls>
    <source src="https://user-images.githubusercontent.com/7529846/214328194-95987f83-c180-4929-9bed-c8a0d3563ed7.mp4"></source>
</video>

## 2. 直接将 Gradio 应用程序嵌入到您的 Comet 项目中

<iframe width="560" height="315" src="https://www.youtube.com/embed/KZnpH7msPq0?start=9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

如果您要长期托管 Gradio 应用程序，可以使用 Gradio Panel Extended 自定义面板进行嵌入 UI。

转到您的 Comet 项目页面，转到面板选项卡。单击“+ 添加”按钮以打开面板搜索页面。

<img width="560" alt="adding-panels" src="https://user-images.githubusercontent.com/7529846/214329314-70a3ff3d-27fb-408c-a4d1-4b58892a3854.jpeg">

接下来，在公共面板部分搜索 Gradio Panel Extended 并单击“添加”。

<img width="560" alt="gradio-panel-extended" src="https://user-images.githubusercontent.com/7529846/214325577-43226119-0292-46be-a62a-0c7a80646ebb.png">

添加面板后，单击“编辑”以访问面板选项页面，并粘贴您的 Gradio 应用程序的 URL。

![Edit-Gradio-Panel-Options](https://user-images.githubusercontent.com/7529846/214573001-23814b5a-ca65-4ace-a8a5-b27cdda70f7a.gif)

<img width="560" alt="Edit-Gradio-Panel-URL" src="https://user-images.githubusercontent.com/7529846/214334843-870fe726-0aa1-4b21-bbc6-0c48f56c48d8.png">

## 3. 直接将 Hugging Face Spaces 嵌入到您的 Comet 项目中

<iframe width="560" height="315" src="https://www.youtube.com/embed/KZnpH7msPq0?start=107" title="YouTube 视频播放器 " frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

您还可以使用 Hugging Face Spaces 面板将托管在 Hugging Faces Spaces 中的 Gradio 应用程序嵌入到您的 Comet 项目中。

转到 Comet 项目页面，转到面板选项卡。单击“+添加”按钮以打开面板搜索页面。然后，在公共面板部分搜索 Hugging Face Spaces 面板并单击“添加”。

<img width="560" height="315" alt="huggingface-spaces-panel" src="https://user-images.githubusercontent.com/7529846/214325606-99aa3af3-b284-4026-b423-d3d238797e12.png">

添加面板后，单击“编辑”以访问面板选项页面，并粘贴您的 Hugging Face Space 路径，例如 `pytorch/ResNet`

<img width="560" height="315" alt="Edit-HF-Space" src="https://user-images.githubusercontent.com/7529846/214335868-c6f25dee-13db-4388-bcf5-65194f850b02.png">

## 4. 记录模型推断结果到 Comet

<iframe width="560" height="315" src="https://www.youtube.com/embed/KZnpH7msPq0?start=176" title="YouTube 视频播放器 " frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

[![在 Colab 中打开](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/comet-ml/comet-examples/blob/master/integrations/model-evaluation/gradio/notebooks/Logging_Model_Inferences_with_Comet_and_Gradio.ipynb)

在前面的示例中，我们演示了通过 Comet UI 与 Gradio 应用程序交互的各种方法。此外，您还可以将 Gradio 应用程序的模型推断（例如 SHAP 图）记录到 Comet 中。

在以下代码段中，我们将记录来自文本生成模型的推断。我们可以使用 Gradio 的[State](https://www.gradio.app/docs/#state)对象在多次推断调用之间保持实验的持久性。这将使您能够将多个模型推断记录到单个实验中。

```python
import comet_ml
import gradio as gr
import shap
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

if torch.cuda.is_available():
    device = "cuda"
else:
    device = "cpu"

MODEL_NAME = "gpt2"

model = AutoModelForCausalLM.from_pretrained(MODEL_NAME)

# set model decoder to true
model.config.is_decoder = True
# set text-generation params under task_specific_params
model.config.task_specific_params["text-generation"] = {
    "do_sample": True,
    "max_length": 50,
    "temperature": 0.7,
    "top_k": 50,
    "no_repeat_ngram_size": 2,
}
model = model.to(device)

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
explainer = shap.Explainer(model, tokenizer)


def start_experiment():
    """Returns an APIExperiment object that is thread safe
    and can be used to log inferences to a single Experiment
    """
    try:
        api = comet_ml.API()
        workspace = api.get_default_workspace()
        project_name = comet_ml.config.get_config()["comet.project_name"]

        experiment = comet_ml.APIExperiment(
            workspace=workspace, project_name=project_name
        )
        experiment.log_other("Created from", "gradio-inference")

        message = f"Started Experiment: [{experiment.name}]({experiment.url})"
        return (experiment, message)

    except Exception as e:
        return None, None


def predict(text, state, message):
    experiment = state

    shap_values = explainer([text])
    plot = shap.plots.text(shap_values, display=False)

    if experiment is not None:
        experiment.log_other("message", message)
        experiment.log_html(plot)

    return plot


with gr.Blocks() as demo:
    start_experiment_btn = gr.Button("Start New Experiment")
    experiment_status = gr.Markdown()

    # Log a message to the Experiment to provide more context
    experiment_message = gr.Textbox(label="Experiment Message")
    experiment = gr.State()

    input_text = gr.Textbox(label="Input Text", lines=5, interactive=True)
    submit_btn = gr.Button("Submit")

    output = gr.HTML(interactive=True)

    start_experiment_btn.click(
        start_experiment, outputs=[experiment, experiment_status]
    )
    submit_btn.click(
        predict, inputs=[input_text, experiment, experiment_message], outputs=[output]
    )
```

该代码段中的推断结果将保存在实验的 HTML 选项卡中。

<video width="560" height="315" controls>
    <source src="https://user-images.githubusercontent.com/7529846/214328610-466e5c81-4814-49b9-887c-065aca14dd30.mp4"></source>
</video>

## 结论

希望您对本指南有所裨益，并能为您构建出色的 Comet 和 Gradio 模型评估工作流程提供一些启示。

## 如何在 Comet 组织上贡献 Gradio 演示

- 在 Hugging Face 上创建帐号[此处](https://huggingface.co/join)。
- 在用户名下添加 Gradio 演示，请参阅[此处](https://huggingface.co/course/chapter9/4?fw=pt)以设置 Gradio 演示。
- 请求加入 Comet 组织[此处](https://huggingface.co/Comet)。

## 更多资源

- [Comet 文档](https://www.comet.com/docs/v2/?utm_source=gradio&utm_medium=referral&utm_campaign=gradio-integration&utm_content=gradio-docs)

---

<!-- Source: guides/cn/04_integrating-other-frameworks/Gradio-and-ONNX-on-Hugging-Face.md -->
# Gradio 和 ONNX 在 Hugging Face 上

Related spaces: https://huggingface.co/spaces/onnx/EfficientNet-Lite4
Tags: ONNX，SPACES
由 Gradio 和 <a href="https://onnx.ai/">ONNX</a> 团队贡献

## 介绍

在这个指南中，我们将为您介绍以下内容：

- ONNX、ONNX 模型仓库、Gradio 和 Hugging Face Spaces 的介绍
- 如何为 EfficientNet-Lite4 设置 Gradio 演示
- 如何为 Hugging Face 上的 ONNX 组织贡献自己的 Gradio 演示

下面是一个 ONNX 模型的示例：在下面尝试 EfficientNet-Lite4 演示。

<iframe src="https://onnx-efficientnet-lite4.hf.space" frameBorder="0" height="810" title="Gradio app" class="container p-0 flex-grow space-iframe" allow="accelerometer; ambient-light-sensor; autoplay; battery; camera; document-domain; encrypted-media; fullscreen; geolocation; gyroscope; layout-animations; legacy-image-formats; magnetometer; microphone; midi; oversized-images; payment; picture-in-picture; publickey-credentials-get; sync-xhr; usb; vr ; wake-lock; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads"></iframe>

## ONNX 模型仓库是什么？

Open Neural Network Exchange（[ONNX](https://onnx.ai/)）是一种表示机器学习模型的开放标准格式。ONNX 由一个实现了该格式的合作伙伴社区支持，该社区将其实施到许多框架和工具中。例如，如果您在 TensorFlow 或 PyTorch 中训练了一个模型，您可以轻松地将其转换为 ONNX，然后使用类似 ONNX Runtime 的引擎 / 编译器在各种设备上运行它。

[ONNX 模型仓库](https://github.com/onnx/models)是由社区成员贡献的一组预训练的先进模型，格式为 ONNX。每个模型都附带了用于模型训练和运行推理的 Jupyter 笔记本。这些笔记本以 Python 编写，并包含到训练数据集的链接，以及描述模型架构的原始论文的参考文献。

## Hugging Face Spaces 和 Gradio 是什么？

### Gradio

Gradio 可让用户使用 Python 代码将其机器学习模型演示为 Web 应用程序。Gradio 将 Python 函数封装到用户界面中，演示可以在 jupyter 笔记本、colab 笔记本中启动，并可以嵌入到您自己的网站上，并在 Hugging Face Spaces 上免费托管。

在此处开始[https://gradio.app/getting_started](https://gradio.app/getting_started)

### Hugging Face Spaces

Hugging Face Spaces 是 Gradio 演示的免费托管选项。Spaces 提供了 3 种 SDK 选项：Gradio、Streamlit 和静态 HTML 演示。Spaces 可以是公共的或私有的，工作流程与 github repos 类似。目前 Hugging Face 上有 2000 多个 Spaces。在此处了解更多关于 Spaces 的信息[https://huggingface.co/spaces/launch](https://huggingface.co/spaces/launch)。

### Hugging Face 模型

Hugging Face 模型中心还支持 ONNX 模型，并且可以通过[ONNX 标签](https://huggingface.co/models?library=onnx&sort=downloads)对 ONNX 模型进行筛选

## Hugging Face 是如何帮助 ONNX 模型仓库的？

ONNX 模型仓库中有许多 Jupyter 笔记本供用户测试模型。以前，用户需要自己下载模型并在本地运行这些笔记本测试。有了 Hugging Face，测试过程可以更简单和用户友好。用户可以在 Hugging Face Spaces 上轻松尝试 ONNX 模型仓库中的某个模型，并使用 ONNX Runtime 运行由 Gradio 提供支持的快速演示，全部在云端进行，无需在本地下载任何内容。请注意，ONNX 有各种运行时，例如[ONNX Runtime](https://github.com/microsoft/onnxruntime)、[MXNet](https://github.com/apache/incubator-mxnet)等

## ONNX Runtime 的作用是什么？

ONNX Runtime 是一个跨平台的推理和训练机器学习加速器。它使得在 Hugging Face 上使用 ONNX 模型仓库中的模型进行实时 Gradio 演示成为可能。

ONNX Runtime 可以实现更快的客户体验和更低的成本，支持来自 PyTorch 和 TensorFlow/Keras 等深度学习框架以及 scikit-learn、LightGBM、XGBoost 等传统机器学习库的模型。ONNX Runtime 与不同的硬件、驱动程序和操作系统兼容，并通过利用适用的硬件加速器以及图形优化和转换提供最佳性能。有关更多信息，请参阅[官方网站](https://onnxruntime.ai/)。

## 为 EfficientNet-Lite4 设置 Gradio 演示

EfficientNet-Lite 4 是 EfficientNet-Lite 系列中最大和最准确的模型。它是一个仅使用整数量化的模型，能够在所有 EfficientNet 模型中提供最高的准确率。在 Pixel 4 CPU 上以实时方式运行（例如 30ms/ 图像）时，可以实现 80.4％的 ImageNet top-1 准确率。要了解更多信息，请阅读[模型卡片](https://github.com/onnx/models/tree/main/vision/classification/efficientnet-lite4)

在这里，我们将演示如何使用 Gradio 为 EfficientNet-Lite4 设置示例演示

首先，我们导入所需的依赖项并下载和载入来自 ONNX 模型仓库的 efficientnet-lite4 模型。然后从 labels_map.txt 文件加载标签。接下来，我们设置预处理函数、加载用于推理的模型并设置推理函数。最后，将推理函数封装到 Gradio 接口中，供用户进行交互。下面是完整的代码。

```python
import numpy as np
import math
import matplotlib.pyplot as plt
import cv2
import json
import gradio as gr
from huggingface_hub import hf_hub_download
from onnx import hub
import onnxruntime as ort

# 从ONNX模型仓库加载ONNX模型
model = hub.load("efficientnet-lite4")
# 加载标签文本文件
labels = json.load(open("labels_map.txt", "r"))

# 通过将图像从中心调整大小并裁剪到224x224来设置图像文件的尺寸
def pre_process_edgetpu(img, dims):
    output_height, output_width, _ = dims
    img = resize_with_aspectratio(img, output_height, output_width, inter_pol=cv2.INTER_LINEAR)
    img = center_crop(img, output_height, output_width)
    img = np.asarray(img, dtype='float32')
    # 将jpg像素值从[0 - 255]转换为浮点数组[-1.0 - 1.0]
    img -= [127.0, 127.0, 127.0]
    img /= [128.0, 128.0, 128.0]
    return img

# 使用等比例缩放调整图像尺寸
def resize_with_aspectratio(img, out_height, out_width, scale=87.5, inter_pol=cv2.INTER_LINEAR):
    height, width, _ = img.shape
    new_height = int(100. * out_height / scale)
    new_width = int(100. * out_width / scale)
    if height > width:
        w = new_width
        h = int(new_height * height / width)
    else:
        h = new_height
        w = int(new_width * width / height)
    img = cv2.resize(img, (w, h), interpolation=inter_pol)
    return img

# crops the image around the center based on given height and width
def center_crop(img, out_height, out_width):
    height, width, _ = img.shape
    left = int((width - out_width) / 2)
    right = int((width + out_width) / 2)
    top = int((height - out_height) / 2)
    bottom = int((height + out_height) / 2)
    img = img[top:bottom, left:right]
    return img


sess = ort.InferenceSession(model)

def inference(img):
  img = cv2.imread(img)
  img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

  img = pre_process_edgetpu(img, (224, 224, 3))

  img_batch = np.expand_dims(img, axis=0)

  results = sess.run(["Softmax:0"], {"images:0": img_batch})[0]
  result = reversed(results[0].argsort()[-5:])
  resultdic = {}
  for r in result:
      resultdic[labels[str(r)]] = float(results[0][r])
  return resultdic

title = "EfficientNet-Lite4"
description = "EfficientNet-Lite 4是最大的变体，也是EfficientNet-Lite模型集合中最准确的。它是一个仅包含整数的量化模型，具有所有EfficientNet模型中最高的准确度。在Pixel 4 CPU上，它实现了80.4％的ImageNet top-1准确度，同时仍然可以实时运行（例如30ms/图像）。"
examples = [['catonnx.jpg']]
gr.Interface(inference, gr.Image(type="filepath"), "label", title=title, description=description, examples=examples).launch()
```

## 如何使用 ONNX 模型在 HF Spaces 上贡献 Gradio 演示

- 将模型添加到[onnx model zoo](https://github.com/onnx/models/blob/main/.github/PULL_REQUEST_TEMPLATE.md)
- 在 Hugging Face 上创建一个账号[here](https://huggingface.co/join).
- 要查看还有哪些模型需要添加到 ONNX 组织中，请参阅[Models list](https://github.com/onnx/models#models)中的列表
- 在您的用户名下添加 Gradio Demo，请参阅此[博文](https://huggingface.co/blog/gradio-spaces)以在 Hugging Face 上设置 Gradio Demo。
- 请求加入 ONNX 组织[here](https://huggingface.co/onnx).
- 一旦获准，将模型从您的用户名下转移到 ONNX 组织
- 在模型表中为模型添加徽章，在[Models list](https://github.com/onnx/models#models)中查看示例

---

<!-- Source: guides/cn/04_integrating-other-frameworks/Gradio-and-Wandb-Integration.md -->
# Gradio and W&B Integration

相关空间：https://huggingface.co/spaces/akhaliq/JoJoGAN
标签：WANDB, SPACES
由 Gradio 团队贡献

## 介绍

在本指南中，我们将引导您完成以下内容：

- Gradio、Hugging Face Spaces 和 Wandb 的介绍
- 如何使用 Wandb 集成为 JoJoGAN 设置 Gradio 演示
- 如何在 Hugging Face 的 Wandb 组织中追踪实验并贡献您自己的 Gradio 演示

下面是一个使用 Wandb 跟踪训练和实验的模型示例，请在下方尝试 JoJoGAN 演示。

<iframe src="https://akhaliq-jojogan.hf.space" frameBorder="0" height="810" title="Gradio app" class="container p-0 flex-grow space-iframe" allow="accelerometer; ambient-light-sensor; autoplay; battery; camera; document-domain; encrypted-media; fullscreen; geolocation; gyroscope; layout-animations; legacy-image-formats; magnetometer; microphone; midi; oversized-images; payment; picture-in-picture; publickey-credentials-get; sync-xhr; usb; vr ; wake-lock; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads"></iframe>

## 什么是 Wandb？

Weights and Biases (W&B) 允许数据科学家和机器学习科学家在从训练到生产的每个阶段跟踪他们的机器学习实验。任何指标都可以对样本进行聚合，并在可自定义和可搜索的仪表板中显示，如下所示：

<img alt="Screen Shot 2022-08-01 at 5 54 59 PM" src="https://user-images.githubusercontent.com/81195143/182252755-4a0e1ca8-fd25-40ff-8c91-c9da38aaa9ec.png">

## 什么是 Hugging Face Spaces 和 Gradio？

### Gradio

Gradio 让用户可以使用几行 Python 代码将其机器学习模型演示为 Web 应用程序。Gradio 将任何 Python 函数（例如机器学习模型的推断函数）包装成一个用户界面，这些演示可以在 jupyter 笔记本、colab 笔记本中启动，也可以嵌入到您自己的网站中，免费托管在 Hugging Face Spaces 上。

在这里开始 [here](https://gradio.app/getting_started)

### Hugging Face Spaces

Hugging Face Spaces 是 Gradio 演示的免费托管选项。Spaces 有 3 个 SDK 选项：Gradio、Streamlit 和静态 HTML 演示。Spaces 可以是公共的或私有的，工作流程类似于 github 存储库。目前在 Hugging Face 上有 2000 多个 Spaces。了解更多关于 Spaces 的信息 [here](https://huggingface.co/spaces/launch)。

## 为 JoJoGAN 设置 Gradio 演示

现在，让我们引导您如何在自己的环境中完成此操作。我们假设您对 W&B 和 Gradio 还不太了解，只是为了本教程的目的。

让我们开始吧！

1. 创建 W&B 账号

   如果您还没有 W&B 账号，请按照[这些快速说明](https://app.wandb.ai/login)创建免费账号。这不应该超过几分钟的时间。一旦完成（或者如果您已经有一个账户），接下来，我们将运行一个快速的 colab。

2. 打开 Colab 安装 Gradio 和 W&B

   我们将按照 JoJoGAN 存储库中提供的 colab 进行操作，稍作修改以更有效地使用 Wandb 和 Gradio。

   [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/mchong6/JoJoGAN/blob/main/stylize.ipynb)

   在顶部安装 Gradio 和 Wandb:

   ```sh

   pip install gradio wandb
   ```

3. 微调 StyleGAN 和 W&B 实验跟踪

   下一步将打开一个 W&B 仪表板，以跟踪实验，并显示一个 Gradio 演示提供的预训练模型，您可以从下拉菜单中选择。这是您需要的代码：

   ```python

   alpha =  1.0
   alpha = 1-alpha

   preserve_color = True
   num_iter = 100
   log_interval = 50

   samples = []
      column_names = ["Reference (y)", "Style Code(w)", "Real Face Image(x)"]

   wandb.init(project="JoJoGAN")
   config = wandb.config
   config.num_iter = num_iter
   config.preserve_color = preserve_color
   wandb.log(
   {"Style reference": [wandb.Image(transforms.ToPILImage()(target_im))]},
   step=0)

   # 加载判别器用于感知损失
   discriminator = Discriminator(1024, 2).eval().to(device)
   ckpt = torch.load('models/stylegan2-ffhq-config-f.pt', map_location=lambda storage, loc: storage)
   discriminator.load_state_dict(ckpt["d"], strict=False)

   # 重置生成器
   del generator
   generator = deepcopy(original_generator)

   g_optim = optim.Adam(generator.parameters(), lr=2e-3, betas=(0, 0.99))

   # 用于生成一族合理真实图像-> 假图像的更换图层
   if preserve_color:
       id_swap = [9,11,15,16,17]
   else:
       id_swap = list(range(7, generator.n_latent))

   for idx in tqdm(range(num_iter)):
       mean_w = generator.get_latent(torch.randn([latents.size(0), latent_dim]).to(device)).unsqueeze(1).repeat(1, generator.n_latent, 1)
       in_latent = latents.clone()
       in_latent[:, id_swap] = alpha*latents[:, id_swap] + (1-alpha)*mean_w[:, id_swap]

       img = generator(in_latent, input_is_latent=True)

       with torch.no_grad():
           real_feat = discriminator(targets)
       fake_feat = discriminator(img)

       loss = sum([F.l1_loss(a, b) for a, b in zip(fake_feat, real_feat)])/len(fake_feat)

       wandb.log({"loss": loss}, step=idx)
       if idx % log_interval == 0:
           generator.eval()
           my_sample = generator(my_w, input_is_latent=True)
           generator.train()
           my_sample = transforms.ToPILImage()(utils.make_grid(my_sample, normalize=True, range=(-1, 1)))
           wandb.log(
           {"Current stylization": [wandb.Image(my_sample)]},
           step=idx)
       table_data = [
               wandb.Image(transforms.ToPILImage()(target_im)),
               wandb.Image(img),
               wandb.Image(my_sample),
           ]
       samples.append(table_data)

       g_optim.zero_grad()
       loss.backward()
       g_optim.step()

   out_table = wandb.Table(data=samples, columns=column_names)
   wandb.log({" 当前样本数 ": out_table})
   ```

4. 保存、下载和加载模型

   以下是如何保存和下载您的模型。

   ```python

   from PIL import Image
   import torch
   torch.backends.cudnn.benchmark = True
   from torchvision import transforms, utils
   from util import *
   import math
   import random
   import numpy as np
   from torch import nn, autograd, optim
   from torch.nn import functional as F
   from tqdm import tqdm
   import lpips
   from model import *
   from e4e_projection import projection as e4e_projection

   from copy import deepcopy
   import imageio

   import os
   import sys
   import torchvision.transforms as transforms
   from argparse import Namespace
   from e4e.models.psp import pSp
   from util import *
   from huggingface_hub import hf_hub_download
   from google.colab import files
   torch.save({"g": generator.state_dict()}, "your-model-name.pt")

   files.download('your-model-name.pt')

   latent_dim = 512
   device="cuda"
   model_path_s = hf_hub_download(repo_id="akhaliq/jojogan-stylegan2-ffhq-config-f", filename="stylegan2-ffhq-config-f.pt")
   original_generator = Generator(1024, latent_dim, 8, 2).to(device)
   ckpt = torch.load(model_path_s, map_location=lambda storage, loc: storage)
   original_generator.load_state_dict(ckpt["g_ema"], strict=False)
   mean_latent = original_generator.mean_latent(10000)

   generator = deepcopy(original_generator)

   ckpt = torch.load("/content/JoJoGAN/your-model-name.pt", map_location=lambda storage, loc: storage)
   generator.load_state_dict(ckpt["g"], strict=False)
   generator.eval()

   plt.rcParams['figure.dpi'] = 150

   transform = transforms.Compose(
       [
           transforms.Resize((1024, 1024)),
           transforms.ToTensor(),
           transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5)),
       ]
   )

   def inference(img):
       img.save('out.jpg')
       aligned_face = align_face('out.jpg')

       my_w = e4e_projection(aligned_face, "out.pt", device).unsqueeze(0)
       with torch.no_grad():
           my_sample = generator(my_w, input_is_latent=True)

       npimage = my_sample[0].cpu().permute(1, 2, 0).detach().numpy()
       imageio.imwrite('filename.jpeg', npimage)
       return 'filename.jpeg'
   ```

5. 构建 Gradio 演示

   ```python

   import gradio as gr

   title = "JoJoGAN"
   description = "JoJoGAN 的 Gradio 演示：一次性面部风格化。要使用它，只需上传您的图像，或单击示例之一加载它们。在下面的链接中阅读更多信息。"

   demo = gr.Interface(
       inference,
       gr.Image(type="pil"),
       gr.Image(type=" 文件 "),
       title=title,
       description=description
   )

   demo.launch(share=True)
   ```

6. 将 Gradio 集成到 W&B 仪表板

   最后一步——将 Gradio 演示与 W&B 仪表板集成，只需要一行额外的代码 :

   ```python

   demo.integrate(wandb=wandb)
   ```

   调用集成之后，将创建一个演示，您可以将其集成到仪表板或报告中

   在 W&B 之外，使用 gradio-app 标记允许任何人直接将 Gradio 演示嵌入到其博客、网站、文档等中的 HF spaces 上 :

   ```html
   &lt;gradio-app space="akhaliq/JoJoGAN"&gt; &lt;gradio-app&gt;
   ```

7.（可选）在 Gradio 应用程序中嵌入 W&B 图

    也可以在 Gradio 应用程序中嵌入 W&B 图。为此，您可以创建一个 W&B 报告，并在一个 `gr.HTML` 块中将其嵌入到 Gradio 应用程序中。

    报告需要是公开的，您需要在 iFrame 中包装 URL，如下所示 :
    The Report will need to be public and you will need to wrap the URL within an iFrame like this:
    ```python

    import gradio as gr

    def wandb_report(url):
        iframe = f'&lt;iframe src={url} style="border:none;height:1024px;width:100%"&gt;'
        return gr.HTML(iframe)

    with gr.Blocks() as demo:
        report_url = 'https://wandb.ai/_scott/pytorch-sweeps-demo/reports/loss-22-10-07-16-00-17---VmlldzoyNzU2NzAx'
        report = wandb_report(report_url)

    demo.launch(share=True)
    ```

## 结论

希望您喜欢此嵌入 Gradio 演示到 W&B 报告的简短演示！感谢您一直阅读到最后。回顾一下 :

- 仅需要一个单一参考图像即可对 JoJoGAN 进行微调，通常在 GPU 上需要约 1 分钟。训练完成后，可以将样式应用于任何输入图像。在论文中阅读更多内容。

- W&B 可以通过添加几行代码来跟踪实验，您可以在单个集中的仪表板中可视化、排序和理解您的实验。

- Gradio 则在用户友好的界面中演示模型，可以在网络上任何地方共享。

## 如何在 Wandb 组织的 HF spaces 上 贡献 Gradio 演示

- 在 Hugging Face 上创建一个帐户[此处](https://huggingface.co/join)。
- 在您的用户名下添加 Gradio 演示，请参阅[此教程](https://huggingface.co/course/chapter9/4?fw=pt) 以在 Hugging Face 上设置 Gradio 演示。
- 申请加入 wandb 组织[此处](https://huggingface.co/wandb)。
- 批准后，将模型从自己的用户名转移到 Wandb 组织中。

---

<!-- Source: guides/cn/04_integrating-other-frameworks/image-classification-in-pytorch.md -->
# PyTorch 图像分类

Related spaces: https://huggingface.co/spaces/abidlabs/pytorch-image-classifier, https://huggingface.co/spaces/pytorch/ResNet, https://huggingface.co/spaces/pytorch/ResNext, https://huggingface.co/spaces/pytorch/SqueezeNet
Tags: VISION, RESNET, PYTORCH

## 介绍

图像分类是计算机视觉中的一个核心任务。构建更好的分类器以区分图片中存在的物体是当前研究的一个热点领域，因为它的应用范围从自动驾驶车辆到医学成像等领域都很广泛。

这样的模型非常适合 Gradio 的 _image_ 输入组件，因此在本教程中，我们将使用 Gradio 构建一个用于图像分类的 Web 演示。我们将能够在 Python 中构建整个 Web 应用程序，效果如下（试试其中一个示例！）:

<iframe src="https://abidlabs-pytorch-image-classifier.hf.space" frameBorder="0" height="660" title="Gradio app" class="container p-0 flex-grow space-iframe" allow="accelerometer; ambient-light-sensor; autoplay; battery; camera; document-domain; encrypted-media; fullscreen; geolocation; gyroscope; layout-animations; legacy-image-formats; magnetometer; microphone; midi; oversized-images; payment; picture-in-picture; publickey-credentials-get; sync-xhr; usb; vr ; wake-lock; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads"></iframe>

让我们开始吧！

### 先决条件

确保您已经[安装](/getting_started)了 `gradio` Python 包。我们将使用一个预训练的图像分类模型，所以您还应该安装了 `torch`。

## 第一步 - 设置图像分类模型

首先，我们需要一个图像分类模型。在本教程中，我们将使用一个预训练的 Resnet-18 模型，因为它可以从[PyTorch Hub](https://pytorch.org/hub/pytorch_vision_resnet/)轻松下载。您可以使用其他预训练模型或训练自己的模型。

```python
import torch

model = torch.hub.load('pytorch/vision:v0.6.0', 'resnet18', pretrained=True).eval()
```

由于我们将使用模型进行推断，所以我们调用了 `.eval()` 方法。

## 第二步 - 定义 `predict` 函数

接下来，我们需要定义一个函数，该函数接受*用户输入*，在本示例中是一张图片，并返回预测结果。预测结果应该以字典的形式返回，其中键是类别名称，值是置信度概率。我们将从这个[text 文件](https://git.io/JJkYN)中加载类别名称。

对于我们的预训练模型，它的代码如下：

```python
import requests
from PIL import Image
from torchvision import transforms

# 下载ImageNet的可读标签。
response = requests.get("https://git.io/JJkYN")
labels = response.text.split("\n")

def predict(inp):
  inp = transforms.ToTensor()(inp).unsqueeze(0)
  with torch.no_grad():
    prediction = torch.nn.functional.softmax(model(inp)[0], dim=0)
    confidences = {labels[i]: float(prediction[i]) for i in range(1000)}
  return confidences
```

让我们逐步来看一下这段代码。该函数接受一个参数：

- `inp`：输入图片，类型为 `PIL` 图像

然后，该函数将图像转换为 PIL 图像，最终转换为 PyTorch 的 `tensor`，将其输入模型，并返回：

- `confidences`：预测结果，以字典形式表示，其中键是类别标签，值是置信度概率

## 第三步 - 创建 Gradio 界面

现在我们已经设置好了预测函数，我们可以创建一个 Gradio 界面。

在本例中，输入组件是一个拖放图片的组件。为了创建这个输入组件，我们使用 `Image(type="pil")` 来创建该组件，并处理预处理操作将其转换为 `PIL` 图像。

输出组件将是一个 `Label`，它以良好的形式显示顶部标签。由于我们不想显示所有 1000 个类别标签，所以我们将其定制为只显示前 3 个标签，构造为 `Label(num_top_classes=3)`。

最后，我们添加了一个 `examples` 参数，允许我们预填一些预定义的示例到界面中。Gradio 的代码如下：

```python
import gradio as gr

gr.Interface(fn=predict,
             inputs=gr.Image(type="pil"),
             outputs=gr.Label(num_top_classes=3),
             examples=["lion.jpg", "cheetah.jpg"]).launch()
```

这将产生以下界面，您可以在浏览器中直接尝试（试试上传自己的示例图片！）：

<iframe src="https://abidlabs-pytorch-image-classifier.hf.space" frameBorder="0" height="660" title="Gradio app" class="container p-0 flex-grow space-iframe" allow="accelerometer; ambient-light-sensor; autoplay; battery; camera; document-domain; encrypted-media; fullscreen; geolocation; gyroscope; layout-animations; legacy-image-formats; magnetometer; microphone; midi; oversized-images; payment; picture-in-picture; publickey-credentials-get; sync-xhr; usb; vr ; wake-lock; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads"></iframe>

---

完成了！这就是构建图像分类器 Web 演示所需的所有代码。如果您想与他人共享，请在 `launch()` 接口时设置 `share=True`！

---

<!-- Source: guides/cn/04_integrating-other-frameworks/image-classification-in-tensorflow.md -->
# TensorFlow 和 Keras 中的图像分类

相关空间：https://huggingface.co/spaces/abidlabs/keras-image-classifier
标签：VISION, MOBILENET, TENSORFLOW

## 简介

图像分类是计算机视觉中的一项核心任务。构建更好的分类器来识别图像中的物体是一个研究的热点领域，因为它在交通控制系统到卫星成像等应用中都有广泛的应用。

这样的模型非常适合与 Gradio 的 _image_ 输入组件一起使用，因此在本教程中，我们将使用 Gradio 构建一个用于图像分类的 Web 演示。我们可以在 Python 中构建整个 Web 应用程序，它的界面将如下所示（试试其中一个例子！）：

<iframe src="https://abidlabs-keras-image-classifier.hf.space" frameBorder="0" height="660" title="Gradio app" class="container p-0 flex-grow space-iframe" allow="accelerometer; ambient-light-sensor; autoplay; battery; camera; document-domain; encrypted-media; fullscreen; geolocation; gyroscope; layout-animations; legacy-image-formats; magnetometer; microphone; midi; oversized-images; payment; picture-in-picture; publickey-credentials-get; sync-xhr; usb; vr ; wake-lock; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads"></iframe>

让我们开始吧！

### 先决条件

确保您已经[安装](/getting_started)了 `gradio` Python 包。我们将使用一个预训练的 Keras 图像分类模型，因此您还应该安装了 `tensorflow`。

## 第一步 —— 设置图像分类模型

首先，我们需要一个图像分类模型。在本教程中，我们将使用一个预训练的 Mobile Net 模型，因为它可以从[Keras](https://keras.io/api/applications/mobilenet/)轻松下载。您也可以使用其他预训练模型或训练自己的模型。

```python
import tensorflow as tf

inception_net = tf.keras.applications.MobileNetV2()
```

此行代码将使用 Keras 库自动下载 MobileNet 模型和权重。

## 第二步 —— 定义 `predict` 函数

接下来，我们需要定义一个函数，该函数接收*用户输入*作为参数（在本例中为图像），并返回预测结果。预测结果应以字典形式返回，其中键是类名，值是置信概率。我们将从这个[text 文件](https://git.io/JJkYN)中加载类名。

对于我们的预训练模型，函数将如下所示：

```python
import requests

# 从ImageNet下载可读性标签。
response = requests.get("https://git.io/JJkYN")
labels = response.text.split("\n")

def classify_image(inp):
  inp = inp.reshape((-1, 224, 224, 3))
  inp = tf.keras.applications.mobilenet_v2.preprocess_input(inp)
  prediction = inception_net.predict(inp).flatten()
  confidences = {labels[i]: float(prediction[i]) for i in range(1000)}
  return confidences
```

让我们来详细了解一下。该函数接受一个参数：

- `inp`：输入图像的 `numpy` 数组

然后，函数添加一个批次维度，通过模型进行处理，并返回：

- `confidences`：预测结果，以字典形式表示，其中键是类标签，值是置信概率

## 第三步 —— 创建 Gradio 界面

现在我们已经设置好了预测函数，我们可以围绕它创建一个 Gradio 界面。

在这种情况下，输入组件是一个拖放图像组件。要创建此输入组件，我们可以使用 `"gradio.inputs.Image"` 类，该类创建该组件并处理预处理以将其转换为 numpy 数组。我们将使用一个参数来实例化该类，该参数会自动将输入图像预处理为 224 像素 x224 像素的大小，这是 MobileNet 所期望的尺寸。

输出组件将是一个 `"label"`，它以美观的形式显示顶部标签。由于我们不想显示所有的 1,000 个类标签，所以我们将自定义它只显示前 3 个标签。

最后，我们还将添加一个 `examples` 参数，它允许我们使用一些预定义的示例预填充我们的接口。Gradio 的代码如下所示：

```python
import gradio as gr

gr.Interface(fn=classify_image,
             inputs=gr.Image(width=224, height=224),
             outputs=gr.Label(num_top_classes=3),
             examples=["banana.jpg", "car.jpg"]).launch()
```

这将生成以下界面，您可以在浏览器中立即尝试（尝试上传您自己的示例！）：

<iframe src="https://abidlabs-keras-image-classifier.hf.space" frameBorder="0" height="660" title="Gradio app" class="container p-0 flex-grow space-iframe" allow="accelerometer; ambient-light-sensor; autoplay; battery; camera; document-domain; encrypted-media; fullscreen; geolocation; gyroscope; layout-animations; legacy-image-formats; magnetometer; microphone; midi; oversized-images; payment; picture-in-picture; publickey-credentials-get; sync-xhr; usb; vr ; wake-lock; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads"></iframe>

---

完成！这就是构建图像分类器的 Web 演示所需的所有代码。如果您想与他人分享，请尝试在启动接口时设置 `share=True`！

---

<!-- Source: guides/cn/04_integrating-other-frameworks/image-classification-with-vision-transformers.md -->
# Vision Transformers 图像分类

相关空间：https://huggingface.co/spaces/abidlabs/vision-transformer
标签：VISION, TRANSFORMERS, HUB

## 简介

图像分类是计算机视觉中的重要任务。构建更好的分类器以确定图像中存在的对象是当前研究的热点领域，因为它在从人脸识别到制造质量控制等方面都有应用。

最先进的图像分类器基于 _transformers_ 架构，该架构最初在自然语言处理任务中很受欢迎。这种架构通常被称为 vision transformers (ViT)。这些模型非常适合与 Gradio 的*图像*输入组件一起使用，因此在本教程中，我们将构建一个使用 Gradio 进行图像分类的 Web 演示。我们只需用**一行 Python 代码**即可构建整个 Web 应用程序，其效果如下（试用一下示例之一！）：

<iframe src="https://abidlabs-vision-transformer.hf.space" frameBorder="0" height="660" title="Gradio app" class="container p-0 flex-grow space-iframe" allow="accelerometer; ambient-light-sensor; autoplay; battery; camera; document-domain; encrypted-media; fullscreen; geolocation; gyroscope; layout-animations; legacy-image-formats; magnetometer; microphone; midi; oversized-images; payment; picture-in-picture; publickey-credentials-get; sync-xhr; usb; vr ; wake-lock; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads"></iframe>

让我们开始吧！

### 先决条件

确保您已经[安装](/getting_started)了 `gradio` Python 包。

## 步骤 1 - 选择 Vision 图像分类模型

首先，我们需要一个图像分类模型。在本教程中，我们将使用[Hugging Face Model Hub](https://huggingface.co/models?pipeline_tag=image-classification)上的一个模型。该 Hub 包含数千个模型，涵盖了多种不同的机器学习任务。

在左侧边栏中展开 Tasks 类别，并选择我们感兴趣的“Image Classification”作为我们的任务。然后，您将看到 Hub 上为图像分类设计的所有模型。

在撰写时，最受欢迎的模型是 `google/vit-base-patch16-224`，该模型在分辨率为 224x224 像素的 ImageNet 图像上进行了训练。我们将在演示中使用此模型。

## 步骤 2 - 使用 Gradio 加载 Vision Transformer 模型

当使用 Hugging Face Hub 上的模型时，我们无需为演示定义输入或输出组件。同样，我们不需要关心预处理或后处理的细节。所有这些都可以从模型标签中自动推断出来。

除了导入语句外，我们只需要一行代码即可加载并启动演示。

我们使用 `gr.Interface.load()` 方法，并传入包含 `huggingface/` 的模型路径，以指定它来自 Hugging Face Hub。

```python
import gradio as gr

gr.Interface.load(
             "huggingface/google/vit-base-patch16-224",
             examples=["alligator.jpg", "laptop.jpg"]).launch()
```

请注意，我们添加了一个 `examples` 参数，允许我们使用一些预定义的示例预填充我们的界面。

这将生成以下接口，您可以直接在浏览器中尝试。当您输入图像时，它会自动进行预处理并发送到 Hugging Face Hub API，通过模型处理，并以人类可解释的预测结果返回。尝试上传您自己的图像！

<iframe src="https://abidlabs-vision-transformer.hf.space" frameBorder="0" height="660" title="Gradio app" class="container p-0 flex-grow space-iframe" allow="accelerometer; ambient-light-sensor; autoplay; battery; camera; document-domain; encrypted-media; fullscreen; geolocation; gyroscope; layout-animations; legacy-image-formats; magnetometer; microphone; midi; oversized-images; payment; picture-in-picture; publickey-credentials-get; sync-xhr; usb; vr ; wake-lock; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads"></iframe>

---

完成！只需一行代码，您就建立了一个图像分类器的 Web 演示。如果您想与他人分享，请在 `launch()` 接口时设置 `share=True`。

---

<!-- Source: guides/cn/05_tabular-data-science-and-plots/creating-a-dashboard-from-bigquery-data.md -->
# 从 BigQuery 数据创建实时仪表盘

Tags: 表格 , 仪表盘 , 绘图

[Google BigQuery](https://cloud.google.com/bigquery) 是一个基于云的用于处理大规模数据集的服务。它是一个无服务器且高度可扩展的数据仓库解决方案，使用户能够使用类似 SQL 的查询分析数据。

在本教程中，我们将向您展示如何使用 `gradio` 在 Python 中查询 BigQuery 数据集并在实时仪表盘中显示数据。仪表板将如下所示：

<img src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/bigquery-dashboard.gif">

在本指南中，我们将介绍以下步骤：

1. 设置 BigQuery 凭据
2. 使用 BigQuery 客户端
3. 构建实时仪表盘（仅需 _7 行 Python 代码_）

我们将使用[纽约时报的 COVID 数据集](https://www.nytimes.com/interactive/2021/us/covid-cases.html)，该数据集作为一个公共数据集可在 BigQuery 上使用。数据集名为 `covid19_nyt.us_counties`，其中包含有关美国各县 COVID 确诊病例和死亡人数的最新信息。

**先决条件**：本指南使用 [Gradio Blocks](../quickstart/#blocks-more-flexibility-and-control)，因此请确保您熟悉 Blocks 类。

## 设置 BigQuery 凭据

要使用 Gradio 和 BigQuery，您需要获取您的 BigQuery 凭据，并将其与 [BigQuery Python 客户端](https://pypi.org/project/google-cloud-bigquery/) 一起使用。如果您已经拥有 BigQuery 凭据（作为 `.json` 文件），则可以跳过此部分。否则，您可以在几分钟内免费完成此操作。

1. 首先，登录到您的 Google Cloud 帐户，并转到 Google Cloud 控制台 (https://console.cloud.google.com/)

2. 在 Cloud 控制台中，单击左上角的汉堡菜单，然后从菜单中选择“API 与服务”。如果您没有现有项目，则需要创建一个项目。

3. 然后，单击“+ 启用的 API 与服务”按钮，该按钮允许您为项目启用特定服务。搜索“BigQuery API”，单击它，然后单击“启用”按钮。如果您看到“管理”按钮，则表示 BigQuery 已启用，您已准备就绪。

4. 在“API 与服务”菜单中，单击“凭据”选项卡，然后单击“创建凭据”按钮。

5. 在“创建凭据”对话框中，选择“服务帐号密钥”作为要创建的凭据类型，并为其命名。还可以通过为其授予角色（例如“BigQuery 用户”）为服务帐号授予权限，从而允许您运行查询。

6. 在选择服务帐号后，选择“JSON”密钥类型，然后单击“创建”按钮。这将下载包含您凭据的 JSON 密钥文件到您的计算机。它的外观类似于以下内容：

```json
{
	"type": "service_account",
	"project_id": "your project",
	"private_key_id": "your private key id",
	"private_key": "private key",
	"client_email": "email",
	"client_id": "client id",
	"auth_uri": "https://accounts.google.com/o/oauth2/auth",
	"token_uri": "https://accounts.google.com/o/oauth2/token",
	"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
	"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/email_id"
}
```

## 使用 BigQuery 客户端

获得凭据后，您需要使用 BigQuery Python 客户端使用您的凭据进行身份验证。为此，您需要在终端中运行以下命令安装 BigQuery Python 客户端：

```bash
pip install google-cloud-bigquery[pandas]
```

您会注意到我们已安装了 pandas 插件，这对于将 BigQuery 数据集处理为 pandas 数据帧将非常有用。安装了客户端之后，您可以通过运行以下代码使用您的凭据进行身份验证：

```py
from google.cloud import bigquery

client = bigquery.Client.from_service_account_json("path/to/key.json")
```

完成凭据身份验证后，您现在可以使用 BigQuery Python 客户端与您的 BigQuery 数据集进行交互。

以下是一个示例函数，该函数在 BigQuery 中查询 `covid19_nyt.us_counties` 数据集，以显示截至当前日期的确诊人数最多的前 20 个县：

```py
import numpy as np

QUERY = (
    'SELECT * FROM `bigquery-public-data.covid19_nyt.us_counties` '
    'ORDER BY date DESC,confirmed_cases DESC '
    'LIMIT 20')

def run_query():
    query_job = client.query(QUERY)
    query_result = query_job.result()
    df = query_result.to_dataframe()
    # Select a subset of columns
    df = df[["confirmed_cases", "deaths", "county", "state_name"]]
    # Convert numeric columns to standard numpy types
    df = df.astype({"deaths": np.int64, "confirmed_cases": np.int64})
    return df
```

## 构建实时仪表盘

一旦您有了查询数据的函数，您可以使用 Gradio 库的 `gr.DataFrame` 组件以表格形式显示结果。这是一种检查数据并确保查询正确的有用方式。

以下是如何使用 `gr.DataFrame` 组件显示结果的示例。通过将 `run_query` 函数传递给 `gr.DataFrame`，我们指示 Gradio 在页面加载时立即运行该函数并显示结果。此外，您还可以传递关键字 `every`，以告知仪表板每小时刷新一次（60\*60 秒）。

```py
import gradio as gr

with gr.Blocks() as demo:
    gr.DataFrame(run_query, every=gr.Timer(60*60))

demo.queue().launch()  # Run the demo using queuing
```

也许您想在我们的仪表盘中添加一个可视化效果。您可以使用 `gr.ScatterPlot()` 组件将数据可视化为散点图。这可以让您查看数据中不同变量（例如病例数和死亡数）之间的关系，并可用于探索数据和获取见解。同样，我们可以实时完成这一操作
通过传递 `every` 参数。

以下是一个完整示例，展示了如何在显示数据时使用 `gr.ScatterPlot` 来进行可视化。

```py
import gradio as gr

with gr.Blocks() as demo:
    gr.Markdown("# 💉 Covid Dashboard (Updated Hourly)")
    with gr.Row():
        gr.DataFrame(run_query, every=gr.Timer(60*60))
        gr.ScatterPlot(run_query, every=gr.Timer(60*60), x="confirmed_cases",
                        y="deaths", tooltip="county", width=500, height=500)

demo.queue().launch()  # Run the demo with queuing enabled
```

---

<!-- Source: guides/cn/05_tabular-data-science-and-plots/creating-a-dashboard-from-supabase-data.md -->
# 从 Supabase 数据创建仪表盘

Tags: TABULAR, DASHBOARD, PLOTS

[Supabase](https://supabase.com/) 是一个基于云的开源后端，提供了 PostgreSQL 数据库、身份验证和其他有用的功能，用于构建 Web 和移动应用程序。在本教程中，您将学习如何从 Supabase 读取数据，并在 Gradio 仪表盘上以**实时**方式绘制数据。

**先决条件 :** 要开始，您需要一个免费的 Supabase 账户，您可以在此处注册：[https://app.supabase.com/](https://app.supabase.com/)

在这个端到端指南中，您将学习如何：

- 在 Supabase 中创建表
- 使用 Supabase Python 客户端向 Supabase 写入数据
- 使用 Gradio 在实时仪表盘中可视化数据

如果您已经在 Supabase 上有数据想要在仪表盘中可视化，您可以跳过前两个部分，直接到[可视化数据](#visualize-the-data-in-a-real-time-gradio-dashboard)！

## 在 Supabase 中创建表

首先，我们需要一些要可视化的数据。根据这个[出色的指南](https://supabase.com/blog/loading-data-supabase-python)，我们将创建一些虚假的商务数据，并将其放入 Supabase 中。

1\. 在 Supabase 中创建一个新项目。一旦您登录，点击 "New Project" 按钮

2\. 给您的项目命名并设置数据库密码。您还可以选择定价计划（对于我们来说，免费计划已足够！）

3\. 在数据库启动时（可能需要多达 2 分钟），您将看到您的 API 密钥。

4\. 在左侧窗格中单击 "Table Editor"（表图标）以创建一个新表。我们将创建一个名为 `Product` 的单表，具有以下模式：

<center>
<table>
<tr><td>product_id</td><td>int8</td></tr>
<tr><td>inventory_count</td><td>int8</td></tr>
<tr><td>price</td><td>float8</td></tr>
<tr><td>product_name</td><td>varchar</td></tr>
</table>
</center>

5\. 点击保存以保存表结构。

我们的表已经准备好了！

## 将数据写入 Supabase

下一步是向 Supabase 数据集中写入数据。我们将使用 Supabase Python 库来完成这个任务。

6\. 通过在终端中运行以下命令来安装 `supabase` 库：

```bash
pip install supabase
```

7\. 获取项目 URL 和 API 密钥。点击左侧窗格上的设置（齿轮图标），然后点击 'API'。URL 列在项目 URL 框中，API 密钥列在项目 API 密钥（带有 `service_role`、`secret` 标签）中

8\. 现在，运行以下 Python 脚本将一些虚假数据写入表中（注意您需要在步骤 7 中放入 `SUPABASE_URL` 和 `SUPABASE_SECRET_KEY` 的值）：

```python
import supabase

# 初始化Supabase客户端
client = supabase.create_client('SUPABASE_URL', 'SUPABASE_SECRET_KEY')

# 定义要写入的数据
import random

main_list = []
for i in range(10):
    value = {'product_id': i,
             'product_name': f"Item {i}",
             'inventory_count': random.randint(1, 100),
             'price': random.random()*100
            }
    main_list.append(value)

# 将数据写入表中
data = client.table('Product').insert(main_list).execute()
```

返回 Supabase 仪表板并刷新页面，您将看到 10 行数据填充到 `Product` 表中！

## 在实时 Gradio 仪表盘中可视化数据

最后，我们将使用相同的 `supabase` Python 库从 Supabase 数据集中读取数据，并使用 `gradio` 创建一个实时仪表盘。

注意：我们在本节中重复了某些步骤（比如创建 Supabase 客户端），以防您没有完成之前的部分。如第 7 步所述，您将需要数据库的项目 URL 和 API 密钥。

9\. 编写一个函数，从 `Product` 表加载数据并将其作为 pandas DataFrame 返回：

import supabase

```python
import supabase
import pandas as pd

client = supabase.create_client('SUPABASE_URL', 'SUPABASE_SECRET_KEY')

def read_data():
    response = client.table('Product').select("*").execute()
    df = pd.DataFrame(response.data)
    return df
```

10\. 使用两个条形图创建一个小的 Gradio 仪表盘，每分钟绘制所有项目的价格和库存量，并实时更新：

```python
import gradio as gr

with gr.Blocks() as dashboard:
    with gr.Row():
        gr.BarPlot(read_data, x="product_id", y="price", title="价格", every=gr.Timer(60))
        gr.BarPlot(read_data, x="product_id", y="inventory_count", title="库存", every=gr.Timer(60))

dashboard.queue().launch()
```

请注意，通过将函数传递给 `gr.BarPlot()`，我们可以在网络应用加载时查询数据库（然后每 60 秒查询一次，因为有 `every` 参数）。您的最终仪表盘应如下所示：

<gradio-app space="abidlabs/supabase"></gradio-app>

## 结论

就是这样！在本教程中，您学习了如何将数据写入 Supabase 数据集，然后读取该数据并将结果绘制为条形图。如果您更新 Supabase 数据库中的数据，您会注意到 Gradio 仪表盘将在一分钟内更新。

尝试在此示例中添加更多绘图和可视化（或使用不同的数据集），以构建一个更复杂的仪表盘！

---

<!-- Source: guides/cn/05_tabular-data-science-and-plots/creating-a-realtime-dashboard-from-google-sheets.md -->
# 从 Google Sheets 创建实时仪表盘

Tags: TABULAR, DASHBOARD, PLOTS
[Google Sheets](https://www.google.com/sheets/about/) 是一种以电子表格形式存储表格数据的简便方法。借助 Gradio 和 pandas，可以轻松从公共或私有 Google Sheets 读取数据，然后显示数据或绘制数据。在本博文中，我们将构建一个小型 _real-time_ 仪表盘，该仪表盘在 Google Sheets 中的数据更新时进行更新。
构建仪表盘本身只需要使用 Gradio 的 9 行 Python 代码，我们的最终仪表盘如下所示：
<gradio-app space="gradio/line-plot"></gradio-app>

**先决条件**：本指南使用[Gradio Blocks](../quickstart/#blocks-more-flexibility-and-control)，因此请确保您熟悉 Blocks 类。
具体步骤略有不同，具体取决于您是使用公开访问还是私有 Google Sheet。我们将分别介绍这两种情况，所以让我们开始吧！

## Public Google Sheets

由于[`pandas` 库](https://pandas.pydata.org/)的存在，从公共 Google Sheet 构建仪表盘非常简单：

1. 获取要使用的 Google Sheets 的网址。为此，只需进入 Google Sheets，单击右上角的“共享”按钮，然后单击“获取可共享链接”按钮。这将给您一个类似于以下示例的网址：

```html
https://docs.google.com/spreadsheets/d/1UoKzzRzOCt-FXLLqDKLbryEKEgllGAQUEJ5qtmmQwpU/edit#gid=0
```

2. 现在，修改此网址并使用它从 Google Sheets 读取数据到 Pandas DataFrame 中。 (在下面的代码中，用您的公开 Google Sheet 的网址替换 `URL` 变量)：

```python
import pandas as pd
URL = "https://docs.google.com/spreadsheets/d/1UoKzzRzOCt-FXLLqDKLbryEKEgllGAQUEJ5qtmmQwpU/edit#gid=0"csv_url = URL.replace('/edit#gid=', '/export?format=csv&gid=')
def get_data():
    return pd.read_csv(csv_url)
```

3. 数据查询是一个函数，这意味着可以使用 `gr.DataFrame` 组件实时显示或使用 `gr.LinePlot` 组件实时绘制数据（当然，根据数据的不同，可能需要不同的绘图方法）。只需将函数传递给相应的组件，并根据组件刷新的频率（以秒为单位）设置 `every` 参数。以下是 Gradio 代码：

```python
import gradio as gr

with gr.Blocks() as demo:
    gr.Markdown("# 📈 Real-Time Line Plot")
    with gr.Row():
        with gr.Column():
            gr.DataFrame(get_data, every=gr.Timer(5))
        with gr.Column():
            gr.LinePlot(get_data, every=gr.Timer(5), x="Date", y="Sales", y_title="Sales ($ millions)", overlay_point=True, width=500, height=500)

demo.queue().launch()  # Run the demo with queuing enabled
```

到此为止！您现在拥有一个仪表盘，每 5 秒刷新一次，从 Google Sheets 中获取数据。

## 私有 Google Sheets

对于私有 Google Sheets，流程需要更多的工作量，但并不多！关键区别在于，现在您必须经过身份验证，以授权访问私有 Google Sheets。

### 身份验证

要进行身份验证，需从 Google Cloud 获取凭据。以下是[如何设置 Google Cloud 凭据](https://developers.google.com/workspace/guides/create-credentials)：

1. 首先，登录您的 Google Cloud 帐户并转到 Google Cloud 控制台（https://console.cloud.google.com/）
2. 在 Cloud 控制台中，单击左上角的汉堡菜单，然后从菜单中选择“API 和服务”。如果您没有现有项目，则需要创建一个。
3. 然后，点击“+ 启用的 API 和服务”按钮，允许您为项目启用特定的服务。搜索“Google Sheets API”，点击它，然后单击“启用”按钮。如果看到“管理”按钮，则表示 Google Sheets 已启用，并且您已准备就绪。
4. 在 API 和服务菜单中，点击“凭据”选项卡，然后点击“创建凭据”按钮。
5. 在“创建凭据”对话框中，选择“服务帐号密钥”作为要创建的凭据类型，并为其命名。**记下服务帐号的电子邮件地址**
6. 在选择服务帐号之后，选择“JSON”密钥类型，然后点击“创建”按钮。这将下载包含您凭据的 JSON 密钥文件到您的计算机。文件类似于以下示例：

```json
{
	"type": "service_account",
	"project_id": "your project",
	"private_key_id": "your private key id",
	"private_key": "private key",
	"client_email": "email",
	"client_id": "client id",
	"auth_uri": "https://accounts.google.com/o/oauth2/auth",
	"token_uri": "https://accounts.google.com/o/oauth2/token",
	"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
	"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/email_id"
}
```

### 查询

在获得凭据的 `.json` 文件后，可以按照以下步骤查询您的 Google Sheet：

1. 单击 Google Sheet 右上角的“共享”按钮。使用身份验证子部分第 5 步的服务的电子邮件地址共享 Google Sheets（此步骤很重要！）。然后单击“获取可共享链接”按钮。这将给您一个类似于以下示例的网址：

```html
https://docs.google.com/spreadsheets/d/1UoKzzRzOCt-FXLLqDKLbryEKEgllGAQUEJ5qtmmQwpU/edit#gid=0
```

2. 安装 [`gspread` 库](https://docs.gspread.org/en/v5.7.0/)，通过在终端运行以下命令使 Python 中使用 [Google Sheets API](https://developers.google.com/sheets/api/guides/concepts) 更加简单：`pip install gspread`
3. 编写一个函数来从 Google Sheet 中加载数据，如下所示（用您的私有 Google Sheet 的 URL 替换 `URL` 变量）：

```python
import gspreadimport pandas as pd
# 与 Google 进行身份验证并获取表格URL = 'https://docs.google.com/spreadsheets/d/1_91Vps76SKOdDQ8cFxZQdgjTJiz23375sAT7vPvaj4k/edit#gid=0'
gc = gspread.service_account("path/to/key.json")sh = gc.open_by_url(URL)worksheet = sh.sheet1
def get_data():
    values = worksheet.get_all_values()
    df = pd.DataFrame(values[1:], columns=values[0])
    return df
```

4\. 数据查询是一个函数，这意味着可以使用 `gr.DataFrame` 组件实时显示数据，或使用 `gr.LinePlot` 组件实时绘制数据（当然，根据数据的不同，可能需要使用不同的图表）。要实现这一点，只需将函数传递给相应的组件，并根据需要设置 `every` 参数来确定组件刷新的频率（以秒为单位）。以下是 Gradio 代码：

```python
import gradio as gr

with gr.Blocks() as demo:
    gr.Markdown("# 📈 实时折线图")
    with gr.Row():
        with gr.Column():
            gr.DataFrame(get_data, every=gr.Timer(5))
        with gr.Column():
            gr.LinePlot(get_data, every=gr.Timer(5), x="日期", y="销售额", y_title="销售额（百万美元）", overlay_point=True, width=500, height=500)

demo.queue().launch()  # 启动带有排队功能的演示
```

现在你有一个每 5 秒刷新一次的仪表盘，可以从你的 Google 表格中获取数据。

## 结论

就是这样！只需几行代码，你就可以使用 `gradio` 和其他库从公共或私有的 Google 表格中读取数据，然后在实时仪表盘中显示和绘制数据。

---

<!-- Source: guides/cn/05_tabular-data-science-and-plots/plot-component-for-maps.md -->
# 如何使用地图组件绘制图表

Related spaces:
Tags: PLOTS, MAPS

## 简介

本指南介绍如何使用 Gradio 的 `Plot` 组件在地图上绘制地理数据。Gradio 的 `Plot` 组件可以与 Matplotlib、Bokeh 和 Plotly 一起使用。在本指南中，我们将使用 Plotly 进行操作。Plotly 可以让开发人员轻松创建各种地图来展示他们的地理数据。点击[这里](https://plotly.com/python/maps/)查看一些示例。

## 概述

我们将使用纽约市的 Airbnb 数据集，该数据集托管在 kaggle 上，点击[这里](https://www.kaggle.com/datasets/dgomonov/new-york-city-airbnb-open-data)。我已经将其上传到 Hugging Face Hub 作为一个数据集，方便使用和下载，点击[这里](https://huggingface.co/datasets/gradio/NYC-Airbnb-Open-Data)。使用这些数据，我们将在地图上绘制 Airbnb 的位置，并允许基于价格和位置进行筛选。下面是我们将要构建的演示。 ⚡️

$demo_map_airbnb

## 步骤 1-加载 CSV 数据 💾

让我们首先从 Hugging Face Hub 加载纽约市的 Airbnb 数据。

```python
from datasets import load_dataset

dataset = load_dataset("gradio/NYC-Airbnb-Open-Data", split="train")
df = dataset.to_pandas()

def filter_map(min_price, max_price, boroughs):
    new_df = df[(df['neighbourhood_group'].isin(boroughs)) &
            (df['price'] > min_price) & (df['price'] < max_price)]
    names = new_df["name"].tolist()
    prices = new_df["price"].tolist()
    text_list = [(names[i], prices[i]) for i in range(0, len(names))]
```

在上面的代码中，我们先将 CSV 数据加载到一个 pandas dataframe 中。让我们首先定义一个函数，这将作为 gradio 应用程序的预测函数。该函数将接受最低价格、最高价格范围和筛选结果地区的列表作为参数。我们可以使用传入的值 (`min_price`、`max_price` 和地区列表) 来筛选数据框并创建 `new_df`。接下来，我们将创建包含每个 Airbnb 的名称和价格的 `text_list`，以便在地图上使用作为标签。

## 步骤 2-地图图表 🌐

Plotly 使得处理地图变得很容易。让我们看一下下面的代码，了解如何创建地图图表。

```python
import plotly.graph_objects as go

fig = go.Figure(go.Scattermapbox(
            customdata=text_list,
            lat=new_df['latitude'].tolist(),
            lon=new_df['longitude'].tolist(),
            mode='markers',
            marker=go.scattermapbox.Marker(
                size=6
            ),
            hoverinfo="text",
            hovertemplate='<b>Name</b>: %{customdata[0]}<br><b>Price</b>: $%{customdata[1]}'
        ))

fig.update_layout(
    mapbox_style="open-street-map",
    hovermode='closest',
    mapbox=dict(
        bearing=0,
        center=go.layout.mapbox.Center(
            lat=40.67,
            lon=-73.90
        ),
        pitch=0,
        zoom=9
    ),
)
```

上面的代码中，我们通过传入经纬度列表来创建一个散点图。我们还传入了名称和价格的自定义数据，以便在鼠标悬停在每个标记上时显示额外的信息。接下来，我们使用 `update_layout` 来指定其他地图设置，例如缩放和居中。

有关使用 Mapbox 和 Plotly 创建散点图的更多信息，请点击[这里](https://plotly.com/python/scattermapbox/)。

## 步骤 3-Gradio 应用程序 ⚡️

我们将使用两个 `gr.Number` 组件和一个 `gr.CheckboxGroup` 组件，允许用户指定价格范围和地区位置。然后，我们将使用 `gr.Plot` 组件作为我们之前创建的 Plotly + Mapbox 地图的输出。

```python
with gr.Blocks() as demo:
    with gr.Column():
        with gr.Row():
            min_price = gr.Number(value=250, label="Minimum Price")
            max_price = gr.Number(value=1000, label="Maximum Price")
        boroughs = gr.CheckboxGroup(choices=["Queens", "Brooklyn", "Manhattan", "Bronx", "Staten Island"], value=["Queens", "Brooklyn"], label="Select Boroughs:")
        btn = gr.Button(value="Update Filter")
        map = gr.Plot()
    demo.load(filter_map, [min_price, max_price, boroughs], map)
    btn.click(filter_map, [min_price, max_price, boroughs], map)
```

我们使用 `gr.Column` 和 `gr.Row` 布局这些组件，并为演示加载时和点击 " 更新筛选 " 按钮时添加了事件触发器，以触发地图更新新的筛选条件。

以下是完整演示代码：

$code_map_airbnb

## 步骤 4-部署 Deployment 🤗

如果你运行上面的代码，你的应用程序将在本地运行。
如果要获取临时共享链接，可以将 `share=True` 参数传递给 `launch`。

但如果你想要一个永久的部署解决方案呢？
让我们将我们的 Gradio 应用程序部署到免费的 HuggingFace Spaces 平台。

如果你以前没有使用过 Spaces，请按照之前的指南[这里](/using_hugging_face_integrations)。

## 结论 🎉

你已经完成了！这是构建地图演示所需的所有代码。

链接到演示：[地图演示](https://huggingface.co/spaces/gradio/map_airbnb)和[完整代码](https://huggingface.co/spaces/gradio/map_airbnb/blob/main/run.py)（在 Hugging Face Spaces）

---

<!-- Source: guides/cn/05_tabular-data-science-and-plots/using-gradio-for-tabular-workflows.md -->
## 使用 Gradio 进行表格数据科学工作流

Related spaces: https://huggingface.co/spaces/scikit-learn/gradio-skops-integration，https://huggingface.co/spaces/scikit-learn/tabular-playground，https://huggingface.co/spaces/merve/gradio-analysis-dashboard

## 介绍

表格数据科学是机器学习中应用最广泛的领域，涉及的问题从客户分割到流失预测不等。在表格数据科学工作流的各个阶段中，将工作内容传达给利益相关者或客户可能很麻烦，这会阻碍数据科学家专注于重要事项，如数据分析和模型构建。数据科学家可能会花费数小时构建一个接受 DataFrame 并返回图表、预测或数据集中的聚类图的仪表板。在本指南中，我们将介绍如何使用 `gradio` 改进您的数据科学工作流程。我们还将讨论如何使用 `gradio` 和[skops](https://skops.readthedocs.io/en/stable/)一行代码即可构建界面！

### 先决条件

确保您已经[安装](/getting_started)了 `gradio` Python 软件包。

## 让我们创建一个简单的界面！

我们将看一下如何创建一个简单的界面，该界面根据产品信息预测故障。

```python
import gradio as gr
import pandas as pd
import joblib
import datasets


inputs = [gr.Dataframe(row_count = (2, "dynamic"), col_count=(4,"dynamic"), label="Input Data", interactive=1)]

outputs = [gr.Dataframe(row_count = (2, "dynamic"), col_count=(1, "fixed"), label="Predictions", headers=["Failures"])]

model = joblib.load("model.pkl")

# we will give our dataframe as example
df = datasets.load_dataset("merve/supersoaker-failures")
df = df["train"].to_pandas()

def infer(input_dataframe):
  return pd.DataFrame(model.predict(input_dataframe))

gr.Interface(fn = infer, inputs = inputs, outputs = outputs, examples = [[df.head(2)]]).launch()
```

让我们来解析上述代码。

- `fn`：推理函数，接受输入数据帧并返回预测结果。
- `inputs`：我们使用 `Dataframe` 组件作为输入。我们将输入定义为具有 2 行 4 列的数据帧，最初的数据帧将呈现出上述形状的空数据帧。当将 `row_count` 设置为 `dynamic` 时，不必依赖于正在输入的数据集来预定义组件。
- `outputs`：用于存储输出的数据帧组件。该界面可以接受单个或多个样本进行推断，并在一列中为每个样本返回 0 或 1，因此我们将 `row_count` 设置为 2，`col_count` 设置为 1。`headers` 是由数据帧的列名组成的列表。
- `examples`：您可以通过拖放 CSV 文件或通过示例传递 pandas DataFrame，界面会自动获取其标题。

现在我们将为简化版数据可视化仪表板创建一个示例。您可以在相关空间中找到更全面的版本。

<gradio-app space="gradio/tabular-playground"></gradio-app>

```python
import gradio as gr
import pandas as pd
import datasets
import seaborn as sns
import matplotlib.pyplot as plt

df = datasets.load_dataset("merve/supersoaker-failures")
df = df["train"].to_pandas()
df.dropna(axis=0, inplace=True)

def plot(df):
  plt.scatter(df.measurement_13, df.measurement_15, c = df.loading,alpha=0.5)
  plt.savefig("scatter.png")
  df['failure'].value_counts().plot(kind='bar')
  plt.savefig("bar.png")
  sns.heatmap(df.select_dtypes(include="number").corr())
  plt.savefig("corr.png")
  plots = ["corr.png","scatter.png", "bar.png"]
  return plots

inputs = [gr.Dataframe(label="Supersoaker Production Data")]
outputs = [gr.Gallery(label="Profiling Dashboard", columns=(1,3))]

gr.Interface(plot, inputs=inputs, outputs=outputs, examples=[df.head(100)], title="Supersoaker Failures Analysis Dashboard").launch()
```

<gradio-app space="gradio/gradio-analysis-dashboard-minimal"></gradio-app>

我们将使用与训练模型相同的数据集，但这次我们将创建一个可视化仪表板以展示它。

- `fn`：根据数据创建图表的函数。
- `inputs`：我们使用了与上述相同的 `Dataframe` 组件。
- `outputs`：我们使用 `Gallery` 组件来存放我们的可视化结果。
- `examples`：我们将数据集本身作为示例。

## 使用 skops 一行代码轻松加载表格数据界面

`skops` 是一个构建在 `huggingface_hub` 和 `sklearn` 之上的库。通过最新的 `gradio` 集成，您可以使用一行代码构建表格数据界面！

```python
import gradio as gr

# 标题和描述是可选的
title = "Supersoaker产品缺陷预测"
description = "该模型预测Supersoaker生产线故障。在下面的数据帧组件中，您可以拖放数据集的任意切片或自行编辑值。"

gr.load("huggingface/scikit-learn/tabular-playground", title=title, description=description).launch()
```

<gradio-app space="gradio/gradio-skops-integration"></gradio-app>

使用 `skops` 将 `sklearn` 模型推送到 Hugging Face Hub 时，会包含一个包含示例输入和列名的 `config.json` 文件，解决的任务类型是 `tabular-classification` 或 `tabular-regression`。根据任务类型，`gradio` 构建界面并使用列名和示例输入来构建它。您可以[参考 skops 在 Hub 上托管模型的文档](https://skops.readthedocs.io/en/latest/auto_examples/plot_hf_hub.html#sphx-glr-auto-examples-plot-hf-hub-py)来了解如何使用 `skops` 将模型推送到 Hub。

---

<!-- Source: guides/cn/06_client-libraries/fastapi-app-with-the-gradio-client.md -->
# 使用Gradio Python客户端构建FastAPI应用

Tags: CLIENT, API, WEB APP

在本博客文章中，我们将演示如何使用 `gradio_client` [Python库](getting-started-with-the-python-client/) 来以编程方式创建Gradio应用的请求，通过创建一个示例FastAPI Web应用。我们将构建的 Web 应用名为“Acappellify”，它允许用户上传视频文件作为输入，并返回一个没有伴奏音乐的视频版本。它还会显示生成的视频库。

**先决条件**

在开始之前，请确保您正在运行Python 3.9或更高版本，并已安装以下库：

- `gradio_client`
- `fastapi`
- `uvicorn`

您可以使用`pip`安装这些库：

```bash
$ pip install gradio_client fastapi uvicorn
```

您还需要安装ffmpeg。您可以通过在终端中运行以下命令来检查您是否已安装ffmpeg：

```bash
$ ffmpeg version
```

否则，通过按照这些说明安装ffmpeg [链接](https://www.hostinger.com/tutorials/how-to-install-ffmpeg)。

## 步骤1：编写视频处理函数

让我们从似乎最复杂的部分开始--使用机器学习从视频中去除音乐。

幸运的是，我们有一个现有的Space可以简化这个过程：[https://huggingface.co/spaces/abidlabs/music-separation](https://huggingface.co/spaces/abidlabs/music-separation)。该空间接受一个音频文件，并生成两个独立的音频文件：一个带有伴奏音乐，一个带有原始剪辑中的其他所有声音。非常适合我们的客户端使用！

打开一个新的Python文件，比如`main.py`，并通过从`gradio_client`导入 `Client` 类，并将其连接到该Space：

```py
from gradio_client import Client

client = Client("abidlabs/music-separation")

def acapellify(audio_path):
    result = client.predict(audio_path, api_name="/predict")
    return result[0]
```

所需的代码仅如上所示--请注意，API端点返回一个包含两个音频文件（一个没有音乐，一个只有音乐）的列表，因此我们只返回列表的第一个元素。

---

**注意**：由于这是一个公共Space，可能会有其他用户同时使用该Space，这可能导致速度较慢。您可以使用自己的[Hugging Face token](https://huggingface.co/settings/tokens)复制此Space，创建一个只有您自己访问权限的私有Space，并绕过排队。要做到这一点，只需用下面的代码替换上面的前两行：

```py
from gradio_client import Client

client = Client.duplicate("abidlabs/music-separation", hf_token=YOUR_HF_TOKEN)
```

其他的代码保持不变！

---

现在，当然，我们正在处理视频文件，所以我们首先需要从视频文件中提取音频。为此，我们将使用`ffmpeg`库，它在处理音频和视频文件时做了很多艰巨的工作。使用`ffmpeg`的最常见方法是通过命令行，在Python的`subprocess`模块中调用它：

我们的视频处理工作流包含三个步骤：

1. 首先，我们从视频文件路径开始，并使用`ffmpeg`提取音频。
2. 然后，我们通过上面的`acapellify()`函数传入音频文件。
3. 最后，我们将新音频与原始视频合并，生成最终的Acapellify视频。

以下是Python中的完整代码，您可以将其添加到`main.py`文件中：

```python
import subprocess

def process_video(video_path):
    old_audio = os.path.basename(video_path).split(".")[0] + ".m4a"
    subprocess.run(['ffmpeg', '-y', '-i', video_path, '-vn', '-acodec', 'copy', old_audio])

    new_audio = acapellify(old_audio)

    new_video = f"acap_{video_path}"
    subprocess.call(['ffmpeg', '-y', '-i', video_path, '-i', new_audio, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-strict', 'experimental', f"static/{new_video}"])
    return new_video
```

如果您想了解所有命令行参数的详细信息，请阅读[ffmpeg文档](https://ffmpeg.org/ffmpeg.html)，因为它们超出了本教程的范围。

## 步骤2: 创建一个FastAPI应用（后端路由）

接下来，我们将创建一个简单的FastAPI应用程序。如果您以前没有使用过FastAPI，请查看[优秀的FastAPI文档](https://fastapi.tiangolo.com/)。否则，下面的基本模板将看起来很熟悉，我们将其添加到`main.py`中：

```python
import os
from fastapi import FastAPI, File, UploadFile, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()
os.makedirs("static", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

videos = []

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse(
        "home.html", {"request": request, "videos": videos})

@app.post("/uploadvideo/")
async def upload_video(video: UploadFile = File(...)):
    new_video = process_video(video.filename)
    videos.append(new_video)
    return RedirectResponse(url='/', status_code=303)
```

在这个示例中，FastAPI应用程序有两个路由：`/` 和 `/uploadvideo/`。

`/` 路由返回一个显示所有上传视频的画廊的HTML模板。

`/uploadvideo/` 路由接受一个带有`UploadFile`对象的 `POST` 请求，表示上传的视频文件。视频文件通过`process_video()`方法进行 "acapellify"，并将输出视频存储在一个列表中，该列表在内存中存储了所有上传的视频。

请注意，这只是一个非常基本的示例，如果这是一个发布应用程序，则需要添加更多逻辑来处理文件存储、用户身份验证和安全性考虑等。

## 步骤3：创建一个FastAPI应用（前端模板）

最后，我们创建Web应用的前端。首先，在与`main.py`相同的目录下创建一个名为`templates`的文件夹。然后，在`templates`文件夹中创建一个名为`home.html`的模板。下面是最终的文件结构：

```csv
├── main.py
├── templates
│   └── home.html
```

将以下内容写入`home.html`文件中：

```html
&lt;!DOCTYPE html> &lt;html> &lt;head> &lt;title> 视频库 &lt;/title> &lt;style>
body { font-family: sans-serif; margin: 0; padding: 0; background-color:
#f5f5f5; } h1 { text-align: center; margin-top: 30px; margin-bottom: 20px; }
.gallery { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px;
padding: 20px; } .video { border: 2px solid #ccc; box-shadow: 0px 0px 10px
rgba(0, 0, 0, 0.2); border-radius: 5px; overflow: hidden; width: 300px;
margin-bottom: 20px; } .video video { width: 100%; height: 200px; } .video p {
text-align: center; margin: 10px 0; } form { margin-top: 20px; text-align:
center; } input[type="file"] { display: none; } .upload-btn { display:
inline-block; background-color: #3498db; color: #fff; padding: 10px 20px;
font-size: 16px; border: none; border-radius: 5px; cursor: pointer; }
.upload-btn:hover { background-color: #2980b9; } .file-name { margin-left: 10px;
} &lt;/style> &lt;/head> &lt;body> &lt;h1> 视频库 &lt;/h1> {% if videos %}
&lt;div class="gallery"> {% for video in videos %} &lt;div class="video">
&lt;video controls> &lt;source src="{{ url_for('static', path=video) }}"
type="video/mp4"> 您的浏览器不支持视频标签。 &lt;/video> &lt;p>{{ video
}}&lt;/p> &lt;/div> {% endfor %} &lt;/div> {% else %} &lt;p>
尚未上传任何视频。&lt;/p> {% endif %} &lt;form action="/uploadvideo/"
method="post" enctype="multipart/form-data"> &lt;label for="video-upload"
class="upload-btn"> 选择视频文件 &lt;/label> &lt;input type="file" name="video"
id="video-upload"> &lt;span class="file-name">&lt;/span> &lt;button
type="submit" class="upload-btn"> 上传 &lt;/button> &lt;/form> &lt;script> //
在表单中显示所选文件名 const fileUpload =
document.getElementById("video-upload"); const fileName =
document.querySelector(".file-name"); fileUpload.addEventListener("change", (e)
=> { fileName.textContent = e.target.files[0].name; }); &lt;/script> &lt;/body>
&lt;/html>
```

## 第4步：运行 FastAPI 应用

最后，我们准备好运行由 Gradio Python 客户端提供支持的 FastAPI 应用程序。

打开终端并导航到包含 `main.py` 文件的目录，然后在终端中运行以下命令：

```bash
$ uvicorn main:app
```

您应该会看到如下输出：

```csv
Loaded as API: https://abidlabs-music-separation.hf.space ✔
INFO:     Started server process [1360]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

就是这样！开始上传视频，您将在响应中得到一些“acapellified”视频（处理时间根据您的视频长度可能需要几秒钟到几分钟）。以下是上传两个视频后 UI 的外观：

![](https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/gradio-guides/acapellify.png)

如果您想了解如何在项目中使用 Gradio Python 客户端的更多信息，请[阅读专门的指南](/getting-started-with-the-python-client/)。

---

<!-- Source: guides/cn/06_client-libraries/gradio-and-llm-agents.md -->
# Gradio & LLM Agents 🤝

非常强大的大型语言模型（LLM），如果我们能赋予它们完成专门任务的技能，它们将变得更加强大。

[gradio_tools](https://github.com/freddyaboulton/gradio-tools)库可以将任何[Gradio](https://github.com/gradio-app/gradio)应用程序转化为[工具](https://python.langchain.com/en/latest/modules/agents/tools.html)，供[代理](https://docs.langchain.com/docs/components/agents/agent)使用以完成任务。例如，一个LLM可以使用Gradio工具转录在网上找到的语音记录，然后为您summarize它。或者它可以使用不同的Gradio工具对您的Google Drive上的文档应用OCR，然后回答相关问题。

本指南将展示如何使用`gradio_tools`让您的LLM代理访问全球托管的最先进的Gradio应用程序。尽管`gradio_tools`与不止一个代理框架兼容，但本指南将重点介绍[Langchain代理](https://docs.langchain.com/docs/components/agents/)。

## 一些背景信息

### 代理是什么？

[LangChain代理](https://docs.langchain.com/docs/components/agents/agent)是一个大型语言模型（LLM），它根据使用其众多工具之一的输入来生成输出。

### Gradio是什么？

[Gradio](https://github.com/gradio-app/gradio)是用于构建机器学习Web应用程序并与全球共享的事实上的标准框架-完全由Python驱动！🐍

## gradio_tools - 一个端到端的示例

要开始使用`gradio_tools`，您只需要导入和初始化工具，然后将其传递给langchain代理！

在下面的示例中，我们导入`StableDiffusionPromptGeneratorTool`以创建一个良好的稳定扩散提示，
`StableDiffusionTool`以使用我们改进的提示创建一张图片，`ImageCaptioningTool`以为生成的图片加上标题，以及
`TextToVideoTool`以根据提示创建一个视频。

然后，我们告诉我们的代理创建一张狗正在滑板的图片，但在使用图像生成器之前请先改进我们的提示。我们还要求
它为生成的图片添加标题并创建一个视频。代理可以根据需要决定使用哪个工具，而不需要我们明确告知。

```python
import os

if not os.getenv("OPENAI_API_KEY"):
    raise ValueError("OPENAI_API_KEY 必须设置 ")

from langchain.agents import initialize_agent
from langchain.llms import OpenAI
from gradio_tools import (StableDiffusionTool, ImageCaptioningTool, StableDiffusionPromptGeneratorTool,
                          TextToVideoTool)

from langchain.memory import ConversationBufferMemory

llm = OpenAI(temperature=0)
memory = ConversationBufferMemory(memory_key="chat_history")
tools = [StableDiffusionTool().langchain, ImageCaptioningTool().langchain,
         StableDiffusionPromptGeneratorTool().langchain, TextToVideoTool().langchain]

agent = initialize_agent(tools, llm, memory=memory, agent="conversational-react-description", verbose=True)
output = agent.run(input=("Please create a photo of a dog riding a skateboard "
                          "but improve my prompt prior to using an image generator."
                          "Please caption the generated image and create a video for it using the improved prompt."))
```

您会注意到我们正在使用一些与`gradio_tools`一起提供的预构建工具。请参阅此[文档](https://github.com/freddyaboulton/gradio-tools#gradio-tools-gradio--llm-agents)以获取完整的`gradio_tools`工具列表。
如果您想使用当前不在`gradio_tools`中的工具，很容易添加您自己的工具。下一节将介绍如何添加自己的工具。

## gradio_tools - 创建自己的工具

核心抽象是`GradioTool`，它允许您为LLM定义一个新的工具，只要您实现标准接口：

```python
class GradioTool(BaseTool):

    def __init__(self, name: str, description: str, src: str) -> None:

    @abstractmethod
    def create_job(self, query: str) -> Job:
        pass

    @abstractmethod
    def postprocess(self, output: Tuple[Any] | Any) -> str:
        pass
```

需要满足的要求是：

1. 工具的名称
2. 工具的描述。这非常关键！代理根据其描述决定使用哪个工具。请确切描述输入和输出应该是什么样的，最好包括示例。
3. Gradio应用程序的url或space id，例如`freddyaboulton/calculator`。基于该值，`gradio_tool`将通过API创建一个[gradio客户端](https://github.com/gradio-app/gradio/blob/main/client/python/README.md)实例来查询上游应用程序。如果您不熟悉gradio客户端库，请确保点击链接了解更多信息。
4. create_job - 给定一个字符串，该方法应该解析该字符串并从客户端返回一个job。大多数情况下，这只需将字符串传递给客户端的`submit`函数即可。有关创建job的更多信息，请参阅[这里](https://github.com/gradio-app/gradio/blob/main/client/python/README.md#making-a-prediction)
5. postprocess - 给定作业的结果，将其转换为LLM可以向用户显示的字符串。
6. _Optional可选_ - 某些库，例如[MiniChain](https://github.com/srush/MiniChain/tree/main)，可能需要一些关于工具使用的底层gradio输入和输出类型的信息。默认情况下，这将返回gr.Textbox()，但如果您想提供更准确的信息，请实现工具的`_block_input(self, gr)`和`_block_output(self, gr)`方法。`gr`变量是gradio模块（通过`import gradio as gr`获得的结果）。`GradiTool`父类将自动引入`gr`并将其传递给`_block_input`和`_block_output`方法。

就是这样！

一旦您创建了自己的工具，请在`gradio_tools`存储库上发起拉取请求！我们欢迎所有贡献。

## 示例工具 - 稳定扩散

以下是作为示例的稳定扩散工具代码：

from gradio_tool import GradioTool
import os

class StableDiffusionTool(GradioTool):
"""Tool for calling stable diffusion from llm"""

    def __init__(
        self,
        name="StableDiffusion",
        description=(
            "An image generator. Use this to generate images based on "
            "text input. Input should be a description of what the image should "
            "look like. The output will be a path to an image file."
        ),
        src="gradio-client-demos/stable-diffusion",
        hf_token=None,
    ) -> None:
        super().__init__(name, description, src, hf_token)

    def create_job(self, query: str) -> Job:
        return self.client.submit(query, "", 9, fn_index=1)

    def postprocess(self, output: str) -> str:
        return [os.path.join(output, i) for i in os.listdir(output) if not i.endswith("json")][0]

    def _block_input(self, gr) -> "gr.components.Component":
        return gr.Textbox()

    def _block_output(self, gr) -> "gr.components.Component":
        return gr.Image()

```
关于此实现的一些注意事项：
1. 所有的 `GradioTool` 实例都有一个名为 `client` 的属性，它指向底层的 [gradio 客户端](https://github.com/gradio-app/gradio/tree/main/client/python#gradio_client-use-a-gradio-app-as-an-api----in-3-lines-of-python)，这就是您在 `create_job` 方法中应该使用的内容。

2. `create_job` 方法只是将查询字符串传递给客户端的 `submit` 函数，并硬编码了一些其他参数，即负面提示字符串和指南缩放。我们可以在后续版本中修改我们的工具，以便从输入字符串中接受这些值。

3. `postprocess` 方法只是返回由稳定扩散空间创建的图库中的第一个图像。我们使用 `os` 模块获取图像的完整路径。

## Conclusion

现在，您已经知道如何通过数千个运行在野外的 gradio 空间来扩展您的 LLM 的能力了！
同样，我们欢迎对 [gradio_tools](https://github.com/freddyaboulton/gradio-tools) 库的任何贡献。我们很兴奋看到大家构建的工具！
```

---

<!-- Source: guides/cn/07_other-tutorials/create-your-own-friends-with-a-gan.md -->
# 使用 GAN 创建您自己的朋友

spaces/NimaBoscarino/cryptopunks, https://huggingface.co/spaces/nateraw/cryptopunks-generator
Tags: GAN, IMAGE, HUB

由 <a href="https://huggingface.co/NimaBoscarino">Nima Boscarino</a> 和 <a href="https://huggingface.co/nateraw">Nate Raw</a> 贡献

## 简介

最近，加密货币、NFTs 和 Web3 运动似乎都非常流行！数字资产以惊人的金额在市场上上市，几乎每个名人都推出了自己的 NFT 收藏。虽然您的加密资产可能是应税的，例如在加拿大（https://www.canada.ca/en/revenue-agency/programs/about-canada-revenue-agency-cra/compliance/digital-currency/cryptocurrency-guide.html），但今天我们将探索一些有趣且无税的方法来生成自己的一系列过程生成的 CryptoPunks（https://www.larvalabs.com/cryptopunks）。

生成对抗网络（GANs），通常称为 GANs，是一类特定的深度学习模型，旨在通过学习输入数据集来创建（生成！）与原始训练集中的元素具有令人信服的相似性的新材料。众所周知，网站[thispersondoesnotexist.com](https://thispersondoesnotexist.com/)通过名为 StyleGAN2 的模型生成了栩栩如生但是合成的人物图像而迅速走红。GANs 在机器学习领域获得了人们的关注，现在被用于生成各种图像、文本甚至音乐！

今天我们将简要介绍 GAN 的高级直觉，然后我们将围绕一个预训练的 GAN 构建一个小型演示，看看这一切都是怎么回事。下面是我们将要组合的东西的一瞥：

<iframe src="https://nimaboscarino-cryptopunks.hf.space" frameBorder="0" height="855" title="Gradio app" class="container p-0 flex-grow space-iframe" allow="accelerometer; ambient-light-sensor; autoplay; battery; camera; document-domain; encrypted-media; fullscreen; geolocation; gyroscope; layout-animations; legacy-image-formats; magnetometer; microphone; midi; oversized-images; payment; picture-in-picture; publickey-credentials-get; sync-xhr; usb; vr ; wake-lock; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads"></iframe>

### 先决条件

确保已经[安装](/getting_started)了 `gradio` Python 包。要使用预训练模型，请还安装 `torch` 和 `torchvision`。

## GANs：简介

最初在[Goodfellow 等人 2014 年的论文](https://arxiv.org/abs/1406.2661)中提出，GANs 由互相竞争的神经网络组成，旨在相互智能地欺骗对方。一种网络，称为“生成器”，负责生成图像。另一个网络，称为“鉴别器”，从生成器一次接收一张图像，以及来自训练数据集的 **real 真实**图像。然后，鉴别器必须猜测：哪张图像是假的？

生成器不断训练以创建对鉴别器更难以识别的图像，而鉴别器每次正确检测到伪造图像时，都会为生成器设置更高的门槛。随着网络之间的这种竞争（**adversarial 对抗性！**），生成的图像改善到了对人眼来说无法区分的地步！

如果您想更深入地了解 GANs，可以参考[Analytics Vidhya 上的这篇优秀文章](https://www.analyticsvidhya.com/blog/2021/06/a-detailed-explanation-of-gan-with-implementation-using-tensorflow-and-keras/)或这个[PyTorch 教程](https://pytorch.org/tutorials/beginner/dcgan_faces_tutorial.html)。不过，现在我们将深入看一下演示！

## 步骤 1 - 创建生成器模型

要使用 GAN 生成新图像，只需要生成器模型。生成器可以使用许多不同的架构，但是对于这个演示，我们将使用一个预训练的 GAN 生成器模型，其架构如下：

```python
from torch import nn

class Generator(nn.Module):
    # 有关nc，nz和ngf的解释，请参见下面的链接
    # https://pytorch.org/tutorials/beginner/dcgan_faces_tutorial.html#inputs
    def __init__(self, nc=4, nz=100, ngf=64):
        super(Generator, self).__init__()
        self.network = nn.Sequential(
            nn.ConvTranspose2d(nz, ngf * 4, 3, 1, 0, bias=False),
            nn.BatchNorm2d(ngf * 4),
            nn.ReLU(True),
            nn.ConvTranspose2d(ngf * 4, ngf * 2, 3, 2, 1, bias=False),
            nn.BatchNorm2d(ngf * 2),
            nn.ReLU(True),
            nn.ConvTranspose2d(ngf * 2, ngf, 4, 2, 0, bias=False),
            nn.BatchNorm2d(ngf),
            nn.ReLU(True),
            nn.ConvTranspose2d(ngf, nc, 4, 2, 1, bias=False),
            nn.Tanh(),
        )

    def forward(self, input):
        output = self.network(input)
        return output
```

我们正在使用来自[此 repo 的 @teddykoker](https://github.com/teddykoker/cryptopunks-gan/blob/main/train.py#L90)的生成器模型，您还可以在那里看到原始的鉴别器模型结构。

在实例化模型之后，我们将加载来自 Hugging Face Hub 的权重，存储在[nateraw/cryptopunks-gan](https://huggingface.co/nateraw/cryptopunks-gan)中：

```python
from huggingface_hub import hf_hub_download
import torch

model = Generator()
weights_path = hf_hub_download('nateraw/cryptopunks-gan', 'generator.pth')
model.load_state_dict(torch.load(weights_path, map_location=torch.device('cpu'))) # 如果有可用的GPU，请使用'cuda'
```

## 步骤 2 - 定义“predict”函数

`predict` 函数是使 Gradio 工作的关键！我们通过 Gradio 界面选择的任何输入都将通过我们的 `predict` 函数传递，该函数应对输入进行操作并生成我们可以通过 Gradio 输出组件显示的输出。对于 GANs，常见的做法是将随机噪声传入我们的模型作为输入，因此我们将生成一张随机数的张量并将其传递给模型。然后，我们可以使用 `torchvision` 的 `save_image` 函数将模型的输出保存为 `png` 文件，并返回文件名：

```python
from torchvision.utils import save_image

def predict(seed):
    num_punks = 4
    torch.manual_seed(seed)
    z = torch.randn(num_punks, 100, 1, 1)
    punks = model(z)
    save_image(punks, "punks.png", normalize=True)
    return 'punks.png'
```

我们给 `predict` 函数一个 `seed` 参数，这样我们就可以使用一个种子固定随机张量生成。然后，我们可以通过传入相同的种子再次查看生成的 punks。

_注意！_ 我们的模型需要一个 100x1x1 的输入张量进行单次推理，或者 (BatchSize)x100x1x1 来生成一批图像。在这个演示中，我们每次生成 4 个 punk。

## 第三步—创建一个 Gradio 接口

此时，您甚至可以运行您拥有的代码 `predict(<SOME_NUMBER>)`，并在您的文件系统中找到新生成的 punk 在 `./punks.png`。然而，为了制作一个真正的交互演示，我们将用 Gradio 构建一个简单的界面。我们的目标是：

- 设置一个滑块输入，以便用户可以选择“seed”值
- 使用图像组件作为输出，展示生成的 punk
- 使用我们的 `predict()` 函数来接受种子并生成图像

通过使用 `gr.Interface()`，我们可以使用一个函数调用来定义所有这些 :

```python
import gradio as gr

gr.Interface(
    predict,
    inputs=[
        gr.Slider(0, 1000, label='Seed', default=42),
    ],
    outputs="image",
).launch()
```

启动界面后，您应该会看到像这样的东西 :

<iframe src="https://nimaboscarino-cryptopunks-1.hf.space" frameBorder="0" height="365" title="Gradio app" class="container p-0 flex-grow space-iframe" allow="accelerometer; ambient-light-sensor; autoplay; battery; camera; document-domain; encrypted-media; fullscreen; geolocation; gyroscope; layout-animations; legacy-image-formats; magnetometer; microphone; midi; oversized-images; payment; picture-in-picture; publickey-credentials-get; sync-xhr; usb; vr ; wake-lock; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads"></iframe>

## 第四步—更多 punk！

每次生成 4 个 punk 是一个好的开始，但是也许我们想控制每次想生成多少。通过简单地向我们传递给 `gr.Interface` 的 `inputs` 列表添加另一项即可向我们的 Gradio 界面添加更多输入 :

```python
gr.Interface(
    predict,
    inputs=[
        gr.Slider(0, 1000, label='Seed', default=42),
        gr.Slider(4, 64, label='Number of Punks', step=1, default=10), # 添加另一个滑块!
    ],
    outputs="image",
).launch()
```

新的输入将传递给我们的 `predict()` 函数，所以我们必须对该函数进行一些更改，以接受一个新的参数 :

```python
def predict(seed, num_punks):
    torch.manual_seed(seed)
    z = torch.randn(num_punks, 100, 1, 1)
    punks = model(z)
    save_image(punks, "punks.png", normalize=True)
    return 'punks.png'
```

当您重新启动界面时，您应该会看到一个第二个滑块，它可以让您控制 punk 的数量！

## 第五步-完善它

您的 Gradio 应用已经准备好运行了，但是您可以添加一些额外的功能来使其真正准备好发光 ✨

我们可以添加一些用户可以轻松尝试的示例，通过将其添加到 `gr.Interface` 中实现 :

```python
gr.Interface(
    # ...
    # 将所有内容保持不变，然后添加
    examples=[[123, 15], [42, 29], [456, 8], [1337, 35]],
).launch(cache_examples=True) # cache_examples是可选的
```

`examples` 参数接受一个列表的列表，其中子列表中的每个项目的顺序与我们列出的 `inputs` 的顺序相同。所以在我们的例子中，`[seed, num_punks]`。试一试吧！

您还可以尝试在 `gr.Interface` 中添加 `title`、`description` 和 `article`。每个参数都接受一个字符串，所以试试看发生了什么👀 `article` 也接受 HTML，如[前面的指南](./key_features/#descriptive-content)所述！

当您完成所有操作后，您可能会得到类似于这样的结果 :

<iframe src="https://nimaboscarino-cryptopunks.hf.space" frameBorder="0" height="855" title="Gradio app" class="container p-0 flex-grow space-iframe" allow="accelerometer; ambient-light-sensor; autoplay; battery; camera; document-domain; encrypted-media; fullscreen; geolocation; gyroscope; layout-animations; legacy-image-formats; magnetometer; microphone; midi; oversized-images; payment; picture-in-picture; publickey-credentials-get; sync-xhr; usb; vr ; wake-lock; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads"></iframe>

供参考，这是我们的完整代码 :

```python
import torch
from torch import nn
from huggingface_hub import hf_hub_download
from torchvision.utils import save_image
import gradio as gr

class Generator(nn.Module):
    # 关于nc、nz和ngf的解释，请参见下面的链接
    # https://pytorch.org/tutorials/beginner/dcgan_faces_tutorial.html#inputs
    def __init__(self, nc=4, nz=100, ngf=64):
        super(Generator, self).__init__()
        self.network = nn.Sequential(
            nn.ConvTranspose2d(nz, ngf * 4, 3, 1, 0, bias=False),
            nn.BatchNorm2d(ngf * 4),
            nn.ReLU(True),
            nn.ConvTranspose2d(ngf * 4, ngf * 2, 3, 2, 1, bias=False),
            nn.BatchNorm2d(ngf * 2),
            nn.ReLU(True),
            nn.ConvTranspose2d(ngf * 2, ngf, 4, 2, 0, bias=False),
            nn.BatchNorm2d(ngf),
            nn.ReLU(True),
            nn.ConvTranspose2d(ngf, nc, 4, 2, 1, bias=False),
            nn.Tanh(),
        )

    def forward(self, input):
        output = self.network(input)
        return output

model = Generator()
weights_path = hf_hub_download('nateraw/cryptopunks-gan', 'generator.pth')
model.load_state_dict(torch.load(weights_path, map_location=torch.device('cpu'))) # 如果您有可用的GPU，使用'cuda'

def predict(seed, num_punks):
    torch.manual_seed(seed)
    z = torch.randn(num_punks, 100, 1, 1)
    punks = model(z)
    save_image(punks, "punks.png", normalize=True)
    return 'punks.png'

gr.Interface(
    predict,
    inputs=[
        gr.Slider(0, 1000, label='Seed', default=42),
        gr.Slider(4, 64, label='Number of Punks', step=1, default=10),
    ],
    outputs="image",
    examples=[[123, 15], [42, 29], [456, 8], [1337, 35]],
).launch(cache_examples=True)
```

---

恭喜！你已经成功构建了自己的基于 GAN 的 CryptoPunks 生成器，配备了一个时尚的 Gradio 界面，使任何人都能轻松使用。现在你可以在 Hub 上[寻找更多的 GANs](https://huggingface.co/models?other=gan)（或者自己训练）并继续制作更多令人赞叹的演示项目。🤗

---

<!-- Source: guides/cn/07_other-tutorials/creating-a-chatbot.md -->
# 如何创建一个聊天机器人

Tags: NLP, TEXT, CHAT
Related spaces: https://huggingface.co/spaces/gradio/chatbot_streaming, https://huggingface.co/spaces/project-baize/Baize-7B,

## 简介

聊天机器人在自然语言处理 (NLP) 研究和工业界被广泛使用。由于聊天机器人是直接由客户和最终用户使用的，因此验证聊天机器人在面对各种输入提示时的行为是否符合预期至关重要。

通过使用 `gradio`，您可以轻松构建聊天机器人模型的演示，并与用户共享，或使用直观的聊天机器人图形界面自己尝试。

本教程将展示如何使用 Gradio 制作几种不同类型的聊天机器人用户界面：首先是一个简单的文本显示界面，其次是一个用于流式文本响应的界面，最后一个是可以处理媒体文件的聊天机器人。我们创建的聊天机器人界面将如下所示：

$ 演示 _ 聊天机器人 _ 流式

**先决条件**：我们将使用 `gradio.Blocks` 类来构建我们的聊天机器人演示。
如果您对此还不熟悉，可以[先阅读 Blocks 指南](https://gradio.app/blocks-and-event-listeners)。同时，请确保您使用的是**最新版本**的 Gradio：`pip install --upgrade gradio`。

## 简单聊天机器人演示

让我们从重新创建上面的简单演示开始。正如您可能已经注意到的，我们的机器人只是随机对任何输入回复 " 你好吗？"、" 我爱你 " 或 " 我非常饿 "。这是使用 Gradio 创建此演示的代码：

$ 代码 \_ 简单聊天机器人

这里有三个 Gradio 组件：

- 一个 `Chatbot`，其值将整个对话的历史记录作为用户和机器人之间的响应对列表存储。
- 一个文本框，用户可以在其中键入他们的消息，然后按下 Enter/ 提交以触发聊天机器人的响应
- 一个 `ClearButton` 按钮，用于清除文本框和整个聊天机器人的历史记录

我们有一个名为 `respond()` 的函数，它接收聊天机器人的整个历史记录，附加一个随机消息，等待 1 秒，然后返回更新后的聊天历史记录。`respond()` 函数在返回时还清除了文本框。

当然，实际上，您会用自己更复杂的函数替换 `respond()`，该函数可能调用预训练模型或 API 来生成响应。

$ 演示 \_ 简单聊天机器人

## 为聊天机器人添加流式响应

我们可以通过几种方式来改进上述聊天机器人的用户体验。首先，我们可以流式传输响应，以便用户不必等待太长时间才能生成消息。其次，我们可以让用户的消息在聊天历史记录中立即出现，同时聊天机器人的响应正在生成。以下是实现这一点的代码：

$code_chatbot_streaming

当用户提交他们的消息时，您会注意到我们现在使用 `.then()` 与三个事件事件 _链_ 起来：

1. 第一个方法 `user()` 用用户消息更新聊天机器人并清除输入字段。此方法还使输入字段处于非交互状态，以防聊天机器人正在响应时用户发送另一条消息。由于我们希望此操作立即发生，因此我们设置 `queue=False`，以跳过任何可能的队列。聊天机器人的历史记录附加了`(user_message, None)`，其中的 `None` 表示机器人未作出响应。

2. 第二个方法 `bot()` 使用机器人的响应更新聊天机器人的历史记录。我们不是创建新消息，而是将先前创建的 `None` 消息替换为机器人的响应。最后，我们逐个字符构造消息并 `yield` 正在构建的中间输出。Gradio 会自动将带有 `yield` 关键字的任何函数 [转换为流式输出接口](/key-features/#iterative-outputs)。

3. 第三个方法使输入字段再次可以交互，以便用户可以向机器人发送另一条消息。

当然，实际上，您会用自己更复杂的函数替换 `bot()`，该函数可能调用预训练模型或 API 来生成响应。

最后，我们通过运行 `demo.queue()` 启用排队，这对于流式中间输出是必需的。您可以通过滚动到本页面顶部的演示来尝试改进后的聊天机器人。

## 添加 Markdown、图片、音频或视频

`gr.Chatbot` 组件支持包含加粗、斜体和代码等一部分 Markdown 功能。例如，我们可以编写一个函数，以粗体回复用户的消息，类似于 **That's cool!**，如下所示：

```py
def bot(history):
    response = "**That's cool!**"
    history[-1][1] = response
    return history
```

此外，它还可以处理图片、音频和视频等媒体文件。要传递媒体文件，我们必须将文件作为两个字符串的元组传递，如`(filepath, alt_text)` 所示。`alt_text` 是可选的，因此您还可以只传入只有一个元素的元组`(filepath,)`，如下所示：

```python
def add_file(history, file):
    history = history + [((file.name,), None)]
    return history
```

将所有这些放在一起，我们可以创建一个*多模态*聊天机器人，其中包含一个文本框供用户提交文本，以及一个文件上传按钮供提交图像 / 音频 / 视频文件。余下的代码看起来与之前的代码几乎相同：

$code_chatbot_multimodal
$demo_chatbot_multimodal

你完成了！这就是构建聊天机器人模型界面所需的所有代码。最后，我们将结束我们的指南，并提供一些在 Spaces 上运行的聊天机器人的链接，以让你了解其他可能性：

- [project-baize/Baize-7B](https://huggingface.co/spaces/project-baize/Baize-7B)：一个带有停止生成和重新生成响应功能的样式化聊天机器人。
- [MAGAer13/mPLUG-Owl](https://huggingface.co/spaces/MAGAer13/mPLUG-Owl)：一个多模态聊天机器人，允许您对响应进行投票。

---

<!-- Source: guides/cn/07_other-tutorials/creating-a-new-component.md -->
# 如何创建一个新组件

## 简介

本指南旨在说明如何添加一个新组件，你可以在 Gradio 应用程序中使用该组件。该指南将通过代码片段逐步展示如何添加[ColorPicker](https://gradio.app/docs/colorpicker)组件。

## 先决条件

确保您已经按照[CONTRIBUTING.md](https://github.com/gradio-app/gradio/blob/main/CONTRIBUTING.md)指南设置了本地开发环境（包括客户端和服务器端）。

以下是在 Gradio 上创建新组件的步骤：

1. [创建一个新的 Python 类并导入它](#1-create-a-new-python-class-and-import-it)
2. [创建一个新的 Svelte 组件](#2-create-a-new-svelte-component)
3. [创建一个新的演示](#3-create-a-new-demo)

## 1. 创建一个新的 Python 类并导入它

首先要做的是在[components.py](https://github.com/gradio-app/gradio/blob/main/gradio/components.py)文件中创建一个新的类。这个 Python 类应该继承自一系列的基本组件，并且应该根据要添加的组件的类型（例如输入、输出或静态组件）将其放置在文件中的正确部分。
一般来说，建议参考现有的组件（例如[TextBox](https://github.com/gradio-app/gradio/blob/main/gradio/components.py#L290)），将其代码复制为骨架，然后根据实际情况进行修改。

让我们来看一下添加到[components.py](https://github.com/gradio-app/gradio/blob/main/gradio/components.py)文件中的 ColorPicker 组件的类：

```python
@document()
class ColorPicker(Changeable, Submittable, IOComponent):
    """
    创建一个颜色选择器，用户可以选择颜色作为字符串输入。
    预处理：将选择的颜色值作为{str}传递给函数。
    后处理：期望从函数中返回一个{str}，并将颜色选择器的值设置为它。
    示例格式：表示颜色的十六进制{str}，例如红色的"#ff0000"。
    演示：color_picker，color_generator
    """

    def __init__(
        self,
        value: str = None,
        *,
        label: Optional[str] = None,
        show_label: bool = True,
        interactive: Optional[bool] = None,
        visible: bool = True,
        elem_id: Optional[str] = None,
        **kwargs,
    ):
        """
        Parameters:
        """
        Parameters:
            value: default text to provide in color picker.
            label: component name in interface.
            show_label: if True, will display label.
            interactive: if True, will be rendered as an editable color picker; if False, editing will be disabled. If not provided, this is inferred based on whether the component is used as an input or output.
            visible: If False, component will be hidden.
            elem_id: An optional string that is assigned as the id of this component in the HTML DOM. Can be used for targeting CSS styles.
        """
        self.value = self.postprocess(value)
        self.cleared_value = "#000000"
        self.test_input = value
        IOComponent.__init__(
            self,
            label=label,
            show_label=show_label,
            interactive=interactive,
            visible=visible,
            elem_id=elem_id,
            **kwargs,
        )

    def get_config(self):
        return {
            "value": self.value,
            **IOComponent.get_config(self),
        }

    @staticmethod
    def update(
        value: Optional[Any] = None,
        label: Optional[str] = None,
        show_label: Optional[bool] = None,
        visible: Optional[bool] = None,
        interactive: Optional[bool] = None,
    ):
        return {
            "value": value,
            "label": label,
            "show_label": show_label,
            "visible": visible,
            "interactive": interactive,
            "__type__": "update",
        }

    # 输入功能
    def preprocess(self, x: str | None) -> Any:
        """
        Any preprocessing needed to be performed on function input.
        Parameters:
        x (str): text
        Returns:
        (str): text
        """
        if x is None:
            return None
        else:
            return str(x)

    def preprocess_example(self, x: str | None) -> Any:
        """
        在传递给主函数之前，对示例进行任何预处理。
        """
        if x is None:
            return None
        else:
            return str(x)

    # 输出功能
    def postprocess(self, y: str | None):
        """
        Any postprocessing needed to be performed on function output.
        Parameters:
        y (str | None): text
        Returns:
        (str | None): text
        """
        if y is None:
            return None
        else:
            return str(y)

    def deserialize(self, x):
        """
        将从调用接口的序列化输出（例如base64表示）转换为输出的人类可读版本（图像的路径等）
        """
        return x
```

一旦定义完，就需要在[\_\_init\_\_](https://github.com/gradio-app/gradio/blob/main/gradio/__init__.py)模块类中导入新类，以使其可见。

```python

from gradio.components import (
    ...
    ColorPicker,
    ...
)

```

### 1.1 为 Python 类编写单元测试

在开发新组件时，还应为其编写一套单元测试。这些测试应该放在[gradio/test/test_components.py](https://github.com/gradio-app/gradio/blob/main/test/test_components.py)文件中。同样，如上所述，参考其他组件的测试（例如[Textbox](https://github.com/gradio-app/gradio/blob/main/test/test_components.py)）并添加尽可能多的单元测试，以测试新组件的所有不同方面和功能。例如，为 ColorPicker 组件添加了以下测试：

```python
class TestColorPicker(unittest.TestCase):
    def test_component_functions(self):
        """
        Preprocess, postprocess, serialize, save_flagged, restore_flagged, tokenize, get_config
        """
        color_picker_input = gr.ColorPicker()
        self.assertEqual(color_picker_input.preprocess("#000000"), "#000000")
        self.assertEqual(color_picker_input.preprocess_example("#000000"), "#000000")
        self.assertEqual(color_picker_input.postprocess(None), None)
        self.assertEqual(color_picker_input.postprocess("#FFFFFF"), "#FFFFFF")
        self.assertEqual(color_picker_input.serialize("#000000", True), "#000000")

        color_picker_input.interpretation_replacement = "unknown"

        self.assertEqual(
            color_picker_input.get_config(),
            {
                "value": None,
                "show_label": True,
                "label": None,
                "style": {},
                "elem_id": None,
                "visible": True,
                "interactive": None,
                "name": "colorpicker",
            },
        )

    def test_in_interface_as_input(self):
        """
        接口、处理、解释
        """
        iface = gr.Interface(lambda x: x, "colorpicker", "colorpicker")
        self.assertEqual(iface.process(["#000000"]), ["#000000"])

    def test_in_interface_as_output(self):
        """
        接口、处理

        """
        iface = gr.Interface(lambda x: x, "colorpicker", gr.ColorPicker())
        self.assertEqual(iface.process(["#000000"]), ["#000000"])

    def test_static(self):
        """
        后处理
        """
        component = gr.ColorPicker("#000000")
        self.assertEqual(component.get_config().get("value"), "#000000")
```

## 2. 创建一个新的 Svelte 组件

让我们来看看创建新组件的前端并将其与其 Python 代码映射起来的步骤：

- 在 [js 文件夹](https://github.com/gradio-app/gradio/tree/main/js/) 中创建一个新的 UI-side Svelte 组件，并确定要放置在什么地方。选项包括：创建新组件的包（如果与现有组件完全不同），或将新组件添加到现有包中，例如 [form 包](https://github.com/gradio-app/gradio/tree/main/js/form)。例如，ColorPicker 组件被包含在 form 包中，因为它与已存在的组件相似。
- 在您将 Svelte 组件放置的包的 src 文件夹中创建一个带有适当名称的文件，注意：名称必须以大写字母开头。这是“核心”组件，是没有 Gradio 特定功能了解的通用组件。最初，将任何文本 /HTML 添加到此文件，以便组件呈现任何内容。ColorPicker 的 Svelte 应用程序代码如下所示：

```typescript
<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { get_styles } from "@gradio/utils";
	import { BlockTitle } from "@gradio/atoms";
	import type { Styles } from "@gradio/utils";

	export let value: string = "#000000";
	export let style: Styles = {};
	export let label: string;
	export let disabled = false;
	export let show_label: boolean = true;

	$: value;
	$: handle_change(value);

	const dispatch = createEventDispatcher<{
		change: string;
		submit: undefined;
	}>();

	function handle_change(val: string) {
		dispatch("change", val);
	}

	$: ({ styles } = get_styles(style, ["rounded", "border"]));
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="block">
	<BlockTitle {show_label}>{label}</BlockTitle>
	<input
		type="color"
		class="gr-box-unrounded {classes}"
		bind:value
		{disabled}
	/>
</label>
```

- 通过执行 `export { default as FileName } from "./FileName.svelte"`，在您将 Svelte 组件放置的包的 index.ts 文件中导出此文件。例如，在 [index.ts](https://github.com/gradio-app/gradio/blob/main/js/form/src/index.ts) 文件中导出了 ColorPicker 文件，并通过 `export { default as ColorPicker } from "./ColorPicker.svelte";` 执行导出。
- 创建 [js/app/src/components](https://github.com/gradio-app/gradio/tree/main/js/app/src/components) 中的 Gradio 特定组件。这是一个 Gradio 包装器，处理库的特定逻辑，将必要的数据传递给核心组件，并附加任何必要的事件监听器。复制另一个组件的文件夹，重新命名并编辑其中的代码，保持结构不变。

在这里，您将拥有三个文件，第一个文件用于 Svelte 应用程序，具体如下所示：

```typescript
<svelte:options accessors={true} />

<script lang="ts">
	import { ColorPicker } from "@gradio/form";
	import { Block } from "@gradio/atoms";
	import StatusTracker from "../StatusTracker/StatusTracker.svelte";
	import type { LoadingStatus } from "../StatusTracker/types";
	import type { Styles } from "@gradio/utils";

	export let label: string = "ColorPicker";
	export let elem_id: string = "";
	export let visible: boolean = true;
	export let value: string;
	export let form_position: "first" | "last" | "mid" | "single" = "single";
	export let show_label: boolean;

	export let style: Styles = {};

	export let loading_status: LoadingStatus;

	export let interactive: boolean;
</script>

<Block
	{visible}
	{form_position}
	{elem_id}
	disable={typeof style.container === "boolean" && !style.container}
>
	<StatusTracker {...loading_status} />

	<ColorPicker
		{style}
		bind:value
		{label}
		{show_label}
		on:change
		on:submit
		disabled={!interactive}
	/>
</Block>
```

第二个文件包含了前端的测试，例如 ColorPicker 组件的测试：

```typescript
import { test, describe, assert, afterEach } from "vitest";
import { cleanup, render } from "@self/tootils";

import ColorPicker from "./ColorPicker.svelte";
import type { LoadingStatus } from "../StatusTracker/types";

const loading_status = {
	eta: 0,
	queue_position: 1,
	status: "complete" as LoadingStatus["status"],
	scroll_to_output: false,
	visible: true,
	fn_index: 0
};

describe("ColorPicker", () => {
	afterEach(() => cleanup());

	test("renders provided value", () => {
		const { getByDisplayValue } = render(ColorPicker, {
			loading_status,
			show_label: true,
			interactive: true,
			value: "#000000",
			label: "ColorPicker"
		});

		const item: HTMLInputElement = getByDisplayValue("#000000");
		assert.equal(item.value, "#000000");
	});

	test("changing the color should update the value", async () => {
		const { component, getByDisplayValue } = render(ColorPicker, {
			loading_status,
			show_label: true,
			interactive: true,
			value: "#000000",
			label: "ColorPicker"
		});

		const item: HTMLInputElement = getByDisplayValue("#000000");

		assert.equal(item.value, "#000000");

		await component.$set({
			value: "#FFFFFF"
		});

		assert.equal(component.value, "#FFFFFF");
	});
});
```

The third one is the index.ts file:

```typescript
export { default as Component } from "./ColorPicker.svelte";
export const modes = ["static", "dynamic"];
```

- `directory.ts` 文件中添加组件的映射。复制并粘贴任何组件的映射行，并编辑其文本。键名必须是 Python 库中实际组件名称的小写版本。例如，对于 ColorPicker 组件，映射如下所示：

```typescript
export const component_map = {
...
colorpicker: () => import("./ColorPicker"),
...
}
```

### 2.1 为 Svelte 组件编写单元测试

在开发新组件时，您还应该为其编写一套单元测试。测试应该放置在新组件的文件夹中，文件名为 MyAwesomeComponent.test.ts。同样，像上面那样参考其他组件的测试（例如[Textbox.test.ts](https://github.com/gradio-app/gradio/blob/main/js/app/src/components/Textbox/Textbox.test.ts)），并添加尽可能多的单元测试，以测试新组件的不同方面和功能。

### 3. 创建新的演示

最后一步是在[gradio/demo 文件夹](https://github.com/gradio-app/gradio/tree/main/demo)中创建一个使用新添加的组件的演示。同样，建议参考现有演示。在一个名为 run.py 的文件中编写演示的代码，添加必要的要求和显示应用程序界面的图像。最后添加一个显示其用法的 gif。
您可以查看为 ColorPicker 创建的[demo](https://github.com/gradio-app/gradio/tree/main/demo/color_picker)，其中以新组件选择的图标和颜色作为输入，并以选择的颜色着色的相同图标作为输出。

要测试应用程序：

- 在终端上运行 `python path/demo/run.py`，它会在地址 [http://localhost:7860](http://localhost:7860) 启动后端；
- 在另一个终端上，运行 `pnpm dev` 以在 [http://localhost:9876](http://localhost:9876) 上启动具有热重新加载功能的前端。

## 结论

在本指南中，我们展示了将新组件添加到 Gradio 是多么简单，逐步介绍了如何添加 ColorPicker 组件。要了解更多细节，可以参考 PR：[#1695](https://github.com/gradio-app/gradio/pull/1695).

---

<!-- Source: guides/cn/07_other-tutorials/developing-faster-with-reload-mode.md -->
# 通过自动重载实现更快的开发

**先决条件**：本指南要求您了解块的知识。请确保[先阅读块指南](https://gradio.app/blocks-and-event-listeners)。

本指南介绍了自动重新加载、在 Python IDE 中重新加载以及在 Jupyter Notebooks 中使用 gradio 的方法。

## 为什么要使用自动重载？

当您构建 Gradio 演示时，特别是使用 Blocks 构建时，您可能会发现反复运行代码以测试更改很麻烦。

为了更快速、更便捷地编写代码，我们已经简化了在 **Python IDE**（如 VS Code、Sublime Text、PyCharm 等）中开发或从终端运行 Python 代码时“重新加载”Gradio 应用的方式。我们还开发了一个类似的“魔法命令”，使您可以更快速地重新运行单元格，如果您使用 Jupyter Notebooks（或类似的环境，如 Colab）的话。

这个简短的指南将涵盖这两种方法，所以无论您如何编写 Python 代码，您都将知道如何更快地构建 Gradio 应用程序。

## Python IDE 重载 🔥

如果您使用 Python IDE 构建 Gradio Blocks，那么代码文件（假设命名为 `run.py`）可能如下所示：

```python
import gradio as gr

with gr.Blocks() as demo:
    gr.Markdown("# 来自Gradio的问候！")
    inp = gr.Textbox(placeholder="您叫什么名字？")
    out = gr.Textbox()

    inp.change(fn=lambda x: f"欢迎，{x}！",
               inputs=inp,
               outputs=out)

if __name__ == "__main__":
    demo.launch()
```

问题在于，每当您想要更改布局、事件或组件时，都必须通过编写 `python run.py` 来关闭和重新运行应用程序。

而不是这样做，您可以通过更改 1 个单词来以**重新加载模式**运行代码：将 `python` 更改为 `gradio`：

在终端中运行 `gradio run.py`。就是这样！

现在，您将看到类似于这样的内容：

```bash
Launching in *reload mode* on: http://127.0.0.1:7860 (Press CTRL+C to quit)

Watching...

WARNING:  The --reload flag should not be used in production on Windows.
```

这里最重要的一行是 `正在观察 ...`。这里发生的情况是 Gradio 将观察 `run.py` 文件所在的目录，如果文件发生更改，它将自动为您重新运行文件。因此，您只需专注于编写代码，Gradio 演示将自动刷新 🥳

⚠️ 警告：`gradio` 命令不会检测传递给 `launch()` 方法的参数，因为在重新加载模式下从未调用 `launch()` 方法。例如，设置 `launch()` 中的 `auth` 或 `show_error` 不会在应用程序中反映出来。

当您使用重新加载模式时，请记住一件重要的事情：Gradio 专门查找名为 `demo` 的 Gradio Blocks/Interface 演示。如果您将演示命名为其他名称，您需要在代码中的第二个参数中传入演示的 FastAPI 应用程序的名称。对于 Gradio 演示，可以使用 `.app` 属性访问 FastAPI 应用程序。因此，如果您的 `run.py` 文件如下所示：

```python
import gradio as gr

with gr.Blocks() as my_demo:
    gr.Markdown("# 来自Gradio的问候！")
    inp = gr.Textbox(placeholder="您叫什么名字？")
    out = gr.Textbox()

    inp.change(fn=lambda x: f"欢迎，{x}！",
               inputs=inp,
               outputs=out)

if __name__ == "__main__":
    my_demo.launch()
```

那么您可以这样启动它：`gradio run.py my_demo.app`。

Gradio默认使用UTF-8编码格式。对于**重新加载模式**，如果你的脚本使用的是除UTF-8以外的编码（如GBK）：

1. 在Python脚本的编码声明处指定你想要的编码格式，如：`# -*- coding: gbk -*-`
2. 确保你的代码编辑器识别到该格式。 
3. 执行：`gradio run.py --encoding gbk`

🔥 如果您的应用程序接受命令行参数，您也可以传递它们。下面是一个例子：

```python
import gradio as gr
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("--name", type=str, default="User")
args, unknown = parser.parse_known_args()

with gr.Blocks() as demo:
    gr.Markdown(f"# 欢迎 {args.name}！")
    inp = gr.Textbox()
    out = gr.Textbox()

    inp.change(fn=lambda x: x, inputs=inp, outputs=out)

if __name__ == "__main__":
    demo.launch()
```

您可以像这样运行它：`gradio run.py --name Gretel`

作为一个小提示，只要更改了 `run.py` 源代码或 Gradio 源代码，自动重新加载就会发生。这意味着如果您决定[为 Gradio 做贡献](https://github.com/gradio-app/gradio/blob/main/CONTRIBUTING.md)，这将非常有用 ✅

## Jupyter Notebook 魔法命令🔮

如果您使用 Jupyter Notebooks（或 Colab Notebooks 等）进行开发，我们也为您提供了一个解决方案！

我们开发了一个 **magic command 魔法命令**，可以为您创建和运行一个 Blocks 演示。要使用此功能，在笔记本顶部加载 gradio 扩展：

`%load_ext gradio`

然后，在您正在开发 Gradio 演示的单元格中，只需在顶部写入魔法命令**`%%blocks`**，然后像平常一样编写布局和组件：

```py
%%blocks

import gradio as gr

gr.Markdown("# 来自Gradio的问候！")
inp = gr.Textbox(placeholder="您叫什么名字？")
out = gr.Textbox()

inp.change(fn=lambda x: f"欢迎，{x}！",
           inputs=inp,
           outputs=out)
```

请注意：

- 您不需要放置样板代码 `with gr.Blocks() as demo:` 和 `demo.launch()` — Gradio 会自动为您完成！

- 每次重新运行单元格时，Gradio 都将在相同的端口上重新启动您的应用程序，并使用相同的底层网络服务器。这意味着您将比正常重新运行单元格更快地看到变化。

下面是在 Jupyter Notebook 中的示例：

![](https://i.ibb.co/nrszFws/Blocks.gif)

🪄这在 colab 笔记本中也适用！[这是一个 colab 笔记本](https://colab.research.google.com/drive/1jUlX1w7JqckRHVE-nbDyMPyZ7fYD8488?authuser=1#scrollTo=zxHYjbCTTz_5)，您可以在其中看到 Blocks 魔法效果。尝试进行一些更改并重新运行带有 Gradio 代码的单元格！

Notebook Magic 现在是作者构建 Gradio 演示的首选方式。无论您如何编写 Python 代码，我们都希望这两种方法都能为您提供更好的 Gradio 开发体验。

---

## 下一步

既然您已经了解了如何使用 Gradio 快速开发，请开始构建自己的应用程序吧！

如果你正在寻找灵感，请尝试浏览其他人用 Gradio 构建的演示，[浏览 Hugging Face Spaces](http://hf.space/) 🤗

---

<!-- Source: guides/cn/07_other-tutorials/how-to-use-3D-model-component.md -->
# 如何使用 3D 模型组件

相关空间：https://huggingface.co/spaces/dawood/Model3D, https://huggingface.co/spaces/radames/PIFu-Clothed-Human-Digitization, https://huggingface.co/spaces/radames/dpt-depth-estimation-3d-obj
标签：VISION, IMAGE

## 介绍

机器学习中的 3D 模型越来越受欢迎，并且是一些最有趣的演示实验。使用 `gradio`，您可以轻松构建您的 3D 图像模型的演示，并与任何人分享。Gradio 3D 模型组件接受 3 种文件类型，包括：_.obj_，_.glb_ 和 _.gltf_。

本指南将向您展示如何使用几行代码构建您的 3D 图像模型的演示；像下面这个示例一样。点击、拖拽和缩放来玩转 3D 对象：

<gradio-app space="dawood/Model3D"> </gradio-app>

### 先决条件

确保已经[安装](https://gradio.app/quickstart)了 `gradio` Python 包。

## 查看代码

让我们来看看如何创建上面的最简界面。在这种情况下，预测函数将只返回原始的 3D 模型网格，但您可以更改此函数以在您的机器学习模型上运行推理。我们将在下面看更复杂的示例。

```python
import gradio as gr

def load_mesh(mesh_file_name):
    return mesh_file_name

demo = gr.Interface(
    fn=load_mesh,
    inputs=gr.Model3D(),
    outputs=gr.Model3D(clear_color=[0.0, 0.0, 0.0, 0.0],  label="3D Model"),
    examples=[
        ["files/Bunny.obj"],
        ["files/Duck.glb"],
        ["files/Fox.gltf"],
        ["files/face.obj"],
    ],
    cache_examples=True,
)

demo.launch()
```

让我们来解析上面的代码：

`load_mesh`：这是我们的“预测”函数，为简单起见，该函数将接收 3D 模型网格并返回它。

创建界面：

- `fn`：当用户点击提交时使用的预测函数。在我们的例子中，它是 `load_mesh` 函数。
- `inputs`：创建一个 model3D 输入组件。输入是一个上传的文件，作为{str}文件路径。
- `outputs`：创建一个 model3D 输出组件。输出组件也期望一个文件作为{str}文件路径。
  - `clear_color`：这是 3D 模型画布的背景颜色。期望 RGBa 值。
  - `label`：出现在组件左上角的标签。
- `examples`：3D 模型文件的列表。3D 模型组件可以接受*.obj*，*.glb*和*.gltf*文件类型。
- `cache_examples`：保存示例的预测输出，以节省推理时间。

## 探索更复杂的 Model3D 演示

下面是一个使用 DPT 模型预测图像深度，然后使用 3D 点云创建 3D 对象的演示。查看[code.py](https://huggingface.co/spaces/radames/dpt-depth-estimation-3d-obj/blob/main/app.py)文件，了解代码和模型预测函数。
<gradio-app space="radames/dpt-depth-estimation-3d-obj"> </gradio-app>

下面是一个使用 PIFu 模型将穿着衣物的人的图像转换为 3D 数字化模型的演示。查看[spaces.py](https://huggingface.co/spaces/radames/PIFu-Clothed-Human-Digitization/blob/main/PIFu/spaces.py)文件，了解代码和模型预测函数。

<gradio-app space="radames/PIFu-Clothed-Human-Digitization"> </gradio-app>

---

搞定！这就是构建 Model3D 模型界面所需的所有代码。以下是一些您可能会发现有用的参考资料：

- Gradio 的[“入门指南”](https://gradio.app/getting_started/)
- 第一个[3D 模型演示](https://huggingface.co/spaces/dawood/Model3D)和[完整代码](https://huggingface.co/spaces/dawood/Model3D/tree/main)（在 Hugging Face Spaces 上）

---

<!-- Source: guides/cn/07_other-tutorials/named-entity-recognition.md -->
# 命名实体识别 （Named-Entity Recognition）

相关空间：https://huggingface.co/spaces/rajistics/biobert_ner_demo，https://huggingface.co/spaces/abidlabs/ner，https://huggingface.co/spaces/rajistics/Financial_Analyst_AI
标签：NER，TEXT，HIGHLIGHT

## 简介

命名实体识别（NER）又称为标记分类或文本标记，它的任务是对一个句子进行分类，将每个单词（或 "token"）归为不同的类别，比如人名、地名或词性等。

例如，给定以下句子：

> 芝加哥有巴基斯坦餐厅吗？

命名实体识别算法可以识别出：

- "Chicago" as a **location**
- "Pakistani" as an **ethnicity**

等等。

使用 `gradio`（特别是 `HighlightedText` 组件），您可以轻松构建一个 NER 模型的 Web 演示并与团队分享。

这是您将能够构建的一个演示的示例：

$demo_ner_pipeline

本教程将展示如何使用预训练的 NER 模型并使用 Gradio 界面部署该模型。我们将展示两种不同的使用 `HighlightedText` 组件的方法--根据您的 NER 模型，可以选择其中任何一种更容易学习的方式！

### 环境要求

确保您已经[安装](/getting_started)了 `gradio` Python 包。您还需要一个预训练的命名实体识别模型。在本教程中，我们将使用 `transformers` 库中的一个模型。

### 方法一：实体字典列表

许多命名实体识别模型输出的是一个字典列表。每个字典包含一个*实体*，一个 " 起始 " 索引和一个 " 结束 " 索引。这就是 `transformers` 库中的 NER 模型的操作方式。

```py
from transformers import pipeline
ner_pipeline = pipeline("ner")
ner_pipeline("芝加哥有巴基斯坦餐厅吗？")
```

输出结果：

```bash
[{'entity': 'I-LOC',
  'score': 0.9988978,
  'index': 2,
  'word': 'Chicago',
  'start': 5,
  'end': 12},
 {'entity': 'I-MISC',
  'score': 0.9958592,
  'index': 5,
  'word': 'Pakistani',
  'start': 22,
  'end': 31}]
```

如果您有这样的模型，将其连接到 Gradio 的 `HighlightedText` 组件非常简单。您只需要将这个**实体列表**与**原始文本**以字典的形式传递给模型，其中键分别为 `"entities"` 和 `"text"`。

下面是一个完整的示例：

$code_ner_pipeline
$demo_ner_pipeline

### 方法二：元组列表

将数据传递给 `HighlightedText` 组件的另一种方法是使用元组列表。每个元组的第一个元素应该是被归类为特定实体的单词或词组。第二个元素应该是实体标签（如果不需要标签，则为 `None`）。`HighlightedText` 组件会自动组合单词和标签来显示实体。

在某些情况下，这比第一种方法更简单。下面是一个使用 Spacy 的词性标注器演示此方法的示例：

$code_text_analysis
$demo_text_analysis

---

到此为止！您已经了解了为您的 NER 模型构建基于 Web 的图形用户界面所需的全部内容。

有趣的提示：只需在 `launch()` 中设置 `share=True`，即可立即与其他人分享您的 NER 演示。

---

<!-- Source: guides/cn/07_other-tutorials/real-time-speech-recognition.md -->
# 实时语音识别

Related spaces: https://huggingface.co/spaces/abidlabs/streaming-asr-paused, https://huggingface.co/spaces/abidlabs/full-context-asr
Tags: ASR, SPEECH, STREAMING

## 介绍

自动语音识别（ASR）是机器学习中非常重要且蓬勃发展的领域，它将口语转换为文本。ASR 算法几乎在每部智能手机上都有运行，并越来越多地嵌入到专业工作流程中，例如护士和医生的数字助手。由于 ASR 算法是直接面向客户和最终用户设计的，因此在面对各种语音模式（不同的口音、音调和背景音频条件）时，验证它们的行为是否符合预期非常重要。

使用 `gradio`，您可以轻松构建一个 ASR 模型的演示，并与测试团队共享，或通过设备上的麦克风进行自行测试。

本教程将展示如何使用预训练的语音识别模型并在 Gradio 界面上部署。我们将从一个 **full-context 全文**模型开始，其中用户在进行预测之前要说完整段音频。然后，我们将调整演示以使其变为 **streaming 流式**，这意味着音频模型将在您说话时将语音转换为文本。我们创建的流式演示将如下所示（在下方尝试或[在新标签页中打开](https://huggingface.co/spaces/abidlabs/streaming-asr-paused)）：

<iframe src="https://abidlabs-streaming-asr-paused.hf.space" frameBorder="0" height="350" title="Gradio app" class="container p-0 flex-grow space-iframe" allow="accelerometer; ambient-light-sensor; autoplay; battery; camera; document-domain; encrypted-media; fullscreen; geolocation; gyroscope; layout-animations; legacy-image-formats; magnetometer; microphone; midi; oversized-images; payment; picture-in-picture; publickey-credentials-get; sync-xhr; usb; vr ; wake-lock; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads"></iframe>
实时 ASR 本质上是*有状态的*，即模型的预测结果取决于用户先前说的单词。因此，在本教程中，我们还将介绍如何在 Gradio 演示中使用 **state**。

### 先决条件

确保您已经[安装](/getting_started)了 `gradio` Python 包。您还需要一个预训练的语音识别模型。在本教程中，我们将从两个 ASR 库构建演示：

- Transformers（为此，`pip install transformers` 和 `pip install torch`）\* DeepSpeech（`pip install deepspeech==0.8.2`）

确保您至少安装了其中之一，以便您可以跟随本教程操作。如果您尚未安装 `ffmpeg`，请在[系统上下载并安装](https://www.ffmpeg.org/download.html)，以便从麦克风处理文件。

下面是构建实时语音识别（ASR）应用程序的步骤：

1. [设置 Transformers ASR 模型](#1-set-up-the-transformers-asr-model)
2. [使用 Transformers 创建一个全文 ASR 演示]
   (#2-create-a-full-context-asr-demo-with-transformers)
3. [使用 Transformers 创建一个流式 ASR 演示](#3-create-a-streaming-asr-demo-with-transformers)
4. [使用 DeepSpeech 创建一个流式 ASR 演示](#4-create-a-streaming-asr-demo-with-deepspeech)

## 1. 设置 Transformers ASR 模型

首先，您需要拥有一个 ASR 模型，您可以自己训练，或者需要下载一个预训练模型。在本教程中，我们将使用 Hugging Face 模型的预训练 ASR 模型 `Wav2Vec2`。

以下是从 Hugging Face 的 `transformers` 加载 `Wav2Vec2` 的代码：

```python
from transformers import pipeline
p = pipeline("automatic-speech-recognition")
```

就是这样！默认情况下，自动语音识别模型管道会加载 Facebook 的 `facebook/wav2vec2-base-960h` 模型。

## 2. 使用 Transformers 创建一个全文 ASR 演示

我们将首先创建一个*全文*ASR 演示，其中用户在使用 ASR 模型进行预测之前说完整段音频。使用 Gradio 非常简单，我们只需在上面的 `pipeline` 对象周围创建一个函数。

我们将使用 `gradio` 内置的 `Audio` 组件，配置从用户的麦克风接收输入并返回录制音频的文件路径。输出组件将是一个简单的 `Textbox`。

```python
import gradio as gr

def transcribe(audio):
    text = p(audio)["text"]
    return text

gr.Interface(
    fn=transcribe,
    inputs=gr.Audio(sources=["microphone"], type="filepath"),
    outputs="text").launch()
```

那么这里发生了什么？`transcribe` 函数接受一个参数 `audio`，它是用户录制的音频文件的文件路径。`pipeline` 对象期望一个文件路径，并将其转换为文本，然后返回到前端并在文本框中显示。

让我们看看它的效果吧！（录制一段短音频并点击提交，或[在新标签页打开](https://huggingface.co/spaces/abidlabs/full-context-asr)）：

<iframe src="https://abidlabs-full-context-asr.hf.space" frameBorder="0" height="350" title="Gradio app" class="container p-0 flex-grow space-iframe" allow="accelerometer; ambient-light-sensor; autoplay; battery; camera; document-domain; encrypted-media; fullscreen; geolocation; gyroscope; layout-animations; legacy-image-formats; magnetometer; microphone; midi; oversized-images; payment; picture-in-picture; publickey-credentials-get; sync-xhr; usb; vr ; wake-lock; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads"></iframe>
## 3. 使用 Transformers 创建一个流式 ASR 演示
太棒了！我们已经构建了一个对短音频剪辑效果良好的 ASR 模型。但是，如果您正在记录较长的音频剪辑，则可能需要一个*流式*界面，即在用户说话时逐句转录音频，而不仅仅在最后一次全部转录。

好消息是，我们可以很容易地调整刚刚创建的演示，使其成为流式的，使用相同的 `Wav2Vec2` 模型。

最大的变化是我们现在必须引入一个 `state` 参数，它保存到目前为止*转录的音频*。这样，我们只需处理最新的音频块，并将其简单地追加到先前转录的音频中。

在向 Gradio 演示添加状态时，您需要完成 3 件事：

- 在函数中添加 `state` 参数* 在函数末尾返回更新后的 `state`* 在 `Interface` 的 `inputs` 和 `outputs` 中添加 `"state"` 组件

以下是代码示例：

```python
def transcribe(audio, state=""):
    text = p(audio)["text"]
    state += text + " "
    return state, state

# Set the starting state to an empty string
gr.Interface(
    fn=transcribe,
    inputs=[
        gr.Audio(sources=["microphone"], type="filepath", streaming=True),
        "state"
    ],
    outputs=[
        "textbox",
        "state"
    ],
    live=True).launch()
```

请注意，我们还进行了另一个更改，即我们设置了 `live=True`。这使得 Gradio 接口保持持续运行，因此它可以自动转录音频，而无需用户反复点击提交按钮。

让我们看看它的效果（在下方尝试或[在新标签页中打开](https://huggingface.co/spaces/abidlabs/streaming-asr)）！

<iframe src="https://abidlabs-streaming-asr.hf.space" frameBorder="0" height="350" title="Gradio app" class="container p-0 flex-grow space-iframe" allow="accelerometer; ambient-light-sensor; autoplay; battery; camera; document-domain; encrypted-media; fullscreen; geolocation; gyroscope; layout-animations; legacy-image-formats; magnetometer; microphone; midi; oversized-images; payment; picture-in-picture; publickey-credentials-get; sync-xhr; usb; vr ; wake-lock; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads"></iframe>

你可能注意到的一件事是，由于音频块非常小，所以转录质量下降了，它们缺乏正确转录所需的上下文。此问题的“hacky”解决方法是简单地增加 `transcribe()` 函数的运行时间，以便处理更长的音频块。我们可以通过在函数中添加 `time.sleep()` 来实现这一点，如下所示（接下来我们将看到一个正确的解决方法）

```python
from transformers import pipeline
import gradio as gr
import time

p = pipeline("automatic-speech-recognition")

def transcribe(audio, state=""):
    time.sleep(2)
    text = p(audio)["text"]
    state += text + " "
    return state, state

gr.Interface(
    fn=transcribe,
    inputs=[
        gr.Audio(sources=["microphone"], type="filepath", streaming=True),
        "state"
    ],
    outputs=[
        "textbox",
        "state"
    ],
    live=True).launch()
```

尝试下面的演示，查看差异（或[在新标签页中打开](https://huggingface.co/spaces/abidlabs/streaming-asr-paused)）！

<iframe src="https://abidlabs-streaming-asr-paused.hf.space" frameBorder="0" height="350" title="Gradio app" class="container p-0 flex-grow space-iframe" allow="accelerometer; ambient-light-sensor; autoplay; battery; camera; document-domain; encrypted-media; fullscreen; geolocation; gyroscope; layout-animations; legacy-image-formats; magnetometer; microphone; midi; oversized-images; payment; picture-in-picture; publickey-credentials-get; sync-xhr; usb; vr ; wake-lock; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads"></iframe>

## 4. 使用 DeepSpeech 创建流式 ASR 演示

您不仅限于使用 `transformers` 库中的 ASR 模型 - 您可以使用自己的模型或其他库中的模型。`DeepSpeech` 库包含专门用于处理流式音频数据的模型。这些模型在处理流式数据时表现非常好，因为它们能够考虑到先前的音频块在进行预测时产生的影响。

深入研究 DeepSpeech 库超出了本指南的范围（可以在[此处查看其优秀的文档](https://deepspeech.readthedocs.io/en/r0.9/)），但是您可以像使用 Transformer ASR 模型一样，使用 DeepSpeech ASR 模型使用类似的方法使用 Gradio。

下面是一个完整的示例（在 Linux 上）：

首先通过终端安装 DeepSpeech 库并下载预训练模型：

```bash
wget https://github.com/mozilla/DeepSpeech/releases/download/v0.8.2/deepspeech-0.8.2-models.pbmm
wget https://github.com/mozilla/DeepSpeech/releases/download/v0.8.2/deepspeech-0.8.2-models.scorer
apt install libasound2-dev portaudio19-dev libportaudio2 libportaudiocpp0 ffmpeg
pip install deepspeech==0.8.2
```

然后，创建与之前相似的 `transcribe()` 函数：

```python
from deepspeech import Model
import numpy as np

model_file_path = "deepspeech-0.8.2-models.pbmm"
lm_file_path = "deepspeech-0.8.2-models.scorer"
beam_width = 100
lm_alpha = 0.93
lm_beta = 1.18

model = Model(model_file_path)
model.enableExternalScorer(lm_file_path)
model.setScorerAlphaBeta(lm_alpha, lm_beta)
model.setBeamWidth(beam_width)


def reformat_freq(sr, y):
    if sr not in (
        48000,
        16000,
    ):  # Deepspeech only supports 16k, (we convert 48k -> 16k)
        raise ValueError("Unsupported rate", sr)
    if sr == 48000:
        y = (
            ((y / max(np.max(y), 1)) * 32767)
            .reshape((-1, 3))
            .mean(axis=1)
            .astype("int16")
        )
        sr = 16000
    return sr, y


def transcribe(speech, stream):
    _, y = reformat_freq(*speech)
    if stream is None:
        stream = model.createStream()
    stream.feedAudioContent(y)
    text = stream.intermediateDecode()
    return text, stream

```

然后，如前所述创建一个 Gradio 接口（唯一的区别是返回类型应该是 `numpy` 而不是 `filepath` 以与 DeepSpeech 模型兼容）

```python
import gradio as gr

gr.Interface(
    fn=transcribe,
    inputs=[
        gr.Audio(sources=["microphone"], type="numpy"),
        "state"
    ],
    outputs= [
        "text",
        "state"
    ],
    live=True).launch()
```

运行所有这些应该允许您使用一个漂亮的 GUI 部署实时 ASR 模型。尝试一下，看它在您那里运行得有多好。

---

你已经完成了！这就是构建用于 ASR 模型的基于 Web 的 GUI 所需的所有代码。

有趣的提示：您只需在 `launch()` 中设置 `share=True`，即可即时与他人共享 ASR 模型。

---

<!-- Source: guides/cn/07_other-tutorials/running-background-tasks.md -->
# 运行后台任务

Related spaces: https://huggingface.co/spaces/freddyaboulton/gradio-google-forms
Tags: TASKS, SCHEDULED, TABULAR, DATA

## 简介

本指南介绍了如何从 gradio 应用程序中运行后台任务。
后台任务是在您的应用程序的请求-响应生命周期之外执行的操作，可以是一次性的或定期的。
后台任务的示例包括定期将数据与外部数据库同步或通过电子邮件发送模型预测报告。

## 概述

我们将创建一个简单的“Google Forms”风格的应用程序，用于收集 gradio 库的用户反馈。
我们将使用一个本地 sqlite 数据库来存储数据，但我们将定期将数据库的状态与[HuggingFace Dataset](https://huggingface.co/datasets)同步，以便始终备份我们的用户评论。
同步将在每 60 秒运行的后台任务中进行。

在演示结束时，您将拥有一个完全可工作的应用程序，类似于以下应用程序 :

<gradio-app space="freddyaboulton/gradio-google-forms"> </gradio-app>

## 第一步 - 编写数据库逻辑 💾

我们的应用程序将存储评论者的姓名，他们对 gradio 给出的评分（1 到 5 的范围），以及他们想要分享的关于该库的任何评论。让我们编写一些代码，创建一个数据库表来存储这些数据。我们还将编写一些函数，以将评论插入该表中并获取最新的 10 条评论。

我们将使用 `sqlite3` 库来连接我们的 sqlite 数据库，但 gradio 可以与任何库一起使用。

代码如下 :

```python
DB_FILE = "./reviews.db"
db = sqlite3.connect(DB_FILE)

# Create table if it doesn't already exist
try:
    db.execute("SELECT * FROM reviews").fetchall()
    db.close()
except sqlite3.OperationalError:
    db.execute(
        '''
        CREATE TABLE reviews (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                              name TEXT, review INTEGER, comments TEXT)
        ''')
    db.commit()
    db.close()

def get_latest_reviews(db: sqlite3.Connection):
    reviews = db.execute("SELECT * FROM reviews ORDER BY id DESC limit 10").fetchall()
    total_reviews = db.execute("Select COUNT(id) from reviews").fetchone()[0]
    reviews = pd.DataFrame(reviews, columns=["id", "date_created", "name", "review", "comments"])
    return reviews, total_reviews


def add_review(name: str, review: int, comments: str):
    db = sqlite3.connect(DB_FILE)
    cursor = db.cursor()
    cursor.execute("INSERT INTO reviews(name, review, comments) VALUES(?,?,?)", [name, review, comments])
    db.commit()
    reviews, total_reviews = get_latest_reviews(db)
    db.close()
    return reviews, total_reviews
```

让我们还写一个函数，在 gradio 应用程序加载时加载最新的评论 :

```python
def load_data():
    db = sqlite3.connect(DB_FILE)
    reviews, total_reviews = get_latest_reviews(db)
    db.close()
    return reviews, total_reviews
```

## 第二步 - 创建 gradio 应用 ⚡

现在我们已经定义了数据库逻辑，我们可以使用 gradio 创建一个动态的网页来询问用户的反馈意见！

使用以下代码段 :

```python
with gr.Blocks() as demo:
    with gr.Row():
        with gr.Column():
            name = gr.Textbox(label="Name", placeholder="What is your name?")
            review = gr.Radio(label="How satisfied are you with using gradio?", choices=[1, 2, 3, 4, 5])
            comments = gr.Textbox(label="Comments", lines=10, placeholder="Do you have any feedback on gradio?")
            submit = gr.Button(value="Submit Feedback")
        with gr.Column():
            data = gr.Dataframe(label="Most recently created 10 rows")
            count = gr.Number(label="Total number of reviews")
    submit.click(add_review, [name, review, comments], [data, count])
    demo.load(load_data, None, [data, count])
```

## 第三步 - 与 HuggingFace 数据集同步 🤗

在第 2 步后我们可以调用 `demo.launch()` 来运行一个完整功能的应用程序。然而，我们的数据将存储在本地机器上。如果 sqlite 文件意外删除，我们将丢失所有评论！让我们将我们的数据备份到 HuggingFace hub 的数据集中。

在继续之前，请在[此处](https://huggingface.co/datasets)创建一个数据集。

现在，在我们脚本的**顶部**，我们将使用[huggingface hub 客户端库](https://huggingface.co/docs/huggingface_hub/index)连接到我们的数据集并获取最新的备份。

```python
TOKEN = os.environ.get('HUB_TOKEN')
repo = huggingface_hub.Repository(
    local_dir="data",
    repo_type="dataset",
    clone_from="<name-of-your-dataset>",
    use_auth_token=TOKEN
)
repo.git_pull()

shutil.copyfile("./data/reviews.db", DB_FILE)
```

请注意，您需要从 HuggingFace 的“设置”选项卡中获取访问令牌，以上代码才能正常工作。在脚本中，通过环境变量安全访问令牌。

![access_token](/assets/guides/access_token.png)

现在，我们将创建一个后台任务，每 60 秒将我们的本地数据库与数据集中的数据同步一次。
我们将使用[AdvancedPythonScheduler](https://apscheduler.readthedocs.io/en/3.x/)来处理调度。
然而，这并不是唯一可用的任务调度库。请随意使用您熟悉的任何库。

备份数据的函数如下 :

```python
from apscheduler.schedulers.background import BackgroundScheduler

def backup_db():
    shutil.copyfile(DB_FILE, "./data/reviews.db")
    db = sqlite3.connect(DB_FILE)
    reviews = db.execute("SELECT * FROM reviews").fetchall()
    pd.DataFrame(reviews).to_csv("./data/reviews.csv", index=False)
    print("updating db")
    repo.push_to_hub(blocking=False, commit_message=f"Updating data at {datetime.datetime.now()}")


scheduler = BackgroundScheduler()
scheduler.add_job(func=backup_db, trigger="interval", seconds=60)
scheduler.start()
```

## 第四步（附加）- 部署到 HuggingFace Spaces

您可以使用 HuggingFace [Spaces](https://huggingface.co/spaces) 平台免费部署这个应用程序 ✨

如果您之前没有使用过 Spaces，请查看[此处](/using_hugging_face_integrations)的先前指南。
您将需要将 `HUB_TOKEN` 环境变量作为指南中的一个秘密使用。

## 结论

恭喜！您知道如何在您的 gradio 应用程序中按计划运行后台任务⏲️。

在 Spaces 上运行的应用程序可在[此处](https://huggingface.co/spaces/freddyaboulton/gradio-google-forms)查看。
完整的代码在[此处](https://huggingface.co/spaces/freddyaboulton/gradio-google-forms/blob/main/app.py)。

---

<!-- Source: guides/cn/07_other-tutorials/running-gradio-on-your-web-server-with-nginx.md -->
# 在 Web 服务器上使用 Nginx 运行 Gradio 应用

标签：部署，Web 服务器，Nginx

## 介绍

Gradio 是一个 Python 库，允许您快速创建可定制的 Web 应用程序，用于机器学习模型和数据处理流水线。Gradio 应用可以免费部署在[Hugging Face Spaces](https://hf.space)上。

然而，在某些情况下，您可能希望在自己的 Web 服务器上部署 Gradio 应用。您可能已经在使用[Nginx](https://www.nginx.com/)作为高性能的 Web 服务器来提供您的网站（例如 `https://www.example.com`），并且您希望将 Gradio 附加到网站的特定子路径上（例如 `https://www.example.com/gradio-demo`）。

在本指南中，我们将指导您在自己的 Web 服务器上的 Nginx 后面运行 Gradio 应用的过程，以实现此目的。

**先决条件**

1. 安装了 [Nginx 的 Linux Web 服务器](https://www.nginx.com/blog/setting-up-nginx/) 和 [Gradio](/quickstart) 库

2. 在 Web 服务器上将 Gradio 应用保存为 Python 文件

## 编辑 Nginx 配置文件

1. 首先编辑 Web 服务器上的 Nginx 配置文件。默认情况下，文件位于：`/etc/nginx/nginx.conf`

在 `http` 块中，添加以下行以从单独的文件包含服务器块配置：

```bash
include /etc/nginx/sites-enabled/*;
```

2. 在 `/etc/nginx/sites-available` 目录中创建一个新文件（如果目录不存在则创建），文件名表示您的应用，例如：`sudo nano /etc/nginx/sites-available/my_gradio_app`

3. 将以下内容粘贴到文件编辑器中：

```bash
server {
    listen 80;
    server_name example.com www.example.com;  # 将此项更改为您的域名

    location /gradio-demo/ {  # 如果要在不同路径上提供Gradio应用，请更改此项
        proxy_pass http://127.0.0.1:7860/; # 如果您的Gradio应用将在不同端口上运行，请更改此项
        proxy_redirect off;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

## 在 Web 服务器上运行 Gradio 应用

1. 在启动 Gradio 应用之前，您需要将 `root_path` 设置为与 Nginx 配置中指定的子路径相同。这对于 Gradio 在除域的根路径之外的任何子路径上运行是必要的。

以下是一个具有自定义 `root_path` 的简单示例 Gradio 应用：

```python
import gradio as gr
import time

def test(x):
    time.sleep(4)
    return x

gr.Interface(test, "textbox", "textbox").queue().launch(root_path="/gradio-demo")
```

2. 通过键入 `tmux` 并按回车键（可选）启动 `tmux` 会话

推荐在 `tmux` 会话中运行 Gradio 应用，以便可以轻松地在后台运行它

3. 然后，启动您的 Gradio 应用。只需输入 `python`，后跟您的 Gradio Python 文件的名称。默认情况下，应用将在 `localhost:7860` 上运行，但如果它在其他端口上启动，您需要更新上面的 Nginx 配置文件。

## 重新启动 Nginx

1. 如果您在 tmux 会话中，请通过键入 CTRL + B（或 CMD + B），然后按下 "D" 键来退出。

2. 最后，通过运行 `sudo systemctl restart nginx` 重新启动 nginx。

就是这样！如果您在浏览器中访问 `https://example.com/gradio-demo`，您应该能够看到您的 Gradio 应用在那里运行。

---

<!-- Source: guides/cn/07_other-tutorials/theming-guide.md -->
# 主题 Theming

Tags: THEMES

## 介绍

Gradio 具有内置的主题引擎，可让您自定义应用的外观和感觉。您可以选择各种主题，或者创建自己的主题。要这样做，请将 `theme=` kwarg 传递给 `Blocks` 或 `Interface` 构造函数。例如：

```python
with gr.Blocks(theme=gr.themes.Soft()) as demo:
    ...
```

<div class="wrapper">
<iframe
	src="https://gradio-theme-soft.hf.space?__theme=light"
	frameborder="0"
></iframe>
</div>

Gradio 带有一组预构建的主题，您可以从 `gr.themes.*` 中加载这些主题。这些主题包括：

- `gr.themes.Base()`
- `gr.themes.Default()`
- `gr.themes.Glass()`
- `gr.themes.Monochrome()`
- `gr.themes.Soft()`

这些主题为数百个 CSS 变量设置了值。您可以使用预构建的主题作为自定义主题的起点，也可以从头开始创建自己的主题。让我们看看每种方法。

## 使用主题构建器

使用主题构建器构建主题最简单。要在本地启动主题构建器，请运行以下代码：

```python
import gradio as gr

gr.themes.builder()
```

$demo_theme_builder

您可以使用上面的 Spaces 上运行的 Theme Builder，但通过 `gr.themes.builder()` 在本地启动时运行速度更快。

在 Theme Builder 中编辑值时，应用程序将实时预览更新。您可以下载生成的主题代码，以便在任何 Gradio 应用程序中使用它。

在本指南的其余部分，我们将介绍如何以编程方式构建主题。

## 通过构造函数扩展主题

尽管每个主题都有数百个 CSS 变量，但大多数这些变量的值都是从 8 个核心变量中获取的，可以通过每个预构建主题的构造函数设置这些变量。通过修改这 8 个参数的值，您可以快速更改应用程序的外观和感觉。

### 核心颜色

前 3 个构造函数参数设置主题的颜色，并且是 `gradio.themes.Color` 对象。在内部，这些 Color 对象包含单个色调的调色板的亮度值，范围从 50，100，200...，800，900，950。其他 CSS 变量是从这 3 种颜色派生的。

3 个颜色构造函数参数是：

- `primary_hue`：这是主题中的主色。在默认主题中，此值设置为 `gradio.themes.colors.orange`。
- `secondary_hue`：这是主题中用于辅助元素的颜色。在默认主题中，此值设置为 `gradio.themes.colors.blue`。
- `neutral_hue`：这是主题中用于文本和其他中性元素的颜色。在默认主题中，此值设置为 `gradio.themes.colors.gray`。

您可以使用字符串快捷方式修改这些值，例如

```python
with gr.Blocks(theme=gr.themes.Default(primary_hue="red", secondary_hue="pink")) as demo:
    ...
```

或者直接使用 `Color` 对象，如下所示：

```python
with gr.Blocks(theme=gr.themes.Default(primary_hue=gr.themes.colors.red, secondary_hue=gr.themes.colors.pink)) as demo:
    ...
```

<div class="wrapper">
<iframe
	src="https://gradio-theme-extended-step-1.hf.space?__theme=light"
	frameborder="0"
></iframe>
</div>

预定义的颜色包括：

- `slate`
- `gray`
- `zinc`
- `neutral`
- `stone`
- `red`
- `orange`
- `amber`
- `yellow`
- `lime`
- `green`
- `emerald`
- `teal`
- `cyan`
- `sky`
- `blue`
- `indigo`
- `violet`
- `purple`
- `fuchsia`
- `pink`
- `rose`

您还可以创建自己的自定义 `Color` 对象并传递它们。

### 核心大小 （Core Sizing）

接下来的 3 个构造函数参数设置主题的大小，并且是 `gradio.themes.Size` 对象。在内部，这些 Size 对象包含从 `xxs` 到 `xxl` 的像素大小值。其他 CSS 变量是从这 3 个大小派生的。

- `spacing_size`：此设置了元素内部的填充和元素之间的间距。在默认主题中，此值设置为 `gradio.themes.sizes.spacing_md`。
- `radius_size`：此设置了元素的圆角弧度。在默认主题中，此值设置为 `gradio.themes.sizes.radius_md`。
- `text_size`：此设置了文本的字体大小。在默认主题中，此值设置为 `gradio.themes.sizes.text_md`。

您可以使用字符串快捷方式修改这些值，例如

```python
with gr.Blocks(theme=gr.themes.Default(spacing_size="sm", radius_size="none")) as demo:
    ...
```

或者直接使用 `Size` 对象，如下所示：

```python
with gr.Blocks(theme=gr.themes.Default(spacing_size=gr.themes.sizes.spacing_sm, radius_size=gr.themes.sizes.radius_none)) as demo:
    ...
```

<div class="wrapper">
<iframe
	src="https://gradio-theme-extended-step-2.hf.space?__theme=light"
	frameborder="0"
></iframe>
</div>

预定义的大小对象包括：

- `radius_none`
- `radius_sm`
- `radius_md`
- `radius_lg`
- `spacing_sm`
- `spacing_md`
- `spacing_lg`
- `text_sm`
- `text_md`
- `text_lg`

您还可以创建自己的自定义 `Size` 对象并传递它们。

### 核心字体（Core Fonts）

最后的 2 个构造函数参数设置主题的字体。您可以将一系列字体传递给这些参数，以指定回退字体。如果提供了字符串，它将被加载为系统字体。如果提供了 `gradio.themes.GoogleFont`，则将从 Google Fonts 加载该字体。

- `font`：此设置主题的主要字体。在默认主题中，此值设置为 `gradio.themes.GoogleFont("IBM Plex Sans")`。
- `font_mono`：此设置主题的等宽字体。在默认主题中，此值设置为 `gradio.themes.GoogleFont("IBM Plex Mono")`。

您可以修改这些值，例如以下方式：

```python
with gr.Blocks(theme=gr.themes.Default(font=[gr.themes.GoogleFont("Inconsolata"), "Arial", "sans-serif"])) as demo:
    ...
```

<div class="wrapper">
<iframe
	src="https://gradio-theme-extended-step-3.hf.space?__theme=light"
	frameborder="0"
></iframe>
</div>

## 通过 `.set()` 扩展主题

主题加载后，您还可以修改 CSS 变量的值。为此，请使用主题对象的 `.set()` 方法来访问 CSS 变量。例如：

```python
theme = gr.themes.Default(primary_hue="blue").set(    loader_color="#FF0000",    slider_color="#FF0000",)
使用`gr.Blocks(theme=theme)`创建演示块    ...
```

在上面的示例中，我们将 `loader_color` 和 `slider_color` 变量设置为`#FF0000`，尽管整体 `primary_color` 使用蓝色调色板。您可以以这种方式设置主题中定义的任何 CSS 变量。
您的 IDE 类型提示应该帮助您导航这些变量。由于有很多 CSS 变量，让我们看一下这些变量的命名和组织方式。

### CSS 变量命名规范

CSS 变量名可能会变得很长，例如 `button_primary_background_fill_hover_dark`！但是它们遵循一种常见的命名约定，使得理解变量功能和查找您要查找的变量变得容易。变量名由下划线分隔，由以下组成：

1. 目标元素，例如 `button`、`slider` 或 `block`。2. 目标元素类型或子元素，例如 `button_primary` 或 `block_label`。3. 属性，例如 `button_primary_background_fill` 或 `block_label_border_width`。4. 任何相关状态，例如 `button_primary_background_fill_hover`。5. 如果在暗模式中值不同，则使用后缀 `_dark`。例如，`input_border_color_focus_dark`。
   当然，许多 CSS 变量名都比这个短，例如 `table_border_color` 或 `input_shadow`。

### CSS 变量组织

虽然有数百个 CSS 变量，但并不需要为每个变量都指定单独的值。它们通过引用一组核心变量和彼此引用来获取值。这样做可以仅修改少量变量以改变整个主题的外观和感觉，同时也可以更精细地控制我们可能想要修改的个别元素。

#### 引用核心变量

要引用其中一个核心构造函数变量，请在变量名前加上星号。要引用核心颜色，请使用`*primary_`、`*secondary_` 或`*neutral_` 前缀，后跟亮度值。例如：

```python
theme = gr.themes.Default(primary_hue="blue").set(
    button_primary_background_fill="*primary_200",
    button_primary_background_fill_hover="*primary_300",
)
```

在上面的示例中，我们将 `button_primary_background_fill` 和 `button_primary_background_fill_hover` 变量分别设置为`*primary_200` 和`*primary_300`。这些变量将分别设置为蓝色主色调调色板的 200 和 300 亮度值。
同样地，要引用核心大小，请使用`*spacing_`、`*radius_` 或`*text_` 前缀，后跟大小值。例如：

```python
theme = gr.themes.Default(radius_size="md").set(
    button_primary_border_radius="*radius_xl",
)
```

在上面的示例中，我们将 `button_primary_border_radius` 变量设置为`*radius_xl`。此变量将设置为中等半径大小范围的 `xl` 设置。

#### 引用其他变量

变量也可以引用彼此。例如，请看下面的示例：

```python
theme = gr.themes.Default().set(
    button_primary_background_fill="#FF0000",
    button_primary_background_fill_hover="#FF0000",
    button_primary_border="#FF0000",
)
```

将这些值设置为相同的颜色有点繁琐。相反，我们可以在 `button_primary_background_fill_hover` 和 `button_primary_border` 变量中使用`*` 前缀引用 `button_primary_background_fill` 变量。

```python
theme = gr.themes.Default().set(
    button_primary_background_fill="#FF0000",
    button_primary_background_fill_hover="*button_primary_background_fill",
    button_primary_border="*button_primary_background_fill",
)
```

现在，如果我们更改 `button_primary_background_fill` 变量，`button_primary_background_fill_hover` 和 `button_primary_border` 变量将自动更新。
如果您打算共享主题，这将非常有用- 它使得修改主题变得容易，而无需更改每个变量。
请注意，暗模式变量自动相互引用。例如：

```python
theme = gr.themes.Default().set(
    button_primary_background_fill="#FF0000",
    button_primary_background_fill_dark="#AAAAAA",
    button_primary_border="*button_primary_background_fill",
    button_primary_border_dark="*button_primary_background_fill_dark",
)
```

`button_primary_border_dark` 将从 `button_primary_background_fill_dark` 获取其值，因为暗模式总是使用变量的暗版本。

## 创建一个完整的主题

假设您想从头开始创建一个主题！我们将逐步进行 - 您还可以参考 gradio 源代码库中预构建主题的源代码，请看这里的示例：[Monochrome theme 的源代码](https://github.com/gradio-app/gradio/blob/main/gradio/themes/monochrome.py)
我们的新主题类将继承自 `gradio.themes.Base`，这是一个设置了许多方便默认值的主题。让我们创建一个名为 Seafoam 的简单演示，以及使用它的简单应用程序。
$code_theme_new_step_1

<div class="wrapper">
<iframe
	src="https://gradio-theme-new-step-1.hf.space?__theme=light"
	frameborder="0"
></iframe>
</div>

Base 主题非常简洁，使用 `gr.themes.Blue` 作为其主要颜色-由于此原因，主按钮和加载动画都是蓝色的。让我们改变应用程序的默认核心参数。我们将覆盖构造函数并传递新的默认值给核心构造函数参数。
我们将使用 `gr.themes.Emerald` 作为我们的主要颜色，并将次要和中性色调设置为 `gr.themes.Blue`。我们将使用 `text_lg` 使文本更大。我们将使用 `Quicksand` 作为我们的默认字体，从 Google Fonts 加载。
$code_theme_new_step_2

<div class="wrapper">
<iframe
	src="https://gradio-theme-new-step-2.hf.space?__theme=light"
	frameborder="0"
></iframe>
</div>

注意到主按钮和加载动画现在是绿色的了吗？这些 CSS 变量与 `primary_hue` 相关联。
我们来直接修改主题。我们将调用 `set()` 方法来明确覆盖 CSS 变量值。我们可以使用任何 CSS 逻辑，并使用`*` 前缀引用我们的核心构造函数的参数。

$code_theme_new_step_3

<div class="wrapper">
<iframe
	src="https://gradio-theme-new-step-3.hf.space?__theme=light"
	frameborder="0"
></iframe>
</div>

看看我们的主题现在多么有趣！仅通过几个变量的更改，我们的主题完全改变了。

您可能会发现探索[其他预建主题的源代码](https://github.com/gradio-app/gradio/blob/main/gradio/themes)会很有帮助，以了解他们如何修改基本主题。您还可以使用浏览器的检查工具，选择 UI 中的元素并查看在样式面板中使用的 CSS 变量。

## 分享主题

在创建主题后，您可以将其上传到 HuggingFace Hub，让其他人查看、使用和构建主题！

### 上传主题

有两种上传主题的方式，通过主题类实例或命令行。我们将使用之前创建的“seafoam”主题来介绍这两种方式。

- 通过类实例

每个主题实例都有一个名为“push_to_hub”的方法，我们可以使用它来将主题上传到 HuggingFace Hub。

```python
seafoam.push_to_hub(repo_name="seafoam",
                    version="0.0.1",
					hf_token="<token>")
```

- 通过命令行

首先将主题保存到磁盘

```python
seafoam.dump(filename="seafoam.json")
```

然后使用“upload_theme”命令：

```bash
upload_theme\
"seafoam.json"\
"seafoam"\
--version "0.0.1"\
--hf_token "<token>"
```

要上传主题，您必须拥有一个 HuggingFace 账户，并通过 `hf_token` 参数传递您的[访问令牌](https://huggingface.co/docs/huggingface_hub/quick-start#login)。
但是，如果您通过[HuggingFace 命令行](https://huggingface.co/docs/huggingface_hub/quick-start#login)登录（与 `gradio` 一起安装），
那么您可以省略 `hf_token` 参数。

`version` 参数允许您为主题指定一个有效的[语义版本](https://www.geeksforgeeks.org/introduction-semantic-versioning/)字符串。
这样，您的用户就可以在他们的应用程序中指定要使用的主题版本。这还允许您发布主题更新而不必担心
以前创建的应用程序的外观如何更改。`version` 参数是可选的。如果省略，下一个修订版本将自动应用。

### 主题预览

通过调用 `push_to_hub` 或 `upload_theme`，主题资源将存储在[HuggingFace 空间](https://huggingface.co/docs/hub/spaces-overview)中。

我们的 seafoam 主题的预览在这里：[seafoam 预览](https://huggingface.co/spaces/gradio/seafoam)。

<div class="wrapper">
<iframe
	src="https://gradio-seafoam.hf.space?__theme=light"
	frameborder="0"
></iframe>
</div>

### 发现主题

[主题库](https://huggingface.co/spaces/gradio/theme-gallery)显示了所有公开的 gradio 主题。在发布主题之后，
它将在几分钟后自动显示在主题库中。

您可以按照空间上点赞的数量以及按创建时间从最近到最近对主题进行排序，也可以在浅色和深色模式之间切换主题。

<div class="wrapper">
<iframe
	src="https://gradio-theme-gallery.hf.space"
	frameborder="0"
></iframe>
</div>

### 下载

要使用 Hub 中的主题，请在 `ThemeClass` 上使用 `from_hub` 方法，然后将其传递给您的应用程序：

```python
my_theme = gr.Theme.from_hub("gradio/seafoam")

with gr.Blocks(theme=my_theme) as demo:
    ....
```

您也可以直接将主题字符串传递给 `Blocks` 或 `Interface`（`gr.Blocks(theme="gradio/seafoam")`）

您可以通过使用语义版本表达式将您的应用程序固定到上游主题版本。

例如，以下内容将确保我们从“seafoam”仓库中加载的主题位于 `0.0.1` 和 `0.1.0` 版本之间：

```python
with gr.Blocks(theme="gradio/seafoam@>=0.0.1,<0.1.0") as demo:
    ....
```

享受创建自己的主题吧！如果您制作了一个自豪的主题，请将其上传到 Hub 与世界分享！
如果在[Twitter](https://twitter.com/gradio)上标记我们，我们可以给您的主题一个宣传！

<style>
.wrapper {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 25px;
    height: 0;
}
.wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>

---

<!-- Source: guides/cn/07_other-tutorials/using-flagging.md -->
# 使用标记

相关空间：https://huggingface.co/spaces/gradio/calculator-flagging-crowdsourced, https://huggingface.co/spaces/gradio/calculator-flagging-options, https://huggingface.co/spaces/gradio/calculator-flag-basic
标签：标记，数据

## 简介

当您演示一个机器学习模型时，您可能希望收集试用模型的用户的数据，特别是模型行为不如预期的数据点。捕获这些“困难”数据点是有价值的，因为它允许您改进机器学习模型并使其更可靠和稳健。

Gradio 通过在每个“界面”中包含一个**标记**按钮来简化这些数据的收集。这使得用户或测试人员可以轻松地将数据发送回运行演示的机器。样本会保存在一个 CSV 日志文件中（默认情况下）。如果演示涉及图像、音频、视频或其他类型的文件，则这些文件会单独保存在一个并行目录中，并且这些文件的路径会保存在 CSV 文件中。

## 在 `gradio.Interface` 中使用**标记**按钮

使用 Gradio 的 `Interface` 进行标记特别简单。默认情况下，在输出组件下方有一个标记为**标记**的按钮。当用户测试您的模型时，如果看到有趣的输出，他们可以点击标记按钮将输入和输出数据发送回运行演示的机器。样本会保存在一个 CSV 日志文件中（默认情况下）。如果演示涉及图像、音频、视频或其他类型的文件，则这些文件会单独保存在一个并行目录中，并且这些文件的路径会保存在 CSV 文件中。

在 `gradio.Interface` 中有[四个参数](https://gradio.app/docs/interface#initialization)控制标记的工作方式。我们将详细介绍它们。

- `allow_flagging`：此参数可以设置为 `"manual"`（默认值），`"auto"` 或 `"never"`。
  - `manual`：用户将看到一个标记按钮，只有在点击按钮时样本才会被标记。
  - `auto`：用户将不会看到一个标记按钮，但每个样本都会自动被标记。
  - `never`：用户将不会看到一个标记按钮，并且不会标记任何样本。
- `flagging_options`：此参数可以是 `None`（默认值）或字符串列表。
  - 如果是 `None`，则用户只需点击**标记**按钮，不会显示其他选项。
  - 如果提供了一个字符串列表，则用户会看到多个按钮，对应于提供的每个字符串。例如，如果此参数的值为`[" 错误 ", " 模糊 "]`，则会显示标记为**标记为错误**和**标记为模糊**的按钮。这仅适用于 `allow_flagging` 为 `"manual"` 的情况。
  - 所选选项将与输入和输出一起记录。
- `flagging_dir`：此参数接受一个字符串。
  - 它表示标记数据存储的目录名称。
- `flagging_callback`：此参数接受 `FlaggingCallback` 类的子类的实例
  - 使用此参数允许您编写在点击标记按钮时运行的自定义代码
  - 默认情况下，它设置为 `gr.CSVLogger` 的一个实例
  - 一个示例是将其设置为 `gr.HuggingFaceDatasetSaver` 的一个实例，这样您可以将任何标记的数据导入到 HuggingFace 数据集中（参见下文）。

## 标记的数据会发生什么？

在 `flagging_dir` 参数提供的目录中，将记录标记的数据的 CSV 文件。

以下是一个示例：下面的代码创建了嵌入其中的计算器界面：

```python
import gradio as gr


def calculator(num1, operation, num2):
    if operation == "add":
        return num1 + num2
    elif operation == "subtract":
        return num1 - num2
    elif operation == "multiply":
        return num1 * num2
    elif operation == "divide":
        return num1 / num2


iface = gr.Interface(
    calculator,
    ["number", gr.Radio(["add", "subtract", "multiply", "divide"]), "number"],
    "number",
    allow_flagging="manual"
)

iface.launch()
```

<gradio-app space="gradio/calculator-flag-basic/"></gradio-app>

当您点击上面的标记按钮时，启动界面的目录将包括一个新的标记子文件夹，其中包含一个 CSV 文件。该 CSV 文件包括所有被标记的数据。

```directory
+-- flagged/
|   +-- logs.csv
```

_flagged/logs.csv_

```csv
num1,operation,num2,Output,timestamp
5,add,7,12,2022-01-31 11:40:51.093412
6,subtract,1.5,4.5,2022-01-31 03:25:32.023542
```

如果界面涉及文件数据，例如图像和音频组件，还将创建文件夹来存储这些标记的数据。例如，将 `image` 输入到 `image` 输出界面将创建以下结构。

```directory
+-- flagged/
|   +-- logs.csv
|   +-- image/
|   |   +-- 0.png
|   |   +-- 1.png
|   +-- Output/
|   |   +-- 0.png
|   |   +-- 1.png
```

_flagged/logs.csv_

```csv
im,Output timestamp
im/0.png,Output/0.png,2022-02-04 19:49:58.026963
im/1.png,Output/1.png,2022-02-02 10:40:51.093412
```

如果您希望用户为标记提供一个原因，您可以将字符串列表传递给 Interface 的 `flagging_options` 参数。用户在标记时必须选择其中一项，选项将作为附加列保存在 CSV 文件中。

如果我们回到计算器示例，下面的代码将创建嵌入其中的界面。

```python
iface = gr.Interface(
    calculator,
    ["number", gr.Radio(["add", "subtract", "multiply", "divide"]), "number"],
    "number",
    allow_flagging="manual",
    flagging_options=["wrong sign", "off by one", "other"]
)

iface.launch()
```

<gradio-app space="gradio/calculator-flagging-options/"></gradio-app>

当用户点击标记按钮时，CSV 文件现在将包括指示所选选项的列。

_flagged/logs.csv_

```csv
num1,operation,num2,Output,flag,timestamp
5,add,7,-12,wrong sign,2022-02-04 11:40:51.093412
6,subtract,1.5,3.5,off by one,2022-02-04 11:42:32.062512
```

## HuggingFaceDatasetSaver 回调

有时，将数据保存到本地 CSV 文件是不合理的。例如，在 Hugging Face Spaces 上
，开发者通常无法访问托管 Gradio 演示的底层临时机器。这就是为什么，默认情况下，在 Hugging Face Space 中关闭标记的原因。然而，
您可能希望对标记的数据做其他处理。
you may want to do something else with the flagged data.

通过 `flagging_callback` 参数，我们使这变得非常简单。

例如，下面我们将会将标记的数据从我们的计算器示例导入到 Hugging Face 数据集中，以便我们可以构建一个“众包”数据集：

```python
import os

HF_TOKEN = os.getenv('HF_TOKEN')
hf_writer = gr.HuggingFaceDatasetSaver(HF_TOKEN, "crowdsourced-calculator-demo")

iface = gr.Interface(
    calculator,
    ["number", gr.Radio(["add", "subtract", "multiply", "divide"]), "number"],
    "number",
    description="Check out the crowd-sourced dataset at: [https://huggingface.co/datasets/aliabd/crowdsourced-calculator-demo](https://huggingface.co/datasets/aliabd/crowdsourced-calculator-demo)",
    allow_flagging="manual",
    flagging_options=["wrong sign", "off by one", "other"],
    flagging_callback=hf_writer
)

iface.launch()
```

注意，我们使用我们的 Hugging Face 令牌和
要保存样本的数据集的名称，定义了我们自己的
`gradio.HuggingFaceDatasetSaver` 的实例。此外，我们还将 `allow_flagging="manual"` 设置为了
，因为在 Hugging Face Spaces 中，`allow_flagging` 默认设置为 `"never"`。这是我们的演示：

<gradio-app space="gradio/calculator-flagging-crowdsourced/"></gradio-app>

您现在可以在这个[公共的 Hugging Face 数据集](https://huggingface.co/datasets/aliabd/crowdsourced-calculator-demo)中看到上面标记的所有示例。

![flagging callback hf](/assets/guides/flagging-callback-hf.png)

我们创建了 `gradio.HuggingFaceDatasetSaver` 类，但只要它继承自[此文件](https://github.com/gradio-app/gradio/blob/master/gradio/flagging.py)中定义的 `FlaggingCallback`，您可以传递自己的自定义类。如果您创建了一个很棒的回调，请将其贡献给该存储库！

## 使用 Blocks 进行标记

如果您正在使用 `gradio.Blocks`，又该怎么办呢？一方面，使用 Blocks 您拥有更多的灵活性
--您可以编写任何您想在按钮被点击时运行的 Python 代码，
并使用 Blocks 中的内置事件分配它。

同时，您可能希望使用现有的 `FlaggingCallback` 来避免编写额外的代码。
这需要两个步骤：

1. 您必须在代码中的某个位置运行您的回调的 `.setup()` 方法
   在第一次标记数据之前
2. 当点击标记按钮时，您触发回调的 `.flag()` 方法，
   确保正确收集参数并禁用通常的预处理。

下面是一个使用默认的 `CSVLogger` 标记图像怀旧滤镜 Blocks 演示的示例：
data using the default `CSVLogger`:

$code_blocks_flag
$demo_blocks_flag

## 隐私

重要提示：请确保用户了解他们提交的数据何时被保存以及您计划如何处理它。当您使用 `allow_flagging=auto`（当通过演示提交的所有数据都被标记时），这一点尤为重要

### 这就是全部！祝您建设愉快 :)

---

<!-- Source: guides/cn/CONTRIBUTING.md -->
# Contributing a Guide

Want to help teach Gradio? Consider contributing a Guide! 🤗

Broadly speaking, there are two types of guides:

- **Use cases**: guides that cover step-by-step how to build a particular type of machine learning demo or app using Gradio. Here's an example: [_Creating a Chatbot_](https://github.com/gradio-app/gradio/blob/master/guides/creating_a_chatbot.md)
- **Feature explanation**: guides that describe in detail a particular feature of Gradio. Here's an example: [_Using Flagging_](https://github.com/gradio-app/gradio/blob/master/guides/using_flagging.md)

We encourage you to submit either type of Guide! (Looking for ideas? We may also have open [issues](https://github.com/gradio-app/gradio/issues?q=is%3Aopen+is%3Aissue+label%3Aguides) where users have asked for guides on particular topics)

## Guide Structure

As you can see with the previous examples, Guides are standard markdown documents. They usually:

- start with an Introduction section describing the topic
- include subheadings to make articles easy to navigate
- include real code snippets that make it easy to follow along and implement the Guide
- include embedded Gradio demos to make them more interactive and provide immediate demonstrations of the topic being discussed. These Gradio demos are hosted on [Hugging Face Spaces](https://huggingface.co/spaces) and are embedded using the standard \<iframe\> tag.

## How to Contribute a Guide

1. Clone or fork this `gradio` repo
2. Add a new markdown document with a descriptive title to the `/guides` folder
3. Write your Guide in standard markdown! Embed Gradio demos wherever helpful
4. Add a list of `related_spaces` at the top of the markdown document (see the previously linked Guides for how to do this)
5. Add 3 `tags` at the top of the markdown document to help users find your guide (again, see the previously linked Guides for how to do this)
6. Open a PR to have your guide reviewed

That's it! We're looking forward to reading your Guide 🥳

---

<!-- Source: guides/CONTRIBUTING.md -->
# Contributing a Guide

Want to help teach Gradio? Consider contributing a Guide! 🤗

Broadly speaking, there are two types of guides:

- **Use cases**: guides that cover step-by-step how to build a particular type of machine learning demo or app using Gradio. Here's an example: [_Creating a Chatbot_](https://github.com/gradio-app/gradio/blob/master/guides/creating_a_chatbot.md)
- **Feature explanation**: guides that describe in detail a particular feature of Gradio. Here's an example: [_Using Flagging_](https://github.com/gradio-app/gradio/blob/master/guides/using_flagging.md)

We encourage you to submit either type of Guide! (Looking for ideas? We may also have open [issues](https://github.com/gradio-app/gradio/issues?q=is%3Aopen+is%3Aissue+label%3Aguides) where users have asked for guides on particular topics)

## Guide Structure

As you can see with the previous examples, Guides are standard markdown documents. They usually:

- start with an Introduction section describing the topic
- include subheadings to make articles easy to navigate
- include real code snippets that make it easy to follow along and implement the Guide
- include embedded Gradio demos to make them more interactive and provide immediate demonstrations of the topic being discussed. These Gradio demos are hosted on [Hugging Face Spaces](https://huggingface.co/spaces) and are embedded using the standard \<iframe\> tag.

## How to Contribute a Guide

1. Clone or fork this `gradio` repo
2. Add a new markdown document with a descriptive title to the `/guides` folder
3. Write your Guide in standard markdown! Embed Gradio demos wherever helpful
4. Add a list of `related_spaces` at the top of the markdown document (see the previously linked Guides for how to do this)
5. Add 3 `tags` at the top of the markdown document to help users find your guide (again, see the previously linked Guides for how to do this)
6. Open a PR to have your guide reviewed

That's it! We're looking forward to reading your Guide 🥳
