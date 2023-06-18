import { useState } from 'react';
import  useSWRInfinite  from 'swr'

  export default function useGetPostsV2({isFilter, filter}) {
    const [pageIndex, setPageIndex] = useState(0);
     
  const getKey = (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) return null 
      return `posts?${pageIndex}&limit=3${isFilter ? `user=${filter}`: ''}`                    
    }
    const { data, size, setSize } = useSWRInfinite(getKey, getPosts)
    if (!data) return 'loading'
    async function getPosts(params: string) {
        const resp = await fetch(`http://localhost:3000/${params}&_sort=id&_order=desc`)
        const data = await resp.json()
        return data
    }
 
     return data
    }