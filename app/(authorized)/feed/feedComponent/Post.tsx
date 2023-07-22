"use client";
import { ChatCircleText, Heart, X } from "@phosphor-icons/react";
import Link from "next/link";
import { mutate } from "swr";
import { useSetAtom } from "jotai";
import {
  idPost,
  modalWindowQuestion,
  userPost,
} from "../../../modalWindow/ModalWindow";
import {
  modalComm,
  modalWindow,
  postID,
  userWhoIsCommenting,
} from "../../../atoms";
import useGetUsersV2 from "../../../useGetUsersV2";
import { useState } from "react";
import useMutateLikePostV2 from "../../../useMutateLikePostV2";
import useMutateNotificationsV2 from "../../../useMutateNotificationsV2";
import CommentSection from "../CommentSection";
import useGetLikePost from "../../../useGetLikePost";

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
  const users = useGetUsersV2({
    isFilter: true,
    filter: props.user,
  });

  const { trigger } = useMutateLikePostV2();
  const { trigger: notifications, isMutating } = useMutateNotificationsV2();
  const likedPostObj = Object.assign({}, props.body, {
    liked: props.body.liked ? false : true,
  });

  const modaWindowQue = useSetAtom(modalWindowQuestion);
  const modaWindowVisible = useSetAtom(modalWindow);
  const modalWindowIdPost = useSetAtom(idPost);
  const modalWindowUserPost = useSetAtom(userPost);

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
          mutate(
            (key: string[]) =>
              Array.isArray(key) && key?.[0]?.includes(`notifications`)
          );
        },
      }
    );
  };
  const userId =
    typeof window != "undefined" ? localStorage?.getItem("userId") : "";
  const postId = props.id;
  console.log(postId);
  const likePost = useGetLikePost({
    isFilter: true,
    filter: userId,
    filterPost: postId,
  });
  const id = props.user?.slice(0, 7);

  const [comments, setComments] = useState(false);

  const commentModal = useSetAtom(modalComm);
  const user = useSetAtom(userWhoIsCommenting);
  const post = useSetAtom(postID);

  console.log({ ...likePost });
  return (
    <div
      className="flex flex-col rounded-xl border border-1 w-[95%]  p-6 gap-2  "
      onClick={() => {
        setComments(!comments);
      }}
    >
      <div className="w-[100%] flex items-end justify-end">
        <X
          className="cursor-pointer"
          onClick={() => {
            modaWindowQue("Вы уверены что хотите удалить пост?");
            modaWindowVisible(true);
            modalWindowIdPost(props.id);
            modalWindowUserPost(props.user);
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

              <p className="text-gray-500">#{id}</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="text-start gap-2 flex flex-col">
        <p className=" text-start w-[95%]">{props.textOfPost}</p>
      </div>
      <div className="flex text-slate-400  justify-start gap-2 w-[100%] items-center">
        <button
          onClick={() => {
            commentModal(true);
            user(props.user);
            post(props.id);
            console.log(props.id);
          }}
        >
          <ChatCircleText className="w-5 h-5" />
        </button>
        <button className="flex justify-end  cursor-default">
          <Heart
            onClick={() => {
              trigger(
                // { id: props.id, patch: likedPostObj },
                { body: { post: props.id, user: userId, liked: true } },

                {
                  onSuccess: () => {
                    mutate(
                      (key: string[]) =>
                        Array.isArray(key) && key?.[0]?.includes(`likes`)
                    );
                  },
                }
              );

              if (!props.liked) {
                handleAddNotifications(props.user, props.id);
              }
            }}
            weight={props.liked ? "fill" : "regular"}
            className={
              { ...likePost?.data }[0]?.liked
                ? "text-red-600 text-2xl cursor-pointer"
                : " text-xl cursor-pointer"
            }
          />
        </button>
      </div>
      {comments && <CommentSection id={props.id} />}
    </div>
  );
}
