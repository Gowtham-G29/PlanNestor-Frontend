import { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import { Button } from "../../components/ui/button";
import BgImage from "../../assets/LandImage.jpg";

function Auth({ setShowAuth }) {
  const [active, setActive] = useState(false);
  

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${BgImage})` }}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {active ? "Create Account" : "Welcome Back"}
        </h2>

        <div className="space-y-5">
          {active ? <Register /> : <Login />}
        </div>

        <div className="text-center">
          <span className="text-sm text-gray-600">
            {active ? "Already have an account?" : "Don't have an account?"}
          </span>
          <Button
            variant="ghost"
            className="ml-2 text-blue-600 hover:underline"
            onClick={() => setActive(!active)}
          >
            {active ? "Login" : "Register"}
          </Button>
        </div>

        {/* Back to Home Button */}
        <div className="text-center pt-4">
          <Button
            variant="outline"
            onClick={() => setShowAuth(false)}
            className="w-full"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
