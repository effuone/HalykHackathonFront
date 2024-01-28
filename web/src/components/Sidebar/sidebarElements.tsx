import { ProductionQuantityLimitsOutlined } from '@mui/icons-material';
import {
  InventoryOutlined,
  TroubleshootOutlined,
  SavingsOutlined,
  AccountBalanceWalletOutlined,
} from '@mui/icons-material';

type SidebarElement = {
  headerKey: string;
  headerText: string;
  icon: React.ReactNode;
};

const sidebarElements: SidebarElement[] = [
  {
    headerKey: '/score',
    headerText: 'Главная',
    icon: <TroubleshootOutlined />,
  },
  {
    headerKey: 'https://www.halyklife.kz/customer-support/insurance-case',
    headerText: 'Страховой случай',
    icon: <SavingsOutlined />,
  },
  {
    headerKey: 'https://www.halyklife.kz/customer-support/useful-links',
    headerText: 'Фин. грамотность',
    icon: <AccountBalanceWalletOutlined />,
  },
  {
    headerKey: 'https://online.halyklife.kz/covid-19/',
    headerText: 'Купить полис',
    icon: <InventoryOutlined />,
  },
];

export default sidebarElements;
