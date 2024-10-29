import { atom } from "recoil";

export const groupingOptionAtom = atom({
  key: "groupingOptionAtom",
  default: localStorage.getItem("groupingOption") || "status", 
});
