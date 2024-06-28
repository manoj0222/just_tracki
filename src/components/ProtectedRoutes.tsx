// ProtectedRoutes.tsx
import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import useNavigation from "../Hooks/useNavigation";

type Props = {
  children: ReactNode;
};

const ProtectedRoutes: React.FC<Props> = ({ children }) => {
  const userId = useSelector((state: RootState) => state.authentication.userId);
  const { goTo } = useNavigation();

  useEffect(() => {
    if (!userId) {
      goTo("/auth"); // Redirect to login if userId is falsy (not authenticated)
    }
  }, [userId, goTo]);

  if (!userId) {
    return null; // or return a loading indicator if you prefer
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
