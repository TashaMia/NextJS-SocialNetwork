import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import useMutateUsersV2 from "./useMutateUsersV2";

const supabase = createClient(
    "https://ifutxtlqsucntyibpetb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmdXR4dGxxc3VjbnR5aWJwZXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4NjIyMTYsImV4cCI6MjAwMzQzODIxNn0.rhcAiilZcyAnvMV2ujvGU6CklOy1CeTdxlYWeiY47v4"
  );

 export default function useGetRegistrationStatus(){
    const[data, setData] = useState(false)
   const { trigger, isMutating } = useMutateUsersV2();
    async function getUser() {
        const { data: user } = await supabase.auth.getUser();
        checkIfUserIsRegistered(user.user?.email, user.user?.id);  

      }
      getUser();

      async function checkIfUserIsRegistered(email:string|undefined, id:string|undefined) {
          let query = supabase.from(`users`).select("*").eq("id", id);
          const { data, error } = await query;
          if(data&&data.length === 0){
            trigger({
                      body: {
                        email: email,
                        firstName: "Имя",
                        id: id,
                        lastName: "Фамилия",
                        picture: null,
                      },
                    });
                   id&&localStorage.setItem('userId', id)
            setData(true)
        }else{
            setData(false)
            id&&localStorage.setItem('userId', id)

        }
        }
        
                   
  }
