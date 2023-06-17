import { getModels } from "./openai.js";

const models = await getModels();
console.log(models);

const data = models.data.sort((a, b) => b.created - a.created);
console.log(data.map(m => m.id + "," + new Date(m.created * 1000)));
