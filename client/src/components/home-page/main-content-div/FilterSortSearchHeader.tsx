import GeneralGridStyle from "./GeneralGridView.module.css";
import SearchBar from "@/components/shadcn/SearchBar";
import type { SearchPartHandler } from "@/components/shadcn/SearchBar";
import SortButton from "../../home-page-buttons/SortButton";
import type { SortOption } from "@/components/home-page/home-page-types";
import FilterButton from "../../home-page-buttons/FilterButton";
import React from "react";

interface FilterSortSearchHeaderProps {
  finishedLoading: boolean;
  setSearch: (value: string) => void;
  searchParts: string[];
  searchPartsValues: string[][];
  searchPartsHandlers: SearchPartHandler[];
  handleSort: (value: SortOption) => void;
  children?: React.ReactNode;
}

function FilterSortSearchHeader({
  finishedLoading,
  setSearch,
  searchParts,
  searchPartsValues,
  searchPartsHandlers,
  children,
  handleSort,
}: FilterSortSearchHeaderProps) {
  return (
    <>
      <div className={GeneralGridStyle["general-grid-view__filter-container"]}>
        <div style={{ padding: "10px" }}>
          {finishedLoading && (
            <SearchBar
              onSearch={setSearch}
              searchParts={searchParts}
              searchPartsValues={searchPartsValues}
              searchPartsHandlers={searchPartsHandlers}
            />
          )}
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
