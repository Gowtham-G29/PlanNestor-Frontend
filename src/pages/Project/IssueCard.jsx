import { DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import UserList from "./UserList";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteIssueById} from "../../Redux/Issue/Action";

function IssueCard({ item, projectId }) {
  const navigate = useNavigate();

  const{auth ,project}=useSelector(store=>store)
  console.log(project)

  const dispatch = useDispatch();
  const handleIssueDelete = () => {
    dispatch(deleteIssueById(item.id));
  };

  return (
    <Card className="rounded-md py-1 pb-2">
      <CardHeader className="py-0 ">
        <div className="flex justify-between items-center">
          <CardTitle
            className="cursor-pointer"
            onClick={() => navigate(`/project/${projectId}/issue/${item.id}`)}
          >
            {item?.title}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button size="icon" variant="ghost" className="rounded-full">
                <DotsVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>

              <DropdownMenuItem
                onClick={handleIssueDelete}
                className="cursor-pointer"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="py-0">
        <div className="flex items-center justify-between">
          <p className="font-semibold">{item?.description}</p>
          <DropdownMenu className="w-[30rem]  bg-slate-500">
            <DropdownMenuTrigger>
              <Button variant="outline" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarFallback>
                    <PersonIcon className="" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="cursor-pointer bg-white">
                {auth.user?.id==project.projectDetails?.owner.id?(                <UserList issueDetails={item} />
):(<p>Project Lead have only access to assign</p>)}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}

export default IssueCard;
