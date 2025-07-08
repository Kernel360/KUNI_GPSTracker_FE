import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar.tsx";
import Home from "./Pages/Home/Home.tsx";
import Management from "./Pages/Management.tsx";
import DrivingLog from "./Pages/DrivingLog.tsx";
import LocationSearch from "./Pages/LocationSearch.tsx";

function App() {
  return (
    <Router>
      <div className="flex">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/location" element={<LocationSearch />}/>
          <Route path="/management" element={<Management />} />
          <Route path="/log" element={<DrivingLog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;