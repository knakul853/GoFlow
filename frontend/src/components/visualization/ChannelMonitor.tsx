import React from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  LinearProgress,
} from '@mui/material';

interface ChannelInfo {
  id: number;
  bufferSize: number;
  bufferUsed: number;
  isClosed: boolean;
}

interface ChannelMonitorProps {
  channels: ChannelInfo[];
}

export const ChannelMonitor: React.FC<ChannelMonitorProps> = ({ channels }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Channel Monitor
      </Typography>
      <List>
        {channels.map((channel) => (
          <Paper
            key={channel.id}
            elevation={2}
            sx={{ mb: 2, p: 2 }}
          >
            <ListItem>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1">
                      Channel {channel.id}
                    </Typography>
                    <Chip
                      label={channel.isClosed ? 'Closed' : 'Open'}
                      color={channel.isClosed ? 'error' : 'success'}
                      size="small"
                    />
                  </Box>
                }
                secondary={
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Buffer Capacity: {channel.bufferSize}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                        Buffer Usage:
                      </Typography>
                      <Box sx={{ flex: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={(channel.bufferUsed / channel.bufferSize) * 100}
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        {channel.bufferUsed}/{channel.bufferSize}
                      </Typography>
                    </Box>
                  </Box>
                }
              />
            </ListItem>
          </Paper>
        ))}
      </List>
    </Box>
  );
};
