import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import TouristHomePage from "@/features/home/components/TouristHomePage";
import SignupSelector from "@/features/signup/components/SignupSelector";
import AdvertiserView from "@/features/advertiser/components/AdvertiserView";
import SettingsView from "@/features/user-settings/components/SettingsView";
import ProfileForm from "@/features/user-settings/components/ProfileForm";
import AccountForm from "@/features/user-settings/components/AccountForm";
import WalletForm from "@/features/user-settings/components/WalletForm";
import AdminHomepage from "@/features/admin/components/AdminHomepage";
import UserView from "@/features/admin/components/UserTable";
import CategoryView from "@/features/admin/components/CategoriesTable";
import GeneralGridView from "@/features/home/components/GeneralGridView";
import ProductGridView from "@/features/home/components/ProductsGridView";
import TourGuideView from "@/features/tour-guide/components/TourGuideView";
import {LoginPage} from "@/components/LoginPage";
import PreferenceTagsAdminView from "@/features/admin/components/PreferenceTagsTable";
import AdminComplaintsView from "@/features/admin/components/ComplaintsTable";
import SellerView from "@/features/seller/components/SellerView";
import TouristGovernerHomepage from "@/features/tourism-governor/components/TourismGovernorHomepage";
import AdminProductsView from "@/features/admin/components/AdminProductsView";
import HistoricalPlacesView from "@/features/tourism-governor/components/HistoricalPlacesView";
import HistoricalTagsView from "@/features/tourism-governor/components/HistoricalTagsTable";
import UsersPendingRequests from "@/features/admin/components/UsersPendingRequests";
import ComplaintsTable from "@/features/user-settings/components/TouristComplaintsTable";
import {MyTripsPage} from "@/features/home/components/my-trips-page/MyTripsPage";
import TravelPage from "@/features/home/components/TravelPage";
import AdminItinerariesView from "@/features/admin/components/AdminItinerariesView";
import AdminActivitiesView from "@/features/admin/components/AdminActivitiesView";
import {TripDetails} from "@/features/home/components/TripDetails";
import {getCurrencyExchangeRates} from "@/api-calls/currency-exchange-api-calls";
import {useEffect} from "react";
import {useRatesStore} from "@/stores/currency-exchange-store";
import MyOrdersPage from "@/features/home/components/my-orders-section/MyOrdersPage";
import ProductReport from "@/features/seller/components/ProductReport";
import HotelsPage from "@/features/home/components/HotelsPage";
import HotelDetails from "@/features/home/components/HotelDetails";
import {useHotelStore} from "@/stores/hotel-store";
import ActivityDetailsPage from "@/features/home/components/activities/ActivityDetailsPage";
import ItineraryDetailsPage from "@/features/home/components/itineraries/ItineraryDetailsPage";
import Checkout from "@/features/checkout/components/Checkout";
import CheckoutPage from "@/features/home/components/CheckoutPage";
import HistoricalDetailsPage from "@/features/home/components/historical-place-details-page/HistoricalDetailsPage";
import WishListPage from "@/features/home/components/wishlist/WishListPage";
import BookmarksPage from "@/features/home/components/bookmarks/BookmarksPage";
import AuroraHero from "@/features/hero/components/AuroraHero";

// import "driver.js/dist/driver.css";
// import { driver } from "driver.js";
import { TourProvider } from "@/components/AppTour";
import ItineraryReport from "@/features/tour-guide/components/ItineraryReport";
import ActivityReport from "@/features/advertiser/components/ActivityReport";
import AdminReport from "@/features/admin/components/AdminReport";
import PromocodeTable from "@/features/admin/components/PromocodeTable";
import SellerHomePage from "@/features/seller/components/SellerHomePage";
import TourGuideHomePage from "@/features/tour-guide/components/TourGuideHomePage";
import ReviewDisplay from "@/components/Ratings";
import AdvertiserHomePage from "@/features/advertiser/components/AdvertiserHomePage";

import useUserStore from "@/stores/user-state-store";
import {Roles} from "@/types/enums";
import ForgetPassword from "@/features/Login/components/ForgetPassword";

