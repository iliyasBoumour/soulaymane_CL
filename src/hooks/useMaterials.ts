import { useQuery } from 'react-query';
import axios from 'axios';
import { Material } from '../types/index';

export const useMaterials = () => {
  const getMaterials = (): Promise<Material[]> => {
    return axios.get(`${process.env.API_URL}/materials`);
  };

  const { data, isLoading, error } = useQuery('materials', getMaterials);

  return {
    data,
    isLoading,
    error,
  };
};
