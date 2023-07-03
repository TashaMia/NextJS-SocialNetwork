// import { createClient } from "@supabase/supabase-js";
// import useSWRMutation from "swr/mutation";

// const supabase = createClient(
//     "https://ifutxtlqsucntyibpetb.supabase.co",
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmdXR4dGxxc3VjbnR5aWJwZXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4NjIyMTYsImV4cCI6MjAwMzQzODIxNn0.rhcAiilZcyAnvMV2ujvGU6CklOy1CeTdxlYWeiY47v4"
//   );
// export default function useChangeUserPicture(){
//     const { trigger, isMutating, data } = useSWRMutation(`users`,changeUserPicture)
//     const id =
//     typeof window != "undefined" ? localStorage?.getItem("userId") : "";
//     async function changeUserPicture(params:string) {
//         const { data, error } = await supabase
//         .from(`${params}`)
//         .update({ picture:`https://firebasestorage.googleapis.com/v0/b/file-uploade.appspot.com/o/user-image-${id}?alt=media&token=95f60686-e686-4cde-b037-83c58beec57e` })
//         .eq('id', id)
//         .select()
//       }
//       console.log (data)
//       return { trigger, isMutating, data };
//     }
  