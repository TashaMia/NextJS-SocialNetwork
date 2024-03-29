"use client";
import useGetNotificationsV2 from "../../useGetNotificatinsV2";
import Notification from "./notificationsComponent/Notification";

interface INotifications {
  userLiked: string;
  postLiked: number;
  liker: string;
  id: number;
}

export default function NotificationSection() {
  const userIsOnline =
    typeof window != "undefined" ? localStorage.getItem("userId") : "";

  const notifications = useGetNotificationsV2({
    isFilter: true,
    filter: userIsOnline,
  });

  return (
    <div className="feed w-screen  sm:w-full">
      <div className="w-[100%] sm:w-[100%]  mb-24 flex flex-col justify-center items-center">
        <h1 className="p-4 border-b flex flex-col justify-center items-center border-slate-200 w-[100%] text-slate-600">
          Уведомления
        </h1>
        {notifications && notifications?.length > 0 ? (
          <ul className="w-[90%]  flex flex-col gap-2 mt-2">
            {notifications.map((item: INotifications) => (
              <li key={item?.id} className="md:w-[100%]">
                <Notification liker={item?.liker} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="pt-4 text-slate-700">Здесь появятся уведомления</p>
        )}
      </div>
    </div>
  );
}
