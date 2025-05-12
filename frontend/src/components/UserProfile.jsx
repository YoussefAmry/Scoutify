import React, { useState, useEffect } from 'react';
import { getMe } from '../services/api';
import { 
  CircularProgress, 
  Avatar, 
  Typography, 
  Box, 
  Chip, 
  Card, 
  CardContent, 
  Grid, 
  List, 
  ListItem, 
  ListItemText, 
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getMe();
        setUserData(response.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!userData) return <Typography>No user data found</Typography>;

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
      <Grid container spacing={3}>
        {/* Basic Info Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                <Avatar
                  src={userData.profileImage || ''}
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                <Typography variant="h5">{`${userData.firstName} ${userData.lastName}`}</Typography>
                <Typography variant="body1" color="textSecondary">{userData.position}</Typography>
                <Typography variant="body2">{userData.location}</Typography>
                {userData.age && (
                  <Typography variant="body2">Age: {userData.age}</Typography>
                )}
              </Box>
              <Typography variant="body1" sx={{ mt: 2 }}>{userData.bio}</Typography>

              {/* Skills Section for Players */}
              {userData.userType === 'player' && userData.skills && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" gutterBottom>Skills</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {userData.skills.map((skill, index) => (
                      <Chip key={index} label={skill} />
                    ))}
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Details Section */}
        <Grid item xs={12} md={8}>
          {/* Stats Section for Players */}
          {userData.userType === 'player' && userData.stats && (
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Statistics</Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Goals</TableCell>
                        <TableCell align="right">{userData.stats.goals}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Assists</TableCell>
                        <TableCell align="right">{userData.stats.assists}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Matches</TableCell>
                        <TableCell align="right">{userData.stats.matches}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          )}

          {/* Experience Section for Players */}
          {userData.userType === 'player' && userData.experience && (
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Experience</Typography>
                <List>
                  {userData.experience.map((exp, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
                        <ListItemText
                          primary={exp.team}
                          secondary={
                            <React.Fragment>
                              <Typography component="span" variant="body2" color="textPrimary">
                                {exp.role}
                              </Typography>
                              <br />
                              {exp.period}
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      {index < userData.experience.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}

          {/* Achievements */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Achievements</Typography>
              <List>
                {userData.achievements?.map((achievement, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={achievement.title}
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" color="textPrimary">
                            {achievement.description}
                          </Typography>
                          <br />
                          {new Date(achievement.date).toLocaleDateString()}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Additional Info based on User Type */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Professional Details</Typography>
              {userData.userType === 'player' && (
                <>
                  <Typography variant="subtitle1">Position: {userData.position}</Typography>
                </>
              )}
              {userData.userType === 'club' && (
                <>
                  <Typography variant="subtitle1">Club Name: {userData.clubName}</Typography>
                  <Typography variant="subtitle1">Club Type: {userData.clubType}</Typography>
                </>
              )}
              {userData.userType === 'recruiter' && (
                <>
                  <Typography variant="subtitle1">Organization: {userData.organization}</Typography>
                  <Typography variant="subtitle1">Role: {userData.role}</Typography>
                </>
              )}
            </CardContent>
          </Card>

          {/* Social Links */}
          {userData.socialLinks && Object.values(userData.socialLinks).some(link => link) && (
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Social Links</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {Object.entries(userData.socialLinks).map(([platform, link]) => (
                    link && (
                      <Chip
                        key={platform}
                        label={platform}
                        component="a"
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        clickable
                      />
                    )
                  ))}
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile; 