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
import { data, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createIssue, fetchIssue } from "../../Redux/Issue/Action";
import { useEffect } from "react";

function CreateIssueForm({ status }) {
  const dispatch = useDispatch();

  const { id } = useParams();

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      projectId: id,
      priority: "low",
      status: status,
    },
  });

  const { issue } = useSelector((store) => store);

  const handleSubmit = (data) => {
    "Create project Data:", data;
    dispatch(createIssue(data));
  };

  useEffect(() => {
    dispatch(fetchIssue(id));
  }, [data]);

  return (
    <div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-slate-700 py-5 px-5"
                    placeholder="Issue Name..."
                  />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-slate-700 py-5 px-5"
                    placeholder="Issue description..."
                  />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />

          <DialogClose>
            <Button type="submit" className="w-full mt-5">
              Rise Issue
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
}

export default CreateIssueForm;
