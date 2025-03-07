import {
  Box,
  Typography,
  Slider,
  FormControlLabel,
  Checkbox,
  Chip,
  Divider,
} from '@mui/material';
import { TouristFilters, categoryInfo } from '../services/touristService';

interface AdvancedFiltersProps {
  filters: TouristFilters;
  onFiltersChange: (filters: TouristFilters) => void;
}

const AdvancedFilters = ({ filters, onFiltersChange }: AdvancedFiltersProps) => {
  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onFiltersChange({
      ...filters,
      categories: newCategories,
    });
  };

  const handleDistanceChange = (_event: Event, value: number | number[]) => {
    onFiltersChange({ ...filters, maxDistance: value as number });
  };

  const handlePointsChange = (_event: Event, value: number | number[]) => {
    onFiltersChange({ ...filters, maxPoints: value as number });
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Filtros Avançados
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Typography gutterBottom>Categorias</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        {Object.entries(categoryInfo).map(([category, info]) => (
          <Chip
            key={category}
            label={`${info.icon} ${info.label}`}
            onClick={() => handleCategoryToggle(category)}
            color={filters.categories.includes(category) ? 'primary' : 'default'}
            variant={filters.categories.includes(category) ? 'filled' : 'outlined'}
            sx={{ 
              '& .MuiChip-label': {
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }
            }}
          />
        ))}
      </Box>

      <Typography gutterBottom>
        Distância Máxima: {filters.maxDistance}km
      </Typography>
      <Slider
        value={filters.maxDistance}
        onChange={handleDistanceChange}
        min={1}
        max={50}
        step={1}
        marks
        valueLabelDisplay="auto"
      />

      <Typography gutterBottom>
        Quantidade de Pontos por Cidade: {filters.maxPoints}
      </Typography>
      <Slider
        value={filters.maxPoints}
        onChange={handlePointsChange}
        min={1}
        max={20}
        step={1}
        marks
        valueLabelDisplay="auto"
      />
    </Box>
  );
};

export default AdvancedFilters; 