import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-3">
      <h1 className="text-2xl font-semibold">Welcome to My Tube</h1>
      <Button>Click Me</Button>
    </div>
  );
}
