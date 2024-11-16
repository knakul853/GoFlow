import React from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  Alert,
  AlertTitle,
  Collapse,
  IconButton,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

interface DeadlockInfo {
  detectedAt: Date;
  cycleDetails: string;
  involvedGoroutines: number[];
  involvedChannels: number[];
}

interface DeadlockDetectorProps {
  deadlocks: DeadlockInfo[];
}

export const DeadlockDetector: React.FC<DeadlockDetectorProps> = ({ deadlocks }) => {
  const [expandedItems, setExpandedItems] = React.useState<Set<number>>(new Set());

  const handleToggle = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (expandedItems.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Deadlock Detector
      </Typography>
      <List>
        {deadlocks.map((deadlock, index) => (
          <Paper
            key={index}
            elevation={2}
            sx={{ mb: 2 }}
          >
            <ListItem
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
              }}
            >
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="expand"
                    size="small"
                    onClick={() => handleToggle(index)}
                  >
                    {expandedItems.has(index) ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                }
              >
                <AlertTitle>Deadlock Detected</AlertTitle>
                {new Date(deadlock.detectedAt).toLocaleString()}
              </Alert>

              <Collapse in={expandedItems.has(index)}>
                <Box sx={{ p: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Cycle Details:
                  </Typography>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>
                    {deadlock.cycleDetails}
                  </Typography>

                  <Typography variant="subtitle2" gutterBottom>
                    Involved Goroutines:
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {deadlock.involvedGoroutines.join(', ')}
                  </Typography>

                  <Typography variant="subtitle2" gutterBottom>
                    Involved Channels:
                  </Typography>
                  <Typography variant="body2">
                    {deadlock.involvedChannels.join(', ')}
                  </Typography>
                </Box>
              </Collapse>
            </ListItem>
          </Paper>
        ))}
        {deadlocks.length === 0 && (
          <Alert severity="success">
            No deadlocks detected
          </Alert>
        )}
      </List>
    </Box>
  );
};
