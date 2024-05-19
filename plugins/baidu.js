import { Body, fetch as TauriFetch } from "@tauri-apps/api/http";
import CryptoJS from "crypto-js";
import { decode } from "./utils/decode";

export const plugin_name = "baidu";
export const plugin_version = "0.0.0";

export const detect = async (text, options = {}) => {
  const { appId, secretKey } = options;

  const salt = `${Date.now()}`;
  const sign = CryptoJS.MD5(appId + text + salt + secretKey).toString();

  const payload = {
    q: text,
    salt,
    appid: appId,
    sign,
  };
  const fetchOptions = {
    method: "POST",
    headers: {},
    body: Body.form(payload),
  };

  const ENDPOINT =
    "aHR0cHM6Ly9mYW55aS1hcGkuYmFpZHUuY29tL2FwaS90cmFucy92aXAvbGFuZ3VhZ2U=";
  const { data } = await TauriFetch(decode(ENDPOINT), fetchOptions);

  if (data.error_code === 0) {
    const {
      data: { src },
    } = data;
    return src;
  }

  if (data.error_code === "54009") {
    return "-";
  }

  return "-";
};

export const word = async (text, from, to, options = {}) => {};

export const paragraph = async (text, from, to, options = {}) => {};
