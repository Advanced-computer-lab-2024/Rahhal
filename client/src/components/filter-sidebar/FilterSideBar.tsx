import { cn } from "@/lib/utils";
import { useSideBarToggle } from "@/global-states/use-sidebar-toggle";
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
  const { isOpen } = useSideBarToggle();
  const [firstItem, ...restItems] = sideBarItems;

  return (
    <aside
      className={cn(
        "z-10 h-screen ease-in-out duration-300 border border-r-gray-400",
        isOpen ? "w-[50vh] overflow-y-scroll h-[80vh]" : "w-0 overflow-hidden",
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
                <AccordionContent className="flex justify-center items-center mt-7">
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
