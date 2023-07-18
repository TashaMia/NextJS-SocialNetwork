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
  const userIsOnline =
    typeof window != "undefined" ? localStorage.getItem("userId") : "";
  const params = useParams();
  const subscriptionsData = useGetSubscriptions({
    isFilter: true,
    filter: params.id,
  });
  return (
    <div className="feed w-screen  sm:w-full">
      <div className="w-[100%] sm:w-[100%]  mb-24 flex flex-col justify-center items-center">
        <h1 className="p-4 border-b flex flex-col justify-center items-center border-slate-200 w-[100%] text-slate-600">
          Subscriptions
        </h1>
        <ul className="flex flex-col items-center w-screen justify-center">
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
