import useSWR from 'swr'
interface IFilter{
    isFilter: boolean,
    filter: string|undefined
}
export default function useGetPosts({isFilter, filter}:IFilter) {
async function getPosts(params: string) {
    const resp = await fetch(`http://localhost:3000/${params}&_sort=id&_order=desc`)
    const data = await resp.json()
    return data
}
 const { data, error, isLoading } = useSWR(`posts?${isFilter ? `user=${filter}`: ''}`, getPosts)
 
 return data
}