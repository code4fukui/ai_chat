import { fetchConversation } from "./fetchConversation.js";

const messages = [
  { "role": "system", "content": "あなたは社長の秘書です。" },
  //{ "role": "user", "content": "来週か再来週で、社長と30分ほど、鯖江で打ち合わせできる時間ありますか？" },
  //{ "role": "user", "content": "来週か再来週で、社長と30分ほど、東京で打ち合わせできる時間ありますか？" },
  { "role": "user", "content": "来週か再来週で、社長と30分ほど、なるはやで登録してください" },
];

const funcs = {
  getSlots: {
    definition: {
      description: "社長の空き時間を取得する",
      parameters: {
        type: "object",
        properties: {
          date: {
            type: "string",
            description: "日時",
          },
          during: {
            type: "string",
            descritpino: "時間",
          },
          place: {
            type: "string",
            descritpino: "場所",
          },
        },
        required: ["date", "during", "place"]
      }
    },
    func: (param) => {
      if (!param || !param.date) {
        return "日時を特定できないので、回答できません";
      }
      const res = "鯖江にて 6/18 10:00〜12:00, 鯖江にて 6/18 15:00〜15:30, 鯖江にて 6/18 17:00〜18:00";
      //const res = param.name + "の電気を付けられませんでした";
      console.log(param, res);
      return res;
    },
  },
  setSlot: {
    definition: {
      description: "社長の予定を登録する",
      parameters: {
        type: "object",
        properties: {
          datetime: {
            type: "string",
            description: "日付と時間 (YYYY-MM-DDThh:mm 形式)",
          },
          during: {
            type: "string",
            descritpino: "時間",
          },
          place: {
            type: "string",
            descritpino: "場所",
          },
        },
        required: ["date", "during", "place"]
      }
    },
    func: (param) => {
      if (!param || !param.datetime) {
        return "日時を特定できないので、登録できません";
      }
      const res = param.datetime + "から" + param.during + "、" + param.place + "での社長の予定を押さえました。お気をつけてお越しください"; 
      console.log(param, res);
      return res;
    },
  },
};
console.log(await fetchConversation(messages, funcs));
