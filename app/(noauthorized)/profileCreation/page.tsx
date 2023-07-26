"use client";
import { FileImage, Spinner } from "@phosphor-icons/react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import useFileloader from "../../useFileLoader";

import useGetUsers from "../../useGetUsers";
import useMutateUsers from "../../useMutateUsers";
import { emailAt, passwordAt } from "../../atoms";
import Image from "next/image";

export default function ProfieCreation() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [picture, setPicture] = useState<File | null>(null);
  const filePicker = useRef<HTMLInputElement>(null);
  const [newUserImage, setNewUserImage] = useState();
  const email = useAtomValue(emailAt);
  const password = useAtomValue(passwordAt);
  const router = useRouter();
  const [done, setDone] = useState("");
  const users = useGetUsers({ isFilter: false });
  const userIndex = users?.length + 2;
  function handleChangeFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = event?.currentTarget?.files;
    setPicture(files && files[0]);
  }

  function handlePick() {
    filePicker?.current?.click();
  }

  function getFirstName(event: React.FormEvent<HTMLInputElement>) {
    setFirstName(event.currentTarget.value);
  }

  function getLastName(event: React.FormEvent<HTMLInputElement>) {
    setLastName(event.currentTarget.value);
  }

  const [loader, setLoader] = useState(false);

  const fileLoader = useFileloader(setNewUserImage);
  const { trigger, isMutating } = useMutateUsers();

  useEffect(() => {
    fileLoader(userIndex, picture, setDone, setLoader);
    picture !== null && done !== "Done" ? setLoader(true) : setLoader(false);
  }, [picture]);

  const handleAddUser = () => {
    trigger({
      body: {
        email: email,
        firstName: firstName,
        id: "fekwh" + userIndex,
        lastName: lastName,
        password: password,
        picture: `https://firebasestorage.googleapis.com/v0/b/file-uploade.appspot.com/o/user-image-${userIndex}?alt=media&token=95f60686-e686-4cde-b037-83c58beec57e`,
      },
    });
  };

  return (
    <div className="flex flex-col items-center mt-2 mb-2 ">
      <div className="flex flex-col gap-8 w-92 items-start p-6">
        <h1 className="text-3xl">Создайте ваш профиль</h1>
        <div className=" relative w-32 h-32">
          {loader ? (
            <button
              onClick={handlePick}
              className=" w-32 h-32  rounded-xl  fixed   hover:bg-slate-400/[0.2]"
            >
              <Spinner className=" h-10 ml-12 mt-10 w-10 opacity-100 text-black  animate-spin" />
            </button>
          ) : (
            <button
              onClick={handlePick}
              className=" w-32 h-32  rounded-xl  fixed opacity-0 hover:opacity-100 hover:bg-slate-400/[0.2]"
            >
              <FileImage className=" h-8 ml-24 mt-24 w-6  text-black  " />
            </button>
          )}
          <Image
            src={
              newUserImage
                ? `https://firebasestorage.googleapis.com/v0/b/file-uploade.appspot.com/o/user-image-${userIndex}?alt=media&token=95f60686-e686-4cde-b037-83c58beec57e`
                : "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-3.jpg"
            }
            alt="avatar"
            className="w-32 h-32  rounded-xl object-cover"
            width={300}
            height={300}
          />

          <input
            className="opacity-0 h-0 w-0 leading-[0px] overflow-hidden p-0 m-0"
            ref={filePicker}
            type="file"
            onChange={handleChangeFiles}
            accept="image/*,.png,.jpg,.gif"
          />
        </div>
        <div className="flex mt-4 flex-col items-start gap-6">
          <h2 className="text-gray-500">Введите имя:</h2>
          <input
            type="text"
            className="border border-l-slate-400 w-[100%] rounded-sm h-10 p-2 hover:border-violet-600  focus:outline-none focus:ring focus:ring-violet-300"
            value={firstName}
            onChange={getFirstName}
          />
          <h2 className="text-gray-500">Введите фамилию:</h2>
          <input
            className="border border-l-slate-400 w-[100%] rounded-sm h-10 p-2 hover:border-violet-600  focus:outline-none focus:ring focus:ring-violet-300"
            type="text"
            value={lastName}
            onChange={getLastName}
          />
          <button
            className=" bg-gray-900 p-2  w-40 rounded-sm text-white text-normal h-12"
            onClick={() => {
              handleAddUser();
              localStorage.setItem("userId", "fekwh" + userIndex);
              localStorage.setItem("user", `${userIndex}`);
              router.push(`/user/${"fekwh" + userIndex}`);
              localStorage.setItem("autorithed", "true");
            }}
          >
            Готово
          </button>
        </div>
      </div>
    </div>
  );
}
