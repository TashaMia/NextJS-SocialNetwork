import Link from "next/link";
import useGetUsersV2 from "../../useGetUsersV2";
import Image from "next/image";

export default function Comment(props: any) {
  const users = useGetUsersV2({
    isFilter: true,
    filter: props.comment.commentator,
  });

  const id = users && users[0].id.slice(0, 7);

  return (
    <div className="flex justify-start flex-col w-80 items-start pl-2 pb-4">
      <div className="h-12 w-[1px] bg-slate-300"></div>
      <Link href={`/user/${users && users[0]?.id}`}>
        <div className="flex  gap-2 items-center">
          <img
            src={users && users[0]?.picture}
            className="w-100% h-14 w-14 rounded-xl object-cover  bg-slate-100"
            width={200}
            height={200}
            alt="user picture"
          ></img>
          <div className="flex gap-2 flex-col items-start font-semibold">
            <div className="flex gap-2">
              <p>{users && users[0]?.firstName} </p>
              <p>{users && users[0]?.lastName}</p>
            </div>

            <p className="text-gray-500">#{id}</p>
          </div>
        </div>
      </Link>
      <p className="pt-4">{props.comment.textOfComment}</p>
    </div>
  );
}
