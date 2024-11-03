import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { EditContext } from "./SettingsView";
import { useForm } from "react-hook-form";
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

export default function AccountForm() {
  const { user } = useContext(EditContext);

  const walletValidator = z.object({
    wallet: z.number().optional(),
  });

  type WalletValues = z.infer<typeof walletValidator>;

  const form = useForm<WalletValues>({
    resolver: zodResolver(walletValidator),
    mode: "onChange",
    defaultValues: {
      wallet: user.wallet || 0,
    },
  });

  useEffect(() => {
    form.reset({
      wallet: user.wallet || 0,
    });
  }, [user, form]);

  return (
    <Form {...form}>
      {/* Wallet */}
      {user.role === "tourist" && (
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="wallet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wallet</FormLabel>
                <FormControl>
                  <Input type="number" disabled {...field} />
                </FormControl>
                <FormDescription>This is your wallet balance.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </Form>
  );
}