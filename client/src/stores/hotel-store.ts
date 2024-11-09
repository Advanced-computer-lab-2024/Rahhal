import { IHotelDetails } from "@/features/home/types/home-page-types";
import { create } from "zustand";

interface HotelState{
    hotels:IHotelDetails[];
    setHotels: (hotels: IHotelDetails[])=> void;
}

export const useHotelStore = create<HotelState>()((set) => ({
    hotels:[],
    setHotels: (hotels) => set({hotels})
}));