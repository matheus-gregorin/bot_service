// Components

// Css
import "./App.css";

// Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Lists from "./pages/Lists";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<Lists />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
