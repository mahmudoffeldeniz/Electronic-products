import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ImBin2 } from "react-icons/im";
import { IoLocationSharp } from "react-icons/io5";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
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
  useMediaQuery,
  useTheme,
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
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

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

  // Filter component: search products
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  // Function to get link style: active links will be highlighted.
  const getLinkStyle = (path) => ({
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "20px",
    color: location.pathname === path ? "#1976d2" : "inherit",
    borderBottom: location.pathname === path ? "2px solid #1976d2" : "none",
    paddingBottom: "2px",
  });

  return (
    <>
      <Box sx={{ bgcolor: "transparent" }}>
        <Container maxWidth="xl">
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
                <span style={{ fontSize: "10px" }}>
                  221B Baker Street, London, UK
                </span>
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton>
                <FaInstagram size={15} />
              </IconButton>
              <IconButton>
                <FaFacebook size={15} />
              </IconButton>
              <IconButton>
                <FaTiktok size={15} />
              </IconButton>
            </Box>
          </Grid>
        </Container>
      </Box>

      {/* Home Header */}
      <AppBar
        position={isDesktop && scrolled ? "fixed" : "static"}
        color="inherit"
        elevation={0}
        sx={{
          borderRadius: "20px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ py: 1 }}>
            {/* Logo */}
            <Typography sx={{ fontWeight: "bold", flexGrow: 1 }}>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "red",
                  fontFamily: "cursive",
                  fontSize: "35px",
                  marginRight: "10px",
                  width: "50%",
                }}
              >
                Nexa
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
              <Link to="/" style={getLinkStyle("/")}>
                Home
              </Link>
              <Link to="/about" style={getLinkStyle("/about")}>
                About Us
              </Link>
              <Link to="/product" style={getLinkStyle("/product")}>
                Products
              </Link>
              <Link to="/contact" style={getLinkStyle("/contact")}>
                Contact Us
              </Link>
            </Box>

            {/* Search */}
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
              {showResults && searchTerm && (
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
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
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
                    ))
                  ) : (
                    <Box sx={{ padding: "8px", color: "gray" }}>Not Found</Box>
                  )}
                </Paper>
              )}
            </Box>

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

      {/* Mobile Menu */}
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
            <ListItemText
              primary="Home"
              primaryTypographyProps={{ fontSize: "20px", fontWeight: "bold" }}
              sx={location.pathname === "/" && { color: "#1976d2" }}
            />
          </ListItem>
          <ListItem button component={Link} to="/about" onClick={closeMenu}>
            <ListItemText
              primary="About Us"
              primaryTypographyProps={{ fontSize: "20px", fontWeight: "bold" }}
              sx={location.pathname === "/about" && { color: "#1976d2" }}
            />
          </ListItem>
          <ListItem button component={Link} to="/product" onClick={closeMenu}>
            <ListItemText
              primary="Products"
              primaryTypographyProps={{ fontSize: "20px", fontWeight: "bold" }}
              sx={location.pathname === "/product" && { color: "#1976d2" }}
            />
          </ListItem>
          <ListItem button component={Link} to="/contact" onClick={closeMenu}>
            <ListItemText
              primary="Contact Us"
              primaryTypographyProps={{ fontSize: "20px", fontWeight: "bold" }}
              sx={location.pathname === "/contact" && { color: "#1976d2" }}
            />
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
