import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { IoCloseOutline } from "react-icons/io5";
import { DateTimePickerSearchBar } from "./date-time-picker-search";
import GuestSelector from "./counter";
import { useGeneralSearchBarStore } from "@/stores/general-search-bar-store";
import { DualDatePickerSearchBar } from "./dual-range-date-picker-search";

interface SearchIconProps {
  className: string;
}
interface SearchPartHandler<T> {
  state: T[];
  setState: (value: T) => void;
}

export type genericHandler =
  | SearchPartHandler<string>
  | SearchPartHandler<Date>
  | SearchPartHandler<number>;

interface SearchPartProps {
  corner: number;
  setFocusIndex: (focusIndex: number) => void;
  focusIndex: number;
  setHoverIndex: (hoverIndex: number) => void;
  hoverIndex: number;
  index: number;
  placeholder_1: string;
  placeholder_2: string;
  values: string[];
  handler: SearchPartHandler<string>;
  onValueChange?: (value: string) => void;
}
interface SearchBar {
  onSearch?: (query: string) => void;
  searchPlaceHolder?: string;
  searchPartsPlaceholders?: string[];
  searchParts?: string[];
  searchPartsValues?: string[][];
  searchPartsTypes?: string[];
  searchPartsHandlers?: genericHandler[];
  searchPartsOnValueChange?: ((value: string) => void)[];
  inputBox?: boolean;
  onIconClick?: () => void;
}

