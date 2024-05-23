import { Body, fetch as TauriFetch } from "@tauri-apps/api/http";
import { stringify } from "tiny-querystring";
import { decode } from "./utils/decode";

export const plugin_name = "hack_youdao";
export const plugin_version = "0.0.0";

// 英法韩日 ja en fr ko

// 单词和段落都是使用一个接口
const HOST =
  "aHR0cHM6Ly9kaWN0LnlvdWRhby5jb20vanNvbmFwaV9zP2RvY3R5cGU9anNvbiZqc29udmVyc2lvbj00";

const VOICE_HOST = "aHR0cHM6Ly9kaWN0LnlvdWRhby5jb20vZGljdHZvaWNl";

const VOICE_TYPE = {
  EN_UK: 1,
  EN_US: 2,
};
const langKeyPath = {
  en: {
    wordPath: ["ec.word"],
    paragraphPath: ["ec.web_trans"],
    trs: "trs",
    phone: [
      { label: "en_uk", key: "ukphone", voice: VOICE_TYPE.EN_UK },
      { label: "en_us", key: "usphone", voice: VOICE_TYPE.EN_US },
    ],
  },
  fr: {
    trs: ["fc.word.trs"],
  },
  ja: {},
  ko: {
    trs: ["kc.word.trs"],
  },
};

export const detect = async (text, options = {}) => {};

export const word = async (text, from, to, options = {}) => {
  const resp = await _internalTranslate(text, from, to, options);
  if (resp) {
    const {
      data: { meta },
    } = resp;

    if (!!!+meta.isHasSimpleDict) {
      console.log("no word2");
      return null;
    }

    let f = from === "auto" ? "en" : from;
    const pathCfg = langKeyPath[f];
    const { wordPath, trs, phone } = pathCfg;
    const explains = _getObjValueByPath(resp.data, `${wordPath}.${trs}`).reduce(
      (prev, curr) => {
        const { pos, tran } = curr;
        prev.push({
          partOfSpeech: pos,
          explain: tran,
        });

        return prev;
      },
      []
    );

    const pronounce = [];
    phone.forEach((p) => {
      pronounce.push({
        label: p.label,
        phonetic: _getObjValueByPath(resp.data, `${wordPath}.${p.key}`),
        speech: `${decode(VOICE_HOST)}?${stringify({
          audio: text,
          le: f,
          type: p.voice,
        })}`,
      });
    });

    return {
      pronounce,
      explains,
    };
  }

  return null;
};

export const paragraph = async (text, from, to, options = {}) => {
  const resp = await _internalTranslate(text, from, to, options);
  if (resp) {
    const {
      data: { meta, fanyi },
    } = resp;

    if (!!!+meta.isHasSimpleDict && !fanyi?.tran) {
      console.log("no translate");
      return null;
    }

    let f = from === "auto" ? "en" : from;
    const pathCfg = langKeyPath[f];
    const { paragraphPath } = pathCfg;
    const explains =
      _getObjValueByPath(resp.data, `${paragraphPath}`)?.reduce(
        (prev, curr) => {
          prev.push({
            partOfSpeech: "",
            explain: curr,
          });
          return prev;
        },
        []
      ) ?? [];

    if (fanyi?.tran) {
      explains.push({
        partOfSpeech: "",
        explain: fanyi.tran,
      });
    }

    const pronounce = [];
    pronounce.push({
      label: "en_us",
      phonetic: "",
      speech: `${decode(VOICE_HOST)}?${stringify({
        audio: text,
        le: f,
        type: VOICE_TYPE.EN_US,
      })}`,
    });
    pronounce.push({
      label: "en_uk",
      phonetic: "",
      speech: `${decode(VOICE_HOST)}?${stringify({
        audio: text,
        le: f,
        type: VOICE_TYPE.EN_UK,
      })}`,
    });

    return {
      pronounce,
      explains,
    };
  }
};

const _internalTranslate = async (text, from, to, options) => {
  const payload = {
    q: text,
    le: from,
    client: "web",
    sign: "3c71569a04e3231adce6ef811c67148a", // 是否一直都是一个?
    keyfrom: "webdict",
  };
  const fetchOptions = {
    method: "POST",
    headers: {},
    body: Body.form(payload),
  };

  const resp = await TauriFetch(decode(HOST), fetchOptions);
  if (!resp.data) {
    return null;
  }

  return resp;
};

const _getObjValueByPath = (obj, path) => {
  return path.split(".").reduce((o, i) => (o ? o[i] : null), obj);
};
