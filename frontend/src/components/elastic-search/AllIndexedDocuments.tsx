import { useGetElasticSearchDocumentsQuery } from "@/features/elasticsearch";
import { IElasticsearchDoc } from "@/types/elasticsearch.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const AllIndexedDocuments = () => {
  const { data, isLoading } = useGetElasticSearchDocumentsQuery({});
  const docs = (data?.data || []) as IElasticsearchDoc[];

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <Card className="rounded-none px-0 bg-gray-100 dark:bg-gray-700">
          <CardHeader>
            <CardTitle>Indexed Documents ({docs.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px] text-gray-800 dark:text-gray-200">
                    #
                  </TableHead>
                  <TableHead className="text-gray-800 dark:text-gray-200">
                    Channel
                  </TableHead>
                  <TableHead className="text-gray-800 dark:text-gray-200">
                    Title
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {docs.length > 0 ? (
                  docs.map((doc, index) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{doc.channel}</TableCell>
                      <TableCell>{doc.title}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center text-muted-foreground py-6"
                    >
                      No documents found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AllIndexedDocuments;
