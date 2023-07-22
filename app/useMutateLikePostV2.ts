import { createClient } from "@supabase/supabase-js";
import useSWRMutation from "swr/mutation";
const supabase = createClient(
  "https://ifutxtlqsucntyibpetb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmdXR4dGxxc3VjbnR5aWJwZXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4NjIyMTYsImV4cCI6MjAwMzQzODIxNn0.rhcAiilZcyAnvMV2ujvGU6CklOy1CeTdxlYWeiY47v4"
);
export default function useMutateLikePostV2() {
  const { trigger, isMutating, data } = useSWRMutation("likes", likePost);
  async function likePost(params: string, { arg }: { arg: { body: object } }) {
    const { data, error } = await supabase
      .from(`${params}`)
      .upsert(arg.body)
      .select();
    return data;
  }
  return { trigger, isMutating, data };
}
