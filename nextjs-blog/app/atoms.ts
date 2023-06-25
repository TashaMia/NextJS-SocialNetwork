import { atom } from "jotai";

export const textFieldAtom = atom<boolean>(false);
export const modalWindow = atom<boolean>(false);
export const emailAt = atom<string>("");
export const passwordAt = atom<string>("");