"use client";
import { atom, useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { modalWindow } from "../atoms";
import useMutateDeletePostsV2 from "../useMutateDeletePostV2";
import { useSWRConfig } from "swr";
export const modalWindowQuestion = atom<string>("");
export const idPost = atom<number>(0);
export const userPost = atom<string>("");

export default function ModalWindow() {
  const { mutate } = useSWRConfig();
  const router = useRouter();

  const modaWindowVisible = useSetAtom(modalWindow);
  const [modalWindowQ, setModalWindowQ] = useAtom(modalWindowQuestion);
  const [modalWindowIdPost, setModalWindowIdPost] = useAtom(idPost);
  const [modalWindowUserPost, setModalWindowUserPost] = useAtom(userPost);

  const { trigger: deletePost } = useMutateDeletePostsV2();

  return (
    <div className="w-screen flex justify-center items-center h-screen fixed bg-slate-500/[0.4] z-10">
      <div className="w-[80%] h-[25%] drop-shadow-xl rounded-xl flex flex-col justify-between p-4  items-center gap-4 bg-white sm:w-96 sm:h-60">
        <p className="text-lg text-center text-black p-4">{modalWindowQ}</p>
        <div className="flex justify-center items-center gap-14">
          <button
            className="border border-black bg-slate-800 text-white p-2 w-20 rounded-xl flex justify-center items-center hover:bg-slate-600"
            onClick={() => {
              if (modalWindowQ == "Вы уверены что хотите выйти?") {
                localStorage.removeItem("userId");

                router.push("/authorizationV2");
              }
              if (modalWindowQ == "Вы уверены что хотите удалить пост?") {
                deletePost(
                  { id: modalWindowIdPost, user: modalWindowUserPost },
                  {
                    onSuccess: () => {
                      mutate((key: string[]) => {
                        return (
                          Array.isArray(key) && key?.[0]?.includes(`posts`)
                        );
                      });
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
