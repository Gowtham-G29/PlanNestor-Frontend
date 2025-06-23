import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {useDispatch} from "react-redux";
import { register } from "../../Redux/Auth/Action";

function Register() {

  const dispatch=useDispatch();

  const form = useForm({
    defaultValues: {
      email: "",
      password:"",
      fullName:""
    },
  });

  const handleSubmit = (data) => {
    dispatch(register(data))
  };



  return (
    <div className="space-y-5">
        <h1>Register</h1>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-slate-700 py-5 px-5"
                    placeholder="Enter full name..."
                  />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
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
                    placeholder="Enter email ID"
                  />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-slate-700 py-5 px-5"
                    placeholder="Password"
                  />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />

         
            <Button type="submit" className="w-full mt-5">
              Register
            </Button>
  
        </form>
      </Form>
    </div>
  );
}

export default Register;
