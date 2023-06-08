"use client";

import useGetPosts from "../../../useGetPosts";
import useGetUsers from "../../../useGetUsers";
import Post from "./Post";

export default function PostsList(props) {
  const userId = localStorage.getItem("userId");
  const posts = useGetPosts({ isFilter: props.isFilter, filter: userId });

  return (
    <div className="feed">
      <div className="w-82  flex flex-col justify-center items-center">
        <ul>
          {posts?.map((item) => (
            <li key={item.id}>
              <Post
                id={item.id}
                textOfPost={item.text}
                user={item.user}
                liked={item.liked}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
