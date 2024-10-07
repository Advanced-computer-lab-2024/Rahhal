import GeneralGridView from "./components/home-page/main-content-div/GeneralGridView.tsx"
import { QueryClient , QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DetailsPage from "./components/home-page/DetailsPage.tsx"
import TouristHomePage from "./TouristHomePage/TouristHomePage.tsx"
import SignupSelector from "./components/forms/SignupSelector.tsx"
import SettingsView from "@/components/user-settings/SettingsView";
import ProfileForm from "./components/user-settings/ProfileForm";
import AccountForm from "./components/user-settings/AccountForm";
export default function App() {
  const queryClient = new QueryClient ();
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<TouristHomePage loggedIn={false} />} />
          <Route path="/:id" element={<TouristHomePage loggedIn={true} />} />
          <Route path="/profile/:id" element={<></>} />
          <Route path="/signup" element={<SignupSelector />}/>
          <Route path="/signin" element={<></>} />
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="/user-settings/:id" element={<SettingsView />}>
            <Route index element={<ProfileForm />} />
            <Route path="account" element={<AccountForm />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
    </>
  )
}

