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
import useMutateDeleteLikePost from "../../../useMutateDeleteLikePost";

interface Body {
  text: string;
  user: string;
  liked: boolean;
  id: number;
  picture: string;
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
  const { trigger: like } = useMutateDeleteLikePost();

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

  const likePost = useGetLikePost({
    isFilter: true,
    filter: userId,
    filterPost: props.id,
  });

  const id = props.user?.slice(0, 7);

  const [comments, setComments] = useState(false);

  const commentModal = useSetAtom(modalComm);

  const user = useSetAtom(userWhoIsCommenting);
  const post = useSetAtom(postID);

  const deleteBtnIsVisible = props.user == userId;

  return (
    <div
      className="flex flex-col rounded-xl border border-1 w-[95%]  p-6 gap-2  "
      onClick={() => {
        setComments(!comments);
      }}
    >
      <div className="w-[100%] flex items-end justify-end">
        {deleteBtnIsVisible && (
          <X
            className="cursor-pointer"
            onClick={() => {
              modaWindowQue("Вы уверены что хотите удалить пост?");
              modaWindowVisible(true);
              modalWindowIdPost(props.id);
              modalWindowUserPost(props.user);
            }}
          />
        )}
      </div>

      <div className="flex justify-start flex-col w-80 items-start gap-8 pb-4">
        <Link href={`/user/${props.user}`}>
          <div className="flex gap-2 items-center">
            {users && (
              <img
                src={
                  users[0]?.picture !== null
                    ? users[0]?.picture
                    : "https://avatars.mds.yandex.net/i?id=f2278dbde793622d022c098dbf4e22323a59974e-9233495-images-thumbs&n=13"
                }
                className="w-100% h-14 w-14 rounded-xl object-cover  bg-slate-100"
              />
            )}
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
      <div className="flex flex-col gap-4 pl-16">
        <div className="text-startflex flex-col">
          <p className=" text-start text-normal w-[95%]">{props.textOfPost}</p>
        </div>
        {props.body.picture && props.body.picture ? (
          <img
            src={props.body.picture}
            alt="post picture"
            className="rounded-xl w-[250px] sm:max-w-[75%] sm:w-[300px]"
          ></img>
        ) : (
          <div></div>
        )}

        <div className="flex text-slate-400 pt-4 justify-start gap-8 w-[100%] items-center">
          <button
            onClick={() => {
              commentModal(true);
              user(props.user);
              post(props.id);
            }}
          >
            <ChatCircleText className="w-6 h-6" />
          </button>
          <button className="flex justify-end  cursor-default">
            <Heart
              onClick={(event) => {
                event?.stopPropagation();
                if ({ ...likePost?.data }[0]?.liked) {
                  like(
                    {
                      id: props.id,
                    },
                    {
                      onSuccess: () => {
                        mutate(
                          (key: string[]) =>
                            Array.isArray(key) && key?.[0]?.includes(`likes`)
                        );
                      },
                    }
                  );
                } else {
                  trigger(
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
                }
              }}
              weight={{ ...likePost?.data }[0]?.liked ? "fill" : "regular"}
              className={
                { ...likePost?.data }[0]?.liked
                  ? "text-red-600 text-2xl cursor-pointer w-6 h-6"
                  : " text-xl cursor-pointer w-6 h-6"
              }
            />
          </button>
        </div>

        {comments && <CommentSection id={props.id} />}
      </div>
    </div>
  );
}
