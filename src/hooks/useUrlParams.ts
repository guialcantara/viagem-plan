import { useSearchParams } from 'react-router-dom';

interface RouteParams {
  cities: string[];
  categories: string[];
  maxDistance: number;
  maxPoints: number;
}

export const useUrlParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParams = (): RouteParams => {
    return {
      cities: searchParams.get('cities')?.split(',') || [],
      categories: searchParams.get('categories')?.split(',') || [],
      maxDistance: Number(searchParams.get('maxDistance')) || 10,
      maxPoints: Number(searchParams.get('maxPoints')) || 10,
    };
  };

  const setParams = (params: RouteParams) => {
    const newParams = new URLSearchParams();
    
    if (params.cities.length > 0) {
      newParams.set('cities', params.cities.join(','));
    }
    if (params.categories.length > 0) {
      newParams.set('categories', params.categories.join(','));
    }
    if (params.maxDistance !== 10) {
      newParams.set('maxDistance', params.maxDistance.toString());
    }
    if (params.maxPoints !== 10) {
      newParams.set('maxPoints', params.maxPoints.toString());
    }

    setSearchParams(newParams);
  };

  return { getParams, setParams };
}; 