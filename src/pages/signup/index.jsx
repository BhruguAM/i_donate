import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import IcUser from "../../assets/icons/ic-user.svg";
import IcPhone from "../../assets/icons/ic-phone.svg";
import icLocation from "../../assets/icons/ic-location.svg";
import IcEmail from "../../assets/icons/ic-email.svg";
import IcCalender from "../../assets/icons/ic-calender.svg";
import IcWhiteArrow from "../../assets/icons/ic-right-arrow-primary.svg";
import { Button, Dropdown, InputText } from "../../component";
import { useHeaderContext } from "../../context";
import { useDoantionList } from "../../services/donation";
import { validateEmail } from "../../utils/validate";

export const SignUp = () => {
  const navigate = useNavigate();
  const { data, isFetching } = useDoantionList();
  const headerCtx = useHeaderContext();
  const [donationOrg, setDonationOrg] = useState([]);
  const [selectedDonationOrg, setSelectedDonationOrg] = useState({
    organization_name: "select",
  });
  const [firstNameFocus, setFirstNameFocus] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastNameFocus, setLastNameFocus] = useState(false);
  const [LastName, setLastName] = useState("");
  const [middleNameFocus, setMiddleNameFocus] = useState(false);
  const [middleName, setMiddleName] = useState("");
  const [originFocus, setOriginFocus] = useState(false);
  const [originName, setOriginName] = useState("");
  const [mobileNo, setMobileNo] = useState(false);
  const [mobile, setMobile] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [dateFocus, setDateFocus] = useState(false);
  const [dateValue, setDateValue] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (!isFetching) {
      if (data?.status) {
        setDonationOrg(data.data.organizations);
        setSelectedDonationOrg(data.data.organizations[0]);
      } else {
        // ToastMsg(data ? data.message : "something went wrong", "error");
      }
    } else {
      // ToastMsg("fetching...", "info");
    }
  }, [isFetching]);

  useEffect(() => {
    headerCtx.setHeader("Sign Up");
    headerCtx.setIsBack(true);
    let buttonDisable = false;
    if (firstName === "") {
      buttonDisable = true;
    }
    if (middleName === "") {
      buttonDisable = true;
    }
    if (LastName === "") {
      buttonDisable = true;
    }
    if (originName === "") {
      buttonDisable = true;
    }
    if (mobile === "") {
      buttonDisable = true;
    }
    if (dateValue === "") {
      buttonDisable = true;
    }
    if (!validateEmail(emailValue)) {
      buttonDisable = true;
    }
    setButtonDisabled(buttonDisable);
  }, [
    LastName,
    dateValue,
    emailValue,
    firstName,
    headerCtx,
    middleName,
    mobile,
    originName,
  ]);

  const onContinue = () => {
    navigate("/auth/addressInfo", {
      state: {
        first_name: firstName,
        last_name: LastName,
        middle_name: middleName,
        gam_village: originName,
        email: emailValue,
        organization_id: selectedDonationOrg.id,
        phone: mobile,
        birth_date: dateValue,
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-full">
      <div className="w-full max-w-2xl mb-3">
        <label className="text-3xl font-bold text-white">Personal Info</label>
      </div>
      <div
        className={`px-5 pt-5 pb-8 shadow-md mb-5 rounded-md bg-white w-full max-w-2xl z-10`}
      >
        {/* <div className="flex w-full"> */}
        <Dropdown
          disabled={donationOrg.length === 1}
          items={donationOrg}
          onChange={setSelectedDonationOrg}
          value={selectedDonationOrg}
          showValue={selectedDonationOrg.organization_name}
          title={""}
        />
        {/* </div> */}
        <div className="flex w-full">
          <label
            className={`border-b ${
              firstNameFocus ? "border-primary" : "border-gray-300"
            } text-sm text-greyout mt-4 pb-2 pr-2`}
          >
            <img src={IcUser} className="h-5 object-contain" alt="p" />
          </label>
          <InputText
            id={"first name"}
            onFocus={() => setFirstNameFocus(true)}
            onBlur={() => setFirstNameFocus(false)}
            extraclassName={"mt-4 pb-2 w-full"}
            type={"text"}
            value={firstName}
            placeholder={"First Name"}
            onChange={(e) => {
              if (/^[A-Za-z\s]*$/.test(e.target.value)) {
                setFirstName(e.target.value);
              }
            }}
          />
        </div>
        <div className="flex w-full">
          <label
            className={`border-b ${
              middleNameFocus ? "border-primary" : "border-gray-300"
            } text-sm text-greyout mt-4 pb-2 pr-2`}
          >
            <img src={IcUser} className="h-5 object-contain" alt="p" />
          </label>
          <InputText
            id={"middle name"}
            onFocus={() => setMiddleNameFocus(true)}
            onBlur={() => setMiddleNameFocus(false)}
            extraclassName={"mt-4 pb-2 w-full"}
            type={"text"}
            value={middleName}
            placeholder={"Middle Name"}
            onChange={(e) => {
              if (/^[A-Za-z\s]*$/.test(e.target.value)) {
                setMiddleName(e.target.value);
              }
            }}
          />
        </div>
        <div className="flex w-full">
          <label
            className={`border-b ${
              lastNameFocus ? "border-primary" : "border-gray-300"
            } text-sm text-greyout mt-4 pb-2 pr-2`}
          >
            <img src={IcUser} className="h-5 object-contain" alt="p" />
          </label>
          <InputText
            id={"last name"}
            onFocus={() => setLastNameFocus(true)}
            onBlur={() => setLastNameFocus(false)}
            extraclassName={"mt-4 pb-2 w-full"}
            type={"text"}
            value={LastName}
            placeholder={"Last Name"}
            onChange={(e) => {
              if (/^[A-Za-z\s]*$/.test(e.target.value)) {
                setLastName(e.target.value);
              }
            }}
          />
        </div>
        <div className="flex w-full">
          <label
            className={`border-b ${
              originFocus ? "border-primary" : "border-gray-300"
            } text-sm text-greyout mt-4 pb-2 pr-2`}
          >
            <img src={icLocation} className="h-5 object-contain" alt="p" />
          </label>
          <InputText
            id={"india origin"}
            onFocus={() => setOriginFocus(true)}
            onBlur={() => setOriginFocus(false)}
            extraclassName={"mt-4 pb-2 w-full"}
            type={"text"}
            value={originName}
            placeholder={"India Origin"}
            onChange={(e) => {
              if (/^[A-Za-z\s]*$/.test(e.target.value)) {
                setOriginName(e.target.value);
              }
            }}
          />
        </div>
        <div className="flex w-full">
          <label
            className={`border-b ${
              emailFocus ? "border-primary" : "border-gray-300"
            } text-sm text-greyout mt-4 pb-2 pr-2`}
          >
            <img src={IcEmail} className="h-5 object-contain" alt="p" />
          </label>
          <InputText
            id={"email"}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            extraclassName={"mt-4 pb-2 w-full"}
            type={"email"}
            value={emailValue}
            placeholder={"Email"}
            onChange={(e) => setEmailValue(e.target.value)}
          />
        </div>
        <div className="flex w-full">
          <label
            className={`border-b ${
              mobileNo ? "border-primary" : "border-gray-300"
            } text-sm text-greyout mt-4 pb-2 pr-2`}
          >
            <img src={IcPhone} className="h-5 object-contain" alt="p" />
          </label>
          <InputText
            id={"mobile"}
            onFocus={() => setMobileNo(true)}
            onBlur={() => setMobileNo(false)}
            extraclassName={"mt-4 pb-2 w-full"}
            type={"number"}
            value={mobile}
            placeholder={"Phone Number"}
            onChange={(e) => {
              if (e.target.validity.valid) {
                setMobile(e.target.value);
              }
            }}
          />
        </div>
        <div className="flex w-full">
          <label
            className={`border-b ${
              dateFocus ? "border-primary" : "border-gray-300"
            } text-sm text-greyout mt-4 pb-2 pr-2`}
          >
            <img src={IcCalender} className="h-5 object-contain" alt="p" />
          </label>
          <InputText
            id={"dob"}
            onFocus={() => setDateFocus(true)}
            onBlur={() => setDateFocus(false)}
            extraclassName={"mt-4 pb-2 w-full date_ios"}
            type={"date"}
            value={dateValue}
            placeholder={"DOB"}
            onChange={(e) => setDateValue(e.target.value)}
          />
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
