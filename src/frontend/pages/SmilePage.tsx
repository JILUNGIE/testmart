import { useEffect } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { getStorageItem } from "../utils/localStorage";

function SmilePage() {
  const navigate = useNavigate();
  const oneMin = 1000 * 60 * 1;
  useEffect(() => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      navigate("/");
    }, oneMin);
  }, []);

  const onClickOnBtn = async () => {
    const url = getStorageItem("api");
    if (!url) {
      return;
    }

    try {
      const res = await fetch(url.on, {
        method: "POST",
      });
      const json = await res.json();

      console.log(json);
    } catch (err) {
      console.log(err);
    }
  };

  const onClickOffBtn = async () => {
    const url = getStorageItem("api");
    if (!url) {
      return;
    }

    try {
      const res = await fetch(url.off, {
        method: "POST",
      });
      const json = await res.json();

      console.log(json);
    } catch (err) {
      console.log(err);
    }
  };

  const onClickInitBtn = async () => {
    const url = getStorageItem("api");
    if (!url) {
      return;
    }

    try {
      const res = await fetch(url.init, {
        method: "POST",
      });
      const json = await res.json();

      console.log(json);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex pt-10 flex-col w-screen h-screen justify-center items-center bg-black text-white text-6xl">
      <div className="w-full flex flex-1 gap-5">
        <Button variant="blue" flex={1} onClick={onClickOnBtn}>
          ON
        </Button>
        <Button variant="red" flex={2} onClick={onClickOffBtn}>
          OFF
        </Button>
        <Button flex={1} variant="gray" onClick={onClickInitBtn}>
          INIT
        </Button>
      </div>
      <div onClick={() => navigate("/")} className="flex-2 basis-0 h-[60vh]">
        <img
          className="object-cover w-full h-full"
          src="emotion_air_purifier.gif"
        />
      </div>
      <div className="flex-4 bg-gray-800 w-full flex justify-center items-center rounded-4xl">
        <span>열심히 공기청정 중이에요!</span>
      </div>
    </div>
  );
}

export default SmilePage;
