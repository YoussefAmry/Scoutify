import { useState } from 'react';
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  TextField,
  Button,
  Box,
  Paper,
  Divider,
} from '@mui/material';
import {
  Favorite,
  Share,
  Comment,
  Image as ImageIcon,
  SportsSoccer,
} from '@mui/icons-material';

// Mock data for initial posts
const initialPosts = [
  {
    id: 1,
    author: 'John Smith',
    avatar: '',
    type: 'player',
    content: 'Just finished an amazing training session! Working on my shooting skills. #Football #Training',
    likes: 24,
    comments: 5,
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    author: 'FC United',
    avatar: '',
    type: 'club',
    content: 'Looking for talented strikers! Open tryouts this Saturday at 10 AM. Contact us for details.',
    likes: 45,
    comments: 12,
    timestamp: '5 hours ago',
  },
];

const Feed = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState('');

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post = {
      id: posts.length + 1,
      author: 'You',
      avatar: '',
      type: 'player',
      content: newPost,
      likes: 0,
      comments: 0,
      timestamp: 'Just now',
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Create Post Section */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <form onSubmit={handlePostSubmit}>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Share your sports journey..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <IconButton color="primary">
              <ImageIcon />
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!newPost.trim()}
            >
              Post
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Posts Feed */}
      {posts.map((post) => (
        <Card key={post.id} sx={{ mb: 2 }}>
          <CardHeader
            avatar={
              <Avatar>
                {post.type === 'club' ? <SportsSoccer /> : post.author[0]}
              </Avatar>
            }
            title={post.author}
            subheader={post.timestamp}
          />
          <CardContent>
            <Typography variant="body1">{post.content}</Typography>
          </CardContent>
          <Divider />
          <CardActions disableSpacing>
            <IconButton aria-label="like">
              <Favorite />
            </IconButton>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
              {post.likes}
            </Typography>
            <IconButton aria-label="comment">
              <Comment />
            </IconButton>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
              {post.comments}
            </Typography>
            <IconButton aria-label="share">
              <Share />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
};

export default Feed; 