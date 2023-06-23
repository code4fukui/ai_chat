# ai_chat

You can have a conversation with a computer on your terminal.

## Usage

[create a secret key](https://beta.openai.com/docs/quickstart/build-your-application) on [OpenAI API](https://platform.openai.com/account/api-keys)

edit .env
```
OPENAI_API_KEY=****
```
or set the environment variables
```
export OPENAI_API_KEY=****
```

### as a server and web app

```sh
deno run -A aichat.js
```

- http://localhost:8000/

## as an API

in [Deno](https://deno.land)
```js
import { fetchChat } from "https://code4fukui.github.io/ai_chat/fetchChat.js"
console.log(await fetchChat("How about you?"));
```

## as a command

```sh
deno run -A https://code4fukui.github.io/ai_chat/ai.js "Who are you?"
```

you can get the response
```
Robot: I'm a robot.
```

## blog

- https://fukuno.jig.jp/3788
- https://fukuno.jig.jp/3843
- https://fukuno.jig.jp/3892
- https://fukuno.jig.jp/3978
