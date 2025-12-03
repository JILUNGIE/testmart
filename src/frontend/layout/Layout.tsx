import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import HiddenButton from "../components/HiddenButton";
import ApiSettingsPage from "../pages/ApiSettingsPage";

function Layout() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    const unsub = window.electron.subscribeChannelMsg((msg) => {
      console.log(msg);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="h-screen w-screen">
      <Outlet />
      <HiddenButton open={() => setIsOpen(true)} />
      {isOpen && <ApiSettingsPage close={() => setIsOpen(false)} />}
    </div>
  );
}

export default Layout;
