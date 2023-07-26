"use client";

import { useParams } from "next/navigation";
import useGetSubscriptions from "../../../../useGetSubscriptions";
import SubscriptionsItem from "./SubscriptionsItem";
interface ISubscribtion {
  id: number;
  created_at: string;
  user: string;
  subscribedTo: string;
}

export default function SubscriptionSection() {
  const params = useParams();

  const { data: subscriptionsData } = useGetSubscriptions({
    isFilter: true,
    filter: params.id,
    filterColumn: "user",
  });

  return (
    <div className="feed w-screen   sm:w-full">
      <div className=" sm:w-[100%]  mb-24 flex flex-col justify-center items-center">
        <h1 className="p-4 border-b w-[100%] flex flex-col justify-center items-center border-slate-200  text-slate-600">
          Подписки
        </h1>
        <ul className="flex flex-col items-center w-[100%] justify-center">
          {subscriptionsData?.map((item: ISubscribtion) => (
            <li key={item?.id} className="flex w-[96%] mt-4  md:w-[98%]">
              <SubscriptionsItem subscribedTo={item.subscribedTo} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
