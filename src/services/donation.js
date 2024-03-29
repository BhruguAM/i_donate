import { useQuery } from "react-query";
import { BaseUrl } from "../config/config";
import { getWithExpiry } from "../utils";

const BASE_URL = BaseUrl;

export function useDonationList() {
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
      Authorization: getWithExpiry("token")
        ? "Bearer " + getWithExpiry("token")
        : "",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((err) => err);
};

export const DeleteIntent = async (data) => {
  return await fetch(`${BASE_URL}/api/delete-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getWithExpiry("token")
        ? "Bearer " + getWithExpiry("token")
        : "",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch((err) => err);
};

export function useDonationHistory() {
  const options = {
    method: "GET",
    headers: {
      Authorization: getWithExpiry("token")
        ? "Bearer " + getWithExpiry("token")
        : "",
    },
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

// const Header = {
//   Authorization: getWithExpiry("token")
//     ? "Bearer " + getWithExpiry("token")
//     : "",
// };
