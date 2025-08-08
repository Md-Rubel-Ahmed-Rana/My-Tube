import { useGetElasticSearchDocumentsQuery } from "@/features/elasticsearch";

const AllIndexedDocuments = () => {
  const { data, isLoading } = useGetElasticSearchDocumentsQuery({});

  console.log({ isLoading, data });

  return (
    <div className="flex justify-center items-center">
      <h1 className="text-2xl font-semibold">
        All Documents will be shown here!
      </h1>
    </div>
  );
};

export default AllIndexedDocuments;
