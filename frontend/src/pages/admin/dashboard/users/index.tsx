import AdminDashboardLayout from "@/components/admin-dashboard-layout";
import SEOHead from "@/components/common/SEOHead";
import UsersList from "@/components/users/UsersList";
import AdminAuthGuard from "@/middleware/AdminAuthGuard";

const UsersPage = () => {
  return (
    <>
      <SEOHead title="Users - MyTube" />
      <AdminDashboardLayout>
        <UsersList />
      </AdminDashboardLayout>
    </>
  );
};

export default AdminAuthGuard(UsersPage);
