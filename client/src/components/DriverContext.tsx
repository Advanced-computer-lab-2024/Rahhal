import React, { createContext, useContext, useRef } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const DriverContext = createContext<ReturnType<typeof driver> | null>(null);

interface DriverProviderProps {
    children: React.ReactNode;
}

export const DriverProvider: React.FC<DriverProviderProps> = ({ children }) => {
    const driverInstance = useRef(driver({ showProgress: true }));

    return (
        <DriverContext.Provider value={driverInstance.current}>
            {children}
        </DriverContext.Provider>
    );
};

export const useDriver = () => {
    const context = useContext(DriverContext);
    if (!context) {
        throw new Error("useDriver must be used within a DriverProvider");
    }
    return context;
};
