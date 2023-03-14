import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { createWorker, PSM } from "tesseract.js";

import IcUser from "../../assets/icons/ic-user.svg";
import icLocation from "../../assets/icons/ic-location.svg";
import IcEmail from "../../assets/icons/ic-email.svg";
import IcZip from "../../assets/icons/ic-zip.svg";
import IcCity from "../../assets/icons/ic-city.svg";
import { Button, Dropdown, InputText, LogoutPopup } from "../../component";
import {
  useHeaderContext,
  useLoadingContext,
  useModalContext,
} from "../../context";
// import { useDonationList } from "../../services/donation";
import { validateEmail } from "../../utils/validate";
import { getWithExpiry, setWithExpiry, ToastMsg } from "../../utils";
import { UpdateUserAPI } from "../../services/auth";
import { ProfileOptions } from "./constant";
import { useNavigate } from "react-router-dom";

export const ProfileScreen = () => {
  const navigate = useNavigate();
  const member = getWithExpiry("member");
  // const { data, isFetching } = useDonationList();
  const headerCtx = useHeaderContext();

  const { setOpen, setOkay, ModalData } = useModalContext();

  useEffect(() => {
    headerCtx.setHeader("Profile");
    headerCtx.setIsBack(false);
    headerCtx.setMainHeader(true);
    headerCtx.setSearchBar(false);
    // console.log("member", member);
    // console.log("dateee", new Date(member.birth_date));
  }, []);

  const onLogout = () => {
    ModalData(<LogoutPopup setOkay={setOkay} setOpen={setOpen} />);
    setOkay(false);
    setOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-full">
      <div className=" bg-primaryCard mb-11 px-5 shadow-xl max-w-2xl w-full">
        {ProfileOptions.map((i, k, arr) => (
          <div
            key={"profile" + k}
            onClick={() => navigate(i.path)}
            className={`w-full flex items-center ${
              arr.length !== k + 1 && "border-b border-lineColor"
            } cursor-pointer`}
          >
            <img
              src={i.icon}
              className={"h-5 w-5 object-contain my-4"}
              alt="user"
            />
            <label className="text-base font-semibold text-title ml-4">
              {i.title}
            </label>
          </div>
        ))}
      </div>
      <div
        onClick={onLogout}
        className="bg-red-700 max-w-2xl w-full px-4 py-4 mt-2 mb-2 rounded-xl shadow-xl flex items-center justify-center"
      >
        <label className="text-base text-white font-bold">Log Out</label>
      </div>
      <label className="text-sm text-primary font-semibold mt-[5vh]">
        Version Number: 1.1
      </label>
    </div>
  );
};
