const q = Deno.args[0];
if (!q) {
  console.log("input [q]");
  close();
}

const req = {
  model: "text-davinci-003",
  prompt: `Human: ${q}？\n`,
  temperature: 0.9,
  max_tokens: 1921,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0.6,
  stop: [" Human:", " AI:"],
};

const KEY = (await Deno.readTextFile(".env")).substring("OPENAI_API_KEY=".length).trim();

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

const res = await fetchCompletions(req);

//console.log(JSON.stringify(res, null, 2));
console.log(res.choices[0].text);
