import { ChevronRight, Check, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SearchPartHandler<T> {
  state: T[];
  setState: (value: T) => void;
}

interface DropdownSelectorMobileProps {
  title: string;
  placeholder: string;
  values: string[];
  handler: SearchPartHandler<string>;
  onValueChange?: (value: string) => void;
}

export function DropdownSelectorMobile({
  title,
  placeholder,
  values,
  handler,
  onValueChange,
}: DropdownSelectorMobileProps) {
  const [showSelector, setShowSelector] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const filteredValues = values.filter((value) =>
    value.toLowerCase().includes(searchValue.toLowerCase())
  );

  const getDisplayText = () => {
    if (handler.state.length === 0) {
      return placeholder;
    }

    const displayText = handler.state.join(", ");
    return displayText.length > 30
      ? `${displayText.substring(0, 30)}...`
      : displayText;
  };

  const handleSelect = (value: string) => {
    handler.setState(value);
    onValueChange?.(value);
  };

  const handleClear = () => {
    handler.setState("");
  };

  if (showSelector) {
    return (
      <div className="bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSelector(false)}
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
          </Button>
          <h3 className="font-medium">{title}</h3>
          {handler.state.length > 0 && (
            <Button variant="ghost" size="sm" onClick={handleClear}>
              Clear
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-100">
          <Input
            type="search"
            placeholder={`Search ${title.toLowerCase()}...`}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              onValueChange?.(e.target.value);
            }}
            className="h-12 rounded-xl"
          />
        </div>

        {/* Options */}
        <div className="flex-1">
          {filteredValues.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No results found
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredValues.map((value, index) => {
                const isSelected = handler.state.includes(value);
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleSelect(value)}
                  >
                    <div className="flex items-center flex-1">
                      <span className="text-gray-900">{value}</span>
                    </div>
                    {isSelected && (
                      <Check className="w-5 h-5 text-[var(--primary-color)]" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Done Button */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <Button
            onClick={() => setShowSelector(false)}
            className="w-full h-12 bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)]"
          >
            Done
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => setShowSelector(true)}
    >
      <div className="flex items-center flex-1">
        <div>
          <div className="font-medium text-gray-900">{title}</div>
          <div
            className={cn(
              "text-sm",
              handler.state.length > 0 ? "text-gray-900" : "text-gray-500"
            )}
          >
            {getDisplayText()}
          </div>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </div>
  );
}
