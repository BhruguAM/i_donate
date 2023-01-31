import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button, InputText } from "../../component";
import { useHeaderContext, useLoadingContext } from "../../context";
import { AddDonation } from "../../services/donation";

import { getWithExpiry, ToastMsg } from "../../utils";
import { validateEmail } from "../../utils/validate";

export const DonationDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const headerCtx = useHeaderContext();
  const { setLoading } = useLoadingContext();
  const member = getWithExpiry("member");
  headerCtx.setHeader("Donar Details");
  headerCtx.setIsBack(true);
  const [extra, setExtra] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [formData, setFromData] = useState([
    {
      title: "Name",
      name: "Name",
      value: member
        ? member.first_name + " " + member.middle_name + " " + member.last_name
        : "",
      type: "text",
    },
    {
      title: "Address 1",
      name: "Address 1",
      value: member ? member.address_line1 : "",
      type: "text",
    },
    {
      title: "Address 2",
      name: "Address 2",
      value: member ? member.address_line2 : "",
      type: "text",
    },
    {
      title: "City",
      name: "City",
      value: member ? member.city : "",
      type: "text",
    },
    {
      title: "State",
      name: "State",
      value: member ? member.state : "",
      type: "text",
    },
    {
      title: "ZIP",
      name: "ZIP",
      value: member ? member.zip : "",
      type: "number",
    },
    {
      title: "Phone Number",
      name: "Phone Number",
      value: member ? member.phone : "",
      type: "number",
    },
    {
      title: "Email",
      name: "Email",
      value: member ? member.email : "",
      type: "email",
    },
  ]);

  useEffect(() => {
    const IsEmpty = formData.find(
      (i) => i.value === "" && i.title !== "Address 2"
    );
    const getEmail = formData.find((i) => i.type === "email");
    const zipValue = formData.find((i) => i.title === "ZIP");
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
    if (zipValue.value.length < 5) {
      setButtonDisable(true);
    }
  }, [extra]);

  const onSubmitForm = async (e) => {
    setButtonDisable(true);
    // e.stopPropagation();
    const getEmail = formData.find((i) => i.type === "email");
    // let validRegex = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
    console.log("state", state);
    if (validateEmail(getEmail.value)) {
      setLoading(true);
      const body = {
        ...state,
        name: formData[0].value,
        address_line1: formData[1].value,
        address_line2: formData[2].value,
        city: formData[3].value,
        state: formData[4].value,
        country_code: +1,
        phone: formData[6].value,
        email: formData[7].value,
        zip: formData[5].value,
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
      {/* <label className={`text-title font-bold text-lg mb-5`}>
        {"Donar Detail"}
      </label> */}
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
                  className={`mb-3 flex flex-col w-full ml-2`}
                >
                  <label
                    id={formData[k + 1].name}
                    className="text-sm font-medium text-primary"
                  >
                    {formData[k + 1].title}
                  </label>
                  <InputText
                    maxLength={5}
                    minLength={5}
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
