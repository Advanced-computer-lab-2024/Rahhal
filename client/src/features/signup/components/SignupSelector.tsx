import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SignupTourist from "./SignupTourist";
import SignupTourGuide from "./SignupTourGuide";
import SignupAdvertiser from "./SignupAdvertiser";
import SignupSeller from "./SignupSeller";

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

  const handleRoleSelect = (role: { name: string; component: React.ComponentType }) => {
    setSelectedRole(role);
  };

  const handleBack = () => {
    setSelectedRole(null);
  };

  if (selectedRole) {
    const SelectedComponent = selectedRole.component;
    return <SelectedComponent onBack={handleBack} />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="flex items-center justify-center">
          <CardTitle>Sign Up As</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          {roles.map((role) => (
            <Button key={role.name} onClick={() => handleRoleSelect(role)} className="w-full">
              {role.name}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupSelector;
