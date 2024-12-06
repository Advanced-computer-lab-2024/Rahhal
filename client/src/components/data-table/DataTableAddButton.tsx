import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import React from "react";

interface DataTableAddButtonProps {
  className?: string;
}


const DataTableAddButton = React.forwardRef<HTMLButtonElement, DataTableAddButtonProps>(({ className, ...props }, ref) => {
  return (
    <>
      <Button size="sm" className={`ml-2 h-8 lg:flex border ${className}`} ref={ref} {...props}>
      <Plus />
      </Button>
    </>
  );
});

export default DataTableAddButton;
