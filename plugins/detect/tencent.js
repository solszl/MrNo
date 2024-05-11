import { fetch as TauriFetch } from "@tauri-apps/api/http";
import dayjs from "dayjs";
import tencentSignature from "../utils/tencent-sign";

export const version = "0.0.0";
export const plugin_name = "tencent_detect";

const URL = "https://tmt.tencentcloudapi.com";

// docs: https://cloud.tencent.com/document/product/551/15620
// docs: https://cloud.tencent.com/document/product/551/15619
export const detect = async (str, options = {}) => {
  const { SecretKey, SecretId, ProjectId } = options;

  window.t = `${dayjs().unix()}`;
  const payload = {
    Text: str,
    ProjectId: +ProjectId ?? 0,
  };
  const { headers } = tencentSignature(payload, {
    secretId: SecretId,
    secretKey: SecretKey,
    action: "LanguageDetect",
    region: "ap-beijing",
  });

  console.log("headers", headers.Authorization);

  const fetchOptions = {
    method: "POST",
    headers,
    body: {
      type: "Json",
      payload,
    },
  };
  const resp = await TauriFetch(URL, fetchOptions);

  console.log("tencent detect resp:", resp.data);
  return resp;
};
