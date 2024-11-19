import GeneralGridStyle from "../styles/GeneralGridView.module.css";
import SearchBar from "@/features/home/components/search-bar/SearchBar";
import type { genericHandler } from "@/features/home/components/search-bar/SearchBar";
import SortButton from "./SortButton";
import type { SortOption } from "@/features/home/types/home-page-types";
import FilterButton from "./FilterButton";
import React from "react";

interface FilterSortSearchHeaderProps {
  setSearch: (value: string) => void;
  searchPlaceHolder?: string;
  searchPartsPlaceholders?: string[];
  searchParts?: string[];
  searchPartsTypes?: string[];
  searchPartsValues?: string[][];
  searchPartsHandlers?: genericHandler[];
  handleSort: (value: SortOption) => void;
  children?: React.ReactNode;
}

function FilterSortSearchHeader({
  setSearch,
  searchPlaceHolder,
  searchPartsPlaceholders,
  searchParts,
  searchPartsValues,
  searchPartsTypes,
  searchPartsHandlers,
  children,
  handleSort,
}: FilterSortSearchHeaderProps) {
  return (
    <>
      <div className={GeneralGridStyle["general-grid-view__filter-container"]}>
        <div>
          <SearchBar
            onSearch={setSearch}
            searchPlaceHolder={searchPlaceHolder}
            searchParts={searchParts}
            searchPartsValues={searchPartsValues}
            searchPartsHandlers={searchPartsHandlers}
            searchPartsTypes={searchPartsTypes}
            searchPartsPlaceholders={searchPartsPlaceholders}
          />
        </div>
        {children && (
          <div className={GeneralGridStyle["general-grid-view__filter-container__icons"]}>
            {children}
          </div>
        )}
        <div className={GeneralGridStyle["filter-sort-buttons__container"]}>
          <FilterButton />
          <SortButton onSort={handleSort} />
        </div>
      </div>
    </>
  );
}

export default FilterSortSearchHeader;
