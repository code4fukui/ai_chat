import { getEnv } from "./getEnv.js";

const KEY = await getEnv("OPENAI_API_KEY");

const fetchCompletions = async (req) => {
  const url = "https://api.openai.com/v1/completions";
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

export const fetchChat = async (prompt) => {
  const req = {
    model: "text-davinci-003",
    model: "gpt-3.5-turbo",
    prompt,
    temperature: 0.9,
    max_tokens: 1921,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: ["Human:", "Bot:"],
  };
  console.log(req);
  const res = await fetchCompletions(req);
  console.log(res);
  return res.choices[0].text;
};
