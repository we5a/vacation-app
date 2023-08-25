import { Navigate, Route, Routes } from "react-router-dom";

import { Login, Dashboard, Organization } from "pages";
import { Layout } from "components";
import { useAppSelector, useAppDispatch } from "hooks/hooks";
import { setUser } from "store/userSlice";
import { getLocalUser } from "services/utils";

const PrivateRoute = ({ children }: { children: JSX.Element }): JSX.Element => {
  const dispatch = useAppDispatch();
  const isUserInState = useAppSelector((state) => state.user)?.email;

  if (isUserInState) {
    return children;
  }

  const localUser = getLocalUser();
  if (localUser) {
    dispatch(setUser(localUser));
    return children;
  }

  return <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/organization"
          element={
            <PrivateRoute>
              <Organization />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
