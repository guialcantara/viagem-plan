import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { TouristPoint, getRouteBetweenPoints, categoryInfo } from '../services/touristService';
import { Box, CircularProgress, Typography, Tooltip, Button } from '@mui/material';
import Legend from './Legend';
import { Person } from '@mui/icons-material';

// Corrigindo o problema dos ícones do Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
  points: TouristPoint[];
}

const createCustomIcon = (category: string) => {
  const icon = categoryInfo[category]?.icon || '📍';
  return L.divIcon({
    html: `<div style="font-size: 24px;">${icon}</div>`,
    className: 'custom-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const MapComponent = ({ points }: MapComponentProps) => {
  const [routes, setRoutes] = useState<[number, number][][]>([]);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef<L.Map>(null);

  useEffect(() => {
    const calculateRoutes = async () => {
      if (points.length === 0) return;
      
      setLoading(true);
      const newRoutes: [number, number][][] = [];
      
      try {
        for (let i = 0; i < points.length - 1; i++) {
          try {
            const route = await getRouteBetweenPoints(
              points[i].coordinates,
              points[i + 1].coordinates
            );
            
            if (route && route.length > 0) {
              newRoutes.push(route);
            }
          } catch (error) {
            console.error(`Erro ao calcular rota entre pontos ${i} e ${i + 1}:`, error);
            continue;
          }
        }
        
        if (newRoutes.length > 0) {
          setRoutes(newRoutes);
        }
      } catch (error) {
        console.error('Erro ao calcular rotas:', error);
      } finally {
        setLoading(false);
      }
    };

    calculateRoutes();
  }, [points]);

  const handlePortfolioClick = () => {
    window.open('https://guilherme-alcantara.vercel.app/', '_blank');
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      <MapContainer
        ref={mapRef}
        center={[-14.235, -51.925]}
        zoom={4}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© OpenStreetMap contributors'
        />
        
        {loading && (
          <Box sx={{ 
            position: 'absolute', 
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)'
          }}>
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress size={60} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Calculando rotas...
              </Typography>
            </Box>
          </Box>
        )}

        {routes.map((route, index) => (
          <Polyline
            key={`route-${index}`}
            positions={route}
            color="#1976d2"
            weight={3}
            opacity={0.7}
          />
        ))}

        {points.map(point => (
          <Marker
            key={point.id}
            position={[point.coordinates[0], point.coordinates[1]]}
            icon={createCustomIcon(point.category)}
          >
            <Popup>
              <h3>{point.name}</h3>
              <p>{point.description}</p>
              {point.website && <p><a href={point.website} target="_blank">Website</a></p>}
              {point.openingHours && <p>Horário: {point.openingHours}</p>}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <Legend />
      <Tooltip title="Ver meu portfolio">
        <Button
          onClick={handlePortfolioClick}
          variant="contained"
          startIcon={<Person />}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            color: '#1976d2',
            zIndex: 1000,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            },
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.9rem',
            padding: '6px 12px',
            borderRadius: '20px',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(25, 118, 210, 0.1)',
            transition: 'all 0.3s ease',
            '& .MuiSvgIcon-root': {
              fontSize: '1rem',
              marginRight: '4px',
            },
          }}
        >
          Guilherme Alcantara
        </Button>
      </Tooltip>
    </Box>
  );
};

export default MapComponent; 