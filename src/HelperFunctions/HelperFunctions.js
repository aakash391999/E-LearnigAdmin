// hooks/useAuth.js
import { useSelector } from "react-redux";

export const UseAuth = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  return isAuth;
};
