import { Navigate, Route, Routes } from "react-router-dom";
import { Login, Dashboard, Request, Organization } from "pages";
import { Layout } from "components";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/request" element={<Request />} />
        <Route path="/organization" element={<Organization />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
