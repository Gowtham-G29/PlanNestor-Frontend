import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { ScrollArea } from "../../components/ui/scroll-area";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../../components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import InviteUserForm from "../Project/InviteUserForm";
import IssueList from "../Project/IssueList";
import ChatBox from "../Project/ChatBox";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProjectByID } from "../../Redux/Project/Action";
import { fetchChatByProject } from "../../Redux/Chat/Action";

function ProjectDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(searchProjectByID(id));
      dispatch(fetchChatByProject(id));
    }
  }, [id, dispatch]);

  const { project } = useSelector((store) => store);

  const handleProjectInvite = () => {};

  return (
    <div className="mt-0 lg:px-10 bg-violet-50 min-h-screen px-4 py-6 relative">
      <div className="flex flex-col lg:flex-row gap-5 justify-between pb-4">
        {/* Left: Main content */}
        <div className="w-full lg:w-[70%]">
          <ScrollArea className="h-screen pr-2">
            <div className="text-slate-700 pb-10 w-full">
              <h1 className="text-lg font-semibold pb-5 mt-5">
                {project.projectDetails?.name}
              </h1>

              <div className="space-y-5 pb-10 text-sm">
                <p className="w-full md:max-w-lg lg:max-w-3xl text-slate-700">
                  {project.projectDetails?.description}
                </p>

                <div className="flex">
                  <p className="w-36">Project Lead :</p>
                  <p>{project.projectDetails?.owner.fullName}</p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <p className="w-36">Members: </p>
                  <div className="flex flex-wrap items-center gap-2">
                    {project.projectDetails?.team.map((item) => (
                      <Avatar
                        key={item._id}
                        className="h-10 w-10 cursor-pointer bg-slate-100"
                      >
                        <AvatarFallback>{item.fullName[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="ml-2 bg-violet-200 hover:bg-slate-200"
                        onClick={handleProjectInvite}
                      >
                        <span>Invite</span>
                        <PlusIcon />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        Invite User To Join The Project
                      </DialogHeader>
                      <InviteUserForm />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex">
                  <p className="w-36">Category: </p>
                  <p>{project.projectDetails?.category}</p>
                </div>

                <div className="flex items-center">
                  <p className="w-36">Status: </p>
                  {project.projectDetails?.status === "pending" ? (
                    <Badge className="text-sm bg-amber-300 text-slate-600">
                      {project.projectDetails?.status}
                    </Badge>
                  ) : (
                    <Badge className="text-sm bg-green-500 text-slate-600">
                      {project.projectDetails?.status}
                    </Badge>
                  )}
                </div>
              </div>

              <section>
                <p className="text-lg font-semibold pb-5 py-5 -tracking-wider">
                  Tasks
                </p>
                <div className="flex flex-col md:flex-row lg:flex-row gap-4">
                  <IssueList
                    status="pending"
                    title="Todo List"
                    projectId={id}
                  />
                  <IssueList
                    status="inprogress"
                    title="In Progress"
                    projectId={id}
                  />
                  <IssueList
                    status="completed"
                    title="Completed"
                    projectId={id}
                  />
                </div>
              </section>
            </div>
          </ScrollArea>
        </div>

        {/* Right: ChatBox fixed */}
        <div className="hidden lg:block lg:w-[30%]">
          <div className="fixed right-5 top-20 w-[25%]">
            <div className="rounded-md p-2 bg-violet-50 shadow-lg shadow-black">
              <ChatBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailsPage;
