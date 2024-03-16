import Cookies from "js-cookie";

export function createConfigForRequest() {
  const token = Cookies.get("token");
  if (!token) return {};

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}
