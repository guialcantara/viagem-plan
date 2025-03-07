import { Box, Button, Container, Typography, keyframes } from '@mui/material';
import { ExploreOutlined, MapOutlined, LocationCityOutlined, FlightTakeoff } from '@mui/icons-material';

interface LandingPageProps {
  onGetStarted: () => void;
}

// Definindo animações
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Elementos decorativos de fundo */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 4,
          }}
        >
          {/* Conteúdo Principal */}
          <Box 
            sx={{ 
              flex: 1, 
              textAlign: { xs: 'center', md: 'left' },
              animation: `${fadeIn} 1s ease-out`,
            }}
          >
            <FlightTakeoff 
              sx={{ 
                fontSize: 60, 
                mb: 2,
                animation: `${float} 3s ease-in-out infinite`,
              }} 
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                background: 'linear-gradient(45deg, #fff 30%, #e3f2fd 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 30px rgba(255,255,255,0.3)',
              }}
            >
              ViagemPlan
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                color: '#e3f2fd',
                opacity: 0.9,
              }}
            >
              Planeje sua Viagem
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 4, 
                color: '#e3f2fd',
                opacity: 0.9,
                animation: `${fadeIn} 1s ease-out 0.3s both`,
              }}
            >
              Descubra os melhores pontos turísticos e crie roteiros personalizados para sua próxima aventura
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={onGetStarted}
              startIcon={<ExploreOutlined />}
              sx={{
                backgroundColor: '#4caf50',
                '&:hover': {
                  backgroundColor: '#388e3c',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                },
                px: 4,
                py: 1.5,
                borderRadius: 2,
                transition: 'all 0.3s ease',
                animation: `${fadeIn} 1s ease-out 0.6s both`,
              }}
            >
              Começar Agora
            </Button>
          </Box>

          {/* Cards de Recursos */}
          <Box
            sx={{
              flex: 1,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: 3,
              animation: `${fadeIn} 1s ease-out 0.9s both`,
            }}
          >
            {[
              {
                icon: <MapOutlined sx={{ fontSize: 40 }} />,
                title: 'Mapa Interativo',
                description: 'Visualize todos os pontos turísticos em um mapa interativo e fácil de usar',
                image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80',
              },
              {
                icon: <LocationCityOutlined sx={{ fontSize: 40 }} />,
                title: 'Múltiplas Cidades',
                description: 'Planeje roteiros incluindo várias cidades em uma única viagem',
                image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=600&q=80',
              },
            ].map((feature, index) => (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 2,
                  p: 3,
                  overflow: 'hidden',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    '& .feature-image': {
                      opacity: 0.2,
                    },
                  },
                }}
              >
                <Box
                  className="feature-image"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${feature.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.1,
                    transition: 'opacity 0.3s ease',
                  }}
                />
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  {feature.icon}
                  <Typography variant="h6" sx={{ my: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#e3f2fd' }}>
                    {feature.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage; 