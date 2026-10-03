import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }: any) => {
  return (
    <>
      <Navbar />

      <Sidebar />

      <main className="main-content">
        {children}
      </main>
    </>
  );
};

export default Layout;