import axios , { AxiosResponse }from 'axios';
import * as cheerio from 'cheerio';
import dotenv from "dotenv";

dotenv.config();
const API_KEY = process.env.SCRAPER_API_KEY || '';

async function scrapeLocationData(query : string) {
    console.log(`Scraping location data: ${query}`);

    const randomRequestId = Array.from({ length: 180 }, () =>
        Math.random().toString(36)[2]
    ).join('');

    const body = {
        variables: {
            request: {
                query: query,
                limit: 10,
                scope: "WORLDWIDE",
                locale: "en-US",
                scopeGeoId: 1,
                searchCenter: null,
                types: ["LOCATION"],
                locationTypes: [
                    "GEO", "AIRPORT", "ACCOMMODATION", "ATTRACTION",
                    "ATTRACTION_PRODUCT", "EATERY", "NEIGHBORHOOD",
                    "AIRLINE", "SHOPPING", "UNIVERSITY", "GENERAL_HOSPITAL",
                    "PORT", "FERRY", "CORPORATION", "VACATION_RENTAL",
                    "SHIP", "CRUISE_LINE", "CAR_RENTAL_OFFICE",
                ],
                userId: null,
                context: {},
                enabledFeatures: ["articles"],
                includeRecent: true,
            }
        },
        query: "84b17ed122fbdbd4",
        extensions: { preRegisteredQueryId: "84b17ed122fbdbd4" },
    };

    const response = await axios.post("https://www.tripadvisor.com/data/graphql/ids", body, {
        headers: {
            'Content-Type':'application/json',
            'X-Requested-By': randomRequestId,
            'Referer': 'https://www.tripadvisor.com/Hotels',
            'Origin': 'https://www.tripadvisor.com',
            'Accept-Language': 'en-US,en;q=0.9',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        }
    });


    const hotels = [];
    const scraperHotels = []
    let flag = true;
    let detail;
    // Extract results
    const results = response?.data?.data?.Typeahead_autocomplete?.results;
        for (let i = 0; i < results.length; i++) {


            if (results[i].details && results[i].details.locationV2.placeType === "ACCOMMODATION") {
                scraperHotels.push(results[i].details);
            }
            if(flag && results[i].details && (results[i].details.locationV2.placeType == "ISLAND" || results[i].details.locationV2.placeType == "CITY" || results[i].details.locationV2.placeType == "COUNTRY" || results[i].details.locationV2.placeType == "CONTINENT")) {
                detail = results[i].details;
                flag = false;
            }

    }

    if(scraperHotels.length > 0) {
        hotels.push(...scrapLister(scraperHotels));
    }

    if(detail) {
        hotels.push(...await scrapeSearch(detail));
    }

    return hotels
}



async function fetchWithProxy(url:string) {
    try {
        return await axios.get(url, {method: 'GET',
            proxy: {
                host: 'proxy-server.scraperapi.com',
                port: 8001,
                auth: {
                    username: 'scraperapi',
                    password: API_KEY
                },
                protocol: 'http'
            }});
    } catch (error) {
        return null;
    }
}


interface Preview {
    url: string;
    name: string;
}

function parseSearchPage(response : AxiosResponse<string>) {
    const previews = [] as Preview[];
    const $ = cheerio.load(response.data);

    // Location #1
    $('span.listItem').each((_ , element) => {
        const name = $(element).find('div[data-automation="hotel-card-title"] a').text();
        const url = $(element).find('div[data-automation="hotel-card-title"] a').attr('href');
        if (name && url) {
            previews.push({ name, url });
        }
    });

    if (previews.length > 0) return previews;

    $('div.listing_title > a').each((_, element) => {
        const url = $(element).attr('href');
        const name = $(element).text().split('. ').pop();
        if (url && name) {
            previews.push({ name, url });
        }
    });

    if (previews.length > 0) return previews;

    const allTitles = $('div[data-automation="hotel-card-title"]')
    allTitles.each((_, element) => {
        const url = $(element).find('a').attr('href'); // Get the href attribute
        const name = $(element).find('a').text(); // Get the text content
        if (url && name) {
            previews.push({url,name})
        }
    });

    return previews;
}

async function scrapeSearch(locationData : any) {
    if (!locationData) {
        return [];
    }
    const hotelSearchUrl = `https://www.tripadvisor.com${locationData.HOTELS_URL}`;
    console.log(`Scraping search page: ${hotelSearchUrl}`);
    const firstPageResponse = await fetchWithProxy(hotelSearchUrl);
    if (!firstPageResponse || firstPageResponse.status !== 200) {
        throw new Error("Scraper is being blocked");
    }

    let results = parseSearchPage(firstPageResponse);
    if (!results.length) {
        return [];
    }

    return results;
}

function scrapLister(details : any) {
    const result = [];
    for(let detail of details) {
        const name = detail.localizedName;
        const url = detail.url;
        result.push({name, url});
    }
    return result;
}

const client = axios.create({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Language': 'en-US,en;q=0.9',
    },
    timeout: 15000, // 15 seconds timeout
});

