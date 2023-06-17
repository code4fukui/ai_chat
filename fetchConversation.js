import { fetchCompletions, log } from "./openai.js";
import { DateTime } from "https://js.sabae.cc/DateTime.js";

export const fetchConversation = async (messages) => {
  const req = {
    model: "gpt-3.5-turbo-16k-0613", // gpt-3.5-turbo-16k or gpt-3.5-turbo and gpt-3.5-turbo-0301 are supported.
    messages,
  };
  const res = await fetchCompletions(req);
  //console.log(res);
  const answer = res.error ? "error: " + res.error.message : res.choices[0].message.content;
  const dt = new DateTime();
  const data = { dt, prompt, messages };
  await log(dt, data);
  return answer;
};
