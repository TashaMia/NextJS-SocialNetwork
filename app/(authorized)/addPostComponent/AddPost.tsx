"use client";
import { useSetAtom } from "jotai";
import { CaretDown } from "@phosphor-icons/react";
import { useRef } from "react";
import useMutationPosts from "../../useMutationPosts";

import { mutate } from "swr";
import { textFieldAtom } from "../../atoms";

export default function AddPost() {
  const refText = useRef<HTMLTextAreaElement>(null);
  const textFieldVisible = useSetAtom(textFieldAtom);
  const userId = localStorage.getItem("userId");
  const { trigger, isMutating } = useMutationPosts();
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
            mutate((key) => typeof key == "string" && key?.includes("posts"));
          },
        }
      );
    }
    textFieldVisible(false);
  };

  return (
    <div className="h-72 w-[96%] flex border border-stone-400 mb-96 ml-2 border-solid flex-col justify-start items-center rounded-lg bg-slate-100 fixed">
      <div className="w-[90%] flex justify-end mt-4">
        <button onClick={() => textFieldVisible(false)}>
          <CaretDown />
        </button>
      </div>
      <textarea
        className="w-[90%] p-2 mt-8 h-36 outline-slate-500 selection:bg-fuchsia-300 selection:text-fuchsia-900 "
        autoFocus
        ref={refText}
      ></textarea>
      <div className="w-[90%] flex justify-end">
        <button
          className="p-2 ml-4 bg-slate-800 w-32 rounded-sm text-white text-normal mt-4"
          onClick={() => {
            handleAddPost();
          }}
        >
          {isMutating ? "Отправляем" : "Отправить"}
        </button>
      </div>
    </div>
  );
}