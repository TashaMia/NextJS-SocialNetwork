"use client";
import { useSetAtom } from "jotai";
import { ArrowUp, X } from "@phosphor-icons/react";
import { useRef } from "react";

import { mutate } from "swr";
import { textFieldAtom } from "../../atoms";
import useMutatePostsV2 from "../../useMutatePostsV2";
import useGetUsersV2 from "../../useGetUsersV2";

export default function AddPost() {
  const refText = useRef<HTMLTextAreaElement>(null);
  const textFieldVisible = useSetAtom(textFieldAtom);
  const userId = localStorage.getItem("userId");
  const { trigger, isMutating } = useMutatePostsV2();
  const handleAddPost = () => {
    if (refText.current?.value) {
      trigger(
        {
          body: {
            text: refText.current?.value,
            user: userId,
            liked: false,
          },
        },
        {
          onSuccess: () => {
            mutate(
              (key: string[]) =>
                Array.isArray(key) && key?.[0]?.includes(`posts`)
            );
          },
        }
      );
    }
    textFieldVisible(false);
  };
  const userLogedId = localStorage.getItem("userId");

  const users = useGetUsersV2({
    isFilter: true,
    filter: userLogedId,
  });

  return (
    <div className="fixed z-10 w-screen h-screen bg-black/[0.3]">
      <div className="fixed h-[90%] bottom-0 w-screen bg-white rounded-t-xl">
        <div className="flex justify-start p-2 gap-28">
          <button onClick={() => textFieldVisible(false)}>
            <X />
          </button>
          <p className=" font-bold">Отправить пост</p>
        </div>
        <div className="flex gap-4 p-4">
          <img
            src={users && users[0]?.picture}
            className="w-14 h-14 bg-cover rounded-xl"
          ></img>
          <textarea
            className="outline-slate-400  outline-1 rounded-xl h-20 w-full border p-2 border-slate-300"
            ref={refText}
            autoFocus
          ></textarea>
        </div>
        <div className="flex items-start justify-end px-4">
          <button
            className="flex justify-center items-center rounded-full bg-blue-800	 p-2 w-10 h-10"
            onClick={() => {
              handleAddPost();
            }}
          >
            <ArrowUp className="w-8 h-8 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
