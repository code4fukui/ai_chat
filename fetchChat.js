import { DateTime } from "https://js.sabae.cc/DateTime.js";
import { getEnv } from "./getEnv.js";

// https://platform.openai.com/docs/api-reference/chat/create

const KEY = await getEnv("OPENAI_API_KEY");

const fetchCompletions = async (req) => {
  const url = "https://api.openai.com/v1/chat/completions";
  const opt = req ? {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + KEY,
    },
    body: JSON.stringify(req),
  } : null;
  const res = await (await fetch(url, opt)).json();
  return res;
};

await Deno.mkdir("log", { recursive: true });

export const fetchChat = async (prompt) => {
  const req = {
    model: "gpt-3.5-turbo", // gpt-3.5-turbo and gpt-3.5-turbo-0301 are supported.
    messages: [
      { "role": "user", "content": prompt },
    ],
  };
  const res = await fetchCompletions(req);
  const answer = res.choices[0].message.content;
  const dt = new DateTime();
  const data = { dt, prompt, answer };
  await Deno.writeTextFile("log/" + dt.day.toString() + ".ndjson", JSON.stringify(data) + "\n");
  return answer;
};