// SearchBar component
export default function SearchBar({
  onSearch,
  searchPlaceHolder,
  searchPartsPlaceholders,
  searchParts,
  searchPartsTypes,
  searchPartsValues,
  searchPartsHandlers,
  searchPartsOnValueChange,
  inputBox = true,
  onIconClick,
}: SearchBar) {
  const { focusIndex, setFocusIndex, hoverIndex, setHoverIndex } = useGeneralSearchBarStore();

  const index = 1;
  console.log(focusIndex, hoverIndex);
  const popoverRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  let dualDatePickerFound = false;

useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (popoverRef.current && searchBarRef.current && (!searchBarRef.current.contains(e.target as Node) && !popoverRef.current.contains(e.target as Node))) {
      setFocusIndex(0);
      console.log("Popover Visible & I Pressed Outside");
    } else if (!popoverRef.current && searchBarRef.current && !searchBarRef.current.contains(e.target as Node)) {
      setFocusIndex(0);
      console.log("Popover Not Visible & I Pressed Outside");
    }
    console.log("I Clicked a Button");
  };

  document.addEventListener('click', handleClickOutside);

  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
}, []);
    let newIndex = 0;
  return (
    <div
      className={cn(
        "overflow-hidden flex items-center w-auto rounded-full border-2 bg-background transition-all h-[66px]",
        focusIndex !== 0 ? "bg-gray-300/65" : "",
      )}
      ref={searchBarRef}
    >
      <div
        className={cn(
          "bg-transparent flex items-center px-0 group relative overflow-hidden h-[66px]",
          focusIndex === 1 && hoverIndex === 2
            ? "bg-gray-300/65"
            : focusIndex === 2 && hoverIndex === 1
              ? "bg-gray-300/65"
              : "",
        )}
        onMouseEnter={() => setHoverIndex(1)}
        onMouseLeave={() => setHoverIndex(0)}
      >
        <div
          className={cn(
            "relative rounded-full focus-within:bg-background focus-within:shadow-sm flex items-center h-[66px]",
            focusIndex != index ? "hover:bg-gray-200/65" : "",
          )}
          onMouseEnter={() => setHoverIndex(1)}
          onMouseLeave={() => setHoverIndex(0)}
        >
          {inputBox && onSearch && (
            <Input
              type="search"
              className={cn(
                "border-0  focus-visible:outline-0 focus-visible:ring-transparent focus-visible:ring-offset-transparent bg-transparent h-[66px] ",
                searchParts ? "" : "w-[330px]",
              )}
              onFocus={() => {
                setFocusIndex(1);
              }}
              placeholder={searchPlaceHolder}
              //onBlur={() => setFocusIndex(0)}
              onChange={(e) => onSearch(e.target.value)}
            />
          )}
        </div>
      </div>
      {focusIndex == 0 && <div className="relative"><div className="border-l border-gray-300 h-8" /> </div>}
      {searchParts?.map((value, index) => (
        <>
          {searchPartsValues &&
            searchPartsHandlers &&
            searchPartsTypes &&
            (searchPartsTypes[index] === "dropdown" ? (
              (newIndex = index + (dualDatePickerFound ? 1 : 0)),
              (
              <SearchPart
                corner={searchParts.length}
                setFocusIndex={setFocusIndex}
                focusIndex={focusIndex}
                index={index + 1 + (inputBox ? 1 : 0) + (dualDatePickerFound ? 1 : 0)}
                placeholder_1={value}
                placeholder_2={searchPartsPlaceholders ? searchPartsPlaceholders[newIndex] : ""}
                hoverIndex={hoverIndex}
                setHoverIndex={setHoverIndex}
                values={searchPartsValues.length > 0 ? searchPartsValues[newIndex] : []}
                handler={searchPartsHandlers[newIndex] as SearchPartHandler<string>}
                onValueChange={
                  searchPartsOnValueChange && searchPartsOnValueChange.length >= newIndex
                    ? searchPartsOnValueChange[newIndex]
                    : undefined
                }
              />
              )
            ) : searchPartsTypes[index] === "date" ? (
              <DateTimePickerSearchBar
                index={index + 1 + (inputBox ? 1 : 0) + (dualDatePickerFound ? 1 : 0)}
                setFocusIndex={setFocusIndex}
                focusIndex={focusIndex}
                hoverIndex={hoverIndex}
                setHoverIndex={setHoverIndex}
                corner={searchParts.length}
                date={searchPartsHandlers[index].state[0] as Date}
                placeholder={searchPartsPlaceholders ? searchPartsPlaceholders[index] : ""}
                onDateChange={
                  searchPartsHandlers[index].setState as (date: Date | undefined) => void
                }
              />
            ) : searchPartsTypes[index] === "dualDate" ? (
              ((dualDatePickerFound = true),
              (
                <DualDatePickerSearchBar
                  index={index + 1 + (inputBox ? 1 : 0)}
                  setFocusIndex={setFocusIndex}
                  focusIndex={focusIndex}
                  hoverIndex={hoverIndex}
                  setHoverIndex={setHoverIndex}
                  corner={searchParts.length}
                  leftDate={searchPartsHandlers[index].state[0] as Date}
                  leftPlaceholder={searchPartsPlaceholders ? searchPartsPlaceholders[index] : ""}
                  onLeftDateChange={
                    searchPartsHandlers[index].setState as (date: Date | undefined) => void
                  }
                  rightDate={searchPartsHandlers[index + 1].state[0] as Date}
                  rightPlaceholder={searchPartsPlaceholders ? searchPartsPlaceholders[index + 1] : ""}
                  onRightDateChange={
                    searchPartsHandlers[index + 1].setState as (date: Date | undefined) => void
                  }
                  popoverRef={popoverRef}
                />
              ))
            ) : searchPartsTypes[index] === "stepper" ? (
              (newIndex = index + (dualDatePickerFound ? 1 : 0)),
              (
              <GuestSelector
                index={index + 1 + (inputBox ? 1 : 0) + (dualDatePickerFound ? 1 : 0)}
                setFocusIndex={setFocusIndex}
                focusIndex={focusIndex}
                hoverIndex={hoverIndex}
                setHoverIndex={setHoverIndex}
                corner={searchParts.length}
                adults={searchPartsHandlers[newIndex].state[0] as number}
                setAdults={searchPartsHandlers[newIndex].setState as (value: number) => void}
                children={searchPartsHandlers[newIndex + 1].state[0] as number}
                setChildren={searchPartsHandlers[newIndex + 1].setState as (value: number) => void}
                infants={searchPartsHandlers[newIndex + 2].state[0] as number}
                setInfants={searchPartsHandlers[newIndex + 2].setState as (value: number) => void}
                placeholder={searchPartsPlaceholders ? searchPartsPlaceholders[newIndex] : ""}
              />
              )
            ) : (
              ""
            ))}
          {focusIndex == 0 && <div className="relative"><div className="border-l border-gray-300 h-8" /> </div>}
        </>
      ))}
      {focusIndex == 0 && (
        <div className="relative flex justify-center items-center h-full">
        <Button
          variant="default"
          size="default"
          //bg-[#ff585f] hover:bg-[#ff585f] hover:bg-gradient-to-r hover:from-[#ff111c] to hover:to-[#ff1151]
          className=" bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] absolute right-1 w-10 h-10 rounded-full px-2 py-0 transition duration-300"
          onClick={onIconClick}
        >
          <SearchIcon className="w-7 h-7" />
        </Button>
        </div>
      )}
    </div>
  );
}

