"use client";
import { FileImage, RadioButton, Robot } from "@phosphor-icons/react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import useFileloader from "../../useFileLoader";

import useGetUsers from "../../useGetUsers";
import useMutateUsers from "../../useMutateUsers";
import useMutationUsers from "../../useMutateUsers";
import { emailAt, passwordAt } from "../authorization/page";

export default function ProfieCreation() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [picture, setPicture] = useState("");
  const filePicker = useRef<HTMLInputElement>(null);
  const [newUserImage, setNewUserImage] = useState();
  const email = useAtomValue(emailAt);
  const password = useAtomValue(passwordAt);
  const router = useRouter();

  const users = useGetUsers({ isFilter: false });

  console.log(users);
  const userIndex = users.length + 1;

  function handleChangeFiles(event) {
    console.log(event.target.files);
    setPicture(event.target.files[0]);
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

  function checkType() {
    setGender(getCheckedRadioValue("gender"));
  }

  function getCheckedRadioValue(name: string) {
    const elements = document.getElementsByName(name);
    for (let i = 0, len = elements.length; i < len; ++i) {
      if (elements[i].checked) {
        return elements[i].value;
      }
    }
  }

  const fileLoader = useFileloader(setNewUserImage);
  const { trigger, isMutating } = useMutateUsers();

  const handleAddUser = () => {
    checkType();
    trigger({
      body: {
        email: email,
        firstName: firstName,
        gender: gender,
        id: "fekwh" + userIndex,
        lastName: lastName,
        password: password,
        picture: `https://firebasestorage.googleapis.com/v0/b/file-uploade.appspot.com/o/user-image-${userIndex}?alt=media&token=95f60686-e686-4cde-b037-83c58beec57e`,
      },
    });
  };

  return (
    <div className="flex flex-col items-center mt-2 mb-2 ">
      {/* <Robot className="w-16 h-16 text-violet-500 "/> */}

      <div className="flex flex-col gap-8 w-92 items-start p-6">
        {/* <form className="flex flex-col gap-6 items-start "> */}
        <h1 className="text-3xl">Создайте ваш профиль</h1>
        <div>
          <img
            src={
              newUserImage
                ? `https://firebasestorage.googleapis.com/v0/b/file-uploade.appspot.com/o/user-image-${userIndex}?alt=media&token=95f60686-e686-4cde-b037-83c58beec57e`
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
            }
            alt="avatar"
            className="w-28 h-30"
          />

          <div className="flex justify-center">
            <button onClick={handlePick}>
              <FileImage className=" h-14 w-6" />
            </button>
            <input
              className="opacity-0 h-0 w-0 leading-[0px] overflow-hidden p-0 m-0"
              ref={filePicker}
              type="file"
              onChange={handleChangeFiles}
              accept="image/*"
            />
            <button onClick={() => fileLoader(userIndex, picture)}>
              Загрузить картинку
            </button>
          </div>
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
          <h2 className="text-gray-500">Выберите пол:</h2>
          <div className="flex flex-col justify-start items-start gap-4">
            <div className="flex gap-4">
              <input
                type="radio"
                name="gender"
                id="gengerChoiceMen"
                value="men"
                checked
                className="accent-black"
              />
              <label htmlFor="gengerChoiceMen">Мужчина</label>
            </div>
            <div className="flex gap-4">
              <input
                type="radio"
                name="gender"
                id="gengerChoiceWomen"
                value="women"
                onChange={() => setGender("women")}
                className="accent-black"
              />
              <label htmlFor="gengerChoiceWomen">Женщина</label>
            </div>
          </div>
        </div>
        {/* </form> */}
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
  );
}
