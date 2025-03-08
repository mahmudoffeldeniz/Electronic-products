import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../features/cartSlice';


import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProductList = () => {
  const products = useSelector((state) => state.products.items);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const isInCart = (id) => cartItems.some(item => item.id === id);

  const categories = ['All', ...new Set(products.map(product => product.category))];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setSnackbarMessage('Product added to cart');
    setOpenSnackbar(true);
  };


  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Products</h1>
      
      {/* Kateqoriyalar */}
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              margin: '2px',
              padding: '8px 12px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
              background: selectedCategory === category ? 'blue' : 'lightgray',
              color: selectedCategory === category ? 'white' : 'blue',
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Məhsulların siyahısı */}
      <div
        style={{
          display: 'grid',
          gap: '10px',
          gridTemplateColumns: 'repeat(auto-fill, minmax(212px, 1fr))',
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '10px',
              textAlign: 'center',
            }}
          >
               <Link to={`/products/${product.id}`} > <img className='img'
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: '200px', objectFit: 'contain' }}
            />
            <b>{product.name}</b>
            <p>{product.price} $</p>
        
             
              
           
              
            </Link>
            <button
              onClick={() => handleAddToCart(product)}
              disabled={isInCart(product.id)}
              style={{
                marginTop: '10px',
                background: isInCart(product.id) ? 'blue' : 'blue',
                color: 'white',
                border: 'none',
                padding: '8px',
                cursor: isInCart(product.id) ? 'not-allowed' : 'pointer',
                borderRadius: '5px',
                width: '100%'
              }}
            >
              {isInCart(product.id) ? 'Added' : 'Add to Cart'}
            </button>
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
        `}
      </style>

      {/* Bildirisler */}
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductList;
