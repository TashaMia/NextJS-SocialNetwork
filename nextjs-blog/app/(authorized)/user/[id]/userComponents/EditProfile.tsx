import { useState } from "react";
import useMutateEditUser from "../../../../useMutateEditUser";
// import { useChangeUserInfoMutation } from "./usersApi";
interface IUser {
  data: {
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    password: string;
    picture: string;
  };
}

export default function EditProfile(props: IUser) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { trigger } = useMutateEditUser();

  const userIndex = localStorage.getItem("user");

  function editName(event: React.FormEvent<HTMLInputElement>) {
    setFirstName(event.currentTarget.value);
  }
  function editLastName(event: React.FormEvent<HTMLInputElement>) {
    setLastName(event.currentTarget.value);
  }

  const changeUserInfoObj = Object.assign({}, props.data, {
    firstName: firstName,
    lastName: lastName,
    picture: `https://firebasestorage.googleapis.com/v0/b/file-uploade.appspot.com/o/user-image-${userIndex}?alt=media&token=95f60686-e686-4cde-b037-83c58beec57e`,
  });

  return (
    <div className="flex flex-col items-center">
      <div>
        <p>Name:</p>
        <input
          className=" border"
          type="text"
          value={firstName}
          onChange={editName}
        />
      </div>
      <div>
        <p> Last Name: </p>
        <input
          className=" border"
          type="text"
          value={lastName}
          onChange={editLastName}
        />
      </div>

      <button
        className={
          firstName.length > 0 && lastName.length > 0
            ? "p-2 ml-4 bg-violet-400 w-36 rounded-sm text-white text-normal h-10"
            : "bg-gray-500 p-2 ml-4  w-36 rounded-sm text-white text-normal h-10"
        }
        onClick={() => {
          if (firstName.length > 0 && lastName.length > 0) {
            trigger({ id: props.data.id, patch: changeUserInfoObj });
            location.reload();
          }
        }}
      >
        Сохранить
      </button>
    </div>
  );
}
