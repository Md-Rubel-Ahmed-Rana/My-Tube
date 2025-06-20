import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function PageNotFound404() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted px-4">
      <Card className="max-w-md w-full text-center shadow-lg">
        <CardContent className="p-8 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-destructive">404</h1>
            <p className="text-lg font-semibold mt-2">Page Not Found</p>
            <p className="text-sm text-muted-foreground mt-1">
              The page you are looking for does not exist or has been moved.
            </p>
          </div>

          <Link href="/">
            <Button className="w-full">Go back to Home</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
