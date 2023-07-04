import { createClient } from '@supabase/supabase-js';
import useSWR from 'swr'
interface IFilter{
    isFilter: boolean,
    filter: string |null
}    const supabase = createClient("https://ifutxtlqsucntyibpetb.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmdXR4dGxxc3VjbnR5aWJwZXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4NjIyMTYsImV4cCI6MjAwMzQzODIxNn0.rhcAiilZcyAnvMV2ujvGU6CklOy1CeTdxlYWeiY47v4");

export default function useGetNotificationsV2({isFilter, filter}:IFilter) {

async function getNotifications(params: string) {
const {data, error} = await supabase.from(`${params}`).select("*").order('created_at', { ascending: false }).eq("userLiked", `${filter}`)
    return data
}
 const { data, error, isLoading } = useSWR('notifications', getNotifications)
 
 return data
}