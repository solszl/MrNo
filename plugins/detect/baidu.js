export const version = "0.0.0";

const URL = "https://fanyi.baidu.com/langdetect";
const headers = new Headers();
headers.set(
  "User-Agent",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.142.86 Safari/537.36"
);
headers.set("Content-Type", "application/json");

export const detect = async (str, options = {}) => {
  // 传入tauri的fetch 和 Body
  const { fetch, Body } = options;
  const fetchOptions = {
    method: "POST",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.142.86 Safari/537.36",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: Body.form({
      query: str,
    }),
  };

  const { data, ok, status } = await fetch(URL, fetchOptions);
  if (ok && status === 200) {
    return data;
  }
};
