"use client";
import { Heart, X } from "@phosphor-icons/react";
import Link from "next/link";
import { mutate } from "swr";
import useGetUsers from "../../../useGetUsers";
import useMutateLikePost from "../../../useMutateLikePost";
import { useSetAtom } from "jotai";
import { modalWindow } from "../../layout";
import { idPost, modalWindowQuestion } from "../../../modalWindow/ModalWindow";
import useMutateNotifications from "../../../useMutateNotifications";

interface Body {
  text: string;
  user: string;
  liked: boolean;
  id: number;
}

interface Post {
  body: Body;
  id: number;
  liked: boolean;
  textOfPost: string;
  user: string;
}

export default function Post(props: Post) {
  const users = useGetUsers({
    isFilter: true,
    filter: props.user,
  });
  const { trigger } = useMutateLikePost();
  const { trigger: notifications, isMutating } = useMutateNotifications();
  const likedPostObj = Object.assign({}, props.body, {
    liked: props.body.liked ? false : true,
  });

  const modaWindowQue = useSetAtom(modalWindowQuestion);
  const modaWindowVisible = useSetAtom(modalWindow);
  const modalWindowIdPost = useSetAtom(idPost);
  const handleAddNotifications = async (user: string, post: number) => {
    notifications(
      {
        body: {
          userLiked: user,
          postLiked: post,
          liker: localStorage.getItem("userId"),
        },
      },
      {
        onSuccess: () => {
          mutate((key) => typeof key == "string" && key?.includes("posts"));
        },
      }
    );
  };

  return (
    <div className="flex flex-col rounded-xl border border-1 w-[100%]  p-6 gap-2 my-4 ">
      <div className="w-[100%] flex items-end justify-end">
        <X
          onClick={() => {
            modaWindowQue("Вы уверены что хотите удалить пост?");
            modaWindowVisible(true);
            modalWindowIdPost(props.id);
          }}
        />
      </div>

      <div className="flex justify-start flex-col w-80 items-start gap-8 pb-4">
        <Link href={`/user/${props.user}`}>
          <div className="flex gap-2 items-center">
            <img
              src={users && users[0]?.picture}
              className="w-100% h-14 w-14 rounded-xl object-cover  bg-slate-100"
            />
            <div className="flex gap-2 flex-col items-start font-semibold">
              <div className="flex gap-2">
                <p>{users && users[0]?.firstName} </p>
                <p>{users && users[0]?.lastName}</p>
              </div>

              <p className="text-gray-500">#{props.user}</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="text-start gap-2 flex flex-col">
        <p className=" text-start w-[95%]">{props.textOfPost}</p>
      </div>
      <button
        className="flex justify-end  w-[100%]"
        onClick={() => {
          trigger(
            { id: props.id, patch: likedPostObj },
            {
              onSuccess: () => {
                mutate(
                  (key) => typeof key == "string" && key?.includes("posts")
                );
              },
            }
          );

          if (!props.liked) {
            handleAddNotifications(props.user, props.id);
          }
        }}
      >
        <Heart
          weight={props.liked ? "fill" : "regular"}
          className={props.liked ? "text-red-600 text-2xl" : " text-xl"}
        />
      </button>
    </div>
  );
}
