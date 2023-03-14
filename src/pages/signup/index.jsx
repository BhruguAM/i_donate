import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createWorker, PSM } from "tesseract.js";

import IcUser from "../../assets/icons/ic-user.svg";
import IcPhone from "../../assets/icons/ic-phone.svg";
import icLocation from "../../assets/icons/ic-location.svg";
import IcEmail from "../../assets/icons/ic-email.svg";
import IcCalender from "../../assets/icons/ic-calender.svg";
import IcWhiteArrow from "../../assets/icons/ic-right-arrow-primary.svg";
import { Button, Dropdown, InputText } from "../../component";
import { useHeaderContext } from "../../context";
import { useDonationList } from "../../services/donation";
import { validateEmail } from "../../utils/validate";
import DatePicker from "react-datepicker";
import subYears from "date-fns/subYears";
import { getYear, getMonth } from "date-fns";

let yearDropdown = function generateArrayOfYears() {
  var max = getYear(subYears(new Date(), 18));
  var min = max - 40;
  var years = [];

  for (var i = max; i >= min; i--) {
    years.push(i);
  }
  return years;
};

const years = yearDropdown();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const SignUp = () => {
  const navigate = useNavigate();
  const InputRef = useRef(null);
  const { data, isFetching } = useDonationList();
  const headerCtx = useHeaderContext();
  const [donationOrg, setDonationOrg] = useState([]);
  const [selectedDonationOrg, setSelectedDonationOrg] = useState({
    organization_name: "select",
  });
  const [firstNameFocus, setFirstNameFocus] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [firstNameErr, setFirstNameErr] = useState(false);

  const [lastNameFocus, setLastNameFocus] = useState(false);
  const [LastName, setLastName] = useState("");
  const [LastNameErr, setLastNameErr] = useState(false);

  const [middleNameFocus, setMiddleNameFocus] = useState(false);
  const [middleName, setMiddleName] = useState("");

  const [originFocus, setOriginFocus] = useState(false);
  const [originName, setOriginName] = useState("");

  const [mobileNo, setMobileNo] = useState(false);
  const [mobile, setMobile] = useState("");
  const [mobileCode, setMobileCode] = useState({ value: "+91", label: "+91" });
  const [mobileErr, setMobileErr] = useState(false);

  const [emailFocus, setEmailFocus] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [emailValueErr, setEmailValueErr] = useState(false);

  const [dateFocus, setDateFocus] = useState(false);
  const [dateValue, setDateValue] = useState(null);
  const [dateValueErr, setDateValueErr] = useState(false);

  // const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  const drivingLicense =
    "https://imengine.prod.srp.navigacloud.com/?uuid=CF79CE57-C9E4-42B1-B957-84822E513A4A&type=primary&q=72&width=1200";
  const stateCard =
    "https://upload.wikimedia.org/wikipedia/commons/a/ab/Identity_card_of_the_State_of_Califorinia%2C_sample_%282010%29.jpg?20171204033937";

  const extractText = async (image) => {
    // const text = await Tesseract.recognize(image, {
    //   lang: "eng",
    // });

    const worker = await createWorker({
      logger: (m) => {
        console.log(m);
      },
    });
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const { data } = await worker.recognize(image);
    // console.log(text);
    await worker.terminate();
    return data;
  };

  const extractDetailsFromText = (text) => {
    const lines = text.split("\n");
    let name, address, lastName;

    for (const line of lines) {
      if (line.startsWith("1 ")) {
        name = line.split(" ")[1].trim();
        // console.log(line.split(" "));
      } else if (line.startsWith("2 ")) {
        lastName = line.split(" ")[1].trim();
      } else if (line.startsWith("8 ")) {
        address = line.split(":")[1].trim();
      }
    }

    const details = {
      name,
      address,
      lastName,
    };

    return details;
  };

  const extractDetails = (text) => {
    // Write code here to parse the text and extract the details you're interested in
    // const details = {
    //   name: "John Doe",
    //   address: "123 Main St, Anytown USA 12345",
    //   licenseNumber: "A1B2C3D4E5F6G7H8I9",
    // };
    const details = extractDetailsFromText(text);
    // console.log("extractDetailsFromText", details);
    return details;
  };

  const ScanDoc = async () => {
    const worker = await createWorker({
      logger: (m) => console.log(m), // Add logger here
    });
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(drivingLicense);
    // console.log(text);
    await worker.terminate();
  };

  const handleImageSelect = async (event) => {
    // InputRef.current.onchange()
    // console.log("EVENT",InputRef.current.target);
    // return
    // console.log("IMAGE", event.target.files[0]);
    const image = event.target.files[0];
    const data = await extractText(image);
    // console.log("data.text", data.text);
    // console.log("data", data);
    const details = extractDetails(data.text);
    setUserDetails(details);
  };

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
  }, []);

  // useEffect(() => {
  //   let buttonDisable = false;
  //   if (firstName === "") {
  //     buttonDisable = true;
  //     setFirstNameErr(true);
  //   }
  //   if (LastName === "") {
  //     buttonDisable = true;
  //   }
  //   if (originName === "") {
  //     buttonDisable = true;
  //   }
  //   if (mobile.length !== 10) {
  //     buttonDisable = true;
  //   }
  //   if (dateValue === "") {
  //     buttonDisable = true;
  //   }
  //   if (!validateEmail(emailValue)) {
  //     buttonDisable = true;
  //   }
  //   setButtonDisabled(buttonDisable);
  // }, [
  //   LastName,
  //   dateValue,
  //   emailValue,
  //   firstName,
  //   headerCtx,
  //   middleName,
  //   mobile,
  //   originName,
  // ]);

  const onCheckFields = () => {
    let buttonDisable = false;
    if (firstName === "") {
      buttonDisable = true;
      setFirstNameErr("Please enter first name");
    }
    if (LastName === "") {
      buttonDisable = true;
      setLastNameErr("Please enter last name");
    }
    if (mobile.length !== 10) {
      buttonDisable = true;
      setMobileErr("Please enter mobile number");
    }
    if (dateValue === "" || dateValue === null) {
      buttonDisable = true;
      setDateValueErr("Please enter birth date");
    }
    if (emailValue === "") {
      buttonDisable = true;
      setEmailValueErr("Please enter email");
    } else if (!validateEmail(emailValue)) {
      buttonDisable = true;
      setEmailValueErr("Please enter valid email");
    }
    if (!buttonDisable) {
      onContinue();
    }
    // setButtonDisabled(buttonDisable);
  };

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
    <div className="flex flex-col items-center w-full min-h-[80vh]">
      <div className="w-full max-w-2xl mb-3">
        <label className="text-3xl font-bold text-white">Personal Info</label>
      </div>
      <div
        className={`px-5 pt-5 pb-8 shadow-xl mb-5 rounded-xl bg-primaryBg w-full max-w-2xl z-10`}
      >
        {/* <div className="flex w-full mt-2"> */}
        <Dropdown
          disabled={donationOrg.length === 1}
          items={donationOrg}
          onChange={setSelectedDonationOrg}
          value={selectedDonationOrg}
          showValue={selectedDonationOrg.organization_name}
          title={""}
        />
        {/* </div> */}
        <div className="flex w-full mt-3">
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
            <img src={IcUser} className="h-5 object-contain" alt="p" />
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
        <div className="flex w-full mt-3">
          <label
            className={`border-b ${
              middleNameFocus ? "border-lineColor" : "border-gray-300"
            } text-sm text-greyOut mt-4 pb-2 pr-2`}
          >
            <img src={IcUser} className="h-5 object-contain" alt="p" />
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
        <div className="flex w-full mt-3">
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
            <img src={IcUser} className="h-5 object-contain" alt="p" />
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
        <div className="flex w-full mt-3">
          <label
            className={`border-b ${
              originFocus ? "border-lineColor" : "border-gray-300"
            } text-sm text-greyOut mt-4 pb-2 pr-2`}
          >
            <img src={icLocation} className="h-5 object-contain" alt="p" />
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
        <div className="flex w-full mt-3">
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
            <img src={IcEmail} className="h-5 object-contain" alt="p" />
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
        <div className="flex w-full mt-3">
          <label
            className={`border-b ${
              mobileErr
                ? "border-red-700"
                : mobileNo
                ? "border-lineColor"
                : "border-gray-300"
            } text-sm text-greyOut mt-4 pb-2 pr-2 ${
              mobileErr && "animate-pulse_finite"
            }`}
          >
            <img src={IcPhone} className="h-5 object-contain" alt="p" />
          </label>
          <Dropdown
            // disabled={donationOrg.length === 0}
            isError={mobileErr}
            showError={false}
            items={[
              { label: "+91", value: "+91" },
              { label: "+92", value: "+92" },
            ]}
            onChange={(e) => {
              // setDonationOrgErr(false);
              setMobileCode(e);
            }}
            value={mobileCode}
            showValue={mobileCode.label}
            extraClass={`w-14 z-auto ${mobileNo && "border-lineColor"}`}
          />
          <InputText
            id={"mobile"}
            isError={mobileErr}
            onFocus={() => setMobileNo(true)}
            onBlur={() => setMobileNo(false)}
            extraClassName={"mt-4 pb-2 w-full"}
            type={"number"}
            value={mobile}
            maxLength={10}
            minLength={10}
            placeholder={"Phone Number"}
            onChange={(e) => {
              setMobileErr(false);
              setMobile(e.target.value);
            }}
          />
        </div>
        <div className="flex w-full relative mt-3">
          <label
            className={`border-b ${
              dateValueErr
                ? "border-red-700"
                : dateFocus
                ? "border-lineColor"
                : "border-gray-300"
            } text-sm text-greyOut mt-4 pb-2 pr-2 ${
              dateValueErr && "animate-pulse_finite"
            }`}
          >
            <img src={IcCalender} className="h-5 object-contain" alt="p" />
          </label>
          <DatePicker
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => {
              return (
                <div className="m-2 flex justify-between">
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                  >
                    {"<"}
                  </button>
                  <div className="flex">
                    <select
                      value={getYear(date)}
                      onChange={({ target: { value } }) => changeYear(value)}
                    >
                      {years.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <select
                      value={months[getMonth(date)]}
                      onChange={({ target: { value } }) =>
                        changeMonth(months.indexOf(value))
                      }
                    >
                      {getYear(date) === getYear(subYears(new Date(), 18))
                        ? months
                            .slice(0, new Date().getMonth() + 1)
                            .map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))
                        : months.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                    </select>
                  </div>
                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                  >
                    {">"}
                  </button>
                </div>
              );
            }}
            id={"dob"}
            maxDate={subYears(new Date(), 18)}
            selected={dateValue}
            onChange={(date) => {
              setDateValueErr(false);
              setDateValue(date);
            }}
            placeholderText="Date of Birth"
            onCalendarOpen={() => setDateFocus(true)}
            onCalendarClose={() => setDateFocus(false)}
            calendarClassName="z-100"
            // wrapperClassName="Z-100"
            // monthClassName={"z-100"}
            className={`border-b bg-primaryBg ${
              dateValueErr ? "border-red-700" : "border-gray-300"
            } text-sm text-greyOut focus:${
              dateValueErr ? "border-red-700" : "border-lineColor"
            } mt-4 pb-2 w-full`}
          />
          {dateValueErr && (
            <label className="text-xs absolute -bottom-4 text-red-700 ml-7">
              {dateValueErr}
            </label>
          )}
        </div>
        {/* <input
          ref={InputRef}
          type="file"
          className=""
          onChange={handleImageSelect}
        /> */}
      </div>
      <Button
        // disabled={isButtonDisabled}
        onClick={() => onCheckFields()}
        extraClass={`max-w-2xl ${dateFocus ? "-z-1" : "z-10"}`}
        title={"Continue"}
        white
      />
      {/* <div
        onClick={() => ScanDoc()}
        className="p-3 rounded-full animate-pulse bg-orange-600 text-lg fixed bottom-0 right-0 m-5 text-white"
      >
        Scan Doc
      </div> */}
    </div>
  );
};
