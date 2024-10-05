import { useState } from "react";

import FilterButtonStyles from "./FilterButton.module.css";
import filterIcon from "../../assets/Filter icon (1).png";
export default function FilterButton() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterButton, setFilterButton] = useState("Show Filter");

  const handleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    if (isFilterOpen) {
      setFilterButton("Show Filter");
    } else {
      setFilterButton("Hide Filter");
    }
  };

  return (
      <button onClick={handleFilter}  className={FilterButtonStyles["filter-button"]}>
        <div className={FilterButtonStyles['filter-button__icon-text']}>
            <img src={filterIcon}/>{filterButton}
        </div>
       
      </button>

  );
}
