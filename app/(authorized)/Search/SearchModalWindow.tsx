import { X } from "@phosphor-icons/react";
import { Dispatch, SetStateAction } from "react";
import Search from "./Search";

export default function SearchModalWindow(props: {
  setModalWindowSearch: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="fixed  z-10 w-screen h-screen flex justify-center items-center bg-black/[0.3]">
      <div className="fixed md:h-[90%] bottom-0 w-screen bg-white rounded-t-xl h-[80vh] sm:w-96 sm:bottom-auto sm:rounded-xl">
        <div className="flex items-center justify-start p-4">
          <button
            onClick={() => {
              props.setModalWindowSearch(false);
            }}
          >
            {" "}
            <X />
          </button>
          <div className="flex justify-center items-center w-[90%]">
            <p className=" font-bold">Поиск</p>
          </div>
        </div>

        <Search />
      </div>
    </div>
  );
}
