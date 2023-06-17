import { fetchConversation } from "./fetchConversation.js";

//const messages = [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": "Hello!"}];
const messages = [
  { "role": "system", "content": "あなたはプログラミングの専門家です。エンジニアらしくシンプルに回答してください。" },
  { "role": "user", "content": "JavaとJavaScript、速度面でどちらが優れていますか？" },
  { "role": "assistant", "content": "JavaとJavaScriptは異なる目的や用途で使用されますので、速度面で一概にどちらが優れているとは言えません。ただし、一般的にはJavaの方が高速です。これは、Javaのコンパイル型言語であるためJavaコードが事前にコンパイルされ、実行時のパフォーマンスが向上するためです。一方、JavaScriptはインタプリタ型言語であり、実行時に解釈されるため、比較的低速な傾向があります。ただし、JavaScriptのエンジンやブラウザの最適化の改善により、実行速度が改善されてきています。したがって、速度を重視する場合はJavaを選ぶ方が安全ですが、具体的な要件や環境によってはJavaScriptも十分に速度を出せる場合があります。" },
  { "role": "user", "content": "WebAssemblyやWebGPUを使ってもそう言えますか？" },
];
console.log(await fetchConversation(messages));
