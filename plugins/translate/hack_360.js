import { Body, fetch as TauriFetch } from "@tauri-apps/api/http";
import { stringify } from "tiny-querystring";

export const version = "0.0.0";
export const plugin_name = "hack_360_translate";

const HOST = "ZmFueWkuc28uY29t";
const URL = "aHR0cHM6Ly9mYW55aS5zby5jb20vaW5kZXgvc2VhcmNo";
const KEY = { 英: "en_uk", 美: "en_us" };

export const translate = async (text, from, to, options = {}) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      pro: "fanyi",
      authority: decodeEndpoint(HOST),
    },
    body: Body.form({}),
  };

  const qs = {
    eng: +(from === "en"),
    validate: "",
    ignore_trans: "",
    query: text,
  };

  const {
    data: { error, data },
  } = await TauriFetch(`${decodeEndpoint(URL)}?${stringify(qs)}`, fetchOptions);

  // https://fanyi.so.com/
  console.log(data);
  // 解析正常
  if (error === 0) {
    const {
      explain: {
        /** 发音 */
        phonetic,
        /** 语音 */
        speech,
        /** 翻译 */
        translation,
      },
      /** 翻以前的发音以及翻译后的发音*/
      speak_url,
    } = data;

    // 存在发音数量和语音数量不等的情况.
    const tempObj = { ...phonetic, ...speech }; // 硬合,为了取key
    const pronounce = Object.keys(tempObj).reduce((acc, key) => {
      let obj = {
        label: KEY[key],
        phonetic: phonetic?.[key] ?? "",
        speech: `https://${decodeEndpoint(HOST)}${speech[key]}` || "",
      };
      acc.push(obj);
      return acc;
    }, []);

    const explains = translation.map((s) => {
      const p = s.match(/[A-Za-z.]+/);
      return {
        partOfSpeech: p?.[0] ?? "",
        explain: s.replace(p, ""),
      };
    });

    return {
      pronounce,
      explains,
    };
  }

  return null;
};

const decodeEndpoint = (str) => {
  return window.atob(str);
};
