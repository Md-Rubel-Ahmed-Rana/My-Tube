import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <main
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar />
      <main
        style={{
          flex: 1,
          maxWidth: "1440px",
          width: "100%",
        }}
        className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
      >
        {children}
      </main>
      <Footer />
    </main>
  );
};

export default RootLayout;
