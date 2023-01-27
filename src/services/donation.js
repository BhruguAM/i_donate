import { useQuery } from "react-query";
import { BaseUrl } from "../config/config";
import { getWithExpiry } from "../utils";

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
      Authorization: Header.Authorization,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((err) => err);
};

export function useDoantionHistory() {
  const options = {
    method: "GET",
    headers: Header,
  };
  return useQuery(
    ["donation-history"],
    async () =>
      await fetch(`${BASE_URL}/api/payment-history`, options)
        .then((response) => response.json())
        .then((json) => json)
        .catch((err) => err)
  );
}

const Header = {
  Authorization: getWithExpiry("token")
    ? "Bearer " + getWithExpiry("token")
    : "",
};
