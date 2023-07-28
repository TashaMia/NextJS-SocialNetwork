import { useEffect, useRef, useState } from "react";
import useGetSearchAnswer from "../../useGetSearchAnswer";
import { MagnifyingGlass, MagnifyingGlassMinus } from "@phosphor-icons/react";
import Post from "../feed/feedComponent/Post";

export default function Search() {
  const [searchText, setSearchText] = useState("");

  const answer = useGetSearchAnswer({ isFilter: true, filter: searchText });
  console.log(answer);
  function getSearchRequest(event: React.FormEvent<HTMLInputElement>) {
    setSearchText(event.currentTarget.value);
  }
  const ref = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <div className="flex lg:w-[100%] overflow-hidden h-[70vh] lg:h-[100%] flex-col gap-4 justify-center p-2 items-center  ">
      <div className="flex w-[90%] justify-center  rounded-full p-2 px-4 items-center border border-slate-200">
        <MagnifyingGlass className="w-6 h-6 text-slate-400" />
        <input
          type="text"
          value={searchText}
          ref={ref}
          onChange={getSearchRequest}
          className=" h-8 w-[100%] outline-0 px-2 text-slate-500 "
        ></input>
      </div>
      <div className=" flex flex-col gap-4 pb-28 lg:overflow-hidden overflow-y-scroll lg:h-[100%] h-[80vh]">
        {answer && answer?.length > 0 ? (
          answer.map((item) => (
            <Post
              key={item.id}
              id={item.id}
              textOfPost={item.text}
              user={item.user}
              liked={item.liked}
              body={item}
            />
          ))
        ) : (
          <div className="w-[100%] flex justify-center items-center">
            Ничего не найдено
          </div>
        )}
      </div>
    </div>
  );
}
