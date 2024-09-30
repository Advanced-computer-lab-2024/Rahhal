import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EntertainmentCard from "@/components/entertainment-card/EntertainmentCard";
import Pyramid from "./assets/pyramids.webp";
import felluca from "./assets/aswan2.webp";
import ski from "./assets/ski egypt.jpg";
import NonTouristView from "@/components/non-tourist/NonTouristView";

import "./App.css";

function TouristAttractions() {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
      <div>
        <EntertainmentCard
          image={Pyramid}
          rating={5}
          title={"Great Pyramids Of Giza"}
          location="Giza"
          price={200}
          openingTime="Sunday-Saturday 7AM-5PM"
        />
      </div>

      <div>
        <EntertainmentCard
          image={ski}
          rating={4.8}
          title={"Ski Egypt"}
          location={"6th Of October"}
          price={200}
          availability={true}
        />
      </div>
      <div>
        <EntertainmentCard
          image={felluca}
          rating={4.3}
          title={"Felluca Ride in Nile Aswan"}
          location="Aswan"
          price={300}
          language={["English", "Arabic", "Italian"]}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App;
