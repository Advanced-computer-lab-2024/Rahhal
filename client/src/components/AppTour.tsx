import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const AppTour = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const driverObj = driver({
            showProgress: true,
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
                                driverObj.moveNext();
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
                                driverObj.movePrevious();
                            }, 50);
                        }
                    }
                }
            ]
        });

        setTimeout(() => {
            driverObj.drive();
        }, 1000);
    }, []);

    return null;
};

export default AppTour;