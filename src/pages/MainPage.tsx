import MainLayout from '@/components/MainLayout';
import ApplicationForm from "@/components/ApplicationForm/ApplicationForm.tsx";

const MainPage: React.FC = () => {
  return (
    <MainLayout headerText={'Продукты'}>
      <ApplicationForm />
    </MainLayout>
  );
};

export default MainPage;
