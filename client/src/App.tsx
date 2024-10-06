import GeneralGridView from "./components/home-page/main-content-div/GeneralGridView.tsx"
import { QueryClient , QueryClientProvider } from '@tanstack/react-query'
export default function App() {
  const queryClient = new QueryClient ();
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Define the routes for the app */}
          <Route path="/" element={<GeneralGridView />} />
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
    </>
  )
}

export default App;
