"use client";
import useGetUsersV2 from "../../../useGetUsersV2";

interface ILiker {
  liker: string;
}

export default function Notification(props: ILiker) {
  const users = useGetUsersV2({
    isFilter: true,
    filter: props.liker,
  });

  return (
    <div className="flex border border-1 border-slate-200 gap-2 p-4  rounded-sm w-[100%] justify-start items-start text-start">
      {users && (
        <img
          src={
            users[0]?.picture !== null
              ? users[0]?.picture
              : "https://avatars.mds.yandex.net/i?id=f2278dbde793622d022c098dbf4e22323a59974e-9233495-images-thumbs&n=13"
          }
          alt="liker"
          className="w-100% h-14 object-cover w-14 rounded-xl bg-slate-100 md:h-20 md:w-20"
        ></img>
      )}
      <p>
        Пользователь{" "}
        <b>
          {" "}
          {users && users[0]?.firstName} {users && users[0]?.lastName}{" "}
        </b>{" "}
        оценил ваш пост.
      </p>
    </div>
  );
}
