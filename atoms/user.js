import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user")) || null
      : null,
});
