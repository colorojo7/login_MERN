import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "../../../shared/routes";

import LandingPage from "../pages/LandingPage";

//** PUBLIC ROUTES **//
import PublicRoute from "./PublicRoute";
import RegisterEmailPage from "../pages/RegisterEmailPage";
import RegisterUserPage from "../pages/RegisterUserPage";
import LoginPage from "../pages/LoginPage";

//** PRIVATE ROUTES **//
import AuthRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../components/layouts/DashboardLayout";
import HomePage from "../pages/dashboard/HomePage";
import AccountPage from "../pages/dashboard/AccountPage";

//** WORKER PRIVATE ROUTES **//
import ShiftsPage from "../pages/dashboard/ShiftsPage";
import ShiftPage from "../pages/dashboard/ShiftPage";
import ReportsPage from "../pages/dashboard/ReportsPage";

//** ADMIN PRIVATE ROUTES **//
import AdminPage from "../pages/admin/AdminPage";

import NotFoundPage from "../pages/NotFoundPage";
import { ROLES } from "../../../shared/roles";
import Unauthorized from "../pages/dashboard/Unauthorized";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={routes.landing} element={<LandingPage />} />

        {/* -----PUBLIC ROUTES------- */}

        <Route element={<PublicRoute />}>
          <Route path={routes.register.email} element={<RegisterEmailPage />} />
          <Route path={routes.register.user} element={<RegisterUserPage />} />
          <Route path={routes.login} element={<LoginPage />} />
        </Route>

        {/* -----PRIVATES ROUTES------- */}
        <Route element={<AuthRoute allowedRoles={[ROLES.worker]} />}>
          <Route element={<DashboardLayout />}>
            {/* WORKER ROUTES */}
            <Route element={<AuthRoute allowedRoles={[ROLES.worker]} />}>
              <Route path={routes.dashboard.home} element={<HomePage />} />
              <Route
                path={routes.dashboard.settings}
                element={<AccountPage />}
              />
              <Route path={routes.dashboard.shifts} element={<ShiftsPage />} />
              <Route path={routes.dashboard.shift()} element={<ShiftPage />} />
              <Route
                path={routes.dashboard.reports}
                element={<ReportsPage />}
              />
            </Route>

            <Route element={<AuthRoute allowedRoles={[ROLES.admin]} />}>
              {/* <Route path={routes.dashboard.reports} element={<ReportsPage />} /> */}
            </Route>

            <Route element={<AuthRoute allowedRoles={[ROLES.admin_VIP]} />}>
              {/* <Route path={routes.dashboard.reports} element={<ReportsPage />} /> */}
            </Route>

            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} /> 
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
