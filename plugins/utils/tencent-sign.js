import CryptoJS from "crypto-js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

let host = "tmt.tencentcloudapi.com";
const service = "tmt";
let region = "ap-beijing";
let action = "LanguageDetect";
let timestamp = `${dayjs().unix()}`;
let date = "2024-05-11";
const version = "2018-03-21";
const algorithm = "TC3-HMAC-SHA256";

let sId, sKey, credentialScope, signedHeaders, hashedRequestPayload;

const tencentSignature = (payload, options) => {
  const { secretId, secretKey } = options;
  sId = secretId;
  sKey = secretKey;

  const { action: act, region: reg, host: h } = options;
  action = act;
  if (reg) {
    region = reg;
  }

  if (h) {
    host = h;
  }

  timestamp = `${dayjs().unix()}`;
  date = dayjs().utc().format("YYYY-MM-DD");

  const canonicalRequest = step1(JSON.stringify(payload), host);

  const stringToSign = step2(canonicalRequest);
  const signature = step3(stringToSign);
  const authorization = step4(signature);
  const headers = step5(authorization);
  return { headers };
};

/** 步骤 1：拼接规范请求串 */
const step1 = (payload, host) => {
  signedHeaders = "content-type;host";
  hashedRequestPayload = getHash(payload);
  const httpRequestMethod = "POST";
  const canonicalUri = "/";
  const canonicalQueryString = "";

  const canonicalHeaders =
    "content-type:application/json\n" + "host:" + host + "\n";

  const canonicalRequest =
    httpRequestMethod +
    "\n" +
    canonicalUri +
    "\n" +
    canonicalQueryString +
    "\n" +
    canonicalHeaders +
    "\n" +
    signedHeaders +
    "\n" +
    hashedRequestPayload;

  return canonicalRequest;
};

/** 步骤 2：拼接待签名字符串 */
const step2 = (canonicalRequest) => {
  const algorithm = "TC3-HMAC-SHA256";
  const hashedCanonicalRequest = getHash(canonicalRequest);
  credentialScope = `${date}/${service}/tc3_request`;
  const stringToSign = `${algorithm}\n${timestamp}\n${credentialScope}\n${hashedCanonicalRequest}`;

  return stringToSign;
};

/** 步骤 3：计算签名 */
const step3 = (stringToSign) => {
  const kDate = sha256(date, "TC3" + sKey);
  const kService = sha256(service, kDate);
  const kSigning = sha256("tc3_request", kService);
  const signature = CryptoJS.enc.Hex.stringify(sha256(stringToSign, kSigning));
  return signature;
};

/** 步骤 4：拼接 Authorization */
const step4 = (signature) => {
  const authorization = `${algorithm} Credential=${sId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  return authorization;
};

/** 步骤 5：构造并发起请求 */
const step5 = (authorization) => {
  const headers = {
    Authorization: authorization,
    "Content-Type": "application/json",
    Host: host,
    "X-TC-Action": action,
    "X-TC-Timestamp": timestamp,
    "X-TC-Version": version,
  };

  if (region) {
    headers["X-TC-Region"] = region;
  }

  return headers;
};

const getHash = (message) => {
  const hash = CryptoJS.SHA256(message).toString();
  return CryptoJS.enc.Hex.stringify(CryptoJS.enc.Hex.parse(hash));
};

const sha256 = (message, secret) => {
  return CryptoJS.HmacSHA256(message, secret);
};

export default tencentSignature;
