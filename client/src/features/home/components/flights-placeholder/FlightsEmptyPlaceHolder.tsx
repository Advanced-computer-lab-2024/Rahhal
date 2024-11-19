import Plane from "@/assets/Plane.png"
import paris from "@/assets/Paris.png"
import berlin from "@/assets/Berlin.png"
import Cairo from "@/assets/Cairo.png"
import milan from "@/assets/Milan.png"
export default function FlightsEmptyPlaceHolder() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 py-8">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden w-full h-64 sm:h-80 lg:h-96">
        <img
          src={Plane}
          alt="Explore every destination"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start px-8 sm:px-16">
          <p className="text-white text-lg sm:text-xl font-medium">Can’t decide where to go?</p>
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mt-2">
            Explore every destination
          </h1>
        </div>
      </div>

      {/* Trending Destinations */}
      <div className="mt-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Trending destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Destination Card 1 */}
          <div className="relative rounded-lg overflow-hidden shadow-md">
            <img
              src={paris}
              alt="Hurghada"
              className="w-full h-40 sm:h-48 lg:h-56 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <p className="text-white text-lg font-medium">Paris</p>
            </div>
          </div>

          {/* Destination Card 2 */}
          <div className="relative rounded-lg overflow-hidden shadow-md">
            <img
              src={berlin}
              alt="berlin"
              className="w-full h-40 sm:h-48 lg:h-56 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <p className="text-white text-lg font-medium">Berlin</p>
            </div>
          </div>

          {/* Destination Card 3 */}
          <div className="relative rounded-lg overflow-hidden shadow-md">
            <img
              src={Cairo}
              alt="Cairo"
              className="w-full h-40 sm:h-48 lg:h-56 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <p className="text-white text-lg font-medium">Cairo</p>
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden shadow-md">
            <img
              src={milan}
              alt="milan"
              className="w-full h-40 sm:h-48 lg:h-56 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <p className="text-white text-lg font-medium">Milan</p>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
