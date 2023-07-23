"use client";
import { useSetAtom } from "jotai";
import { ArrowUp, Check, Circle, Paperclip, X } from "@phosphor-icons/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import { mutate } from "swr";
import { textFieldAtom } from "../../atoms";
import useMutatePostsV2 from "../../useMutatePostsV2";
import useGetUsersV2 from "../../useGetUsersV2";
import { createClient } from "@supabase/supabase-js";

export default function AddPost() {
  const refText = useRef<HTMLTextAreaElement>(null);
  const textFieldVisible = useSetAtom(textFieldAtom);
  const userId = localStorage.getItem("userId");

  //загрузка фото в пост

  const supabase = createClient(
    "https://ifutxtlqsucntyibpetb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmdXR4dGxxc3VjbnR5aWJwZXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4NjIyMTYsImV4cCI6MjAwMzQzODIxNn0.rhcAiilZcyAnvMV2ujvGU6CklOy1CeTdxlYWeiY47v4"
  );

  const filePicker = useRef<HTMLInputElement>(null);

  function handlePick() {
    filePicker?.current?.click();
  }
  const [picture, setPicture] = useState<File | null>(null);

  function handleChangeFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = event?.currentTarget?.files;
    setPicture(files && files[0]);
  }
  const random = Math.random();

  const bucket = "postImg";
  const filePath = `${bucket}/newFile-${random}.jpg`;

  async function uploadePostFile() {
    if (picture) {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, picture);
      if (error) {
        throw error;
      }
    }
  }

  const { trigger, isMutating } = useMutatePostsV2();
  const handleAddPost = () => {
    if (picture) {
      trigger(
        {
          body: {
            user: userId,
            liked: false,
            picture: `https://ifutxtlqsucntyibpetb.supabase.co/storage/v1/object/public/postImg/${filePath}`,
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
    } else if (refText.current?.value) {
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
    } else if (refText.current?.value && picture) {
      trigger(
        {
          body: {
            text: refText.current?.value,
            user: userId,
            liked: false,
            picture: `https://ifutxtlqsucntyibpetb.supabase.co/storage/v1/object/public/postImg/${filePath}`,
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

  const [statusLoadingProcess, setStatusLoadingProcess] = useState("Загрузить");

  useEffect(() => {
    if (picture !== null) {
      setStatusLoadingProcess("Загружается");
    }
  }, [picture]);

  if (statusLoadingProcess == "Загружается") {
    setTimeout(() => {
      setStatusLoadingProcess("Загружено");
    }, 2000);
  }
  if (statusLoadingProcess == "Загружено") {
    setTimeout(() => {
      setStatusLoadingProcess("Загрузить");
    }, 3000);
  }

  return (
    <div className="fixed z-10 w-screen h-screen bg-black/[0.3] sm:flex sm:justify-center sm:items-center">
      <div className="fixed h-[90%] bottom-0 w-screen bg-white rounded-t-xl sm:w-96 sm:h-60 sm:bottom-auto sm:rounded-xl">
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
            className="outline-slate-400  outline-1 rounded-xl h-20 w-[75%] border p-2 border-slate-300"
            ref={refText}
            autoFocus
          ></textarea>
        </div>
        <div className="sm:w-[100%] flex justify-end">
          <div className="flex items-start w-[75%] sm:w-[80%] justify-between  pr-10">
            <button
              onClick={() => {
                handlePick();
              }}
            >
              {statusLoadingProcess == "Загрузить" && (
                <Paperclip className=" cursor-pointer" />
              )}
              {statusLoadingProcess == "Загружается" && <Circle />}
              {statusLoadingProcess == "Загружено" && (
                <Check className="text-green-700" />
              )}
            </button>
            <input
              className="opacity-0 h-0 w-0 leading-[0px] overflow-hidden p-0 m-0"
              ref={filePicker}
              type="file"
              onChange={handleChangeFiles}
              accept="image/*,.png,.jpg,.gif"
            />
            <button
              className="flex justify-center items-center rounded-full bg-blue-800	 p-2 w-10 h-10"
              onClick={() => {
                uploadePostFile();
                handleAddPost();
              }}
            >
              <ArrowUp className="w-8 h-8 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
