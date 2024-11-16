import React, { useEffect, useState } from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Paper,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { GoroutineGraph } from '../visualization/GoroutineGraph';
import { ChannelMonitor } from '../visualization/ChannelMonitor';
import { DeadlockDetector } from '../visualization/DeadlockDetector';
import { grpcService } from '../../services/grpc';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App: React.FC = () => {
  const [goroutines, setGoroutines] = useState<any[]>([]);
  const [channels, setChannels] = useState<any[]>([]);
  const [deadlocks, setDeadlocks] = useState<any[]>([]);

  useEffect(() => {
    // Stream goroutines
    const goroutineStream = grpcService.streamGoroutines(
      (data) => {
        setGoroutines((prev) => {
          const updated = [...prev];
          const index = updated.findIndex((g) => g.id === data.getId());
          if (index !== -1) {
            updated[index] = {
              id: data.getId(),
              state: data.getState(),
              functionName: data.getFunctionName(),
              parentId: data.getParentId(),
            };
          } else {
            updated.push({
              id: data.getId(),
              state: data.getState(),
              functionName: data.getFunctionName(),
              parentId: data.getParentId(),
            });
          }
          return updated;
        });
      },
      (error) => console.error('Goroutine stream error:', error)
    );

    // Stream channels
    const channelStream = grpcService.streamChannels(
      (data) => {
        setChannels((prev) => {
          const updated = [...prev];
          const index = updated.findIndex((c) => c.id === data.getId());
          if (index !== -1) {
            updated[index] = {
              id: data.getId(),
              bufferSize: data.getBufferSize(),
              isClosed: data.getIsClosed(),
            };
          } else {
            updated.push({
              id: data.getId(),
              bufferSize: data.getBufferSize(),
              isClosed: data.getIsClosed(),
            });
          }
          return updated;
        });
      },
      (error) => console.error('Channel stream error:', error)
    );

    // Stream deadlocks
    const deadlockStream = grpcService.streamDeadlocks(
      (data) => {
        setDeadlocks((prev) => [
          ...prev,
          {
            detectedAt: new Date(data.getDetectedAt() * 1000),
            cycleDetails: data.getCycleDetails(),
            involvedGoroutines: data.getInvolvedGoroutinesList(),
            involvedChannels: data.getInvolvedChannelsList(),
          },
        ]);
      },
      (error) => console.error('Deadlock stream error:', error)
    );

    // Cleanup
    return () => {
      goroutineStream.cancel();
      channelStream.cancel();
      deadlockStream.cancel();
    };
  }, []);

  // Transform goroutines data for the graph
  const graphData = React.useMemo(() => {
    const nodes = goroutines.map((g) => ({
      id: g.id,
      state: g.state,
      functionName: g.functionName,
    }));

    const links = goroutines
      .filter((g) => g.parentId)
      .map((g) => ({
        source: g.parentId,
        target: g.id,
      }));

    return { nodes, links };
  }, [goroutines]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">GoFlow Debugger</Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth={false} sx={{ mt: 4, mb: 4, flex: 1 }}>
          <Grid container spacing={3}>
            {/* Goroutine Graph */}
            <Grid item xs={12} lg={8}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 600,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Goroutine Graph
                </Typography>
                <Box sx={{ flex: 1 }}>
                  <GoroutineGraph
                    nodes={graphData.nodes}
                    links={graphData.links}
                  />
                </Box>
              </Paper>
            </Grid>

            {/* Channel Monitor */}
            <Grid item xs={12} lg={4}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 600,
                  overflow: 'auto',
                }}
              >
                <ChannelMonitor channels={channels} />
              </Paper>
            </Grid>

            {/* Deadlock Detector */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <DeadlockDetector deadlocks={deadlocks} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
