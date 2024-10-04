import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  LucideIcon,
  XCircle,
} from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


interface SearchIconProps {
  className: string
}

interface SearchPartProps {
  setFocusIndex: (focusIndex: number) => void
  focusIndex: number
  setHoverIndex: (hoverIndex: number) => void
  hoverIndex: number
  index: number
  placeholder: string
}

// SearchBar component
export default function SearchBar() {

    // State to manage searchbar outline
    const [focusIndex, setFocusIndex] = useState(0)
    const [hoverIndex, setHoverIndex] = useState(0)
    const numberOfSearchParts = ["Category", "Tag"]
    const index = 1
    return (
      <div className= {cn("relative overflow-hidden flex items-center w-auto rounded-full border-2 bg-background transition-all" ,
        focusIndex !== 0 ? "bg-gray-200/65" : "")} onBlur={ () => setFocusIndex(0)} >
          <div className={cn("bg-transparent flex items-center px-0 group relative overflow-hidden h-max", 
    focusIndex === 1 && hoverIndex === 2 ? 
    index === 1  ? "bg-gray-200/65" : index === 2 ? "bg-gray-200/65 rounded-r-full" : "" : focusIndex === 3 && hoverIndex === 2 ? index === 3  ? "bg-gray-200/65" : index === 2 ? "bg-gray-200/65 rounded-l-full" : "" : focusIndex === 2 && hoverIndex === 1 ? index === 1 ? "bg-gray-200/65" : index === 2 ? "bg-gray-200/65 rounded-r-full" : "" :
    focusIndex === 2 && hoverIndex === 3 ? index === 3 ? "bg-gray-200/65" : index === 2 ? "bg-gray-200/65 rounded-l-full" : "" : "" )}>
          <div className={cn("rounded-full focus-within:bg-background focus-within:shadow-sm h-11 flex items-center",focusIndex != index ? "hover:bg-gray-200/65" : "")}>
          <Input
                type="search" 
                className={cn("border-0 h-max focus-visible:outline-0 focus-visible:ring-transparent focus-visible:ring-offset-transparent bg-transparent" )}
                onFocus={() => {setFocusIndex(1) } }
                placeholder={"Name"}
                onBlur={() => setFocusIndex(0)}
                onMouseEnter={() => setHoverIndex(1)}
                onMouseLeave={() => setHoverIndex(0)}
              />
              </div>
              </div>
              {focusIndex == 0 && <div className="border-l border-gray-300 h-8" />}
        {numberOfSearchParts.map((value, index) => (
          <>
          <SearchPart setFocusIndex={setFocusIndex} focusIndex={focusIndex} index={index+2} placeholder={value} hoverIndex={hoverIndex} setHoverIndex={setHoverIndex}/>
          {index == 0 && focusIndex == 0 && <div className="border-l border-gray-300 h-8" />}
          </>
        )
          
        )}
        {focusIndex == 0 && <Button
  variant="default"
  size="default"
  //bg-[#ff585f] hover:bg-[#ff585f] hover:bg-gradient-to-r hover:from-[#ff111c] to hover:to-[#ff1151]
  className="absolute right-1 w-9 h-9 rounded-full px-2 py-0 transition duration-300"
  >
      <SearchIcon className="w-6 h-6"/>
        </Button>}
      </div>
    )
  }

  function SearchPart(SearchPartProps : SearchPartProps) {
    return(
    <div className={cn(" flex items-center px-0 relative overflow-hidden ", 
    SearchPartProps.focusIndex === 1 && SearchPartProps.hoverIndex === 2 ? 
    SearchPartProps.index === 1  ? "bg-gray-200/65" : SearchPartProps.index === 2 ? "bg-gray-200/65 rounded-r-full" : "" : SearchPartProps.focusIndex === 3 && SearchPartProps.hoverIndex === 2 ? SearchPartProps.index === 3  ? "bg-gray-200/65" : SearchPartProps.index === 2 ? "bg-gray-200/65 rounded-l-full" : "" : SearchPartProps.focusIndex === 2 && SearchPartProps.hoverIndex === 1 ? SearchPartProps.index === 1 ? "bg-gray-200/65" : SearchPartProps.index === 2 ? "bg-gray-200/65 rounded-r-full" : "" :
    SearchPartProps.focusIndex === 2 && SearchPartProps.hoverIndex === 3 ? SearchPartProps.index === 3 ? "bg-gray-200/65" : SearchPartProps.index === 2 ? "bg-gray-200/65 rounded-l-full" : "" : "" )}>
              <div className={cn("rounded-full focus-within:bg-background focus-within:shadow-sm h-11 flex items-center",SearchPartProps.focusIndex != SearchPartProps.index ? "hover:bg-gray-200/65" : SearchPartProps.focusIndex === SearchPartProps.index ? "bg-background shadow-sm" : "")}
    >
             <ComboboxPopover {...SearchPartProps} />
             </div>
      </div>
    )
  }
{/* <Input
                type="search" 
                placeholder={SearchPartProps.placeholder}
                className={cn("border-0 focus-visible:outline-0 focus-visible:ring-transparent focus-visible:ring-offset-transparent bg-transparent")}
                onFocus={() => {SearchPartProps.setFocusIndex(SearchPartProps.index) } }
                onBlur={() => SearchPartProps.setFocusIndex(0)}
                onMouseEnter={() => SearchPartProps.setHoverIndex(SearchPartProps.index)}
                onMouseLeave={() => SearchPartProps.setHoverIndex(0)}
              />   
// Magnifying glass icon */}
function SearchIcon(props : SearchIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

type Status = {
  value: string
  label: string
  icon: LucideIcon
}
 
const statuses: Status[] = [
  {
    value: "test1",
    label: "test1",
    icon: HelpCircle,
  },
  {
    value: "test2",
    label: "test2",
    icon: Circle,
  },
  {
    value: "test3",
    label: "test3",
    icon: ArrowUpCircle,
  },
  {
    value: "test4",
    label: "test4",
    icon: CheckCircle2,
  },
  {
    value: "test5",
    label: "test5",
    icon: XCircle,
  },
]

function ComboboxPopover(SearchPartProps: SearchPartProps) {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

  const handleTriggerClick = (value : string) => {
    if (selectedStatus === statuses.find((status) => status.value === value)) {
      setSelectedStatus(null);
    } else {
      setSelectedStatus(
        statuses.find((priority) => priority.value === value) ||
          null
      );
    }
  };

  if (!open && SearchPartProps.focusIndex === SearchPartProps.index) {
    SearchPartProps.setFocusIndex(0); // Reset focus when the popover closes
  } else if (open && SearchPartProps.focusIndex !== SearchPartProps.index) {
    SearchPartProps.setFocusIndex(SearchPartProps.index); // Set focus when the popover opens
  }
  return (
    <>
      <div className="flex items-start bg-transparent relative">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className={cn(
                "border-0 focus-visible:outline-0 focus-visible:ring-transparent focus-visible:ring-offset-transparent bg-transparent hover:bg-transparent flex justify-start items-center px-2 w-40 py-0 relative",
                selectedStatus
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-muted-foreground"
              )}
              onMouseEnter={() => SearchPartProps.setHoverIndex(SearchPartProps.index)}
              onMouseLeave={() => SearchPartProps.setHoverIndex(0)}
            >
              {selectedStatus ? (
                <>
                  <selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" />
                  {selectedStatus.label}
                </>
              ) : (
                <>{SearchPartProps.placeholder}</>
              )}
            </Button>
          </PopoverTrigger>
          {/* {selectedStatus && SearchPartProps.focusIndex == SearchPartProps.index &&(
            <button
              onClick={() => setSelectedStatus(null)}
              className="absolute right-0 bottom-0 -translate-x-[calc(50%-4px)] -translate-y-[calc(50%-4px)] p-1 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
              aria-label="Reset selection"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )} */}

          <PopoverContent
            className="p-0"
            side="bottom"
            align="start"
          >
            <Command>
              <CommandInput placeholder="Change status..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {statuses.map((status) => (
                    <CommandItem
                      key={status.value}
                      value={status.value}
                      onSelect={(value) => {
                        handleTriggerClick(value);
                
                        
                      }}
                    >
                      <status.icon
                        className={cn(
                          "mr-2 h-4 w-4",
                          status.value === selectedStatus?.value
                            ? "opacity-100"
                            : "opacity-40"
                        )}
                      />
                      <span>{status.label}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

