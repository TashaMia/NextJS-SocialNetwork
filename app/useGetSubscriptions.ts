import useSWR from "swr";
import { createClient } from "@supabase/supabase-js";

export default function useGetSubscriptions({
  isFilter,
  filter,
  filterColumn,
}: any) {
  const supabase = createClient(
    "https://ifutxtlqsucntyibpetb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmdXR4dGxxc3VjbnR5aWJwZXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4NjIyMTYsImV4cCI6MjAwMzQzODIxNn0.rhcAiilZcyAnvMV2ujvGU6CklOy1CeTdxlYWeiY47v4"
  );

  async function getSubscriptions(params: string) {
    let query = supabase.from(`${params}`).select("*");

    if (isFilter == true) {
      query = query.eq(`${filterColumn}`, `${filter}`);
      console.log(filterColumn);
    }
    const { data, error } = await query;

    return data;
  }

  const { data, error, isLoading } = useSWR(
    [`subscriptions`, filter, filterColumn],
    ([key]) => getSubscriptions(key)
  );

  return data;
}
