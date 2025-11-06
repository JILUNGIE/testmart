import { useEffect } from "react";
import { Outlet } from "react-router";

function Layout() {
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
    </div>
  );
}

export default Layout;
