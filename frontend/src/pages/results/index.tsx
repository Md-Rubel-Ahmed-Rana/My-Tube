import SEOHead from "@/components/common/SEOHead";
import SearchResult from "@/components/search-results";
import RootLayout from "@/layout/RootLayout";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const SearchResultPage = () => {
  const { query } = useRouter();
  const search_query = query?.search_query as string;
  return (
    <>
      <SEOHead title={search_query || "unknown"} />
      <SearchResult />
    </>
  );
};

export default SearchResultPage;

SearchResultPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
