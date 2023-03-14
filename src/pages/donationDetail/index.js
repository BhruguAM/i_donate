import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, InputText } from "../../component";
import { useHeaderContext, useLoadingContext } from "../../context";
import { AddDonation } from "../../services/donation";

import { getWithExpiry, ToastMsg } from "../../utils";
import { validateEmail } from "../../utils/validate";
import { InitialValues } from "./constant";

export const DonationDetails = () => {
  const { state } = useLocation();
  const member = getWithExpiry("member");
  const headerCtx = useHeaderContext();
  const navigate = useNavigate();
  const { setLoading } = useLoadingContext();
  const [extra, setExtra] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [formData, setFromData] = useState(InitialValues(member));

  useEffect(() => {
    setLoading(false);
    headerCtx.setIsBack(true);
    headerCtx.setHeader("Donation");
    headerCtx.setMainHeader(false);
    headerCtx.setSearchBar(false);
  }, []);

  const onCheckFields = (e) => {
    let isDisable = false;
    let data = formData.filter((i) => i.mandatory);
    formData.map((i) => {
      data.forEach((j) => {
        if (i.title === j.title && i.value === "") {
          if (i.title === "Address 1") {
            i.isError = `Please enter address`;
            isDisable = true;
          } else {
            i.isError = `Please enter ${j.title.toLocaleLowerCase()}`;
            isDisable = true;
          }
        }
        if (i.value !== "" && i.type === "email") {
          if (!validateEmail(i.value)) {
            i.isError = `Please enter valid email`;
            isDisable = true;
          }
        }
        if (i.value !== "" && i.title === "State") {
          if (i.value.length !== 2) {
            i.isError = `Please enter valid state`;
            isDisable = true;
          }
        }
        if (i.value !== "" && i.title === "Phone Number") {
          if (i.value.length !== 10) {
            i.isError = `Please enter valid phone number`;
            isDisable = true;
          }
        }
        if (i.value !== "" && i.title === "ZIP") {
          if (i.value.length !== 5) {
            i.isError = `Please enter valid zip`;
            isDisable = true;
          }
        }
      });
      return i;
    });
    setFromData(formData);
    setExtra(extra + 1);
    if (!isDisable) {
      onSubmitForm(e);
    }
  };

  const onSubmitForm = async (e) => {
    setButtonDisable(true);
    e.stopPropagation();
    const getEmail = formData.find((i) => i.type === "email");
    if (validateEmail(getEmail.value)) {
      setLoading(true);
      const body = {
        ...state,
        name: formData[0].value.trim(),
        gam_village: formData[1].value.trim(),
        address_line1: formData[2].value.trim(),
        address_line2: formData[3].value
          ? formData[3].value.trim()
          : formData[3].value,
        city: formData[4].value.trim(),
        state: formData[5].value.trim(),
        country_code: +1,
        phone: formData[7].value.trim(),
        email: formData[8].value.trim(),
        zip: formData[6].value.trim(),
      };
      const res = await AddDonation(body);
      if (res.status) {
        setLoading(false);
        navigate("/payment", {
          state: { gateway_clientSecret: res.data.gateway_clientSecret },
        });
        setButtonDisable(false);
      } else {
        setLoading(false);
        ToastMsg(res.message, "error");
        setButtonDisable(false);
      }
    } else {
      setLoading(false);
      ToastMsg("Please enter valid email address", "error");
      setButtonDisable(false);
    }
  };

  const onChangeInput = (e, i, k) => {
    if (i.type === "text" && !i.title.includes("Address")) {
      const re = /^[A-Za-z\s]*$/;
      if (e.target.value === "" || re.test(e.target.value)) {
        formData[k].value = e.target.value;
        formData[k].isError = false;
        setFromData(formData);
        setExtra(extra + 1);
      }
    } else if (i.type === "number") {
      const numre = /^[0-9\b]+$/;
      if (e.target.value === "" || numre.test(e.target.value)) {
        formData[k].value = e.target.value;
        formData[k].isError = false;
        setFromData(formData);
        setExtra(extra + 1);
      }
    } else if (i.title === "Email") {
      formData[k].value = e.target.value;
      formData[k].isError = false;
      setFromData(formData);
      setExtra(extra + 1);
    } else {
      formData[k].value = e.target.value;
      formData[k].isError = false;
      setFromData(formData);
      setExtra(extra + 1);
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div
        className={`px-5 pt-2 pb-4 shadow-xl mb-5 rounded-xl bg-primaryCard max-w-2xl w-full`}
      >
        <div className="mt-5 flex" />
        <label className={`text-title font-bold text-base`}>
          {"Donar Details"}
        </label>
        {/* <div className="mt-5 flex" /> */}
        {formData.map((i, k) => {
          if (k === 6) {
            return null;
          }
          if (k === 5) {
            return (
              <div className={`flex w-full mt-5`}>
                <div
                  key={"details" + k}
                  className={`flex flex-col w-full mr-2`}
                >
                  <label
                    id={i.name}
                    className="text-sm font-medium text-primary"
                  >
                    {`${i.title}${i.mandatory ? "*" : ""}`}
                  </label>
                  <InputText
                    isError={i.isError}
                    maxLength={2}
                    id={i.name}
                    name={i.name}
                    type={i.type}
                    value={i.value}
                    onChange={(e) => onChangeInput(e, i, k)}
                  />
                </div>
                <div
                  key={"details" + k + 1}
                  className={`flex flex-col w-full ml-2`}
                >
                  <label
                    id={formData[k + 1].name}
                    className="text-sm font-medium text-primary"
                  >
                    {`${formData[k + 1].title}${
                      formData[k + 1].mandatory ? "*" : ""
                    }`}
                  </label>
                  <InputText
                    maxLength={6}
                    isError={formData[k + 1].isError}
                    id={formData[k + 1].name}
                    name={formData[k + 1].name}
                    type={formData[k + 1].type}
                    value={formData[k + 1].value}
                    onChange={(e) => {
                      if (e.target.value.trim().length <= 5) {
                        onChangeInput(e, formData[k + 1], k + 1);
                      }
                    }}
                  />
                </div>
              </div>
            );
          }
          return (
            <div key={"details" + k} className={`mt-5 flex flex-col`}>
              <label id={i.name} className="text-sm font-medium text-primary">
                {`${i.title}${i.mandatory ? "*" : ""}`}
              </label>
              <InputText
                maxLength={i.name === "Phone Number" ? 10 : 50}
                isError={i.isError}
                id={i.name}
                name={i.name}
                type={i.type}
                value={i.value}
                onChange={(e) => onChangeInput(e, i, k)}
              />
            </div>
          );
        })}
      </div>
      <Button
        // disabled={buttonDisable}
        title={"Donate Now"}
        onClick={(e) => onCheckFields(e)}
        extraClass={"max-w-2xl w-full"}
      />
    </div>
  );
};
