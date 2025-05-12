import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Avatar,
  TextField,
  InputAdornment,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import {
  Search as SearchIcon,
  Work,
  LocationOn,
  AccessTime,
  MonetizationOn,
} from '@mui/icons-material';

// Mock job listings data
const jobListings = [
  {
    id: 1,
    title: 'Striker Needed - Semi-Pro Team',
    club: 'FC United Professional',
    recruiter: 'Sarah Thompson',
    recruiterTitle: 'Talent Scout',
    location: 'Manchester, UK',
    type: 'Semi-Professional',
    salary: '£500-1000/week',
    posted: '2 days ago',
    requirements: [
      'Minimum 3 years experience',
      'Strong scoring record',
      'Team player',
      'Available for training 4 days/week',
    ],
  },
  {
    id: 2,
    title: 'Youth Academy Coach',
    club: 'City Sports Academy',
    recruiter: 'James Wilson',
    recruiterTitle: 'Academy Director',
    location: 'London, UK',
    type: 'Full-Time',
    salary: 'Competitive',
    posted: '1 week ago',
    requirements: [
      'UEFA B License',
      '5+ years coaching experience',
      'Experience with youth development',
      'Strong communication skills',
    ],
  },
  {
    id: 3,
    title: 'Professional Goalkeeper',
    club: 'Athletic United',
    recruiter: 'Michael Brown',
    recruiterTitle: 'Head Scout',
    location: 'Liverpool, UK',
    type: 'Professional',
    salary: 'Based on experience',
    posted: '3 days ago',
    requirements: [
      'Professional experience required',
      'Strong leadership skills',
      'Excellent communication',
      'Available immediately',
    ],
  },
];

const Recruiters = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Search Section */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Search opportunities..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button variant="contained" fullWidth>
              Post New Opportunity
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Job Listings */}
      <Grid container spacing={3}>
        {jobListings.map((job) => (
          <Grid item xs={12} key={job.id}>
            <Card>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Typography variant="h5" gutterBottom>
                      {job.title}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Work sx={{ mr: 1 }} color="primary" />
                      <Typography variant="subtitle1" sx={{ mr: 2 }}>
                        {job.club}
                      </Typography>
                      <LocationOn sx={{ mr: 1 }} color="action" />
                      <Typography variant="subtitle1" color="text.secondary">
                        {job.location}
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Chip
                        label={job.type}
                        color="primary"
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <Chip
                        icon={<MonetizationOn />}
                        label={job.salary}
                        variant="outlined"
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <Chip
                        icon={<AccessTime />}
                        label={job.posted}
                        variant="outlined"
                        size="small"
                      />
                    </Box>

                    <Typography variant="subtitle2" gutterBottom>
                      Requirements:
                    </Typography>
                    <List dense>
                      {job.requirements.map((req, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={req} />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <ListItem alignItems="center">
                        <ListItemAvatar>
                          <Avatar>{job.recruiter[0]}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={job.recruiter}
                          secondary={job.recruiterTitle}
                        />
                      </ListItem>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                      >
                        Apply Now
                      </Button>
                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 1 }}
                      >
                        Message Recruiter
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Recruiters; 