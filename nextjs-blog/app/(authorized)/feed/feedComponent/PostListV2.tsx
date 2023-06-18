"use client";
import { useRef, useState } from "react";
import { ViewportList } from "react-viewport-list";
import useGetPostsV2 from "../../../useGetPostsV2";

// const ItemList = ({
//   items,
// }: {
//   items: { id: string; title: string }[];
// }) => {
//   const ref = useRef<HTMLDivElement | null>(
//     null,
//   );

//   return (
//     <div className="scroll-container" ref={ref}>
//       <ViewportList
//         viewportRef={ref}
//         items={items}
//       >
//         {(item) => (
//           <div key={item.id} className="item">
//             {item.title}
//           </div>
//         )}
//       </ViewportList>
//     </div>
//   );
// };

// export { ItemList };
import useSWRInfinite from "swr/infinite";
export default function PostsListV2() {
  const [pageIndex, setPageIndex] = useState(0);

  const getKey = (pageIndex: number, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null;
    return `posts?_page=${pageIndex}&_limit=10`;
  };
  const { data, size, setSize } = useSWRInfinite(getKey, getPosts);
  //   if (!data) return "loading";

  async function getPosts(params: string) {
    const resp = await fetch(
      `http://localhost:3000/${params}&_sort=id&_order=desc`
    );
    const data = await resp.json();
    return data;
  }
  const [commonData, setCommonData] = useState([]);

  return (
    <div>
      <div>{data && data?.map((i) => <p key={i.id}>{i.text}.......</p>)}</div>
      <button
        onClick={() => {
          setSize(1 + size);
        }}
      >
        More
      </button>
    </div>
  );
}
