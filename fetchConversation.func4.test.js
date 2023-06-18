import { fetchConversationWithKanko } from "./fetchConversationWithKanko.js";

const messages = [
  { "role": "system", "content": "観光アンケートを分析し、観光を受け入れる側の事業者向けにアドバイスをします" },
  //{ "role": "user", "content": "最近の鯖江市の評判を教えてください。" },
  //{ "role": "user", "content": "どういう人が鯖江市を悪く思ってますか？" },
  //{ "role": "user", "content": "鯖江市の観光地への改善案を作成してください" },
  //{ "role": "user", "content": "福井駅前の観光地への改善案を作成してください" },
  //{ "role": "user", "content": "東尋坊の観光地への改善案を作成してください" },
  { "role": "user", "content": "観光地、芦原温泉への改善案を作成してください" },
];

console.log(await fetchConversationWithKanko(messages));
