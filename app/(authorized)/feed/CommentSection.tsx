import useGetComments from "../../useGetComments";
import useGetUsersV2 from "../../useGetUsersV2";
import Comment from "./Comment";

export default function CommentSection(props: { id: number }) {
  const comments = useGetComments({
    isFilter: true,
    filter: props.id,
  });

  console.log(comments);
  return (
    <ul>
      {comments?.map((comment) => (
        <li>
          <Comment comment={comment} />
        </li>
      ))}
    </ul>
  );
}
