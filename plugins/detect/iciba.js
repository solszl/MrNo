import CryptoJS from "crypto-js";
const version = "0.0.0";
const plugin_name = "iciba_detect";

const URL = "https://ifanyi.iciba.com/index.php";

const getSign = (q) => {
  q = "6key_web_new_fanyi" + "6dVjYLFyzfkFkk" + q;
  const text = CryptoJS.MD5(q).toString().substring(0, 16);
  const message = CryptoJS.enc.Utf8.parse(text);
  const key = CryptoJS.enc.Utf8.parse("L4fBtD5fLC9FQw22");
  const result = CryptoJS.AES.encrypt(message, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();

  return encodeURIComponent(result);
};

const decryptContent = (content) => {
  const ciphertext = CryptoJS.enc.Base64.parse(content);
  const key = CryptoJS.enc.Utf8.parse("aahc3TfyfCEmER33");
  const result = CryptoJS.AES.decrypt({ ciphertext }, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });

  return JSON.parse(CryptoJS.enc.Utf8.stringify(result));
};

export const detect = async (str, options = {}) => {
  const sign = getSign(str);
  const { fetch, Body } = options;
  const fetchOptions = {
    method: "POST",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.142.86 Safari/537.36",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: Body.form({
      from: "auto",
      to: "auto",
      q: str,
    }),
    query: {
      c: "trans",
      m: "fy",
      client: "6",
      auth_user: "key_web_new_fanyi",
      sign,
    },
  };

  const {
    data: { status, content },
  } = await fetch(
    `${URL}?c=trans&m=fy&client=6&auth_user=key_web_new_fanyi&sign=${sign}`,
    fetchOptions
  );

  if (status === 1) {
    const { from } = decryptContent(content);
    return from;
  }
};
