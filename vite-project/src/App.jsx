import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";

import Signup from "./components/Signup.jsx";
import Home from "./components/Home.jsx";
import "./index.css";

import Homescr from "./components/Homescr.jsx";
import Dashboard from "./components/Dashboard.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Homescr" element={<Homescr />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
<div></div>;
