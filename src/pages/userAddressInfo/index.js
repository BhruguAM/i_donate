import React, { useEffect, useState } from "react";

import { Button, InputText, LogoutPopup } from "../../component";
import { useHeaderContext, useLoadingContext } from "../../context";
import { getWithExpiry, setWithExpiry, ToastMsg } from "../../utils";
import { UpdateUserAPI } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export const UserAddressInfo = () => {
  const navigate = useNavigate();
  const member = getWithExpiry("member");
  const headerCtx = useHeaderContext();
  const { setLoading, Loading } = useLoadingContext();

  const [address1Focus, setAddress1Focus] = useState(false);
  const [address1, setAddress1] = useState(member.address_line1 || "");
  const [address1Err, setAddress1Err] = useState(false);

  const [address2Focus, setAddress2Focus] = useState(false);
  const [address2, setAddress2] = useState(member.address_line2 || "");

  const [cityFocus, setCityFocus] = useState(false);
  const [city, setCity] = useState(member.city || "");
  const [cityErr, setCityErr] = useState(false);

  const [zipFocus, setZipFocus] = useState(false);
  const [zip, setZip] = useState(member.zip || "");
  const [zipErr, setZipErr] = useState(false);

  const [stateFocus, setStateFocus] = useState(false);
  const [stateValue, setStateValue] = useState(member.state || "");
  const [stateValueErr, setStateValueErr] = useState(false);

  useEffect(() => {
    headerCtx.setHeader("Address Info");
    headerCtx.setIsBack(true);
    headerCtx.setMainHeader(false);
    headerCtx.setSearchBar(false);
  }, []);

  const onCheckFields = () => {
    const member = getWithExpiry("member");
    setLoading(true);
    let buttonDisable = false;
    let toastMessage = "can't update similar value";
    let isSimilar = [];

    if (address1 === "") {
      buttonDisable = true;
      setAddress1Err("Please enter address");
    } else if (address1 === member.address_line1) {
      isSimilar.push(4);
    }
    if (city === "") {
      buttonDisable = true;
      setCityErr("Please enter city");
    } else if (city === member.city) {
      isSimilar.push(5);
    }
    if (stateValue.length !== 2) {
      buttonDisable = true;
      setStateValueErr("Please enter valid state");
    } else if (stateValue === member.state) {
      isSimilar.push(6);
    }
    if (zip.length !== 5) {
      buttonDisable = true;
      setZipErr("Please enter valid zip code");
    } else if (zip == member.zip) {
      isSimilar.push(7);
    }

    if (address2 === member.address_line2 || member.address_line2 === null) {
      isSimilar.push(9);
    }

    if (!buttonDisable) {
      if (isSimilar.length === 10) {
        ToastMsg(toastMessage, "info");
        setLoading(false);
      } else {
        onContinue();
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const onContinue = async () => {
    setLoading(true);
    const data = {
      memberID: member.memberId,
      address_line1: address1,
      address_line2: address2,
      city: city,
      state: stateValue,
      zip: zip,
    };
    const res = await UpdateUserAPI(data);
    if (res.status) {
      ToastMsg(res.message, "success");
      setWithExpiry("member", res.data);
      setLoading(false);
      navigate("/profile");
    } else {
      setLoading(false);
      ToastMsg(res.message, "error");
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center max-w-2xl w-full self-center">
      <div
        className={`px-5 pb-8 shadow-xl mb-5 rounded-md bg-primaryCard w-full max-w-2xl`}
      >
        <div className="flex w-full mt-2">
          <label
            className={`border-b ${
              address1Err
                ? "border-red-700"
                : address1Focus
                ? "border-lineColor"
                : "border-gray-300"
            } text-sm text-greyOut mt-4 pb-2 pr-2`}
          >
            {/* <img src={icLocation} className="h-5 object-contain" alt="p" /> */}
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
        <div className="flex w-full mt-2">
          <label
            className={`border-b ${
              address2Focus ? "border-lineColor" : "border-gray-300"
            } text-sm text-greyOut mt-4 pb-2 pr-2`}
          >
            {/* <img src={icLocation} className="h-5 object-contain" alt="p" /> */}
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
        <div className="flex w-full mt-2">
          <label
            className={`border-b ${
              cityErr
                ? "border-red-700"
                : cityFocus
                ? "border-lineColor"
                : "border-gray-300"
            } text-sm text-greyOut mt-4 pb-2 pr-2`}
          >
            {/* <img src={IcCity} className="h-5 object-contain" alt="p" /> */}
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
        <div className="flex w-full mt-2">
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
              {/* <img src={IcCity} className="h-5 object-contain" alt="p" /> */}
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
              {/* <img src={IcZip} className="h-5 object-contain" alt="p" /> */}
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
      <div className="flex self-end items-end justify-between w-4/5">
        <Button
          disabled={Loading}
          onClick={() => navigate("/profile")}
          extraClass={`w-[48%]`}
          title={"Cancel"}
          secondary
        />
        <Button
          disabled={Loading}
          onClick={() => onCheckFields()}
          extraClass={`w-[48%]`}
          title={"Update"}
        />
      </div>
    </div>
  );
};
