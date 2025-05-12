import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn,
  SportsSoccer,
  Group,
  FilterList,
} from '@mui/icons-material';

// Mock clubs data
const clubsData = [
  {
    id: 1,
    name: 'FC United Amateur',
    location: 'Manchester, UK',
    image: '',
    description: 'Community football club with strong youth development program.',
    positions: ['Striker', 'Midfielder'],
    level: 'Amateur',
    players: 45,
    openPositions: 3,
  },
  {
    id: 2,
    name: 'City Sports Academy',
    location: 'London, UK',
    image: '',
    description: 'Professional academy focused on developing young talent.',
    positions: ['Defender', 'Goalkeeper'],
    level: 'Semi-Pro',
    players: 32,
    openPositions: 2,
  },
  {
    id: 3,
    name: 'Athletic United',
    location: 'Liverpool, UK',
    image: '',
    description: 'Competitive amateur club with multiple age groups and teams.',
    positions: ['Winger', 'Forward'],
    level: 'Amateur',
    players: 38,
    openPositions: 4,
  },
];

const Clubs = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Search and Filter Section */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search clubs..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                sx={{ mr: 1 }}
              >
                Filter
              </Button>
              <Chip label="Amateur" onDelete={() => {}} />
              <Chip label="Semi-Pro" onDelete={() => {}} />
              <Chip label="Professional" onDelete={() => {}} />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Clubs Grid */}
      <Grid container spacing={3}>
        {clubsData.map((club) => (
          <Grid item xs={12} md={4} key={club.id}>
            <Card>
              <CardMedia
                component="div"
                sx={{
                  height: 140,
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SportsSoccer sx={{ fontSize: 60, color: 'white' }} />
              </CardMedia>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {club.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    {club.location}
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  {club.description}
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  {club.positions.map((position) => (
                    <Chip
                      key={position}
                      label={position}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Group sx={{ mr: 0.5 }} />
                    <Typography variant="body2">
                      {club.players} Players
                    </Typography>
                  </Box>
                  <Chip
                    label={`${club.openPositions} Open Positions`}
                    color="primary"
                    size="small"
                  />
                </Box>

                <Button variant="contained" fullWidth>
                  View Club
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Clubs; 