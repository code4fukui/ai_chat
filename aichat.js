//import { serveAPI } from "https://js.sabae.cc/wsutil.js";
import { serveAPI } from "./wsutil.js";
import { fetchChat } from "./fetchChat.js";

serveAPI("/api", async (param) => {
  return await fetchChat(param);
});
