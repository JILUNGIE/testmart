import { useEffect, useState } from "react";

function useFile() {
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    const unsub = window.electron.subscribeChannelPath((path) => {
      console.log(path);
      setFiles(path);
    });

    window.electron.reqGetVideoList();

    return () => {
      unsub();
    };
  }, []);

  return { files };
}

export default useFile;
