import { useQuery } from "react-query";

const BASE_URL = "https://f96c-49-34-82-220.in.ngrok.io";

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
