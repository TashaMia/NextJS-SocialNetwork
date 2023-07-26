import useSWR from "swr";
import { createClient } from "@supabase/supabase-js";

interface IFilter {
  isFilter: boolean;
  filter: string | undefined;
}

export default function useGetPostsV2({ isFilter, filter }: IFilter) {
  const supabase = createClient(
    "https://ifutxtlqsucntyibpetb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmdXR4dGxxc3VjbnR5aWJwZXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4NjIyMTYsImV4cCI6MjAwMzQzODIxNn0.rhcAiilZcyAnvMV2ujvGU6CklOy1CeTdxlYWeiY47v4"
  );

  async function getPosts(params: string) {
    let query = supabase
      .from(`${params}`)
      .select("*")
      .order("created_at", { ascending: false });
    if (isFilter == true) {
      query = query.eq("user", `${filter}`);
    }
    const { data, error } = await query;

    return data;
  }

  const { data, error, isLoading, mutate } = useSWR(
    [`posts`, filter],
    ([key]) => getPosts(key)
  );

  return { data, mutate, isLoading };
}
