"use client";

import { createClient } from "@supabase/supabase-js";
import useGetPosts from "../../../useGetPosts";
import useGetPostsV2 from "../../../useGetPostsV2";
import Post from "./Post";
import { useEffect, useState } from "react";
import { modalComm, userWhoIsCommenting } from "../../../atoms";
import ModalComments from "../ModalComments";
import { useSetAtom } from "jotai";
import { ViewportList } from "react-viewport-list";

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
  const postList = posts.data as Post[];

  return (
    <div className="feed w-screen  sm:w-full">
      <div className="w-[100%] sm:w-[100%] sm:ml-2 mb-24 flex flex-col justify-center items-center">
        <ViewportList items={postList}>
          {(item) => (
            <Post
              key={item.id}
              id={item.id}
              textOfPost={item.text}
              user={item.user}
              liked={item.liked}
              body={item}
            />
          )}
        </ViewportList>
      </div>
    </div>
  );
}
