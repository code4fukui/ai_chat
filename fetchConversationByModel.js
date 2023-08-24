import { fetchCompletions, log } from "./openai.js";
import { DateTime } from "https://js.sabae.cc/DateTime.js";

export const fetchConversationByModel = async (model, messages) => {
  const req = {
    model, // gpt-3.5-turbo", // gpt-3.5-turbo and gpt-3.5-turbo-0301 are supported.
    messages,
  };
  //console.log(prompt);
  const res = await fetchCompletions(req);
  //console.log(res);
  const answer = res.error ? "error: " + res.error.message : res.choices[0].message.content;
  //const answer = res.choices[0].message.content;
  const dt = new DateTime();
  const data = { dt, model, prompt, answer };
  await log(dt, data);
  return answer;
};
