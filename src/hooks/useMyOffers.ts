import axios from 'axios';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { Store } from '../context/Store';
import { getHeader } from '../utils/AuthorizationConfig';

export const useMyOffers = () => {
  const {
    state: {
      auth: { token },
    },
  } = useContext(Store);
  const getMyOffers = async () => {
    if (!token) {
      throw new Error('No token');
    }
    const config = getHeader(token);
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/offers/my`,
      config,
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
