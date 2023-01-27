import { BaseUrl } from "../config/config";
import { getWithExpiry } from "../utils";

const BASE_URL = BaseUrl;

export const PaymentDetails = async (data) => {
  return await fetch(`${BASE_URL}/api/payment-details`, {
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

const Header = {
  Authorization: getWithExpiry("token")
    ? "Bearer " + getWithExpiry("token")
    : "",
};
