import useSWR from 'swr'
import { createClient } from "@supabase/supabase-js";
import useSWRMutation from "swr/mutation";


interface IFilter{
    isFilter: boolean,
    filter: string|undefined
}

export default function useMutateDeletePostsV2() {
    const supabase = createClient("https://ifutxtlqsucntyibpetb.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmdXR4dGxxc3VjbnR5aWJwZXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4NjIyMTYsImV4cCI6MjAwMzQzODIxNn0.rhcAiilZcyAnvMV2ujvGU6CklOy1CeTdxlYWeiY47v4");
    const { trigger, isMutating, data } = useSWRMutation(`posts`,deletePosts)

    async function deletePosts(params: string, { arg }: { arg: { id: number } }) {
       const resp = await supabase.from(`${params}`).delete().eq("id", `${arg.id}`)
    return resp
      }
    
      return { trigger, isMutating, data };

}