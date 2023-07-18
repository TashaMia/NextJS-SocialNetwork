"use client";
import { mutate } from "swr";
import useMutateSubscriptions from "../../../useMutateSubscriptions";
import { useParams } from "next/navigation";
import { useState } from "react";
import useGetSubscriptions from "../../../useGetSubscriptions";

export default function Subscriptions() {
  const { trigger, isMutating } = useMutateSubscriptions();
  const userLogedId =
    typeof window != "undefined" ? localStorage?.getItem("userId") : "";
  const params = useParams();
  const subscribedTo = params.id;
  console.log(params.id);
  const handleAddSub = () => {
    trigger(
      {
        body: {
          user: userLogedId,
          subscribedTo: subscribedTo,
        },
      },
      {
        onSuccess: () => {
          mutate(
            (key: string[]) =>
              Array.isArray(key) && key?.[0]?.includes(`subscriptions`)
          );
        },
      }
    );
  };
  const [statusProfile, setStatusProfile] = useState("Подписаться");

  return (
    <button
      className="p-2 ml-4 bg-gray-800 w-32 rounded-sm text-white text-normal"
      onClick={() => {
        statusProfile == "Подписаться" ?? handleAddSub();

        setStatusProfile("Отписаться");
      }}
    >
      {statusProfile}
    </button>
  );
}
