import GeneralGridView from "./components/home-page/main-content-div/GeneralGridView.tsx"
import { QueryClient , QueryClientProvider } from '@tanstack/react-query'
export default function App() {
  const queryClient = new QueryClient ();
  return (
    <>
    <QueryClientProvider client={queryClient}>
    <GeneralGridView/>
    </QueryClientProvider>
    </>
  )
}

export default App;
