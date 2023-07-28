"use client";
import { useSetAtom } from "jotai";
import { ArrowUp, Paperclip, X } from "@phosphor-icons/react";
import {
  ChangeEvent,
  ReactNode,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { mutate } from "swr";
import { textFieldAtom } from "../../atoms";
import useMutatePostsV2 from "../../useMutatePostsV2";
import useGetUsersV2 from "../../useGetUsersV2";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";

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
  const id = useId();
  const bucket = "postImg";
  const filePath = useMemo(
    () =>
      `${bucket}/${userId}-${id}${self.crypto.getRandomValues(
        new Uint32Array(10)
      )}.jpg`,
    [bucket, userId, id]
  );
  const [imageLoader, setImageLoader] = useState<string>("download");
  async function handleChangeFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = event.currentTarget.files as FileList;
    if (!files) return;
    const file = files[0];
    setPicture(file && file);

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (error) {
      throw error;
    } else {
      setImageLoader("loaded");
    }
  }

  const { trigger } = useMutatePostsV2();

  const handleAddPost = () => {
    if (picture && refText.current?.value == "") {
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
    } else if (refText.current?.value && picture == null) {
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

  useEffect(() => {
    if (picture !== null) {
      setImageLoader("loading");
    }
  }, [picture]);

  type ImageStatusType = {
    [index: string]: ReactNode;
  };
  const imageStatus = {
    loaded: (
      <div className="rounded-lg w-[75%] h-[100%]  mt-4 p-4 pr-10">
        {" "}
        <Image
          src={`https://ifutxtlqsucntyibpetb.supabase.co/storage/v1/object/public/postImg/${filePath}`}
          className="rounded-lg "
          width={200}
          height={200}
          alt="post picture"
        />
      </div>
    ),
    loading: (
      <div className="skeleton-box w-[75%] mr-4 rounded-lg h-52 mt-4 "></div>
    ),
    download: <></>,
  } as ImageStatusType;

  return (
    <div className="fixed z-10 w-screen h-screen bg-black/[0.3] sm:flex sm:justify-center sm:items-center">
      <div className="fixed h-[90%] bottom-0 w-screen bg-white rounded-t-xl sm:w-96 sm:h-fit p-4 sm:bottom-auto sm:rounded-xl">
        <div className="flex justify-start p-2 gap-28">
          <button onClick={() => textFieldVisible(false)}>
            <X />
          </button>
          <p className=" font-bold">Отправить пост</p>
        </div>

        <div className="flex gap-4 p-4">
          <Image
            src={users && users[0]?.picture}
            className="w-14 h-14 bg-cover rounded-xl"
            alt="user picture"
            width={200}
            height={200}
          />
          <textarea
            className="outline-slate-400  outline-1 rounded-xl h-20 w-[85%] border p-2 border-slate-300"
            ref={refText}
            autoFocus
          ></textarea>
        </div>
        <div className="sm:w-[100%] flex flex-col items-end py-4 justify-center">
          <div className="flex items-start w-[78%] sm:w-[78%] justify-between  pr-5">
            <button
              onClick={() => {
                handlePick();
              }}
            >
              <Paperclip className=" cursor-pointer" />
            </button>
            <input
              className="opacity-0 h-0 w-0 leading-[0px] overflow-hidden p-0 m-0"
              ref={filePicker}
              type="file"
              onChange={(e) => {
                handleChangeFiles(e);
              }}
              accept="image/*,.png,.jpg,.gif"
            />

            <button
              className="flex justify-center items-center rounded-full bg-blue-800	 p-2 w-10 h-10"
              onClick={() => {
                handleAddPost();
              }}
            >
              <ArrowUp className="w-8 h-8 text-white" />
            </button>
          </div>
          <>{imageStatus[imageLoader]}</>
        </div>
      </div>
    </div>
  );
}
