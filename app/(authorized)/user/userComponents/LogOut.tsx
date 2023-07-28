import { SignOut } from "@phosphor-icons/react";
import { useAtom, useSetAtom } from "jotai";
import { modalWindowQuestion } from "../../../modalWindow/ModalWindow";
import { modalWindow } from "../../../atoms";

export default function LogOut() {
  const modaWindowQue = useSetAtom(modalWindowQuestion);
  const [modalWindowOpened, setModalWindowOpened] = useAtom(modalWindow);

  return (
    <button
      className="  w-44  h-14 rounded-lg   bg-white drop-shadow-xl flex justify-start items-center gap-6 px-4 py-2"
      onClick={() => {
        modaWindowQue("Вы уверены что хотите выйти?");
        setModalWindowOpened(true);
      }}
    >
      <SignOut className="h-5 w-5" />
      Выйти
    </button>
  );
}
