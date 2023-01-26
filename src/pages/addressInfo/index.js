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
  const [address2Focus, setAddress2Focus] = useState(false);
  const [address2, setAddress2] = useState("");
  const [cityFocus, setCityFocus] = useState(false);
  const [city, setCity] = useState("");
  const [zipFocus, setZipFocus] = useState(false);
  const [zip, setZip] = useState("");
  const [stateFocus, setStateFocus] = useState(false);
  const [stateValue, setStateValue] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  headerCtx.setHeader("Sign Up");
  headerCtx.setIsBack(true);

  useEffect(() => {
    let buttonDisable = false;
    if (address1 === "") {
      buttonDisable = true;
    }
    if (city === "") {
      buttonDisable = true;
    }
    if (zip === "") {
      buttonDisable = true;
    }
    if (stateValue === "" && stateValue.length < 1) {
      buttonDisable = true;
    }
    setButtonDisabled(buttonDisable);
  }, [stateValue, address1, zip, city]);

  const onContinue = () => {
    console.log("state", {
      ...state,
      country_code: "+1",
      address_line1: address1,
      address_line2: address2,
      city: city,
      state: stateValue,
      zip: zip,
    });
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
    <div className="flex flex-col items-center justify-center w-full min-h-full">
      <div className="w-full max-w-2xl mb-3">
        <label className="text-3xl font-bold text-white">Address Info</label>
      </div>
      <div
        className={`px-5 pt-5 pb-8 shadow-md mb-5 rounded-md bg-white w-full max-w-2xl z-10`}
      >
        <div className="flex w-full">
          <label
            className={`border-b ${
              address1Focus ? "border-primary" : "border-gray-300"
            } text-sm text-greyout mt-4 pb-2 pr-2`}
          >
            <img src={icLocation} className="h-5 object-contain" alt="p" />
          </label>
          <InputText
            id={"Address 1"}
            onFocus={() => setAddress1Focus(true)}
            onBlur={() => setAddress1Focus(false)}
            extraclassName={"mt-4 pb-2 w-full"}
            type={"text"}
            value={address1}
            placeholder={"Address 1"}
            onChange={(e) => {
              setAddress1(e.target.value);
            }}
          />
        </div>
        <div className="flex w-full">
          <label
            className={`border-b ${
              address2Focus ? "border-primary" : "border-gray-300"
            } text-sm text-greyout mt-4 pb-2 pr-2`}
          >
            <img src={icLocation} className="h-5 object-contain" alt="p" />
          </label>
          <InputText
            id={"Address 2"}
            onFocus={() => setAddress2Focus(true)}
            onBlur={() => setAddress2Focus(false)}
            extraclassName={"mt-4 pb-2 w-full"}
            type={"text"}
            value={address2}
            placeholder={"Address 2"}
            onChange={(e) => {
              setAddress2(e.target.value);
            }}
          />
        </div>
        <div className="flex w-full">
          <label
            className={`border-b ${
              cityFocus ? "border-primary" : "border-gray-300"
            } text-sm text-greyout mt-4 pb-2 pr-2`}
          >
            <img src={IcCity} className="h-5 object-contain" alt="p" />
          </label>
          <InputText
            id={"city"}
            onFocus={() => setCityFocus(true)}
            onBlur={() => setCityFocus(false)}
            extraclassName={"mt-4 pb-2 w-full"}
            type={"text"}
            value={city}
            placeholder={"City"}
            onChange={(e) => {
              if (/^[A-Za-z\s]*$/.test(e.target.value)) {
                setCity(e.target.value);
              }
            }}
          />
        </div>
        <div className="flex w-full">
          <div className="flex w-full mr-2">
            <label
              className={`border-b ${
                stateFocus ? "border-primary" : "border-gray-300"
              } text-sm text-greyout mt-4 pb-2 pr-2`}
            >
              <img src={IcCity} className="h-5 object-contain" alt="p" />
            </label>
            <InputText
              maxLength={2}
              id={"state"}
              onFocus={() => setStateFocus(true)}
              onBlur={() => setStateFocus(false)}
              extraclassName={"mt-4 pb-2 w-full"}
              type={"text"}
              value={stateValue}
              placeholder={"State"}
              onChange={(e) => {
                if (/^[A-Za-z\s]*$/.test(e.target.value)) {
                  setStateValue(e.target.value.toUpperCase());
                }
              }}
            />
          </div>
          <div className="flex w-full ml-2">
            <label
              className={`border-b ${
                zipFocus ? "border-primary" : "border-gray-300"
              } text-sm text-greyout mt-4 pb-2 pr-2`}
            >
              <img src={IcZip} className="h-5 object-contain" alt="p" />
            </label>
            <InputText
              id={"zip"}
              onFocus={() => setZipFocus(true)}
              onBlur={() => setZipFocus(false)}
              extraclassName={"mt-4 pb-2 w-full"}
              type={"number"}
              value={zip}
              placeholder={"zip"}
              onChange={(e) => {
                if (/^[0-9\b]+$/.test(e.target.value)) {
                  setZip(e.target.value);
                }
              }}
            />
          </div>
        </div>
      </div>
      <Button
        disabled={isButtonDisabled}
        onClick={() => onContinue()}
        extraClass={"max-w-2xl z-10"}
        white={true}
        title={"Continue"}
        icon={IcWhiteArrow}
      />
    </div>
  );
};
