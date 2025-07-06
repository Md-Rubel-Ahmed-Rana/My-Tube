import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

type Props = {
  setSearchText: (value: string) => void;
};

const VideoSearchForm = ({ setSearchText }: Props) => {
  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(input);
    }, 500);

    return () => clearTimeout(handler);
  }, [input]);

  useEffect(() => {
    if (debouncedInput) {
      setSearchText(debouncedInput);
    }
  }, [debouncedInput, setSearchText]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchText(input);
    }
  };

  return (
    <div>
      <Input
        placeholder="Search videos..."
        className="w-64"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default VideoSearchForm;
