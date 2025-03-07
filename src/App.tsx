import { useState, useEffect } from 'react'
import { Box, Paper, Button, Alert, Snackbar, IconButton, Tooltip } from '@mui/material'
import MapComponent from './components/MapComponent'
import LandingPage from './components/LandingPage'
import CitySelector from './components/CitySelector'
import AdvancedFilters from './components/AdvancedFilters'
import { getTouristPoints, TouristPoint, TouristFilters } from './services/touristService'
import { useUrlParams } from './hooks/useUrlParams'
import { GitHub } from '@mui/icons-material'

interface City {
  id: string;
  name: string;
  state: string;
}

const cities: City[] = [
  { id: '1', name: 'Rio de Janeiro', state: 'RJ' },
  { id: '2', name: 'São Paulo', state: 'SP' },
  { id: '3', name: 'Salvador', state: 'BA' },
  { id: '4', name: 'Belo Horizonte', state: 'MG' },
  { id: '5', name: 'Brasília', state: 'DF' },
  { id: '6', name: 'Curitiba', state: 'PR' },
  { id: '7', name: 'Recife', state: 'PE' },
  { id: '8', name: 'Porto Alegre', state: 'RS' },
];

function App() {
  const { getParams, setParams } = useUrlParams()
  const [showLanding, setShowLanding] = useState(true)
  const [selectedCities, setSelectedCities] = useState<City[]>([])
  const [touristPoints, setTouristPoints] = useState<TouristPoint[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<TouristFilters>({
    categories: [],
    maxDistance: 10,
    maxPoints: 10
  });

  useEffect(() => {
    const params = getParams()
    if (params.cities.length > 0) {
      const citiesFromUrl = params.cities
        .map(id => cities.find(c => c.id === id))
        .filter((city): city is City => city !== undefined)
        .slice(0, 2); // Limita a 2 cidades
      setSelectedCities(citiesFromUrl)
    }
    setFilters({
      categories: params.categories,
      maxDistance: params.maxDistance,
      maxPoints: params.maxPoints
    })
  }, [])

  const handleGetStarted = () => {
    setShowLanding(false)
  }

  const handleSearch = async () => {
    if (selectedCities.length === 0) {
      setError('Selecione pelo menos uma cidade')
      return
    }

    if (selectedCities.length > 2) {
      setError('Selecione no máximo 2 cidades')
      return
    }

    if (filters.categories.length === 0) {
      setError('Selecione pelo menos uma categoria')
      return
    }

    setParams({
      ...filters,
      cities: selectedCities.map(city => city.id)
    })

    setLoading(true)
    setError(null)
    
    try {
      const allPoints: TouristPoint[] = []
      
      for (const city of selectedCities) {
        try {
          const points = await getTouristPoints(city.id, filters)
          allPoints.push(...points)
        } catch (err) {
          console.error(`Erro ao buscar pontos para ${city.name}:`, err)
          continue
        }
      }
      
      if (allPoints.length === 0) {
        setError('Nenhum ponto turístico encontrado nas cidades selecionadas')
        return
      }
      
      setTouristPoints(allPoints)
    } catch (err) {
      setError('Erro ao buscar pontos turísticos. Tente novamente.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleFiltersChange = (newFilters: TouristFilters) => {
    setFilters(newFilters);
  };

  const handlePortfolioClick = () => {
    window.open('https://guilherme-alcantara.vercel.app/', '_blank');
  };

  return (
    <Box sx={{ height: '100vh', width: '100vw' }}>
      {showLanding ? (
        <LandingPage onGetStarted={handleGetStarted} />
      ) : (
        <Box sx={{ height: '100%', display: 'flex' }}>
          <Paper
            sx={{
              width: { xs: '100%', sm: '360px' },
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: { xs: 'fixed', sm: 'relative' },
              top: { xs: 0, sm: 'auto' },
              left: { xs: 0, sm: 'auto' },
              zIndex: 1200,
              borderRadius: 0,
              bgcolor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
            }}
            elevation={3}
          >
            <Box
              sx={{
                height: '100%',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(0, 0, 0, 0.05)',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '4px',
                },
              }}
            >
              <Box sx={{ p: 3 }}>
                <CitySelector
                  selectedCities={selectedCities}
                  onCitiesChange={setSelectedCities}
                  maxCities={2}
                />
              </Box>
              <Box sx={{ px: 3, pb: 2 }}>
                <AdvancedFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                />
              </Box>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSearch}
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? 'Buscando...' : 'Buscar Pontos Turísticos'}
              </Button>
            </Box>
          </Paper>
          <Box sx={{ flex: 1, position: 'relative' }}>
            <MapComponent points={touristPoints} />
            <Tooltip title="Ver meu portfolio">
              <IconButton
                onClick={handlePortfolioClick}
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  right: 16,
                  backgroundColor: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                <GitHub />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      )}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default App
