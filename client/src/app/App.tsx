import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DetailsPage from "@/features/home/components/DetailsPage";
import TouristHomePage from "@/features/home/components/TouristHomePage";
import SignupSelector from "@/features/signup/components/SignupSelector";
import AdvertiserView from "@/features/advertiser/components/AdvertiserView";
import SettingsView from "@/features/user-settings/components/SettingsView";
import ProfileForm from "@/features/user-settings/components/ProfileForm";
import AccountForm from "@/features/user-settings/components/AccountForm";
import WalletForm from "@/features/user-settings/components/WalletForm";
import PreferenceTagsForm from "@/features/user-settings/components/PreferenceTagsForm";
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
import TouristGovernerHomepage from "@/features/tourism-governor/components/TourismGovernerHomepage";
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
import  MyOrdersPage  from "@/features/home/components/my-orders-section/MyOrdersPage";
import ProductReport from "@/features/seller/components/ProductReport";
import HotelsPage from "@/features/home/components/HotelsPage";
import HotelDetails from "@/features/home/components/HotelDetails";
import { useHotelStore } from "@/stores/hotel-store";
import ActivityDetailsPage from "@/features/home/components/activities/ActivityDetailsPage";
import ItineraryDetailsPage from "@/features/home/components/itineraries/ItineraryDetailsPage";
import Checkout from "@/features/checkout/components/Checkout";
import CheckoutPage from "@/features/home/components/CheckoutPage";
import HistoricalDetailsPage from "@/features/home/components/historical-place-details-page/HistoricalDetailsPage";

export default function App() {
  const { setRates } = useRatesStore();
  const { hotels } = useHotelStore();
  useEffect(() => {
    ApiCurrencyCall();
  }, []);
  const queryClient = new QueryClient();
  return (
    <div style={{ overflowY: "scroll", height: "100vh" }}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/entertainment" replace />} />
            <Route element={<TouristHomePage loggedIn={false} />}>
              <Route path="/entertainment" element={<GeneralGridView />} />
              <Route path="/shop" element={<ProductGridView />} />
              <Route path="/travel" element={<TravelPage loggedIn={false} />} />
              <Route path="/stays" element={<HotelsPage loggedIn={false} />} />
              <Route path="/stays/hotel/:index" element={<HotelDetails hotels={hotels} />} />
            </Route>
            <Route element={<TouristHomePage loggedIn={true} />}>
              <Route path="/entertainment/:id" element={<GeneralGridView />} />
              <Route path="/shop/:id" element={<ProductGridView />} />
              <Route path="/my-trips/:id" element={<MyTripsPage />} />
              <Route path="/travel/:id" element={<TravelPage loggedIn={true} />} />
              <Route path="/my-orders/:id" element={<MyOrdersPage />} />
              <Route path="/stays/:id" element={<HotelsPage loggedIn={true} />} />
              <Route path="/stays/:id/hotel/:index" element={<HotelDetails hotels={hotels} />} />
              
            </Route>
            <Route element={<CheckoutPage />}>
              <Route path="/checkout/:id" element={<Checkout />} />
            </Route>
            <Route path="/activities/:id" element={<ActivityDetailsPage />} />
            <Route path="/itineraries/:id" element={<ItineraryDetailsPage />} />
            <Route path="/my-trips-details/:id" element={<TripDetails />} />

            <Route path="/signup" element={<SignupSelector />} />
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/:type/details/:placeid/:id" element={<HistoricalDetailsPage />} />
            <Route path="/:type/details/:placeid/" element={<HistoricalDetailsPage />} />
            <Route element={<SettingsView />}>
              <Route path="/user-settings/:id" element={<ProfileForm />} />
              <Route path="/user-settings/account/:id" element={<AccountForm />} />
              <Route path="/user-settings/wallet/:id" element={<WalletForm />} />
            </Route>
            <Route path="/help-center/:id" element={<ComplaintsTable />} />
            <Route path="/user-settings/:id" element={<SettingsView />}>
              <Route index element={<ProfileForm />} />
              <Route path="account" element={<AccountForm />} />
            </Route>
            <Route path="/advertiser/:id" element={<AdvertiserView />} />
            <Route path="/tourism-governor/:id" element={<TouristGovernerHomepage />} />
            <Route
              path="/tourism-governor/historical-places/:id"
              element={<HistoricalPlacesView />}
            />
            <Route path="/tourism-governor/historical-tags/:id" element={<HistoricalTagsView />} />

            <Route path="/seller/:id" element={<SellerView />} />
            <Route path="/seller/product/:id" element={<ProductReport />} />

            <Route path="/tour-guide/:id" element={<TourGuideView />} />

            <Route path="/admin" element={<AdminHomepage />} />
            <Route path="/admin/:id" element={<AdminHomepage />} />
            <Route path="/admin/categories" element={<CategoryView />} />
            <Route path="/admin/users" element={<UserView />} />
            <Route path="/admin/users/requests" element={<UsersPendingRequests />} />
            <Route path="/admin/products" element={<AdminProductsView />} />
            <Route path="/admin" element={<AdminHomepage />} />
            <Route path="/admin/categories" element={<CategoryView />} />
            <Route path="/admin/preference-tags" element={<PreferenceTagsAdminView />} />
            <Route path="/admin/complaints" element={<AdminComplaintsView />} />
            <Route path="/admin/itineraries" element={<AdminItinerariesView />} />
            <Route path="/admin/activities" element={<AdminActivitiesView />} />
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
