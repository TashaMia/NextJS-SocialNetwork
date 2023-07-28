"use client";
import { Bell, HouseLine, Plus, User } from "@phosphor-icons/react";
import Link from "next/link";
import { useSetAtom } from "jotai";
import { textFieldAtom } from "../../atoms";

export default function SideMenu() {
  const setOpenTextFiled = useSetAtom(textFieldAtom);
  const userId =
    typeof window != "undefined" ? localStorage.getItem("userId") : "";
  return (
    <div className="flex flex-col gap-4 justify-start items-start mt-20 sm:h-hv text-xl">
      <Link href="/feed">
        <div className="flex h-10 gap-2 justify-start items-center p-2 px-4">
          <HouseLine className="text-gray-900  w-6 h-6" />
          <p>Лента</p>
        </div>
      </Link>
      <Link href="/notifications">
        <div className="flex h-10 gap-2 justify-start items-center p-1 px-4">
          <Bell className="w-6 h-6 text-yellow-400" /> <p>Уведомления</p>
        </div>
      </Link>

      <Link href={`/user/${userId}`}>
        <div className="flex h-10 gap-2 justify-start p-1 items-center px-4">
          <User className="w-6 h-6  text-gray-900" />
          <p>Профиль</p>
        </div>
      </Link>
      <button
        onClick={() => setOpenTextFiled(true)}
        className="flex bg-gray-800 text-white rounded-sm w-[100%] h-12 gap-2 p-2 px-4 justify-start items-center"
      >
        <Plus className="w-6 h-6  text-white rounded-full bg-gray-800 " />
        <p>Пост</p>
      </button>
    </div>
  );
}
