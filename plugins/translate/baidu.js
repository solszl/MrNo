import { Body, fetch as TauriFetch } from "@tauri-apps/api/http";
import CryptoJS from "crypto-js";

export const version = "0.0.0";
export const plugin_name = "baidu_translate";

const URL = "https://fanyi-api.baidu.com/api/trans/vip/translate";

/**
 * @see https://fanyi-api.baidu.com/product/113
 */
export const translate = async (
  words,
  from = "auto",
  to = "auto",
  options = {}
) => {
  const { appId, secretKey } = options;

  const salt = `${Date.now()}`;
  const sign = CryptoJS.MD5(appId + words + salt + secretKey).toString();

  const fetchOptions = {
    method: "POST",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.142.86 Safari/537.36",
    },
    body: Body.form({
      q: words,
      from,
      to,
      appid: appId,
      salt,
      sign,
    }),
  };

  const resp = await TauriFetch(URL, fetchOptions);
  console.log("resp", resp);
};
