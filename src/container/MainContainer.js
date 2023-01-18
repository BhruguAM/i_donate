import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../component";

const MainContainer = () => {
  return (
    <div className="min-h-screen min-w-full bg-background">
      <Header />
      <div className="flex flex-col p-4 pt-5">
        <Outlet />
      </div>
    </div>
  );
};

export default MainContainer;
