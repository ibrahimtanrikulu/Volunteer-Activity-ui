import { createBrowserRouter } from "react-router-dom"; 
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import App from "./App";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import MyEventsPage from "./pages/MyEventsPage";
import CreateEventPage from "./pages/CreateEventPage";
import EditEventPage from "./pages/EditEventPage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <EventsPage /> },   
      { path: "login", element: <LoginPage /> }, 
      { path: "register", element: <RegisterPage /> },
      { path: "events", element: <EventsPage /> },
      { path: "events/:id", element: <EventDetailPage /> },
      { path: "events/:id/edit", element: <EditEventPage /> },
      { path: "my-events", element: <MyEventsPage /> },
      { path: "events/new", element: <CreateEventPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
]);