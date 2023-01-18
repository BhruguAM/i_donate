import React, { useState } from "react";
import { Button } from "../../component";

export const DonationDetails = () => {
  const [extra, setExtra] = useState(0);
  const [formData, setFromData] = useState([
    { title: "Name", value: "", type: "text" },
    { title: "Address 1", value: "", type: "text" },
    { title: "Address 2", value: "", type: "text" },
    { title: "City", value: "", type: "text" },
    { title: "State", value: "", type: "text" },
    { title: "ZIP", value: "", type: "text" },
    { title: "Phone Number", value: "", type: "number" },
    { title: "Email", value: "", type: "email" },
  ]);

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
            <input
              name={i.title}
              className="border-b border-gray-300 text-sm text-greyout mt-4 pb-2 w-full"
              type={i.type}
              value={i.value}
              onChange={(e) => {
                formData[k].value = e.target.value;
                setFromData(formData);
                setExtra(extra + 1);
              }}
            />
          </div>
        ))}
      </div>
      <Button
        // disabled={amount === ""}
        title={"Donate Now"}
        onClick={() => console.log("Clicked")}
      />
    </div>
  );
};
