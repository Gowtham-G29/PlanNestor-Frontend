import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSubscriptionUser, upgradeSubscription } from "../../Redux/subscription/Action";

function UpgradeSuccessPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { subscription } = useSelector((store) => store);

  const queryParams = new URLSearchParams(location.search);

  const paymentId = queryParams.get("payment_id");
  const planType = queryParams.get("planType");

  useEffect(() => {
    dispatch(upgradeSubscription({ planType:planType }));
    dispatch(getSubscriptionUser());
  }, []);

  return (
    <div className="flex justify-center">
      <Card className="mt-20 p-5 space-y-5 flex flex-col items-center">
        <div className="flex items-center gap-4">
          <CheckCircledIcon className="h-9 w-9 text-green-500" />
          <p className="text-xl">Plan upgraded Successfully</p>
        </div>
        <div className="space-y-5">
          <p className="text-green-500">Start Date:{subscription.userSubscription?.subscriptionStartDate}</p>
          <p className="text-red-500">End Date:{subscription.userSubscription?.subscriptionEndDate}</p>
          <p className="text-green-500">PlanType: {subscription.userSubscription?.planeType}</p>
        </div>
        <Button onClick={() => navigate("/")}>Go to home</Button>
      </Card>
    </div>
  );
}

export default UpgradeSuccessPage;
