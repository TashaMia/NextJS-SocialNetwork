"use client";
import useGetRegistrationStatus from "../../useGetRegistrationStatus";
import Search from "../Search/Search";
import PostsList from "./feedComponent/PostsList";

export default function CommonFeed() {
  const status = useGetRegistrationStatus();

  return (
    <div className="feed w-[100%]">
      <div className=" flex w-[100%] flex-col justify-center items-center">
        <div className="flex justify-center w-[100%]  items-start">
          <div className="flex flex-col w-[100%] lg:w-[60%]  lg:border-r border-slate-200 justify-center items-center">
            <h1 className="p-4 border-b w-[100%] flex flex-col justify-center items-center border-slate-200  text-slate-600">
              Лента
            </h1>
            <PostsList isFilter={false} />
          </div>
          <div className="hidden lg:flex lg:w-[50%] w-[40%]">
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
}
