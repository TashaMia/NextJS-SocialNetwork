import { atom } from "jotai";

export const textFieldAtom = atom<boolean>(false);
export const modalWindow = atom<boolean>(false);
export const emailAt = atom<string>("");
export const passwordAt = atom<string>("");
export const modalComm = atom<boolean>(false);
export const postID = atom<number | null>(null);
export const userWhoIsCommenting = atom<string>("");
export const openComments = atom<boolean>(false);
export const stopScroll = atom<boolean>(false);
