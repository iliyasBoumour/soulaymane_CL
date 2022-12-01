import { useQuery } from 'react-query';
import axios from 'axios';
import { Material } from '../types/index';

export const useMaterials = () => {
  const getMaterials = async (): Promise<Material[]> => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/offers`);
    return data;
  };

  const { data, isLoading, error } = useQuery('materials', getMaterials);

  return {
    data,
    isLoading,
    error,
  };
};
