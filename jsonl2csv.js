import { JSONL } from "https://js.sabae.cc/JSONL.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

const jsonl = Deno.args[0];
const csv = Deno.args[1] || jsonl + ".csv";

const s = await Deno.readTextFile(jsonl);
const data = JSONL.parse(s);
// {"messages": [{"role": "user", "content": "名前は？"}, {"role": "assistant", "content": "いちごくんだよ"}]}
const data2 = data.map(d => {
  return { user: d.messages[0].content, assistant: d.messages[1].content };
});
console.log(data2)
const d = CSV.stringify(data2);
await Deno.writeTextFile(csv, d);
