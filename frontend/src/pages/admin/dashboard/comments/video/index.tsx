import AdminDashboardLayout from "@/components/admin-dashboard-layout";
import CommentsByVideo from "@/components/comments-admin/CommentsByVideo";
import SEOHead from "@/components/common/SEOHead";
import AdminAuthGuard from "@/middleware/AdminAuthGuard";
import React from "react";

const CommentsByVideoPage = () => {
  return (
    <>
      <SEOHead title="Comments - MyTube" />
      <AdminDashboardLayout>
        <CommentsByVideo />
      </AdminDashboardLayout>
    </>
  );
};

export default AdminAuthGuard(CommentsByVideoPage);
