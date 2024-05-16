import { fetch as TauriFetch } from "@tauri-apps/api/http";
import { stringify } from "tiny-querystring";
import { decode } from "../utils/decode";
export const version = "0.0.0";
export const plugin_name = "hack_tencent_translate";

const langMap = {
  zh_cn: "zh",
  ko: "kr",
  en_us: "en",
};

const URL =
  "aHR0cHM6Ly9kaWN0d2ViLnRyYW5zbGF0b3IucXEuY29tL2FwaS9nZXREaWN0RW50cmllcw==";

export const translate = async (str, from, to, options = {}) => {
  const bodyParam = {
    sessionUuid: `c${Date.now()}`,
    guid: 1,
    strategy: "textIfNoDict_en",
    source: langMap[from] ?? from,
    target: langMap[to] ?? to,
    sourceText: str,
    platform: "iOS_APP",
  };
  const {
    data: { errCode, ocd },
  } = await TauriFetch(`${decode(URL)}?${stringify(bodyParam)}`);

  console.log(ocd);
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

  return null;
};
