import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { ScrollArea } from "../../components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  fetchChatMessages, sendMessage } from "../../Redux/Chat/Action";
import { useParams } from "react-router-dom";

function ChatBox() {
  const [message, setMessage] = useState("");
  const dispatch=useDispatch();

  const {auth,chat}=useSelector(store=>store);
  const {id}=useParams();



  const handleSendMessage = () => {
    dispatch(sendMessage({
      senderId:auth.user.id,
      content:message,
      projectId:Number(id)

    }))
    setMessage("");
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(()=>{
     dispatch(fetchChatMessages(chat.chat?.id))
  },[])



  return (
    <div className="sticky ">
      <div className="border rounded-lg border-slate-700">
        <h1 className="border-b border-black p-5 font-bold text-xl">Project Chat</h1>
        <ScrollArea className="h-[32rem] w-full p-5 flex gap-3 flex-col">
          {chat.messages?.map((item) =>
            item.sender.id!==auth.user.id? (
              <div key={item} className="flex gap-2 mb-2 justify-start">
                <Avatar>
                  <AvatarFallback>{item.sender.fullName[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-2 py-2 px-5 border rounded-ss-2xl rounded-e-xl border-violet-400 bg-slate-200">
                  <p>{item.sender.fullName.substring(0,9)}</p>
                  <p className="text-slate-500">{item.content}</p>
                </div>
              </div>
            ) : (
              <div key={item} className="flex gap-2 mb-2 justify-end">
                <div className="space-y-2 py-2 px-5 border rounded-se-2xl rounded-s-xl border-violet-400 bg-green-200">
                  <p>{item.sender.fullName.substring(0,9)}</p>
                  <p className="text-slate-500">{item.content}</p>
                </div>
                <Avatar>
                  <AvatarFallback>{item.sender.fullName[0]}</AvatarFallback>
                </Avatar>
              </div>
            )
          )}
        </ScrollArea>
        <div className="relative p-0">
          <Input
            value={message}
            onChange={handleMessageChange}
            placeholder="type message..."
            className="py-7 border-t outline-none
              focus:outline-none focus:ring-0
               rounded-lg border-b-0 border-x-0 border-black"
          />
          <Button
            onClick={handleSendMessage}
            className="absolute right-2 top-3 rounded-full "
            size="icon"
            variant="ghost"
          >
            <PaperPlaneIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
