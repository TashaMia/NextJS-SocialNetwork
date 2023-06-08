"use client";
import { HouseLine, Bell, Plus, User, SignOut } from "@phosphor-icons/react";
import Link from "next/link";
import AddPost from "./addPostComponent/AddPost";
import { atom, useAtom } from "jotai";
export const textFieldAtom = atom(false);

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openTextFiled, setOpenTextFiled] = useAtom(textFieldAtom);
  const userId = localStorage.getItem("userId");
  return (
    <div>
      {openTextFiled && <AddPost />}

      <div> {children}</div>
      <div className="fixed w-screen px-2  flex justify-between items-center  bottom-0 h-16 border-t border-t-slate-200 bg-white">
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
        // onClick={() => {
        //   navigate("/autorithation");
        //   localStorage.setItem("autorithed", "false");
        //   location.reload();
        // }}
        >
          <Link href="/authorization">
            <SignOut className="w-6 h-6 text-gray-900" />
          </Link>
        </button>
      </div>
    </div>
  );
}
