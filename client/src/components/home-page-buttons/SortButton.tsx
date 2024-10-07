import  { useState } from "react";
import SortButtonStyles from "./SortButton.module.css"
import { IoIosArrowUp } from "react-icons/io";

type SortOption = "price-high-low" | "price-low-high" | "rating-high-low" | "rating-low-high";

interface DropdownProps{
    onSort: (sortOption: SortOption) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ onSort }) => {
  const [open, setOpen] = useState(false);

  const handleSort = (sortOption:SortOption ) => {
    if (onSort) {
        onSort(sortOption);
      }
      setOpen(false); // Close the dropdown after an option is selected
  };

  return (
    <div className={SortButtonStyles['dropdown-container']}>
      <button
        className={SortButtonStyles['dropdown-button']}
        onClick={() => setOpen(!open)}
      >
        Sort By
        <IoIosArrowUp className={`${SortButtonStyles['arrow-icon']} ${open ? SortButtonStyles['flipped'] : ''}`} />
      </button>
      

      {open && (
        <ul className={SortButtonStyles['dropdown-list']}>
          <li onClick={() => handleSort("price-high-low")}>Sort Price: High to Low</li>
          <li onClick={() => handleSort("price-low-high")}>Sort Price: Low to High</li>
          <li onClick={() => handleSort("rating-high-low")}>Sort Rating: High to Low</li>
          <li onClick={() => handleSort("rating-low-high")}>Sort Rating: Low to High</li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;