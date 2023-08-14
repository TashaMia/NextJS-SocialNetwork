import useSWR from "swr";
import { createClient } from "@supabase/supabase-js";

interface IFilter {
  isFilter: boolean;
  filter: string | null;
  filterPost: number | null;
}

export default function useGetLikePost({
  isFilter,
  filter,
  filterPost,
}: IFilter) {
  const supabase = createClient(
    "https://ifutxtlqsucntyibpetb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmdXR4dGxxc3VjbnR5aWJwZXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4NjIyMTYsImV4cCI6MjAwMzQzODIxNn0.rhcAiilZcyAnvMV2ujvGU6CklOy1CeTdxlYWeiY47v4"
  );

  async function getLikePosts(params: string) {
    let query = supabase.from(`${params}`).select("*");
    if (isFilter == true) {
      query = query.eq("user", `${filter}`);
      query = query.eq("post", `${filterPost}`);
    }
    const { data, error } = await query;

    return data;
  }

  const { data, error, isLoading, mutate } = useSWR(
    [`likes`, filter, filterPost],
    ([key]) => getLikePosts(key)
  );

  return { data, mutate };
}
