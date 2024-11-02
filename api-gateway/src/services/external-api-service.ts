import * as scraper from '@/utils/go-bus-scraper';

export async function getGoBusAPI(arrivalDate: string, departureDate: string, passengersNo: string, tripType: string, arrivalStations: scraper.StationNames, departureStations: scraper.StationNames) {
  return await scraper.getGoBusAPIScraper(arrivalDate, departureDate, passengersNo, tripType, arrivalStations, departureStations);
};