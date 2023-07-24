import { Dispatch, SetStateAction, useState } from "react";
import { mutate } from "swr";
import useMutateEditUserV2 from "../../../useMutateEditUserV2";

interface IUser {
  data: {
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    password: string;
    picture: string;
  };
  setEditIsVisible: Dispatch<SetStateAction<boolean>>;
}

export default function EditProfile(props: IUser) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { trigger } = useMutateEditUserV2();

  function editName(event: React.FormEvent<HTMLInputElement>) {
    setFirstName(event.currentTarget.value);
  }

  function editLastName(event: React.FormEvent<HTMLInputElement>) {
    setLastName(event.currentTarget.value);
  }

  const changeUserInfoObj = Object.assign({}, props.data, {
    firstName: firstName,
    lastName: lastName,
  });

  return (
    <div className="flex flex-col  p-2  items-start gap-2">
      <div>
        <p>Name:</p>
        <input
          className=" border p-1 rounded-lg"
          type="text"
          value={firstName}
          onChange={editName}
        />
      </div>
      <div>
        <p> Last Name: </p>
        <input
          className=" border p-1 rounded-lg"
          type="text"
          value={lastName}
          onChange={editLastName}
        />
      </div>

      <button
        className={
          firstName.length > 0 && lastName.length > 0
            ? "p-2  bg-violet-400 w-[100%] rounded-sm text-white text-normal h-10"
            : "bg-gray-500 p-2  w-[100%] rounded-sm text-white text-normal h-10"
        }
        onClick={() => {
          if (firstName.length > 0 && lastName.length > 0) {
            trigger(
              { id: props.data.id, patch: changeUserInfoObj },
              {
                onSuccess: () => {
                  mutate(
                    (key: string[]) =>
                      Array.isArray(key) && key?.[0]?.includes(`users`)
                  );
                },
              }
            );
          }
          props.setEditIsVisible(false);
        }}
      >
        Сохранить
      </button>
    </div>
  );
}
