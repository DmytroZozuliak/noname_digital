import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../utils/constants/routes';

export const useOnErrorRedirect = (isError: boolean) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate(RoutePath.NotFound);
    }
  }, [isError, navigate]);
};
