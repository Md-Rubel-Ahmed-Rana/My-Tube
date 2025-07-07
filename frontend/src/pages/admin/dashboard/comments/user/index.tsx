import AdminDashboardLayout from "@/components/admin-dashboard-layout";
import CommentsByUser from "@/components/comments-admin/CommentsByUser";
import SEOHead from "@/components/common/SEOHead";
import AdminAuthGuard from "@/middleware/AdminAuthGuard";
import React from "react";

const CommentsByVideoPage = () => {
  return (
    <>
      <SEOHead title="Comments - MyTube" />
      <AdminDashboardLayout>
        <CommentsByUser />
      </AdminDashboardLayout>
    </>
  );
};

export default AdminAuthGuard(CommentsByVideoPage);
