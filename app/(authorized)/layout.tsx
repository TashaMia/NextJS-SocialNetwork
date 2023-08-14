"use client";
import {
  HouseLine,
  Bell,
  Plus,
  User,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import Link from "next/link";
import AddPost from "./addPostComponent/AddPost";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import ModalWindow, { modalWindowQuestion } from "../modalWindow/ModalWindow";
import SideMenu from "./appComponent/SideMenu";
import { modalComm, modalWindow, stopScroll, textFieldAtom } from "../atoms";
import { SetStateAction, useState } from "react";
import ModalComments from "./feed/ModalComments";
import { useParams, usePathname } from "next/navigation";
import SearchModalWindow from "./Search/SearchModalWindow";

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [openTextFiled, setOpenTextFiled] = useAtom(textFieldAtom);
  // const [userId, setUserId] = useState<SetStateAction<string | null>>("");
  // const commentWindowOpen = useAtomValue(modalComm);
  // const [modalWindowOpened, setModalWindowOpened] = useAtom(modalWindow);
  // const [modalWindowSearch, setModalWindowSearch] = useAtom(stopScroll);

  // const path = usePathname();
  // const params = useParams();

  // setTimeout(() => {
  //   const user =
  //     typeof window != "undefined" ? localStorage?.getItem("userId") : "";
  //   setUserId(user);
  // }, 1000);

  return (
    <div className="lg:h-[100%] lg:w-[100%]">
      <div className=" w-[100%]"> {children}</div>
    </div>
  );
}
