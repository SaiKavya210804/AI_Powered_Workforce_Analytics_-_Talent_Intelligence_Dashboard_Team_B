import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-section">

        <TopNavbar />

        <main className="page-container">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default Layout;