function parseHotelPage(html : string) {
    const $ = cheerio.load(html);


    const basicDataScript = $("script").filter((i, el) => $(el).html()!.includes("aggregateRating")).html();


    let basicData = {} as any;
    try {
        basicData = basicDataScript ? JSON.parse(basicDataScript.match(/{.*}/)![0]) : {};
    } catch (e) {
        console.error("Error parsing basic data:", e);
    }

    let avgPrice = {}
    try {
        avgPrice = $("div.biGQs._P.fiohW.uedOM > span.biGQs._P.fiohW.fOtGX").text();
    }catch(e){
        console.error("Error parsing average price:", e);
    }

    const description = $("div._T.FKffI.TPznB.Ci.ajMTa.Ps.Z.BB > div.fIrGe._T").text();

    const propertyAmenities = [] as any;
    const roomFeatures = [] as any;
    const roomTypes = [] as any;

    const $propertyAmenities = $("div[data-test-target='hr-about-group-property']")
    const $roomFeatures = $("div[data-test-target='hr-about-group-room_amenities']")
    const $roomTypes = $("div[data-test-target='hr-about-group-room_types']");

    $propertyAmenities.next().children().each((_, el) => {
        const text = $(el).text().trim();
        const svg = $(el).find("svg").html();
        propertyAmenities.push({ text , svg });
    });
    propertyAmenities.pop();
    $propertyAmenities.next().children().find("div[data-test-target='amenity_text']").each((_, el) => {
        const text = $(el).text().trim();
        const svg = $(el).find("svg").html();
        propertyAmenities.push({ text , svg });
    });

    $roomFeatures.next().children().each((_, el) => {
        const text = $(el).text().trim();
        const svg = $(el).find("svg").html();
        roomFeatures.push({text , svg});
    });
    roomFeatures.pop();
    $roomFeatures.next().children().find("div[data-test-target='amenity_text']").each((_, el) => {
        const text = $(el).text().trim();
        const svg = $(el).find("svg").html();
        roomFeatures.push({text , svg});
    });

    $roomTypes.next().children().each((_, el) => {
        const text = $(el).text().trim();
        const svg = $(el).find("svg").html();
        roomTypes.push({text , svg});
    });
    roomTypes.pop();
    $roomTypes.next().children().find("div[data-test-target='amenity_text']").each((_, el) => {
        const text = $(el).text().trim();
        const svg = $(el).find("svg").html();
        roomTypes.push({text , svg});
    });

    const amenities = { propertyAmenities, roomFeatures, roomTypes };

    const images = [] as any;

    $("div[data-section-signature='photo_viewer']").find("img").each((i, el) => {
        images.push($(el).attr("src"));
    });

    const bubbleRating = $("a[href='#REVIEWS']").find("svg").html();

    const ratings = [] as any;
    $("div[id='ABOUT_TAB']").find("div.q").each((i, el) => {
        ratings.push($(el).text());
    });
    const ratingsModified = [];
    for (let i = 0; i < ratings.length; i+=2) {
        const name = ratings[i];
        const rate = parseFloat(ratings[i + 1]);
        ratingsModified.push({name,rate});
    }

    return {
        name: basicData.name,
        address: basicData.address,
        rating: basicData.aggregateRating,
        mainImage: basicData.image,
        description: description,
        features: amenities,
        averagePrice : avgPrice,
        images : images,
        bubbleRating : bubbleRating,
        ratings : ratingsModified
    };
}

async function scrapeHotel(url : string) {
    console.log(`Scraping hotel data: ${url}`);
    try {
        const response = await client.get(url , {method: 'GET',
            proxy: {
                host: 'proxy-server.scraperapi.com',
                port: 8001,
                auth: {
                    username: 'scraperapi.wait_for_selector=div[data-test-target=\'amenity_text\'].wait_for_selector=div.fIrGe._T',
                    password: API_KEY
                },
                protocol: 'http'
            }});
        if (response.status === 403) {
            throw new Error("Request is blocked");
        }
        const hotelData = parseHotelPage(response.data);
        console.log("pushed hotel data");
        return hotelData;
    } catch (error : any) {
        console.error(`Error scraping hotel data from ${url}:`, error.message);
        return;
    }

}


export default async function entryPoint(query : string) {
    const listOfHotels = await scrapeLocationData(query);

    const uniqueHotels = listOfHotels.filter((hotel => {
        const urlSet = new Set();
        return hotel => {
            if (urlSet.has(hotel.url)) {
                return false;
            }
            urlSet.add(hotel.url);
            return true;
        }
    })());


    let results = [];

    const n = Math.floor(uniqueHotels.length/5) * 5;
    console.log(n);
    const just = [];
    for(let i = 0;i<n;i+=5) {
        results.push(scrapeHotel("https://www.tripadvisor.com"+uniqueHotels[i].url));
        results.push(scrapeHotel("https://www.tripadvisor.com"+uniqueHotels[i+1].url));
        results.push(scrapeHotel("https://www.tripadvisor.com"+uniqueHotels[i+2].url));
        results.push(scrapeHotel("https://www.tripadvisor.com"+uniqueHotels[i+3].url));
        results.push(scrapeHotel("https://www.tripadvisor.com"+uniqueHotels[i+4].url));
        just.push(...await Promise.all(results));
        results=[];
    }

    return just;
}