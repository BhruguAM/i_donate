import React from "react";
import IcPassword from "../../assets/icons/ic-password.svg";
import IcPassShow from "../../assets/icons/ic-pass-show.png";
import IcPassHide from "../../assets/icons/ic-pass-hide.png";
import { InputText } from "../../component";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";

export const ChangePasswordPage = ({
  password,
  setPassword,
  passType,
  passwordData,
  setPasswordData,
  setPassType,
  confirmPassword,
  setConfirmPassword,
  confirmPassType,
  confirmPasswordData,
  setConfirmPasswordData,
  setConfirmPassType,
}) => {
  return (
    <div className="w-full z-10">
      <div className={`pt-5 pb-8 mb-5 w-full`}>
        <div className="flex w-full">
          <label
            className={`border-b ${
              password ? "border-lineColor" : "border-gray-300"
            } text-sm text-greyOut mt-4 pb-2 pr-2`}
          >
            <img src={IcPassword} className="h-5 object-contain" alt="p" />
          </label>
          <InputText
            maxLength={16}
            minLength={8}
            id={"password"}
            onFocus={() => setPassword(true)}
            onBlur={() => setPassword(false)}
            extraClassName={"mt-4 pb-2 w-full"}
            type={!passType ? "text" : "password"}
            value={passwordData}
            placeholder={"Enter New Password"}
            onChange={(e) => setPasswordData(e.target.value)}
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
        <div className="flex w-full mt-3">
          <label
            className={`border-b ${
              confirmPassword ? "border-lineColor" : "border-gray-300"
            } text-sm text-greyOut mt-4 pb-2 pr-2`}
          >
            <img src={IcPassword} className="h-5 object-contain" alt="p" />
          </label>
          <InputText
            maxLength={16}
            minLength={8}
            id={"confirm Password"}
            onFocus={() => setConfirmPassword(true)}
            onBlur={() => setConfirmPassword(false)}
            extraClassName={"mt-4 pb-2 w-full"}
            type={!confirmPassType ? "text" : "password"}
            value={confirmPasswordData}
            placeholder={"Confirm Password"}
            onChange={(e) => setConfirmPasswordData(e.target.value)}
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
      <div className={`pt-5 pb-5 mb-5 bg-primaryBg w-full max-w-2xl z-10`}>
        <div className="flex items-center">
          <div className={`items-center justify-center flex mr-2`}>
            {/[A-Z]/.test(passwordData) ? (
              <CheckIcon className="h-5 w-5" aria-hidden="true" color="green" />
            ) : (
              <XMarkIcon className="h-5 w-5" aria-hidden="true" color="red" />
            )}
          </div>
          <label className="text-base text-primary">Uppercase</label>
        </div>
        <div className="flex items-center">
          <div className={`items-center justify-center flex mr-2`}>
            {/[a-z]/.test(passwordData) ? (
              <CheckIcon className="h-5 w-5" aria-hidden="true" color="green" />
            ) : (
              <XMarkIcon className="h-5 w-5" aria-hidden="true" color="red" />
            )}
          </div>
          <label className="text-base text-primary">Lowercase</label>
        </div>
        <div className="flex items-center">
          <div className={`items-center justify-center flex mr-2`}>
            {/[0-9]/.test(passwordData) ? (
              <CheckIcon className="h-5 w-5" aria-hidden="true" color="green" />
            ) : (
              <XMarkIcon className="h-5 w-5" aria-hidden="true" color="red" />
            )}
          </div>
          <label className="text-base text-primary">Number</label>
        </div>
        <div className="flex items-center">
          <div className={`items-center justify-center flex mr-2`}>
            {/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(passwordData) ? (
              <CheckIcon className="h-5 w-5" aria-hidden="true" color="green" />
            ) : (
              <XMarkIcon className="h-5 w-5" aria-hidden="true" color="red" />
            )}
          </div>
          <label className="text-base text-primary">Special</label>
        </div>
        <div className="flex items-center">
          <div className={`items-center justify-center flex mr-2`}>
            {passwordData.length >= 8 ? (
              <CheckIcon className="h-5 w-5" aria-hidden="true" color="green" />
            ) : (
              <XMarkIcon className="h-5 w-5" aria-hidden="true" color="red" />
            )}
          </div>
          <label className="text-base text-primary">8 character long</label>
        </div>
        <div className="flex items-center">
          <div className={`items-center justify-center flex mr-2`}>
            {confirmPasswordData !== "" ? (
              passwordData === confirmPasswordData ? (
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
    </div>
  );
};
