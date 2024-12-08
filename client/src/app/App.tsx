import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import { LoginPage } from "@/components/LoginPage";
import PreferenceTagsAdminView from "@/features/admin/components/PreferenceTagsTable";
import AdminComplaintsView from "@/features/admin/components/ComplaintsTable";
import SellerView from "@/features/seller/components/SellerView";
import TourismGovernerHomepage from "@/features/tourism-governor/components/TourismGovernorHomepage";
import AdminProductsView from "@/features/admin/components/AdminProductsView";
import HistoricalPlacesView from "@/features/tourism-governor/components/HistoricalPlacesView";
import HistoricalTagsView from "@/features/tourism-governor/components/HistoricalTagsTable";
import UsersPendingRequests from "@/features/admin/components/UsersPendingRequests";
import ComplaintsTable from "@/features/user-settings/components/TouristComplaintsTable";
import { MyTripsPage } from "@/features/home/components/my-trips-page/MyTripsPage";
import TravelPage from "@/features/home/components/TravelPage";
import AdminItinerariesView from "@/features/admin/components/AdminItinerariesView";
import AdminActivitiesView from "@/features/admin/components/AdminActivitiesView";
import { TripDetails } from "@/features/home/components/TripDetails";
import { getCurrencyExchangeRates } from "@/api-calls/currency-exchange-api-calls";
import { useEffect } from "react";
import { useRatesStore } from "@/stores/currency-exchange-store";
import MyOrdersPage from "@/features/home/components/my-orders-section/MyOrdersPage";
import ProductReport from "@/features/seller/components/ProductReport";
import HotelsPage from "@/features/home/components/HotelsPage";
import HotelDetails from "@/features/home/components/HotelDetails";
import { useHotelStore } from "@/stores/hotel-store";
import ActivityDetailsPage from "@/features/home/components/activities/ActivityDetailsPage";
import ItineraryDetailsPage from "@/features/home/components/itineraries/ItineraryDetailsPage";
import Checkout from "@/features/checkout/components/Checkout";
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
import { Roles } from "@/types/enums";
import ForgetPassword from "@/features/Login/components/ForgetPassword";
import NotFound from "@/features/home/NotFound";

