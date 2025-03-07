import { useState } from 'react';
import { Box, Paper, Typography, Grid, IconButton, Collapse } from '@mui/material';
import { categoryInfo } from '../services/touristService';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

const Legend = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Paper
      sx={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        p: isOpen ? 2 : 1,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        zIndex: 1000,
        maxWidth: 300,
        maxHeight: 400,
        overflowY: 'auto',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 1)',
        }
      }}
      elevation={3}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: isOpen ? 2 : 0 }}>
        <Typography variant={isOpen ? "h6" : "subtitle2"}>
          Categorias
        </Typography>
        <IconButton 
          size="small" 
          onClick={() => setIsOpen(!isOpen)}
          sx={{ 
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)',
            padding: isOpen ? 1 : 0.5
          }}
        >
          <ExpandMore />
        </IconButton>
      </Box>

      <Collapse in={isOpen}>
        <Grid container spacing={1}>
          {Object.entries(categoryInfo).map(([category, info]) => (
            <Grid item xs={12} key={category}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  p: 0.5,
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  }
                }}
              >
                <Typography>{info.icon}</Typography>
                <Typography variant="body2">{info.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Collapse>
    </Paper>
  );
};

export default Legend; 