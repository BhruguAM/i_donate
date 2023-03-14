import { BaseUrl } from "../config/config";
import { getWithExpiry } from "../utils";

const BASE_URL = BaseUrl;

export const SignUpAPI = async (data) => {
  return await fetch(`${BASE_URL}/api/sign-up`, {
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

export const SignInAPI = async (data) => {
  return await fetch(`${BASE_URL}/api/sign-in`, {
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

export const CheckMemberAPI = async (data) => {
  return await fetch(`${BASE_URL}/api/check-member`, {
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

export const ForgotPasswordAPI = async (data) => {
  return await fetch(`${BASE_URL}/api/forgot-password`, {
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

export const ChangePasswordAPI = async (data) => {
  return await fetch(`${BASE_URL}/api/change-password`, {
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

export const UpdateUserAPI = async (data) => {
  return await fetch(`${BASE_URL}/api/change-profile`, {
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
