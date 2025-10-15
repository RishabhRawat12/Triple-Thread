import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const MainLayout = () => {
  return (
    <>
      <header className="container">
        <Navbar />
      </header>
      <main className="container">
        <Outlet />
      </main>
      <div className="container">
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;