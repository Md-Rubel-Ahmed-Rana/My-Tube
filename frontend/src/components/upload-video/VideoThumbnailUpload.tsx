/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = {
  form: any;
  isLoading: boolean;
  step?: number;
};

const VideoThumbnailUpload = ({ form, isLoading, step }: Props) => {
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(
    form.getValues("thumbnail") || null
  );
  const [autoGenerateThumbnail, setAutoGenerateThumbnail] = useState(false);

  const persistedThumbnailRef = useRef<File | undefined>(undefined);
  const watchedThumbnail = form.watch("thumbnail");

  useEffect(() => {
    if (watchedThumbnail) {
      persistedThumbnailRef.current = watchedThumbnail;
    }
  }, [watchedThumbnail]);

  useEffect(() => {
    if (persistedThumbnailRef.current) {
      form.setValue("thumbnail", persistedThumbnailRef.current);
    }
  }, [step]);

  return (
    <div className="space-y-3 w-full">
      <div className="flex items-center space-x-2">
        <Checkbox
          disabled={isLoading}
          id="autoGenerate"
          checked={autoGenerateThumbnail}
          onCheckedChange={(checked) => {
            setAutoGenerateThumbnail(!!checked);
            if (checked) {
              form.setValue("thumbnail", null);
              setSelectedThumbnail(null);
            } else {
              const currentThumbnail = form.getValues("thumbnail");
              if (currentThumbnail) {
                setSelectedThumbnail(currentThumbnail);
              }
            }
          }}
        />
        <label htmlFor="autoGenerate" className="text-sm">
          Auto-generate thumbnail
        </label>
      </div>

      {/* Thumbnail Upload (hidden if auto-generate is checked) */}
      {!autoGenerateThumbnail ? (
        <FormField
          control={form.control}
          disabled={isLoading}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail (optional)</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  className="cursor-pointer"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      field.onChange(file);
                      form.setValue("thumbnail", file);
                      setSelectedThumbnail(file);
                    } else {
                      field.onChange(null);
                      setSelectedThumbnail(null);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ) : (
        <p className="text-sm text-muted-foreground">
          Your video thumbnail will be auto-generated.
        </p>
      )}

      {selectedThumbnail && !autoGenerateThumbnail && (
        <div className="mt-4">
          <img
            src={URL.createObjectURL(selectedThumbnail)}
            alt="Selected Thumbnail"
            className="w-full lg:w-96 h-48 rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default VideoThumbnailUpload;
