import useSWR from "swr";
import { createClient } from "@supabase/supabase-js";

export default function useGetUsersV2({ isFilter, filter }: any) {
  const supabase = createClient(
    "https://ifutxtlqsucntyibpetb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmdXR4dGxxc3VjbnR5aWJwZXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4NjIyMTYsImV4cCI6MjAwMzQzODIxNn0.rhcAiilZcyAnvMV2ujvGU6CklOy1CeTdxlYWeiY47v4"
  );

  async function getUsers(params: string) {
    let query = supabase.from(`${params}`).select("*");
    if (isFilter == true) {
      query = query.eq("id", `${filter}`);
    }
    const { data, error } = await query;

    return data;
  }

  const { data, error, isLoading } = useSWR([`users`, filter], ([key]) =>
    getUsers(key)
  );

  return data;
}
