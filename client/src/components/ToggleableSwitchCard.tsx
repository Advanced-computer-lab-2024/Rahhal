import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";

import React from "react";

interface ToggleableSwitchCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  switchState: boolean;
  onToggle: () => void;
}
export const ToggleableSwitchCard = ({
  title,
  description,
  icon,
  switchState,
  onToggle,
}: ToggleableSwitchCardProps) => {
  return (
    <Card className="grid gap-4">
      <div className=" flex items-center space-x-4 rounded-md border p-4">
        {icon}
        <div className="flex-1 space-y-1">
          <p className="text-sm text-left font-medium leading-none">{title}</p>
          <p className="text-sm text-left text-muted-foreground">{description}</p>
        </div>
        <Switch checked={switchState} onCheckedChange={onToggle} />
      </div>
    </Card>
  );
};
