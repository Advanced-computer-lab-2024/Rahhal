import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { TermsAndConditionsModal } from "./TermsAndConditionsModal";
import { termsAndConditions } from "../terms-and-conditions/AdvertiserTermsAndConditions";

const advertiserSchema = z
  .object({
    companyName: z.string().min(1, "Required"),
    email: z.string().email({ message: "Invalid email address" }),
    username: z.string().regex(/^[A-Za-z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    }),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
    companyWebsite: z.string().min(1, "Required"),
    hotline: z.string().min(1, "Required"),
    companyProfile: z.string().min(1, "Required"),
    nationalID: z.instanceof(File),
    taxRegistration: z.instanceof(File),
    acceptTerms: z
      .boolean()
      .refine((val) => val === true, "You must accept the terms and conditions"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type AdvertiserFormData = z.infer<typeof advertiserSchema>;

export default function SignupAdvertiser() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AdvertiserFormData>({
    resolver: zodResolver(advertiserSchema),
    defaultValues: {
      companyName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      companyWebsite: "",
      hotline: "",
      companyProfile: "",
      acceptTerms: false,
    },
  });

  const createUser = async (newUser: any) => {
    const response = await axios.post("http://localhost:3000/api/user/users", newUser, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  };

  const onSubmit = async (data: AdvertiserFormData) => {
    setIsSubmitting(true);
    const reqBody = {
      companyName: data.companyName,
      email: data.email,
      username: data.username,
      password: data.password,
      website: data.companyWebsite,
      hotline: data.hotline,
      companyProfile: data.companyProfile,
      role: "advertiser",
    };

    try {
      toast({
        title: "Creating User",
        description: "Please wait while we create your account",
        duration: 1500,
      });
      const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

      await delay(4500);

      const response: any = await createUser(reqBody);
      toast({
        title: "User Created",
        description: "User created successfully. Wait for email confirmation of approval!",
        style: {
          backgroundColor: "#34D399",
          color: "#000000",
        },
        duration: 3000,
      });
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data.error === "Username already exists") {
          setError("username", {
            type: "manual",
            message: "Username already exists",
          });
        } else if (error.response.data.error === "This email is registered to another user") {
          setError("email", {
            type: "manual",
            message: "This email is registered to another user",
          });
        } else if (
          error.response.data.error ===
          "Username already exists and this email is registered to another user"
        ) {
          setError("username", {
            type: "manual",
            message: "Username already exists",
          });
          setError("email", {
            type: "manual",
            message: "Email already exists",
          });
        }

        toast({
          title: "Error",
          description: error.response.data.error,
          variant: "destructive",
          duration: 3000,
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
          duration: 3000,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex">
      <Card className="w-full max-w-3xl flex flex-col">
        <CardHeader className="flex flex-row items-center space-x-4">
          <CardTitle className="text-3xl font-bold">Advertiser Sign Up</CardTitle>
        </CardHeader>
        <CardContent className="flex overflow-y-auto h-[calc(100vh-200px)]">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
            <Controller
              name="companyName"
              control={control}
              render={({ field }) => (
                <div>
                  <Label htmlFor="companyName" className={errors.companyName ? "text-red-500" : ""}>
                    Company Name
                  </Label>
                  <Input
                    id="companyName"
                    placeholder="Company Name"
                    {...field}
                    className={errors.companyName ? "border-red-500" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-sm">{errors.companyName.message}</p>
                  )}
                </div>
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div>
                  <Label htmlFor="email" className={errors.email ? "text-red-500" : ""}>
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    {...field}
                    className={errors.email ? "border-red-500" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
              )}
            />

            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <div>
                  <Label htmlFor="username" className={errors.username ? "text-red-500" : ""}>
                    Username
                  </Label>
                  <Input
                    id="username"
                    placeholder="Username"
                    {...field}
                    className={errors.username ? "border-red-500" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm">{errors.username.message}</p>
                  )}
                </div>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <div>
                  <Label htmlFor="password" className={errors.password ? "text-red-500" : ""}>
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    {...field}
                    className={errors.password ? "border-red-500" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                  )}
                </div>
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <div>
                  <Label
                    htmlFor="confirmPassword"
                    className={errors.confirmPassword ? "text-red-500" : ""}
                  >
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                    className={errors.confirmPassword ? "border-red-500" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                  )}
                </div>
              )}
            />

            <Controller
              name="companyWebsite"
              control={control}
              render={({ field }) => (
                <div>
                  <Label
                    htmlFor="companyWebsite"
                    className={errors.companyWebsite ? "text-red-500" : ""}
                  >
                    Company Website
                  </Label>
                  <Input
                    id="companyWebsite"
                    placeholder="Company Website"
                    {...field}
                    className={errors.companyWebsite ? "border-red-500" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.companyWebsite && (
                    <p className="text-red-500 text-sm">{errors.companyWebsite.message}</p>
                  )}
                </div>
              )}
            />

            <Controller
              name="hotline"
              control={control}
              render={({ field }) => (
                <div>
                  <Label htmlFor="hotline" className={errors.hotline ? "text-red-500" : ""}>
                    Hotline
                  </Label>
                  <Input
                    id="hotline"
                    placeholder="Hotline"
                    {...field}
                    className={errors.hotline ? "border-red-500" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.hotline && (
                    <p className="text-red-500 text-sm">{errors.hotline.message}</p>
                  )}
                </div>
              )}
            />

            <Controller
              name="companyProfile"
              control={control}
              render={({ field }) => (
                <div>
                  <Label
                    htmlFor="companyProfile"
                    className={errors.companyProfile ? "text-red-500" : ""}
                  >
                    Company Profile
                  </Label>
                  <Input
                    id="companyProfile"
                    placeholder="Company LinkedIn Profile"
                    {...field}
                    className={errors.companyProfile ? "border-red-500" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.companyProfile && (
                    <p className="text-red-500 text-sm">{errors.companyProfile.message}</p>
                  )}
                </div>
              )}
            />

            <Controller
              name="nationalID"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <div>
                  <Label htmlFor="nationalID" className={errors.nationalID ? "text-red-500" : ""}>
                    National ID
                  </Label>
                  <Input
                    id="nationalID"
                    type="file"
                    onChange={(e) => onChange(e.target.files?.[0])}
                    {...field}
                    className={errors.nationalID ? "border-red-500" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.nationalID && (
                    <p className="text-red-500 text-sm">{errors.nationalID.message}</p>
                  )}
                </div>
              )}
            />

            <Controller
              name="taxRegistration"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <div>
                  <Label
                    htmlFor="taxRegistration"
                    className={errors.taxRegistration ? "text-red-500" : ""}
                  >
                    Tax Registration Card
                  </Label>
                  <Input
                    id="taxRegistration"
                    type="file"
                    onChange={(e) => onChange(e.target.files?.[0])}
                    {...field}
                    className={errors.taxRegistration ? "border-red-500" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.taxRegistration && (
                    <p className="text-red-500 text-sm">{errors.taxRegistration.message}</p>
                  )}
                </div>
              )}
            />

            <Controller
              name="acceptTerms"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="acceptTerms"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className={errors.acceptTerms ? "border-red-500" : ""}
                      disabled={isSubmitting}
                    />
                    <Label
                      htmlFor="acceptTerms"
                      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${errors.acceptTerms ? "text-red-500" : ""}`}
                    >
                      Accept terms and conditions
                    </Label>
                    <TermsAndConditionsModal sections={termsAndConditions} />
                  </div>
                  {errors.acceptTerms && (
                    <p className="text-red-500 text-sm">{errors.acceptTerms.message}</p>
                  )}
                </div>
              )}
            />
          </form>
        </CardContent>
        <CardFooter className="mt-6">
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
            style={{ backgroundColor: "#E1BC6D" }}
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
