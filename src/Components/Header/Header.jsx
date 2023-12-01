import * as React from "react";
import {
  Box,
  Drawer,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Menu,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { signout } from "../../Auth";

const pages = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Product", path: "/product" },
  { name: "Contact Us", path: "/contact" },
];

const Header = () => {
  const token = localStorage.getItem("jwtToken")
    ? localStorage.getItem("jwtToken")
    : null;

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [showNavLinks, setShowNavLinks] = React.useState(null);
  const [logo, setLogo] = React.useState();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isMobileNavLinkOpen = Boolean(showNavLinks);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileNavLinksClose = () => {
    setShowNavLinks(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileNavLinkOpen = (event) => {
    setShowNavLinks(event.currentTarget);
  };

  const getLogo = async () => {
    // console.log(import.meta.env.VITE_BASE_URL);
    const logoData = await axios.get("/api/config");
    setLogo(logoData?.data?.result[0]?.logo[0]);
  };

  React.useEffect(() => {
    getLogo();
  }, []);

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {token ? (
        <>
          <MenuItem
            onClick={() => {
              signout();
              handleMenuClose();
            }}
          >
            Sign Out
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/account");
              handleMenuClose();
            }}
          >
            Account
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem
            onClick={() => {
              navigate("/signup");
              handleMenuClose();
            }}
          >
            Sign Up
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/signin");
              handleMenuClose();
            }}
          >
            Sign In
          </MenuItem>
        </>
      )}
    </Menu>
  );

  const renderMobileNavLink = (
    <Drawer
      anchor="left"
      open={isMobileNavLinkOpen}
      onClose={handleMobileNavLinksClose}
    >
      <div
        style={{
          width: 250,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {pages.map((page) => (
          <MenuItem key={page.name} sx={{ textAlign: "center" }}>
            <NavLink
              to={page.path}
              style={{
                textDecoration: "none",
                width: "100%",
              }}
            >
              <Typography
                variant="body1"
                style={{
                  fontFamily: "Space Grotesk",
                  color: "#141718",
                  fontWeight: "bold",
                }}
              >
                {page.name}
              </Typography>
            </NavLink>
          </MenuItem>
        ))}
      </div>
    </Drawer>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      token
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton size="large">
          <AccountCircle />
        </IconButton>
        {token ? (
          <Typography>Account / Sign Out</Typography>
        ) : (
          <Typography>Sign Up/ Sign In</Typography>
        )}
      </MenuItem>
      <MenuItem>
        <IconButton size="large">
          <Badge>
            <LocalMallIcon />
          </Badge>
        </IconButton>
        <Typography
          onClick={() => {
            navigate("/cart");
            handleMobileMenuClose();
          }}
        >
          Cart
        </Typography>
      </MenuItem>
    </Menu>
  );

  const renderLogo = () => {
    if (logo) {
      return (
        <img
          src={logo.Headerlogo}
          alt="Logo"
          style={{ height: "40px", width: "auto", marginRight: "10px" }}
        />
      );
    } else {
      return (
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            color: "#141718",
            fontFamily: "Poppins",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          3legant.
        </Typography>
      );
    }
  };

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        {/* <AppBar position="static" sx={{ background: "#fff" }}> */}
        <Toolbar disableGutters={true} sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleMobileNavLinkOpen}
              sx={{ color: "#141718" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            {renderLogo()}
          </Link>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Typography sx={{ display: "flex", flexGrow: 1 }}>
              {pages.map((page) => (
                <NavLink
                  activeClassName={({ isActive }) => (isActive ? "active" : "")}
                  key={page.name}
                  to={page.path}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Typography
                    noWrap
                    sx={{
                      ml: 5,
                      fontFamily: "Space Grotesk",
                      color: "#141718",
                      fontWeight: "bold",
                    }}
                  >
                    {page.name}
                  </Typography>
                </NavLink>
              ))}
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large" sx={{ color: "#141718" }}>
              <Badge>
                <SearchIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              onClick={handleProfileMenuOpen}
              sx={{ color: "#141718" }}
            >
              <AccountCircle />
            </IconButton>
            <Link to="/cart">
              <IconButton size="large" sx={{ color: "#141718" }}>
                <Badge>
                  <LocalMallIcon />
                </Badge>
              </IconButton>
            </Link>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleMobileMenuOpen}
              sx={{ color: "#141718" }}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
        {/* </AppBar> */}
        {renderMobileMenu}
        {renderMenu}
        {renderMobileNavLink}
      </Box>
    </Container>
  );
};

export default Header;
