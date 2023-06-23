import { fetchCompletions, log } from "./openai.js";
import { DateTime } from "https://js.sabae.cc/DateTime.js";

const parseJSON = (s) => {
  try {
    return JSON.parse(s);
  } catch (e) {
  }
  return null;
};

export const fetchConversation = async (messages, funcs) => {
  let functions = undefined;
  if (funcs) {
    functions = [];
    for (const [name, val] of Object.entries(funcs)) {
      functions.push({ name, ...val.definition });
    }
  }
  const req = {
    messages,
    functions,
  };
  const comp = async () => {
    for (;;) {
      const len = new TextEncoder().encode(JSON.stringify(messages) + JSON.stringify(functions)).length;
      //console.log(len);
      req.model = len > 3000 ? "gpt-3.5-turbo-16k-0613" : "gpt-3.5-turbo-0613"; // gpt-3.5-turbo-16k or gpt-3.5-turbo and gpt-3.5-turbo-0301 are supported.
      const res = await fetchCompletions(req);
      if (res.error) {
        return "error: " + res.error.message;
      }
      const fc = res.choices[0].message.function_call;
      if (!fc) {
        return res.choices[0].message.content;
      }
      const f = funcs[fc.name];
      if (!f) {
        return "error: not found func " + f;
      }
      const param = parseJSON(fc.arguments);
      const content = await f.func(param);
      req.messages.push({ role: "function", content, name: fc.name });
    }
  };
  const answer = await comp();
  const dt = new DateTime();
  const data = { dt, messages };
  await log(dt, data);
  return answer;
};
