import type {  PopulatedBooking, IItinerary, IActivity, IProduct } from "@/types";
import type { bookingStatus, bookingType } from "@/utils/constants";
import {  MIN_LENGTH , Role } from "@/utils/constants";
import {
  entertainmentAxiosInstance,
  gatewayAxiosInstance,
  productAxiosInstance,
} from "@/utils/axios-instances";
import type { AxiosInstance } from "axios";


export async function hasBookings(filter : {owner:string , type:bookingType , status:bookingStatus} ) {
    try{
        const bookings =  await gatewayAxiosInstance.get(`/booking/bookings/`, {
            params: filter,
          });
        const resultSet = bookings.data.filter(
                (booking: PopulatedBooking) => 
                  new Date(booking.selectedDate as Date) > new Date() 
        );
        return resultSet.length > MIN_LENGTH;
    }
    catch(error){
        console.error(error);
        return false;
    }
}

export async function deactivateEntities(filter : {owner:string , role:Role}) {
    try{
        let url = "";
        let params ;
        let body: { active?: boolean; isBookingOpen?: boolean;};
        let axiosInstance: AxiosInstance = entertainmentAxiosInstance;
        switch(filter.role){
            case Role.tourGuide:
                url = "/itineraries/";
                params = {ownerId : filter.owner}
                body = {active : false}
                break;
            case Role.advertiser:
                url = "/activities/";
                params = {owner : filter.owner}
                body = { isBookingOpen : false}
                break;
        }

        const entitiesToBeDeactivated = await axiosInstance.get(url, {params: params});

        entitiesToBeDeactivated.data.forEach(async (entity: IItinerary | IActivity ) => {
            await axiosInstance.patch(`${url}/${entity._id}`, body);
        });
    }
    catch(error){
        console.error(error);
    }
}

export async function deleteEntities(filter : {owner:string , role:Role}){
    try{
        let url = "";
        let params ;
        let axiosInstance: AxiosInstance = entertainmentAxiosInstance;
        switch(filter.role){
            case Role.tourGuide:
                url = "/itineraries/";
                params = {ownerId : filter.owner}
                break;
            case Role.advertiser:
                url = "/activities/";
                params = {owner : filter.owner}
                break;
            case Role.seller:
                url = "/products/";
                params = {seller : filter.owner}
                axiosInstance = productAxiosInstance;
                break;
        }

        const entitiesToBeDeleted = await axiosInstance.get(url, {params: params});

        entitiesToBeDeleted.data.forEach(async (entity: IItinerary | IActivity | IProduct) => {
            await axiosInstance.delete(`${url}/${entity._id}`);
        });
    }
    catch(error){
        console.error(error);
    }
}