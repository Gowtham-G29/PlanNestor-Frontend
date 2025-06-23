import { DotFilledIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { Card } from "../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProjectByID,
  updateProjectStatus,
} from "../../Redux/Project/Action";

function ProjectCard({ item }) {
  const dispatch = useDispatch();

  const { auth } = useSelector((store) => store);
  console.log("hi", auth.user.id);

  const handleProjectDelete = () => {
    dispatch(deleteProjectByID(item.id));
  };

  const navigate = useNavigate();
  console.log(item.owner.id);

  const handleProjectUpdateStatus = () => {
    dispatch(updateProjectStatus(item.id, "completed"));
  };

  return (
    <Card className="p-5 w-[100vh] lg:max-w-3xl bg-slate-50 shadow-md hover:shadow-lg transition-shadow duration-200 ">
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-5">
              <h1
                onClick={() => navigate(`/project/${item.id}`)}
                className="cursor-pointer text-lg font-semibold text-slate-700"
              >
                {item?.name}
              </h1>
              <DotFilledIcon />
              <p className="text-sm text-slate-500">{item?.category}</p>
              {item?.status == "pending" ? (
                <Badge className="text-sm bg-amber-300 text-slate-600">
                  {item?.status}
                </Badge>
              ) : (
                <Badge className="text-sm bg-green-400 text-slate-600">
                  {item?.status}
                </Badge>
              )}
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-1 rounded-full"
                  >
                    <DotsVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  {item?.owner.id === auth.user.id ? (
                    item.status === "pending" ? (
                      <div>
                        <DropdownMenuItem
                          onClick={handleProjectUpdateStatus}
                          className="cursor-pointer"
                        >
                          Mark as completed
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={handleProjectDelete}
                          className="cursor-pointer"
                        >
                          Delete
                        </DropdownMenuItem>
                      </div>
                    ) : item.status === "completed" ? (
                      <DropdownMenuItem
                        onClick={handleProjectDelete}
                        className="cursor-pointer"
                      >
                        Delete
                      </DropdownMenuItem>
                    ) : null
                  ) : (
                    <div className="text-sm font-semibold p-4">
                      Only project owner can perform this action (delete/update)
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <p className="text-sm text-slate-500">{item?.description}</p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {item?.tags.map((tag) => (
            <Badge key={tag} className="bg-violet-100 text-slate-700">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default ProjectCard;
