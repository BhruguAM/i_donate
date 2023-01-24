import React, { useEffect, useState } from "react";
import IcDonte from "../../assets/icons/ic-logo.svg";
import IcUser from "../../assets/icons/ic-user.svg";
import IcPhone from "../../assets/icons/ic-phone.svg";
import IcPassword from "../../assets/icons/ic-password.svg";
import IcPassShow from "../../assets/icons/ic-pass-show.png";
import IcPassHide from "../../assets/icons/ic-pass-hide.png";
import { Button, InputText } from "../../component";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const navigate = useNavigate();
  const [memberId, setMemberId] = useState(false);
  const [member, setMember] = useState("");
  const [mobileNo, setMobileNo] = useState(false);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState(false);
  const [paswordData, setPasswordData] = useState("");
  const [passType, setPassType] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-full">
      <img className="w-24 object-contain" src={IcDonte} alt="background" />
      <label className="font-inter font-semibold text-4xl text-white mt-3">
        iDonate
      </label>
      <div
        className={`px-5 py-5 shadow-md mb-5 rounded-md bg-white w-full max-w-2xl z-10 mt-16`}
      >
        <div className="flex w-full">
          <label
            className={`border-b ${
              memberId ? "border-primary" : "border-gray-300"
            } text-sm text-greyout mt-4 pb-2 pr-2`}
          >
            <img src={IcUser} className="h-5 object-contain" alt="p" />
          </label>
          <InputText
            id={"id"}
            onFocus={() => setMemberId(true)}
            onBlur={() => setMemberId(false)}
            extraclassName={"mt-4 pb-2 w-full"}
            type={"text"}
            value={member}
            placeholder={"Member ID"}
            onChange={(e) => setMember(e.target.value)}
          />
        </div>
        <label className="flex text-center items-center justify-center text-primary font-semibold mt-4 mb-1">
          OR
        </label>
        <div className="flex w-full">
          <label
            className={`border-b ${
              mobileNo ? "border-primary" : "border-gray-300"
            } text-sm text-greyout mt-4 pb-2 pr-2`}
          >
            <img src={IcPhone} className="h-5 object-contain" alt="p" />
          </label>
          <InputText
            id={"number"}
            onFocus={() => setMobileNo(true)}
            onBlur={() => setMobileNo(false)}
            extraclassName={"mt-4 pb-2 w-full"}
            type={"number"}
            value={mobile}
            placeholder={"Phone Number"}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        <div className="flex w-full">
          <label
            className={`border-b ${
              password ? "border-primary" : "border-gray-300"
            } text-sm text-greyout mt-4 pb-2 pr-2`}
          >
            <img src={IcPassword} className="h-5 object-contain" alt="p" />
          </label>
          <InputText
            id={"password"}
            onFocus={() => setPassword(true)}
            onBlur={() => setPassword(false)}
            extraclassName={"mt-4 pb-2 w-full"}
            type={!passType ? "text" : "password"}
            value={paswordData}
            placeholder={"Password"}
            onChange={(e) => setPasswordData(e.target.value)}
          />
          <label
            onClick={() => setPassType(!passType)}
            className={`border-b ${
              password ? "border-primary" : "border-gray-300"
            } text-sm text-greyout mt-4 pb-2 pl-2`}
          >
            <img
              src={passType ? IcPassShow : IcPassHide}
              className="h-5 object-contain"
              alt="p"
            />
          </label>
        </div>
      </div>
      <Button extraClass={"max-w-2xl"} white={true} title={"Login"} />
      <Button
        onClick={() => navigate("/donation")}
        extraClass={"max-w-2xl mt-4"}
        secondary
        title={"Continue As a guest"}
      />
      <text className="text-lg font-medium text-white mt-5">
        {"Don’t have an account?"}{" "}
        <span
          onClick={() => console.log("signin")}
          className="font-bold text-xl cursor-pointer"
        >
          {"Sign Up"}
        </span>
      </text>
    </div>
  );
};
