import axios from 'axios';
import { useQuery } from 'react-query';

export const useMyOffers = () => {
  const getMyOffers = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/offers/my`,
    );
    return data;
  };

  const { data, isLoading, error, refetch } = useQuery('myOffers', getMyOffers);

  return {
    myOffers: data,
    refetch,
    isLoading,
    error,
  };
};
