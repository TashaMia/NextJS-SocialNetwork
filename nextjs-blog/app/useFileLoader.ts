import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { SetStateAction } from 'jotai';
import { Dispatch } from 'react';

export default function useFileloader(setNewUserImage?: any){

    const firebaseConfig = {
        apiKey: "AIzaSyDT1_TnCNG4N_ghrjYyqHZ_AlphBHEvv-w",
        authDomain: "file-uploade.firebaseapp.com",
        projectId: "file-uploade",
        storageBucket: "file-uploade.appspot.com",
        messagingSenderId: "167481431672",
        appId: "1:167481431672:web:eb6fd800e4b533124b3f8d"
      };

      const app = initializeApp(firebaseConfig);
      const storage = getStorage(app,'gs://file-uploade.appspot.com');

      

      async function handleUpload(userIndex:number, picture: File|null, setDone:Dispatch<SetStateAction<string>>){
        if(!picture){
            return;
        };       
            ref(storage, `images/${picture?.name}`);
            const storageRef = ref(storage, `user-image-${userIndex}`);
            uploadBytes(storageRef, picture).then((snapshot) => {
                setNewUserImage(storageRef.bucket);
                setDone('Done')
              });
        
       };
       return handleUpload
}