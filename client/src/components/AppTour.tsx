import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { driver, Driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useNavigate } from "react-router-dom";
import { fetchActiveAppropriateItineraries } from "@/api-calls/itineraries-api-calls";
import { Itinerary } from "@/features/home/types/home-page-types";
// Update the context type
interface TourContextType {
  startTour: () => void;
  driverObj: Driver | null;
  isLoadingTour: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  toggleLoading: () => void;
}

// Create the context
const TourContext = createContext<TourContextType>({
  startTour: () => {},
  driverObj: null,
  isLoadingTour: false,
  setIsLoading: () => {},
  toggleLoading: () => {},
});

// Create a provider component
export const TourProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [driverObj, setDriverObj] = useState<Driver | null>(null);
  const navigate = useNavigate();
  const [specificItinerary, setSpecificItinerary] = useState<Itinerary | null>(
    null
  );
  const [isLoadingTour, setIsLoading] = useState<boolean>(false);

  const toggleLoading = useCallback(() => {
    setIsLoading((isLoadingTour) => !isLoadingTour);
  }, []);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const itineraries =
          (await fetchActiveAppropriateItineraries()) as Itinerary[];
        const today = new Date();
        const filteredItineraries = itineraries.filter((item) => {
          const itemDates = item.availableDatesTime.map(
            (date) => new Date(date.Date)
          );
          return itemDates.some((date) => date >= today);
        });

        if (filteredItineraries && filteredItineraries.length > 0) {
          // Get the first activity
          const firstItinerary = filteredItineraries[0];

          // Set the specific itinerary in state
          setSpecificItinerary(firstItinerary);
        }
      } catch (error) {
        console.error("Error fetching itineraries:", error);
      }
    };

    fetchItineraries();
  }, []);

  // Helper function to get navigation element based on screen size
  const getNavigationElement = () => {
    const isMobile = window.innerWidth < 1280; // xl breakpoint
    if (isMobile) return "#nav-bar-tour-mobile";
    return "#nav-bar-tour";
  };

  // Helper function to get experiences element based on screen size
  const getExperiencesElement = () => {
    const isDesktop = window.innerWidth >= 1280; // xl breakpoint
    const isTablet = window.innerWidth >= 1024 && window.innerWidth < 1280; // lg to xl

    if (isDesktop) {
      return "#experiences-grid-tour";
    } else if (isTablet) {
      return "#experiences-grid-tour-tablet";
    } else {
      return "#experiences-grid-tour-mobile";
    }
  };

  // Helper function to get travel content element based on screen size
  const getTravelContentElement = () => {
    // Point to the main travel page for all screen sizes
    return "#travel-page-tour";
  };

  // Initialize the driver object with your tour steps
  const initializeTour = useCallback(() => {
    const tourDriver = driver({
      showProgress: true,
      disableActiveInteraction: true,
      steps: [
        {
          element: getNavigationElement(),
          popover: {
            title: "Navigation",
            description: "Start here!",
            onNextClick: () => {
              // If on mobile and menu is not open, open it first
              const isMobile = window.innerWidth < 1280;
              if (isMobile) {
                const mobileMenu = document.getElementById(
                  "nav-bar-tour-mobile-menu"
                );
                if (!mobileMenu || mobileMenu.offsetParent === null) {
                  // Menu is not visible, click the menu button to open it
                  const menuButton = document.querySelector(
                    "#nav-bar-tour-mobile button"
                  );
                  if (menuButton) {
                    (menuButton as HTMLButtonElement).click();
                    // Wait for menu to open then move to next step
                    setTimeout(() => {
                      tourDriver.moveNext();
                    }, 500);
                    return;
                  }
                }
              } else {
              }
              tourDriver.moveNext();
            },
          },
        },

        {
          element: getExperiencesElement(),
          popover: {
            title: "Experiences",
            description: "Explore experiences!",
            onNextClick: () => {
              // Check if specific itinerary exists before navigating
              if (specificItinerary) {
                // console.log("Navigating to specific itinerary:", specificItinerary);

                navigate(`/itineraries?eventId=${specificItinerary._id}`, {
                  state: { item: specificItinerary },
                });

                // Move to the next tour step after navigation
                setTimeout(() => {
                  tourDriver.moveNext();
                }, 50);
              } else {
                console.log("Specific itinerary not found");
              }
            },
          },
        },
        {
          element: "#itinerary-tour",
          popover: {
            title: "Viewing an Experience",
            description:
              "Upon choosing an experience, you can find its details here!",
            onNextClick: () => {
              navigate("/travel");
              setTimeout(() => {
                tourDriver.moveNext();
              }, 50);
            },
            onPrevClick: () => {
              navigate("/entertainment");
              setTimeout(() => {
                tourDriver.movePrevious();
              }, 50);
            },
          },
        },

        // I believe because the booking card is sticky and relative, driverJS can't locate it, so we skip this step

        // {
        //   element: "#book-itinerary-tour",
        //   popover: {
        //     title: "Booking an Experience",
        //     description:
        //       "If you like an experience, you can book it from here!",
        //     onNextClick: () => {
        //       // Skip stays section and go directly to travel
        //       navigate("/travel");
        //       setTimeout(() => {
        //         tourDriver.moveNext();
        //       }, 50);
        //     },
        //     onPrevClick: () => {
        //       setTimeout(() => {
        //         tourDriver.movePrevious();
        //       }, 50);
        //     },
        //   },
        // },

        {
          element: getTravelContentElement(),
          popover: {
            title: "Travel Options",
            description:
              "Here you can choose between different travel options: Airport Taxis, Flights, or Buses!",
            onNextClick: () => {
              setTimeout(() => {
                tourDriver.moveNext();
              }, 50);
            },
            onPrevClick: () => {
              // Go back to itinerary details instead of stays
              if (specificItinerary) {
                navigate(`/itineraries?eventId=${specificItinerary._id}`, {
                  state: { item: specificItinerary },
                });
                setTimeout(() => {
                  tourDriver.movePrevious();
                }, 50);
              }
            },
          },
        },
        {
          element: "#travel-searchBar-tour",
          popover: {
            title: "Search for Travel",
            description:
              "Here you can search for your perfect travel option, including Airport Taxis, Flights, or Buses!",
            onNextClick: () => {
              setTimeout(() => {
                navigate("/entertainment");
                tourDriver.highlight({
                  popover: {
                    title: "Congratulations!",
                    description:
                      "You have completed the tour! You can now plan you first vacation!",
                    showButtons: ["close"],
                    onCloseClick: () => {
                      tourDriver.destroy();
                    },
                  },
                });
              }, 50);
            },
            onPrevClick: () => {
              setTimeout(() => {
                tourDriver.movePrevious();
              }, 50);
            },
          },
        },

        // To avoid forcing the user to search for travel to continue the tour, we just skip the reserve tour step.

        // {
        //   element: "#transportation-reserve-tour",
        //   popover: {
        //     title: "Reserving a Travel",
        //     description:
        //       "If you like a travel option, you can reserve it from here!",
        //     onNextClick: () => {
        //       setTimeout(() => {
        //         navigate("/entertainment");
        //         tourDriver.highlight({
        //           popover: {
        //             title: "Congratulations!",
        //             description:
        //               "You have completed the tour! You can now plan you first vacation!",
        //             showButtons: ["close"],
        //             onCloseClick: () => {
        //               tourDriver.destroy();
        //             },
        //           },
        //         });
        //       }, 50);
        //     },
        //     onPrevClick: () => {
        //       setTimeout(() => {
        //         tourDriver.movePrevious();
        //       }, 50);
        //     },
        //   },
        // },
      ],
    });

    setDriverObj(tourDriver);
    return tourDriver;
  }, [specificItinerary, navigate]);

  // Method to start the tour
  const startTour = useCallback(() => {
    if (!driverObj) {
      const newDriverObj = initializeTour();
      newDriverObj.drive();
    } else {
      driverObj.drive();
    }
  }, [driverObj, initializeTour]);

  return (
    <TourContext.Provider
      value={{
        startTour,
        driverObj,
        toggleLoading,
        setIsLoading,
        isLoadingTour,
      }}
    >
      {children}
    </TourContext.Provider>
  );
};

// Custom hook to use tour context
export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTour must be used within a TourProvider");
  }
  return context;
};
