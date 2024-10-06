import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import AutoForm , {AutoFormSubmit} from "./auto-form/src/components/ui/auto-form";
import { useState } from "react";
import axios from 'axios';
import { Button } from "../ui/button";

interface SignupAdvertiserProps {
    onBack: () => void;
}

function SignupAdvertiser({ onBack }: SignupAdvertiserProps){
    const advertiserSchema = z.object({
        companyName: z.string().optional(),
        email: z.string().email({message: "Invalid email address"}).optional(),
        username: z.string()
                   .refine((val) => /^[A-Za-z0-9_]+$/.test(val), {
                        message: "Username can only contain letters, numbers, and underscores",
                        }).optional(),
        password: z.string().optional(),
        confirmPassword: z.string().optional(),
        companyWebsite: z.string().optional(),
        hotline: z.string().optional(),
        companyProfile: z.string().optional(),
        acceptTerms: z
                    .boolean()
                    .describe("Accept terms and conditions.")
                    .optional(),
    })
    .refine((data) =>  data.companyName , {
        message: "Required",
        path: ["companyName"],
    })
    .refine((data) => data.email , {
        message: "Required",
        path: ["email"],
    })
    .refine((data) => data.username , {
        message: "Required",
        path: ["username"],
    })
    .refine((data) => data.password , {
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
    .refine((data) => data.companyWebsite , {
        message: "Required",
        path: ["companyWebsite"],
    })
    .refine((data) => data.hotline , {
        message: "Required",
        path: ["hotline"],
    })
    .refine((data) => data.companyProfile , {
        message: "Required",
        path: ["companyProfile"],
    })
    .refine((value) => value.acceptTerms, {
        message: "You must accept the terms and conditions.",
        path: ["acceptTerms"],
    });
    const createUser : any = async (newUser: any)  => {
        const response = await axios.post('http://localhost:3000/api/user/users ', newUser, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        return response.data;
      }
    
    const [values, setValues] = useState<Partial<z.infer<typeof advertiserSchema>>>({});

    const onSubmit = async () => {
        const reqBody = {
            companyName: values.companyName,
            email: values.email,
            username: values.username,
            password: values.password,
            website: values.companyWebsite,
            hotline: values.hotline,
            companyProfile: values.companyProfile,
            role:"advertiser"
        };
       
        try{
            const response = await createUser(reqBody);
            console.log(response);
            alert("User created successfully");
        }
        catch(error){
            if (axios.isAxiosError(error) && error.response) {
                alert(error.response.data.error);
            } else {
                alert(error);
            }
        }
    }

    return(
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <Card className="w-full max-w-3xl flex flex-col" style={{"padding" : 20}}>
                <CardHeader className="flex flex-row items-center space-x-4">
                <Button onClick={onBack} variant="outline" size="sm">
                    Back
                </Button>
                <CardTitle className="text-xl font-bold">Advertiser Sign Up</CardTitle>
            </CardHeader>
                    <CardContent  className="flex overflow-y-auto h-[80vh]">
                        <AutoForm
                            formSchema={advertiserSchema as any}
                            values={values}                        
                            onValuesChange={setValues}
                            onSubmit={onSubmit}
                            className="w-full"
                            fieldConfig={{
                                companyName: {
                                    label: "Company Name",
                                    inputProps:{
                                        type: "text",
                                        placeholder: "Company Name"
                                    }
                                },
                                email: {
                                    label: "Email",
                                    inputProps:{
                                        type: "email",
                                        placeholder: "Email"
                                    }
                                },
                                username: {
                                    label: "Username",
                                    inputProps:{
                                        type: "text",
                                        placeholder: "Username"
                                    }
                                },
                                password: {
                                    label: "Password",
                                    inputProps:{
                                        type: "password",
                                        placeholder: "Password"
                                    }
                                },
                                confirmPassword: {
                                    label: "Confirm Password",
                                    inputProps:{
                                        type: "password",
                                        placeholder: "Please re-enter your password"
                                    }
                                },
                                companyWebsite: {
                                    label: "Company Website",
                                    inputProps:{
                                        type: "text",
                                        placeholder: "Please Provide Your Company Website"
                                    }
                                },
                                hotline: {
                                    label: "Hotline",
                                    inputProps:{
                                        type: "text",
                                        placeholder: "Please Provide Your Company Hotline"
                                    }
                                },
                                companyProfile: {
                                    label: "Company Profile",
                                    inputProps:{
                                        type: "text",
                                        placeholder: "Please Provide Your Company LinkedIn Profile"
                                    }
                                },
                                acceptTerms: {
                                    inputProps: {
                                      
                                    },
                                    description: (
                                      <>
                                       {"    "} {" "} By checking this box you agree to the{" "}
                                        <a
                                          href="#"
                                          className="text-primary underline"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            alert("Terms and conditions clicked.");
                                          }}
                                        >
                                          terms and conditions
                                        </a>
                                        .
                                      </>
                                    ),
                                  }
                            }}
                        >
                            <AutoFormSubmit className="bg-primary text-white w-full mt-4">Sign Up</AutoFormSubmit>
                        </AutoForm>    
                    </CardContent>                        
                </Card>
            </div>
        </>
    )
}
export default SignupAdvertiser;
