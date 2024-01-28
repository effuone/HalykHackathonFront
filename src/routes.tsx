import { AuthProvidingLayout } from './lib/auth/auth.layout';
import { useAuth } from './lib/hooks/useAuth';
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import AuthPage from "@/pages/AuthPage.tsx";
import MainPage from "@/pages/MainPage.tsx";
import HomePage from "@/pages/HomePage.tsx";

const DefaultRoute = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/home" replace />;
  } else {
    return <Navigate to="/score" replace />;
  }
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthProvidingLayout />}>
      <Route path='/home' element={<HomePage />} />
      <Route path="/" element={<DefaultRoute />} />
      <Route path={'/auth'} element={<AuthPage />} />
      <Route path={'/score'} element={<MainPage />} />
    </Route>
  )
);

export default router;
