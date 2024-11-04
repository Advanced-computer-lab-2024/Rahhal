import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { EditContext } from "./SettingsView";
import { useForm } from "react-hook-form";
import styles from "../styles/WalletForm.module.css";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardsPaymentMethod } from "./PaymentMethodForm";

export default function AccountForm() {
  const { user } = useContext(EditContext);

  const balanceValidator = z.object({
    balance: z.number().optional(),
  });

  type balanceValues = z.infer<typeof balanceValidator>;

  const form = useForm<balanceValues>({
    resolver: zodResolver(balanceValidator),
    mode: "onChange",
    defaultValues: {
      balance: user.wallet?.balance || 0,
    },
  });

  useEffect(() => {
    form.reset({
      balance: user.wallet?.balance || 0,
    });
  }, [user, form]);

  return (
    <>
      <h3 className="text-lg font-medium">Payment Information</h3>
      <Form {...form}>
        {/* Wallet */}
        {user.role === "tourist" && (
          <FormField
            control={form.control}
            name="balance"
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
        )}
      </Form>
      <div id={styles["NO_CARD_CONTAINER"]} className={styles["hero-body"]}>
        <h3 className={styles["title"]}>Book Faster!</h3>
        <h4 id={styles["noCardSubTitle"]} className={styles["subtitle"]}>
          <div className={styles["subtitleText"]}>
            Book trips with one easy click when you save a payment method to your Rahhal account.
          </div>
        </h4>
        <div className="grid justify-items-center">
          <Dialog>
            <DialogHeader>
              <DialogTitle></DialogTitle>
            </DialogHeader>
            <DialogTrigger>
              {" "}
              <Button id={styles["addBtn"]}>+ Add Payment Method</Button>
            </DialogTrigger>
            <DialogContent>
              <CardsPaymentMethod></CardsPaymentMethod>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
