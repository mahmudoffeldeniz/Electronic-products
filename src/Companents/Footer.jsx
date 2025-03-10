import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Link as MuiLink,
  IconButton,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import { FaTiktok } from "react-icons/fa";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        py: 4,
        mt: 4,
        borderRadius: "20px 20px 0 0 ",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <center>
              <Typography variant="h6" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body2" color="text.secondary" width={350}>
                We are committed to providing the best electronic products. Our
                mission is to deliver quality and innovative solutions to our
                customers.
              </Typography>
            </center>
          </Grid>
          <Grid item xs={12} md={4}>
            <center>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <MuiLink
                component={RouterLink}
                to="/about"
                variant="body2"
                color="blue"
                underline="hover"
                sx={{ display: "block", mb: 0.5 }}
              >
                About Us
              </MuiLink>
              <MuiLink
                component={RouterLink}
                to="/product"
                variant="body2"
                color="blue"
                underline="hover"
                sx={{ display: "block", mb: 0.5 }}
              >
                Products
              </MuiLink>
              <MuiLink
                component={RouterLink}
                to="/contact"
                variant="body2"
                color="bule"
                underline="hover"
                sx={{ display: "block", mb: 0.5 }}
              >
                Contact Us
              </MuiLink>
            </center>
          </Grid>

          <Grid item xs={12} md={4}>
            <center>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Box>
                <IconButton
                  component="a"
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="inherit"
                >
                  <FaTiktok />
                </IconButton>
              </Box>
            </center>
          </Grid>
        </Grid>

        <Box textAlign="center" mt={3}>
          <hr />
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Nexa. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
