import AdminDashboardLayout from "@/components/admin-dashboard-layout";
import { VideosAnalytics } from "@/components/admin-dashboard/analytics";
import SEOHead from "@/components/common/SEOHead";
import AdminAuthGuard from "@/middleware/AdminAuthGuard";
import React from "react";

const VideosStatsPage = () => {
  return (
    <>
      <SEOHead title="Videos Stats - MyTube" />
      <AdminDashboardLayout>
        <div className="p-2 lg:p-4">
          <VideosAnalytics />
        </div>
      </AdminDashboardLayout>
    </>
  );
};

export default AdminAuthGuard(VideosStatsPage);
