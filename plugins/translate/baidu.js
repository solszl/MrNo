export const version = "0.0.0";
export const plugin_name = "baidu_translate";

const URL = "https://fanyi-api.baidu.com/api/trans/vip/translate";

export const translate = async (from, to, words, options = {}) => {
  const { fetch, Body } = options;

  console.log(from, to, words);
};
