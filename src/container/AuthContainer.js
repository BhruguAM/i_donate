import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../component";
import IcAuthCenter from "../assets/icons/ic-auth-center.svg";
import { useHeaderContext } from "../context";
// import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

const AuthContainer = () => {
  const location = useLocation();
  const { setMainHeader } = useHeaderContext();

  useEffect(() => {
    window.scrollTo(0, 0);
    setMainHeader(false);
  }, [location.pathname]);

  // showTargetElement = () => {
  //   // ... some logic to show target element

  //   // 4. Disable body scroll
  //   disableBodyScroll(this.targetElement);
  // };

  // hideTargetElement = () => {
  //   // ... some logic to hide target element

  //   // 5. Re-enable body scroll
  //   enableBodyScroll(this.targetElement);
  // };

  return (
    <div className="min-h-screen min-w-full bg-gradient-to-b from-primary via-orange-400 to-primary">
      {!location.pathname.includes("/auth/signin") && <Header auth />}
      <div
        className={`flex flex-col px-5 ${
          !location.pathname.includes("/auth/signin") ? "pt-20" : "pt-2"
        } pb-3 h-full overflow-auto`}
      >
        <img
          className="absolute w-screen max-w-2xl object-contain inset-0 m-auto"
          src={IcAuthCenter}
          alt="background"
        />
        <Outlet />
      </div>
    </div>
  );
};

export default AuthContainer;
