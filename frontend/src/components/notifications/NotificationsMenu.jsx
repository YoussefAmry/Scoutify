import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Divider,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Person,
  SportsSoccer,
  Work,
  Circle as CircleIcon,
} from '@mui/icons-material';
import { useNotifications } from '../../context/NotificationsContext';
import { markNotificationAsRead, markAllNotificationsAsRead } from '../../services/notifications';
import { useAuth } from '../../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';

const getNotificationIcon = (type) => {
  switch (type) {
    case 'connection':
      return <Person />;
    case 'club':
      return <SportsSoccer />;
    case 'opportunity':
      return <Work />;
    default:
      return <NotificationsIcon />;
  }
};

const NotificationsMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { notifications, unreadCount } = useNotifications();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.read) {
      await markNotificationAsRead(notification.id);
    }
    if (notification.link) {
      navigate(notification.link);
    }
    handleClose();
  };

  const handleMarkAllAsRead = async () => {
    if (user) {
      await markAllNotificationsAsRead(user.uid);
    }
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 360, maxHeight: 480 },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Notifications</Typography>
          {unreadCount > 0 && (
            <Button size="small" onClick={handleMarkAllAsRead}>
              Mark all as read
            </Button>
          )}
        </Box>
        <Divider />
        {notifications.length === 0 ? (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography color="text.secondary">No notifications</Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {notifications.map((notification) => (
              <ListItem
                key={notification.id}
                button
                onClick={() => handleNotificationClick(notification)}
                sx={{
                  backgroundColor: notification.read ? 'inherit' : 'action.hover',
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {getNotificationIcon(notification.type)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={notification.title}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                        sx={{ display: 'block' }}
                      >
                        {notification.message}
                      </Typography>
                      <Typography
                        component="span"
                        variant="caption"
                        color="text.secondary"
                      >
                        {formatDistanceToNow(notification.createdAt.toDate(), { addSuffix: true })}
                      </Typography>
                    </>
                  }
                />
                {!notification.read && (
                  <CircleIcon
                    sx={{
                      color: 'primary.main',
                      fontSize: 12,
                      ml: 1,
                    }}
                  />
                )}
              </ListItem>
            ))}
          </List>
        )}
      </Menu>
    </>
  );
};

export default NotificationsMenu; 