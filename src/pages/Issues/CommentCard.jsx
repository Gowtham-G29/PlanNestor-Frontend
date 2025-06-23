import { TrashIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../Redux/Comments/Action";

function CommentCard({ comments }) {

  const dispatch=useDispatch();
  
  const handleDelete=()=>{
    dispatch(deleteComment(comments.id));
  }

  return (
    <div className="flex justify-between ">
      <div className="flex items-center gap-4">
        <Avatar className="h-10 w-10">
          <AvatarFallback>{comments.user.fullName[0]}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p>{comments.user.fullName}</p>
          <p>{comments.content}</p>
        </div>
      </div>
      <Button onClick={handleDelete} className="rounded-full hover:bg-red-400" variant="ghost" size="icon">
        <TrashIcon />
      </Button>
    </div>
  );
}

export default CommentCard;
