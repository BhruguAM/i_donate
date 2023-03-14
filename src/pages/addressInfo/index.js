import React, { useEffect, useState } from "react";
import icLocation from "../../assets/icons/ic-location.svg";
import IcZip from "../../assets/icons/ic-zip.svg";
import IcCity from "../../assets/icons/ic-city.svg";
import IcWhiteArrow from "../../assets/icons/ic-right-arrow-primary.svg";
import { Button, InputText } from "../../component";
import { useLocation, useNavigate } from "react-router-dom";
import { useHeaderContext } from "../../context";

export const AddressInfo = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const headerCtx = useHeaderContext();

  const [address1Focus, setAddress1Focus] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address1Err, setAddress1Err] = useState("");

  const [address2Focus, setAddress2Focus] = useState(false);
  const [address2, setAddress2] = useState("");

  const [cityFocus, setCityFocus] = useState(false);
  const [city, setCity] = useState("");
  const [cityErr, setCityErr] = useState("");

  const [zipFocus, setZipFocus] = useState(false);
  const [zip, setZip] = useState("");
  const [zipErr, setZipErr] = useState("");

  const [stateFocus, setStateFocus] = useState(false);
  const [stateValue, setStateValue] = useState("");
  const [stateValueErr, setStateValueErr] = useState("");

  const [isButtonDisabled, setButtonDisabled] = useState(true);

  headerCtx.setHeader("Sign Up");
  headerCtx.setIsBack(true);

  // useEffect(() => {
  //   let buttonDisable = false;
  //   if (address1 === "") {
  //     buttonDisable = true;
  //   }
  //   if (city === "") {
  //     buttonDisable = true;
  //   }
  //   if (zip === "" || zip.length < 4) {
  //     buttonDisable = true;
  //   }
  //   if (stateValue === "" || stateValue.length === 1) {
  //     buttonDisable = true;
  //   }
  //   setButtonDisabled(buttonDisable);
  // }, [stateValue, address1, zip, city]);

  const onCheckFields = () => {
    let buttonDisable = false;
    if (address1 === "") {
      setAddress1Err("Please enter address");
      buttonDisable = true;
    }
    if (city === "") {
      setCityErr("Please enter city");
      buttonDisable = true;
    }
    if (zip === "" || zip.length < 4) {
      setZipErr("Please enter zip");
      buttonDisable = true;
    }
    if (stateValue === "" || stateValue.length === 1) {
      setStateValueErr("Please enter state");
      buttonDisable = true;
    }
    if (!buttonDisable) {
      onContinue();
    }
  };

  const onContinue = () => {
    // return;
    navigate("/auth/createPassword", {
      state: {
        ...state,
        country_code: "+1",
        address_line1: address1,
        address_line2: address2,
        city: city,
        state: stateValue,
        zip: zip,
      },
    });
  };

  return (
    <div className="flex flex-col items-center w-full min-h-full">
      <div className="w-full max-w-2xl mb-3">
        <label className="text-3xl font-bold text-white">Address Info</label>
      </div>
      <div
        className={`px-5 pb-8 shadow-xl mb-5 rounded-xl bg-primaryBg w-full max-w-2xl z-10`}
      >
        <div className="flex w-full mt-3">
          <label
            className={`border-b ${
              address1Err
                ? "border-red-700"
                : address1Focus
                ? "border-lineColor"
                : "border-gray-300"
            } text-sm text-greyOut mt-4 pb-2 pr-2`}
          >
            <img src={icLocation} className="h-5 object-contain" alt="p" />
          </label>
          <InputText
            id={"Address 1"}
            isError={address1Err}
            onFocus={() => setAddress1Focus(true)}
            onBlur={() => setAddress1Focus(false)}
            extraClassName={"mt-4 pb-2 w-full"}
            type={"text"}
            value={address1}
            placeholder={"Address 1"}
            onChange={(e) => {
              setAddress1Err(false);
              setAddress1(e.target.value);
            }}
          />
        </div>
        <div className="flex w-full mt-3">
          <label
            className={`border-b ${
              address2Focus ? "border-lineColor" : "border-gray-300"
            } text-sm text-greyOut mt-4 pb-2 pr-2`}
          >
            <img src={icLocation} className="h-5 object-contain" alt="p" />
          </label>
          <InputText
            id={"Address 2"}
            onFocus={() => setAddress2Focus(true)}
            onBlur={() => setAddress2Focus(false)}
            extraClassName={"mt-4 pb-2 w-full"}
            type={"text"}
            value={address2}
            placeholder={"Address 2"}
            onChange={(e) => {
              setAddress2(e.target.value);
            }}
          />
        </div>
        <div className="flex w-full mt-3">
          <label
            className={`border-b ${
              cityErr
                ? "border-red-700"
                : cityFocus
                ? "border-lineColor"
                : "border-gray-300"
            } text-sm text-greyOut mt-4 pb-2 pr-2`}
          >
            <img src={IcCity} className="h-5 object-contain" alt="p" />
          </label>
          <InputText
            id={"city"}
            isError={cityErr}
            onFocus={() => setCityFocus(true)}
            onBlur={() => setCityFocus(false)}
            extraClassName={"mt-4 pb-2 w-full"}
            type={"text"}
            value={city}
            placeholder={"City"}
            onChange={(e) => {
              if (/^[A-Za-z\s]*$/.test(e.target.value)) {
                setCityErr(false);
                setCity(e.target.value);
              }
            }}
          />
        </div>
        <div className="flex w-full mt-3">
          <div className="flex w-full mr-2">
            <label
              className={`border-b ${
                stateValueErr
                  ? "border-red-700"
                  : stateFocus
                  ? "border-lineColor"
                  : "border-gray-300"
              } text-sm text-greyOut mt-4 pb-2 pr-2`}
            >
              <img src={IcCity} className="h-5 object-contain" alt="p" />
            </label>
            <InputText
              maxLength={2}
              isError={stateValueErr}
              id={"state"}
              onFocus={() => setStateFocus(true)}
              onBlur={() => setStateFocus(false)}
              extraClassName={"mt-4 pb-2 w-full"}
              type={"text"}
              value={stateValue}
              placeholder={"State"}
              onChange={(e) => {
                if (/^[A-Za-z\s]*$/.test(e.target.value)) {
                  setStateValueErr(false);
                  setStateValue(e.target.value.toUpperCase());
                }
              }}
            />
          </div>
          <div className="flex w-full ml-2">
            <label
              className={`border-b ${
                zipErr
                  ? "border-red-700"
                  : zipFocus
                  ? "border-lineColor"
                  : "border-gray-300"
              } text-sm text-greyOut mt-4 pb-2 pr-2`}
            >
              <img src={IcZip} className="h-5 object-contain" alt="p" />
            </label>
            <InputText
              id={"zip"}
              isError={zipErr}
              maxLength={5}
              onFocus={() => setZipFocus(true)}
              onBlur={() => setZipFocus(false)}
              extraClassName={"mt-4 pb-2 w-full"}
              type={"number"}
              value={zip}
              placeholder={"zip"}
              onChange={(e) => {
                if (e.target.value.trim().length <= 5) {
                  setZipErr(false);
                  setZip(e.target.value);
                }
              }}
            />
          </div>
        </div>
      </div>
      <Button
        // disabled={isButtonDisabled}
        onClick={() => onCheckFields()}
        extraClass={"max-w-2xl z-10"}
        white={true}
        title={"Continue"}
      />
    </div>
  );
};
