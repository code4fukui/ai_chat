# ai_chat

You can have a conversation with a computer on your terminal.

## Usage

[create a secret key](https://beta.openai.com/docs/quickstart/build-your-application) on [beta.openai.com](https://beta.openai.com/)

edit .env
```
OPENAI_API_KEY=****
```
or set the environment variables
```
export OPENAI_API_KEY=****
```

```sh
deno run -A ai.js "Who are you?"
```

you can get the response
```
Robot: I'm a robot.
```

## blog

- https://fukuno.jig.jp/3788
- https://fukuno.jig.jp/3843
- https://fukuno.jig.jp/3892
