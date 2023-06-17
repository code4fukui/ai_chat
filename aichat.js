import { serveAPI } from "https://js.sabae.cc/wsutil.js";
import { fetchChat } from "./fetchChat.js";
import { fetchConversation } from "./fetchConversation.js";

serveAPI("/api", async (param, req, path) => {
  if (path == "/api/conversation") {
    return await fetchConversation(param);
  }
  return await fetchChat(param);
});
