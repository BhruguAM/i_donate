import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import IcBottomBar from "../../assets/icons/ic-bottomBar.svg";
import IcDonation from "../../assets/icons/ic-donation.svg";
import IcHistory from "../../assets/icons/ic-history.svg";
import IcHistoryOrange from "../../assets/icons/ic-history-orange.svg";
import IcUser from "../../assets/icons/ic-user.svg";
import IcUserGrey from "../../assets/icons/ic-user-grey.svg";

export const BottomBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfile, setProfile] = useState(false);
  const [isHistory, setHistory] = useState(false);
  const [isDonation, setDonation] = useState(false);
  useEffect(() => {
    let profile =
      location.pathname === "/profile" ||
      location.pathname === "/personalInfo" ||
      location.pathname === "/changePassword" ||
      location.pathname === "/addressInfo";
    let donation =
      location.pathname === "/donation" ||
      location.pathname === "/donation/details" ||
      location.pathname === "/payment" ||
      location.pathname === "/success";
    let history = location.pathname === "/";
    setProfile(profile);
    setDonation(donation);
    setHistory(history);
  }, [location.pathname]);

  return (
    <div className="h-20 w-full fixed bottom-0 flex justify-center items-end">
      <img
        src={IcBottomBar}
        alt={""}
        className={
          "object-contain max-w-4xl min-w-28 h-20 absolute bottom-0 drop-shadow-xl"
        }
      />
      <div className="bg-white w-full h-[59px] flex justify-center z-50">
        <div className="w-full self-center max-w-sm min-w-60 flex justify-between mx-20">
          <div onClick={() => navigate("/")}>
            <img
              src={isHistory ? IcHistoryOrange : IcHistory}
              className={"h-6 w-6 object-contain"}
              alt={""}
            />
          </div>
          <div
            onClick={() => navigate("/donation")}
            className={`h-14 w-14 -mt-8 rounded-full ${
              isDonation ? "bg-primary" : "bg-slate-400"
            } shadow-2xl flex items-center justify-center border-2 ${
              isDonation ? "border-primaryCard" : "border-background"
            }`}
          >
            <img
              src={IcDonation}
              className={"h-6 w-6 object-contain"}
              alt={""}
            />
          </div>
          <div onClick={() => navigate("/profile")}>
            <img
              src={isProfile ? IcUser : IcUserGrey}
              className={"h-6 w-6 object-contain"}
              alt={""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
