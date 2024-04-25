/*


      tauri http 模块暂时不支持event-stream, 该插件暂不可用


*/

export const version = "0.0.0";
export const plugin_name = "baidu_ai_translate";

const URL = "https://fanyi.baidu.com/ait/text/translate";

export const translate = async (from, to, words, options = {}) => {
  const { fetch, Body } = options;
  const fetchOptions = {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.142.86 Safari/537.36",
      "Content-Type": "application/json",
    },
    body: Body.json({
      from,
      to,
      query: words,
      milliTimestamp: Date.now(),
    }),
  };

  // const resp = await fetch(URL, fetchOptions);
  // console.log("resp", resp);

  // const reader = resp.body.getReader();
  // console.log("reader", reader);
};
