"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  form: any;
  isLoading: boolean;
};

const VideoTags = ({ form, isLoading }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState<string[]>(form.getValues("tags") || []);

  useEffect(() => {
    form.setValue("tags", tags);
  }, [tags, form]);

  const handleAddTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemove = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <FormField
      control={form.control}
      name="tags"
      render={() => (
        <FormItem className="border">
          <FormLabel>Tags</FormLabel>
          <div className="flex items-center gap-2">
            <FormControl>
              <Input
                type="text"
                autoComplete="off"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={(e) => {
                  e.currentTarget.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
                placeholder="e.g. music, tutorial"
                disabled={isLoading}
              />
            </FormControl>
            <Button
              type="button"
              onClick={handleAddTag}
              disabled={!inputValue.trim()}
            >
              Add
            </Button>
          </div>
          <FormMessage />
          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1 text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="ml-1 focus:outline-none"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </FormItem>
      )}
    />
  );
};

export default VideoTags;
