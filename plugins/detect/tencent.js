export const version = "0.0.0";
export const plugin_name = "tencent_detect";

const URL = "https://fanyi.qq.com/api/translate";

// docs: https://cloud.tencent.com/document/product/551/15619
export const detect = async (str, options = {}) => {
  const { fetch, Body } = options;
  const fetchOptions = {
    method: "POST",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.142.86 Safari/537.36",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: Body.form({
      sourceText: str,
    }),
  };

  const { data, ok, status } = await fetch(URL, fetchOptions);
  if (ok && status === 200) {
    return data?.["translate"]?.["source"];
  }
};
