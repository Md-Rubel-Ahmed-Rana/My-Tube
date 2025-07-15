import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { ICategory } from "@/types/category.type";
import { useEffect } from "react";
import { toast } from "sonner";

const UpdateCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  priority: z.coerce.number().min(0, "Priority must be 0 or greater"),
});

type UpdateCategoryFormData = z.infer<typeof UpdateCategorySchema>;

type Props = {
  category: ICategory;
  open: boolean;
  setOpen: (value: boolean) => void;
};

const CategoryUpdateModal = ({ category, open, setOpen }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdateCategoryFormData>({
    resolver: zodResolver(UpdateCategorySchema),
    defaultValues: {
      name: category.name,
      description: category.description,
      priority: category.priority,
    },
  });

  const handleUpdateCategory = (data: UpdateCategoryFormData) => {
    const updatedFields: Partial<UpdateCategoryFormData> = {};

    if (data.name !== category.name) {
      updatedFields.name = data.name;
    }

    if (data.description !== category.description) {
      updatedFields.description = data.description;
    }

    if (data.priority !== category.priority) {
      updatedFields.priority = data.priority;
    }

    if (Object.keys(updatedFields).length === 0) {
      toast.warning("No changes detected!");
      return;
    }

    console.log("Updated Fields:", updatedFields);
  };

  useEffect(() => {
    reset({
      name: category.name,
      description: category.description,
      priority: category.priority,
    });
  }, [category, open, reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleUpdateCategory)}
          className="space-y-4"
        >
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} rows={3} />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="priority">Priority</Label>
            <Input id="priority" type="number" {...register("priority")} />
            {errors.priority && (
              <p className="text-red-500 text-sm">{errors.priority.message}</p>
            )}
          </div>

          <DialogFooter>
            <div className="flex justify-between items-center w-full">
              <Button type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryUpdateModal;
