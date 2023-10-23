import { getEnv } from "./getEnv.js";
import { DateTime } from "https://js.sabae.cc/DateTime.js";

const KEY = await getEnv("OPENAI_API_KEY");

// https://platform.openai.com/docs/api-reference/chat/create

export const fetchAPI = async (url, req) => {
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
  const urlNew = "https://api.openai.com/v1/chat/completions";
  const urlLegacy = "https://api.openai.com/v1/completions";
  const legacies = ["gpt-3.5-turbo-instruct", "gpt-3.5-turbo-instruct-0914", "babbage-002", "davinci-002"];
  const url = legacies.indexOf(req.model) >= 0 ? urlLegacy : urlNew;
  if (url == urlLegacy) {
    req.prompt = req.messages.map(s => s.content).filter(s => s);
    delete req.messages;
    req.max_tokens = 3000;
  }
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
  const models = await fetchAPI("https://api.openai.com/v1/models");
  const data = models.data.sort((a, b) => b.created - a.created);
  const res = data.map(m => ({ model: m.id, created: new DateTime(m.created * 1000) }));
  return res;
};
