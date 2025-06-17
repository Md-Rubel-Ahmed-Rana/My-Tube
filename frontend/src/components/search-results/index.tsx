import { useRouter } from "next/router";

const SearchResult = () => {
  const { query } = useRouter();
  const search_query = query?.search_query as string;
  return <div>Searched: {search_query}</div>;
};

export default SearchResult;
