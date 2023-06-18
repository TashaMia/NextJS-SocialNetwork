"use client";
import { ChangeEvent, useEffect, useReducer, useRef, useState } from "react";
import useGetUsers from "../../../useGetUsers";
import PostsList from "../../feed/feedComponent/PostsList";
import EditProfile from "./userComponents/EditProfile";
import { useParams } from "next/navigation";
import useFileloader from "../../../useFileLoader";
import { FileImage } from "@phosphor-icons/react";

export default function User() {
  const userId = localStorage.getItem("userId");
  const params = useParams();
  const userIndex = Number(localStorage.getItem("user"));
  const [isLogInUser, setIsLogInUser] = useState(false);
  useEffect(() => {
    if (params.id == userId) {
      setIsLogInUser(true);
    }
  });

  const users = useGetUsers({
    isFilter: true,
    filter: params.id,
  });
  const [editIsVisible, setEditIsVisible] = useState(false);

  const [newUserImage, setNewUserImage] = useState();
  const [picture, setPicture] = useState<File | null>(null);
  const filePicker = useRef<HTMLInputElement>(null);
  const [done, setDone] = useState("");
  function handleChangeFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = event?.currentTarget?.files;
    setPicture(files && files[0]);
  }

  function handlePick() {
    filePicker?.current?.click();
  }

  const fileLoader = useFileloader(setNewUserImage);

  useEffect(() => {
    fileLoader(userIndex, picture, setDone);
  }, [picture]);

  if (done == "Done") {
    setDone("");
    location.reload();
  }
  return (
    <div className="flex flex-col justify-start w-full  gap-4">
      <div className=" flex justify-start gap-4 items-start p-4  ">
        <img
          src={
            users
              ? users[0]?.picture
              : "https://avatars.mds.yandex.net/i?id=f2278dbde793622d022c098dbf4e22323a59974e-9233495-images-thumbs&n=13"
          }
          alt="user photo"
          className="w-24 object-cover h-28 rounded-xl sm:w-28 sm:h-32 hover:opacity-50"
        />{" "}
        <button
          onClick={handlePick}
          className="fixed w-24 h-28 rounded-xl sm:w-28 sm:h-32 hover:bg-slate-400/[0.2]"
        >
          <FileImage className=" ml-16  mt-16 h-14 opacity-0 w-6 hover:opacity-100 text-slate-800 " />
        </button>
        <input
          className="opacity-0 h-0 w-0 leading-[0px] overflow-hidden p-0 m-0"
          ref={filePicker}
          type="file"
          onChange={handleChangeFiles}
          accept="image/*,.png,.jpg,.gif"
        />
        <div className="flex flex-col items-start">
          <div className="flex flex-row gap-1 font-semibold">
            <p>{users && users[0]?.firstName}</p>
            <p>{users && users[0]?.lastName}</p>
          </div>
          <p>{users && users[0]?.gender}</p>
          <p className="text-violet-700">#{userId}</p>
        </div>
      </div>
      <div className="flex">
        {!isLogInUser ? (
          <button className="p-2 ml-4 bg-gray-800 w-32 rounded-sm text-white text-normal">
            Подписаться
          </button>
        ) : (
          <button
            className="bg-gray-500 p-2 ml-4  w-36 rounded-sm text-white text-normal h-10"
            onClick={() => {
              setEditIsVisible(!editIsVisible);
            }}
          >
            Редактировать
          </button>
        )}
      </div>
      {editIsVisible && <EditProfile data={users[0] && users[0]} />}
      <div className="h-[1px] bg-slate-300"> </div>
      <PostsList isFilter={true} filter={params.id} />
    </div>
  );
}
