import { useEffect } from "react";
import useInput from "../hooks/useInput";
//import useFetch from "../hooks/useFetch";

function ApiSettingsPage({ close }: { close: () => void }) {
  const onInput = useInput();
  const offInput = useInput();
  const initInput = useInput();

  //const { data, loading, err } = useFetch("https://www.naver.com");
  useEffect(() => {
    const checkLocalstorageItems = () => {
      const isApi = window.localStorage.getItem("api");

      if (!isApi) {
        return;
      }

      const apiObj = JSON.parse(isApi);

      onInput.setValue(apiObj.on);
      offInput.setValue(apiObj.off);
      initInput.setValue(apiObj.init);
    };

    checkLocalstorageItems();
  }, []);

  const onClick = () => {
    const objString = JSON.stringify({
      on: onInput.input,
      off: offInput.input,
      init: initInput.input,
    });
    window.localStorage.setItem("api", objString);

    close();
  };

  return (
    <div className="absolute flex justify-center items-center top-0 left-0 bg-[rgba(169,169,169,0.5)] w-screen h-screen">
      <div className="bg-black w-[60vw] h-[70vh] p-5 flex flex-col rounded-4xl">
        <div className="w-full h-full flex flex-col justify-around items-center">
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
        </div>
        <button onClick={onClick} className="bg-purple-400 rounded-4xl">
          save
        </button>
      </div>
    </div>
  );
}

export default ApiSettingsPage;
