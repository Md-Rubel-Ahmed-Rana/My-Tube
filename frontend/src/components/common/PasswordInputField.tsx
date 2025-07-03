/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

type Props = {
  form: any;
  isLoading: boolean;
  shouldShowDesc?: boolean;
};

const PasswordInputField = ({
  form,
  isLoading,
  shouldShowDesc = false,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormField
      control={form.control}
      disabled={isLoading}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...field}
                className="pl-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-500"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </FormControl>
          {shouldShowDesc && (
            <FormDescription>
              Must be 8+ chars with uppercase, number, and special char.
            </FormDescription>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordInputField;
