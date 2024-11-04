import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { TermsAndConditionsModal } from "./TermsAndConditionsModal";
import { termsAndConditions } from "../terms-and-conditions/TouistTermsAndConditions";
import { countries } from "../utils/constants";
import { touristSchema } from "../utils/ZodSchemas/touristSchema";
import { createUser } from "@/api-calls/users-api-calls";

type TouristFormData = z.infer<typeof touristSchema>;

export default function SignupTourist() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<TouristFormData>({
    resolver: zodResolver(touristSchema),
    defaultValues: {
      job: "No",
      acceptTerms: false,
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const jobValue = watch("job");

  const onSubmit = async (data: TouristFormData) => {
    setIsSubmitting(true);
    const reqBody = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      username: data.username,
      password: data.password,
      dob: data.dob,
      role: "tourist",
      nationality: data.nationality,
      job: data.job === "Yes" ? "Student" : data.jobDescription,
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
        description: "User created successfully!",
        style: {
          backgroundColor: "#34D399",
          color: "#000000",
        },
        duration: 3000,
      });
      setTimeout(() => {
        navigate("/entertainment/" + response._id);
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
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex">
      <Card className="w-full max-w-3xl flex flex-col">
        <CardHeader className="flex flex-row items-center space-x-4">
          <CardTitle className="text-3xl font-bold">Tourist Sign Up</CardTitle>
        </CardHeader>
        <CardContent className="flex overflow-y-auto h-[calc(100vh-200px)]">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <div>
                  <Label htmlFor="firstName" className={errors.firstName ? "text-red-500" : ""}>
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="First Name"
                    {...field}
                    className={errors.firstName ? "border-red-500" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                  )}
                </div>
              )}
            />

            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <div>
                  <Label htmlFor="lastName" className={errors.lastName ? "text-red-500" : ""}>
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Last Name"
                    {...field}
                    className={errors.lastName ? "border-red-500" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">{errors.lastName.message}</p>
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
              name="dob"
              control={control}
              render={({ field }) => (
                <div>
                  <Label htmlFor="dob" className={errors.dob ? "text-red-500" : ""}>
                    Date of Birth
                  </Label>
                  <Input
                    id="dob"
                    type="date"
                    {...field}
                    value={
                      field.value
                        ? typeof field.value === "string"
                          ? field.value
                          : field.value instanceof Date
                            ? field.value.toISOString().split("T")[0]
                            : ""
                        : ""
                    }
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      field.onChange(isNaN(date.getTime()) ? "" : date);
                    }}
                    className={errors.dob ? "border-red-500" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
                </div>
              )}
            />

            <Controller
              name="nationality"
              control={control}
              render={({ field }) => (
                <div>
                  <Label htmlFor="nationality" className={errors.nationality ? "text-red-500" : ""}>
                    Nationality
                  </Label>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger
                      className={`w-full ${errors.nationality ? "border-red-500" : ""}`}
                      disabled={isSubmitting}
                    >
                      <SelectValue placeholder="Select your nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(countries).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.nationality && (
                    <p className="text-red-500 text-sm">{errors.nationality.message}</p>
                  )}
                </div>
              )}
            />

            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <div>
                  <Label htmlFor="phoneNumber" className={errors.phoneNumber ? "text-red-500" : ""}>
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    placeholder="Phone Number"
                    {...field}
                    className={errors.phoneNumber ? "border-red-500" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
                  )}
                </div>
              )}
            />

            <Controller
              name="job"
              control={control}
              render={({ field }) => (
                <div>
                  <Label className={`mb-2 block ${errors.job ? "text-red-500" : ""}`}>
                    Are you a student?
                  </Label>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                    disabled={isSubmitting}
                  >
                    <div className="flex items-center space-x-3 space-y-0">
                      <RadioGroupItem value="Yes" id="job-yes" />
                      <Label htmlFor="job-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-3 space-y-0">
                      <RadioGroupItem value="No" id="job-no" />
                      <Label htmlFor="job-no">No</Label>
                    </div>
                  </RadioGroup>
                  {errors.job && <p className="text-red-500 text-sm">{errors.job.message}</p>}
                </div>
              )}
            />

            {jobValue === "No" && (
              <Controller
                name="jobDescription"
                control={control}
                render={({ field }) => (
                  <div>
                    <Label
                      htmlFor="jobDescription"
                      className={errors.jobDescription ? "text-red-500" : ""}
                    >
                      Job Description
                    </Label>
                    <Input
                      id="jobDescription"
                      placeholder="Please provide your job description"
                      {...field}
                      className={errors.jobDescription ? "border-red-500" : ""}
                      disabled={isSubmitting}
                    />
                    {errors.jobDescription && (
                      <p className="text-red-500 text-sm">{errors.jobDescription.message}</p>
                    )}
                  </div>
                )}
              />
            )}

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
