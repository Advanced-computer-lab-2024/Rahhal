import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { TermsAndConditionsModal } from './TermsAndConditionsModal'
import { termsAndConditions } from '../terms-and-conditions/SellerTermsAndConditions'

const sellerSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email({ message: "Invalid email address" }),
  username: z.string().regex(/^[A-Za-z0-9_]+$/, {
    message: "Username can only contain letters, numbers, and underscores",
  }),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z.string(),
  description: z.string().min(1, "Required"),
  nationalID: z.instanceof(File).optional().or(z.string()),
  taxRegistration: z.instanceof(File).optional().or(z.string()),
  acceptTerms: z.boolean().refine((val) => val === true, "You must accept the terms and conditions"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type SellerFormData = z.infer<typeof sellerSchema>

export default function SignupSeller() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit, formState: { errors }, setError } = useForm<SellerFormData>({
    resolver: zodResolver(sellerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      description: "",
      acceptTerms: false,
    },
  });

  const createUser = async (newUser: any) => {
    const response = await axios.post("http://localhost:3000/api/user/users", newUser, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  };

  const onSubmit = async (data: SellerFormData) => {
    setIsSubmitting(true);
    const reqBody = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      username: data.username,
      password: data.password,
      description: data.description,
      role: "seller",
    };

    try {
      toast({
        title: "Creating User",
        description: "Please wait while we create your account",
        duration: 1500
      })
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      
      await delay(4500);

      const response: any = await createUser(reqBody);
      console.log('Server response:', response);

      toast({
        title: "User Created",
        description: "User created successfully. Wait for email confirmation of approval!",
        style: {
          backgroundColor: "#34D399",
          color: "#000000",
        },
        duration: 3000,
      })
      setTimeout(() => {
        navigate("/login")
      }, 3000)
    } catch (error: any) {
      console.error('Error during form submission:', error);

      if (axios.isAxiosError(error) && error.response) {
        console.error('Server error response:', error.response.data);

        if (error.response.data.error === "Username already exists") {
          setError("username", {
            type: "manual",
            message: "Username already exists"
          })
        }
        else if(error.response.data.error === "This email is registered to another user") {
          setError("email", {
            type: "manual",
            message: "This email is registered to another user"
          })
        }
        else if(error.response.data.error === "Username already exists and this email is registered to another user"){
          setError("username", {
            type: "manual",
            message: "Username already exists"
          })
          setError("email", {
            type: "manual",
            message: "Email already exists"
          })
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
        })
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex h-full">
      <Card className="w-full max-w-3xl flex flex-col shadow-none bg-transparent">
        <CardHeader className="flex-none pb-7">
          <CardTitle className="text-3xl font-bold">Seller Sign Up</CardTitle>
        </CardHeader>
        <CardContent className="flex overflow-y-auto h-[calc(100vh-200px)]">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <div>
                  <Label htmlFor="firstName" className={errors.firstName ? 'text-red-500' : ''}>First Name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="First Name" 
                    {...field} 
                    className={errors.firstName ? 'border-red-500' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                </div>
              )}
            />

            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <div>
                  <Label htmlFor="lastName" className={errors.lastName ? 'text-red-500' : ''}>Last Name</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Last Name" 
                    {...field} 
                    className={errors.lastName ? 'border-red-500' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                </div>
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div>
                  <Label htmlFor="email" className={errors.email ? 'text-red-500' : ''}>Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Email" 
                    {...field} 
                    className={errors.email ? 'border-red-500' : ''}
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
                  <Label htmlFor="username" className={errors.username ? 'text-red-500' : ''}>Username</Label>
                  <Input 
                    id="username" 
                    placeholder="Username" 
                    {...field} 
                    className={errors.username ? 'border-red-500' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                </div>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <div>
                  <Label htmlFor="password" className={errors.password ? 'text-red-500' : ''}>Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Password" 
                    {...field} 
                    className={errors.password ? 'border-red-500' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <div>
                  <Label htmlFor="confirmPassword" className={errors.confirmPassword ? 'text-red-500' : ''}>Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="Confirm Password" 
                    {...field} 
                    className={errors.confirmPassword ? 'border-red-500' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                </div>
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <div>
                  <Label htmlFor="description" className={errors.description ? 'text-red-500' : ''}>Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Please describe what you sell" 
                    {...field} 
                    className={errors.description ? 'border-red-500' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>
              )}
            />

            <Controller
              name="nationalID"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <div>
                  <Label htmlFor="nationalID" className={errors.nationalID ? 'text-red-500' : ''}>National ID</Label>
                  <Input 
                    id="nationalID" 
                    type="file" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        onChange(file);
                      }
                    }}
                    {...field}
                    className={errors.nationalID ? 'border-red-500' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.nationalID && <p className="text-red-500 text-sm">{errors.nationalID.message}</p>}
                </div>
              )}
            />

            <Controller
              name="taxRegistration"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <div>
                  <Label htmlFor="taxRegistration" className={errors.taxRegistration ? 'text-red-500' : ''}>Tax Registration Card</Label>
                  <Input 
                    id="taxRegistration" 
                    type="file" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        onChange(file);
                      }
                    }}
                    {...field}
                    className={errors.taxRegistration ? 'border-red-500' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.taxRegistration && <p className="text-red-500 text-sm">{errors.taxRegistration.message}</p>}
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
                      className={errors.acceptTerms ? 'border-red-500' : ''}
                      disabled={isSubmitting}
                    />
                    <Label htmlFor="acceptTerms" className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${errors.acceptTerms ? 'text-red-500' : ''}`}>
                      Accept terms and conditions
                    </Label>
                    <TermsAndConditionsModal sections={termsAndConditions} />
                  </div>
                  {errors.acceptTerms && <p className="text-red-500 text-sm">{errors.acceptTerms.message}</p>}
                </div>
              )}
            />
          </form>
        </CardContent>
        <CardFooter className="mt-6">
          <Button type="submit" className="w-full" disabled={isSubmitting} style={{backgroundColor: '#E1BC6D'}} onClick={handleSubmit(onSubmit)}>
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}