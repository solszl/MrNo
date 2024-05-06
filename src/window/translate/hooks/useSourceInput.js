import { useDebounceEffect } from "ahooks";
import { useEffect, useState } from "react";

const useSourceInput = (props) => {
  const { inputRef } = props;
  const [ref, setRef] = useState(null);

  const [content, setContent] = useState("");
  const [debounceValue, setDebounceValue] = useState("");

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

  return { ref, debounceValue, content };
};

export default useSourceInput;
