import useSWR from 'swr'
export default function useGetUsers({isFilter, filter}:any) {
async function getUsers(params: string) {
    const resp = await fetch(`http://localhost:3000/${params}`)
    const data = await resp.json()
    return data
}
 const { data, error, isLoading } = useSWR(`users?${isFilter ? `id=${filter}` : ''}`, getUsers)
 
 return data
}