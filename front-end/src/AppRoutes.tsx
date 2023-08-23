import { Navigate, Route, Routes } from "react-router-dom";
import { Login, Dashboard, Organization } from "pages";
import { Layout } from "components";
import { useAppSelector } from "hooks/hooks";

const PrivateRoute = ({ children }: { children: JSX.Element}): JSX.Element => {
  const user = useAppSelector((state) => state.user);
  return user?.email ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/organization" element={<PrivateRoute><Organization /></PrivateRoute>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
