import GeneralGridStyle from "@/features/home/styles/GeneralGridView.module.css";
import activityPic from "@/assets/activity.png";
import itinerarypic from "@/assets/iternerary.png";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Filter } from "@/features/home/types/home-page-types";
import placePic from "@/assets/Historic site.png";

interface HeaderIconsProps {
  activeFilters: string[];
  handleActiveFilterClick: (filter: Filter) => void;
}
function HeaderIcons({ activeFilters, handleActiveFilterClick }: HeaderIconsProps) {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              className={`${GeneralGridStyle["icon-wrapper"]} ${activeFilters.includes("itinerary") ? GeneralGridStyle["selected"] : ""}`}
              onClick={() => handleActiveFilterClick("itinerary")}
            >
              <img src={itinerarypic} alt="itinerary" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Itineraries</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              className={`${GeneralGridStyle["icon-wrapper"]} ${activeFilters.includes("place") ? GeneralGridStyle["selected"] : ""}`}
              onClick={() => handleActiveFilterClick("place")}
            >
              <img src={placePic} alt="place" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Places</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              className={`${GeneralGridStyle["icon-wrapper"]} ${activeFilters.includes("activity") ? GeneralGridStyle["selected"] : ""}`}
              onClick={() => handleActiveFilterClick("activity")}
            >
              <img src={activityPic} alt="activity" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Activities</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
export default HeaderIcons;
