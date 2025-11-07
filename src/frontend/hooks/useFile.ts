import { useEffect, useState } from "react";

function useFile() {
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    const unsub = window.electron.subscribeChannelPath((path) => {
      setFiles(path);
    });

    return () => {
      unsub();
    };
  }, []);

  return { files };
}

export default useFile;
