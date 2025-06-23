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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";
import { createProjects } from "../../Redux/Project/Action";

const tags = [
  "react",
  "redux",
  "react-query",
  "nextjs",
  "nodejs",
  "expressjs",
  "mongodb",
  "mysql",
  "javascript",
  "typescript",
  "css",
  "html",
  "springboot",
  "java",
  "python",
  "django",
  "flask",
  "graphql",
  "restapi",
  "tailwindcss",
  "bootstrap",
  "material-ui",
  "ant-design",
  "chakra-ui",
  "git",
  "github",
  "gitlab",
  "docker",
  "kubernetes",
  "aws",
  "azure",
  "gcp",
  "heroku",
  "vercel",
  "netlify",
  "firebase",
  "postman",
  "jest",
  "cypress",
  "mocha",
  "chai",
  "enzyme",
  "testing-library",
  "eslint",
  "prettier",
  "webpack",
  "babel",
  "vite",
  "rollup",
  "parcel",
  "sass",
  "less",
  "stylus",
  "angular",
  "vue",
  "svelte",
  "nuxtjs",
  "gatsby",
  "remix",
  "solidjs",
  "astro",
  "eleventy",
  "11ty",
  "gridsome",
  "hugo",
  "jekyll",
  "pelican",
  "hexo",
];

function CreateProjectForm() {
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      tags: [],
      status: "pending",
    },
  });

  const onSubmit = (data) => {
    "Create project Data:", data;
    dispatch(createProjects(data));
  };

  const handleTagsChange = (newValue) => {
    const currentTags = form.getValues("tags");
    if (currentTags.includes(newValue)) {
      // If the tag is already selected, remove it
      const updatedTags = currentTags.filter((tag) => tag !== newValue);
      form.setValue("tags", updatedTags);
    } else {
      // If the tag is not selected, add it
      const updatedTags = [...currentTags, newValue];
      form.setValue("tags", updatedTags);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-slate-700 py-5 px-5"
                    placeholder="project name...."
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
                    placeholder="project description...."
                  />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    defaultValues="fullstack"
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="border w-full border-slate-700 py-5 px-5">
                      <SelectValue placeholder="category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fullstack">Full Stack</SelectItem>
                      <SelectItem value="frontend">Front End</SelectItem>
                      <SelectItem value="backend">Back End</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    //   value={field.value}
                    onValueChange={(value) => handleTagsChange(value)}
                  >
                    <SelectTrigger className="border w-full border-black py-5 px-5">
                      <SelectValue
                        className="text-slate-700 "
                        placeholder="Select tags"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {tags.map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <div className="flex flex-wrap gap-2 mt-2">
                  {field.value.map((item) => (
                    <div
                      key={item}
                      onClick={() => handleTagsChange(item)}
                      className="cursor-pointer flex items-center gap-1 bg-violet-100 px-2 py-1 rounded-md text-sm border border-violet-300"
                    >
                      <span className="text-slate-700 font-bold">{item}</span>
                      <Cross2Icon />
                    </div>
                  ))}
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <DialogClose>
            {false ? (
              <div>
                <p>
                  You can create only 3 projects with free plan. Please upgrade
                  to create more projects.
                </p>
              </div>
            ) : (
              <Button type="submit" className="w-full mt-5">
                Create Project
              </Button>
            )}
          </DialogClose>
        </form>
      </Form>
    </div>
  );
}

export default CreateProjectForm;
