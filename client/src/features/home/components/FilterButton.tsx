import FilterButtonStyles from "../styles/FilterButton.module.css";
import filterIcon from "@/assets/Filter icon (1).png";
import { useSideBarToggleStore } from "@/stores/side-bar-toggle-store";

export default function FilterButton() {
  const filterState = useSideBarToggleStore();

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
