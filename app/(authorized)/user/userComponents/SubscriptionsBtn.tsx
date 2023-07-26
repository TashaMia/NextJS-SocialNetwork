"use client";
import { mutate } from "swr";
import useMutateSubscriptions from "../../../useMutateSubscriptions";
import { useParams } from "next/navigation";
import useGetSubscriptions from "../../../useGetSubscriptions";
import useMutateDeleteSubscription from "../../../useMutateDeleteSubscription";

export default function Subscriptions() {
  const { trigger, isMutating } = useMutateSubscriptions();

  const userLogedId =
    typeof window != "undefined" ? localStorage?.getItem("userId") : "";

  const params = useParams();
  const subscribedTo = params.id;

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

  const { trigger: deleteSubscription } = useMutateDeleteSubscription();

  const handleDeleteSub = () => {
    deleteSubscription(
      {
        subscribedTo: params.id,
      },
      {
        onSuccess: () => {
          mutate((key: string[]) => {
            return Array.isArray(key) && key?.[0]?.includes(`subscriptions`);
          });
        },
      }
    );
  };

  const { data: checkSuscriptions } = useGetSubscriptions({
    isFilter: true,
    filter: userLogedId,
    filterColumn: "user",
  });

  const check = checkSuscriptions?.find((sub) => sub.subscribedTo == params.id);

  return (
    <button
      className="p-2 ml-4 bg-gray-800 w-32 rounded-sm text-white text-normal"
      onClick={() => {
        check ? handleDeleteSub() : handleAddSub();
      }}
    >
      {check ? "Отписаться" : "Подписаться"}
    </button>
  );
}
