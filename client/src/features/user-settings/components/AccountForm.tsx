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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { EditContext } from "./SettingsView";
import { EditContextAdmin } from "@/features/admin/components/AdminHomepage";
import { EditContextSeller } from "@/features/seller/components/SellerHomePage";
import { EditContextTourGuide } from "@/features/tour-guide/components/TourGuideHomePage";
import { EditContextTourGov } from "@/features/tourism-governor/components/TourismGovernorHomepage";
import { EditContextAdvertiser } from "@/features/advertiser/components/AdvertiserHomePage";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { deleteUserNoReload, updateUser } from "@/api-calls/users-api-calls";
import DoubleCheckPopupWrapper from "../../../components/DoubleCheckPopUpWrapper";
import { fetchPreferenceTags } from "@/api-calls/preference-tags-api-calls";
import { Checkbox } from "@/components/ui/checkbox";
export default function AccountForm() {
  const [preferenceTags, setPreferenceTags] = useState<{ _id: string; name: string }[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [editForm, setEditForm] = useState(false);
  const [isDoubleCheckDialogOpen, setIsDoubleCheckDialogOpen] = useState(false);

  const url = window.location.href;
  const context = url.includes("admin")
    ? EditContextAdmin
    : url.includes("seller")
      ? EditContextSeller
      : url.includes("tour-guide")
        ? EditContextTourGuide
        : url.includes("tourism-governor")
          ? EditContextTourGov
          : url.includes("advertiser")
            ? EditContextAdvertiser
            : EditContext;

  const { user } = useContext(context);
  const { id } = useParams();

  const passwordValidator = z.object({
    oldPassword: z
      .string()
      .refine((val) => val === user.password, {
        message: "Old password does not match.",
      })
      .optional(),
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
      })
      .refine((val) => val !== user.password, {
        message: "New password must be different from the old password.",
      })
      .optional(),
  });

  const accountFormSchema = z.object({
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(30, {
        message: "Username must not be longer than 30 characters.",
      })
      .optional(),
    email: z
      .string({
        required_error: "Please select an email to display.",
      })
      .email()
      .optional(),

    password: z.string().optional(),
    preferences: z.array(z.string()),
  });

  type AccountFormValues = z.infer<typeof accountFormSchema>;
  type passwordValidatorValue = z.infer<typeof passwordValidator>;

  const [changePassword, setChangePassword] = useState(false);
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    mode: "onChange",
    defaultValues: {
      username: user.username || "",
      email: user.email || "",
      password: user.password || "",
      preferences: user.preferences || [],
    },
  });
  const oldPasswordForm = useForm<passwordValidatorValue>({
    resolver: zodResolver(passwordValidator),
    mode: "onChange",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  //for preferences
  useEffect(() => {
    fetchPreferenceTags().then((tags) =>
      setPreferenceTags(tags as { _id: string; name: string }[]),
    );
    form.reset(user);
  }, [user, form]);

  //submiting preferences
  async function update(data: AccountFormValues) {
    try {
      await updateUser(user, data);
      if (data.email) user.email = data.email;
      if (data.password) user.password = data.password;
      if (data.preferences) user.preferences = data.preferences;
      setEditForm(false);

      toast({
        title: "Updated Successfully",
        style: {
          backgroundColor: "#34D399",
          color: "#FFFFFF",
        },
      });
    } catch (error) {
      toast({
        title: "Error: " + error,
        variant: "destructive",
      });
    }
  }
  async function onSubmit(data: AccountFormValues) {
    toast({
      title: "Updating ... ",
    });
    setTimeout(() => {}, 1500);

    if (changePassword) {
      const isOldPasswordValid = await oldPasswordForm.trigger();

      if (isOldPasswordValid) {
        update({ ...data, password: oldPasswordForm.getValues().newPassword });
        setChangePassword(false);
        oldPasswordForm.reset();
      } else {
        console.log("Form errors:", oldPasswordForm.formState.errors);
      }
    } else {
      update(data);
    }
    form.reset(data);
    oldPasswordForm.reset();
  }

  async function handleDeleteAccount() {
    try {
      await deleteUserNoReload(user);
      // navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        setIsDoubleCheckDialogOpen(false);
        toast({
          title: "Ops, something went wrong!",
          description: error.response?.data.error,
          variant: "destructive",
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex-1" style={{ width: user.role === "tourist" ? "80%" : "100%" }}>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Account</h3>
              <Button
                onClick={() => {
                  if (!editForm) {
                    setEditForm(true);
                  } else {
                    form.reset(user);
                    oldPasswordForm.reset();
                    setChangePassword(false);
                    setEditForm(false);
                  }
                }}
                type="button"
                className="bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] text-white shadow-lg inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2"
              >
                <span>{editForm ? "Cancel" : "Edit Account"}</span>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Update your account settings. Set your preferred language and timezone.
            </p>
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
                      <Input disabled placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name. It can be your real name or a pseudonym. You
                      cannot change this.
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
                      <Input disabled={!editForm} placeholder="johndoe@gmail.com" {...field} />
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
              <Form {...oldPasswordForm}>
                {/* Old Password */}
                <div className="space-y-2">
                  <FormField
                    control={oldPasswordForm.control}
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
                    control={oldPasswordForm.control}
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
              </Form>
            )}
            <div className="flex gap-4 item">
              <button
                className={`mt-2 ${editForm ? "text-blue-500" : "text-blue-300"}`}
                type="button"
                disabled={!editForm}
                onClick={() => {
                  setChangePassword((prev) => !prev);
                  if (changePassword) {
                    oldPasswordForm.reset();
                  }
                }}
              >
                {changePassword ? "Cancel" : "Change password"}
              </button>
            </div>
            {/* Preferences */}
            {user.role === "tourist" && (
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="preferences"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Preferences</FormLabel>
                        <FormDescription>Select your favorite categories.</FormDescription>
                      </div>
                      {preferenceTags.map((item) => (
                        <FormField
                          key={item._id}
                          control={form.control}
                          name="preferences"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item._id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.name)}
                                    disabled={!editForm}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item.name])
                                        : field.onChange(
                                            field.value?.filter((value) => value !== item.name),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">{item.name}</FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            <div className="space-y-2">
              <div className="grid grid-cols-12">
                <div className="col-span-2">
                  <button
                    className="bg-[var(--primary-color)] hover:bg-[var(--primary-color-hover)] text-white shadow-lg inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2"
                    type="submit"
                    disabled={
                      !editForm ||
                      (!form.formState.isDirty && !oldPasswordForm.formState.isDirty) ||
                      (changePassword && !oldPasswordForm.formState.isValid)
                    }
                  >
                    Update account
                  </button>
                </div>
                <div className="col-span-8"></div>
                <div className="col-span-2 ml-auto">
                  <DoubleCheckPopupWrapper
                    customMessage="This will permanently delete your account."
                    isOpen={isDoubleCheckDialogOpen}
                    onAction={handleDeleteAccount}
                    onCancel={() => setIsDoubleCheckDialogOpen(false)}
                  >
                    <Button
                      variant="destructive"
                      className="rounded-md text-sm font-medium h-9 px-4 py-2"
                      onClick={() => setIsDoubleCheckDialogOpen(true)}
                    >
                      Delete My Account
                    </Button>
                  </DoubleCheckPopupWrapper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
