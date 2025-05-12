import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Divider,
} from '@mui/material';
import {
  SportsSoccer as SportsIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import SearchDialog from './SearchDialog';
import NotificationsMenu from '../notifications/NotificationsMenu';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      handleClose();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <SportsIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 0, textDecoration: 'none', color: 'inherit' }}>
            SportConnect
          </Typography>

          {user ? (
            <>
              <Box sx={{ flexGrow: 1, display: 'flex', gap: 2, ml: 4 }}>
                <Button color="inherit" component={RouterLink} to="/feed">
                  Feed
                </Button>
                <Button color="inherit" component={RouterLink} to="/clubs">
                  Clubs
                </Button>
                <Button color="inherit" component={RouterLink} to="/recruiters">
                  Recruiters
                </Button>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton color="inherit" onClick={() => setSearchOpen(true)}>
                  <SearchIcon />
                </IconButton>
                <NotificationsMenu />
                <IconButton
                  onClick={handleMenu}
                  color="inherit"
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {user.profile?.firstName?.[0] || user.email[0].toUpperCase()}
                  </Avatar>
                </IconButton>
              </Box>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem component={RouterLink} to="/profile" onClick={handleClose}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={RouterLink}
                to="/register"
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <SearchDialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
};

export default Navbar; 