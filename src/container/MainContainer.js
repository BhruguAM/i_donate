import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { BottomBar, Header } from "../component";
import { useHeaderContext } from "../context";
import { getWithExpiry } from "../utils";

const MainContainer = () => {
  const location = useLocation();
  const { isMainHeader } = useHeaderContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div className="min-h-screen min-w-full bg-gray-50 bg-primaryBg flex flex-col justify-between pb-20">
      <div className="w-full">
        <Header />
        <div
          className={`flex flex-col px-5 py-4 ${
            isMainHeader ? "pt-36" : "pt-24"
          }`}
        >
          <Outlet />
        </div>
      </div>
      {getWithExpiry("token") && <BottomBar />}
    </div>
  );
};

export default MainContainer;
