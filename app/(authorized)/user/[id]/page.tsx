"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import PostsList from "../../feed/feedComponent/PostsList";
import { useParams } from "next/navigation";
import useFileloader from "../../../useFileLoader";
import { FileImage, GearSix } from "@phosphor-icons/react";
import useGetUsersV2 from "../../../useGetUsersV2";
import { createClient } from "@supabase/supabase-js";
import EditProfile from "../userComponents/EditProfile";
import Subscriptions from "../userComponents/SubscriptionsBtn";
import useGetSubscriptions from "../../../useGetSubscriptions";
import Link from "next/link";
import useGetFollowers from "../../../useGetFollowers";
import useGetPostsV2 from "../../../useGetPostsV2";
import Spin from "../../../Spin";
import LogOut from "../userComponents/LogOut";

export default function User() {
  const supabase = createClient(
    "https://ifutxtlqsucntyibpetb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmdXR4dGxxc3VjbnR5aWJwZXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4NjIyMTYsImV4cCI6MjAwMzQzODIxNn0.rhcAiilZcyAnvMV2ujvGU6CklOy1CeTdxlYWeiY47v4"
  );

  const [modalWindowSignOut, setModalWindowSignOut] = useState(false);

  const userId =
    typeof window != "undefined" ? localStorage.getItem("userId") : "";

  const params = useParams();
  const currentUser = params.id;

  async function getUserData() {
    let allUsers = supabase.from(`users`).select("*").eq("id", userId);
    return allUsers;
  }

  getUserData();

  const [isLogInUser, setIsLogInUser] = useState(false);

  useEffect(() => {
    if (params.id == userId) {
      setIsLogInUser(true);
    }
  }, []);

  const users = useGetUsersV2({
    isFilter: true,
    filter: currentUser,
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
  }

  const { data: followersData, isLoading: isLoadingFollowers } =
    useGetFollowers({
      isFilter: true,
      filter: currentUser,
      filterColumn: "subscribedTo",
    });

  const { data: subscriptionsData, isLoading: isLoadingSubscriptions } =
    useGetSubscriptions({
      isFilter: true,
      filter: currentUser,
      filterColumn: "user",
    });

  const { data: posts, isLoading: isLoadingPosts } = useGetPostsV2({
    isFilter: true,
    filter: params.id,
  });

  return (
    <div className="flex flex-col justify-start w-[100%]  gap-4">
      <div className="flex flex-col justify-start items-start w-[100%] gap-14">
        <div className="flex flex-col w-[100%]">
          <div className=" flex justify-start w-[100%] gap-4 items-start p-4  ">
            <div className=" relative w-32 h-32">
              {loader ? (
                <button
                  onClick={handlePick}
                  className=" w-32 h-32  rounded-xl  fixed  hover:bg-slate-400/[0.2]"
                >
                  <div className="w-6 h-6 pl-12">
                    <Spin />
                  </div>{" "}
                </button>
              ) : (
                <button
                  onClick={() => {
                    changeUserPicture();
                    handlePick();
                  }}
                  className=" w-28 h-28 z-10  rounded-xl  fixed opacity-0 hover:opacity-100 hover:bg-slate-400/[0.2]"
                >
                  <FileImage className=" h-8 ml-20 mt-20 w-6 z-20 text-black  " />
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
                  className="w-28 object-cover z-0 static h-28 rounded-xl sm:w-28 sm:h-28 hover:opacity-50"
                ></img>
              )}

              <input
                className="opacity-0 h-0 w-0 leading-[0px] overflow-hidden p-0 m-0"
                ref={filePicker}
                type="file"
                onChange={handleChangeFiles}
                accept="image/*,.png,.jpg,.gif"
              />
            </div>
            <div className="flex flex-col w-[70%] items-start">
              <div className="flex  justify-between items-start w-[100%]  font-semibold">
                <div className="flex flex-col justify-start">
                  <div className="flex flex-row gap-1 font-semibold">
                    <p>{users && users[0]?.firstName}</p>
                    <p>{users && users[0]?.lastName}</p>
                  </div>
                  <p className="text-violet-700">#{params.id?.slice(0, 7)}</p>

                  <div className="flex justify-start items-start w-[100%] gap-4 mt-4">
                    <Link href={`/user/${params.id}/subscriptions`}>
                      <div className="flex flex-col justify-center items-center text-xs">
                        {isLoadingSubscriptions ? (
                          <Spin />
                        ) : (
                          <p>{subscriptionsData?.length}</p>
                        )}
                        <p>Подписок</p>
                      </div>
                    </Link>
                    <Link href={`/user/${params.id}/followers`}>
                      <div className="flex flex-col justify-center items-center text-xs">
                        {isLoadingFollowers ? (
                          <Spin />
                        ) : (
                          <p>{followersData?.length}</p>
                        )}
                        <p>Подписчика</p>
                      </div>
                    </Link>
                    <div className="flex flex-col justify-center items-center text-xs">
                      {isLoadingPosts ? <Spin /> : <p>{posts?.length}</p>}
                      <p>Постов</p>
                    </div>
                  </div>
                </div>
                <div className=" fixed right-6 flex flex-col justify-center items-end gap-4">
                  <button
                    className={`${
                      modalWindowSignOut && "shadow-md"
                    } w-11 h-11 flex justify-center items-center border border-slate-200 rounded-full cursor-pointer `}
                    onClick={() => setModalWindowSignOut(!modalWindowSignOut)}
                  >
                    <GearSix className="w-5 h-5" />
                  </button>
                  {modalWindowSignOut && <LogOut />}
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            {!isLogInUser ? (
              <Subscriptions />
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
