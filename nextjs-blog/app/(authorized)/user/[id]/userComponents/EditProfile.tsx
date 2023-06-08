import { FileImage } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import useFileloader from "../../../../useFileLoader";
// import { useChangeUserInfoMutation } from "./usersApi";

export default function EditProfile(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [picture, setPicture] = useState("");
  const filePicker = useRef(null);

  const userIndex = localStorage.getItem("user");

  function editName(event: React.FormEvent<HTMLInputElement>) {
    setFirstName(event.currentTarget.value);
  }
  function editLastName(event: React.FormEvent<HTMLInputElement>) {
    setLastName(event.currentTarget.value);
  }

  const [newUserImage, setNewUserImage] = useState();

  function handleChangeFiles(event) {
    setPicture(event.target.files[0]);
  }

  function handlePick() {
    filePicker.current.click();
  }

  // сделать кнопку неактивной если false

  if (firstName.length > 0 && lastName.length > 0) {
    console.log(true);
  }

  //   const [changeUserInfo] = useChangeUserInfoMutation();

  const changeUserInfoObj = Object.assign({}, props.data, {
    firstName: firstName,
    lastName: lastName,
    picture: `https://firebasestorage.googleapis.com/v0/b/file-uploade.appspot.com/o/user-image-${userIndex}?alt=media&token=95f60686-e686-4cde-b037-83c58beec57e`,
  });

  const fileLoader = useFileloader(setNewUserImage);

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
      <div className="flex justify-center">
        <button onClick={handlePick}>
          <FileImage className=" h-14 w-6" />
        </button>
        <input
          className="opacity-0 h-0 w-0 leading-[0px] overflow-hidden p-0 m-0"
          ref={filePicker}
          type="file"
          onChange={handleChangeFiles}
          accept="image/*,.png,.jpg,.gif"
        />
        <button onClick={() => fileLoader(userIndex, picture)}>
          Загрузить картинку
        </button>
      </div>
      <button
        className={
          newUserImage
            ? "p-2 ml-4 bg-violet-400 w-36 rounded-sm text-white text-normal h-10"
            : "bg-gray-500 p-2 ml-4  w-36 rounded-sm text-white text-normal h-10"
        }
        onClick={() => {
          if (firstName.length > 0 && lastName.length > 0) {
            changeUserInfo({ id: props.data.id, patch: changeUserInfoObj });
            location.reload();
          }
        }}
      >
        Сохранить
      </button>
    </div>
  );
}
