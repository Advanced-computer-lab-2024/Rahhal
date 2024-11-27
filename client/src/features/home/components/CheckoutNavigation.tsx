import FavIcon from "@/features/logos/FavIcon";
import CurrencyDropdown from "./CurrencyDropdown";
import { ProfileAvatar } from "./ProfileAvatar";
import Submark from "@/features/logos/Submark";
import { useParams } from "react-router-dom";

export default function CheckoutNavigation() {
    const { id: paramId } = useParams<{ id?: string }>();

    return (
        <>
            <div className="w-full h-16 flex items-center justify-between z-10 relative  bg-white sticky top-0 ">
                <div className="ml-40 gap-5 flex-1 flex justify-center">
                    <div>
                        <FavIcon />
                    </div>
                    <div>
                        <a href={`/entertainment/${paramId}`}>
                            <Submark />
                        </a>
                    </div>
                </div>
                <div className="flex items-center">
                    <>
                        <div className="flex space-x-4 items-center">
                            <CurrencyDropdown />
                            <ProfileAvatar />
                        </div>
                    </>
                </div>

            </div>
            <div className="z-10 relative sticky top-0">
                <hr />
            </div>
        </>
    );
}
