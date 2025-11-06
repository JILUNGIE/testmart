import React, { useState } from "react";

function useInput() {
  const [input, setInput] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const setValue = (value: string) => {
    setInput(value);
  };

  return { input, onChange, setValue };
}

export default useInput;
