"use client";
import { atom, useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import useMutateDeletePost from "../useMutateDeletePost";
import { mutate } from "swr";
import { modalWindow } from "../atoms";
export const modalWindowQuestion = atom<string>("");
export const idPost = atom<number>(0);

export default function ModalWindow() {
  const router = useRouter();
  const modaWindowVisible = useSetAtom(modalWindow);
  const [modalWindowQ, setModalWindowQ] = useAtom(modalWindowQuestion);
  const [modalWindowIdPost, setModalWindowIdPost] = useAtom(idPost);
  const { trigger: deletePost } = useMutateDeletePost();
  return (
    <div className="w-screen flex justify-center items-center h-screen fixed bg-slate-500/[0.4] z-10">
      <div className="w-[80%] h-[45%] drop-shadow-xl rounded-xl flex flex-col justify-between p-4  items-center gap-8 bg-white">
        <p className="text-lg text-center text-black p-4">{modalWindowQ}</p>
        <div className="flex justify-center items-center gap-14">
          <button
            className="border border-black bg-slate-800 text-white p-2 w-20 rounded-xl flex justify-center items-center hover:bg-slate-600"
            onClick={() => {
              if (modalWindowQ == "Вы уверены что хотите выйти?") {
                router.push("/authorization");
              }
              if (modalWindowQ == "Вы уверены что хотите удалить пост?") {
                deletePost(
                  { id: modalWindowIdPost },
                  {
                    onSuccess: () => {
                      mutate(
                        (key) =>
                          typeof key == "string" && key?.includes("posts")
                      );
                    },
                  }
                );
              }
              if (
                modalWindowQ ==
                "Мы не смогли найти профиль с такими данными. Хотите создать профиль?"
              ) {
                router.push("/profileCreation");
              }
              modaWindowVisible(false);
            }}
          >
            Да
          </button>
          <button
            className="border border-black  bg-slate-800 text-white p-2 w-20 rounded-xl flex justify-center items-center hover:bg-slate-600"
            onClick={() => {
              modaWindowVisible(false);
            }}
          >
            Нет
          </button>
        </div>
      </div>
    </div>
  );
}
