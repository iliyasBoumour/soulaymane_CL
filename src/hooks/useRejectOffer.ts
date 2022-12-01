import { useMutation } from 'react-query';
import axios from 'axios';
import { getHeader } from '../utils/AuthorizationConfig';

interface RejectOfferDto {
  token: string | null;
  offerId: string;
  comment: string;
}

export const useRejectOffer = () => {
  const rejectOffer = ({ offerId, comment, token }: RejectOfferDto) => {
    if (!token) {
      throw new Error('Missing token');
    }
    const config = getHeader(token);
    return axios.post(
      `${process.env.REACT_APP_API_URL}/demands/${offerId}/reject`,
      {
        comment,
      },
      config,
    );
  };

  const { mutate, isLoading, error } = useMutation(rejectOffer);

  return {
    rejectOffer: mutate,
    isLoading,
    error,
  };
};
