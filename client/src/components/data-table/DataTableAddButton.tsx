import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import React from "react";

const DataTableAddButton = React.forwardRef((props, ref) => {
  return (
    <>
      <Button size="sm" className="ml-2 h-8 lg:flex border" ref={ref} {...props}>
        <Plus />
      </Button>
    </>
  );
});

export default DataTableAddButton;
