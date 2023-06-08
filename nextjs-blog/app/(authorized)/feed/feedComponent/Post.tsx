"use client";
import { Heart } from "@phosphor-icons/react";
import Link from "next/link";
import useGetUsers from "../../../useGetUsers";

export default function Post(props) {
  const users = useGetUsers({
    isFilter: true,
    filter: props.user,
  });

  console.log(users);
  return (
    <div className="flex flex-col rounded-xl border border-1  p-6 m-4 gap-2">
      <div className="w-100% flex items-end justify-end">
        {/* <X
          onClick={() => {
            callModalWindow(props.id);
          }} */}
        {/* /> */}
      </div>

      <div className="flex justify-start flex-col w-80 items-start gap-8 pb-4">
        <Link href={`/user/${props.user}`}>
          <div className="flex gap-2 items-center">
            <img
              src={users[0]?.picture}
              className="w-100% h-14 w-14 rounded-xl bg-slate-100"
            />
            <div className="flex gap-2 flex-col items-start font-semibold">
              <div className="flex gap-2">
                <p>{users[0]?.firstName} </p>
                <p>{users[0]?.lastName}</p>
              </div>

              <p className="text-gray-500">#{props.user}</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="text-start gap-2 flex flex-col">
        <p className=" text-start">{props.textOfPost}</p>
      </div>
      <button
        className="flex justify-end  w-[97%]"
        // onClick={() => {
        //   likePost({ id: props.id, patch: likedPostObj });
        //   if (!props.liked) {
        //     handleAddNotifications(props.user, props.id);
        //   }
        // }}
      >
        <Heart
          weight={props.liked ? "fill" : "regular"}
          className={props.liked ? "text-red-600 text-2xl" : " text-xl"}
        />
      </button>
    </div>
  );
}
