import React, { useEffect, useState } from "react";
import IcDonate from "../../assets/icons/ic-logo.svg";
import IcUser from "../../assets/icons/ic-user.svg";
import IcPhone from "../../assets/icons/ic-phone.svg";
import IcPassword from "../../assets/icons/ic-password.svg";
import IcPassShow from "../../assets/icons/ic-pass-show.png";
import IcPassHide from "../../assets/icons/ic-pass-hide.png";
import { Button, InputText, SlideUpModal } from "../../component";
import { useNavigate } from "react-router-dom";
import { useHeaderContext, useLoadingContext } from "../../context";
import { SignInAPI } from "../../services/auth";
import { deleteStorage, setWithExpiry, ToastMsg } from "../../utils";
import { ForgotPassword } from "../forgotPassword";

export const SignIn = () => {
  const navigate = useNavigate();
  const headerCtx = useHeaderContext();
  const { setLoading } = useLoadingContext();
  const [memberId, setMemberId] = useState(false);
  const [member, setMember] = useState("");
  const [memberErr, setMemberErr] = useState(false);
  const [mobileNo, setMobileNo] = useState(false);
  const [mobile, setMobile] = useState("");
  const [mobileErr, setMobileErr] = useState(false);
  const [password, setPassword] = useState(false);
  const [paswordData, setPasswordData] = useState("");
  const [paswordDataErr, setPasswordDataErr] = useState(false);
  const [passType, setPassType] = useState(true);
  const [isShowing, setShowing] = useState(false);

  useEffect(() => {
    headerCtx.setHeader("");
    headerCtx.setIsBack(false);
  }, []);

  // useEffect(() => {
  //   if (member === "") {
  //     if (mobile.trim().length !== 10) {
  //       setDisable(true);
  //     } else {
  //       setDisable(false);
  //     }
  //   } else {
  //     if (member.trim().length !== 6) {
  //       setDisable(true);
  //     } else {
  //       setDisable(false);
  //     }
  //   }
  //   if (paswordData.trim().length < 8) {
  //     setDisable(true);
  //   } else {
  //     setDisable(false);
  //   }
  // }, [member, mobile, paswordData]);

  const checkFields = () => {
    let isDisable = false;
    if (member === "") {
      if (mobile.trim().length !== 10) {
        isDisable = true;
        setMobileErr("Please enter mobile no");
      }
    } else {
      if (member.trim().length < 6) {
        isDisable = true;
        setMemberErr("Please enter member id");
      }
    }
    if (paswordData.trim().length < 8) {
      isDisable = true;
      setPasswordDataErr("Please enter password");
    }
    if (!isDisable) {
      onSignIn();
    }
  };

  const onSignIn = async () => {
    setLoading(true);
    let body = { password: paswordData };
    if (member !== "") {
      body = { ...body, memberId: member };
    } else {
      body = { ...body, phone: mobile };
    }
    const res = await SignInAPI(body);
    if (res.status) {
      setLoading(false);
      deleteStorage("token");
      deleteStorage("member");
      ToastMsg(res.message, "success");
      setWithExpiry("token", res.data.token);
      setWithExpiry("member", res.data.member_details);
      navigate("/");
    } else {
      setLoading(false);
      ToastMsg(res.message, "error");
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full pt-[5vh]">
      <SlideUpModal
        isShowing={isShowing}
        setShowing={() => setShowing(false)}
        ModalContent={<ForgotPassword setShowing={() => setShowing(false)} />}
      />
      <img
        className="max-w-[30vw] min-w-24 object-contain"
        src={IcDonate}
        alt="background"
      />
      <label className="font-inter font-semibold text-4xl text-white mt-2">
        iDonate
      </label>
      <div
        className={`px-5 pb-5 pt-2 shadow-xl mb-5 rounded-xl bg-primaryBg w-full max-w-2xl z-10 mt-[3vh]`}
      >
        <div className="flex w-full">
          <label
            className={`border-b ${
              memberErr
                ? "border-red-700"
                : memberId
                ? "border-lineColor"
                : "border-gray-300"
            } text-sm text-greyOut mt-4 pb-2 pr-2`}
          >
            <img src={IcUser} className="h-5 object-contain" alt="p" />
          </label>
          <InputText
            id={"id"}
            isError={memberErr}
            onFocus={() => setMemberId(true)}
            onBlur={() => setMemberId(false)}
            extraClassName={"mt-4 pb-2 w-full"}
            type={"text"}
            value={member}
            placeholder={"Member ID"}
            onChange={(e) => {
              setMobile("");
              setMemberErr(false);
              setMember(e.target.value);
            }}
          />
        </div>
        <label className="flex text-center items-center justify-center text-primary font-semibold mt-4 mb-1">
          OR
        </label>
        <div className="flex w-full">
          <label
            className={`border-b ${
              mobileErr
                ? "border-red-700"
                : mobileNo
                ? "border-lineColor"
                : "border-gray-300"
            } text-sm text-greyOut mt-4 pb-2 pr-2`}
          >
            <img src={IcPhone} className="h-5 object-contain" alt="p" />
          </label>
          <InputText
            id={"number"}
            isError={mobileErr}
            onFocus={() => setMobileNo(true)}
            onBlur={() => setMobileNo(false)}
            extraClassName={"mt-4 pb-2 w-full"}
            type={"number"}
            value={mobile}
            maxLength={10}
            placeholder={"Phone Number"}
            onChange={(e) => {
              setMember("");
              setMobileErr(false);
              e.target.validity.valid && setMobile(e.target.value);
            }}
          />
        </div>
        <div className="flex w-full mt-2">
          <label
            className={`border-b ${
              paswordDataErr
                ? "border-red-700"
                : password
                ? "border-lineColor"
                : "border-gray-300"
            } text-sm text-greyOut mt-4 pb-2 pr-2`}
          >
            <img src={IcPassword} className="h-5 object-contain" alt="p" />
          </label>
          <InputText
            id={"password"}
            isError={paswordDataErr}
            maxLength={16}
            minLength={8}
            onFocus={() => setPassword(true)}
            onBlur={() => setPassword(false)}
            extraClassName={"mt-4 pb-2 w-full"}
            type={!passType ? "text" : "password"}
            value={paswordData}
            placeholder={"Password"}
            onChange={(e) => {
              setPasswordDataErr(false);
              setPasswordData(e.target.value);
            }}
          />
          <label
            onClick={() => setPassType(!passType)}
            className={`border-b ${
              password ? "border-lineColor" : "border-gray-300"
            } text-sm text-greyOut mt-4 pb-2 pl-2`}
          >
            <img
              src={passType ? IcPassShow : IcPassHide}
              className="h-5 object-contain"
              alt="p"
            />
          </label>
        </div>
      </div>
      <Button
        onClick={() => checkFields()}
        white={true}
        title={"Login"}
        extraClass={"max-w-2xl z-10"}
      />
      <label className="max-w-2xl text-base text-white mt-[1vh] z-10 text-right flex items-end justify-end w-full">
        <span
          className="cursor-pointer"
          onClick={() => {
            setShowing(true);
          }}
          // onClick={() => navigate("/auth/forgotPassword")}
        >
          {"Forgot password?"}
        </span>
      </label>
      <label className="text-lg font-medium text-white mt-[4vh] z-10 text-center">
        {"Don’t have an account? "}
        <span
          onClick={() => navigate("/auth/signup")}
          className="font-bold cursor-pointer"
        >
          {"SIGN UP"}
        </span>
      </label>
      <Button
        onClick={() => navigate("/donation")}
        extraClass={"max-w-2xl mt-[1.5vh] z-10"}
        secondary
        title={"Continue As a guest"}
      />
      <div className="flex flex-1 justify-center items-end mt-[4vh]">
        <label className="text-base font-medium text-white z-10 text-center">
          <span
            // onClick={() => navigate("/auth/signup")}
            className="font-bold cursor-pointer underline"
          >
            {"Privacy Policy"}
          </span>
          {" and "}
          <span
            // onClick={() => navigate("/auth/signup")}
            className="font-bold cursor-pointer underline"
          >
            {"Terms of Conditions"}
          </span>
        </label>
      </div>
    </div>
  );
};
