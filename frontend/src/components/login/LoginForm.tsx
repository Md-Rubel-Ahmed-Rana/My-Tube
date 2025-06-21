import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schemas/login.schema";
import { handleApiMutation } from "@/utils/handleApiMutation";
import { useUserLoginMutation } from "@/features/auth";
import PasswordInputField from "../common/PasswordInputField";
import { useRouter } from "next/router";

const LoginForm = () => {
  const router = useRouter();
  const redirectSource = router?.query?.source as string;
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [login, { isLoading }] = useUserLoginMutation();
  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    await handleApiMutation(
      login,
      values,
      200,
      {
        error: "Failed to login",
        success: "User logged in successfully",
      },
      {
        isRedirect: true,
        path: redirectSource || "/dashboard/videos",
        router,
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className="space-y-8 px-3 py-5 rounded-lg border w-full"
      >
        <div className="text-center text-lg">
          <h1>Welcome Back!</h1>
        </div>
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
              <FormMessage />
            </FormItem>
          )}
        />

        <PasswordInputField form={form} isLoading={isLoading} />

        <div className="w-full text-center ">
          <Button disabled={isLoading} className="w-full" type="submit">
            {isLoading ? "Logging..." : "Login"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
