import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SignupTourist from "./SignupTourist";
import SignupTourGuide from "./SignupTourGuide";
import SignupAdvertiser from "./SignupAdvertiser";
import SignupSeller from "./SignupSeller";
import logo from "@/assets/Logo.png";
import { Link } from "react-router-dom";

const roles = [
  { name: "Tourist", component: SignupTourist },
  { name: "Tour Guide", component: SignupTourGuide },
  { name: "Advertiser", component: SignupAdvertiser },
  { name: "Seller", component: SignupSeller },
];

const SignupSelector = () => {
  const [selectedRole, setSelectedRole] = useState<{
    name: string;
    component: React.ComponentType;
  } | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleRoleSelect = (role: { name: string; component: React.ComponentType }) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedRole(role);
    }, 300);
  };

  return (
    <div className="relative flex min-h-screen bg-gray-100 overflow-hidden">
      <div
        className={`
          flex flex-col items-center justify-center
          transition-all duration-500 ease-in-out
          ${selectedRole ? "w-1/2 p-8" : "w-full p-8"}
          ${isAnimating ? "translate-x-0" : ""}
        `}
      >
        <div
          className={`
            mb-8 transform transition-all duration-500 ease-in-out
          `}
        >
          <img src={logo} alt="Website Logo" className="h-200 w-80" />
        </div>

        <Card
          className={`
            w-full max-w-md transform transition-all duration-500 ease-in-out
            ${selectedRole ? "scale-95" : "scale-100"}
          `}
        >
          <CardHeader className="flex items-center justify-center">
            <CardTitle>Sign Up As</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            {roles.map((role) => (
              <Button
                key={role.name}
                onClick={() => handleRoleSelect(role)}
                className={`
                  w-full transition-all duration-300 
                  ${selectedRole?.name === role.name ? "bg-primary/10" : ""}
                `}
                variant={selectedRole?.name === role.name ? "secondary" : "default"}
                style={{ backgroundColor: selectedRole?.name === role.name ? "" : "#E1BC6D" }}
              >
                {role.name}
              </Button>
            ))}
            <div className="mt-4 text-center text-sm">
              {"    "} Already have an Account?{" "}
              <Link className="underline" to={"/signin"}>
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div
        className={`
          fixed top-0 right-0 h-full bg-white
          transition-all duration-500 ease-in-out transform h-full p-6
          ${selectedRole ? "w-1/2 translate-x-0" : "w-1/2 translate-x-full"}
        `}
      >
        {selectedRole ? (
          <div className="h-full flex flex-col opacity-100 transition-opacity duration-300 delay-300">
            {React.createElement(selectedRole.component)}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SignupSelector;
