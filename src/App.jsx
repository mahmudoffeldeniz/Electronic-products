import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import React from "react";
import { Container } from "@mui/material";
import Header from "./Header";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import ProductPage from "./pages/Product";
import ContactPage from "./pages/Contact";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Footer from "./Companents/Footer";
import NotFound from "./Companents/404page";

function App() {
  return (
    <Router>
      <Container maxWidth="xl">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Container>
    </Router>
  );
}

export default App;
