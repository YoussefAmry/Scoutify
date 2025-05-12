import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold',
              fontSize: '24px',
            }}
          >
            Scoutify
          </Typography>

          {/* Auth Buttons */}
          <Box>
            <Button
              component={Link}
              to="/signup"
              sx={{
                textTransform: 'none',
                color: 'text.secondary',
                mr: 2,
              }}
            >
              S'inscrire
            </Button>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              sx={{
                textTransform: 'none',
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.dark',
                },
              }}
            >
              S'identifier
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 