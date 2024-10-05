import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { useSideBarToggle } from "@/hooks/use-sidebar-toggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function FilterSideBar({ isOpen, sideBarItems }: { isOpen: boolean, sideBarItems: { title: string, content: React.ReactNode }[] }) {

  useStore(useSideBarToggle, (state: { isOpen: boolean }) => state.isOpen);

  return (
    <aside
      className={cn(
        "z-20 h-screen ease-in-out duration-300 border border-gray-400",
        isOpen === false ? "w-0 overflow-hidden" : "w-72"
      )}
    >
      {isOpen && (
        <Accordion
          type="multiple"
          className="w-full p-5"
          defaultValue={sideBarItems.map((item) => item.title)}
        >
          {sideBarItems.map((item) => (
            <AccordionItem key={item.title} value={item.title}>
              <AccordionTrigger className="ml-2 hover:no-underline">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="flex justify-center items-center">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </aside>
  );
}

export default FilterSideBar;
