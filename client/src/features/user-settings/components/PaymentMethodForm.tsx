import { Icons } from "@/components/ui/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import visaLogo from "@/assets/visalogo.png";
import mastercardLogo from "@/assets/Mastercard-logo.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContext, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditContext } from "./SettingsView";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GetCardType } from "../utils/CheckCardType";
import { editCardContext } from "./WalletForm";
import { updateUser } from "@/api-calls/users-api-calls";
import { Button } from "@/components/ui/button";
interface PaymentMethodFormProps {
  setOpen: (open: boolean) => void;
}
export function CardsPaymentMethod({ setOpen }: PaymentMethodFormProps) {
  const { toast } = useToast();
  const { user } = useContext(EditContext);
  const [cardType, setCardType] = useState<string | null>(null);
  const existingCards = user?.wallet?.creditCard || [];
  const { editingCard, editedIndex } = useContext(editCardContext);
  let editedCreditCard = {
    cardHolderName: "",
    cardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    cvv: "",
  };
  if (editingCard) {
    editedCreditCard = {
      cardHolderName: existingCards[editedIndex].cardHolderName,
      cardNumber: existingCards[editedIndex].cardNumber,
      expirationMonth: new Date(existingCards[editedIndex].expirationDate).getMonth().toString(),
      expirationYear: new Date(existingCards[editedIndex].expirationDate).getFullYear().toString(),
      cvv: existingCards[editedIndex].cvv,
    };
  } else {
    editedCreditCard = {
      cardHolderName: "",
      cardNumber: "",
      expirationMonth: "",
      expirationYear: "",
      cvv: "",
    };
  }

  const formSchema = z.object({
    paymentMethod: z.enum(["card", "paypal", "apple"]),
    wallet: z.object({
      creditCard: z.array(
        z
          .object({
            cardHolderName: z.string().min(1, "Cardholder name is required"),
            cardNumber: z.string().length(16, "Card number must be 16 digits"),
            expirationMonth: z.string().min(1, "Month is required"),
            expirationYear: z.string().min(1, "Year is required"),
            cvv: z.string().length(3, "CVV must be 3 digits"),
          })
          .refine(
            (data) => {
              if (data.expirationMonth && data.expirationYear) {
                const today = new Date();
                const expirationDate = new Date(
                  parseInt(data.expirationYear),
                  parseInt(data.expirationMonth) - 1,
                );
                return expirationDate > today;
              }
              return true;
            },
            {
              message: "Card has expired. Please use a valid expiration date.",
              path: ["expirationMonth"], // This will show the error on the year field
            },
          ),
      ),
      defaultCreditCardIndex: z.number().min(0),
    }),
  });

  type FormValues = z.infer<typeof formSchema>;

  interface APIPayload {
    wallet: {
      creditCard: Array<{
        cardHolderName: string;
        cardNumber: string;
        expirationDate: Date;
        cvv: string;
      }>;
      defaultCreditCardIndex: number;
    };
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentMethod: "card",
      wallet: {
        creditCard: [
          {
            cardHolderName: editedCreditCard.cardHolderName,
            cardNumber: editedCreditCard.cardNumber,
            expirationMonth: editedCreditCard.expirationMonth,
            expirationYear: editedCreditCard.expirationYear,
            cvv: editedCreditCard.cvv,
          },
        ],
        defaultCreditCardIndex: user?.wallet?.creditCard?.length || 0,
      },
    },
  });

  const transformFormDataToAPI = (data: FormValues): APIPayload => {
    // Create the new card
    const newCard = {
      cardHolderName: data.wallet.creditCard[0].cardHolderName,
      cardNumber: data.wallet.creditCard[0].cardNumber,
      expirationDate: new Date(
        parseInt(data.wallet.creditCard[0].expirationYear),
        parseInt(data.wallet.creditCard[0].expirationMonth) - 1,
        1,
      ),
      cvv: data.wallet.creditCard[0].cvv,
    };

    return {
      wallet: {
        creditCard: [...existingCards, newCard], // Append new card to existing cards
        defaultCreditCardIndex: user?.wallet?.defaultCreditCardIndex || 0, // Set the new card as default
      },
    };
  };

  async function update(updateMessage: string, data: APIPayload) {
    try {
      await updateUser(user, data);
      toast({
        title: updateMessage,
        style: {
          backgroundColor: "#34D399",
          color: "#FFFFFF",
        },
      });
      user.wallet = data.wallet;
    } catch (error) {
      toast({
        title: "Error: " + error,
        variant: "destructive",
      });
    }
  }

  function onSubmit(data: FormValues) {
    let apiData: APIPayload;
    if (editingCard) {
      // Update the specific card in the existing array
      const newCreditCardArray = existingCards.map((card, index) => {
        if (index === editedIndex) {
          // Replace with the edited card's values
          return {
            cardHolderName: data.wallet.creditCard[0].cardHolderName,
            cardNumber: data.wallet.creditCard[0].cardNumber,
            expirationDate: new Date(
              parseInt(data.wallet.creditCard[0].expirationYear),
              parseInt(data.wallet.creditCard[0].expirationMonth) - 1,
              1,
            ),
            cvv: data.wallet.creditCard[0].cvv,
          };
        }
        return card;
      });

      // Prepare the API payload with the modified wallet array
      apiData = {
        wallet: {
          creditCard: newCreditCardArray,
          defaultCreditCardIndex: user?.wallet?.defaultCreditCardIndex || 0,
        },
      };
    } else {
      // When adding a new card, transform the form data into API format
      apiData = transformFormDataToAPI(data);
    }
    if (editingCard) {
      update("Card updated successfully", apiData);
    } else {
      update("Card added successfully!", apiData);
    }
    setOpen(false);
  }

  return (
    <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Add a new payment method to your account.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                {/* Type of Card */}
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-3 gap-4"
                        >
                          <div>
                            <RadioGroupItem value="card" id="card" className="peer sr-only" />
                            <Label
                              htmlFor="card"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="mb-3 h-6 w-6"
                              >
                                <rect width="20" height="14" x="2" y="5" rx="2" />
                                <path d="M2 10h20" />
                              </svg>
                              Card
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
                            <Label
                              htmlFor="paypal"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <Icons.paypal className="mb-3 h-6 w-6" />
                              Paypal
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem value="apple" id="apple" className="peer sr-only" />
                            <Label
                              htmlFor="apple"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              <Icons.apple className="mb-3 h-6 w-6" />
                              Apple
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* CardHolder Name */}
                <FormField
                  control={form.control}
                  name="wallet.creditCard.0.cardHolderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cardholder Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Your name as it appears on the card"
                          value={field.value as string}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* CardNumber */}
                <FormField
                  control={form.control}
                  name="wallet.creditCard.0.cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <div className="flex w-full items-center space-x-2 relative">
                          <Input
                            placeholder="XXXX-XXXX-XXXX-XXXX"
                            maxLength={19}
                            {...field}
                            inputMode="numeric"
                            onInput={(e) => {
                              e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
                              field.onChange(e);
                            }}
                            onChange={(e) => {
                              const cardType = GetCardType(e.target.value);
                              setCardType(cardType);
                              field.onChange(e);
                            }}
                            value={field.value.replace(/\d{4}(?=.)/g, "$& ")}
                          />
                          <div className="absolute right-5 flex items-center h-full pointer-events-none">
                            {cardType === "Visa" && (
                              <img
                                src={visaLogo}
                                alt="Visa Logo"
                                className="h-11 w-auto object-contain"
                              />
                            )}
                            {cardType === "Mastercard" && (
                              <img
                                src={mastercardLogo}
                                alt="Mastercard Logo"
                                className="h-8 w-auto object-contain"
                              />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Expiration Month */}
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="wallet.creditCard.0.expirationMonth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expires</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Month" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                              <SelectItem key={month} value={month.toString()}>
                                {new Date(0, month - 1).toLocaleString("default", {
                                  month: "long",
                                })}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Expiration Year */}
                  <FormField
                    control={form.control}
                    name="wallet.creditCard.0.expirationYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => (
                              <SelectItem key={i} value={`${new Date().getFullYear() + i}`}>
                                {new Date().getFullYear() + i}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* CVV */}
                  <FormField
                    control={form.control}
                    name="wallet.creditCard.0.cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input
                            maxLength={3}
                            inputMode="numeric"
                            onInput={(e) => {
                              e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
                              field.onChange(e);
                            }}
                            placeholder="CVV"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" type="submit">
                  {editingCard ? "Save" : "Continue"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
    </>
  );
}

export default CardsPaymentMethod;
