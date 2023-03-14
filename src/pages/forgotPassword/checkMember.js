import React from "react";
import IcUser from "../../assets/icons/ic-user.svg";
import IcClose from "../../assets/icons/ic-close.svg";
import { InputText } from "../../component";

export const CheckMember = ({
  memberId,
  setMemberId,
  memberIdFocus,
  setMemberIdFocus,
  memberIdErr,
  setShowing,
}) => {
  return (
    <div className={`pt-5 pb-8 mb-5 w-full z-10 flex flex-col`}>
      <div className="flex w-full">
        <label
          className={`border-b ${
            memberIdErr
              ? "border-red-700"
              : memberIdFocus
              ? "border-lineColor"
              : "border-gray-300"
          } text-sm text-greyOut mt-4 pb-2 pr-2`}
        >
          <img src={IcUser} className="h-5 object-contain" alt="p" />
        </label>
        <InputText
          id={"id"}
          isError={memberIdErr}
          onFocus={() => setMemberIdFocus(true)}
          onBlur={() => setMemberIdFocus(false)}
          extraClassName={"mt-4 pb-2 w-full"}
          type={"text"}
          value={memberId}
          placeholder={"Enter Member ID"}
          onChange={(e) => {
            setMemberId(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
