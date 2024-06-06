import { serveAPI } from "https://js.sabae.cc/wsutil.js";
import { fetchChat } from "./fetchChat.js";
import { fetchConversation } from "./fetchConversation.js";
import { fetchConversationWithKanko } from "./fetchConversationWithKanko.js";
import { fetchConversationByModel } from "./fetchConversationByModel.js";
import { getModels } from "./openai.js";
import { fetchImageRecog } from "https://code4fukui.github.io/openai-imagerecog/fetchImageRecog.js"

serveAPI("/api", async (param, req, path) => {
  if (path == "/api/conversation") {
    return await fetchConversation(param);
  } else if (path == "/api/conversation-kanko") {
    return await fetchConversationWithKanko(param);
  } else if (path == "/api/conversation-ichigo") {
    return await fetchConversationByModel("ft:gpt-3.5-turbo-0613:jig-jp::7r27I7v8", param);
  } else if (path == "/api/models") {
    return await getModels();
  } else if (path == "/api/imagerecog") {
    return await fetchImageRecog(param.imgbin, param.prompt);
  }
  return await fetchChat(param);
});
