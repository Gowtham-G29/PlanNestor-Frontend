import {
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { ScrollArea } from "../../components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useEffect, useState } from "react";
import ProjectCard from "../Project/ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, searchProjects } from "../../Redux/Project/Action";
import BgImage from "../../assets/LandImage.jpg";

const tags = [
  "All",
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

const categoryOptions = ["All", "fullstack", "frontend", "backend"];

function ProjectList() {
  const { project, auth } = useSelector((store) => store);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects({}));
  }, [auth.jwt]);

  const [filters, setFilters] = useState({ category: "", tag: "" });

  const handleFilterChange = (filterType, value) => {
    const updatedFilters = {
      ...filters,
      [filterType]: value === "All" ? "" : value,
    };

    setFilters(updatedFilters);
    dispatch(fetchProjects(updatedFilters));
  };

  const handleSerchChange = (e) => {
    const searchValue = e.target.value;
    "Search value:", searchValue;
    dispatch(searchProjects(searchValue));
  };

  return (
    <div
      className="flex gap-3 justify-start px-5 py-0 h-[90vh]"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      <section className=" fixed top-20 h-[88vh] z-10 hidden lg:block">
        <Card className="px-6 w-[18rem] bg-white/80 backdrop-blur-md border border-violet-100 shadow-md">
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold text-slate-800">Filters</p>
            <Button variant="ghost" size="icon">
              <MixerHorizontalIcon className="size-5 text-violet-500" />
            </Button>
          </div>

          <CardContent className="mt-5">
            <ScrollArea className="space-y-7 h-[70vh] pr-3">
              {/* Category */}
              <div>
                <h1 className="pb-3 text-slate-700 font-medium border-b">
                  Category
                </h1>
                <div className="pt-5">
                  <RadioGroup
                    defaultValue="All"
                    className="space-y-3"
                    onValueChange={(value) =>
                      handleFilterChange("category", value)
                    }
                  >
                    {categoryOptions.map((option) => (
                      <div key={option} className="flex items-center gap-2">
                        <RadioGroupItem value={option} id={option} />
                        <Label
                          htmlFor={option}
                          className="text-slate-700 cursor-pointer"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>

              {/* Tags */}
              <div className="pt-9">
                <h1 className="pb-3 text-slate-700 font-medium border-b">
                  Tags
                </h1>
                <div className="pt-5">
                  <RadioGroup
                    defaultValue="All"
                    className="space-y-3"
                    onValueChange={(value) => handleFilterChange("tag", value)}
                  >
                    {tags.map((tag) => (
                      <div key={tag} className="flex items-center gap-2">
                        <RadioGroupItem value={tag} id={tag} />
                        <Label
                          htmlFor={tag}
                          className="text-slate-700 cursor-pointer"
                        >
                          {tag}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </section>

      {/* Project List Section */}
      <section className="flex-1 fixed top-20 right-0 h-[88vh] z-0 w-[75rem] hidden lg:block">
        <div className="flex flex-col h-full w-full overflow-y-auto bg-white/80  border border-slate-100 rounded-md shadow-sm px-4 py-5 space-y-5">
          {/* Sticky Search Bar */}
          <div className="sticky top-0 z-10 pb-4 backdrop-blur-sm">
            <div className="relative">
              <Input
                onChange={handleSerchChange}
                placeholder="Search projects by name"
                className="w-full border-slate-800 focus:ring-violet-400"
              />
              <MagnifyingGlassIcon className="absolute top-1/2 right-3 -translate-y-1/2 size-5 text-violet-500" />
            </div>
          </div>

          {/* Scrollable Project Cards */}
          <div className="flex flex-col items-center justify-center space-y-5 pb-10">
            {project.searchProjects.length > 0
              ? project.searchProjects.map((item) => (
                  <ProjectCard key={item} item={item} />
                ))
              : project.projects?.map((item) => (
                  <ProjectCard key={item} item={item} />
                ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProjectList;
