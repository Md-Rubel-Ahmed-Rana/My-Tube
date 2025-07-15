/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { categorySchema, ICategorySchema } from "@/schemas/category.schema";
import { useCreateCategoryMutation } from "@/features/category";
import { handleApiMutation } from "@/utils/handleApiMutation";

const CreateCategory = () => {
  const [create, { isLoading }] = useCreateCategoryMutation();
  const form = useForm<any>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      is_active: true,
      priority: 0,
    },
  });

  const onSubmit = async (data: ICategorySchema) => {
    await handleApiMutation(create, { data }, 201);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 p-2 lg:px-4 text-gray-800 dark:text-gray-200"
      >
        <FormField
          control={form.control}
          disabled={isLoading}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          disabled={isLoading}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          disabled={isLoading}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormLabel>Active</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading ? "Creating..." : "Create Category"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateCategory;
