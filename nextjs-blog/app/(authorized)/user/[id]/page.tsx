"use client";
import useGetUsers from "../../../useGetUsers";
import PostsList from "../../feed/feedComponent/PostsList";

export default function User() {
  const userId = localStorage.getItem("userId");
  const users = useGetUsers({
    isFilter: true,
    filter: userId,
  });
  console.log(users);
  return (
    <div className="flex flex-col justify-start w-screen  gap-4">
      <div className=" flex justify-start gap-4 items-start p-4  ">
        <img
          src={
            users
              ? users[0].picture
              : "https://avatars.mds.yandex.net/i?id=f2278dbde793622d022c098dbf4e22323a59974e-9233495-images-thumbs&n=13"
          }
          alt="user photo"
          className="w-24 object-cover h-24 rounded-xl"
        />
        <div className="flex flex-col items-start">
          <div className="flex flex-row gap-1 font-semibold">
            <p>{users[0].firstName}</p>
            <p>{users[0].lastName}</p>
          </div>
          <p>{users[0].gender}</p>
          <p className="text-violet-700">#{userId}</p>
        </div>
      </div>
      <div className="flex">
        {/* {subscribeIsVisible ? ( */}
        <button className="p-2 ml-4 bg-gray-800 w-32 rounded-sm text-white text-normal">
          Подписаться
        </button>
        {/* ) : (
            <></>
          )} */}
        {/* {editBtnIsVisible && ( */}
        <button
          className="bg-gray-500 p-2 ml-4  w-36 rounded-sm text-white text-normal h-10"
          //   onClick={() => {
          //     setEditIsVisible(!editisVisible);
          //   }}
        >
          Редактировать
        </button>
        {/* )} */}
      </div>
      {/* {editisVisible && <EditProfile data={data[0] && data[0]} />} */}
      <div className="h-[1px] bg-slate-300"> </div>
      <PostsList isFilter={true} />
      {/* {  <p className='text-slate-300'>No posts :( </p>}  } */}
    </div>
  );
}
