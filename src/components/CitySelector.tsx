import { useState } from 'react';
import {
  Box,
  Autocomplete,
  TextField,
  Typography,
  Checkbox,
  Chip,
  useTheme,
  Divider,
  Alert,
} from '@mui/material';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';

interface City {
  id: string;
  name: string;
  state: string;
}

// Função simples para calcular distância entre duas cidades (mock)
const calculateDistance = (city1: City, city2: City): number => {
  // Aqui você pode implementar um cálculo real de distância
  // Por enquanto, retornamos um valor aleatório entre 100 e 1000
  return Math.floor(Math.random() * 900) + 100;
};

// Função para otimizar a rota (mock)
const optimizeRoute = (cities: City[]): City[] => {
  if (cities.length <= 2) return cities;
  
  // Implementação simples do algoritmo do vizinho mais próximo
  const route: City[] = [cities[0]];
  const remaining = cities.slice(1);
  
  while (remaining.length > 0) {
    const current = route[route.length - 1];
    let nearestIndex = 0;
    let minDistance = Infinity;
    
    remaining.forEach((city, index) => {
      const distance = calculateDistance(current, city);
      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = index;
      }
    });
    
    route.push(remaining[nearestIndex]);
    remaining.splice(nearestIndex, 1);
  }
  
  return route;
};

// Função para calcular a distância total da rota
const getRouteDistance = (cities: City[]): number => {
  let totalDistance = 0;
  for (let i = 0; i < cities.length - 1; i++) {
    totalDistance += calculateDistance(cities[i], cities[i + 1]);
  }
  return totalDistance;
};

interface CitySelectorProps {
  selectedCities: City[];
  onCitiesChange: (cities: City[]) => void;
  maxCities: number;
}

const CitySelector = ({ selectedCities, onCitiesChange, maxCities }: CitySelectorProps) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const cities: City[] = [
    { id: '1', name: 'Rio de Janeiro', state: 'RJ' },
    { id: '2', name: 'São Paulo', state: 'SP' },
    { id: '3', name: 'Salvador', state: 'BA' },
    { id: '4', name: 'Belo Horizonte', state: 'MG' },
    { id: '5', name: 'Brasília', state: 'DF' },
    { id: '6', name: 'Curitiba', state: 'PR' },
    { id: '7', name: 'Recife', state: 'PE' },
    { id: '8', name: 'Porto Alegre', state: 'RS' },
    { id: '9', name: 'Fortaleza', state: 'CE' },
    { id: '10', name: 'Teresina', state: 'PI' },
    { id: '11', name: 'João Pessoa', state: 'PB' },
    { id: '12', name: 'Campina Grande', state: 'PB' },
    { id: '13', name: 'Goiânia', state: 'GO' },
    { id: '14', name: 'Vitória', state: 'ES' },
    { id: '15', name: 'Campinas', state: 'SP' },
    { id: '16', name: 'Guarulhos', state: 'SP' },
    { id: '17', name: 'Santo André', state: 'SP' },
    { id: '18', name: 'São Bernardo do Campo', state: 'SP' },
    { id: '19', name: 'Osasco', state: 'SP' },
    { id: '20', name: 'São José dos Campos', state: 'SP' }
  ];

  const handleCityToggle = (city: City) => {
    if (selectedCities.find(c => c.id === city.id)) {
      onCitiesChange(selectedCities.filter(c => c.id !== city.id));
    } else if (selectedCities.length < maxCities) {
      onCitiesChange([...selectedCities, city]);
    }
  };

  const handleChange = (_, newValue: City[]) => {
    if (newValue.length <= maxCities) {
      onCitiesChange(newValue);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Selecione as Cidades (máximo {maxCities})
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Autocomplete
        multiple
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        disableCloseOnSelect
        options={cities}
        value={selectedCities}
        onChange={handleChange}
        getOptionLabel={(option) => `${option.name} - ${option.state}`}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={<CheckBoxOutlineBlank />}
              checkedIcon={<CheckBox />}
              style={{ marginRight: 8 }}
              checked={selected}
              disabled={!selected && selectedCities.length >= maxCities}
            />
            {option.name} - {option.state}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder={selectedCities.length === 0 ? "Selecione as cidades" : ""}
            onClick={() => setOpen(true)}
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => {
            const tagProps = getTagProps({ index });
            const {key, ...rest} = tagProps;
            return (
              <Chip
                key={key}
                {...rest}
                label={`${option.name} - ${option.state}`}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: 'white',
                  '& .MuiChip-deleteIcon': {
                    color: 'white',
                    '&:hover': {
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                  },
                }}
              />
            );
          })
        }
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
          },
        }}
      />
      {selectedCities.length >= maxCities && (
        <Alert severity="info" sx={{ mt: 1 }}>
          Limite de {maxCities} cidades atingido
        </Alert>
      )}
    </Box>
  );
};

export default CitySelector; 