import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DetailsPage from "@/features/home/components/DetailsPage";
import TouristHomePage from "@/features/home/components/TouristHomePage";
import SignupSelector from "@/features/signup/components/SignupSelector";
import AdvertiserView from "@/features/advertiser/components/AdvertiserView";
import SettingsView from "@/features/user-settings/components/SettingsView";
import ProfileForm from "@/features/user-settings/components/ProfileForm";
import AccountForm from "@/features/user-settings/components/AccountForm";
import AdminHomepage from "@/features/admin/components/AdminHomepage";
import UserView from "@/features/admin/components/UserTable";
import CategoryView from "@/features/admin/components/CategoriesTable";
import GeneralGridView from "@/features/home/components/GeneralGridView";
import ProductGridView from "@/features/home/components/ProductsGridView";
import TourGuideView from "@/features/tour-guide/components/ItinerariesTable";
import { Login } from "@/components/Login";
import PreferenceTagsAdminView from "@/features/admin/components/PreferenceTagsTable";
import AdminComplaintsView from "@/features/admin/components/ComplaintsTable";
import SellerView from "@/features/seller/components/SellerView";
import TouristGovernerHomepage from "@/features/tourism-governor/components/TourismGovernerHomepage";
import AdminProductsView from "@/features/admin/components/AdminProductsView";
import HistoricalPlacesView from "@/features/tourism-governor/components/HistoricalPlacesView";
import HistoricalTagsView from "@/features/tourism-governor/components/HistoricalTagsTable";
import UsersPendingRequests from "@/features/admin/components/UsersPendingRequests";
import TravelPage from "@/features/home/components/TravelPage";
import AdminItinerariesView from "@/features/admin/components/AdminItinerariesView";
import AdminActivitiesView from "@/features/admin/components/AdminActivitiesView";

export default function App() {
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
              <Route path="/travel" element={<TravelPage />} />
            </Route>
            <Route element={<TouristHomePage loggedIn={true} />}>
              <Route path="/entertainment/:id" element={<GeneralGridView />} />
              <Route path="/shop/:id" element={<ProductGridView />} />
            </Route>
            <Route path="/signup" element={<SignupSelector />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/details/:id" element={<DetailsPage />} />
            <Route element={<SettingsView />}>
              <Route path="/user-settings/:id" element={<ProfileForm />} />
              <Route path="/user-settings/account/:id" element={<AccountForm />} />
            </Route>
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
            <Route path="/admin" element={<AdminHomepage />} />
            <Route path="/admin/categories" element={<CategoryView />} />
            <Route path="/admin/users" element={<UserView />} />
            <Route path="/admin/users/requests" element={<UsersPendingRequests />} />
            <Route path="/admin/products" element={<AdminProductsView />} />
            <Route path="seller/:id" element={<SellerView />} />
            <Route path="/admin" element={<AdminHomepage />} />
            <Route path="/admin/categories" element={<CategoryView />} />
            <Route path="/admin/users" element={<UserView />} />
            <Route path="/tour-guide/:id" element={<TourGuideView />} />
            <Route path="/admin/preference-tags" element={<PreferenceTagsAdminView />} />
            <Route path="/admin/complaints" element={<AdminComplaintsView />} />
            <Route path="/admin/itineraries" element={<AdminItinerariesView />} />            <Route path="/admin/activities" element={<AdminActivitiesView />} />

          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}
