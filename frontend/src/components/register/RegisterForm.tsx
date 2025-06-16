import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/schemas/register.schema";
import { useUserRegisterMutation } from "@/features/auth";
import { handleApiMutation } from "@/utils/handleApiMutation";
import PasswordInputField from "../common/PasswordInputField";
import { useRouter } from "next/router";

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const [register, { isLoading }] = useUserRegisterMutation();

  const handleRegister = async (values: z.infer<typeof registerSchema>) => {
    await handleApiMutation(
      register,
      values,
      201,
      {
        error: "Failed to register",
        success: "User registered successfully",
      },
      {
        isRedirect: true,
        path: "/account/login",
        router,
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleRegister)}
        className="space-y-8 px-3 py-5 rounded-lg border w-full"
      >
        <div className="text-center text-lg">
          <h1>Create your account</h1>
        </div>
        <FormField
          control={form.control}
          disabled={isLoading}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>Your full name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          disabled={isLoading}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} />
              </FormControl>
              <FormDescription>We’ll never share your email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <PasswordInputField
          form={form}
          isLoading={isLoading}
          shouldShowDesc={true}
        />

        <div className="w-full text-center">
          <Button disabled={isLoading} type="submit">
            {isLoading ? "Creating..." : "Create account"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
