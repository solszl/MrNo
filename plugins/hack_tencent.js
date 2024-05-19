import { Body, fetch as TauriFetch } from "@tauri-apps/api/http";
import { stringify } from "tiny-querystring";
import { decode } from "./utils/decode";
import { guid } from "./utils/guid";

// app 内语言常量转换成tx的语言常量
const langMap = {
  zh_cn: "zh",
  ko: "kr",
  en_us: "en",
};

export const plugin_name = "hack_tencent";
export const plugin_version = "0.0.0";

// 检测函数
export const detect = async (text) => {
  const qParam = await getQParam();

  const payload = {
    source: "auto",
    target: "zh",
    sourceText: text,
    ticket: "",
    randstr: "",
    sessionUuid: `translate_uuid${Date.now()}`,
    ...qParam,
  };
  const fetchOptions = {
    method: "POST",
    headers: {
      Referer: decode("aHR0cHM6Ly9mYW55aS5xcS5jb20v"),
    },
    body: Body.json(payload),
  };
  const Q = "aHR0cHM6Ly9mYW55aS5xcS5jb20vYXBpL3RyYW5zbGF0ZQ==";
  const resp = await TauriFetch(decode(Q), fetchOptions);
  const {
    data: {
      translate: { source },
    },
  } = await TauriFetch(decode(Q), fetchOptions);

  return source;
};

// 单词查询函数
export const word = async (text, from, to, options = {}) => {
  const param = {
    sessionUuid: `c${Date.now()}`,
    guid: 1,
    strategy: "textIfNoDict_en",
    source: langMap[from] ?? from,
    target: langMap[to] ?? to,
    sourceText: text,
    platform: "iOS_APP",
  };

  const URL =
    "aHR0cHM6Ly9kaWN0d2ViLnRyYW5zbGF0b3IucXEuY29tL2FwaS9nZXREaWN0RW50cmllcw==";
  const {
    data: { errCode, ocd },
  } = await TauriFetch(`${decode(URL)}?${stringify(param)}`);

  if (errCode === 0) {
    let pronounce = [];
    pronounce.push({
      label: "en_us",
      phonetic: ocd?.phAmE ?? "",
      speech: ocd?.phAmEUrl ?? "",
    });
    pronounce.push({
      label: "en_uk",
      phonetic: ocd?.phBrE ?? "",
      speech: ocd?.phBrEUrl ?? "",
    });
    const { abstract } = ocd;

    const explains = abstract.reduce((prev, curr) => {
      let obj = {
        partOfSpeech: curr["ps"],
        explain: curr["explanation"].join(", "),
      };

      prev.push(obj);

      return prev;
    }, []);

    return {
      pronounce,
      explains,
    };
  }
};

// 段落翻译函数
export const paragraph = async (text, from, to, options = {}) => {
  const qParam = await getQParam();
  const payload = {
    source: langMap[from] ?? from,
    target: langMap[to] ?? to,
    sourceText: text,
    ticket: "",
    randstr: "",
    sessionUuid: `translate_uuid${Date.now()}`,
    ...qParam,
  };

  const fetchOptions = {
    method: "POST",
    headers: {
      Referer: `${decode("aHR0cHM6Ly9mYW55aS5xcS5jb20v")}`,
    },
    body: Body.form(payload),
  };

  const ENDPOINT = "aHR0cHM6Ly9mYW55aS5xcS5jb20vYXBpL3RyYW5zbGF0ZQ==";

  const resp = await TauriFetch(decode(ENDPOINT), fetchOptions);

  const {
    data: {
      translate: { errCode, records },
    },
  } = resp;

  if (errCode === 0) {
    const pronounce = [];
    // 原文发音100个包含字符,空格
    let originalTTSParam = {
      platform: "PC_Website",
      lang: "en",
      text: text.substr(0, 100),
      guid: guid(),
    };
    const TTS_URL = "aHR0cHM6Ly9mYW55aS5xcS5jb20vYXBpL3R0cw==";
    // 发音的时候 需要带上Referer
    let translateTTSParam = {
      platform: "PC_Website",
      lang: "zh",
      text,
      guid: guid(),
    };

    pronounce.push({
      label: "original",
      phonetic: "",
      speech: `${decode(TTS_URL)}?${stringify(originalTTSParam)}`,
    });
    pronounce.push({
      label: "translate",
      phonetic: "",
      speech: `${decode(TTS_URL)}?${stringify(translateTTSParam)}`,
    });

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

const getQParam = async () => {
  const Q = "aHR0cHM6Ly9mYW55aS5xcS5jb20vYXBpL3JlYXV0aDEyZg==";
  const { data } = await TauriFetch(decode(Q), { method: "POST" });
  // { qtv:"", qtk:""}
  return data;
};
