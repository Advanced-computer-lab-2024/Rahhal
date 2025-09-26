import activityPic from "@/assets/activity.png";
import itinerarypic from "@/assets/iternerary.png";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Filter } from "@/features/home/types/home-page-types";
import placePic from "@/assets/Historic site.png";

interface HeaderIconsProps {
  activeFilters: string[];
  handleActiveFilterClick: (filter: Filter) => void;
}

function HeaderIcons({
  activeFilters,
  handleActiveFilterClick,
}: HeaderIconsProps) {
  const iconWrapperClass =
    "py-1 flex flex-col items-center justify-center w-26 h-26 relative cursor-pointer transition-all duration-300 hover:bg-gray-100 rounded-lg";
  const selectedClass =
    "bg-gray-100 after:absolute after:-bottom-0 after:left-2 after:right-2 after:h-1 after:bg-black after:rounded-t";
  const imageClass = "w-8 h-8 lg:w-10 lg:h-10 object-contain";
  const textClass =
    "text-xs lg:text-sm font-medium text-gray-700 mt-1 text-center truncate w-full px-1";

  return (
    <div className="flex gap-2 lg:gap-6 overflow-x-auto">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              className={`${iconWrapperClass} ${
                activeFilters.includes("itinerary") ? selectedClass : ""
              }`}
              onClick={() => handleActiveFilterClick("itinerary")}
            >
              <img src={itinerarypic} alt="itinerary" className={imageClass} />
              <p className={textClass}>Itinerary</p>
            </div>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              className={`${iconWrapperClass} ${
                activeFilters.includes("place") ? selectedClass : ""
              }`}
              onClick={() => handleActiveFilterClick("place")}
            >
              <img src={placePic} alt="place" className={imageClass} />
              <p className={textClass}>Historical Places</p>
            </div>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              className={`${iconWrapperClass} ${
                activeFilters.includes("activity") ? selectedClass : ""
              }`}
              onClick={() => handleActiveFilterClick("activity")}
            >
              <img src={activityPic} alt="activity" className={imageClass} />
              <p className={textClass}>Activities</p>
            </div>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default HeaderIcons;
