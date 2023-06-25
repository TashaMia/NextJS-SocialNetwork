"use client";
import { HouseLine, Bell, Plus, User, SignOut } from "@phosphor-icons/react";
import Link from "next/link";
import AddPost from "./addPostComponent/AddPost";
import { atom, useAtom, useSetAtom } from "jotai";
import ModalWindow, { modalWindowQuestion } from "../modalWindow/ModalWindow";
import SideMenu from "./appComponent/SideMenu";
import { modalWindow, textFieldAtom } from "../atoms";

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openTextFiled, setOpenTextFiled] = useAtom(textFieldAtom);
  const userId =
    typeof window != "undefined" ? localStorage?.getItem("userId") : "";
  const [modalWindowOpened, setModalWindowOpened] = useAtom(modalWindow);
  const modaWindowQue = useSetAtom(modalWindowQuestion);

  return (
    <div className="sm:h-[100%]">
      {modalWindowOpened && <ModalWindow />}
      {openTextFiled && <AddPost />}
      <div className="flex">
        <div className="hidden sm:w-[30%] sm:flex sm:justify-end sm:min-h-screen sm:border-r sm:border-slate-300 ">
          <SideMenu />
        </div>
        <div className="sm:w-[70%] w-[100%]"> {children}</div>
      </div>
      <div className="sm:hidden fixed w-screen px-2  flex justify-between items-center  bottom-0 h-16 border-t border-t-slate-200 bg-white">
        <Link href="/feed">
          <HouseLine className="text-gray-900  w-6 h-6" />
        </Link>
        <Link href="/notifications">
          <Bell className="w-6 h-6 text-yellow-400" />
        </Link>
        <button onClick={() => setOpenTextFiled(true)}>
          <Plus className="w-10 h-10  text-white rounded-full bg-gray-900" />
        </button>
        <Link href={`/user/${userId}`}>
          <User className="w-6 h-6 text-gray-900" />
        </Link>

        <button
          onClick={() => {
            modaWindowQue("Вы уверены что хотите выйти?");

            setModalWindowOpened(true);
          }}
        >
          <SignOut className="w-6 h-6 text-gray-900" />
        </button>
      </div>
    </div>
  );
}
