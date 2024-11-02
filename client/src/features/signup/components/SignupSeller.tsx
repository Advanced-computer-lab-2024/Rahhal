import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { TermsAndConditionsModal } from "./TermsAndConditionsModal";
import { termsAndConditions } from "../terms-and-conditions/SellerTermsAndConditions";

interface SignupSellerProps {
  onBack: () => void;
}

function SignupSeller({ onBack }: SignupSellerProps) {
  const navigate = useNavigate();

  const sellerSchema = z
    .object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      email: z.string().email({ message: "Invalid email address" }).optional(),
      username: z
        .string()
        .refine((val) => /^[A-Za-z0-9_]+$/.test(val), {
          message: "Username can only contain letters, numbers, and underscores",
        })
        .optional(),
      password: z.string().optional(),
      confirmPassword: z.string().optional(),
      description: z.string().optional(),
      acceptTerms: z.boolean().describe("Accept terms and conditions.").optional(),
    })
    .refine((data) => data.firstName, {
      message: "Required",
      path: ["firstName"],
    })
    .refine((data) => data.lastName, {
      message: "Required",
      path: ["lastName"],
    })
    .refine((data) => data.email, {
      message: "Required",
      path: ["email"],
    })
    .refine((data) => data.username, {
      message: "Required",
      path: ["username"],
    })
    .refine((data) => data.password, {
      message: "Required",
      path: ["password"],
    })
    .refine((data) => data.password && data.password.length >= 8, {
      message: "Password must be at least 8 characters long",
      path: ["password"],
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    })
    .refine((data) => data.description, {
      message: "Required",
      path: ["description"],
    })
    .refine((value) => value.acceptTerms, {
      message: "You must accept the terms and conditions.",
      path: ["acceptTerms"],
    });

  const createUser: any = async (newUser: any) => {
    const response = await axios.post("http://localhost:3000/api/user/users ", newUser, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  };

  const [values, setValues] = useState<Partial<z.infer<typeof sellerSchema>>>({});

  const onSubmit = async () => {
    const reqBody = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      username: values.username,
      password: values.password,
      description: values.description,
      role: "seller",
    };

    try {
      const response = await createUser(reqBody);
      console.log(response.data);
      alert("User created successfully, awaiting approval");
      setTimeout(() => {
        navigate("/"); // seller still needs to be approved by admin
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.error);
      } else {
        alert(error);
      }
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-3xl flex flex-col" style={{ padding: 20 }}>
          <CardHeader className="flex flex-row items-center space-x-4">
            <Button onClick={onBack} variant="outline" size="sm">
              Back
            </Button>
            <CardTitle className="text-xl font-bold">Seller Sign Up</CardTitle>
          </CardHeader>
          <CardContent className="flex overflow-y-auto">
            <AutoForm
              formSchema={sellerSchema as any}
              values={values}
              onValuesChange={setValues}
              onSubmit={onSubmit}
              className="w-full"
              fieldConfig={{
                firstName: {
                  label: "First Name",
                  inputProps: {
                    type: "text",
                    placeholder: "First Name",
                  },
                },
                lastName: {
                  label: "Last Name",
                  inputProps: {
                    type: "text",
                    placeholder: "Last Name",
                  },
                },
                email: {
                  label: "Email",
                  inputProps: {
                    type: "email",
                    placeholder: "Email",
                  },
                },
                username: {
                  label: "Username",
                  inputProps: {
                    type: "text",
                    placeholder: "Username",
                  },
                },
                password: {
                  label: "Password",
                  inputProps: {
                    type: "password",
                    placeholder: "Password",
                  },
                },
                confirmPassword: {
                  label: "Confirm Password",
                  inputProps: {
                    type: "password",
                    placeholder: "Please re-enter your password",
                  },
                },
                description: {
                  label: "Description",
                  inputProps: {
                    type: "text",
                    placeholder: "Please Describe what you sell",
                  },
                },
                acceptTerms: {
                  inputProps: {},
                  description: (
                    <>
                    {"    "} By checking this box you agree to the{" "}
                    <TermsAndConditionsModal sections ={termsAndConditions} />
                    .
                  </>
                  ),
                },
              }}
            >
              <AutoFormSubmit className="bg-primary text-white w-full mt-4">Sign Up</AutoFormSubmit>
            </AutoForm>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default SignupSeller;
