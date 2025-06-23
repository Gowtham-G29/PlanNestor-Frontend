import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { assignIssueToUser } from "../../Redux/Issue/Action";

function UserList({issueDetails}) {

  const {project}=useSelector(store=>store)

  const dispatch=useDispatch();

  const handleAssignedIssueToUser=(userId)=>{
       dispatch(assignIssueToUser({issueId:issueDetails.id,userId:userId}))
  }


  return (
    <>
      <div className="space-y-2">
        <div className="flex justify-center items-center rounded-md">
          <p className="py-2 px-3">
            <span className="font-bold">{issueDetails.assignee?.fullName|| "Unassigned"}</span>
          </p>
        </div>
        {project.projectDetails?.team.map((item) => (
        <div key={item}
         className="py-2 group hover:bg-slate-200 cursor-pointer flex items-center space-x-4 rounded-md"onClick={()=>handleAssignedIssueToUser(item.id)}>
          <div className="flex items-center justify-center w-10 h-10" >
            <Avatar className="h-10 w-10 ">
              <AvatarFallback>{item.fullName[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-1 w-30">
            <p className="text-sm leading-none">{item.fullName}</p>
            <p className="text-sm text-muted-foreground">@{item.fullName.toLowerCase()}</p>
          </div>
        </div>))}
      </div>
    </>
  );
}

export default UserList;
