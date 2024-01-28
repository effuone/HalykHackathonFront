import MainLayout from '@/components/MainLayout';
import ApplicationForm from "@/components/ApplicationForm/ApplicationForm.tsx";

const MainPage: React.FC = () => {
  return (
    <MainLayout headerText={'Вероятность Исполнения Страхового Полиса'}>
      <ApplicationForm />
    </MainLayout>
  );
};

export default MainPage;
