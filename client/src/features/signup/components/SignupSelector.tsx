import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SignupTourist from "./SignupTourist";
import SignupTourGuide from "./SignupTourGuide";
import SignupAdvertiser from "./SignupAdvertiser";
import SignupSeller from "./SignupSeller";
import { Link } from "react-router-dom";
import PrimaryLogo from "@/features/logos/PrimaryLogo";
import { HomeIcon } from "lucide-react";

const roles: { name: string; component: React.ComponentType<{ isSubmitting: boolean; setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>> }> }[] = [
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        <Link className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 flex items-center" to={"/"}>
          <HomeIcon className="h-6 w-6 mr-2" />
          <span className="ml-2 text-lg hover:underline">Home</span>
        </Link>
        <div
          className={`
            mb-8 transform transition-all duration-500 ease-in-out
          `}
        >
           <svg
          style={{marginLeft: '100px' , marginTop: '-50px'}}
          width="300"
          height="276"
          viewBox="0 0 300 276"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <PrimaryLogo />
        </svg>
        </div>

        <Card
          className={`
            w-full max-w-md transform transition-all duration-500 ease-in-out
            ${selectedRole ? "scale-95" : "scale-100"}
          `}
          style={{marginTop: '-50px'}}
        >
          <CardHeader className="flex items-center justify-center">
            <CardTitle>Sign Up As</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4 shadow-2xl">
            {roles.map((role) => (
              <Button
                key={role.name}
                onClick={() => handleRoleSelect(role)}
                className={`
                  w-full transition-all duration-300 
                  ${selectedRole?.name === role.name ? "bg-primary/10 border-2 shadow-lg" : "shadow"}
                `}
                variant={selectedRole?.name === role.name ? "secondary" : "default"}
                style={{
                  
                  backgroundColor: selectedRole?.name === role.name ? "#FFFFFF" : "#E1BC6D" ,
                  borderColor: selectedRole?.name === role.name ? "#E1BC6D" : "transparent",
                }}
                disabled  = {isSubmitting}
              >
                {role.name}
              </Button>
            ))}
            <div className="mt-4 text-center text-sm">
              {"    "} Already have an Account?{" "}
              <Link className="text-blue-600 hover:underline ml-1" to={"/signin"} >
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
            {React.createElement(selectedRole.component , {
              isSubmitting ,
              setIsSubmitting,
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SignupSelector;
