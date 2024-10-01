import { Switch } from "@/components/ui/switch"
import {

  CardContent,
} from "@/components/ui/card"

import React from "react"



interface SwitchCardProps {
  title: string
  description: string
  icon: React.ReactNode
}
export const SwitchCard = ({ title, description, icon }: SwitchCardProps) => {
  return (
    
    
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
              {icon}
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {title}
                </p>
                <p className="text-sm text-muted-foreground">
                {description}
            </p>
          </div>
          <Switch />
        </div>
        </CardContent>
        
      
    
    
  
  )

}