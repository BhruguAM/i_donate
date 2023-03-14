import React, { useEffect, useState } from "react";
import { Button } from "../../component";
import IcClose from "../../assets/icons/ic-close.svg";
import { useNavigate } from "react-router-dom";
import { useHeaderContext, useLoadingContext } from "../../context";
import { validatePassword } from "../../utils/validate";
import { ForgotPasswordAPI, CheckMemberAPI } from "../../services/auth";
import { ToastMsg } from "../../utils";
import { CheckMember } from "./checkMember";
import { ChangePasswordPage } from "./changePassword";

export const ForgotPassword = ({ setShowing }) => {
  const navigate = useNavigate();
  const { setLoading, Loading } = useLoadingContext();
  const headerCtx = useHeaderContext();

  const [pageState, setState] = useState(0);

  const [memberId, setMemberId] = useState("");
  const [memberIdErr, setMemberIdErr] = useState(false);
  const [memberIdFocus, setMemberIdFocus] = useState(false);

  const [password, setPassword] = useState(false);
  const [passwordData, setPasswordData] = useState("");
  const [passType, setPassType] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [confirmPasswordData, setConfirmPasswordData] = useState("");
  const [confirmPassType, setConfirmPassType] = useState(true);
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    headerCtx.setHeader("Forgot Password");
    headerCtx.setIsBack(true);
  }, []);

  useEffect(() => {
    let disableButton = false;
    if (!validatePassword(passwordData)) {
      disableButton = true;
    }
    if (passwordData !== confirmPasswordData) {
      disableButton = true;
    }
    pageState === 1 && setIsDisable(disableButton);
  }, [passwordData, confirmPasswordData]);

  const onCheckMemberId = async () => {
    if (memberId === "") {
      setMemberIdErr("Please enter member Id");
    } else {
      setLoading(true);
      const res = await CheckMemberAPI({ memberID: memberId.trim() });
      setLoading(false);
      if (res.status) {
        ToastMsg(res.message, "success");
        setState(1);
        setIsDisable(true);
      } else {
        setIsDisable(true);
        setTimeout(() => {
          setIsDisable(false);
        }, 2000);
        ToastMsg(res.message, "error");
      }
    }
  };

  const onChangePassword = async () => {
    setLoading(true);
    // SSSSM-MWC-0001
    // Pass123#
    const res = await ForgotPasswordAPI({
      memberID: memberId.trim(),
      password: passwordData.trim(),
    });

    if (res.status) {
      ToastMsg(res.message, "success");
      setLoading(false);
      navigate("/auth/signin");
    } else {
      setLoading(false);
      ToastMsg(res.message, "error");
    }
  };

  return (
    <div className="flex flex-col w-full px-5">
      {/* <img className="w-24 object-contain" src={IcDonte} alt="background" />
      <label className="font-inter font-semibold text-4xl text-white mt-2 mb-4">
        iDonate
      </label> */}
      <div className="flex justify-between items-center mb-12 mt-4">
        <label className="text-3xl font-bold text-primary">
          Forgot Password
        </label>
        <div onClick={setShowing}>
          <img src={IcClose} className="h-5 w-5 object-contain" alt="X" />
        </div>
      </div>
      <label className="text-xl font-bold text-title mb-4">
        {pageState === 0 ? "Enter Your Member Id" : "Create New Password"}
      </label>
      {pageState === 0 && (
        <label className="text-sm font-bold text-greyOut mb-2">
          {"Enter the member id associated with your"}
          <span className="text-primary">{" iDonate "}</span>
          {"account, than you can advance to reset your account Password."}
        </label>
      )}
      {pageState === 0 ? (
        <CheckMember
          setShowing={setShowing}
          memberId={memberId}
          setMemberId={(value) => {
            setMemberIdErr(false);
            setMemberId(value);
          }}
          memberIdFocus={memberIdFocus}
          setMemberIdFocus={setMemberIdFocus}
          memberIdErr={memberIdErr}
        />
      ) : (
        <ChangePasswordPage
          password={password}
          setPassword={setPassword}
          passType={passType}
          passwordData={passwordData}
          setPasswordData={setPasswordData}
          setPassType={setPassType}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          confirmPassType={confirmPassType}
          confirmPasswordData={confirmPasswordData}
          setConfirmPasswordData={setConfirmPasswordData}
          setConfirmPassType={setConfirmPassType}
        />
      )}
      <Button
        disabled={isDisable}
        onClick={() =>
          pageState === 0 ? onCheckMemberId() : onChangePassword()
        }
        extraClass={"z-10"}
        title={pageState === 0 ? "Next" : "Change Password"}
      />
    </div>
  );
};