function SearchPart(SearchPartProps: SearchPartProps) {
  const { focusIndex, hoverIndex, corner, index } = SearchPartProps;
  return (
    <div
      className={cn(
        " flex items-center px-0 relative",
        focusIndex === 1 && hoverIndex === 2
          ? index === 1
            ? "bg-gray-300/65"
            : index === 2
              ? "bg-gray-300/65 rounded-r-full"
              : ""
          : focusIndex === corner && hoverIndex === (corner ? corner - 1 : 0 - 1)
            ? index === corner
              ? "bg-gray-300/65"
              : index === (corner ? corner - 1 : 0 - 1)
                ? "bg-gray-300/65 rounded-l-full"
                : ""
            : focusIndex != 0 &&
                focusIndex != 1 &&
                focusIndex != corner &&
                (hoverIndex ? hoverIndex : 0) - 1 === focusIndex
              ? index === hoverIndex
                ? "bg-gray-300/65 rounded-r-full"
                : index === focusIndex
                  ? "bg-gray-300/65 rounded-l-full"
                  : ""
              : focusIndex != 0 &&
                  focusIndex != 1 &&
                  focusIndex != corner &&
                  (hoverIndex ? hoverIndex : 0) + 1 === focusIndex
                ? index === hoverIndex
                  ? "bg-gray-300/65 rounded-l-full"
                  : index === focusIndex
                    ? "bg-gray-300/65 rounded-r-full"
                    : ""
                : "",
      )}
    >
      <div
        className={cn(
          "rounded-full focus-within:bg-background focus-within:shadow-sm h-[66px] flex items-center",
          focusIndex != index
            ? hoverIndex == index &&
              (index == focusIndex! - 1 || (index == focusIndex! + 1 && index != 1))
              ? ""
              : "hover:bg-gray-300/65"
            : focusIndex === index
              ? "bg-background shadow-[0_0_12px_0_rgba(0,0,0,0.20)]"
              : "",
        )}
      >
        <ComboboxPopover {...SearchPartProps} />
      </div>
    </div>
  );
}
function SearchIcon(props: SearchIconProps) {
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
  );
}

function ComboboxPopover(SearchPartProps: SearchPartProps) {
  const [open, setOpen] = useState(false);

  // if (!open && SearchPartProps.focusIndex === SearchPartProps.index) {
  //   SearchPartProps.setFocusIndex(0); // Reset focus when the popover closes
  if (open && SearchPartProps.focusIndex !== SearchPartProps.index) {
    SearchPartProps.setFocusIndex(SearchPartProps.index); // Set focus when the popover opens
  }
  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    SearchPartProps.handler.setState("");
  };

  useEffect(() => {
    if (SearchPartProps.focusIndex === SearchPartProps.index) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [SearchPartProps.focusIndex, SearchPartProps.index]);

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
                SearchPartProps.handler.state.length > 0
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-muted-foreground",
              )}
              onMouseEnter={() => SearchPartProps.setHoverIndex(SearchPartProps.index)}
              onMouseLeave={() => SearchPartProps.setHoverIndex(0)}
              onMouseDown={(e) => e.preventDefault()}
            >
              <div className="flex flex-col w-[100%] text-left pl-2">
                <span className="text-black text-sm">{SearchPartProps.placeholder_1}</span>
                <span
                  className={
                    SearchPartProps.handler.state.length > 0
                      ? "text-black text-xs"
                      : "text-gray-500 text-xs"
                  }
                >
                  {SearchPartProps.handler.state.length === 0
                    ? SearchPartProps.placeholder_2
                    : SearchPartProps.handler.state.join(", ").length < 18
                      ? SearchPartProps.handler.state.join(", ")
                      : SearchPartProps.handler.state.join(", ").substring(0, 17).concat("...")}
                </span>
              </div>
              {SearchPartProps.handler.state.length > 0 &&
                SearchPartProps.index == SearchPartProps.focusIndex && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black rounded-md hover:rounded-full text-lg transition-all duration-300 hover:bg-gray-300 w-6 h-6 flex items-center justify-center"
                    onClick={handleClear}
                  >
                    <IoCloseOutline />
                  </Button>
                )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" side="bottom" align="start">
            <Command>
              <CommandInput
                placeholder="Change status..."
                onValueChange={SearchPartProps.onValueChange}
              />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {SearchPartProps.values.length != 0 &&
                    SearchPartProps.values.map((status: any) => (
                      <CommandItem
                        key={status}
                        value={status}
                        onSelect={(value) => {
                          SearchPartProps.handler.setState(value);
                        }}
                      >
                        <span
                          className={
                            SearchPartProps.handler.state.includes(status) ? "font-bold" : ""
                          }
                        >
                          {SearchPartProps.handler.state.includes(status) ? "✓ " : ""}
                          {status}
                        </span>
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
