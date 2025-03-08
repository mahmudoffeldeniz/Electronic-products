import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { toggleFavorite } from '../features/favoritesSlice';
import '../assets/ProductDetail.css'; 

const ProductDetail = () => {
  const { productId } = useParams();
  const product = useSelector((state) =>
    state.products.items.find((item) => item.id === parseInt(productId))
  );
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();

  if (!product) {
    return (
      <div className="product-detail-container">
        <h2>No product found.</h2>
        <Link to="/">Back</Link>
      </div>
    );
  }

  const isFavorite = favorites.some(item => item.id === product.id);

  return (
    <div className="product-detail-container">
      <Link to="/" className="back-link">← Back</Link>
      <div className="product-detail-content">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
        <div className="product-info">
          <h1>{product.name}</h1>
          <p><strong>Price:</strong> {product.price} $</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <div className="product-actions">
            <button onClick={() => dispatch(addToCart(product))} className="action-btn">
              Add to Cart
            </button>
            <button onClick={() => dispatch(toggleFavorite(product))} className="action-btn">
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
