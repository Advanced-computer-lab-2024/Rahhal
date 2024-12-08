import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { driver, Driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { useNavigate } from 'react-router-dom';
import { fetchActiveAppropriateItineraries } from '@/api-calls/itineraries-api-calls';
import { Itinerary } from '@/features/home/types/home-page-types';
import styles from '@/features/home/styles/AppTour.module.css';
// Update the context type
interface TourContextType {
    startTour: () => void;
    driverObj: Driver | null;
    isLoadingTour: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setSearchButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
    toggleLoading: () => void; // Add the new method
}

// Create the context
const TourContext = createContext<TourContextType>({
    startTour: () => { },
    driverObj: null,
    isLoadingTour: false,
    setIsLoading: () => { },
    setSearchButtonClicked: () => { },
    toggleLoading: () => { }

});




// Create a provider component
export const TourProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [driverObj, setDriverObj] = useState<Driver | null>(null);
    const navigate = useNavigate();
    const [specificItinerary, setSpecificItinerary] = useState<Itinerary | null>(null);
    const [isLoadingTour, setIsLoading] = useState<boolean>(false);
    const [searchPressed, setSearchPressed] = useState<boolean>(false);
    const [travelSearchHelper, setTravelSearchHelper] = useState<boolean>(false);
    const [searchButtonClicked, setSearchButtonClicked] = useState<boolean>(false);


    const toggleLoading = useCallback(() => {
        setIsLoading(isLoadingTour => !isLoadingTour);
    }, []);
    useEffect(() => {
        console.log("isLoadingTour in context:", isLoadingTour);
    }, [isLoadingTour]);

    useEffect(() => {
        const fetchItineraries = async () => {
            try {
                const itineraries = await fetchActiveAppropriateItineraries() as Itinerary[];
                const today = new Date();
                const filteredItineraries = itineraries.filter((item) => {
                    const itemDates = item.availableDatesTime.map((date) => new Date(date.Date));
                    return itemDates.some((date) => date >= today);
                });
                console.log("filteredItineraries: ", filteredItineraries);

                if (filteredItineraries && filteredItineraries.length > 0) {
                    // Get the first activity
                    const firstItinerary = filteredItineraries[0];
                    console.log("specificItinerary", firstItinerary);

                    // Set the specific itinerary in state
                    setSpecificItinerary(firstItinerary);
                }
            } catch (error) {
                console.error("Error fetching itineraries:", error);
            }
        };

        fetchItineraries();
    }, []);




    useEffect(() => {
        const observer = new MutationObserver(() => {
            const nextButton = document.querySelector('.driver-popover-next-btn');
            if (nextButton) {
                if (isLoadingTour || (!searchButtonClicked && travelSearchHelper)) {
                    nextButton.classList.add('driver-popover-btn-disabled');
                    // Replace button text with spinner if spinner not already present
                    if (travelSearchHelper && !searchButtonClicked) {

                    }
                    else if (!nextButton.querySelector(`.${styles.spinner}`)) {
                        nextButton.innerHTML = `<div class="driver-popover-btn-disabled ${styles.spinner}"></div>`; // Spinner placeholder
                    }
                } else {
                    nextButton.classList.remove('driver-popover-btn-disabled');
                    // Remove spinner and restore original text
                    if (nextButton.querySelector(`.${styles.spinner}`)) {
                        nextButton.innerHTML = 'Next'; // Replace with your original button text
                    }
                }
            }
            const searchButton = document.querySelector('.search-tour');
            if (searchButton) {
                if (searchButtonClicked) {
                    searchButton.classList.add('driver-popover-btn-disabled');
                } else {
                    searchButton.classList.remove('driver-popover-btn-disabled');
                }
            }
        });

        const targetNode = document.body; // Assuming the buttons are dynamically added to the body
        const config = { childList: true, subtree: true }; // Observe all DOM additions/removals

        observer.observe(targetNode, config);

        // Directly update the button's class whenever isLoadingTour changes
        const nextButton = document.querySelector('.driver-popover-next-btn');
        if (nextButton) {
            if (isLoadingTour || (!searchButtonClicked && travelSearchHelper)) {
                nextButton.classList.add('driver-popover-btn-disabled');
                // Replace button text with spinner if spinner not already present
                if (travelSearchHelper && !searchButtonClicked) {

                }
                else if (!nextButton.querySelector(`.${styles.spinner}`)) {
                    nextButton.innerHTML = `<div class="driver-popover-btn-disabled ${styles.spinner}"></div>`; // Spinner placeholder
                }
            } else {
                nextButton.classList.remove('driver-popover-btn-disabled');
                // Remove spinner and restore original text
                if (nextButton.querySelector(`.${styles.spinner}`)) {
                    nextButton.innerHTML = 'Next'; // Replace with your original button text
                }
            }
        }
        const searchButton = document.querySelector('.search-tour');
        if (searchButton) {
            if (searchButtonClicked) {
                searchButton.classList.add('driver-popover-btn-disabled');
            } else {
                searchButton.classList.remove('driver-popover-btn-disabled');
            }
        }

        return () => {
            observer.disconnect(); // Clean up observer on component unmount
        };
    }, [isLoadingTour, searchPressed, searchButtonClicked, travelSearchHelper]);



    // useEffect(() => {
    //     if (driverObj) {
    //       //destroys the driver object when the user navigates to a different page using browser controls
    //       driverObj.destroy();
    //       setDriverObj(null);
    //     }
    //   }, [location.pathname]);
    // Initialize the driver object with your tour steps
    const initializeTour = useCallback(() => {
        const tourDriver = driver({
            showProgress: true,
            smoothScroll: true,
            // disableActiveInteraction: true,
            steps: [
                {
                    element: "#nav-bar-tour",
                    popover: {
                        title: "Navigation",
                        description: "Start here!"
                    }
                },
                //Book An Experience
                {
                    element: "#experiences-tour",
                    popover: {
                        title: "Experiences",
                        description: "Explore experiences!",
                        onNextClick: () => {
                            // Check if specific itinerary exists before navigating
                            if (specificItinerary) {
                                // console.log("Navigating to specific itinerary:", specificItinerary);

                                navigate(`/itineraries?eventId=${specificItinerary._id}`, {
                                    state: { item: specificItinerary }
                                });

                                // Move to the next tour step after navigation
                                setTimeout(() => {
                                    tourDriver.moveNext();
                                }, 50);
                            }
                            else {
                                console.log("Specific itinerary not found");

                            }
                        }
                    }
                },
                {
                    element: "#itinerary-tour",
                    popover: {
                        title: "Viewing an Experience",
                        description: "Upon choosing an experience, you can find its details here!",
                        onNextClick: () => {
                            setTimeout(() => {
                                tourDriver.moveNext();
                            }, 50);
                        },
                        onPrevClick: () => {
                            navigate("/entertainment");
                            setTimeout(() => {
                                tourDriver.movePrevious();
                            }, 50);
                        }
                    }
                },

                {
                    element: "#book-itinerary-tour",
                    popover: {
                        title: "Booking an Experience",
                        description: "If you like an experience, you can book it from here!",
                        onNextClick: () => {
                            // setIsLoading(true);
                            navigate("/stays/");
                            setTimeout(() => {
                                tourDriver.moveNext();
                            }, 50);
                        },
                        onPrevClick: () => {
                            setTimeout(() => {
                                tourDriver.movePrevious();
                            }, 50);
                        }
                    }
                },
                //Book A Stay
                {
                    element: "#nav-bar-tour",
                    popover: {
                        title: "Navigation",
                        description: "Now we look at stays!",
                        onNextClick: () => {
                            setTimeout(() => {
                                tourDriver.moveNext();
                            }, 50);
                        },
                        onPrevClick: () => {
                            if (specificItinerary) {
                                // console.log("Navigating to specific itinerary:", specificItinerary);

                                navigate(`/itineraries?eventId=${specificItinerary._id}`, {
                                    state: { item: specificItinerary }
                                });
                                // Move to the next tour step after navigation
                                setTimeout(() => {
                                    tourDriver.movePrevious();
                                }, 50);
                            }
                        },
                    }
                },
                {
                    element: "#stays-searchBar-tour",
                    popover: {
                        title: "Search for Stays",
                        description: "Use the search bar to search for your perfect stay!",
                        onNextClick: () => {
                            setTimeout(() => {
                                tourDriver.moveNext();
                            }, 50);
                        },
                        onPrevClick: () => {
                            setTimeout(() => {
                                tourDriver.movePrevious();
                            }, 50);
                        }

                    }
                },
                {
                    element: "#trending-stays-tour",
                    popover: {
                        title: "Trending Stays",
                        description: "You can also reserve one of the trending stays!",
                        onNextClick: () => {
                            navigate("stays/hotel/1");
                            setTimeout(() => {
                                tourDriver.moveNext();
                            }, 50);
                        },
                        onPrevClick: () => {
                            setTimeout(() => {
                                tourDriver.movePrevious();
                            }, 50);
                        },
                        side: "top",
                        align: "center"

                    }
                },
                {
                    element: "#stay-reservation-details-tour",
                    popover: {
                        title: "Reservation Details",
                        description: "Here you can find your stay details, and if you like it you can also reserve it from here!",
                        onNextClick: () => {
                            navigate("/travel");
                            setTimeout(() => {
                                tourDriver.moveNext();
                            }, 50);
                        },
                        onPrevClick: () => {
                            navigate("/stays");
                            setTimeout(() => {
                                tourDriver.movePrevious();
                            }, 50);
                        },
                        side: "top",
                        align: "end"

                    }
                },
                //Travel
                {
                    element: "#nav-bar-tour",
                    popover: {
                        title: "Navigation",
                        description: "Now we look at ways of travel!",
                        onNextClick: () => {
                            setTravelSearchHelper(true);
                            setTimeout(() => {
                                tourDriver.moveNext();
                            }, 50);
                        },
                        onPrevClick: () => {
                            navigate("stays/hotel/1");
                            setTimeout(() => {
                                tourDriver.movePrevious();
                            }, 50);
                        },
                    }
                },
                {
                    element: "#travel-searchBar-tour",

                    popover: {
                        onPopoverRender: (popover) => {
                            const firstButton = document.createElement("button");
                            firstButton.innerText = "Search";
                            popover.footerButtons.insertBefore(firstButton, popover.footerButtons.children[1]);
                            firstButton.classList.add("search-tour");
                            firstButton.addEventListener("click", () => {
                                setSearchButtonClicked(true);
                                setSearchPressed(true);
                                if ((window as any).tourTaxiSearch) {
                                    (window as any).tourTaxiSearch();
                                }
                                setSearchPressed(false);
                                setTravelSearchHelper(false);
                            });

                        },
                        title: "Search for Travel",
                        description: "Search for your perfect travel, either using Airport Taxis, Flights or Buses!",
                        onNextClick: () => {
                            tourDriver.moveNext();

                        },
                        onPrevClick: () => {
                            setTimeout(() => {
                                setTravelSearchHelper(false);
                                tourDriver.movePrevious();
                            }, 50);
                        },
                    }
                },
                {
                    element: "#transportation-reserve-tour",
                    popover: {
                        title: "Reserving a Travel",
                        description: "If you like a travel option, you can reserve it from here!",
                        onNextClick: () => {
                            setTimeout(() => {
                                navigate("/entertainment");
                                tourDriver.highlight({
                                    popover: {
                                        title: "Congratulations!",
                                        description: "You have completed the tour! You can now plan you first vacation!",
                                        showButtons: [
                                            'close'
                                        ],
                                        onCloseClick: () => {
                                            tourDriver.destroy();
                                        }
                                    }
                                });
                            }, 50);
                        },
                        onPrevClick: () => {
                            setTimeout(() => {
                                tourDriver.movePrevious();
                            }, 50);
                        },
                    }
                },

            ]
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
        <TourContext.Provider value={{ startTour, driverObj, toggleLoading, setIsLoading, isLoadingTour, setSearchButtonClicked }}>
            {children}
        </TourContext.Provider>
    );
};

// Custom hook to use tour context
export const useTour = () => {
    const context = useContext(TourContext);
    if (!context) {
        throw new Error('useTour must be used within a TourProvider');
    }
    return context;
};