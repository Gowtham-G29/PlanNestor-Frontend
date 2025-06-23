import { PersonIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import CreateProjectForm from "../Project/CreateProjectForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Auth/Action";

function Navbar() {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white border-b border-violet-200 shadow-sm py-4 px-5 flex items-center justify-between">
      <p
        onClick={() => navigate("/")}
        className="cursor-pointer text-2xl font-bold text-violet-700"
      >
        PlanNestor
      </p>
      <Dialog>
        <DialogTrigger>
          <Button
            variant="outline"
            size="lg"
            className="text-slate-700 cursor-pointer text-lg border-violet-500 hover:bg-violet-200"
          >
            New project <PlusIcon />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>Create New Project</DialogHeader>
          <CreateProjectForm />
        </DialogContent>
      </Dialog>

      {/* <Button disable onClick={()=>navigate("/upgrade_plan")} variant={"ghost"} size="sm" className="text-slate-700 cursor-pointer">
            Upgrade
        </Button> */}

      <div className="flex items-center gap-3 mr-3">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="outline"
              size="icon"
              className="p-1 rounded-full bg-slate-100 hover:bg-slate-200 border-slate-300 border-2"
            >
              <PersonIcon className="size-6 " />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-slate-100">
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer items-center justify-center"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <p>{auth.user?.fullName}</p>
      </div>
    </div>
  );
}

export default Navbar;
