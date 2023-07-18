import useSWR from 'swr'
import { createClient } from "@supabase/supabase-js";

export default function useGetSubscriptions({isFilter, filter}:any) {
    const supabase = createClient("https://ifutxtlqsucntyibpetb.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmdXR4dGxxc3VjbnR5aWJwZXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4NjIyMTYsImV4cCI6MjAwMzQzODIxNn0.rhcAiilZcyAnvMV2ujvGU6CklOy1CeTdxlYWeiY47v4");

    async function getSubscriptions(params: string) {
        let query = supabase.from(`${params}`).select("*")
        
         if(isFilter==true){query = query.eq("user", `${filter}`)}
          const {data, error}= await query
          console.log(isFilter)
          console.log(filter)
          
        return data
      }
    
 const { data, error, isLoading } = useSWR([`subscriptions`], ([key]) => getSubscriptions(key))

 return data
}