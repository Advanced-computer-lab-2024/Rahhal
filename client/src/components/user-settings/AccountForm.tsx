import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { Button } from "../ui/button";

const user = {
  username: "YousefElbrolosy",
  email: "yousefelbrolosy8@gmail.com",
  password: "Yousef123",
};

const accountFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  oldPassword: z.string().refine((val) => val === user.password, {
    message: "Old password does not match.",
  }),
  newPassword: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number.",
    }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export default function AccountForm() {
  const [changePassword, setChangePassword] = useState(false);
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    mode: "onChange",
    defaultValues: user
  });

  function onSubmit(data: AccountFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex-1 lg:max-w-2xl">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Account</h3>
              <p className="text-sm text-muted-foreground">
                Update your account settings. Set your preferred language and timezone.
              </p>
            </div>
            <div
              data-orientation="horizontal"
              role="none"
              className="shrink-0 bg-border h-[1px] w-full"
            ></div>

            {/* Username */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name. It can be your real name or a pseudonym. You
                      can only change this once every 30 days.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Email */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@gmail.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your email address is not displayed publicly and is used to log in.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {changePassword && (
              <>
                {/* Old Password */}
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Please Re-enter your Old Password</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your Old Password" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* newPassword */}
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter your new Password" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}
            <Button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
              type="button"
              onClick={() => {
                setChangePassword((prev) => !prev);
              }}
            >
              {changePassword ? "Cancel" : "Update password"}
            </Button>

            <div className="space-y-2">
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                type="submit"
              >
                Update account
              </button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
