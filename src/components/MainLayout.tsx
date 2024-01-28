import * as React from 'react';
import Sidebar from './Sidebar';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/lib/hooks/useAuth';

interface MainLayoutProps {
  headerText: string;
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ headerText, children }) => {
  const [open, setOpen] = React.useState(false);
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" />;
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Sidebar
        headerText={headerText}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      >
        {children}
      </Sidebar>
      <Outlet />
    </>
  );
};

export default MainLayout;
