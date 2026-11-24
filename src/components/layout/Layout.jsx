import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="layout-wrapper">
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
