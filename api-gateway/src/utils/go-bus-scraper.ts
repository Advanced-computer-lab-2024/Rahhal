import puppeteer from "puppeteer";
export type StationNames = "Cairo" | "MarsaMatrouh" | "Aswan" | "Alexandria" | "Luxor" | "Hurghada" | "ElGouna" | "MarsaAllam" | "SharmElSheikh" | "SahlHasheesh" | "Dahab" | "Sokhna" | "Assiut" | "Sahel" | "PortSaid" | "Tanta" | "Mansoura";

const stations: { [key in StationNames]: string[] } = {
    "Cairo" : ["615","8","15","87","27","9","42","43","76","98","65"],
    "MarsaMatrouh" : ["667","668","68"],
    "Aswan" : ["669"],
    "Alexandria" : ["64","18","121"],
    "Luxor" : ["57"],
    "Hurghada" : ["1","606","21"],
    "ElGouna" : ["7"],
    "MarsaAllam" :["23","603"],
    "SharmElSheikh" : ["3","51"],
    "SahlHasheesh" : ["22"],
    "Dahab" : ["40"],
    "Sokhna" : ["26","245","164"],
    "Assiut" : ["36","146"],
    "Sahel" : ["66","69","70"],
    "PortSaid" : ["378","78"],
    "Tanta" : ["16"],
    "Mansoura" : ["30"]
};
export async function getGoBusAPIScraper(arrivalDate: string, departureDate: string, passengersNo: string, tripType: string, arrivalStationsName: StationNames, departureStationsName: StationNames) {
    const departureStations = stations[departureStationsName];
    const arrivalStations = stations[arrivalStationsName];
    let totalTrips = [];
  
    for (const arrivalStation of arrivalStations) {
      for (const departureStation of departureStations) {
   try{
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium',
      headless: true,
      args: [      "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--disable-gpu",],
    });
    const page = await browser.newPage();

    
    await page.goto('https://go-bus.com/search?arrivalDate='+arrivalDate+'&arrivalStation='+arrivalStation+'&departureDate='+departureDate+'&departureStation='+departureStation+'&lang=en&passengersNo='+passengersNo+'&transportationType=bus&tripType='+tripType,{ waitUntil: 'networkidle2' });

    
    const trips = await page.evaluate(() => {
        const tripElements = document.querySelectorAll('.list-con'); 
        const tripData = [] as { departureLocation: string, departureTime: string, arrivalLocation: string, arrivalTime: string, price: string, logos: { title: string, imgSrc: string }[] }[];
    
        tripElements.forEach(trip => {

          const departureLocation = (trip.querySelector('h4 > p') as HTMLElement).innerText.trim().slice(15) || 'N/A';
          const departureTime = trip.querySelector('h4')?.innerText.trim().slice(-7) || 'N/A';
          const arrivalLocation = (trip.querySelector('h5 > p') as HTMLElement).innerText.trim().slice(10) || 'N/A';
          const arrivalTime = (trip.querySelector('h5 > div') as HTMLElement).innerText.trim().slice(0,-10).replace('\n',' ') || 'N/A';
          const price = (trip.querySelector('.left-side > h4') as HTMLElement).innerText.trim().slice(0,-9).replace('\n',' ') || 'N/A';
          const logos = Array.from(trip.querySelectorAll('.services ul li')).map(service => {
            return {
              title: (service.querySelector('.title') as HTMLElement).innerText.trim(),
              imgSrc: "https://go-bus.com/" + service.querySelector('.svc-img')?.getAttribute('src')
            };
          }) as { title: string, imgSrc: string }[];
    
          tripData.push({
            departureLocation,
            departureTime,
            arrivalLocation,
            arrivalTime,
            price,
            logos
          });
        });
    
        return tripData;
      });
      totalTrips.push(...trips);

  await browser.close();
    } catch (error) {
      console.log(error);
    };
    };
    };
    return totalTrips;
};