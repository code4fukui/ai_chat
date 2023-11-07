import { DateTime } from "https://js.sabae.cc/DateTime.js";
import { fetchCompletions, log } from "./openai.js";

const parseJSON = (s) => {
  try {
    return JSON.parse(s);
  } catch (e) {
  }
  return null;
};

export const fetchConversation = async (messages, funcs, useGPT3 = false) => { // messages: [] or { messages, model }
  const maxloop = 5;

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
    model: "gpt-4",
  };
  if (!req.functions) {
    delete req.functions;
  }
  if (messages.messages && messages.model) {
    req.messages = messages.messages;
    req.model = messages.model;
  }
  const comp = async () => {
    for (let i = 0; i < maxloop; i++) {
      const len = new TextEncoder().encode(JSON.stringify(messages) + JSON.stringify(functions)).length;
      //console.log(len);
      //req.model = len > 3000 ? "gpt-3.5-turbo-16k-0613" : "gpt-3.5-turbo-0613"; // gpt-3.5-turbo-16k or gpt-3.5-turbo and gpt-3.5-turbo-0301 are supported.
      //req.model = "gpt-4-0613"; // ok
      //req.model = "gpt-4-0314"; // ChatGPT4を認識していない？
      //req.model = "gpt-4"; // 料金30倍 API使用ok
      if (useGPT3) {
        req.model = len > 3000 ? "gpt-3.5-turbo-16k-0613" : "gpt-3.5-turbo-0613";
      }
      const res = await fetchCompletions(req);
      if (res.error) {
        return "error: " + res.error.message;
      }
      if (res.choices[0].text) {
        return res.choices[0].text.trim();
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
