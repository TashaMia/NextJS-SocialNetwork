"use client";
import { ChangeEvent, useEffect, useReducer, useRef, useState } from "react";
import useGetUsers from "../../../useGetUsers";
import PostsList from "../../feed/feedComponent/PostsList";
// import EditProfile from "./userComponents/EditProfile";
import { useParams } from "next/navigation";
import useFileloader from "../../../useFileLoader";
import { FileImage, Spinner } from "@phosphor-icons/react";
import useGetUsersV2 from "../../../useGetUsersV2";
import { createClient } from "@supabase/supabase-js";
import useMutateUsersV2 from "../../../useMutateUsersV2";
import useGetRegistrationStatus from "../../../useGetRegistrationStatus";
import EditProfile from "../userComponents/EditProfile";

export default function User() {
  const supabase = createClient(
    "https://ifutxtlqsucntyibpetb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmdXR4dGxxc3VjbnR5aWJwZXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4NjIyMTYsImV4cCI6MjAwMzQzODIxNn0.rhcAiilZcyAnvMV2ujvGU6CklOy1CeTdxlYWeiY47v4"
  );

  const userId =
    typeof window != "undefined" ? localStorage.getItem("userId") : "";

  const params = useParams();
  async function getUserData() {
    let allUsers = supabase.from(`users`).select("*").eq("id", userId);
    // console.log(allUsers);
    return allUsers;
  }
  getUserData();
  const userIndex = Number(userId);
  const [isLogInUser, setIsLogInUser] = useState(false);
  useEffect(() => {
    if (params.id == userId) {
      setIsLogInUser(true);
    }
  });

  const users = useGetUsersV2({
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
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    fileLoader(userId, picture, setDone);
    picture !== null && done !== "Done" ? setLoader(true) : setLoader(false);
  }, [picture]);

  if (done == "Done") {
    setDone("");
    location.reload();
  }
  async function changeUserPicture() {
    const { data, error } = await supabase
      .from(`users`)
      .update({
        picture: `https://firebasestorage.googleapis.com/v0/b/file-uploade.appspot.com/o/user-image-${userId}?alt=media&token=95f60686-e686-4cde-b037-83c58beec57e`,
      })
      .eq("id", userId)
      .select();
    console.log(data);
  }

  return (
    <div className="flex flex-col justify-start w-full  gap-4">
      <div className="flex flex-col justify-start items-start gap-14">
        <div className="flex flex-col">
          <div className=" flex justify-start gap-4 items-start p-4  ">
            <div className=" relative w-32 h-32">
              {loader ? (
                <button
                  onClick={handlePick}
                  className=" w-32 h-32  rounded-xl  fixed top-0  hover:bg-slate-400/[0.2]"
                >
                  <Spinner className=" h-10 ml-12 mt-10 w-10 opacity-100 text-black  animate-spin" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    changeUserPicture();
                    handlePick();
                  }}
                  className=" w-32 h-32  rounded-xl  fixed opacity-0 hover:opacity-100 hover:bg-slate-400/[0.2]"
                >
                  <FileImage className=" h-8 ml-24 mt-24 w-6  text-black  " />
                </button>
              )}

              {users && (
                <img
                  src={
                    users[0]?.picture !== null
                      ? users[0]?.picture
                      : "https://avatars.mds.yandex.net/i?id=f2278dbde793622d022c098dbf4e22323a59974e-9233495-images-thumbs&n=13"
                  }
                  alt="user photo"
                  className="w-24 object-cover h-28 rounded-xl sm:w-28 sm:h-32 hover:opacity-50"
                />
              )}

              <input
                className="opacity-0 h-0 w-0 leading-[0px] overflow-hidden p-0 m-0"
                ref={filePicker}
                type="file"
                onChange={handleChangeFiles}
                accept="image/*,.png,.jpg,.gif"
              />
            </div>
            <div className="flex flex-col items-start">
              <div className="flex flex-row gap-1 font-semibold">
                <p>{users && users[0]?.firstName}</p>
                <p>{users && users[0]?.lastName}</p>
              </div>
              <p>{users && users[0]?.gender}</p>
              <p className="text-violet-700">#{params.id?.slice(0, 7)}</p>
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
        </div>
        {editIsVisible && (
          <EditProfile
            data={users && users[0] && users[0]}
            setEditIsVisible={setEditIsVisible}
          />
        )}
      </div>
      <div className="h-[1px] bg-slate-300"> </div>
      <PostsList isFilter={true} filter={params.id} />
    </div>
  );
}
