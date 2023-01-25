import React, { useEffect, useState } from "react";
import IcPassword from "../../assets/icons/ic-password.svg";
import IcPassShow from "../../assets/icons/ic-pass-show.png";
import IcPassHide from "../../assets/icons/ic-pass-hide.png";
import { Button, InputText } from "../../component";
import { useLocation, useNavigate } from "react-router-dom";
import { useHeaderContext, useLoadingContext } from "../../context";
import { validatePassword } from "../../utils/validate";
import { SignUpAPI } from "../../services/auth";
import { ToastMsg } from "../../utils";

export const CreatePassword = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { setLoading } = useLoadingContext();
  const headerCtx = useHeaderContext();
  const [password, setPassword] = useState(false);
  const [paswordData, setPasswordData] = useState("");
  const [passType, setPassType] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [confirmPaswordData, setConfirmPasswordData] = useState("");
  const [confirmPassType, setConfirmPassType] = useState(true);
  const [isDisable, setIsDisable] = useState(true);

  headerCtx.setHeader("Sign Up");
  headerCtx.setIsBack(true);

  useEffect(() => {
    console.log(validatePassword(paswordData));
    let disableButton = false;
    if (!validatePassword(paswordData)) {
      disableButton = true;
    }
    if (paswordData !== confirmPaswordData) {
      disableButton = true;
    }
    setIsDisable(disableButton);
  }, [paswordData, confirmPaswordData]);

  const onSignUp = async () => {
    setLoading(true);
    const res = await SignUpAPI({ ...state, password: paswordData });
    console.log("res", res);
    setLoading(false);
    if (res.status) {
      ToastMsg(res.message, "success");
      navigate("/auth/signin");
    } else {
      ToastMsg(res.message, "error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-full">
      <div className="w-full max-w-2xl mt-10 mb-3">
        <label className="text-3xl font-bold text-white">Create Password</label>
      </div>
      <div
        className={`px-5 pt-5 pb-8 shadow-md mb-5 rounded-md bg-white w-full max-w-2xl z-10`}
      >
        <div className="flex w-full">
          <label
            className={`border-b ${
              password ? "border-primary" : "border-gray-300"
            } text-sm text-greyout mt-4 pb-2 pr-2`}
          >
            <img src={IcPassword} className="h-5 object-contain" alt="p" />
          </label>
          <InputText
            maxLength={8}
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
            } text-sm text-greyout mt-4 pb-2 pl-2 cursor-pointer`}
          >
            <img
              src={passType ? IcPassShow : IcPassHide}
              className="h-5 object-contain"
              alt="p"
            />
          </label>
        </div>
        <div className="flex w-full">
          <label
            className={`border-b ${
              confirmPassword ? "border-primary" : "border-gray-300"
            } text-sm text-greyout mt-4 pb-2 pr-2`}
          >
            <img src={IcPassword} className="h-5 object-contain" alt="p" />
          </label>
          <InputText
            maxLength={8}
            id={"confirm Password"}
            onFocus={() => setConfirmPassword(true)}
            onBlur={() => setConfirmPassword(false)}
            extraclassName={"mt-4 pb-2 w-full"}
            type={!confirmPassType ? "text" : "password"}
            value={confirmPaswordData}
            placeholder={"Confirm Password"}
            onChange={(e) => setConfirmPasswordData(e.target.value)}
          />
          <label
            onClick={() => setConfirmPassType(!confirmPassType)}
            className={`border-b ${
              confirmPassword ? "border-primary" : "border-gray-300"
            } text-sm text-greyout mt-4 pb-2 pl-2 cursor-pointer`}
          >
            <img
              src={confirmPassType ? IcPassShow : IcPassHide}
              className="h-5 object-contain"
              alt="p"
            />
          </label>
        </div>
      </div>
      <Button
        disabled={isDisable}
        onClick={() => onSignUp()}
        extraClass={"max-w-2xl z-10"}
        white={true}
        title={"Sign Up"}
      />
    </div>
  );
};
