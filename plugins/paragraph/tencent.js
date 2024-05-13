import { fetch as TauriFetch } from "@tauri-apps/api/http";
import tencentSignature from "../utils/tencent-sign";

export const supportedLanguage = {
  // prettier-ignore
  zh: ["zh-TW", "en", "ja", "ko", "fr", "es", "it", "de", "tr", "ru", "pt", "vi", "id", "th", "ms"],
  // prettier-ignore
  en: ["zh", "zh-TW", "ja", "ko", "fr", "es", "it", "de", "tr", "ru", "pt", "vi", "id", "th", "ms", "ar", "hi"],
  ja: ["zh", "zh-TW", "en", "ko"],
};

export const version = "0.0.0";
export const plugin_name = "tencent_paragraph_translate";

const URL = "https://tmt.tencentcloudapi.com";

export const translate = async (text, from, to, options) => {
  const { SecretKey, SecretId, ProjectId } = options;

  const payload = {
    SourceText: text,
    Source: from,
    Target: to,
    ProjectId: +ProjectId ?? 0,
  };

  console.log("payload", payload, options);
  const { headers } = tencentSignature(payload, {
    secretId: SecretId,
    secretKey: SecretKey,
    action: "TextTranslate",
  });

  const fetchOptions = {
    method: "POST",
    headers,
    body: {
      type: "Json",
      payload,
    },
  };

  const resp = await TauriFetch(URL, fetchOptions);
  console.log(resp.data);
  return resp;
};
