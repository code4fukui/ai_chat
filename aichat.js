import { serveAPI } from "https://js.sabae.cc/wsutil.js";
import { fetchChat } from "./fetchChat.js";
import { fetchConversation } from "./fetchConversation.js";
import { fetchConversationWithKanko } from "./fetchConversationWithKanko.js";

serveAPI("/api", async (param, req, path) => {
  if (path == "/api/conversation") {
    return await fetchConversation(param);
  } else if (path == "/api/conversation-kanko") {
    return await fetchConversationWithKanko(param);
  }
  return await fetchChat(param);
});
