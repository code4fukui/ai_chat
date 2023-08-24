import { getEnv } from "./getEnv.js";

const KEY = await getEnv("OPENAI_API_KEY");

// https://platform.openai.com/docs/api-reference/chat/create

const fetchAPI = async (url, req) => {
  const opt = {
    method: req ? "POST" : "GET",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + KEY,
    },
    body: req ? JSON.stringify(req) : undefined,
  };
  const res = await (await fetch(url, opt)).json();
  return res;
};

export const fetchCompletions = async (req) => {
  const url = "https://api.openai.com/v1/chat/completions";
  const res = await fetchAPI(url, req);
  return res;
};

let allowlog = true;
try {
  await Deno.mkdir("log", { recursive: true });
} catch (e) {
  allowlog = false;
}
export const log = async (dt, data) => {
  if (allowlog) {
    await Deno.writeTextFile("log/" + dt.day.toString() + ".jsonl", JSON.stringify(data) + "\n", { append: true });
  }
};

export const getModels = async () => {
  return await fetchAPI("https://api.openai.com/v1/models");
};
