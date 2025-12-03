import { useEffect } from "react";
import useInput from "../hooks/useInput";
import { getStorageItem, setStorageItem } from "../utils/localStorage";

function ApiSettingsPage({ close }: { close: () => void }) {
  const onInput = useInput();
  const offInput = useInput();
  const initInput = useInput();

  useEffect(() => {
    const checkLocalstorageItems = () => {
      const value = getStorageItem("api");

      if (!value) {
        return;
      }

      onInput.setValue(value.on);
      offInput.setValue(value.off);
      initInput.setValue(value.init);
    };

    checkLocalstorageItems();
  }, []);

  const onClickSave = () => {
    setStorageItem("api", {
      on: onInput.input,
      off: offInput.input,
      init: initInput.input,
    });

    close();
  };

  const onClickQuit = () => {
    window.electron.reqQuitApp();
  };

  const onClickDevToolOpen = () => {
    window.electron.reqOpenDevTools();
  };

  return (
    <div className="absolute flex justify-center items-center top-0 left-0 bg-[rgba(169,169,169,0.5)] w-screen h-screen">
      <div className="bg-black w-[60vw] h-[70vh] p-5 flex flex-col rounded-4xl py-10">
        <div className="w-full h-full flex flex-col gap-y-15 items-center overflow-auto text-white text-3xl">
          <div>
            <span>ON API : </span>
            <input
              id="ON"
              type="text"
              value={onInput.input}
              onChange={onInput.onChange}
              className="w-1/2 border-b ml-5"
            />
          </div>
          <div>
            <span>OFF API : </span>
            <input
              type="text"
              value={offInput.input}
              onChange={offInput.onChange}
              className="w-1/2 border-b ml-5"
            />
          </div>
          <div>
            <span>INIT API: </span>
            <input
              type="text"
              value={initInput.input}
              onChange={initInput.onChange}
              className="w-1/2 border-b ml-5"
            />
          </div>
          <div className="w-full flex justify-end ">
            <button
              onClick={onClickSave}
              className="bg-purple-400 rounded-4xl px-4 py-2 hover:opacity-85 active:opacity-50"
            >
              save
            </button>
          </div>
          <div className="w-full flex items-center justify-between">
            <span>Open Dev Tool: </span>
            <button
              onClick={onClickDevToolOpen}
              className="bg-amber-400 rounded-4xl px-4 py-2 hover:opacity-85 active:opacity-50"
            >
              Open
            </button>
          </div>
          <div className="w-full flex items-center justify-between">
            <span>Close App: </span>
            <button
              onClick={onClickQuit}
              className="bg-red-400 rounded-4xl px-4 py-2 hover:opacity-85 active:opacity-50"
            >
              Bye
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApiSettingsPage;
