import React, { useEffect, useState } from "react";
import IcPassword from "../../assets/icons/ic-password.svg";
import IcPassShow from "../../assets/icons/ic-pass-show.png";
import IcPassHide from "../../assets/icons/ic-pass-hide.png";
import IcUser from "../../assets/icons/ic-user.svg";
import { Button, InputText } from "../../component";
import { useNavigate } from "react-router-dom";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useHeaderContext, useLoadingContext } from "../../context";
import { validatePassword } from "../../utils/validate";
import { ChangePasswordAPI } from "../../services/auth";
import { getWithExpiry, ToastMsg } from "../../utils";

export const ChangePassword = () => {
  const navigate = useNavigate();
  const member = getWithExpiry("member");
  const { setLoading } = useLoadingContext();
  const headerCtx = useHeaderContext();
  const [memberId, setMemberId] = useState("");
  const [memberIdErr, setMemberIdErr] = useState(false);
  const [memberIdFocus, setMemberIdFocus] = useState(false);
  const [oldPassword, setOldPassword] = useState(false);
  const [oldPaswordData, setOldPasswordData] = useState("");
  const [oldPaswordDataErr, setOldPasswordDataErr] = useState(false);
  const [oldPassType, setOldPassType] = useState(true);
  const [password, setPassword] = useState(false);
  const [paswordData, setPasswordData] = useState("");
  const [paswordDataErr, setPasswordDataErr] = useState(false);
  const [passType, setPassType] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [confirmPaswordData, setConfirmPasswordData] = useState("");
  const [confirmPaswordDataErr, setConfirmPasswordDataErr] = useState(false);
  const [confirmPassType, setConfirmPassType] = useState(true);
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    headerCtx.setHeader("Change Password");
    headerCtx.setIsBack(true);
    headerCtx.setMainHeader(false);
    headerCtx.setSearchBar(false);
  }, []);

  const onCheckField = () => {
    let disableButton = false;
    if (memberId !== member.memberId) {
      disableButton = true;
      setMemberIdErr("Please enter member Id");
    }
    if (!validatePassword(oldPaswordData)) {
      disableButton = true;
      setOldPasswordDataErr("Please enter current password");
    }
    if (!validatePassword(paswordData)) {
      disableButton = true;
      setPasswordDataErr("Please enter new password");
    }
    if (paswordData !== confirmPaswordData) {
      disableButton = true;
      setConfirmPasswordDataErr("Please enter confirm password");
    }
    if (!disableButton) {
      onChangePassword();
    }
  };

  const onChangePassword = async () => {
    setLoading(true);
    const res = await ChangePasswordAPI({
      memberID: memberId,
      old_password: oldPaswordData,
      new_password: paswordData,
    });
    setLoading(false);
    if (res.status) {
      ToastMsg(res.message, "success");
      navigate("/");
      // navigate("/auth/signin");
    } else {
      ToastMsg(res.message, "error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-full">
      <div className="w-full max-w-2xl mb-3"></div>
      <div
        className={`px-5 pt-5 pb-8 shadow-xl mb-5 rounded-xl bg-primaryCard w-full max-w-2xl z-10`}
      >
        <div className="flex w-full">
          <label
            className={`border-b ${
              memberIdErr
                ? "border-red-700"
                : memberIdFocus
                ? "border-lineColor"
                : "border-gray-300"
            } text-sm text-greyOut mt-4 pb-2 pr-2`}
          >
            <img src={IcUser} className="h-5 object-contain" alt="p" />
          </label>
          <InputText
            id={"id"}
            isError={memberIdErr}
            onFocus={() => setMemberIdFocus(true)}
            onBlur={() => setMemberIdFocus(false)}
            extraClassName={"mt-4 pb-2 w-full"}
            type={"text"}
            value={memberId}
            placeholder={"Enter Member ID"}
            onChange={(e) => {
              setMemberIdErr(false);
              setMemberId(e.target.value);
            }}
          />
        </div>
        <div className="flex w-full mt-2">
          <label
            className={`border-b ${
              oldPaswordDataErr
                ? "border-red-700"
                : oldPassword
                ? "border-lineColor"
                : "border-gray-300"
            } text-sm text-greyOut mt-4 pb-2 pr-2`}
          >
            <img src={IcPassword} className="h-5 object-contain" alt="p" />
          </label>
          <InputText
            maxLength={16}
            minLength={8}
            autoComplete={"new-password"}
            isError={oldPaswordDataErr}
            id={"old password"}
            onFocus={() => setOldPassword(true)}
            onBlur={() => setOldPassword(false)}
            extraClassName={"mt-4 pb-2 w-full"}
            type={!oldPassType ? "text" : "password"}
            value={oldPaswordData}
            placeholder={"Password"}
            onChange={(e) => {
              setOldPasswordDataErr(false);
              setOldPasswordData(e.target.value);
            }}
          />
          <label
            onClick={() => setOldPassType(!passType)}
            className={`border-b ${
              password ? "border-lineColor" : "border-gray-300"
            } text-sm text-greyOut mt-4 pb-2 pl-2 cursor-pointer`}
          >
            <img
              src={oldPassType ? IcPassShow : IcPassHide}
              className="h-5 object-contain"
              alt="p"
            />
          </label>
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
            maxLength={16}
            minLength={8}
            isError={paswordDataErr}
            id={"password"}
            onFocus={() => setPassword(true)}
            onBlur={() => setPassword(false)}
            extraClassName={"mt-4 pb-2 w-full"}
            type={!passType ? "text" : "password"}
            value={paswordData}
            placeholder={"New Password"}
            onChange={(e) => {
              setPasswordDataErr(false);
              setPasswordData(e.target.value);
            }}
          />
          <label
            onClick={() => setPassType(!passType)}
            className={`border-b ${
              password ? "border-lineColor" : "border-gray-300"
            } text-sm text-greyOut mt-4 pb-2 pl-2 cursor-pointer`}
          >
            <img
              src={passType ? IcPassShow : IcPassHide}
              className="h-5 object-contain"
              alt="p"
            />
          </label>
        </div>
        <div className="flex w-full mt-2">
          <label
            className={`border-b ${
              confirmPaswordDataErr
                ? "border-red-700"
                : confirmPassword
                ? "border-lineColor"
                : "border-gray-300"
            } text-sm text-greyOut mt-4 pb-2 pr-2`}
          >
            <img src={IcPassword} className="h-5 object-contain" alt="p" />
          </label>
          <InputText
            maxLength={16}
            minLength={8}
            isError={confirmPaswordDataErr}
            id={"confirm Password"}
            onFocus={() => setConfirmPassword(true)}
            onBlur={() => setConfirmPassword(false)}
            extraClassName={"mt-4 pb-2 w-full"}
            type={!confirmPassType ? "text" : "password"}
            value={confirmPaswordData}
            placeholder={"Confirm Password"}
            onChange={(e) => {
              setConfirmPasswordDataErr(false);
              setConfirmPasswordData(e.target.value);
            }}
          />
          <label
            onClick={() => setConfirmPassType(!confirmPassType)}
            className={`border-b ${
              confirmPassword ? "border-lineColor" : "border-gray-300"
            } text-sm text-greyOut mt-4 pb-2 pl-2 cursor-pointer`}
          >
            <img
              src={confirmPassType ? IcPassShow : IcPassHide}
              className="h-5 object-contain"
              alt="p"
            />
          </label>
        </div>
      </div>
      <div
        className={`px-5 pt-5 pb-5 shadow-xl mb-5 rounded-xl bg-primaryCard w-full max-w-2xl z-10`}
      >
        <div className="flex items-center">
          <div className={`items-center justify-center flex mr-2`}>
            {/[A-Z]/.test(paswordData) ? (
              <CheckIcon className="h-5 w-5" aria-hidden="true" color="green" />
            ) : (
              <XMarkIcon className="h-5 w-5" aria-hidden="true" color="red" />
            )}
          </div>
          <label className="text-base text-primary">Uppercase</label>
        </div>
        <div className="flex items-center">
          <div className={`items-center justify-center flex mr-2`}>
            {/[a-z]/.test(paswordData) ? (
              <CheckIcon className="h-5 w-5" aria-hidden="true" color="green" />
            ) : (
              <XMarkIcon className="h-5 w-5" aria-hidden="true" color="red" />
            )}
          </div>
          <label className="text-base text-primary">Lowercase</label>
        </div>
        <div className="flex items-center">
          <div className={`items-center justify-center flex mr-2`}>
            {/[0-9]/.test(paswordData) ? (
              <CheckIcon className="h-5 w-5" aria-hidden="true" color="green" />
            ) : (
              <XMarkIcon className="h-5 w-5" aria-hidden="true" color="red" />
            )}
          </div>
          <label className="text-base text-primary">Number</label>
        </div>
        <div className="flex items-center">
          <div className={`items-center justify-center flex mr-2`}>
            {/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(paswordData) ? (
              <CheckIcon className="h-5 w-5" aria-hidden="true" color="green" />
            ) : (
              <XMarkIcon className="h-5 w-5" aria-hidden="true" color="red" />
            )}
          </div>
          <label className="text-base text-primary">Special</label>
        </div>
        <div className="flex items-center">
          <div className={`items-center justify-center flex mr-2`}>
            {paswordData.length >= 8 ? (
              <CheckIcon className="h-5 w-5" aria-hidden="true" color="green" />
            ) : (
              <XMarkIcon className="h-5 w-5" aria-hidden="true" color="red" />
            )}
          </div>
          <label className="text-base text-primary">8 character long</label>
        </div>
        <div className="flex items-center">
          <div className={`items-center justify-center flex mr-2`}>
            {confirmPaswordData !== "" ? (
              paswordData === confirmPaswordData ? (
                <CheckIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                  color="green"
                />
              ) : (
                <XMarkIcon className="h-5 w-5" aria-hidden="true" color="red" />
              )
            ) : (
              <XMarkIcon className="h-5 w-5" aria-hidden="true" color="red" />
            )}
          </div>
          <label className="text-base text-primary">Password match</label>
        </div>
      </div>
      <Button
        // disabled={isDisable}
        onClick={() => onCheckField()}
        extraClass={"max-w-2xl z-10"}
        // white={true}
        title={"Change Password"}
      />
    </div>
  );
};
