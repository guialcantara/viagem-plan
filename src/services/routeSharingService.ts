import { TouristPoint } from './touristService';

export interface SharedRoute {
  id: string;
  name: string;
  description: string;
  cities: string[];
  points: TouristPoint[];
  createdAt: Date;
  createdBy: string;
}

const STORAGE_KEY = 'shared_routes';

// Função para carregar rotas do localStorage
const loadSharedRoutes = (): SharedRoute[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const routes = JSON.parse(stored);
      return routes.map((route: any) => ({
        ...route,
        createdAt: new Date(route.createdAt)
      }));
    }
    return [];
  } catch (error) {
    console.error('Erro ao carregar rotas:', error);
    return [];
  }
};

// Função para salvar rotas no localStorage
const saveSharedRoutes = (routes: SharedRoute[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(routes));
  } catch (error) {
    console.error('Erro ao salvar rotas:', error);
  }
};

export const shareRoute = async (
  name: string,
  description: string,
  cities: string[],
  points: TouristPoint[],
  createdBy: string
): Promise<SharedRoute> => {
  const newRoute: SharedRoute = {
    id: Math.random().toString(36).substr(2, 9),
    name,
    description,
    cities,
    points,
    createdAt: new Date(),
    createdBy,
  };

  const routes = loadSharedRoutes();
  routes.push(newRoute);
  saveSharedRoutes(routes);

  return newRoute;
};

export const getSharedRoutes = async (): Promise<SharedRoute[]> => {
  return loadSharedRoutes();
};

export const getSharedRouteById = async (id: string): Promise<SharedRoute | null> => {
  const routes = loadSharedRoutes();
  return routes.find(route => route.id === id) || null;
};

export const generateShareableLink = (routeId: string): string => {
  return `${window.location.origin}/shared-route/${routeId}`;
};

export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Erro ao copiar para a área de transferência:', err);
  }
}; 