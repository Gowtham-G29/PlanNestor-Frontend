import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Button } from "../../components/ui/button";
import { useDispatch } from "react-redux";
import { createPayment } from "../../Redux/Payment/Action";

function SubscriptionCard({ data }) {
  const dispatch = useDispatch();

  const handleUpgrade = () => {
    dispatch(
      createPayment({
        planType: data.planType,
        jwt: localStorage.getItem("jwt"),
      })
    );
  };

  return (
    <div className="rounded-xl bg-violet-100 shadow-[lightblue] shadow-2xl card p-5 space-y-5 w-[18rem]">
      <p className="font-bold font-serif text-xl">{data.planName}</p>
      <p>
        <span className="text-xl font-semibold">₹{data.price}/</span>
        <span>{data.planType}</span>
      </p>
      {data.planType == "ANNUALLY" && <p className="text-green-500">30% off</p>}

      <Button onClick={handleUpgrade} className="w-full">
        {data.buttonName}
      </Button>

      <div>
        {data.features.map((item) => (
          <div
            key={item}
            className="flex gap-2 items-center text-slate-700 font-semibold"
          >
            <CheckCircledIcon />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubscriptionCard;
