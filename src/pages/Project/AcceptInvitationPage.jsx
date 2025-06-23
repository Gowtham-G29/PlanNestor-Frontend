import { useDispatch } from "react-redux";
import { Button } from "../../components/ui/button";
import { acceptInvitation } from "../../Redux/Project/Action";
import { useLocation, useNavigate } from "react-router-dom";

function AcceptInvitationPage() {
  const dispatch = useDispatch();

  const location = useLocation();

  const navigate = useNavigate();
  const handleAcceptInvitation = () => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");
    dispatch(acceptInvitation({token: token, navigate }));
  };

  return (
    <div className="h-[85vh] flex flex-col justify-center items-center">
      <h1 className="py-5 font-semibold text-xl">
        You are invited to Join the project
      </h1>
      <Button onClick={handleAcceptInvitation}>Accept invitation</Button>
    </div>
  );
}

export default AcceptInvitationPage;
