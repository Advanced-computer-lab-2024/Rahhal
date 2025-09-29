import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./index.css";
import { Toaster } from "@/components/ui/toaster";
import axios from "axios";

axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster />
  </>,
);
