import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { DrawerHeader, Main, Drawer } from './styles';
import sidebarElements from './sidebarElements';
import { Link } from 'react-router-dom';
import { LogoutOutlined, MenuOpen, MenuOutlined, Title } from "@mui/icons-material";
import { useAuth } from '@/lib/hooks/useAuth';
import { useState } from 'react';

interface SideBarProps {
  headerText: string;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  children?: React.ReactNode;
}

const drawerWidth = 240;

const Sidebar: React.FC<SideBarProps> = ({ headerText, children }) => {
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <DrawerHeader>
        <Container>
          <Typography variant="h5" noWrap component="div" color='#327358'>Halyk Life</Typography>
        </Container>
      </DrawerHeader>
      <Divider />
      <List>
        {sidebarElements.map((sidebarElement, index) => (
          <ListItem
            key={`${sidebarElement.headerKey}_${index}`}
            disablePadding
            sx={{ display: 'block' }}
          >
            <ListItemButton
              component={Link}
              to={`${sidebarElement.headerKey}`}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {sidebarElement.icon}
              </ListItemIcon>
              <ListItemText
                primary={sidebarElement.headerText}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            onClick={logout}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.9,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <LogoutOutlined />
            </ListItemIcon>
            <ListItemText primary={'Выйти'} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: '#fff',
          di: 'none',
          borderBottom: '1px solid #E0E0E0',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuOutlined style={{ color: 'inherit' }} />
          </IconButton>
          <Typography variant="h5" noWrap component="div" color='#000000'>
            {headerText}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { xs: '100%', sm: drawerWidth }, flexShrink: { sm: 0 }, display: { xs: 'none', sm: 'block' } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Main sx={{ p: 0 }}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
};

export default Sidebar;
