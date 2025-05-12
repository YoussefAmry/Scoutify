import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
} from '@mui/material';
import {
  Search as SearchIcon,
  Close as CloseIcon,
  Person,
  SportsSoccer,
  Work,
} from '@mui/icons-material';

const SearchDialog = ({ open, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      onClose();
      setSearchTerm('');
    }
  };

  const quickLinks = [
    { icon: <Person />, text: 'Find Players', query: 'players' },
    { icon: <SportsSoccer />, text: 'Browse Clubs', query: 'clubs' },
    { icon: <Work />, text: 'View Opportunities', query: 'opportunities' },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          position: 'fixed',
          top: 20,
        },
      }}
    >
      <DialogContent>
        <form onSubmit={handleSearch}>
          <TextField
            autoFocus
            fullWidth
            placeholder="Search players, clubs, or opportunities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setSearchTerm('')}
                  >
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>

        {!searchTerm && (
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mb: 1, pl: 2 }}
            >
              Quick Links
            </Typography>
            <List>
              {quickLinks.map((link, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => {
                    navigate(`/search?q=${link.query}`);
                    onClose();
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {link.icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={link.text} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog; 