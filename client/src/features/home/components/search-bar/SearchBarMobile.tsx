import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { X, Search } from "lucide-react";
import { DateTimePickerMobile } from "./MobileDateTimePicker";
import { GuestSelectorMobile } from "./MobileGuestSelector";
import { DropdownSelectorMobile } from "./MobileDropdownSelector";
import { genericHandler } from "./SearchBar";

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
  displayHours?: boolean;
}

interface SearchPartHandler<T> {
  state: T[];
  setState: (value: T) => void;
}

export function MobileSearchBar({
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
  displayHours,
}: SearchBar) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Get display values for the collapsed search bar
  const getDisplayValue = () => {
    const parts: string[] = [];
    let dualDateFound = false;
    if (searchParts && searchPartsHandlers) {
      searchParts.forEach((part, index) => {
        if (!searchPartsTypes || !searchPartsHandlers) return;

        const adjustedIndex = index + (dualDateFound ? 1 : 0);

        if (searchPartsTypes[index] === "dropdown") {
          const handler = searchPartsHandlers[
            adjustedIndex
          ] as SearchPartHandler<string>;
          if (handler.state.length > 0) {
            parts.push(handler.state.join(", "));
          }
        } else if (searchPartsTypes[index] === "date") {
          const handler = searchPartsHandlers[index] as SearchPartHandler<Date>;
          if (handler.state[0]) {
            parts.push(handler.state[0].toLocaleDateString());
          }
        } else if (searchPartsTypes[index] === "dualDate") {
          dualDateFound = true;
          const leftHandler = searchPartsHandlers[
            index
          ] as SearchPartHandler<Date>;
          const rightHandler = searchPartsHandlers[
            index + 1
          ] as SearchPartHandler<Date>;

          // For mobile, we still show the date range but it's handled by two separate pickers
          if (leftHandler.state[0] && rightHandler.state[0]) {
            parts.push(
              `${leftHandler.state[0].toLocaleDateString()} - ${rightHandler.state[0].toLocaleDateString()}`
            );
          } else if (leftHandler.state[0]) {
            parts.push(`${leftHandler.state[0].toLocaleDateString()}`);
          } else if (rightHandler.state[0]) {
            parts.push(`${rightHandler.state[0].toLocaleDateString()}`);
          }
        } else if (searchPartsTypes[index] === "stepper") {
          const adultsHandler = searchPartsHandlers[
            adjustedIndex
          ] as SearchPartHandler<number>;
          const childrenHandler = searchPartsHandlers[
            adjustedIndex + 1
          ] as SearchPartHandler<number>;
          const infantsHandler = searchPartsHandlers[
            adjustedIndex + 2
          ] as SearchPartHandler<number>;
          const total =
            (adultsHandler.state[0] || 0) +
            (childrenHandler.state[0] || 0) +
            (infantsHandler.state[0] || 0);
          if (total > 0) {
            parts.push(`${total} guest${total === 1 ? "" : "s"}`);
          }
        }
      });
    }

    /*
    Some complicated logic is implemented by Claude here to view the things that user searched
    for when the search sheet is closed. However, it makes it looks ugly when the user search using many
    things. So I well keep using this technique to indicate if the user searched using anything but I will just
    show the message "Edit your search"
    */
    return parts.length > 0 || searchValue
      ? "Edit your search"
      : searchPlaceHolder || "Search";
  };

  const handleSearch = () => {
    onIconClick?.();
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden">
      {/* Collapsed Search Bar */}
      <div
        className="flex items-center w-full h-12 bg-white rounded-full shadow-md border border-gray-200 px-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Search className="w-5 h-5 text-gray-600 mr-3" />
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-900 truncate">
            {getDisplayValue()}
          </div>
        </div>
      </div>

      {/* Mobile Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="p-2"
            >
              <X className="w-5 h-5" />
            </Button>
            <h2 className="text-lg font-semibold">Search</h2>
            <div className="w-9" /> {/* Spacer for centering */}
          </div>

          {/* Content */}
          <div className="flex flex-col h-full pb-20">
            <div className="flex-1 overflow-y-auto">
              {/* Search Input */}
              {inputBox && onSearch && (
                <div className="p-4 border-b border-gray-100">
                  <div className="relative">
                    <Input
                      type="search"
                      placeholder={searchPlaceHolder || "Search destinations"}
                      value={searchValue}
                      onChange={(e) => {
                        setSearchValue(e.target.value);
                        onSearch(e.target.value);
                      }}
                      className="pl-10 h-12 rounded-xl border-gray-200"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              )}

              {/* Search Parts */}
              {searchParts?.map((part, index) => {
                if (
                  !searchPartsTypes ||
                  !searchPartsHandlers ||
                  !searchPartsPlaceholders
                )
                  return null;

                let dualDatePickerFound = false;
                let adjustedIndex = index;

                // Calculate adjusted index for handlers
                for (let i = 0; i < index; i++) {
                  if (searchPartsTypes[i] === "dualDate") {
                    dualDatePickerFound = true;
                    break;
                  }
                }
                adjustedIndex = index + (dualDatePickerFound ? 1 : 0);

                return (
                  <div key={index} className="border-b border-gray-100">
                    {searchPartsTypes[index] === "dropdown" && (
                      <DropdownSelectorMobile
                        title={searchParts[index]}
                        placeholder={searchPartsPlaceholders[adjustedIndex]}
                        values={searchPartsValues?.[adjustedIndex] || []}
                        handler={
                          searchPartsHandlers[
                            adjustedIndex
                          ] as SearchPartHandler<string>
                        }
                        onValueChange={
                          searchPartsOnValueChange?.[adjustedIndex]
                        }
                      />
                    )}

                    {searchPartsTypes[index] === "date" && (
                      <DateTimePickerMobile
                        title={searchParts[index]}
                        placeholder={searchPartsPlaceholders[index]}
                        date={searchPartsHandlers[index].state[0] as Date}
                        onDateChange={
                          searchPartsHandlers[index].setState as (
                            date: Date | undefined
                          ) => void
                        }
                      />
                    )}

                    {searchPartsTypes[index] === "dualDate" && (
                      <>
                        {/* Split dualDate into two separate date pickers for mobile */}
                        <DateTimePickerMobile
                          title={searchPartsPlaceholders[index] || "Start Date"}
                          placeholder={searchPartsPlaceholders[index] || "Select start date"}
                          date={searchPartsHandlers[index].state[0] as Date}
                          onDateChange={
                            searchPartsHandlers[index].setState as (
                              date: Date | undefined
                            ) => void
                          }
                        />
                        <DateTimePickerMobile
                          title={searchPartsPlaceholders[index + 1] || "End Date"}
                          placeholder={searchPartsPlaceholders[index + 1] || "Select end date"}
                          date={searchPartsHandlers[index + 1].state[0] as Date}
                          onDateChange={
                            searchPartsHandlers[index + 1].setState as (
                              date: Date | undefined
                            ) => void
                          }
                        />
                      </>
                    )}

                    {searchPartsTypes[index] === "stepper" && (
                      <GuestSelectorMobile
                        title={searchParts[index]}
                        placeholder={searchPartsPlaceholders[adjustedIndex]}
                        adults={
                          searchPartsHandlers[adjustedIndex].state[0] as number
                        }
                        setAdults={
                          searchPartsHandlers[adjustedIndex].setState as (
                            value: number
                          ) => void
                        }
                        children={
                          searchPartsHandlers[adjustedIndex + 1]
                            .state[0] as number
                        }
                        setChildren={
                          searchPartsHandlers[adjustedIndex + 1].setState as (
                            value: number
                          ) => void
                        }
                        infants={
                          searchPartsHandlers[adjustedIndex + 2]
                            .state[0] as number
                        }
                        setInfants={
                          searchPartsHandlers[adjustedIndex + 2].setState as (
                            value: number
                          ) => void
                        }
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Search Button */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <Button
                onClick={handleSearch}
                className="w-full h-12 bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] text-white rounded-xl font-medium"
              >
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
