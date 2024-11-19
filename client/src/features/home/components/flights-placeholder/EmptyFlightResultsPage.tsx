import NoFlights from "@/assets/NoFlights.png";

export default function EmptyFlightResultsPage() {
  return (
    <div className="flex flex-col items-center justify-center text-lg">
      <img className="w-1/5 h-auto" src={NoFlights} alt="Placeholder Image" />
      <h1 className="text-xl font-bold text-black m-0">No flights found</h1>
      <br />
      <p className="text-black">
        Try changing your search criteria or check back later for more flights.
      </p>
    </div>
  );
}
