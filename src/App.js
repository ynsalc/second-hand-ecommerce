import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar/Index";
import Home from "./pages/Home/Index";
import Products from "./pages/Products/Index";
import Footer from "./components/Footer/Index";
import ProductDetail from "./pages/ProductDetails/Index";
import Register from "./pages/Register/Index";
import Login from "./pages/Login/Index";
import NotFound from "./pages/404/Index";
import "./App.css";

function App() {
  const mainStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  };
  return (
    <div style={mainStyle}>
      <Router>
        <ToastContainer closeButton={false} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
