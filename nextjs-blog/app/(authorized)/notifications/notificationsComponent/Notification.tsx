"use client";
import useGetUsers from "../../../useGetUsers";

interface ILiker {
  liker: string;
}

export default function Notification(props: ILiker) {
  const users = useGetUsers({
    isFilter: true,
    filter: props.liker,
  });

  return (
    <div className="flex border border-1 border-slate-200 gap-2 p-4  rounded-sm w-[100%] justify-start items-start text-start">
      <img
        src={users && users[0]?.picture}
        alt="liker"
        className="w-100% h-14 w-14 rounded-xl bg-slate-100 md:h-20 md:w-20"
      ></img>
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
