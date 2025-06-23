import { useParams } from "react-router-dom";
import { ScrollArea } from "../../components/ui/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import CreateCommentForm from "./CreateCommentForm";
import CommentCard from "./CommentCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchIssueById, updateIssueStatus } from "../../Redux/Issue/Action";
import { fetchComments } from "../../Redux/Comments/Action";

function IssueDetailsPage() {
  const { issueId } = useParams();

  const dispatch = useDispatch();
  const { issue, comment, project, auth } = useSelector((store) => store);
  console.log(issue);

  const handleUpdateIssueStatus = (status) => {
    dispatch(updateIssueStatus({ id: issueId, status: status }));
  };

  useEffect(() => {
    dispatch(fetchIssueById(issueId));
    dispatch(fetchComments(issueId));
  }, [issueId]);

  return (
    <div className="px-20 py-8 text-slate-700 bg-violet-50 ">
      <div className="flex justify-between border p-10 rounded-lg">
        <ScrollArea className="h-[80vh] w-[60%]">
          <div>
            <h1 className="text-xl font-semibold text-slate-700">
              {issue.issueDetails?.title}
            </h1>
            <div className="py-5">
              <h2 className="font-semibold text-slate-700">Description</h2>
              <p className="text-slate-700 text-sm mt-3">
                {issue.issueDetails?.description}
              </p>
            </div>
            <div className="mt-5">
              <h1 className="pb-3">Activity</h1>
            </div>
            <Tabs defaultValue="comments" className="w-[400px]">
              <TabsList className="mb-5 bg-violet-100">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                All make changes to your account here
              </TabsContent>
              <TabsContent value="comments">
                <CreateCommentForm issueId={issueId} />
                <div className="mt-8 space-y-6">
                  {comment.comments.map((item) => (
                    <CommentCard key={item} comments={item} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="history">
                History change your password here
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
        <div className="w-full lg:w-[30%] space-y-2">
          <Select onValueChange={handleUpdateIssueStatus}>
            <SelectTrigger className="w-[180px] border-black">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {auth.user?.id == issue.issueDetails?.assignee?.id ? (
                <>
                  <SelectItem value="pending">Todo</SelectItem>
                  <SelectItem value="inprogress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </>
              ) : (
                <p className="p-3 text-slate-500">Only Issue assignee can update the status</p>
              )}
            </SelectContent>
          </Select>
          <div className="border rounded-lg border-black">
            <p className="border-b py-3 px-5 border-black font-bold">Details</p>
            <div className="p-5">
              <div className="space-y-7">
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Assignee</p>
                  {issue.issueDetails?.assignee ? (
                    <>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 text-xs ">
                          <AvatarFallback>
                            {issue.issueDetails?.assignee.fullName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <p>{issue.issueDetails?.assignee.fullName}</p>
                      </div>
                    </>
                  ) : (
                    "Unassigned"
                  )}
                </div>

                {/* <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Labels</p>
                  <p>None</p>
                </div> */}
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Status</p>
                  {issue.issueDetails?.status === "pending" && (
                    <Badge className="bg-red-500 text-slate-700">Pending</Badge>
                  )}
                  {issue.issueDetails?.status === "inprogress" && (
                    <Badge className="bg-yellow-300 text-slate-700">
                      In Progress
                    </Badge>
                  )}
                  {issue.issueDetails?.status === "completed" && (
                    <Badge className="bg-green-500 text-slate-700">
                      Completed
                    </Badge>
                  )}
                </div>

                {/* 
                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Release</p>
                  <p>10-02-2025</p>
                </div> */}

                <div className="flex gap-10 items-center">
                  <p className="w-[7rem]">Reported To</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 text-xs ">
                      <AvatarFallback>
                        {project.projectDetails?.owner.fullName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <p>{project.projectDetails?.owner.fullName}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueDetailsPage;
