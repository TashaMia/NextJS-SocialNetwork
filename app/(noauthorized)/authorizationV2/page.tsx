"use client";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import ModalWindow, {
  modalWindowQuestion,
} from "../../modalWindow/ModalWindow";
import { emailAt, modalWindow } from "../../atoms";
import { createClient } from "@supabase/supabase-js";
import Robot from "./Robot";
import Spin from "../../Spin";
import { Check } from "@phosphor-icons/react";

export default function AuthorizationV2() {
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState<string>("");
  const modaWindowQue = useSetAtom(modalWindowQuestion);
  const modaWindowVisible = useSetAtom(modalWindow);
  const modaWindowVisibleValue = useAtomValue(modalWindow);
  const [email, setEmail] = useAtom(emailAt);

  const supabase = createClient(
    "https://ifutxtlqsucntyibpetb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmdXR4dGxxc3VjbnR5aWJwZXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4NjIyMTYsImV4cCI6MjAwMzQzODIxNn0.rhcAiilZcyAnvMV2ujvGU6CklOy1CeTdxlYWeiY47v4"
  );

  function getEmail(event: React.FormEvent<HTMLInputElement>) {
    setEmail(event.currentTarget.value);
  }

  function validationEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  function logIn() {
    if (validationEmail()) {
      auth();
    } else {
      setError(true);
      setErrorText("Кажется, вы указали неверный email. Попробуйте снова :)");
    }
  }

  async function auth() {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: "https://next-js-social-network-steel.vercel.app/feed",
        // emailRedirectTo: "http://localhost:3002/feed",
      },
    });
  }

  const [btn, setBtn] = useState(false);
  const [successfulMailAlert, setSuccessfulMailAlert] = useState(false);

  return (
    <div>
      {modaWindowVisibleValue && <ModalWindow />}

      <div className="flex flex-col gap-4 items-center">
        <div className="w-screen p-4 flex flex-col justify-center items-center gap-4">
          <div className="w-24 h-24">
            {" "}
            <Robot />
          </div>
          <h1 className="text-xl w-80  font-mono">
            <b>Добро пожаловать в Роб - сервис микроблогов.</b>
          </h1>
        </div>
        <div className="border border-slate-600 w-80 h-96  rounded-xl ">
          <div className="flex gap-6 justify-center h-16 p-4">
            <p className=" font-bold">Авторизация</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-start p-4 justify-center gap-4 w-[100%]">
              <p className="text-slate-400 text-sm">
                Зарегистрироваться проще простого. Введите ваш email, перейдите
                по ссылке в письме и попадете в ваш профиль.
              </p>
              <input
                type="email"
                value={email}
                onChange={getEmail}
                placeholder="Электронная почта"
                className="border border-l-slate-400 w-[100%] rounded-xl h-10 p-2 hover:border-violet-600  focus:outline-none focus:ring focus:ring-violet-300"
              ></input>
            </div>

            <button
              type="button"
              onClick={() => {
                logIn();
                if (validationEmail()) {
                  setBtn(true);
                  setTimeout(() => {
                    setBtn(false);
                    setSuccessfulMailAlert(true);
                  }, 7000);
                } else return;
              }}
              className="h-12 flex justify-center items-center p-4 w-[90%] text-white rounded-lg border   bg-black "
            >
              {btn ? <Spin /> : <div>Отправить</div>}
            </button>
            {successfulMailAlert && (
              <div className="w-[90%] flex justify-start gap-2 py-4 items-end">
                <Check className="w-6 h-6 text-green-600" />{" "}
                <p className="text-sm">Письмо отправлено</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
