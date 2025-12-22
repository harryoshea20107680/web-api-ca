import React, { useState, useMemo, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate, Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../../main";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { AuthContext } from "../../contexts/authContext";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {

  const auth = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { toggle } = useContext(ColorModeContext); 
  const navigate = useNavigate();

  const closeMenu = () => setAnchorEl(null);

  const menuOptions = useMemo(() => {
    
  const publicRoutes =[
    { label: "Home", path: "/" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Trending", path: "/movies/trending" },
    { label: "Popular", path: "/movies/popular" },
    { label: "Top Rated", path: "/movies/top_rated" },
    { label: "Now Playing", path: "/movies/now_playing" },
    { label: "Favorites", path: "/movies/favorites" },
  ];

  if (auth?.isAuthenticated) {
    return [
      ...publicRoutes,
      {label: "Profile", path: "/profile", authRequired: true}, 
    ];
  }

  return [ 
    ...publicRoutes, 
    { label: "Login", path: "/login"},
    { label: "Sign Up", path: "/signup"}, 
  ];
  }, [auth?.isAuthenticated]);


  const handleMenuSelect = (opt) => {
    closeMenu();

    if (opt.authRequired && !auth?.isAuthenticated) {
      navigate("/login", { state: { from: opt.path } });
      return;
    }

    navigate(opt.path);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSignOut = () => {
    auth.signout();
    closeMenu();
    navigate("/");
  };

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700 }}>
            <Box component={Link} to="/" sx={{ color: "inherit", textDecoration: "none" }}>
            TMDB CLient
            </Box>
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            All you ever wanted to know about Movies!
          </Typography>

          <IconButton color="inherit" aria-label="toggle dark mode" onClick={toggle}>
            {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          {auth?.isAuthenticated && (
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1 }}>
              <Typography variant="body2" sx={{ mr: 1 }}>
                Welcome {auth.userName}!
              </Typography>

              <Button color="inherit" onClick={handleSignOut}>
                Sign out
              </Button>
            </Box>
          )}

            {isMobile ? (
              <>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
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
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {menuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                {auth?.isAuthenticated && (
                  <>
                    <Divider />
                    <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
                  </>
                )}
              </Menu>
            </>
            ) : (
              <>
                {menuOptions.map((opt) => (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </>
            )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;