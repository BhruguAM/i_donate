import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button, InputText } from "../../component";
import { useLoadingContext } from "../../context";
import { AddDonation } from "../../services/donation";

import { ToastMsg } from "../../utils";

export const DonationDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { setLoading } = useLoadingContext();
  const [extra, setExtra] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [formData, setFromData] = useState([
    { title: "Name", name: "Name", value: "", type: "text" },
    { title: "Address 1", name: "Address 1", value: "", type: "text" },
    { title: "Address 2", name: "Address 2", value: "", type: "text" },
    { title: "City", name: "City", value: "", type: "text" },
    { title: "State", name: "State", value: "", type: "text" },
    { title: "ZIP", name: "ZIP", value: "", type: "number" },
    { title: "Phone Number", name: "Phone Number", value: "", type: "number" },
    { title: "Email", name: "Email", value: "", type: "email" },
  ]);

  useEffect(() => {
    const IsEmpty = formData.find(
      (i) => i.value === "" && i.title !== "Address 2"
    );
    const getEmail = formData.find((i) => i.type === "email");
    if (IsEmpty) {
      setButtonDisable(true);
    } else {
      if (getEmail) {
        validateEmail(getEmail.value)
          ? setButtonDisable(false)
          : setButtonDisable(true);
      } else {
        setButtonDisable(false);
      }
    }
  }, [extra]);

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const onSubmitForm = async (e) => {
    setButtonDisable(true);
    e.stopPropagation();
    const getEmail = formData.find((i) => i.type === "email");
    // let validRegex = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
    if (validateEmail(getEmail.value)) {
      setLoading(true);
      const body = {
        ...state,
        name: formData[0].value,
        address_line1: formData[1].value,
        address_line2: formData[2].value,
        city: formData[3].value,
        state: formData[4].value,
        country_code: formData[5].value,
        phone: formData[6].value,
        email: formData[7].value,
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
        setFromData(formData);
        setExtra(extra + 1);
      }
    } else if (i.type === "number") {
      const numre = /^[0-9\b]+$/;
      if (e.target.value === "" || numre.test(e.target.value)) {
        formData[k].value = e.target.value;
        setFromData(formData);
        setExtra(extra + 1);
      }
    } else {
      formData[k].value = e.target.value;
      setFromData(formData);
      setExtra(extra + 1);
    }
  };

  return (
    <div>
      <label className={`text-title font-bold text-lg mb-5`}>
        {"Donar Detail"}
      </label>
      <div className={`px-5 py-2 shadow-md mb-5 rounded-md bg-white`}>
        <div className="mt-5 flex" />
        {formData.map((i, k) => {
          if (k === 5) {
            return null;
          }
          if (k === 4) {
            return (
              <div className={`mb-3 flex w-full`}>
                <div
                  key={"details" + k}
                  className={`mb-3 flex flex-col w-full mr-2`}
                >
                  <label
                    id={i.name}
                    className="text-sm font-medium text-primary"
                  >
                    {i.title}
                  </label>
                  <InputText
                    id={i.name}
                    name={i.name}
                    type={i.type}
                    value={i.value}
                    onChange={(e) => onChangeInput(e, i, k)}
                  />
                </div>
                <div
                  key={"details" + k + 1}
                  className={`mb-3 flex flex-col w-full ml-2`}
                >
                  <label
                    id={formData[k + 1].name}
                    className="text-sm font-medium text-primary"
                  >
                    {formData[k + 1].title}
                  </label>
                  <InputText
                    id={formData[k + 1].name}
                    name={formData[k + 1].name}
                    type={formData[k + 1].type}
                    value={formData[k + 1].value}
                    onChange={(e) => onChangeInput(e, formData[k + 1], k + 1)}
                  />
                </div>
              </div>
            );
          }
          return (
            <div key={"details" + k} className={`mb-3 flex flex-col`}>
              <label id={i.name} className="text-sm font-medium text-primary">
                {i.title}
              </label>
              <InputText
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
        disabled={buttonDisable}
        title={"Donate Now"}
        onClick={(e) => onSubmitForm(e)}
      />
    </div>
  );
};
