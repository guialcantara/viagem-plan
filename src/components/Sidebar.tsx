import { Box, List, ListItem, ListItemButton, ListItemText, Typography, Paper } from '@mui/material';

interface SidebarProps {
  onRouteSelect: (route: string) => void;
}

const mockRoutes = [
  { id: '1', name: 'Rota do Rio de Janeiro', description: 'Passeio pelos principais pontos turísticos do Rio' },
  { id: '2', name: 'Rota de São Paulo', description: 'Tour pelos museus e parques da cidade' },
  { id: '3', name: 'Rota de Salvador', description: 'História e cultura na capital da Bahia' },
];

const Sidebar = ({ onRouteSelect }: SidebarProps) => {
  return (
    <Paper
      sx={{
        width: 300,
        height: '100%',
        overflow: 'auto',
        borderRadius: 0,
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component="div">
          Roteiros Disponíveis
        </Typography>
      </Box>
      <List>
        {mockRoutes.map((route) => (
          <ListItem key={route.id} disablePadding>
            <ListItemButton onClick={() => onRouteSelect(route.id)}>
              <ListItemText
                primary={route.name}
                secondary={route.description}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Sidebar; 