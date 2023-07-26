"use client";

import Spin from "../../../Spin";
import Spinner from "../../../Spin";
import useGetPostsV2 from "../../../useGetPostsV2";
import Post from "./Post";
import { ViewportList } from "react-viewport-list";

interface Post {
  id: number;
  liked: boolean;
  text: string;
  user: string;
  picture: string;
}
interface IFilter {
  isFilter: boolean;
  filter?: string;
}

export default function PostsList(props: IFilter) {
  const { data: posts, isLoading } = useGetPostsV2({
    isFilter: props.isFilter,
    filter: props.filter,
  });

  const postList = posts as Post[];

  return (
    <div className="feed w-screen   sm:w-full">
      {isLoading ? (
        <div className="flex justify-center items-start pt-4">
          <Spin />
        </div>
      ) : (
        <div className="w-[100%] sm:w-[100%] gap-4 sm:gap-4 mb-24 flex flex-col justify-center items-center">
          {posts && posts.length > 0 ? (
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
          ) : (
            <div>Здесь появятся посты</div>
          )}
        </div>
      )}
    </div>
  );
}
