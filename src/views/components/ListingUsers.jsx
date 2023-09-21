import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Avatar } from '@mui/material';

const users = [
  {
    id: 1,
    name: 'md',
    username: 'md123',
    email: 'jdd@example.com',
    avatar: 'https://via.placeholder.com/64', 
  },
  {
    id: 2,
    name: 'dc',
    username: 'dc456',
    email: 'sss@example.com',
    avatar: 'https://via.placeholder.com/64', 
  },
  // Add more users as needed
];

function UserList() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">User List</Typography>
        <List>
          {users.map((user) => (
            <ListItem key={user.id}>
              <Avatar src={user.avatar} alt={user.name} />
              <ListItemText
                primary={user.name}
                secondary={`@${user.username} - ${user.email}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default UserList;
