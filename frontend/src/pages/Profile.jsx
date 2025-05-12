import {
  Container,
  Grid,
  Paper,
  Avatar,
  Typography,
  Box,
  Chip,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Edit as EditIcon,
  SportsSoccer,
  EmojiEvents,
  Speed,
  FitnessCenter,
  Group,
  LocationOn,
} from '@mui/icons-material';

// Mock user data
const userData = {
  name: 'Alex Johnson',
  position: 'Forward',
  age: 22,
  location: 'Manchester, UK',
  avatar: '',
  bio: 'Passionate striker with 5 years of amateur experience. Looking for new opportunities to grow and compete.',
  stats: {
    goals: 45,
    assists: 23,
    matches: 67,
  },
  skills: ['Shooting', 'Dribbling', 'Speed', 'Team Play', 'Headers'],
  achievements: [
    'Regional Cup Winner 2023',
    'Top Scorer - Amateur League 2022',
    'Player of the Month - March 2023',
  ],
  experience: [
    {
      team: 'Manchester United Amateur',
      period: '2021 - Present',
      role: 'Forward',
    },
    {
      team: 'City Youth Academy',
      period: '2018 - 2021',
      role: 'Forward/Winger',
    },
  ],
};

const Profile = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Left Column - Main Info */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                margin: '0 auto 16px',
                bgcolor: 'primary.main',
              }}
            >
              {userData.name[0]}
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {userData.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {userData.position} • {userData.age} years
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <LocationOn fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {userData.location}
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              {userData.bio}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              sx={{ mt: 2 }}
            >
              Edit Profile
            </Button>
          </Paper>

          {/* Skills Section */}
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Skills
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {userData.skills.map((skill) => (
                <Chip key={skill} label={skill} />
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Right Column - Stats & History */}
        <Grid item xs={12} md={8}>
          {/* Stats Cards */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={4}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <SportsSoccer color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h4">{userData.stats.goals}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Goals
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Speed color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h4">{userData.stats.assists}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Assists
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <FitnessCenter color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h4">{userData.stats.matches}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Matches
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Achievements Section */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Achievements
            </Typography>
            <List>
              {userData.achievements.map((achievement, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <EmojiEvents color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={achievement} />
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Experience Section */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Experience
            </Typography>
            <List>
              {userData.experience.map((exp, index) => (
                <>
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Group color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={exp.team}
                      secondary={
                        <>
                          <Typography component="span" variant="body2">
                            {exp.role}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2" color="text.secondary">
                            {exp.period}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  {index < userData.experience.length - 1 && <Divider />}
                </>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile; 