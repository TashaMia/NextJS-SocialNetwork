"use client";
import {
  HouseLine,
  MagnifyingGlass,
  Plus,
  Bell,
  User,
} from "@phosphor-icons/react";
import Link from "next/link";
import SideMenu from "./SideMenu";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { usePathname, useParams } from "next/navigation";
import { useState, SetStateAction } from "react";
import { textFieldAtom, modalComm, modalWindow, stopScroll } from "../../atoms";
import { modalWindowQuestion } from "../../modalWindow/ModalWindow";
import { useRouter } from "next/navigation";

export default function Menu() {
  const [openTextFiled, setOpenTextFiled] = useAtom(textFieldAtom);
  const [userId, setUserId] = useState<SetStateAction<string | null>>("");
  const commentWindowOpen = useAtomValue(modalComm);
  const [modalWindowOpened, setModalWindowOpened] = useAtom(modalWindow);
  const [modalWindowSearch, setModalWindowSearch] = useAtom(stopScroll);

  const path = usePathname();
  const params = useParams();

  const currentUser =
    typeof window != "undefined" ? localStorage?.getItem("userId") : "";
  const modaWindowQue = useSetAtom(modalWindowQuestion);
  const modaWindowVisible = useSetAtom(modalWindow);
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-center">
        <div className="hidden lg:w-[100%]  lg:flex lg:justify-end lg:min-h-screen lg:border-r lg:border-slate-300 ">
          <SideMenu />
        </div>
      </div>
      <div className="lg:hidden fixed w-screen px-10 z-0  flex justify-between items-center  bottom-0 h-16 border-t border-t-slate-200 bg-white">
        <Link href="/" className="w-11 h-11 flex justify-center items-center">
          <HouseLine
            className={
              path == "/"
                ? "text-gray-900  p-2 w-10 h-10 rounded-full  bg-gray-300/[0.2]"
                : "text-gray-900  w-6 h-6 hover:p-2 hover:w-10 hover:h-10 hover:rounded-full  hover:bg-gray-300/[0.2]"
            }
            weight={path == "/" ? "fill" : "regular"}
          />
        </Link>
        <button
          onClick={() => setModalWindowSearch(true)}
          className="w-11 h-11 flex justify-center items-center"
        >
          <MagnifyingGlass className="text-gray-900  w-6 h-6  hover:p-2 hover:w-10 hover:h-10 hover:rounded-full  hover:bg-gray-300/[0.2]" />
        </button>

        <button
          onClick={() => {
            if (currentUser == null) {
              modaWindowQue("Хотите войти в профиль?");
              modaWindowVisible(true);
            } else {
              setOpenTextFiled(true);
            }
          }}
        >
          <Plus className="w-11 h-11  text-white rounded-full bg-gray-900" />
        </button>
        <button
          className="w-11 h-11 flex justify-center items-center"
          onClick={() => {
            if (currentUser == null) {
              modaWindowQue("Хотите войти в профиль?");
              modaWindowVisible(true);
            } else {
              router.push("/notifications");
            }
          }}
        >
          <Bell
            className={
              path == "/notifications"
                ? " text-yellow-400  p-2 w-10 h-10 rounded-full  bg-gray-300/[0.2]"
                : "w-6 h-6 text-yellow-400  hover:p-2 hover:w-10 hover:h-10 hover:rounded-full  hover:bg-gray-300/[0.2]"
            }
            weight={path == "/notifications" ? "fill" : "regular"}
          />
        </button>

        <button
          className="w-11 h-11 flex justify-center items-center"
          onClick={() => {
            if (currentUser == null) {
              modaWindowQue("Хотите войти в профиль?");
              modaWindowVisible(true);
            } else {
              router.push(`/user/${currentUser}`);
            }
          }}
        >
          <User
            className={
              path == `/user/${params.id}`
                ? "text-gray-900  p-2 w-10 h-10 rounded-full  bg-gray-300/[0.2]"
                : "text-gray-900  w-6 h-6  hover:p-2 hover:w-10 hover:h-10 hover:rounded-full  hover:bg-gray-300/[0.2]"
            }
            weight={path == `/user/${params.id}` ? "fill" : "regular"}
          />
        </button>
      </div>
    </div>
  );
}
