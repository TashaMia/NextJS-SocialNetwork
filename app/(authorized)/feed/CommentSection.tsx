import useGetComments from "../../useGetComments";
import Comment from "./Comment";

export default function CommentSection(props: { id: number }) {
  const comments = useGetComments({
    isFilter: true,
    filter: props.id,
  });

  return (
    <ul>
      {comments?.map((comment) => (
        <li key={comment.id}>
          <Comment comment={comment} />
        </li>
      ))}
    </ul>
  );
}
