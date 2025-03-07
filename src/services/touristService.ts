export interface TouristPoint {
  id: string;
  name: string;
  description: string;
  coordinates: [number, number];
  category: string;
  type: string;
  website?: string;
  openingHours?: string;
  icon: string;
  label: string;
}

// Coordenadas das cidades (mock)
const cityCoordinates: { [key: string]: [number, number] } = {
  '1': [-22.9068, -43.1729], // Rio de Janeiro
  '2': [-23.5505, -46.6333], // São Paulo
  '3': [-12.9714, -38.5014], // Salvador
  '4': [-19.9167, -43.9345], // Belo Horizonte
  '5': [-15.7801, -47.9292], // Brasília
  '6': [-25.4284, -49.2733], // Curitiba
  '7': [-8.0476, -34.8770], // Recife
  '8': [-30.0346, -51.2177], // Porto Alegre
  '9': [-3.7319, -38.5267], // Fortaleza
  '10': [-5.0892, -42.8016], // Teresina
  '11': [-7.1153, -34.8611], // João Pessoa
  '12': [-7.2307, -35.8817], // Campina Grande
  '13': [-16.6799, -49.2550], // Goiânia
  '14': [-20.3194, -40.3377], // Vitória
  '15': [-22.9064, -47.0616], // Campinas
  '16': [-23.5505, -46.6333], // Guarulhos
  '17': [-23.5505, -46.6333], // Santo André
  '18': [-23.5505, -46.6333], // São Bernardo do Campo
  '19': [-23.5505, -46.6333], // Osasco
  '20': [-23.5505, -46.6333], // São José dos Campos
};


const touristCategories = [
  'historic',
  'natural',
  'artwork',
  'memorial',
  'castle',
  'monument',
  'attraction',
  'viewpoint',
  'museum',
  'hotel'
];

const categoryTranslations: { [key: string]: string } = {
  'histórico': 'historic',
  'natural': 'natural',
  'arte': 'artwork',
  'memorial': 'memorial',
  'castelo': 'castle',
  'monumento': 'monument',
  'atração': 'attraction',
  'mirante': 'viewpoint',
  'museu': 'museum',
  'hotel': 'hotel'
};

const translateCategory = (category: string): string => {
  return categoryTranslations[category.toLowerCase()] || category.toLowerCase();
};

const getTagValue = (element: any, tag: string): string => {
  return element?.tags?.[tag] || '';
};


const getPointCategory = (element: any): string => {
  // Primeiro, verifica se é um ponto turístico
  if (element.tags?.tourism) {
    return element.tags.tourism.toLowerCase();
  }
  
  // Se não for um ponto turístico, verifica outras categorias
  for (const category of touristCategories) {
    if (element.tags?.[category]) {
      return category.toLowerCase();
    }
  }
  
  return 'other';
};

export interface TouristFilters {
  categories: string[];
  maxDistance: number;
  maxPoints: number;
}

export interface CategoryInfo {
  icon: string;
  label: string;
}

export const categoryInfo: { [key: string]: CategoryInfo } = {
  'historic': { icon: '🏺', label: 'Histórico' },
  'natural': { icon: '🌳', label: 'Natural' },
  'artwork': { icon: '🎨', label: 'Arte' },
  'memorial': { icon: '🕯️', label: 'Memorial' },
  'castle': { icon: '🏰', label: 'Castelo' },
  'monument': { icon: '🗿', label: 'Monumento' },
  'attraction': { icon: '🎯', label: 'Atração' },
  'viewpoint': { icon: '👀', label: 'Mirante' },
  'museum': { icon: '🏛️', label: 'Museu' },
  'hotel': { icon: '🏨', label: 'Hotel' }
};

export const getTouristPoints = async (cityId: string, filters: TouristFilters): Promise<TouristPoint[]> => {
  const [lat, lon] = cityCoordinates[cityId];
  
  try {
    const response = await fetch(
      `https://overpass-api.de/api/interpreter?data=[out:json][timeout:25];(
        ${touristCategories.map(category => `
          node["${category}"](around:${filters.maxDistance * 1000},${lat},${lon});
          way["${category}"](around:${filters.maxDistance * 1000},${lat},${lon});
          relation["${category}"](around:${filters.maxDistance * 1000},${lat},${lon});
        `).join('')}
      );out body;>;out skel qt;`
    );

    if (!response.ok) {
      throw new Error('Erro na resposta da API');
    }

    const data = await response.json();
    
    if (!data.elements || !Array.isArray(data.elements)) {
      throw new Error('Formato de dados inválido');
    }

    // Primeiro, filtra os elementos válidos
    const validElements = data.elements.filter((element: any) => {
      if (!element || typeof element.lat !== 'number' || typeof element.lon !== 'number') {
        return false;
      }

      const hasNameOrDesc = getTagValue(element, 'name') || 
                          getTagValue(element, 'description') || 
                          element.tags?.historic || 
                          element.tags?.natural || 
                          element.tags?.artwork || 
                          element.tags?.memorial || 
                          element.tags?.castle || 
                          element.tags?.monument || 
                          element.tags?.attraction || 
                          element.tags?.viewpoint || 
                          element.tags?.museum || 
                          element.tags?.hotel;
      if (!hasNameOrDesc) return false;

      const category = getPointCategory(element);
      
      if (filters.categories.length > 0 && !filters.categories.map(c => translateCategory(c)).includes(category)) {
        return false;
      }

      return true;
    });

    // Depois, mapeia os elementos para pontos turísticos
    const points = validElements
      .map((element: any) => {
        const category = getPointCategory(element);
        const categoryData = categoryInfo[category] || categoryInfo['other'];
        
        return {
          id: element.id?.toString() || Math.random().toString(),
          name: getTagValue(element, 'name') || 'Ponto Turístico',
          description: getTagValue(element, 'description') || getTagValue(element, 'tourism') || 'Sem descrição',
          coordinates: [element.lat, element.lon],
          category: category,
          type: element.type || 'node',
          website: getTagValue(element, 'website'),
          openingHours: getTagValue(element, 'opening_hours'),
          icon: categoryData.icon,
          label: categoryData.label
        };
      })
      .slice(0, filters.maxPoints); // Limita o número de pontos por cidade

    return points;
  } catch (error) {
    console.error('Erro ao buscar pontos turísticos:', error);
    throw error;
  }
};

export const getCityCoordinates = (cityId: string): [number, number] => {
  return cityCoordinates[cityId] || [-15.7801, -47.9292];
};

// Função para traçar rota entre pontos usando OSRM
export const getRouteBetweenPoints = async (
  start: [number, number],
  end: [number, number]
): Promise<[number, number][]> => {
  try {
    const response = await fetch(
      `http://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`
    );
    
    if (!response.ok) {
      throw new Error('Erro na resposta da API de rotas');
    }

    const data = await response.json();
    
    if (data.code === 'Ok' && data.routes && data.routes[0]) {
      return data.routes[0].geometry.coordinates.map((coord: number[]) => [coord[1], coord[0]]);
    }
    
    return [start, end]; // Fallback para linha reta se a rota falhar
  } catch (error) {
    console.error('Erro ao traçar rota:', error);
    return [start, end]; // Fallback para linha reta em caso de erro
  }
}; 