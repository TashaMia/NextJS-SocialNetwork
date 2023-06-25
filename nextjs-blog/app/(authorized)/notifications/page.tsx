"use client";
import useGetNotifications from "../../useGetNotifications";
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
  const notifications = useGetNotifications({
    isFilter: true,
    filter: userIsOnline,
  });

  return (
    <div className="feed w-screen  sm:w-full">
      <div className="w-[100%] sm:w-[100%]  mb-24 flex flex-col justify-center items-center">
        <h1 className="p-4 border-b flex flex-col justify-center items-center border-slate-200 w-[100%] text-slate-600">
          Notification
        </h1>
        {notifications?.length > 0 ? (
          <ul className="sm:w-[100%]  flex flex-col gap-2 mt-2">
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
