import { Outlet, createBrowserRouter } from "react-router-dom";
import App from "./App";
import { PageLayout } from "./components/layout/PageLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import OrganizerDashboardPage from "./pages/OrganizerDashboardPage";
import OrganizerEventsPage from "./pages/OrganizerEventsPage";
import OrganizerSettingsPage from "./pages/OrganizerSettingsPage";
import OrganizerMembershipsPage from "./pages/OrganizerMembershipsPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfilePage from "./pages/UserProfilePage";
import VolunteerEventDetailPage from "./pages/VolunteerEventDetailPage";
import OrganizationsPage from "./pages/OrganizationsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <PageLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
          {
            path: "profile",
            element: <UserProfilePage />,
          },
          {
            path: "organizations",
            element: <OrganizationsPage />,
          },
          {
            path: "events/:id",
            element: <VolunteerEventDetailPage />,
          },
          {
            path: "organizer",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <OrganizerDashboardPage />,
              },
              {
                path: "dashboard",
                element: <OrganizerDashboardPage />,
              },
              {
                path: "events",
                element: <OrganizerEventsPage />,
              },
              {
                path: "settings",
                element: <OrganizerSettingsPage />,
              },
              {
                path: "members",
                element: <OrganizerMembershipsPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
