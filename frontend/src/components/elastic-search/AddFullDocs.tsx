import { useAddElasticSearchDocumentsMutation } from "@/features/elasticsearch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/router";
import { handleApiMutation } from "@/utils/handleApiMutation";

const AddFullDocs = () => {
  const [addDocs, { isLoading, data }] = useAddElasticSearchDocumentsMutation();
  const router = useRouter();

  const handleAdd = async () => {
    await handleApiMutation(
      addDocs,
      {},
      200,
      {
        error: "Failed to add documents",
        success: "All the docs added to Elastic search",
      },
      {
        isRedirect: true,
        router,
        path: "/admin/dashboard/elasticsearch/documents",
      }
    );
  };

  return (
    <Card className="w-full max-w-xl mx-auto mt-10 shadow-lg bg-gray-200 dark:bg-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Sync Full Data to ElasticSearch
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 text-center">
        <p className="text-muted-foreground">
          Click the button below to push all database documents to ElasticSearch
          index.
        </p>

        <Button className="border-2" onClick={handleAdd} disabled={isLoading}>
          <Plus className="mr-2 h-4 w-4" />
          {isLoading ? "Adding..." : "Add All to ElasticSearch"}
        </Button>

        {data?.success && (
          <div className="bg-green-100 text-green-800 p-4 rounded-md text-sm">
            ✅ {data.message}
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Total: {data.data.total}</li>
              <li>Successful: {data.data.successful}</li>
              <li>Failed: {data.data.failed}</li>
              <li>Noop: {data.data.noop}</li>
              <li>Retry: {data.data.retry}</li>
              <li>Time Taken: {data.data.time}ms</li>
              <li>Bytes: {data.data.bytes}</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AddFullDocs;
