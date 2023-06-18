"use client";

import useGetPosts from "../../../useGetPosts";
import Post from "./Post";
import PostsListV2 from "./PostListV2";

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
  const posts = useGetPosts({ isFilter: props.isFilter, filter: props.filter });

  return (
    <div className="feed w-screen  sm:w-full">
      <div className="w-[100%] sm:w-[100%] sm:ml-2 mb-24 flex flex-col justify-center items-center">
        <ul className="sm:w-[95%]">
          {posts?.map((item: Post) => (
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
