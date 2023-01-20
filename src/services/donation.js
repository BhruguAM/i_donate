import { useQuery } from "react-query";
import { BaseUrl } from "../config/config";

const BASE_URL = BaseUrl;

export function useDoantionList() {
  return useQuery(
    ["donation-list"],
    async () =>
      await fetch(`${BASE_URL}/api/donation-list`)
        .then((response) => response.json())
        .then((json) => json)
        .catch((err) => err)
  );
}

export const AddDonation = async (data) => {
  return await fetch(`${BASE_URL}/api/donation-add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((err) => err);
};
