import { useEffect, useState } from "react";
//import { useNavigate } from "react-router";
import Button from "../components/Button";
import HiddenButton from "../components/HiddenButton";
import ApiSettingsPage from "./ApiSettingsPage";
import { useNavigate } from "react-router";

function SmilePage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const oneMin = 1000 * 60 * 1;
  useEffect(() => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      navigate("/");
    }, oneMin);
  }, []);
  return (
    <div className="flex pt-10 flex-col w-screen h-screen justify-center items-center bg-black text-white text-3xl">
      <div className="w-full flex flex-1 gap-5">
        <Button variant="blue" flex={1}>
          ON
        </Button>
        <Button variant="red" flex={2}>
          OFF
        </Button>
        <Button flex={1} variant="gray">
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
        <span>NUVI가 열심히 공기청정 중이에요!</span>
        <HiddenButton open={() => setIsOpen(true)} />
      </div>

      {isOpen && <ApiSettingsPage close={() => setIsOpen(false)} />}
    </div>
  );
}

export default SmilePage;
