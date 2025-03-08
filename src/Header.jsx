import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImBin2 } from "react-icons/im";
import { IoLocationSharp } from "react-icons/io5";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Badge,
  Container,
  Grid,
  Divider,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import {
  Search,
  Favorite,
  AccountCircle,
  ShoppingCart,
  Menu,
  Close,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "./features/cartSlice";
import { toggleFavorite } from "./features/favoritesSlice";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const cart = useSelector((state) => state.cart);
  const favorites = useSelector((state) => state.favorites.items);
  const products = useSelector((state) => state.products.items);
  const dispatch = useDispatch();

  const cartCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  const favoritesCount = favorites.length;

  const openDrawer = (type) => {
    setDrawerType(type);
    setDrawerOpen(true);
  };

  // Filtrlənmiş məhsullar
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProductClick = (productId) => {
    setSearchTerm("");
    setShowResults(false);
    navigate(`/products/${productId}`);
  };

  const CartContent = () => (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Cart</Typography>
      {cart.items.length === 0 ? (
        <Typography variant="body2">Cart is empty.</Typography>
      ) : (
        <>
          <List>
            {cart.items.map(({ product, quantity }) => (
              <ListItem key={product.id}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: 50,
                    height: 50,
                    marginRight: 10,
                    borderRadius: 5,
                  }}
                />
                <ListItemText
                  primary={product.name}
                  secondary={`Price: ${product.price} $ x ${quantity}`}
                />
                <Box>
                  <IconButton
                    size="small"
                    onClick={() => dispatch(increaseQuantity(product.id))}
                  >
                    +
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => dispatch(decreaseQuantity(product.id))}
                  >
                    -
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => dispatch(removeFromCart(product.id))}
                  >
                    <ImBin2 />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Total: {cart.totalPrice.toFixed(2)} $
          </Typography>
        </>
      )}
    </Box>
  );

  const FavoritesContent = () => (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Favorites</Typography>
      {favorites.length === 0 ? (
        <Typography variant="body2">No favorites added.</Typography>
      ) : (
        <List>
          {favorites.map((product) => (
            <ListItem key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: 50,
                  height: 50,
                  marginRight: 10,
                  borderRadius: 5,
                }}
              />
              <ListItemText
                primary={product.name}
                secondary={`${product.price} $`}
              />
              <IconButton
                size="small"
                onClick={() => dispatch(toggleFavorite(product))}
              >
                <ImBin2 />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );

  return (
    <>
      <Box sx={{ bgcolor: "grey.100", py: 1 }}>
        <Container maxWidth="lg">
          <Grid container alignItems="center" justifyContent="space-between">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ display: { xs: "block", md: "none" } }}>
                <IconButton edge="start" color="inherit" onClick={toggleMenu}>
                  <Menu />
                </IconButton>
              </Box>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, display: { xs: "none", md: "block" } }}
              >
                <IoLocationSharp size={15} />
                <span style={{ fontSize: "12px" }}>
                  {" "}
                  221B Baker Street, London, UK
                </span>
              </Typography>
            </Box>
            <Box>
              <AccountCircle sx={{ fontSize: 22 }} />
            </Box>
          </Grid>
        </Container>
      </Box>

      <Divider />

      {/* Menu */}
      <AppBar position="static" color="inherit" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 1 }}>
            {/* Logo */}
            <Typography variant="h6" sx={{ fontWeight: "bold", flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                Electronic products
              </Link>
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                gap: 3,
              }}
            >
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                Home
              </Link>
              <Link
                to="/about"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                About
              </Link>
              <Link
                to="/contact"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Contact
              </Link>
            </Box>

            {/* Search icon and input */}
            <Box sx={{ position: "relative" }} ref={searchRef}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "grey.200",
                  borderRadius: 1,
                  ml: { xs: 0, md: 2 },
                  px: 1,
                  py: 0.5,
                  width: { xs: "100%", md: "auto" },
                  mt: { xs: 2, md: 0 },
                }}
              >
                <IconButton size="small">
                  <Search />
                </IconButton>
                <InputBase
                  placeholder="Search…"
                  sx={{ ml: 1, flex: 1 }}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowResults(true);
                  }}
                  onFocus={() => setShowResults(true)}
                />
              </Box>
              {showResults && searchTerm && filteredProducts.length > 0 && (
                <Paper
                  sx={{
                    position: "absolute",
                    top: "40px",
                    left: 0,
                    right: 0,
                    maxHeight: "300px",
                    overflowY: "auto",
                    zIndex: 10,
                  }}
                >
                  {filteredProducts.map((product) => (
                    <Box
                      key={product.id}
                      sx={{
                        padding: "8px",
                        cursor: "pointer",
                        borderBottom: "1px solid #eee",
                        "&:hover": { backgroundColor: "#f5f5f5" },
                      }}
                      onClick={() => handleProductClick(product.id)}
                    >
                      {product.name}
                    </Box>
                  ))}
                </Paper>
              )}
            </Box>

            {/* Right icons */}
            <Box sx={{ display: "flex", alignItems: "center", ml: 2, gap: 1 }}>
              <IconButton onClick={() => openDrawer("favorites")}>
                <Badge badgeContent={favoritesCount} color="secondary">
                  <Favorite />
                </Badge>
              </IconButton>
              <IconButton onClick={() => openDrawer("cart")}>
                <Badge badgeContent={cartCount} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobil Menu */}
      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={closeMenu}
        sx={{
          "& .MuiDrawer-paper": {
            width: "50%",
            height: "100%",
            bgcolor: "white",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <IconButton onClick={closeMenu}>
            <Close />
          </IconButton>
        </Box>
        <List sx={{ textAlign: "center" }}>
          <ListItem button component={Link} to="/" onClick={closeMenu}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/about" onClick={closeMenu}>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button component={Link} to="/contact" onClick={closeMenu}>
            <ListItemText primary="Contact" />
          </ListItem>
        </List>
      </Drawer>

      {/* Drawer (Cart / Favorites) */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            minWidth: "25%",
            height: "100%",
            bgcolor: "white",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <Close />
          </IconButton>
        </Box>
        {drawerType === "cart" ? <CartContent /> : <FavoritesContent />}
      </Drawer>
    </>
  );
}

export default Header;
