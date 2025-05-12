import React from 'react';
import { Box, Container, Typography, Button, Grid, Paper, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import MicrosoftIcon from '@mui/icons-material/Window';
import EmailIcon from '@mui/icons-material/Email';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import GroupsIcon from '@mui/icons-material/Groups';
import SearchIcon from '@mui/icons-material/Search';

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  padding: '12px',
  marginBottom: '12px',
  textTransform: 'none',
  fontSize: '16px',
  borderRadius: '8px',
  '&:hover': {
    transform: 'translateY(-2px)',
    transition: 'transform 0.2s',
  },
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  height: '100%',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[4],
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
  padding: theme.spacing(2),
  display: 'inline-flex',
  marginBottom: theme.spacing(2),
  color: 'white',
}));

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          minHeight: '600px',
          py: { xs: 8, md: 12 },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '32px', md: '56px' },
                  fontWeight: 700,
                  mb: 2,
                  color: 'white',
                }}
              >
                Découvrez votre prochain talent sportif
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 300,
                }}
              >
                La plateforme qui connecte les joueurs, clubs et recruteurs dans un écosystème sportif unique.
              </Typography>
              <Box sx={{ maxWidth: 400 }}>
                <StyledButton
                  variant="contained"
                  startIcon={<GoogleIcon />}
                  sx={{ 
                    bgcolor: '#ffffff',
                    color: '#4285f4',
                    '&:hover': { 
                      bgcolor: '#f5f5f5',
                    }
                  }}
                >
                  Continuer avec Google
                </StyledButton>
                <StyledButton
                  variant="contained"
                  startIcon={<MicrosoftIcon />}
                  sx={{ 
                    bgcolor: '#2b2b2b',
                    color: '#ffffff',
                    '&:hover': { 
                      bgcolor: '#1e1e1e',
                    }
                  }}
                >
                  Continuer avec Microsoft
                </StyledButton>
                <StyledButton
                  variant="outlined"
                  startIcon={<EmailIcon />}
                  sx={{ 
                    color: '#ffffff',
                    borderColor: '#ffffff',
                    '&:hover': {
                      borderColor: '#e3f2fd',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  S'identifier avec une adresse e-mail
                </StyledButton>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '28px', md: '40px' },
              fontWeight: 700,
              textAlign: 'center',
              mb: 6,
              color: '#1a237e',
            }}
          >
            Ce que nous offrons
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <FeatureCard>
                <IconWrapper>
                  <SportsSoccerIcon fontSize="large" />
                </IconWrapper>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  Pour les Joueurs
                </Typography>
                <Typography color="text.secondary">
                  Développez votre carrière sportive en vous connectant avec des clubs et des recruteurs. 
                  Mettez en valeur vos compétences et réalisations.
                </Typography>
              </FeatureCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard>
                <IconWrapper>
                  <GroupsIcon fontSize="large" />
                </IconWrapper>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  Pour les Clubs
                </Typography>
                <Typography color="text.secondary">
                  Trouvez les meilleurs talents pour renforcer votre équipe. 
                  Gérez vos opportunités et connectez-vous avec des joueurs prometteurs.
                </Typography>
              </FeatureCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <FeatureCard>
                <IconWrapper>
                  <SearchIcon fontSize="large" />
                </IconWrapper>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  Pour les Recruteurs
                </Typography>
                <Typography color="text.secondary">
                  Accédez à une base de données complète de talents sportifs. 
                  Simplifiez votre processus de recrutement.
                </Typography>
              </FeatureCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#1a237e', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Notre Plateforme
              </Typography>
              <Typography component="div">
                <Box component="a" href="#" sx={{ display: 'block', mb: 1, color: 'inherit', textDecoration: 'none', '&:hover': { color: '#e3f2fd' } }}>
                  À propos
                </Box>
                <Box component="a" href="#" sx={{ display: 'block', mb: 1, color: 'inherit', textDecoration: 'none', '&:hover': { color: '#e3f2fd' } }}>
                  Carrières
                </Box>
                <Box component="a" href="#" sx={{ display: 'block', mb: 1, color: 'inherit', textDecoration: 'none', '&:hover': { color: '#e3f2fd' } }}>
                  Actualités
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Communauté
              </Typography>
              <Typography component="div">
                <Box component="a" href="#" sx={{ display: 'block', mb: 1, color: 'inherit', textDecoration: 'none', '&:hover': { color: '#e3f2fd' } }}>
                  Joueurs
                </Box>
                <Box component="a" href="#" sx={{ display: 'block', mb: 1, color: 'inherit', textDecoration: 'none', '&:hover': { color: '#e3f2fd' } }}>
                  Clubs
                </Box>
                <Box component="a" href="#" sx={{ display: 'block', mb: 1, color: 'inherit', textDecoration: 'none', '&:hover': { color: '#e3f2fd' } }}>
                  Recruteurs
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Légal
              </Typography>
              <Typography component="div">
                <Box component="a" href="#" sx={{ display: 'block', mb: 1, color: 'inherit', textDecoration: 'none', '&:hover': { color: '#e3f2fd' } }}>
                  Confidentialité
                </Box>
                <Box component="a" href="#" sx={{ display: 'block', mb: 1, color: 'inherit', textDecoration: 'none', '&:hover': { color: '#e3f2fd' } }}>
                  Conditions
                </Box>
                <Box component="a" href="#" sx={{ display: 'block', mb: 1, color: 'inherit', textDecoration: 'none', '&:hover': { color: '#e3f2fd' } }}>
                  Cookies
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Support
              </Typography>
              <Typography component="div">
                <Box component="a" href="#" sx={{ display: 'block', mb: 1, color: 'inherit', textDecoration: 'none', '&:hover': { color: '#e3f2fd' } }}>
                  Aide
                </Box>
                <Box component="a" href="#" sx={{ display: 'block', mb: 1, color: 'inherit', textDecoration: 'none', '&:hover': { color: '#e3f2fd' } }}>
                  Contact
                </Box>
                <Box component="a" href="#" sx={{ display: 'block', mb: 1, color: 'inherit', textDecoration: 'none', '&:hover': { color: '#e3f2fd' } }}>
                  FAQ
                </Box>
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ mt: 6, pt: 3, borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              © {new Date().getFullYear()} Scoutify. Tous droits réservés.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 