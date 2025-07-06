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
import GoogleSignInButton from "../common/GoogleSignInButton";
import { Mail } from "lucide-react";

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
        path: redirectSource || "/dashboard",
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
        className="space-y-4 px-3 py-5 rounded-lg border w-full"
      >
        <div className="flex flex-col gap-2 justify-center items-center">
          <h1 className="text-center text-lg">Welcome Back!</h1>
          <span className="text-xs text-muted-foreground w-10/12">
            Please ensure that third-party cookies are enabled in your browser
            to log in successfully.
          </span>
          <Button
            onClick={handleAutoLogin}
            disabled={isLoading}
            type="button"
            size={"xs"}
          >
            Auto Login
          </Button>
        </div>
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
                    placeholder="user123@gmail.com"
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

        <div className="w-full text-center">
          <Button disabled={isLoading} className="w-full" type="submit">
            {isLoading ? "Logging..." : "Login"}
          </Button>
        </div>

        <GoogleSignInButton isDisabled={isLoading} />
      </form>
    </Form>
  );
};

export default LoginForm;
