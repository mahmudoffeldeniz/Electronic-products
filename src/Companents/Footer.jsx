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
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5", py: 4, mt: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We are committed to providing the best electronic products. Our
              mission is to deliver quality and innovative solutions to our
              customers.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <MuiLink
              component={RouterLink}
              to="/"
              variant="body2"
              color="inherit"
              underline="hover"
              sx={{ display: "block", mb: 0.5 }}
            >
              Home
            </MuiLink>
            <MuiLink
              component={RouterLink}
              to="/about"
              variant="body2"
              color="inherit"
              underline="hover"
              sx={{ display: "block", mb: 0.5 }}
            >
              About
            </MuiLink>
            <MuiLink
              component={RouterLink}
              to="/contact"
              variant="body2"
              color="inherit"
              underline="hover"
              sx={{ display: "block", mb: 0.5 }}
            >
              Contact
            </MuiLink>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
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
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box textAlign="center" mt={3}>
          <hr />
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Electronic Products. All rights
            reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
