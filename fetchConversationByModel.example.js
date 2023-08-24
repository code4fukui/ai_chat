import { fetchConversationByModel } from "./fetchConversationByModel.js";

const model = Deno.args[0];
const content = Deno.args[1];
const messages = [{ role: "user", content }];
const res = await fetchConversationByModel(model, messages);
console.log(res);
