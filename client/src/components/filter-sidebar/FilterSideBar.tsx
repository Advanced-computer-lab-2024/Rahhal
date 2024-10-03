import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { useSideBarToggle } from "@/hooks/use-sidebar-toggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MinMaxRangeSlider from "./MinMaxRangeSlider";
import { useState } from "react";
import { DatePickerWithRange } from "./DatePickerWithRange";

// interface FilterSideBarProps {
//     sideBarItems: {title: string, content: JSX.Element}[]
// }

function FilterSideBar() {
  const [value, setValue] = useState([0, 100]);
  const sideBarItems = [
    {
      title: "Price",
      content: <MinMaxRangeSlider values={value} onValueChange={setValue} />,
    },
    {
      title: "Date",
      content: <DatePickerWithRange />,
    },
  ];

  const isOpen = useStore(useSideBarToggle, (state) => state.isOpen);
  return (
    <aside
      className={cn(
        "z-20 h-screen ease-in-out duration-300 border border-gray-400",
        isOpen === false ? "w-0" : "w-72",
      )}
    >
      <Accordion type="multiple" className="w-full">
        {sideBarItems.map((item) => (
          <AccordionItem value={item.title}>
            <AccordionTrigger className="ml-2 hover:no-underline">{item.title}</AccordionTrigger>
            <AccordionContent className=" flex justify-center items-center">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  );
}
export default FilterSideBar;
