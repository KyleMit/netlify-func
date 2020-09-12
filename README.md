# Demo Repo for Debugging Netlify Functions in VS Code

See this thread in stack overflow for more details

[Debug Netlify Functions in VS Code](https://stackoverflow.com/q/63864022/1366033)

----

I'm trying to set a breakpoint inside of a netlify function that is executed via `netlify dev` with the following setup:

## Setup

### Install [Netlify-CLI][1]

```bash
npm install netlify-cli -g
```

### `netlify.toml`

```toml
[build]
  functions = "functions/"
```

### `functions/hello.js`

```js
exports.handler = async(event, context) => {
    let output = `Hello, ${event.queryStringParameters.name}`
    return { statusCode: 200, body: output};
}
```

Here's a [sample project][10] with the setup

### Run

You should be able to run normally via `netlify dev` 

[![netlify dev screenshot][2m]][2]

Which will expose the function at the following address:

<pre><code><a href="http://localhost:8888/.netlify/functions/hello?name=Kyle">http://localhost:8888/.netlify/functions/hello?name=Kyle</a></code></pre>

## Debugging Attempts

### `Launch.config`

In VSCode, you should be able to setup debugging with a `launch.config`.  I've tried the following configuration

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "program": "${workspaceFolder}\\node_modules\\.bin\\netlify",
      "args": ["dev"]
    }
  ]
}
```

But I get the following error:

```bash
C:\Program Files\nodejs\node.exe .\node_modules\.bin\netlify dev
Uncaught c:\Users\kylemit\Documents\code\netlify-func\node_modules\.bin\netlify:2
basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")
          ^^^^^^^

SyntaxError: missing ) after argument list
<node_internals>/internal/modules/cjs/loader.js:991
Process exited with code 1
```

### Node `--inspect`

There are lots of examples that leverage the [`--inspect` switch`][3] for node, but I can't figure out how to get that to work with VS Code Breakpoints.

### Other Threads

* [Any way to debug functions? #409][4]
* [Netlify Dev functions - debugging and other issues][5]
* [Running netlify functions in a debugger][6]
* [Debug lambda functions locally #71][7]
* [Debugging help / using `--inspect` flag throws "error : unknown option" #148][8]
* [Debug netlify lambda functions][9]

[1]: https://www.npmjs.com/package/netlify-cli
[2]: https://i.stack.imgur.com/ep49d.png
[2m]: https://i.stack.imgur.com/ep49dm.png
[3]: https://nodejs.org/en/docs/guides/debugging-getting-started/
[4]: https://github.com/netlify/cli/issues/409
[5]: https://community.netlify.com/t/netlify-dev-functions-debugging-and-other-issues/4429
[6]: https://community.netlify.com/t/running-netlify-functions-in-a-debugger/9758/3
[7]: https://github.com/netlify/netlify-lambda/issues/71
[8]: https://github.com/netlify/netlify-lambda/issues/148
[9]: https://stackoverflow.com/q/63703439/1366033
[10]: https://github.com/KyleMit/netlify-func-debug
