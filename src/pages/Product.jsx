import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../features/cartSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "../assets/ProductDetail.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProductList = () => {
  const products = useSelector((state) => state.products.items);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const isInCart = (id) => cartItems.some((item) => item.id === id);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setSnackbarMessage("Product added to cart!");
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  return (
    <div style={{ padding: "40px", minHeight: "100vh" }}>
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1
          style={{
            color: "#333",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          Products
        </h1>
        <div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                margin: "5px",
                padding: "10px 15px",
                borderRadius: "20px",
                fontWeight: "600",
                border: "2px solid #ccc",
                background:
                  selectedCategory === category ? "#1976d2" : "transparent",
                color: selectedCategory === category ? "#fff" : "#1976d2",
                transition: "background 0.3s, color 0.3s",
                cursor: "pointer",
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              background: "#fff",
              borderRadius: "15px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              overflow: "hidden",
              transition: "transform 0.2s",
            }}
            className="creative-card"
          >
            <Link
              to={`/products/${product.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div style={{ padding: "15px", textAlign: "center" }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                    marginBottom: "10px",
                  }}
                />
                <h3
                  style={{
                    fontSize: "1.1rem",
                    margin: "10px 0",
                    color: "#333",
                  }}
                >
                  {product.name}
                </h3>
                <p style={{ fontWeight: "bold", color: "#1976d2" }}>
                  {product.price} $
                </p>
              </div>
            </Link>
            <div
              style={{
                textAlign: "center",
                padding: "10px 0",
                background: "#f1f1f1",
              }}
            >
              <button
                onClick={() => handleAddToCart(product)}
                disabled={isInCart(product.id)}
                style={{
                  background: "aqua",
                  color: "red",
                  border: "0.5px solid #ccc",
                  padding: "10px 20px",
                  cursor: isInCart(product.id) ? "not-allowed" : "pointer",
                  borderRadius: "20px",
                  transition: "background 0.3s",
                  opacity: "1",
                }}
              >
                {isInCart(product.id) ? "Added" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          @media (min-width: 768px) {
            div[style*="grid"] {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (min-width: 900px) {
            div[style*="grid"] {
              grid-template-columns: repeat(4, 1fr);
            }
          }
          .creative-card:hover {
            transform: translateY(-5px);
          }
        `}
      </style>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductList;
