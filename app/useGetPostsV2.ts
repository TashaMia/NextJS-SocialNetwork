import useSWR from 'swr'
interface IFilter{
    isFilter: boolean,
    filter: string|undefined
}
export default function useGetPostsV2({isFilter, filter}:IFilter) {
async function getPosts(params: string) {
    const resp = await fetch(`https://database-83f15-default-rtdb.asia-southeast1.firebasedatabase.app/data/${params}&_sort=id&_order=desc`)
    const data = await resp.json()
    return data
}
 const { data, error, isLoading } = useSWR(`posts?${isFilter ? `user=${filter}`: ''}`, getPosts)
 
 return data
}