# ai_chat

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

You can have a conversation with a computer on your terminal.

## Usage

[Create a secret key](https://beta.openai.com/docs/quickstart/build-your-application) on [OpenAI API](https://platform.openai.com/account/api-keys)

Edit `.env`:
```
OPENAI_API_KEY=****
```
or set the environment variables:
```
export OPENAI_API_KEY=****
```

### As a server and web app

```sh
deno run -A aichat.js
```

- http://localhost:8000/

## As an API

In [Deno](https://deno.land):
```js
import { fetchChat } from "https://code4fukui.github.io/ai_chat/fetchChat.js"
console.log(await fetchChat("How about you?"));
```

## As a command

```sh
deno run -A https://code4fukui.github.io/ai_chat/ai.js "Who are you?"
```

You can get the response:
```
Robot: I'm a robot.
```

## Fine-tuning

Prepare JSONL data for fine-tuning: [finetune-ichigo.csv](finetune-ichigo.csv)

```sh
deno run -A csv2jsonl.js finetune-ichigo.csv finetune-ichigo.jsonl
```
→ [finetune-ichigo.jsonl](finetune-ichigo.jsonl)

```sh
OPENAI_API_KEY=xxx
```

```sh
curl https://api.openai.com/v1/files \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F "purpose=fine-tune" \
  -F "file=@finetune-ichigo.jsonl"
```

```json
{
  "object": "file",
  "id": "file-WsnxhG58m7Qo68BgSUgD1gJI",
  "purpose": "fine-tune",
  "filename": "finetune-ichigo.jsonl",
  "bytes": 1349,
  "created_at": 1692877794,
  "status": "uploaded",
  "status_details": null
}
```

Use the ID as `training_file`:
```sh
curl https://api.openai.com/v1/fine_tuning/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "training_file": "file-WsnxhG58m7Qo68BgSUgD1gJI",
    "model": "gpt-3.5-turbo-0613"
  }'
```

```json
{"object":"fine_tuning.job","id":"ftjob-eGRlppKIHD5z1xfTqvmfe292","model":"gpt-3.5-turbo-0613","created_at":1692873565,"finished_at":1692873878,"fine_tuned_model":"ft:gpt-3.5-turbo-0613:jig-jp::7r27I7v8","organization_id":"org-b5mP73M0cMHYNDm2HLCrFmBV","result_files":["file-7MhFfu8BMjn0VbP7ll0yxUlQ"],"status":"succeeded","validation_file":null,"training_file":"file-689IQ8t6U10cbeZaDAx0pvJD","hyperparameters":{"n_epochs":10},"trained_tokens":2680}
```

Wait for `finished_at` to be valid, then use `fine_tuned_model` as the model:
```sh
deno run -A fetchConversationByModel.example.js ft:gpt-3.5-turbo-0613:jig-jp::7r27I7v8 お名前は？
```

```
いちごくんだよ
```

## Blog
- https://fukuno.jig.jp/3788
- https://fukuno.jig.jp/3843
- https://fukuno.jig.jp/3892
- https://fukuno.jig.jp/3978