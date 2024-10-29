import { atom } from "recoil";

export const sortingOptionAtom = atom({
  key: "sortingOptionAtom",
  default: localStorage.getItem("sortingOption") || "priority", 
});
