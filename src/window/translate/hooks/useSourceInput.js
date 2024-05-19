import useEngineStore from "@/storage/engines";
import useTranslateApp from "@/stores/translate";
import { useAsyncEffect, useDebounceEffect } from "ahooks";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

const useSourceInput = (props) => {
  const { inputRef } = props;
  const [ref, setRef] = useState(null);

  const [content, setContent] = useState("");
  const [debounceValue, setDebounceValue] = useState("");
  const [detectSrc, setDetectSrc] = useState("");

  const engineStore = useEngineStore(
    useShallow((state) => ({
      generalConfigs: state.generalConfigs,
    }))
  );

  const { setContentType, setDetectLanguage, setContentToStore } =
    useTranslateApp(
      useShallow((state) => ({
        setContentToStore: state.setContent,
        setContentType: state.setContentType,
        setDetectLanguage: state.setDetectLanguage,
      }))
    );

  const onInput = (e) => {
    const value = inputRef.current?.value;
    setContent(value);
  };

  const onKeyup = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      return;
    }

    console.log("after");
  };

  useEffect(() => {
    if (!inputRef) {
      return;
    }

    setRef(inputRef);
    inputRef.current.addEventListener("input", onInput);
    inputRef.current.addEventListener("keydown", onKeyup);
    return () => {
      inputRef.current.removeEventListener("input", onInput);
      inputRef.current.removeEventListener("keydown", onKeyup);

      setRef(null);
    };
  }, [inputRef]);

  useDebounceEffect(
    () => {
      setDebounceValue(content.trimEnd());
      setContentToStore(content.trimEnd());
    },
    [content],
    {
      wait: 500,
    }
  );

  /** 检测内容是单词,还是句子,还是网页等信息 */
  useEffect(() => {
    let contentType = "";
    if (debounceValue.includes(" ")) {
      contentType = "paragraph";
    } else if (debounceValue.includes(".")) {
      contentType = "web";
    } else {
      contentType = "word";
    }

    setContentType(contentType);
  }, [debounceValue]);

  useAsyncEffect(async () => {
    if (debounceValue === "") {
      return;
    }

    // TODO: 平台id 读取config,暂时写死方便调试
    const platformId = "baidu";
    const platformParams = engineStore.generalConfigs[platformId];

    // const pluginPath = `/plugins/detect/${platformId}.js`;
    // const { detect } = await import(/* @vite-ignore */ pluginPath);
    // const src = await detect(debounceValue, {
    //   ...platformParams,
    // });

    // setDetectSrc(src);

    // const platformId = "hack_tencent";
    // const plugin = await import(`/plugins/${platformId}.js`);
    // const src = await plugin.detect(debounceValue);
    // setDetectSrc(src);

    const plugin = await import(/* @vite-ignore */ `/plugins/${platformId}.js`);
    const src = await plugin.detect(debounceValue, {
      ...platformParams,
    });
    setDetectSrc(src);
  }, [debounceValue]);

  useEffect(() => {
    // 写入检测的语言内容
    setDetectLanguage(detectSrc);
  }, [detectSrc]);

  return { ref, debounceValue, content, detectSrc };
};

export default useSourceInput;
