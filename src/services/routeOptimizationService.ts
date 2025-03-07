import { getCityCoordinates } from './touristService';

interface City {
  id: string;
  name: string;
  state: string;
}

// Função para calcular a distância entre dois pontos usando a fórmula de Haversine
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Raio da Terra em km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Função para calcular a distância total de uma rota
const calculateTotalDistance = (route: City[]): number => {
  let totalDistance = 0;
  for (let i = 0; i < route.length - 1; i++) {
    const [lat1, lon1] = getCityCoordinates(route[i].id);
    const [lat2, lon2] = getCityCoordinates(route[i + 1].id);
    totalDistance += calculateDistance(lat1, lon1, lat2, lon2);
  }
  return totalDistance;
};

// Algoritmo do caixeiro viajante usando o método do vizinho mais próximo
export const optimizeRoute = (cities: City[]): City[] => {
  if (cities.length <= 2) return cities;

  const unvisited = [...cities];
  const optimizedRoute: City[] = [];
  
  // Começar com a primeira cidade
  optimizedRoute.push(unvisited.shift()!);

  while (unvisited.length > 0) {
    const currentCity = optimizedRoute[optimizedRoute.length - 1];
    const [currentLat, currentLon] = getCityCoordinates(currentCity.id);
    
    // Encontrar a cidade mais próxima não visitada
    let nearestCity = unvisited[0];
    let minDistance = Infinity;

    for (const city of unvisited) {
      const [lat, lon] = getCityCoordinates(city.id);
      const distance = calculateDistance(currentLat, currentLon, lat, lon);
      
      if (distance < minDistance) {
        minDistance = distance;
        nearestCity = city;
      }
    }

    optimizedRoute.push(nearestCity);
    unvisited.splice(unvisited.indexOf(nearestCity), 1);
  }

  return optimizedRoute;
};

// Função para calcular a distância total da rota em km
export const getRouteDistance = (route: City[]): number => {
  return Math.round(calculateTotalDistance(route));
}; 