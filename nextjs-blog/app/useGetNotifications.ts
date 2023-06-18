import useSWR from 'swr'
interface IFilter{
    isFilter: boolean,
    filter: string |null
}
export default function useGetNotifications({isFilter, filter}:IFilter) {
async function getNotifications(params: string) {
    const resp = await fetch(`http://localhost:3000/${params}`)
    const data = await resp.json()
    return data
}
 const { data, error, isLoading } = useSWR(`notifications?${isFilter?`userLiked=${filter}`: ''}`, getNotifications)
 
 return data
}