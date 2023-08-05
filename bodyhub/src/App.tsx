import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Calculation from "./pages/Calculation";
import About from "./pages/About";
import Result from "./components/Result";
import HistoryPage from "./pages/HistoryPage";
import { AuthProvider } from "./AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/calculation" element={<Calculation />} />
          <Route path="About" element={<About />} />
          <Route path="/result" element={<Result />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
