import React, { useEffect, useState } from "react";
import { Button, InputText } from "../../component";

export const DonationDetails = () => {
  const [extra, setExtra] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [formData, setFromData] = useState([
    { title: "Name", value: "", type: "text" },
    { title: "Address 1", value: "", type: "text" },
    { title: "Address 2", value: "", type: "text" },
    { title: "City", value: "", type: "text" },
    { title: "State", value: "", type: "text" },
    { title: "ZIP", value: "", type: "number" },
    { title: "Phone Number", value: "", type: "number" },
    { title: "Email", value: "", type: "email" },
  ]);

  useEffect(() => {
    const IsEmpty = formData.find((i) => i.value === "");
    console.log("isEmpty", IsEmpty);
    if (IsEmpty) {
      if (IsEmpty.title === "Address 2") {
        setButtonDisable(false);
      } else {
        setButtonDisable(true);
      }
    } else {
      setButtonDisable(false);
    }
  }, [extra]);

  const onChangeInput = (e, i, k) => {
    if (i.type === "text" && !i.title.includes("Address")) {
      const re = /^[A-Za-z]+$/;
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
          <div key={"details" + k} className="flex flex-col pb-5">
            <label className="text-sm font-medium text-primary">
              {i.title}
            </label>
            <InputText
              name={i.title}
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
        onClick={() => console.log("Clicked")}
      />
    </div>
  );
};
