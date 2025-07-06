import AdminDashboardLayout from "@/components/admin-dashboard-layout";
import SEOHead from "@/components/common/SEOHead";
import SingleVideoDetails from "@/components/video-details/SingleVideoDetails";
import AdminAuthGuard from "@/middleware/AdminAuthGuard";
import { useRouter } from "next/router";

const SingleVideoDetailsPage = () => {
  const { query } = useRouter();
  const title = query?.title as string;
  return (
    <>
      <SEOHead title={title || "MyTube"} />
      <AdminDashboardLayout>
        <SingleVideoDetails />
      </AdminDashboardLayout>
    </>
  );
};

export default AdminAuthGuard(SingleVideoDetailsPage);
