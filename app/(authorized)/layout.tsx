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
  const [openTextFiled, setOpenTextFiled] = useAtom(textFieldAtom);
  const [userId, setUserId] = useState<SetStateAction<string | null>>("");
  const commentWindowOpen = useAtomValue(modalComm);
  const [modalWindowOpened, setModalWindowOpened] = useAtom(modalWindow);
  const [modalWindowSearch, setModalWindowSearch] = useAtom(stopScroll);

  const path = usePathname();
  const params = useParams();

  setTimeout(() => {
    const user =
      typeof window != "undefined" ? localStorage?.getItem("userId") : "";
    setUserId(user);
  }, 1000);

  return (
    <div className="lg:h-[100%]">
      {commentWindowOpen && <ModalComments />}
      {modalWindowSearch && (
        <SearchModalWindow setModalWindowSearch={setModalWindowSearch} />
      )}
      {modalWindowOpened && <ModalWindow />}
      {openTextFiled && <AddPost />}
      <div className="flex justify-center">
        <div className="hidden lg:w-[20%]  lg:flex lg:justify-end lg:min-h-screen lg:border-r lg:border-slate-300 ">
          <SideMenu />
        </div>
        <div className=" w-[100%]"> {children}</div>
      </div>
      <div className="lg:hidden fixed w-screen px-10 z-0  flex justify-between items-center  bottom-0 h-16 border-t border-t-slate-200 bg-white">
        <Link
          href="/feed"
          className="w-11 h-11 flex justify-center items-center"
        >
          <HouseLine
            className={
              path == "/feed"
                ? "text-gray-900  p-2 w-10 h-10 rounded-full  bg-gray-300/[0.2]"
                : "text-gray-900  w-6 h-6 hover:p-2 hover:w-10 hover:h-10 hover:rounded-full  hover:bg-gray-300/[0.2]"
            }
            weight={path == "/feed" ? "fill" : "regular"}
          />
        </Link>
        <button
          onClick={() => setModalWindowSearch(true)}
          className="w-11 h-11 flex justify-center items-center"
        >
          <MagnifyingGlass className="text-gray-900  w-6 h-6  hover:p-2 hover:w-10 hover:h-10 hover:rounded-full  hover:bg-gray-300/[0.2]" />
        </button>

        <button onClick={() => setOpenTextFiled(true)}>
          <Plus className="w-11 h-11  text-white rounded-full bg-gray-900" />
        </button>
        <Link
          href="/notifications"
          className="w-11 h-11 flex justify-center items-center"
        >
          <Bell
            className={
              path == "/notifications"
                ? " text-yellow-400  p-2 w-10 h-10 rounded-full  bg-gray-300/[0.2]"
                : "w-6 h-6 text-yellow-400  hover:p-2 hover:w-10 hover:h-10 hover:rounded-full  hover:bg-gray-300/[0.2]"
            }
            weight={path == "/notifications" ? "fill" : "regular"}
          />
        </Link>

        <Link
          href={`/user/${userId}`}
          className="w-11 h-11 flex justify-center items-center"
        >
          <User
            className={
              path == `/user/${params.id}`
                ? "text-gray-900  p-2 w-10 h-10 rounded-full  bg-gray-300/[0.2]"
                : "text-gray-900  w-6 h-6  hover:p-2 hover:w-10 hover:h-10 hover:rounded-full  hover:bg-gray-300/[0.2]"
            }
            weight={path == `/user/${params.id}` ? "fill" : "regular"}
          />
        </Link>
      </div>
    </div>
  );
}
