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
import { useContext, useEffect } from "react";
import { EditContext } from "./SettingsView";
// import { useState } from "react";
// export default function updateUser(){
//   const USER_SERVICE_URL = `http://localhost:3000/api/user/users/${id}`;
//   useEffect(() => {
//     axios
//       .patch(USER_SERVICE_URL)
//       .then((response) => {
//         setUser(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);
// }

export default function ProfileForm() {
  const { editForm, user } = useContext(EditContext);
  //from api
  // const user = {
  //   firstName: "Yousef",
  //   lastName: "Elbrolosy",
  //   companyName: "German University in Cairo",
  //   role: "advertiser",
  //   description: "I sell qubits",
  //   previousWork: "I worked at Quantum",
  //   job: "developer",
  //   yearsOfExperience: 0,
  //   phoneNumber: "+201010777507",
  //   hotline: "15540",
  //   website: "https://yousef.com",
  //   companyProfile: "https://www.linkedin.com/in/yousefelbrolosy/",
  //   addresses: ["Banfseg 6", "Nasr City"],
  // };

  const profileFormSchema = z.object({
    firstName: z
      .string()
      .min(2, {
        message: "First Name must be at least 2 characters.",
      })
      .max(30, {
        message: "First Name must not be longer than 30 characters.",
      }),
    lastName: z
      .string()
      .min(2, {
        message: "Last Name must be at least 2 characters.",
      })
      .max(30, {
        message: "Last Name must not be longer than 30 characters.",
      }),
    companyName: z
      .string()
      .min(2, {
        message: "Last Name must be at least 2 characters.",
      })
      .max(30, {
        message: "Last Name must not be longer than 30 characters.",
      }),
    role: z.string().min(2).max(30).optional(),
    description: z.string().max(160).min(4),
    previousWork: z.string().max(160).optional(),
    job: z.string().max(160).min(4),
    yearsOfExperience: z.number().min(0).max(100),
    phoneNumber: z
      .string()
      .min(13, { message: "Phone number minimum length must be 13 digits." })
      .max(20, { message: "Phone number maximum length must be 20 digits." })
      .regex(/^\+?[1-9]\d{1,14}$/, { message: "Please enter a valid phone number." }),
    hotline: z
      .string()
      .min(5, { message: "Hotline minimum length must be 5 digits." })
      .regex(/^\+?[1-9]\d{1,14}$/, { message: "Please enter a valid hotline." }),
    website: z.string().url(),
    companyProfile: z.string().url(),
    addresses: z.string().array().optional(),
  });

  type ProfileFormValues = z.infer<typeof profileFormSchema>;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
    defaultValues: user,
  });

  useEffect(() => {
    form.reset(user);
  }, [user, form]);

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
  }
  // const [editForm, setEditForm] = useState(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Profile</h3>
            <p className="text-sm text-muted-foreground">
              This is how others will see you on the site.
            </p>
          </div>
          <div
            data-orientation="horizontal"
            role="none"
            className="shrink-0 bg-border h-[1px] w-full"
          ></div>
          {/* First/Last Name */}
          {user.role != "advertiser" && (
            <>
              <div className="grid grid-cols-12 gap-4">
                {/* First Name */}
                <div className="col-span-6 space-y-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input disabled={!editForm} placeholder="john" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Last Name */}
                <div className="col-span-6 space-y-2">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input disabled={!editForm} placeholder="doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </>
          )}
          {/* Company Name */}
          {user.role == "advertiser" && (
            <>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input disabled={!editForm} placeholder="Resala" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
          {/* Role */}
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input placeholder="e:g tourist" disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Phone Number */}
          {user.role == "tourGuide" && (
            <>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          disabled={!editForm}
                          placeholder="20123456789"
                          {...field}
                          maxLength={20}
                          onKeyDown={(e) => {
                            if (!/[0-9+]/.test(e.key) && e.key !== "Backspace") {
                              e.preventDefault();
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
          {/* Hotline */}
          {user.role == "advertiser" && (
            <>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="hotline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hotline</FormLabel>
                      <FormControl>
                        <Input
                          disabled={!editForm}
                          placeholder="19991"
                          {...field}
                          maxLength={5}
                          onKeyDown={(e) => {
                            if (!/[0-9+]/.test(e.key) && e.key !== "Backspace") {
                              e.preventDefault();
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
          {/* Description */}
          {user.role == "seller" && (
            <>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <textarea
                          disabled={!editForm}
                          className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                          placeholder="I sell tomatoes"
                          {...field}
                          name="description"
                        ></textarea>
                      </FormControl>
                      <FormDescription>
                        Please describe what you are type of company you are and what you are
                        selling
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
          {/* Job */}
          {user.role == "tourist" && (
            <>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="job"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job</FormLabel>
                      <FormControl>
                        <Input disabled={!editForm} placeholder="e:g developer" {...field} />
                      </FormControl>
                      <FormDescription>Please state your job</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
          {/* Previous Work */}
          {user.role == "tourGuide" && (
            <>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="previousWork"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Previous Work</FormLabel>
                      <FormControl>
                        <textarea
                          disabled={!editForm}
                          className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                          placeholder="I worked at Second Cup"
                          {...field}
                          name="previousWork"
                        ></textarea>
                      </FormControl>
                      <FormDescription>Please describe your previous work</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
          {/* Years Of Experience */}
          {user.role == "tourGuide" && (
            <>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="yearsOfExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years Of Experience</FormLabel>
                      <FormControl>
                        <Input
                          disabled={!editForm}
                          className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                          {...field}
                          type="number"
                          placeholder="Enter your years of experience"
                          onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
          {/* Addresses */}
          {user.role == "tourist" && (
            <>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="addresses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Addresses</FormLabel>
                      <FormControl>
                        <div>
                          {(field.value || user.addresses || []).map((address, index) => (
                            <div key={index} className="flex items-center space-x-2 mb-4">
                              <Input
                                disabled={!editForm}
                                placeholder={`Address ${index + 1}`}
                                value={address}
                                onChange={(e) => {
                                  const newAddresses = [...(field.value ?? user.addresses ?? [])];
                                  newAddresses[index] = e.target.value;
                                  field.onChange(newAddresses);
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newAddresses = (field.value || user.addresses || []).filter(
                                    (_, i) => i !== index,
                                  );
                                  field.onChange(newAddresses);
                                }}
                                className="text-red-500"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() =>
                              field.onChange([...(field.value ?? user.addresses ?? []), ""])
                            }
                            className="mt-2 text-blue-500"
                          >
                            Add Address
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
          {/* URLs */}
          {/* Website */}
          {user.role == "advertiser" && (
            <>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor=":Rmeflpukv9u6ja:-form-item"
                >
                  URLs
                </label>
                <p
                  id=":Rmeflpukv9u6ja:-form-item-description"
                  className="text-[0.8rem] text-muted-foreground"
                >
                  Add link to your website
                </p>
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={!editForm}
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="https://shadcn.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p
                  id=":Rmeflpukv9u6ja:-form-item-description"
                  className="text-[0.8rem] text-muted-foreground"
                >
                  Add link to your Company Profile
                </p>
                {/* Company Profile */}
                <FormField
                  control={form.control}
                  name="companyProfile"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={!editForm}
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="https://shadcn.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
          {editForm && (
            <>
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                type="submit"
              >
                Update profile
              </button>
            </>
          )}
        </div>
      </form>
    </Form>
  );
}
