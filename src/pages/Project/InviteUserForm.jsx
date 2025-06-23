import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { DialogClose } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { useDispatch } from "react-redux";
import { inviteToProjectByID } from "../../Redux/Project/Action";
import { useParams } from "react-router-dom";

function InviteUserForm() {


  const dispatch=useDispatch();
  const {id}=useParams();

  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = (data) => {
    dispatch(inviteToProjectByID({email:data.email,projectId:Number(id)}))
    "Create project Data:", data;
  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-slate-700 py-5 px-5"
                    placeholder="User Email ID"
                  />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />

          <DialogClose>
            <Button type="submit" className="w-full mt-5">
              Invite
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
}

export default InviteUserForm;
