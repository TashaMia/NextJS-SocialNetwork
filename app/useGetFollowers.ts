import useSWR from "swr";
import { createClient } from "@supabase/supabase-js";

export default function useGetFollowers({
  isFilter,
  filter,
  filterColumn,
}: any) {
  const supabase = createClient(
    "https://ifutxtlqsucntyibpetb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmdXR4dGxxc3VjbnR5aWJwZXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4NjIyMTYsImV4cCI6MjAwMzQzODIxNn0.rhcAiilZcyAnvMV2ujvGU6CklOy1CeTdxlYWeiY47v4"
  );

  async function getFollowers(params: string) {
    let query = supabase.from(`${params}`).select("*");

    if (isFilter == true) {
      query = query.eq(`${filterColumn}`, `${filter}`);
    }
    const { data, error } = await query;

    return data;
  }

  const { data, error, isLoading } = useSWR(
    [`subscriptions`, filter, filterColumn],
    ([key]) => getFollowers(key)
  );
  return { data, isLoading };
}
