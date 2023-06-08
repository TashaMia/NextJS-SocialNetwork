"use client";
import useGetPosts from "../../useGetPosts";
import useGetUsers from "../../useGetUsers";
import PostsList from "./feedComponent/PostsList";

export default function CommonFeed() {
  return (
    <div className="feed">
      <div className="w-82 flex flex-col justify-center items-center">
        <h1 className="p-4 border-b flex flex-col justify-center items-center border-slate-200 w-[100%] text-slate-600">
          Feed
        </h1>
        <PostsList isFilter={false} />
      </div>
    </div>
  );
}
