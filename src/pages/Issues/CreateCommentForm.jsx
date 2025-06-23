import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import {useDispatch} from "react-redux";
import { createComment } from "../../Redux/Comments/Action";

function CreateCommentForm({ issueId }) {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleSendMessage = () => {
    if (!message.trim()) return;
    dispatch(createComment({ issueId: issueId, content: message }));
    setMessage("");
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  

  return (
    <div className="flex justify-center items-center gap-2 w-full">
      <div className="flex gap-2 justify-center items-center w-full">
        <Avatar className="h-10 w-10 bg-slate-500">
          <AvatarFallback>R</AvatarFallback>
        </Avatar>
        <Input
          value={message}
          onChange={handleMessageChange}
          type="text"
          className="border w-full border-slate-700 py-5 px-5"
          placeholder="Provide comment..."
        />
      </div>

      <Button onClick={handleSendMessage} type="button">
        Save
      </Button>
    </div>
  );
}

export default CreateCommentForm;
