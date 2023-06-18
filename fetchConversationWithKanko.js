import { fetchConversation } from "./fetchConversation.js";
import { Day } from "https://js.sabae.cc/DateTime.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { shuffle } from "https://js.sabae.cc/shuffle.js";

const funcs = {
  getLatestSurvey: {
    definition: {
      description: "福井県内の指定観光地の評判をCSVデータ取得する",
      parameters: {
        type: "object",
        properties: {
          place: {
            type: "string",
            descritpino: "場所",
          },
        },
        required: ["place"]
      }
    },
    func: async (param) => {
      if (!param || !param.place) {
        return "場所を特定できないので、回答できません";
      }

      const dt = new Day();
      const fn1 = "monthly/" + dt.toStringYMD().substring(0, 6) + ".csv";
      const data1 = await CSV.fetchJSON("https://code4fukui.github.io/fukui-kanko-survey/" + fn1);
      const fn2 = "monthly/" + dt.prevMonth().toStringYMD().substring(0, 6) + ".csv";
      const data2 = await CSV.fetchJSON("https://code4fukui.github.io/fukui-kanko-survey/" + fn2);
      const data = data1.concat(data2);

      const makeCSV = (data) => {
        shuffle(data);
        const info = data.filter(d => {
          const p = param.place;
          //return d.回答エリア.indexOf(p) >= 0 || d.市町村.indexOf(p) >= 0 || d.満足度の理由.indexOf(p) >= 0;
          return (d.市町村.indexOf(p) >= 0 || d.回答エリア.indexOf(p) >= 0) && d.満足度の理由.length > 20;
        });
        console.log(param.place, info.length + " / " + data.length);
        if (info.length == 0) {
          return null;
        }
        const maxinfo = 8;
        while (info.length > maxinfo) {
          info.splice(0, info.length - maxinfo);
        }
        const csv = CSV.stringify(info);
        //console.log(csv);
        return csv;
      };
      const res = makeCSV(data);
      if (res) {
        return res;
      }
      const dataall = await CSV.fetchJSON("https://code4fukui.github.io/fukui-kanko-survey/all.csv");
      const res2 = makeCSV(dataall);
      if (res2) {
        return res2;
      }
      return "データがありませんんでした。"
    },
  },
};

export const fetchConversationWithKanko = async (messages) => await fetchConversation(messages, funcs);
