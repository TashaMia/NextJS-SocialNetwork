import { createClient } from "@supabase/supabase-js";
import useSWRMutation from "swr/mutation";

export default function useMutateCommentPost() {
  const supabase = createClient(
    "https://ifutxtlqsucntyibpetb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmdXR4dGxxc3VjbnR5aWJwZXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4NjIyMTYsImV4cCI6MjAwMzQzODIxNn0.rhcAiilZcyAnvMV2ujvGU6CklOy1CeTdxlYWeiY47v4"
  );

  async function addComment(
    params: string,
    { arg }: { arg: { body: object } }
  ) {
    console.log(arg);
    const { data, error } = await supabase
      .from(`${params}`)
      .upsert(arg.body)
      .select();
    return data;
  }

  const { trigger, isMutating, data } = useSWRMutation("comments", addComment);
  console.log(data);

  return { trigger, isMutating, data };
}
