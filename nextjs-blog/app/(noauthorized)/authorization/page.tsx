"use client";
import { useRouter } from "next/navigation";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import useGetUsers from "../../useGetUsers";
import ModalWindow, {
  modalWindowQuestion,
} from "../../modalWindow/ModalWindow";
import { emailAt, modalWindow, passwordAt } from "../../atoms";

interface IUser {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  password: string;
  picture: string;
}

export default function Autorithation() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState<string>("");
  const [email, setEmail] = useAtom(emailAt);
  const [password, setPassword] = useAtom(passwordAt);
  const users = useGetUsers({ isFilter: false });
  const modaWindowQue = useSetAtom(modalWindowQuestion);
  const modaWindowVisible = useSetAtom(modalWindow);
  const modaWindowVisibleValue = useAtomValue(modalWindow);
  function getEmail(event: React.FormEvent<HTMLInputElement>) {
    setEmail(event.currentTarget.value);
  }

  function getPassword(event: React.FormEvent<HTMLInputElement>) {
    setPassword(event.currentTarget.value);
  }

  function validationEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
  }

  function validationPassword() {
    if (password.length >= 4) {
      return true;
    }
  }

  function logIn() {
    if (validationEmail() && validationPassword()) {
      localStorage.setItem("autorithed", "true");
      router.push("/feed");
    } else {
      setError(true);
      setErrorText(
        "Кажется, вы указали неверный email или пароль. Попробуйте снова :)"
      );
    }
  }

  function checkUserInData() {
    const searchEmail = email;
    const searchPassword = password;
    if (
      users.find((i: IUser) => i.password == searchPassword) === undefined ||
      users.find((i: IUser) => i.email == searchEmail) === undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  function chooseLogInOrReg() {
    if (checkUserInData() == false) {
      modaWindowVisible(true);

      modaWindowQue(
        "Мы не смогли найти профиль с такими данными. Хотите создать профиль?"
      );
    } else {
      users.map((i: IUser) => {
        if (i.email == email) {
          localStorage.setItem("user", `${users.indexOf(i)}`);
          localStorage.setItem("userId", `${users[users.indexOf(i)].id}`);
          logIn();
        }
      });
    }
  }

  return (
    <div>
      {modaWindowVisibleValue && <ModalWindow />}

      <div className="flex flex-col items-center">
        <div className="w-screen p-4 flex flex-col justify-center items-center gap-2">
          <h1 className="text-xl ">
            <b>Welcome to Rob - service of microblogs</b>
          </h1>
        </div>
        <div className="border border-slate-600 w-80 h-96  rounded-xl ">
          <div className="flex gap-6 justify-center h-16 p-4">
            <p>Авторизация</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-start p-4 justify-center gap-4 w-[100%]">
              <p className="text-slate-400 text-sm">Email</p>
              <input
                type="email"
                value={email}
                onChange={getEmail}
                className="border border-l-slate-400 w-[100%] rounded-xl h-10 p-2 hover:border-violet-600  focus:outline-none focus:ring focus:ring-violet-300"
              ></input>
            </div>
            <div className="flex flex-col items-start p-4 justify-center gap-4 w-[100%]">
              <p className="text-slate-400 text-sm">Password</p>
              <input
                type="password"
                value={password}
                onChange={getPassword}
                className="border border-l-slate-400 w-[100%] rounded-xl h-10 p-2 hover:border-violet-600  focus:outline-none focus:ring focus:ring-violet-300"
              ></input>
            </div>
            <button
              type="button"
              onClick={() => {
                chooseLogInOrReg();
              }}
              className="h-12 flex justify-center items-center p-4 w-[90%] text-white rounded-3xl border border-slate-600 bg-slate-400 "
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
