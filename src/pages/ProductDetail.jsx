import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { toggleFavorite } from "../features/favoritesSlice";
import "../assets/ProductDetail.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const product = useSelector((state) =>
    state.products.items.find((item) => item.id === parseInt(productId))
  );
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();

  // Get recommended products from the same category (excluding the current product)
  const recommendedProducts = useSelector((state) =>
    state.products.items.filter(
      (item) =>
        product && item.category === product.category && item.id !== product.id
    )
  );

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  if (!product) {
    return (
      <div className="product-detail-container">
        <h2>No product found.</h2>
        <Link to="/">Back</Link>
      </div>
    );
  }

  const isFavorite = favorites.some((item) => item.id === product.id);

  return (
    <div className="product-detail-container">
      <Link to="/" className="back-link">
        ← Back
      </Link>
      <div className="product-detail-content">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-info">
          <h1>{product.name}</h1>
          <p>
            <strong>Price:</strong> {product.price} $
          </p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <div className="product-actions">
            <button
              onClick={() => dispatch(addToCart(product))}
              className="action-btn"
            >
              Add to Cart
            </button>
            <button
              onClick={() => dispatch(toggleFavorite(product))}
              className="action-btn"
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>

      {/* Creative Description Section */}
      <div className="description-section">
        <h3>Description</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure
          deleniti eaque ut mollitia sequi quaerat maxime dicta rem quidem harum
          vitae culpa voluptatem. Experience the innovative design and
          state-of-the-art features of this product.
        </p>
      </div>

      {/* Recommended Products Section */}
      <div className="recommended-section">
        <h3>More in {product.category}</h3>
        <div className="recommended-grid">
          {recommendedProducts.length > 0 ? (
            recommendedProducts.map((item) => (
              <Link
                key={item.id}
                to={`/products/${item.id}`}
                className="recommended-card"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="recommended-image"
                />
                <div className="recommended-info">
                  <p className="recommended-name">{item.name}</p>
                  <p className="recommended-price">{item.price} $</p>
                </div>
              </Link>
            ))
          ) : (
            <p>No other products found in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
