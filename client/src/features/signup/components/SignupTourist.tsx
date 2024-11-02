import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { useState } from "react";
import { DependencyType } from "@/components/ui/auto-form/types";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { TermsAndConditionsModal } from "./TermsAndConditionsModal";
import { termsAndConditions } from "../terms-and-conditions/TouistTermsAndConditions";

interface SignupTouristProps {
  onBack: () => void;
}

function SignupTourist({ onBack }: SignupTouristProps) {
  const navigate = useNavigate();
  enum countries {
    "Afghanistan" = "Afghanistan",
    "Albania" = "Albania",
    "Algeria" = "Algeria",
    "Andorra" = "Andorra",
    "Angola" = "Angola",
    "Antigua and Barbuda" = "Antigua and Barbuda",
    "Argentina" = "Argentina",
    "Armenia" = "Armenia",
    "Australia" = "Australia",
    "Austria" = "Austria",
    "Azerbaijan" = "Azerbaijan",
    "Bahamas" = "Bahamas",
    "Bahrain" = "Bahrain",
    "Bangladesh" = "Bangladesh",
    "Barbados" = "Barbados",
    "Belarus" = "Belarus",
    "Belgium" = "Belgium",
    "Belize" = "Belize",
    "Benin" = "Benin",
    "Bhutan" = "Bhutan",
    "Bolivia" = "Bolivia",
    "Bosnia and Herzegovina" = "Bosnia and Herzegovina",
    "Botswana" = "Botswana",
    "Brazil" = "Brazil",
    "Brunei" = "Brunei",
    "Bulgaria" = "Bulgaria",
    "Burkina Faso" = "Burkina Faso",
    "Burundi" = "Burundi",
    "Cabo Verde" = "Cabo Verde",
    "Cambodia" = "Cambodia",
    "Cameroon" = "Cameroon",
    "Canada" = "Canada",
    "Central African Republic" = "Central African Republic",
    "Chad" = "Chad",
    "Chile" = "Chile",
    "China" = "China",
    "Colombia" = "Colombia",
    "Comoros" = "Comoros",
    "Congo (Congo-Brazzaville)" = "Congo (Congo-Brazzaville)",
    "Congo (Democratic Republic of the)" = "Congo (Democratic Republic of the)",
    "Costa Rica" = "Costa Rica",
    "Croatia" = "Croatia",
    "Cuba" = "Cuba",
    "Cyprus" = "Cyprus",
    "Czechia" = "Czechia",
    "Denmark" = "Denmark",
    "Djibouti" = "Djibouti",
    "Dominica" = "Dominica",
    "Dominican Republic" = "Dominican Republic",
    "East Timor" = "East Timor",
    "Ecuador" = "Ecuador",
    "Egypt" = "Egypt",
    "El Salvador" = "El Salvador",
    "Equatorial Guinea" = "Equatorial Guinea",
    "Eritrea" = "Eritrea",
    "Estonia" = "Estonia",
    "Eswatini" = "Eswatini",
    "Ethiopia" = "Ethiopia",
    "Fiji" = "Fiji",
    "Finland" = "Finland",
    "France" = "France",
    "Gabon" = "Gabon",
    "Gambia" = "Gambia",
    "Georgia" = "Georgia",
    "Germany" = "Germany",
    "Ghana" = "Ghana",
    "Greece" = "Greece",
    "Grenada" = "Grenada",
    "Guatemala" = "Guatemala",
    "Guinea" = "Guinea",
    "Guinea-Bissau" = "Guinea-Bissau",
    "Guyana" = "Guyana",
    "Haiti" = "Haiti",
    "Honduras" = "Honduras",
    "Hungary" = "Hungary",
    "Iceland" = "Iceland",
    "India" = "India",
    "Indonesia" = "Indonesia",
    "Iran" = "Iran",
    "Iraq" = "Iraq",
    "Ireland" = "Ireland",
    "Israel" = "Israel",
    "Italy" = "Italy",
    "Ivory Coast" = "Ivory Coast",
    "Jamaica" = "Jamaica",
    "Japan" = "Japan",
    "Jordan" = "Jordan",
    "Kazakhstan" = "Kazakhstan",
    "Kenya" = "Kenya",
    "Kiribati" = "Kiribati",
    "Kuwait" = "Kuwait",
    "Kyrgyzstan " = "Kyrgyzstan",
    "Laos" = "Laos",
    "Latvia" = "Latvia",
    "Lebanon" = "Lebanon",
    "Lesotho" = "Lesotho",
    "Liberia" = "Liberia",
    "Libya" = "Libya",
    "Liechtenstein" = "Liechtenstein",
    "Lithuania" = "Lithuania",
    "Luxembourg" = "Luxembourg",
    "Madagascar" = "Madagascar",
    "Malawi" = "Malawi",
    "Malaysia" = "Malaysia",
    "Maldives" = "Maldives",
    "Mali" = "Mali",
    "Malta" = "Malta",
    "Marshall Islands" = "Marshall Islands",
    "Mauritania" = "Mauritania",
    "Mauritius" = "Mauritius",
    "Mexico" = "Mexico",
    "Micronesia" = "Micronesia",
    "Moldova" = "Moldova",
    "Monaco" = "Monaco",
    "Mongolia" = "Mongolia",
    "Montenegro" = "Montenegro",
    "Morocco" = "Morocco",
    "Mozambique" = "Mozambique",
    "Myanmar" = "Myanmar",
    "Namibia" = "Namibia",
    "Nauru" = "Nauru",
    "Nepal" = "Nepal",
    "Netherlands" = "Netherlands",
    "New Zealand" = "New Zealand",
    "Nicaragua" = "Nicaragua",
    "Niger" = "Niger",
    "Nigeria" = "Nigeria",
    "North Korea" = "North Korea",
    "North Macedonia" = "North Macedonia",
    "Norway" = "Norway",
    "Oman" = "Oman",
    "Pakistan" = "Pakistan",
    "Palau" = "Palau",
    "Panama" = "Panama",
    "Papua New Guinea" = "Papua New Guinea",
    "Paraguay" = "Paraguay",
    "Peru" = "Peru",
    "Philippines" = "Philippines",
    "Poland" = "Poland",
    "Portugal" = "Portugal",
    "Qatar" = "Qatar",
    "Romania" = "Romania",
    "Russia" = "Russia",
    "Rwanda" = "Rwanda",
    "Saint Kitts and Nevis" = "Saint Kitts and Nevis",
    "Saint Lucia" = "Saint Lucia",
    "Saint Vincent and the Grenadines" = "Saint Vincent and the Grenadines",
    "Samoa" = "Samoa",
    "San Marino" = "San Marino",
    "Sao Tome and Principe" = "Sao Tome and Principe",
    "Saudi Arabia" = "Saudi Arabia",
    "Senegal" = "Senegal",
    "Serbia" = "Serbia",
    "Seychelles" = "Seychelles",
    "Sierra Leone" = "Sierra Leone",
    "Singapore" = "Singapore",
    "Slovakia" = "Slovakia",
    "Slovenia" = "Slovenia",
    "Solomon Islands" = "Solomon Islands",
    "Somalia" = "Somalia",
    "South Africa" = "South Africa",
    "South Korea" = "South Korea",
    "South Sudan" = "South Sudan",
    "Spain" = "Spain",
    "Sri Lanka" = "Sri Lanka",
    "Sudan" = "Sudan",
    "Suriname" = "Suriname",
    "Sweden" = "Sweden",
    "Switzerland" = "Switzerland",
    "Syria" = "Syria",
    "Taiwan" = "Taiwan",
    "Tajikistan" = "Tajikistan",
    "Tanzania" = "Tanzania",
    "Thailand" = "Thailand",
    "Togo" = "Togo",
    "Tonga" = "Tonga",
    "Trinidad and Tobago" = "Trinidad and Tobago",
    "Tunisia" = "Tunisia",
    "Turkey" = "Turkey",
    "Turkmenistan" = "Turkmenistan",
    "Tuvalu" = "Tuvalu",
    "Uganda" = "Uganda",
    "Ukraine" = "Ukraine",
    "United Arab Emirates" = "United Arab Emirates",
    "United Kingdom" = "United Kingdom",
    "United States" = "United States",
    "Uruguay" = "Uruguay",
    "Uzbekistan" = "Uzbekistan",
    "Vanuatu" = "Vanuatu",
    "Vatican City" = "Vatican City",
    "Venezuela" = "Venezuela",
    "Vietnam" = "Vietnam",
    "Yemen" = "Yemen",
    "Zambia" = "Zambia",
    "Zimbabwe" = "Zimbabwe",
  }

  const touristSchema = z
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
      dob: z.coerce
        .date()
        .refine((data) => data < new Date(), {
          message: "Invalid date of birth",
        })
        .optional(),
      nationality: z.nativeEnum(countries).optional(),
      phoneNumber: z.string().optional(),
      job: z.enum(["Yes", "No"]).default("No").optional(),

      jobDescription: z.string().optional(),

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
    .refine((data) => data.dob, {
      message: "Required",
      path: ["dob"],
    })
    .refine((data) => data.nationality, {
      message: "Required",
      path: ["nationality"],
    })
    .refine((data) => data.phoneNumber, {
      message: "Required",
      path: ["phoneNumber"],
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

  const [values, setValues] = useState<Partial<z.infer<typeof touristSchema>>>({});

  const onSubmit = async () => {
    console.log("submit");
    const reqBody = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      username: values.username,
      password: values.password,
      dob: values.dob,
      role: "tourist",
      nationality: values.nationality,
      job: values.job === "Yes" ? "Student" : values.jobDescription,
    };

    try {
      const response = await createUser(reqBody);
      alert("User created successfully");
      console.log(response);
      navigate("/entertainment/" + response._id);
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
            <CardTitle className="text-xl font-bold">Tourist Sign Up</CardTitle>
          </CardHeader>
          <CardContent className="flex overflow-y-auto h-[80vh]">
            <AutoForm
              formSchema={touristSchema as any}
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
                    placeholder: " Last Name",
                  },
                },
                email: {
                  label: "Email",
                  inputProps: {
                    type: "email",
                    placeholder: " Email",
                  },
                },
                username: {
                  label: "Username",
                  inputProps: {
                    type: "text",
                    placeholder: " Username",
                  },
                },
                password: {
                  label: "Password",
                  inputProps: {
                    type: "password",
                    placeholder: " Password",
                  },
                },
                confirmPassword: {
                  label: "Confirm Password",
                  inputProps: {
                    type: "password",
                    placeholder: "Please re-enter your password",
                  },
                },
                dob: {
                  label: "Date of Birth",
                  inputProps: {
                    type: "date",
                    placeholder: "Date of Birth",
                  },
                },
                nationality: {
                  label: "Nationality",
                  inputProps: {
                    type: "select",
                    placeholder: "Choose Your Nationality",
                  },
                },
                job: {
                  label: "Are you a student?",
                  fieldType: "radio",
                },
                jobDescription: {
                  label: "Job Description",
                  inputProps: {
                    type: "text",
                    placeholder: "Please Provide your Job Description",
                  },
                },
                phoneNumber: {
                  label: "Phone Number",
                  inputProps: {
                    type: "text",
                    placeholder: "Enter Your Phone Number",
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
              dependencies={[
                {
                  sourceField: "job",
                  targetField: "jobDescription",
                  type: DependencyType.HIDES,
                  when: (job) => job === "Yes",
                },
                {
                  sourceField: "job",
                  targetField: "jobDescription",
                  type: DependencyType.REQUIRES,
                  when: (job) => job === "No",
                },
              ]}
            >
              <AutoFormSubmit className="bg-primary text-white w-full mt-4">Sign Up</AutoFormSubmit>
            </AutoForm>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default SignupTourist;
