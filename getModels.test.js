import { getModels } from "./openai.js";

const models = await getModels();
console.log(models);
