import useEngineStore from "@/storage/engines";
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

  const onInput = (e) => {
    const value = inputRef.current?.value;
    setContent(value);
  };

  useEffect(() => {
    if (!inputRef) {
      return;
    }

    setRef(inputRef);
    inputRef.current.addEventListener("input", onInput);
    return () => {
      inputRef.current.removeEventListener("input", onInput);
      setRef(null);
    };
  }, [inputRef]);

  useDebounceEffect(
    () => {
      setDebounceValue(content);
    },
    [content],
    {
      wait: 500,
    }
  );

  useEffect(() => {
    console.log("debounceValue", debounceValue);
  }, [debounceValue]);

  useAsyncEffect(async () => {
    if (debounceValue === "") {
      return;
    }

    // TODO: 平台id 读取config,暂时写死方便调试
    const platformId = "baidu";
    const platformParams = engineStore.generalConfigs[platformId];

    const pluginPath = `/plugins/detect/${platformId}.js`;
    const { detect } = await import(/* @vite-ignore */ pluginPath);
    const src = await detect(debounceValue, {
      ...platformParams,
    });

    setDetectSrc(src);
  }, [debounceValue]);

  return { ref, debounceValue, content, detectSrc };
};

export default useSourceInput;
