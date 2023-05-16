import CommentItem from "./item";

export default function CommentList(props) {
  const {comments} = props;
  return (
    <>
      <ul>
        {comments.map((comment) => (
          <CommentItem key={comment.id} content={comment.content} />
        ))}
      </ul>
    </>
  );
}
