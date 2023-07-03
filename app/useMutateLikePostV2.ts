import { createClient } from "@supabase/supabase-js";
import useSWRMutation from "swr/mutation";
const supabase = createClient(
    "https://ifutxtlqsucntyibpetb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmdXR4dGxxc3VjbnR5aWJwZXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4NjIyMTYsImV4cCI6MjAwMzQzODIxNn0.rhcAiilZcyAnvMV2ujvGU6CklOy1CeTdxlYWeiY47v4"
  );
export default function useMutateLikePostV2() {
  const { trigger, isMutating, data } = useSWRMutation("posts", likePost);
  async function likePost(
    params: string,
    { arg }: { arg: { id: number; patch: object } }
  ) {
    const { data, error } = await supabase
      .from(`posts`)
      .update(arg.patch)
      .eq("id", arg.id)
      .select();
    console.log(data);
  
  }
  return { trigger, isMutating, data };
}