# ai_chat

ターミナルでコンピューターと会話できます。

## 使い方

[OpenAI API](https://platform.openai.com/account/api-keys)で[シークレットキーを作成](https://beta.openai.com/docs/quickstart/build-your-application)してください。

.envを編集する
```
OPENAI_API_KEY=****
```
もしくは環境変数を設定する
```
export OPENAI_API_KEY=****
```

### サーバー・Webアプリとして

```sh
deno run -A aichat.js
```

- http://localhost:8000/

## APIとして

[Deno](https://deno.land)で
```js
import { fetchChat } from "https://code4fukui.github.io/ai_chat/fetchChat.js"
console.log(await fetchChat("How about you?"));
```

## コマンドラインから

```sh
deno run -A https://code4fukui.github.io/ai_chat/ai.js "Who are you?"
```

レスポンスが得られます
```
Robot: I'm a robot.
```

## Fine-tuning

fine-tuningのための学習データ[finetune-ichigo.csv](finetune-ichigo.csv)を準備

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

idをtraining_fileとして使う
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
finished_atが有効になるまで待つ

fine_tuned_modelをmodelとして使う
```sh
deno run -A fetchConversationByModel.example.js ft:gpt-3.5-turbo-0613:jig-jp::7r27I7v8 お名前は？
```

```
いちごくんだよ
```

## ブログ

- https://fukuno.jig.jp/3788
- https://fukuno.jig.jp/3843
- https://fukuno.jig.jp/3892
- https://fukuno.jig.jp/3978