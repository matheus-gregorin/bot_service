// Components
import Login from "./components/Login"

// Css
import "./App.css";

import Master from "./pages/Master";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path="/" element={<Login />}/>

          <Route path="/index" element={<Master />}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
