import { fetchConversation } from "./fetchConversation.js";

const messages = [
//  { "role": "user", "content": "子供部屋のエアコンの電気を付けて" },
  { "role": "user", "content": "外が暗ければLEDを付けて" },
//  { "role": "user", "content": "その部屋は暗いですか？" },
];
const dark = true;

const funcs = {
  turnOn: {
    definition: {
      description: "電気を付ける",
      parameters: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "対象",
          }
        },
        required: ["name"]
      }
    },
    func: (param) => {
      if (!param || !param.name) {
        return "対象を特定できないので、電気を付けられませんでした";
      }
      const res = param.name + "の電気を付けました";
      //const res = param.name + "の電気を付けられませんでした";
      console.log(res);
      return res;
    },
  },
  isDark: {
    definition: {
      description: "暗いか確認する",
      parameters: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "対象",
          }
        },
        required: ["name"]
      }
    },
    func: (param) => {
      if (!param || !param.name) {
        return "対象を特定できないので、確認できませんでした";
      }
      const res = param.name + (dark ? "は暗いです" : "は暗くありません");
      console.log(res);
      return res;
    },
  },
};
console.log(await fetchConversation(messages, funcs));
