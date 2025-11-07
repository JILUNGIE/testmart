import { useEffect } from "react";
import { Outlet } from "react-router";
import useFile from "../hooks/useFile";

function Layout() {
  const { files } = useFile();
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
      <Outlet context={{ files }} />
    </div>
  );
}

export default Layout;
