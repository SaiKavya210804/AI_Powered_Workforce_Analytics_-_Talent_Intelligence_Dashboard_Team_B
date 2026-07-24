import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <Sidebar />
      <TopNavbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;