export default function App() {
  const { setRates } = useRatesStore();
  const { hotels } = useHotelStore();
  useEffect(() => {
    ApiCurrencyCall();
  }, []);
  const { role } = useUserStore();
  console.log(role);
  const queryClient = new QueryClient();

  return (
    <div style={{ overflowY: "scroll", height: "100vh" }}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                role === Roles.GUEST || role === Roles.TOURIST ? (
                  <Navigate to="/entertainment" replace />
                ) : role === Roles.ADMIN ? (
                  <Navigate to="/home" replace />
                ) : role === Roles.ADVERTISER ? (
                  <Navigate to="/home" replace />
                ) : role === Roles.SELLER ? (
                  <Navigate to="/home" replace />
                ) : role === Roles.TOURGUIDE ? (
                  <Navigate to="/home" replace />
                ) : role === Roles.TOURISMGOVERNOR ? (
                  <Navigate to="/home" replace />
                ) : null
              }
            />

            <Route
              element={
                role === Roles.GUEST || role === Roles.TOURIST ? (
                  <TouristHomePage />
                ) : role === Roles.ADMIN ? (
                  <AdminHomepage />
                ) : role === Roles.ADVERTISER ? (
                  <AdvertiserHomePage />
                ) : role === Roles.SELLER ? (
                  <SellerHomePage />
                ) : role === Roles.TOURGUIDE ? (
                  <TourGuideHomePage />
                ) : role === Roles.TOURISMGOVERNOR ? (
                  <TourismGovernerHomepage />
                ) : (
                  <NotFound />
                )
              }
            >
              <Route
                path="/entertainment"
                element={
                  role === Roles.GUEST || role === Roles.TOURIST ? (
                    <GeneralGridView />
                  ) : (
                    <NotFound />
                  )
                }
              />
              <Route
                path="/shop"
                element={
                  role === Roles.GUEST || role === Roles.TOURIST ? (
                    <ProductGridView />
                  ) : (
                    <NotFound />
                  )
                }
              />
              <Route
                path="/travel"
                element={
                  role === Roles.GUEST || role === Roles.TOURIST ? <TravelPage /> : <NotFound />
                }
              />
              <Route
                path="/stays"
                element={
                  role === Roles.GUEST || role === Roles.TOURIST ? <HotelsPage /> : <NotFound />
                }
              />
              <Route
                path="/stays/hotel/:index"
                element={
                  role === Roles.GUEST || role === Roles.TOURIST ? (
                    <HotelDetails hotels={hotels} />
                  ) : (
                    <NotFound />
                  )
                }
              />
              <Route
                path="/my-trips"
                element={role === Roles.TOURIST ? <MyTripsPage /> : <NotFound />}
              />
              <Route
                path="/my-trips-details"
                element={role === Roles.TOURIST ? <TripDetails /> : <NotFound />}
              />
              <Route
                path="/my-orders"
                element={role === Roles.TOURIST ? <MyOrdersPage /> : <NotFound />}
              />
              <Route
                path="/my-bookmarks"
                element={role === Roles.TOURIST ? <BookmarksPage /> : <NotFound />}
              />
              <Route
                path="/my-wishlist"
                element={role === Roles.TOURIST ? <WishListPage /> : <NotFound />}
              />
              <Route
                path="/checkout"
                element={role === Roles.TOURIST ? <Checkout /> : <NotFound />}
              />
              <Route
                path="/:type/details/:placeid"
                element={
                  role === Roles.GUEST || role === Roles.TOURIST ? (
                    <HistoricalDetailsPage />
                  ) : (
                    <NotFound />
                  )
                }
              />
              <Route
                path="/help-center/"
                element={role === Roles.TOURIST ? <ComplaintsTable /> : <NotFound />}
              />

              <Route
                path="/activities"
                element={
                  role === Roles.GUEST || role === Roles.TOURIST ? (
                    <ActivityDetailsPage />
                  ) : role === Roles.ADMIN ? (
                    <AdminActivitiesView />
                  ) : (
                    <NotFound />
                  )
                }
              />
              <Route
                path="/itineraries"
                element={
                  role === Roles.GUEST || role === Roles.TOURIST ? (
                    <ItineraryDetailsPage />
                  ) : role === Roles.ADMIN ? (
                    <AdminItinerariesView />
                  ) : (
                    <NotFound />
                  )
                }
              />

              <Route
                path="/home"
                element={
                  role === Roles.ADVERTISER ? (
                    <AdvertiserView />
                  ) : role === Roles.SELLER ? (
                    <SellerView />
                  ) : role === Roles.TOURGUIDE ? (
                    <TourGuideView />
                  ) : role === Roles.ADMIN ? (
                    <AdminReport />
                  ): role === Roles.TOURISMGOVERNOR ? (
                    <HistoricalPlacesView />
                  ) : (
                    <NotFound />
                  )
                }
              />

              <Route
                path="/report"
                element={
                  role === Roles.ADVERTISER ? (
                    <ActivityReport />
                  ) : role === Roles.SELLER ? (
                    <ProductReport />
                  ) : role === Roles.TOURGUIDE ? (
                    <ItineraryReport />
                  ) : (
                    <NotFound />
                  )
                }
              />

              <Route
                path="/reviews"
                element={role === Roles.TOURGUIDE ? <ReviewDisplay /> : <NotFound />}
              />

              <Route
                path="/categories"
                element={role === Roles.ADMIN ? <CategoryView /> : <NotFound />}
              />
              <Route path="/users" element={role === Roles.ADMIN ? <UserView /> : <NotFound />} />
              <Route
                path="/users/requests"
                element={role === Roles.ADMIN ? <UsersPendingRequests /> : <NotFound />}
              />
              <Route
                path="/products"
                element={role === Roles.ADMIN ? <AdminProductsView /> : <NotFound />}
              />
              <Route
                path="/preference-tags"
                element={role === Roles.ADMIN ? <PreferenceTagsAdminView /> : <NotFound />}
              />
              <Route
                path="/complaints"
                element={role === Roles.ADMIN ? <AdminComplaintsView /> : <NotFound />}
              />
              <Route
                path="/account"
                element={role === Roles.ADMIN ? <AccountForm /> : <NotFound />}
              />
              <Route
                path="/promocodes"
                element={role === Roles.ADMIN ? <PromocodeTable /> : <NotFound />}
              />

              <Route
                path="/historical-places"
                element={role === Roles.TOURISMGOVERNOR ? <HistoricalPlacesView /> : <NotFound />}
              />
              <Route
                path="/historical-tags"
                element={role === Roles.TOURISMGOVERNOR ? <HistoricalTagsView /> : <NotFound />}
              />
            </Route>

            <Route
              path="/signup"
              element={role === Roles.GUEST ? <SignupSelector /> : <NotFound />}
            />
            <Route path="/signin" element={role === Roles.GUEST ? <LoginPage /> : <NotFound />} />
            <Route
              path="/forgot-password"
              element={role === Roles.GUEST ? <ForgetPassword /> : <NotFound />}
            />

            <Route
              element={
                role === Roles.TOURIST ? (
                  <SettingsView />
                ) : role === Roles.ADMIN ? (
                  <AdminHomepage />
                ) : role === Roles.ADVERTISER ? (
                  <AdvertiserHomePage />
                ) : role === Roles.SELLER ? (
                  <SellerHomePage />
                ) : role === Roles.TOURGUIDE ? (
                  <TourGuideHomePage />
                ) : role === Roles.TOURISMGOVERNOR ? (
                  <TourismGovernerHomepage />
                ) : (
                  <NotFound />
                )
              }
            >
              <Route
                path="/user-settings"
                element={
                  role === Roles.TOURIST ||
                  role === Roles.ADMIN ||
                  role === Roles.ADVERTISER ||
                  role === Roles.SELLER ||
                  role === Roles.TOURGUIDE ||
                  role === Roles.TOURISMGOVERNOR ? (
                    <ProfileForm />
                  ) : (
                    <NotFound />
                  )
                }
              />
              <Route
                path="/user-settings/account"
                element={
                  role === Roles.TOURIST ||
                  role === Roles.ADMIN ||
                  role === Roles.ADVERTISER ||
                  role === Roles.SELLER ||
                  role === Roles.TOURGUIDE ||
                  role === Roles.TOURISMGOVERNOR ? (
                    <AccountForm />
                  ) : (
                    <NotFound />
                  )
                }
              />
              <Route
                path="/user-settings/wallet"
                element={role === Roles.TOURIST ? <WalletForm /> : null}
              />
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
