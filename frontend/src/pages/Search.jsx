import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
} from '@mui/material';
import {
  Person,
  SportsSoccer,
  Work,
  LocationOn,
} from '@mui/icons-material';
import { searchUsers, searchClubs, searchOpportunities } from '../services/search';

const TabPanel = ({ children, value, index }) => (
  <div hidden={value !== index} role="tabpanel">
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState({
    users: [],
    clubs: [],
    opportunities: [],
  });

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const [users, clubs, opportunities] = await Promise.all([
          searchUsers(query),
          searchClubs(query),
          searchOpportunities(query),
        ]);
        setResults({ users, clubs, opportunities });
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderUserResults = () => (
    <Grid container spacing={3}>
      {results.users.map((user) => (
        <Grid item xs={12} md={6} key={user.id}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ mr: 2 }}>
                  {user.firstName[0]}
                </Avatar>
                <Box>
                  <Typography variant="h6">
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.userType === 'player' ? user.position : user.role}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOn fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">{user.location}</Typography>
              </Box>
              <Button variant="contained" fullWidth>
                View Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderClubResults = () => (
    <Grid container spacing={3}>
      {results.clubs.map((club) => (
        <Grid item xs={12} md={6} key={club.id}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                  <SportsSoccer />
                </Avatar>
                <Box>
                  <Typography variant="h6">{club.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {club.clubType}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOn fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">{club.location}</Typography>
              </Box>
              <Button variant="contained" fullWidth>
                View Club
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderOpportunityResults = () => (
    <Grid container spacing={3}>
      {results.opportunities.map((opportunity) => (
        <Grid item xs={12} key={opportunity.id}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {opportunity.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Work fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2" sx={{ mr: 2 }}>
                  {opportunity.club}
                </Typography>
                <LocationOn fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">
                  {opportunity.location}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Chip
                  label={opportunity.type}
                  color="primary"
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Chip
                  label={opportunity.salary}
                  variant="outlined"
                  size="small"
                />
              </Box>
              <Button variant="contained">
                View Opportunity
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Search Results for "{query}"
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab
            icon={<Person />}
            label={`Players (${results.users.length})`}
          />
          <Tab
            icon={<SportsSoccer />}
            label={`Clubs (${results.clubs.length})`}
          />
          <Tab
            icon={<Work />}
            label={`Opportunities (${results.opportunities.length})`}
          />
        </Tabs>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TabPanel value={activeTab} index={0}>
            {renderUserResults()}
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            {renderClubResults()}
          </TabPanel>
          <TabPanel value={activeTab} index={2}>
            {renderOpportunityResults()}
          </TabPanel>
        </>
      )}
    </Container>
  );
};

export default Search; 