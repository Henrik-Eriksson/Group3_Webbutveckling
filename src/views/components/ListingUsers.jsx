import { Card, CardContent, Typography, List, ListItem, ListItemText, Avatar } from '@mui/material';
import {users} from '../../models/userData.jsx';

function UserList() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">User List</Typography>
        <List>
          {users.map((user) => (
            <ListItem key={user.id}>
              <Avatar src={user.profilePicture} alt={user.username} />
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
