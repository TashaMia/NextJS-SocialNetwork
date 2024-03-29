"use client";
import "./globals.css";
import "./animation.css";

import { Inter } from "next/font/google";
import { useAtom, useAtomValue } from "jotai";
import { usePathname, useParams } from "next/navigation";
import { useState, SetStateAction, useEffect } from "react";
import SearchModalWindow from "./(authorized)/Search/SearchModalWindow";
import AddPost from "./(authorized)/addPostComponent/AddPost";
import ModalComments from "./(authorized)/feed/ModalComments";
import { textFieldAtom, modalComm, modalWindow, stopScroll } from "./atoms";
import ModalWindow from "./modalWindow/ModalWindow";
import Menu from "./(authorized)/appComponent/Menu";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
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

  const [menuIsVisible, setMenuIsVisible] = useState(true);

  useEffect(() => {
    if (path == "/authorizationV2") {
      setMenuIsVisible(false);
    } else {
      setMenuIsVisible(true);
    }
  }, [path]);

  return (
    <html lang="en">
      <body className="sm:w-full min-h-screen  lg:flex lg:h-full ">
        {commentWindowOpen && <ModalComments />}
        {modalWindowSearch && (
          <SearchModalWindow setModalWindowSearch={setModalWindowSearch} />
        )}
        {modalWindowOpened && <ModalWindow />}
        {openTextFiled && <AddPost />}
        {menuIsVisible && <Menu />}
        {children}
      </body>
    </html>
  );
}
