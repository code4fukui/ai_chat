import { fetchCompletions, log } from "./openai.js";
import { DateTime } from "https://js.sabae.cc/DateTime.js";

export const fetchChat = async (prompt) => {
  const req = {
    //model: "gpt-3.5-turbo", // gpt-3.5-turbo and gpt-3.5-turbo-0301 are supported.
    model: "gpt-4o-2024-11-20",
    messages: [
      { "role": "user", "content": prompt },
    ],
  };
  //console.log(prompt);
  const res = await fetchCompletions(req);
  //console.log(res);
  const answer = res.error ? "error: " + res.error.message : res.choices[0].message.content;
  //const answer = res.choices[0].message.content;
  const dt = new DateTime();
  const data = { dt, prompt, answer };
  await log(dt, data);
  return answer;
};
