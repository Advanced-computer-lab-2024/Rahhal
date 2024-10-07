import GeneralGridView from "./components/home-page/main-content-div/GeneralGridView.tsx"
import { QueryClient , QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DetailsPage from "./components/home-page/DetailsPage.tsx"
import TouristHomePage from "./TouristHomePage/TouristHomePage.tsx"

export default function App() {
  const queryClient = new QueryClient ();
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<TouristHomePage loggedIn={false} />} />
          <Route path="/:id" element={<TouristHomePage loggedIn={true} />} />
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
    </>
  )
}

