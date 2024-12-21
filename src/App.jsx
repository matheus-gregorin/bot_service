// Components
import Login from "./components/Login"

// Css
import "./App.css";

import Home from "./pages/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./useCases/privateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path="/" element={<Login />}/>

          <Route path="/home" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
