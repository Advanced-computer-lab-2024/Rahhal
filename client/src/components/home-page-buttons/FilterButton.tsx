import FilterButtonStyles from "./FilterButton.module.css";
import filterIcon from "../../assets/Filter icon (1).png";
import { useSideBarToggle } from "@/global-states/use-sidebar-toggle";

export default function FilterButton() {
  const filterState = useSideBarToggle();

  return (
    <button
      onClick={() => filterState?.setIsOpen()}
      className={FilterButtonStyles["filter-button"]}
    >
      <div className={FilterButtonStyles["filter-button__icon-text"]}>
        <img src={filterIcon} />
        {filterState?.isOpen ? "Hide Filter" : "Show Filter"}
      </div>
    </button>
  );
}
