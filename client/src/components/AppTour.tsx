import React, { createContext, useContext, useState, useCallback } from 'react';
import { driver, Driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { useNavigate } from 'react-router-dom';

// Define the context type
interface TourContextType {
  startTour: () => void;
  driverObj: Driver | null;
}

// Create the context
const TourContext = createContext<TourContextType>({
  startTour: () => {},
  driverObj: null
});

// Create a provider component
export const TourProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [driverObj, setDriverObj] = useState<Driver | null>(null);
  const navigate = useNavigate();
  // Initialize the driver object with your tour steps
  const initializeTour = useCallback(() => {
    const tourDriver = driver({
      showProgress: true,
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
                
                navigate("/travel");
                //timeout to have time to navigate
                setTimeout(() => {
                    tourDriver.moveNext();
                }, 50);
            },
          }
        },
        {
          element: "#header-tour",
          popover: {
            title: "Travel Header",
            description: "Your travel destination!",
            onPrevClick: () => {
                navigate("/entertainment");
                //timeout to have time to navigate
                setTimeout(() => {
                    tourDriver.movePrevious();
                }, 50);
            }
          }
        }
      ]
    });

    setDriverObj(tourDriver);
    return tourDriver;
  }, []);

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