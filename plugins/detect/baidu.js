import { Body, fetch as TauriFetch } from "@tauri-apps/api/http";
import CryptoJS from "crypto-js";

export const version = "0.0.0";
export const plugin_name = "baidu_detect";

const URL = "https://fanyi-api.baidu.com/api/trans/vip/language";

/**
 * @see https://fanyi-api.baidu.com/product/113
 */
export const detect = async (str, options = {}) => {
  // 平台信息
  const { appId, secretKey } = options;

  const salt = `${Date.now()}`;
  const sign = CryptoJS.MD5(appId + str + salt + secretKey).toString();
  const fetchOptions = {
    method: "POST",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.142.86 Safari/537.36",
    },
    body: Body.form({
      q: str,
      salt,
      appid: appId,
      sign,
    }),
  };

  // console.log("options", fetchOptions);
  const { data } = await TauriFetch(URL, fetchOptions);

  if (data.error_code === 0) {
    const {
      data: { src },
    } = data;
    return src;
  }

  // language not support
  if (data.error_code === "54009") {
    return "-";
  }

  // const {
  //   data: {
  //     error_code,
  //     data: { src },
  //   },
  // } = await TauriFetch(URL, fetchOptions);

  // if (error_code === 0) {
  //   console.log("detect src", src);
  //   return src;
  // }

  return "-";
};

// const langMap = {
//   jp,
//   zh,
//   en,
//   kor,
//   th,
//   vie,
//   ru,
// };
