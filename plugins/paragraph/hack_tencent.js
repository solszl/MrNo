import { Body, fetch as TauriFetch } from "@tauri-apps/api/http";
import { stringify } from "tiny-querystring";
import { decode } from "../utils/decode";
import { guid } from "../utils/guid";

export const version = "0.0.0";
export const plugin_name = "hack_tencent_paragraph";

const HOST = "aHR0cHM6Ly9mYW55aS5xcS5jb20v";
const URL = "aHR0cHM6Ly9mYW55aS5xcS5jb20vYXBpL3RyYW5zbGF0ZQ=="; // https://fanyi.qq.com/api/translate
const TTS_UTL = "aHR0cHM6Ly9mYW55aS5xcS5jb20vYXBpL3R0cw=="; //https://fanyi.qq.com/api/tts
const SECRET_Q = "aHR0cHM6Ly9mYW55aS5xcS5jb20vYXBpL3JlYXV0aDEyZg=="; // https://fanyi.qq.com/api/reauth12f

var languageList = {
  auto: "自动识别",
  zh: "中文",
  en: "英语",
  jp: "日语",
  kr: "韩语",
  fr: "法语",
  es: "西班牙语",
  it: "意大利语",
  de: "德语",
  tr: "土耳其语",
  ru: "俄语",
  pt: "葡萄牙语",
  vi: "越南语",
  id: "印尼语",
  th: "泰语",
  ms: "马来西亚语",
  ar: "阿拉伯语",
  hi: "印地语",
};

var languagePair = {
  auto: [
    "zh",
    "en",
    "jp",
    "kr",
    "fr",
    "es",
    "it",
    "de",
    "tr",
    "ru",
    "pt",
    "vi",
    "id",
    "th",
    "ms",
  ],
  en: [
    "zh",
    "fr",
    "es",
    "it",
    "de",
    "tr",
    "ru",
    "pt",
    "vi",
    "id",
    "th",
    "ms",
    "ar",
    "hi",
  ],
  zh: [
    "en",
    "jp",
    "kr",
    "fr",
    "es",
    "it",
    "de",
    "tr",
    "ru",
    "pt",
    "vi",
    "id",
    "th",
    "ms",
  ],
  fr: ["zh", "en", "es", "it", "de", "tr", "ru", "pt"],
  es: ["zh", "en", "fr", "it", "de", "tr", "ru", "pt"],
  it: ["zh", "en", "fr", "es", "de", "tr", "ru", "pt"],
  de: ["zh", "en", "fr", "es", "it", "tr", "ru", "pt"],
  tr: ["zh", "en", "fr", "es", "it", "de", "ru", "pt"],
  ru: ["zh", "en", "fr", "es", "it", "de", "tr", "pt"],
  pt: ["zh", "en", "fr", "es", "it", "de", "tr", "ru"],
  vi: ["zh", "en"],
  id: ["zh", "en"],
  ms: ["zh", "en"],
  th: ["zh", "en"],
  jp: ["zh"],
  kr: ["zh"],
  ar: ["en"],
  hi: ["en"],
};

const langMap = {
  zh_cn: "zh",
  ko: "kr",
  en_us: "en",
};

export const translate = async (
  text,
  from = "auto",
  to = "zh",
  options = {}
) => {
  console.log("translate", text, langMap[from] ?? from, langMap[to] ?? to);
  // qtv qtk
  //   let qOptions = {
  //     method: "POST",
  //   };
  //   const { data } = await TauriFetch(decode(SECRET_Q), qOptions);

  const translateOptions = {
    method: "POST",
    headers: {
      Referer: `${decode(HOST)}`,
    },
    body: Body.json({
      source: langMap[from] ?? from,
      target: langMap[to] ?? to,
      sourceText: text,
      ticket: "",
      randstr: "",
      sessionUuid: `translate_uuid${Date.now()}`,
      //   ...data,
    }),
  };

  const {
    data: {
      translate: { errCode, records },
    },
  } = await TauriFetch(decode(URL), translateOptions);

  if (errCode === 0) {
    const pronounce = [];
    // 原文发音100个包含字符,空格
    let originalTTSParam = {
      platform: "PC_Website",
      lang: "en",
      text: text.substr(0, 100),
      guid: guid(),
    };
    // 发音的时候 需要带上Referer
    let originalTtsURL = `${decode(TTS_UTL)}?${stringify(originalTTSParam)}`;

    let translateTTSParam = {
      platform: "PC_Website",
      lang: "zh",
      text,
      guid: guid(),
    };
    let translateTtsURL = `${decode(TTS_UTL)}?${stringify(translateTTSParam)}`;

    pronounce.push({
      label: "original",
      phonetic: "",
      speech: originalTtsURL,
    });
    pronounce.push({
      label: "translate",
      phonetic: "",
      speech: translateTtsURL,
    });
    console.log("tr", records);

    const explains = records.map((record) => {
      return {
        partOfSpeech: "",
        explain: record.targetText,
      };
    });
    return {
      pronounce,
      explains,
    };
  }
};

// fetch("https://fanyi.qq.com/api/translate", {
//   headers: {
//     accept: "application/json, text/javascript, */*; q=0.01",
//     "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
//     "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//     "sec-ch-ua":
//       '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": '"macOS"',
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     uc: "SKZFGlpJZ4DfvWzImS63M++ArgO4IBWlbGt+Oi4YmwI=",
//     "x-requested-with": "XMLHttpRequest",
//   },
//   referrer: "https://fanyi.qq.com/",
//   referrerPolicy: "strict-origin-when-cross-origin",
//   body: "source=en&target=zh&sourceText=Behind+every+successful+man+theres+a+lot+u+unsuccessful+years.+&qtv=9c8f470dec1d2e59&qtk=rV%2BtWAkVJtIrlciznjoIp21BGGXfhsBaXslwHzrHetdd0PfUYPbO4Q9SHlKJz5hirGXSoghWM2sIce%2F9ZE7aGLqoTCmS9i9wSIjcnLlI0M1hHOSdz4eTGOaYMgkCVY7r1zGilC8kTEb19Ht3bD3Sdg%3D%3D&ticket=&randstr=&sessionUuid=translate_uuid1715777972005",
//   method: "POST",
//   mode: "cors",
//   credentials: "include",
// });
