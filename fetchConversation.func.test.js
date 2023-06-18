import { fetchConversation } from "./fetchConversation.js";

const messages = [
//  { "role": "user", "content": "子供部屋のエアコンの電気を付けて" },
  { "role": "user", "content": "LEDを付けて" },
];
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
};
console.log(await fetchConversation(messages, funcs));
