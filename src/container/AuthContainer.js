import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../component";
import IcAuthCenter from "../assets/icons/ic-auth-center.svg";

const AuthContainer = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen min-w-full bg-gradient-to-b from-primary via-orange-400 to-primary">
      {!location.pathname.includes("/auth/signin") && <Header />}
      <div className="flex flex-col p-4 pt-20">
        <img
          className="absolute w-screen max-w-2xl object-contain left-0 right-0 top-0 bottom-0 m-auto"
          src={IcAuthCenter}
          alt="background"
        />
        <Outlet />
      </div>
    </div>
  );
};

export default AuthContainer;
