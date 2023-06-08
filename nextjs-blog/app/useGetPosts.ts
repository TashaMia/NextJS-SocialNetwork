import useSWR from 'swr'
export default function useGetPosts({isFilter, filter}) {
async function getPosts(params: string) {
    const resp = await fetch(`http://localhost:3000/${params}?${isFilter ? `user=${filter}`: ''}&_sort=id&_order=desc`)
    const data = await resp.json()
    return data
}
 const { data, error, isLoading } = useSWR("posts", getPosts)
 
 return data
}