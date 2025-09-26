import { cn } from "@/lib/utils";
import { useSideBarToggleStore } from "@/stores/side-bar-toggle-store";
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

  return (
    <aside
      className={cn(
        "z-10 ease-in-out duration-300",
        isOpen
          ? "w-full lg:w-80 xl:w-96 overflow-y-auto h-[80vh] lg:h-[90vh] border-b lg:border-r lg:border-b-0 border-gray-500 bg-white"
          : "w-0 h-0 lg:h-auto overflow-hidden"
      )}
    >
      {isOpen && (
        <>
          <div className="m-4">
            <div className="flex justify-center items-center">
              {firstItem.content}
            </div>
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
                <AccordionContent className="flex justify-center items-center relative overflow-visible">
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
