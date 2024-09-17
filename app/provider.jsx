"use client";
import { RecoilRoot } from "recoil";

export const Providers = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
