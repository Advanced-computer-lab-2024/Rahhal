import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface SearchIconProps {
  className: string
}

// SearchBar component
export default function SearchBar() {
    // State to manage searchbar outline
    const [isFocused, setIsFocused] = useState(false)

    return (
      <div className= {`flex items-center w-full max-w-md rounded-full border-2 bg-background transition-all px-1 py-1 pl-2 ${
        isFocused && 'ring-1 ring-ring'
      }`} >
        <Input
          type="search" 
          className="border-0 focus-visible:outline-0 focus-visible:ring-transparent focus-visible:ring-offset-transparent"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}        
          />
        <Button
  variant="default"
  size="default"
  className="w-9 h-9 bg-[#ff585f] hover:bg-[#ff585f] hover:bg-gradient-to-r hover:from-[#ff111c] to hover:to-[#ff1151]  rounded-full px-2 py-0 transition duration-300"
  >
      <SearchIcon className="w-6 h-6"/>
        </Button>
      </div>
    )
  }


// Magnifying glass icon
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

