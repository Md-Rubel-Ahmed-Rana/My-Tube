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
import PasswordInputField from "../common/PasswordInputField";
import { useRouter } from "next/router";
import { useAdminLoginMutation } from "@/features/admin";
import { Mail } from "lucide-react";

const AdminLoginForm = () => {
  const router = useRouter();
  const redirectSource = router?.query?.source as string;

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login, { isLoading }] = useAdminLoginMutation();

  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    await handleApiMutation(
      login,
      values,
      200,
      {
        error: "Failed to login",
        success: "Admin logged in successfully",
      },
      {
        isRedirect: true,
        path: redirectSource || "/admin/dashboard",
        router,
      }
    );
  };

  const handleAutoLogin = () => {
    handleLogin({
      email: process.env.NEXT_PUBLIC_NEXT_USER_EMAIL as string,
      password: process.env.NEXT_PUBLIC_NEXT_USER_PASS as string,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className="space-y-6 w-full text-gray-700 border px-5 py-10 rounded-2xl dark:text-gray-200"
      >
        {/* Logo or Brand */}
        <div className="text-center flex flex-col justify-center items-center gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Admin Panel
          </h1>
          <p className="text-sm">Sign in to manage everything</p>
          <span className="text-xs text-muted-foreground text-start">
            Please ensure that third-party cookies are enabled in your browser
            to log in successfully.
          </span>
          <Button
            onClick={handleAutoLogin}
            disabled={isLoading}
            type="button"
            size={"xs"}
            className="w-24"
          >
            Auto Login
          </Button>
        </div>

        {/* Email Field */}
        <FormField
          control={form.control}
          disabled={isLoading}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="admin@example.com"
                    className="pl-10 bg-white/10 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <PasswordInputField form={form} isLoading={isLoading} />

        <div className="text-right">
          <span className="text-sm text-gray-400 hover:underline cursor-pointer">
            Forgot password?
          </span>
        </div>

        <div className="w-full text-center">
          <Button disabled={isLoading} className="w-full" type="submit">
            {isLoading ? "Logging..." : "Login"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AdminLoginForm;
