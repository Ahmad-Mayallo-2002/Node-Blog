import React from "react";
import DashboardSidebar from "../../components/DashboardSibebar/dashboardsidebar.jsx";

import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <main className="dashboard grid md:grid-cols-[250px_1fr] grid-cols-1 gap-4 p-4">
        <DashboardSidebar />
        <div className="content p-4 dark:bg-[rgb(24,31,54)]">
          <Outlet />
        </div>
      </main>
    </>
  );
}
