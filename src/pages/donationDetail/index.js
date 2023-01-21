import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button, InputText } from "../../component";
import { AddDonation } from "../../services/donation";

import { ToastMsg } from "../../utils";

export const DonationDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
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
      ToastMsg("...Sending Data", "info");
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
        ToastMsg(res.message, "success");
        setTimeout(() => {
          navigate("/payment", {
            state: { gateway_clientSecret: res.data.gateway_clientSecret },
          });
          setButtonDisable(false);
        }, 1000);
      } else {
        ToastMsg(res.message, "error");
        setButtonDisable(false);
      }
    } else {
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
      <div className={`px-5 py-5 shadow-md mb-5 rounded-md bg-white`}>
        <label className={`text-title font-semibold text-base`}>
          Donar Detail
        </label>
        <div className="mt-5" />
        {formData.map((i, k) => (
          <div key={"details" + k} className="flex flex-col mb-3">
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
        ))}
      </div>
      <Button
        disabled={buttonDisable}
        title={"Donate Now"}
        onClick={(e) => onSubmitForm(e)}
      />
    </div>
  );
};
