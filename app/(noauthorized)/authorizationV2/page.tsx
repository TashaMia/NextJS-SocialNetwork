"use client";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import ModalWindow, {
  modalWindowQuestion,
} from "../../modalWindow/ModalWindow";
import { emailAt, modalWindow } from "../../atoms";
import { createClient } from "@supabase/supabase-js";

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
        //emailRedirectTo: "http://localhost:3002/feed",
      },
    });
  }

  const [btn, setBtn] = useState("Отправить");

  return (
    <div>
      {modaWindowVisibleValue && <ModalWindow />}

      <div className="flex flex-col items-center">
        <div className="w-screen p-4 flex flex-col justify-center items-center gap-2">
          <h1 className="text-xl ">
            <b>Добро пожаловать в Роб - сервис микроблогов.</b>
          </h1>
        </div>
        <div className="border border-slate-600 w-80 h-96  rounded-xl ">
          <div className="flex gap-6 justify-center h-16 p-4">
            <p>Авторизация</p>
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
                className="border border-l-slate-400 w-[100%] rounded-xl h-10 p-2 hover:border-violet-600  focus:outline-none focus:ring focus:ring-violet-300"
              ></input>
            </div>

            <button
              type="button"
              onClick={() => {
                logIn();
                setBtn(`Отпрвление...`);
                setTimeout(() => {
                  setBtn("Отправлено");
                }, 7000);
                setTimeout(() => {
                  setBtn("Отправить");
                }, 15000);
              }}
              className="h-12 flex justify-center items-center p-4 w-[90%] text-white rounded-3xl border border-slate-600 bg-slate-400 "
            >
              {btn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
