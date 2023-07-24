"use client";
import useGetRegistrationStatus from "../../useGetRegistrationStatus";
import PostsList from "./feedComponent/PostsList";

export default function CommonFeed() {
  const status = useGetRegistrationStatus();

  return (
    <div className="feed">
      <div className="w-[100%] flex flex-col justify-center items-center">
        <h1 className="p-4 border-b flex flex-col justify-center items-center border-slate-200 w-[100%] text-slate-600">
          Лента
        </h1>
        <PostsList isFilter={false} />
      </div>
    </div>
  );
}
