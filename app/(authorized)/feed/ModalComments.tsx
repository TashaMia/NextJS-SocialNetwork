import { ArrowUp, X } from "@phosphor-icons/react";
import { useAtomValue, useSetAtom } from "jotai";
import { modalComm, postID, userWhoIsCommenting } from "../../atoms";
import useGetUsersV2 from "../../useGetUsersV2";
import { useRef } from "react";
import useMutateCommentPost from "../../useMutateCommentPost";
import { mutate } from "swr";

export default function ModalComments() {
  const refText = useRef<HTMLTextAreaElement>(null);
  const { trigger, isMutating } = useMutateCommentPost();
  const comment = useSetAtom(modalComm);
  const userLogedId = localStorage.getItem("userId");
  const users = useGetUsersV2({
    isFilter: true,
    filter: userLogedId,
  });
  const post = useAtomValue(postID);
  const user = useAtomValue(userWhoIsCommenting);

  const handleAddComment = () => {
    if (refText.current?.value) {
      trigger(
        {
          body: {
            commentator: userLogedId,
            textOfComment: refText.current?.value,
            postID: post,
            user: user,
          },
        },
        {
          onSuccess: () => {
            mutate(
              (key: string[]) =>
                Array.isArray(key) && key?.[0]?.includes(`comments`)
            );
          },
        }
      );
    }
  };
  return (
    <div className="fixed z-10 w-screen h-screen bg-black/[0.3]">
      <div className="fixed h-[90%] bottom-0 w-screen bg-white rounded-t-xl">
        <div className="flex items-center justify-start gap-24 p-4">
          <button
            onClick={() => {
              comment(false);
            }}
          >
            {" "}
            <X />
          </button>
          <p className=" font-bold">Ответить на пост</p>
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
            onClick={() => {
              handleAddComment();
              comment(false);
            }}
            className="flex justify-center items-center rounded-full bg-blue-800	 p-2 w-10 h-10"
          >
            <ArrowUp className="w-8 h-8 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
