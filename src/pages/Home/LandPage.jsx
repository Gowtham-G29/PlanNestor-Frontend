import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { RocketIcon } from "lucide-react";

import LandImage from "../../assets/LandImage.jpg";
import Auth from "../AuthPages/Auth";
import { useState } from "react";

export default function LandingPage() {
  const [showAuth, setShowAuth] = useState(false);

  if (showAuth) {
    return <Auth setShowAuth={setShowAuth} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-violet-50 text-gray-900">
      <header className="flex justify-between items-center px-6 py-4 shadow-sm bg-white">
        <h1 className="text-3xl font-bold text-violet-600 font-serif">PlanNestor</h1>
        <nav className="flex items-center space-x-6 text-sm text-gray-700">
          <a href="#features" className="hover:text-violet-500">Features</a>
          <a href="#contact" className="hover:text-violet-500">Contact</a>
          <Button onClick={() => setShowAuth(true)} variant="outline" className="border-violet-500 text-violet-600 hover:bg-violet-100">
            Login/Register
          </Button>
        </nav>
      </header>

      <section className="flex flex-col-reverse md:flex-row items-center px-8 py-16 md:py-24 gap-10 flex-1">
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-violet-800">
            Manage Your Projects Smarter, Not Harder.
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Plan, collaborate, and deliver with a powerful, easy-to-use platform
            designed for productivity and success.
          </p>
          <div className="flex space-x-4">
            <Button
              onClick={() => setShowAuth(true)}
              className="bg-violet-600 text-white hover:bg-violet-700"
            >
              <RocketIcon className="w-4 h-4 mr-2" />
              Get Started
            </Button>
            <Button variant="outline" className="border-violet-500 text-violet-600 hover:bg-violet-100">
              Learn More
            </Button>
          </div>
        </div>

        <div className="flex-1">
          <AspectRatio ratio={16 / 9}>
            <img
              src={LandImage}
              alt="Team working on project"
              className="rounded-xl object-cover h-full w-full"
            />
          </AspectRatio>
        </div>
      </section>

      <section id="features" className="px-8 py-20 bg-white text-center">
        <h3 className="text-3xl font-bold mb-6 text-violet-800">
          Why Choose PlanNestor?
        </h3>
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "Task Management",
              desc: "Create, assign, and track tasks with ease.",
            },
            {
              title: "Team Collaboration",
              desc: "Seamless communication and real-time updates.",
            },
          ].map(({ title, desc }) => (
            <div key={title} className="bg-violet-50 shadow-md rounded-xl p-6 flex-1 border border-violet-100">
              <h4 className="text-xl font-semibold mb-2 text-violet-700">{title}</h4>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-6 px-8 text-sm text-gray-600 text-center border-t bg-violet-50">
        &copy; {new Date().getFullYear()} <span className="text-violet-600 font-semibold">PlanNestor</span>. All rights reserved.
      </footer>
    </div>
  );
}
