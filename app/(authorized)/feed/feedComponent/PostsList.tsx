"use client";

import { createClient } from "@supabase/supabase-js";
import useGetPosts from "../../../useGetPosts";
import useGetPostsV2 from "../../../useGetPostsV2";
import Post from "./Post";
import { useEffect, useState } from "react";

interface Post {
  id: number;
  liked: boolean;
  text: string;
  user: string;
}
interface IFilter {
  isFilter: boolean;
  filter?: string;
}

export default function PostsList(props: IFilter) {
  const posts = useGetPostsV2({
    isFilter: props.isFilter,
    filter: props.filter,
  });
  // console.log(props.isFilter);

  return (
    <div className="feed w-screen  sm:w-full">
      <div className="w-[100%] sm:w-[100%] sm:ml-2 mb-24 flex flex-col justify-center items-center">
        <ul className="sm:w-[95%] w-[90%]">
          {posts.data?.map((item: Post) => (
            <li key={item.id}>
              <Post
                id={item.id}
                textOfPost={item.text}
                user={item.user}
                liked={item.liked}
                body={item}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
