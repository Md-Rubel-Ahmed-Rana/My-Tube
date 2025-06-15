import React from "react";
import { Button } from "../ui/button";

const Home = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      <h1 className="text-2xl font-semibold">Welcome to My Tube</h1>
      <Button>Click Me</Button>
    </div>
  );
};

export default Home;
