import { BaseUrl } from "../config/config";

const BASE_URL = BaseUrl;

export const PaymentDetails = async (data) => {
  return await fetch(`${BASE_URL}/api/payment-details`, {
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
