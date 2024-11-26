import { cn } from "@/lib/utils";
import { useSideBarToggleStore } from "@/stores/side-bar-toggle-store";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function FilterSideBar({
  sideBarItems,
}: {
  sideBarItems: { title: string; content: React.ReactNode }[];
}) {
  const { isOpen } = useSideBarToggleStore();
  const [firstItem, ...restItems] = sideBarItems;
  const [heightClass, setHeightClass] = useState("h-[80vh]");

  useEffect(() => {
    const updateHeightClass = () => {
      if (window.innerHeight >= 900) {
        setHeightClass("h-[90vh]");
      } else {
        setHeightClass("h-[80vh]");
      }
    };

    updateHeightClass();
    window.addEventListener("resize", updateHeightClass);
    return () => window.removeEventListener("resize", updateHeightClass);
  }, []);

  return (
    <aside
      className={cn(
        "z-10 ease-in-out duration-300 ",
        isOpen
          ? `w-[50vh] overflow-y-scroll ${heightClass} border-r border-gray-500`
          : "w-0 overflow-hidden",
      )}
    >
      {isOpen && (
        <>
          <div className="m-4">
            <div className="flex justify-center items-center">{firstItem.content}</div>
          </div>

          <Accordion
            type="multiple"
            className="w-full p-3"
            defaultValue={restItems.map((item) => item.title)}
          >
            {restItems.map((item) => (
              <AccordionItem key={item.title} value={item.title}>
                <AccordionTrigger className="ml-2 hover:no-underline">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="flex justify-center items-center  relative overflow-visible !overflow-visible">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      )}
    </aside>
  );
}

export default FilterSideBar;
