import { createClient } from '@supabase/supabase-js';
import useSWR from 'swr'
interface IFilter{
    isFilter: boolean,
    filter: string |null
}
export default function useGetNotificationsV2({isFilter, filter}:IFilter) {
    const supabase = createClient("https://ifutxtlqsucntyibpetb.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmdXR4dGxxc3VjbnR5aWJwZXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4NjIyMTYsImV4cCI6MjAwMzQzODIxNn0.rhcAiilZcyAnvMV2ujvGU6CklOy1CeTdxlYWeiY47v4");

async function getNotifications(params: string) {

    let query = supabase.from(`${params}`).select("*")  .order('created_at', { ascending: false })
         if(isFilter==true){query = query.eq("userLiked", `${filter}`)}
          const {data, error}= await query
        
        return data
}
 const { data, error, isLoading } = useSWR(`notifications`, getNotifications)
 
 return data
}