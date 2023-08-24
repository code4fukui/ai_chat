import { JSONL } from "https://js.sabae.cc/JSONL.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

const csv = Deno.args[0];
const jsonl = Deno.args[1] || csv + ".jsonl";

const s = await Deno.readTextFile(csv);
const data = CSV.parse(s);
// {"messages": [{"role": "user", "content": "名前は？"}, {"role": "assistant", "content": "いちごくんだよ"}]}
const data2 = data.map(d => {
  return { messages: [
    { role: "user", content: d.user },
    { role: "assistant", content: d.assistant }
  ]}
});
console.log(data2)
const d = JSONL.stringify(data2);
await Deno.writeTextFile(jsonl, d);
