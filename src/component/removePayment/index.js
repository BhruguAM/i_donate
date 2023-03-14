import React from "react";
import { DeleteIntent } from "../../services/donation";
import { Button } from "../button";

export const RemovePayment = ({ setOpen, setOkay, state }) => {
  const onRemovePayment = async () => {
    const body = {
      payment_intent_key: state.gateway_clientSecret.split("_secret_")[0],
    };
    const res = await DeleteIntent(body);
    if (res.status) {
      setOkay(true);
      setOpen(false);
      window.location.replace(`${window.location.origin}/donation`);
    } else {
      setOkay(true);
      setOpen(false);
    }
  };

  return (
    <div className="p-5 bg-white">
      <label className="text-lg text-center flex m-4">
        Are you sure want to cancel this transaction?
      </label>
      <div className="flex justify-between items-center">
        <Button
          //   disabled={!item}
          title={"Yes"}
          onClick={() => {
            onRemovePayment();
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
