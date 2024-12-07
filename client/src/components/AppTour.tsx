import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { driver, Driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { useNavigate } from 'react-router-dom';
import { fetchActiveAppropriateItineraries } from '@/api-calls/itineraries-api-calls';
import { Itinerary } from '@/features/home/types/home-page-types';

// Define the context type
interface TourContextType {
    startTour: () => void;
    driverObj: Driver | null;
}

// Create the context
const TourContext = createContext<TourContextType>({
    startTour: () => { },
    driverObj: null
});


// Create a provider component
export const TourProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [driverObj, setDriverObj] = useState<Driver | null>(null);
    const navigate = useNavigate();
    const [specificItinerary, setSpecificItinerary] = useState<Itinerary | null>(null);

    useEffect(() => {
        const fetchItineraries = async () => {
            try {
                const itineraries = await fetchActiveAppropriateItineraries() as Itinerary[];

                if (itineraries && itineraries.length > 0) {
                    // Get the first activity
                    const firstItinerary = itineraries[0];
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
            disableActiveInteraction: true,
            steps: [
                {
                    element: "#nav-bar-tour",
                    popover: {
                        title: "Navigation",
                        description: "Start here!"
                    }
                },
                {
                    element: "#experiences-tour",
                    popover: {
                        title: "Experiences",
                        description: "Explore experiences!",
                        onNextClick: () => {
                            // Check if specific itinerary exists before navigating
                            if (specificItinerary) {
                                navigate(`/itineraries/${specificItinerary._id}`, {
                                    state: { item: specificItinerary }
                                });

                                // Move to the next tour step after navigation
                                setTimeout(() => {
                                    tourDriver.moveNext();
                                }, 500);
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
                        title: "Booking",
                        description: "This is the page where you book your experiences!",
                        onNextClick: () => {
                            setTimeout(() => {
                                tourDriver.moveNext();
                            }, 500);
                        },
                        onPrevClick: () => {

                            navigate("/entertainment");

                            setTimeout(() => {
                                tourDriver.movePrevious();
                            }, 50);
                        }
                    }
                }
                ,
                {
                    element: "#book-itinerary-tour",
                    popover: {
                        title: "Booking",
                        description: "This is the page where you book your experiences!",
                        onNextClick: () => {
                            setTimeout(() => {
                                tourDriver.moveNext();
                            }, 500);
                        },
                        onPrevClick: () => {
                            setTimeout(() => {
                                tourDriver.movePrevious();
                            }, 50);
                        }
                    }
                    
                },
                {
                    element: "#nav-bar-tour",
                    popover: {
                        title: "Navigation",
                        description: "Now We Look at stays!",
                        onNextClick: () => {
                            navigate("/stays");
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
                    element: "#nav-bar-tour",
                    popover: {
                        title: "Navigation",
                        description: "Now We Look at stays!",
                        onNextClick: () => {
                            navigate("/stays");
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
        <TourContext.Provider value={{ startTour, driverObj }}>
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