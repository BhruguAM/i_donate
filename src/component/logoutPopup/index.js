import React from "react";
import { deleteStorage } from "../../utils";
import { Button } from "../button";

export const LogoutPopup = ({ setOpen, setOkay, navigate }) => {
  const onLogout = async () => {
    deleteStorage("token");
    deleteStorage("member");
    setOkay(true);
    setOpen(false);
    window.location = window.location.origin + "/auth/signin";
  };

  return (
    <div className="p-5 bg-white">
      <label className="text-lg text-center flex m-4">
        {"Are you sure want to"}
        <label className="text-red-700 text-lg text-center ml-1 font-bold">
          {"logout?"}
        </label>
      </label>
      <div className="flex justify-between items-center">
        <Button
          //   disabled={!item}
          title={"Yes"}
          onClick={() => {
            onLogout();
          }}
          extraClass={"mr-2"}
        />
        <Button
          secondary
          title={"No"}
          onClick={() => {
            setOkay(true);
            setOpen(false);
          }}
          extraClass={"ml-2"}
        />
      </div>
    </div>
  );
};
