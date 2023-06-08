import useSWR from 'swr'
export default function useGetUsers({isFilter, filter}:any) {
async function getUsers(params: string) {
    const resp = await fetch(`http://localhost:3000/${params}?${isFilter ? `id=${filter}` : ''}`)
    const data = await resp.json()
    return data
}
 const { data, error, isLoading } = useSWR("users", getUsers)
 
 return data
}