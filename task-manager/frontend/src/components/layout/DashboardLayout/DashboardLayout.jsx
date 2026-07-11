import Header from "../../dashboard/Header/Header";
import Sidebar from "../../dashboard/Sidebar/Sidebar";
import Footer from "../Footer/Footer";

import "./DashboardLayout.css";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <Sidebar />
      </aside>

      <div className="dashboard-content">
        <Header />

        <main className="dashboard-main">
          {children}

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;