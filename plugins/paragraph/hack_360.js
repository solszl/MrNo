import { Body, fetch as TauriFetch } from "@tauri-apps/api/http";
import { stringify } from "tiny-querystring";
import { decode } from "../utils/decode";

export const version = "0.0.0";
export const plugin_name = "hack_360_paragraph";

const HOST = "ZmFueWkuc28uY29t";
const URL = "aHR0cHM6Ly9mYW55aS5zby5jb20vaW5kZXgvc2VhcmNo";
const KEY = { 英: "en_uk", 美: "en_us" };

export const translate = async (text, from = "en", to = "zh", options = {}) => {
  // 360 目前段落翻译只支持en => zh
  const fetchOptions = {
    method: "POST",
    headers: {
      pro: "fanyi",
      authority: decode(HOST),
    },
    body: Body.form({}),
  };

  const qs = {
    eng: 1,
    validate: "",
    ignore_trans: 0,
    query: text,
  };

  const {
    data: { error, data },
  } = await TauriFetch(`${decode(URL)}?${stringify(qs)}`, fetchOptions);

  if (error === 0) {
    const {
      explain: {
        /** 语音 */
        speech,
        /** 翻译 */
      },
      fanyi,
      /** 翻以前的发音以及翻译后的发音*/
      speak_url: { speak_url, tSpeak_url },
    } = data;

    const pronounce = [];
    if (speak_url) {
      pronounce.push({
        label: "original",
        phonetic: "",
        speech: `https://${decode(HOST)}${speak_url}`,
      });
    }

    if (tSpeak_url) {
      pronounce.push({
        label: "translate",
        phonetic: "",
        speech: `https://${decode(HOST)}${tSpeak_url}`,
      });
    }
    return {
      pronounce,
      explains: [{ partOfSpeech: "", explain: fanyi }],
    };
  }

  return null;
};