export default function App() {
    const {setRates} = useRatesStore();
    const {hotels} = useHotelStore();
    useEffect(() => {
        ApiCurrencyCall();
    }, []);
    const {role} = useUserStore();
    console.log(role);
    const queryClient = new QueryClient();

    return (
        <div style={{overflowY: "scroll", height: "100vh"}}>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                role === Roles.GUEST || role === Roles.TOURIST ? (
                                    <Navigate to="/entertainment" replace/>
                                ) : role === Roles.ADMIN ? (
                                    <Navigate to="/home" replace/>
                                ) : role === Roles.ADVERTISER ? (
                                    <AdvertiserView/>
                                ) : role === Roles.SELLER ? (
                                    <SellerView/>
                                ) : role === Roles.TOURGUIDE ? (
                                    <TourGuideView/>
                                ) : role === Roles.TOURISMGOVERNOR ? (
                                    <TouristGovernerHomepage/>
                                ) : null
                            }
                        />

                        <Route element={role === Roles.GUEST || role === Roles.TOURIST ?
                            <TouristHomePage loggedIn={false}/>
                            : role === Roles.ADMIN ? (
                            <AdminHomepage />
                            ) : role === Roles.ADVERTISER ? (
                            <AdvertiserHomePage />
                            ) : role === Roles.SELLER ? (
                            <SellerHomePage />
                            ) : role === Roles.TOURGUIDE ? (
                            <TourGuideHomePage />
                            ) : role === Roles.TOURISMGOVERNOR ? (
                            <TouristGovernerHomepage />
                            ) : null}>
                            <Route
                                path="/entertainment"
                                element={
                                    role === Roles.GUEST || role === Roles.TOURIST ? <GeneralGridView/> : null
                                }
                            />
                            <Route
                                path="/shop"
                                element={
                                    role === Roles.GUEST || role === Roles.TOURIST ? <ProductGridView/> : null
                                }
                            />
                            <Route
                                path="/travel"
                                element={
                                    role === Roles.GUEST || role === Roles.TOURIST ? (
                                        <TravelPage loggedIn={false}/>
                                    ) : null
                                }
                            />
                            <Route
                                path="/stays"
                                element={
                                    role === Roles.GUEST || role === Roles.TOURIST ? (
                                        <HotelsPage loggedIn={false}/>
                                    ) : null
                                }
                            />
                            <Route path="/stays/hotel/:index" element={<HotelDetails hotels={hotels}/>}/>
                            <Route path="/my-trips" element={<MyTripsPage/>}/>
                            <Route path="/my-trips-details" element={<TripDetails/>}/>
                            <Route path="/my-orders" element={<MyOrdersPage/>}/>
                            <Route path="/my-bookmarks" element={<BookmarksPage/>}/>
                            <Route path="/my-wishlist" element={<WishListPage/>}/>
                            <Route path="/checkout" element={<Checkout/>}/>
                            <Route path="/:type/details/:placeid" element={<HistoricalDetailsPage/>}/>
                            <Route path="/help-center/" element={<ComplaintsTable/>}/>

                            <Route path="/activities" element={<ActivityDetailsPage/>}/>
                            <Route path="/itineraries" element={<ItineraryDetailsPage/>}/>
                            <Route path="/itineraries" element={role === Roles.ADMIN ? <AdminItinerariesView/> : null}/>
                            <Route path="/activities" element={role === Roles.ADMIN ? <AdminActivitiesView/> : null}/>
                            <Route path="/home" element={<AdvertiserView/>}/>
                            <Route path="/home" element={role === Roles.ADMIN ? <AdminReport/> : null}/>
                            <Route path="/home" element={<SellerView/>}/>
                            <Route path="/home" element={<TourGuideView/>}/>
                            <Route path="/report" element={<ProductReport/>}/>
                            <Route path="/report" element={<ActivityReport/>}/>
                            <Route path="/report" element={<ItineraryReport/>}/>

                            <Route path="/reviews" element={<ReviewDisplay/>}/>

                            <Route path="/categories" element={role === Roles.ADMIN ? <CategoryView/> : null}/>
                            <Route path="/users" element={role === Roles.ADMIN ? <UserView/> : null}/>
                            <Route path="/users/requests"
                                   element={role === Roles.ADMIN ? <UsersPendingRequests/> : null}/>
                            <Route path="/products" element={role === Roles.ADMIN ? <AdminProductsView/> : null}/>
                            <Route path="/preference-tags"
                                   element={role === Roles.ADMIN ? <PreferenceTagsAdminView/> : null}/>
                            <Route path="/complaints" element={role === Roles.ADMIN ? <AdminComplaintsView/> : null}/>
                            <Route path="/account" element={role === Roles.ADMIN ? <AccountForm/> : null}/>
                            <Route path="/promocodes" element={role === Roles.ADMIN ? <PromocodeTable/> : null}/>


                            <Route
                                path="/historical-places"
                                element={<HistoricalPlacesView/>}
                            />
                            <Route
                                path="/historical-tags"
                                element={<HistoricalTagsView/>}
                            />
                        </Route>

                        <Route path="/signup" element={<SignupSelector/>}/>
                        <Route path="/signin" element={<LoginPage/>}/>
                        <Route path="/forgot-password" element={<ForgetPassword/>}/>

                        <Route element={role === Roles.TOURIST ?
                            <SettingsView/>
                            : role === Roles.ADMIN ? (
                                <AdminHomepage />
                            ) : role === Roles.ADVERTISER ? (
                                <AdvertiserHomePage />
                            ) : role === Roles.SELLER ? (
                                <SellerHomePage />
                            ) : role === Roles.TOURGUIDE ? (
                                <TourGuideHomePage />
                            ) : role === Roles.TOURISMGOVERNOR ? (
                                <TouristGovernerHomepage />
                            ) : null}>
                            <Route path="/user-settings" element={<ProfileForm/>}/>
                            <Route path="/user-settings/account" element={<AccountForm/>}/>
                            <Route path="/user-settings/wallet" element={<WalletForm/>}/>
                        </Route>

                    </Routes>
                </Router>
            </QueryClientProvider>
        </div>
    );

    function ApiCurrencyCall() {
        const storedRates = localStorage.getItem("rates");
        const isNewDay = storedRates
            ? new Date(JSON.parse(storedRates).date).getDate() != new Date().getDate()
            : true;

        if (!storedRates || isNewDay) {
            getCurrencyExchangeRates().then((data) => {
                setRates(data);
                localStorage.setItem("rates", JSON.stringify(data));
            });
        } else {
            setRates(JSON.parse(storedRates));
        }
    }
}
