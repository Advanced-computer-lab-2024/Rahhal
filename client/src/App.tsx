import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DetailsPage from "./components/home-page/DetailsPage.tsx";
import TouristHomePage from "./TouristHomePage/TouristHomePage.tsx";
import SignupSelector from "./components/forms/SignupSelector.tsx";
import TourismGovernorView from "./components/non-tourist/tourist-governor/TourismGovernorView.tsx";
import AdvertiserView from "./components/non-tourist/advertiser/AdvertiserView.tsx";
import SettingsView from "@/components/user-settings/SettingsView";
import ProfileForm from "./components/user-settings/ProfileForm";
import AccountForm from "./components/user-settings/AccountForm";
import AdminHomepage from "./components/non-tourist/admin/AdminHomepage.tsx";
import UserView from "./components/non-tourist/admin/UserTable.tsx";
import CategoryView from "./components/non-tourist/admin/CategoriesTable.tsx";
import GeneralGridView from "./components/home-page/main-content-div/GeneralGridView.tsx";
import ProductGridView from "./components/home-page/Products-grid/ProductsGridView.tsx";
import TourGuideView from "./components/non-tourist/tour-guide/ItinerariesTable.tsx";
import { Login } from "./components/Login.tsx";
import PreferenceTagsAdminView from "./components/non-tourist/admin/PreferenceTagsTable.tsx";

import SellerView from "./components/non-tourist/seller/SellerView.tsx";
import TouristGovernerHomepage from "./components/non-tourist/tourist-governor/TouristGovernerHomepage.tsx";
import AdminProductsView from "./components/non-tourist/admin/AdminProductsView.tsx";

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
            <Route path="/admin" element={<AdminHomepage />} />
            <Route path="/admin/categories" element={<CategoryView />} />
            <Route path="/admin/users" element={<UserView />} />
            <Route path="/admin/products" element={<AdminProductsView />} />
            <Route path="/tour-guide" element={<TourGuideView />} />
            <Route path="seller/:id" element={<SellerView />} />
            <Route path="/admin" element={<AdminHomepage />} />
            <Route path="/admin/categories" element={<CategoryView />} />
            <Route path="/admin/users" element={<UserView />} />
            <Route path="/tour-guide" element={<TourGuideView />} />
            <Route path="/admin/preference-tags" element={<PreferenceTagsAdminView />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}
