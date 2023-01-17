import React, { useState } from "react";
import { Button, Dropdown } from "../../component";
import IcRightArrow from "../../assets/icons/ic-right-arrow.svg";

const data = [{ name: "Aarti" }, { name: "pooja" }];

export const Donation = () => {
  const [selected, setSelected] = useState(data[0]);
  return (
    <div>
      <div>Donation</div>
      <Button title={"Continue"} icon={IcRightArrow} />
      <Dropdown
        items={data}
        onChange={setSelected}
        value={selected}
        title={"Donation To"}
      />
    </div>
  );
};
