import React, { useEffect, useState } from "react";
import userDefault from "../../assets/images/defaultUser.png";
import { Button, Dropdown, InputText } from "../../component";
import { getWithExpiry, setWithExpiry, ToastMsg } from "../../utils";
import { useDonationList } from "../../services/donation";
import { useHeaderContext, useLoadingContext } from "../../context";
import { UpdateUserAPI } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export const PersonalInfo = () => {
  const member = getWithExpiry("member");
  const { data, isFetching } = useDonationList();
  const navigate = useNavigate();
  const headerCtx = useHeaderContext();

  const { setLoading, Loading } = useLoadingContext();

  const [donationOrg, setDonationOrg] = useState([]);
  const [selectedDonationOrg, setSelectedDonationOrg] = useState({
    organization_name: "select",
  });
  const [firstNameFocus, setFirstNameFocus] = useState(false);
  const [firstName, setFirstName] = useState(member.first_name || "");
  const [firstNameErr, setFirstNameErr] = useState(false);

  const [lastNameFocus, setLastNameFocus] = useState(false);
  const [LastName, setLastName] = useState(member.last_name || "");
  const [LastNameErr, setLastNameErr] = useState(false);

  const [middleNameFocus, setMiddleNameFocus] = useState(false);
  const [middleName, setMiddleName] = useState(member.middle_name || "");

  const [originFocus, setOriginFocus] = useState(false);
  const [originName, setOriginName] = useState(member.gam_village || "");

  const [emailFocus, setEmailFocus] = useState(false);
  const [emailValue, setEmailValue] = useState(member.email || "");
  const [emailValueErr, setEmailValueErr] = useState(false);

  useEffect(() => {
    headerCtx.setHeader("Personal Info");
    headerCtx.setIsBack(true);
    headerCtx.setMainHeader(false);
    headerCtx.setSearchBar(false);
  }, []);

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

  const onCheckFields = () => {
    const member = getWithExpiry("member");
    setLoading(true);
    let buttonDisable = false;
    let toastMessage = "can't update similar value";
    let isSimilar = [];
    if (firstName === "") {
      buttonDisable = true;
      setFirstNameErr("Please enter first name");
    } else if (firstName === member.first_name) {
      isSimilar.push(1);
    }
    if (LastName === "") {
      buttonDisable = true;
      setLastNameErr("Please enter last name");
    } else if (LastName === member.last_name) {
      isSimilar.push(2);
    }
    if (middleName === member.middle_name || member.middle_name === null) {
      isSimilar.push(8);
    }
    if (originName === member.gam_village || member.gam_village === null) {
      isSimilar.push(10);
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
    // setButtonDisabled(buttonDisable);
  };

  const onContinue = async () => {
    setLoading(true);
    const data = {
      memberID: member.memberId,
      first_name: firstName,
      last_name: LastName,
      middle_name: middleName,
      gam_village: originName,
      email: emailValue,
      organization_id: selectedDonationOrg.id,
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
        className={`px-5 pt-5 pb-8 shadow-xl mb-5 rounded-xl bg-primaryCard w-full max-w-2xl z-10`}
      >
        <div className="w-full items-center justify-center flex mt-9 flex-col mb-12">
          <div className="bg-lineColor h-24 w-24 rounded-full mb-4 overflow-hidden">
            <img
              src={userDefault}
              alt="user"
              className="h-24 w-24 object-cover"
            />
          </div>
          <label className="text-primary text-base text-center">
            Member Id# {member?.memberId}
          </label>
        </div>
        {/* <div className="flex w-full mt-2"> */}
        {/* <Dropdown
        disabled={donationOrg.length === 1}
        items={donationOrg}
        onChange={setSelectedDonationOrg}
        value={selectedDonationOrg}
        showValue={selectedDonationOrg.organization_name}
        title={""}
      /> */}
        {/* </div> */}
        <div className="flex w-full mt-2">
          <label
            className={`border-b ${
              firstNameErr
                ? "border-red-700"
                : firstNameFocus
                ? "border-lineColor"
                : "border-gray-300"
            } text-sm text-greyOut mt-4 pb-2 pr-2 ${
              firstNameErr && "animate-pulse_finite"
            }`}
          >
            {/* <img src={IcUser} className="h-5 object-contain" alt="p" /> */}
          </label>
          <InputText
            id={"first name"}
            isError={firstNameErr}
            onFocus={() => setFirstNameFocus(true)}
            onBlur={() => setFirstNameFocus(false)}
            extraClassName={"mt-4 pb-2 w-full"}
            type={"text"}
            value={firstName}
            placeholder={"First Name"}
            onChange={(e) => {
              if (/^[A-Za-z\s]*$/.test(e.target.value)) {
                setFirstNameErr(false);
                setFirstName(e.target.value);
              }
            }}
          />
        </div>
        <div className="flex w-full mt-2">
          <label
            className={`border-b ${
              middleNameFocus ? "border-lineColor" : "border-gray-300"
            } text-sm text-greyOut mt-4 pb-2 pr-2`}
          >
            {/* <img src={IcUser} className="h-5 object-contain" alt="p" /> */}
          </label>
          <InputText
            id={"middle name"}
            onFocus={() => setMiddleNameFocus(true)}
            onBlur={() => setMiddleNameFocus(false)}
            extraClassName={"mt-4 pb-2 w-full"}
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
        <div className="flex w-full mt-2">
          <label
            className={`border-b ${
              LastNameErr
                ? "border-red-700"
                : lastNameFocus
                ? "border-lineColor"
                : "border-gray-300"
            } text-sm text-greyOut mt-4 pb-2 pr-2 ${
              LastNameErr && "animate-pulse_finite"
            }`}
          >
            {/* <img src={IcUser} className="h-5 object-contain" alt="p" /> */}
          </label>
          <InputText
            id={"last name"}
            isError={LastNameErr}
            onFocus={() => setLastNameFocus(true)}
            onBlur={() => setLastNameFocus(false)}
            extraClassName={"mt-4 pb-2 w-full"}
            type={"text"}
            value={LastName}
            placeholder={"Last Name"}
            onChange={(e) => {
              if (/^[A-Za-z\s]*$/.test(e.target.value)) {
                setLastNameErr(false);
                setLastName(e.target.value);
              }
            }}
          />
        </div>
        <div className="flex w-full mt-2">
          <label
            className={`border-b ${
              originFocus ? "border-lineColor" : "border-gray-300"
            } text-sm text-greyOut mt-4 pb-2 pr-2`}
          >
            {/* <img src={icLocation} className="h-5 object-contain" alt="p" /> */}
          </label>
          <InputText
            id={"india origin"}
            onFocus={() => setOriginFocus(true)}
            onBlur={() => setOriginFocus(false)}
            extraClassName={"mt-4 pb-2 w-full"}
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
        <div className="flex w-full mt-2">
          <label
            className={`border-b ${
              emailValueErr
                ? "border-red-700"
                : emailFocus
                ? "border-lineColor"
                : "border-gray-300"
            } text-sm text-greyOut mt-4 pb-2 pr-2 ${
              emailValueErr && "animate-pulse_finite"
            }`}
          >
            {/* <img src={IcEmail} className="h-5 object-contain" alt="p" /> */}
          </label>
          <InputText
            id={"email"}
            isError={emailValueErr}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            extraClassName={"mt-4 pb-2 w-full"}
            type={"email"}
            value={emailValue}
            placeholder={"Email"}
            onChange={(e) => {
              setEmailValueErr(false);
              setEmailValue(e.target.value);
            }}
          />
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
