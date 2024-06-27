// useNavigation.ts
import { useNavigate } from 'react-router-dom';

const useNavigation = () => {
  const navigate = useNavigate();

  const goTo = (route: string) => {
    navigate(route);
  };

  return {
    goTo,
  };
};

export default useNavigation;
