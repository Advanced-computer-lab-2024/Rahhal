import entrypoint from '@/utils/Scraper/trip-advisor-scraper'

export async function getTripAdvisorData(query : string){
    return await entrypoint(query); 
}