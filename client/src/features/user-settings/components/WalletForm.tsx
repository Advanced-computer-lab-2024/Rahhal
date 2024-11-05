import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { EditContext } from "./SettingsView";
import { useForm } from "react-hook-form";
import styles from "../styles/WalletForm.module.css";
import visaLogo from "@/assets/visalogo.png";
import mastercardLogo from "@/assets/Mastercard-logo.png";
import genericCardLogo from "@/assets/genericCC.png";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardsPaymentMethod } from "./PaymentMethodForm";
import { CONNECTION_STRING } from "@/utils/constants";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
export default function AccountForm() {
  const { user } = useContext(EditContext);
  const { toast } = useToast();
  const balanceValidator = z.object({
    balance: z.number().optional(),
  });

  type balanceValues = z.infer<typeof balanceValidator>;
  const { id } = useParams();
  const form = useForm<balanceValues>({
    resolver: zodResolver(balanceValidator),
    mode: "onChange",
    defaultValues: {
      balance: user.balance || 0,
    },
  });

  useEffect(() => {
    form.reset({
      balance: user.balance || 0,
    });
  }, [user, form]);

  interface APIPayload {
    wallet: {
      creditCard: Array<{
        typeOfCard: string;
        cardHolderName: string;
        cardNumber: string;
        expirationDate: Date;
        cvv: string;
      }>;
      defaultCreditCardIndex: number;
    };
  }

  async function updateUser(data: APIPayload) {
    const USER_SERVICE_URL = CONNECTION_STRING + `${id}`;
    try {
      const response = await axios.patch(USER_SERVICE_URL, data);
      toast({
        title: "Update " + response.statusText,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast({
        title: "Error: " + (error as any).response.data.error,
        variant: "destructive",
      });
      // setTimeout(() => {
      //   window.location.reload();
      // }, 3000);
    }
  }

  function deleteCreditCard(id: number): void {
    // delete credit card
    // make a patch request with the same wallet, but without the credit card
    const creditCard = user.wallet?.creditCard;
    let newDefaultCreditCardIndex = user.wallet?.defaultCreditCardIndex;
    if (id === user.wallet?.defaultCreditCardIndex) {
      newDefaultCreditCardIndex = 0;
    }

    if (creditCard) {
      const newCreditCardArray = creditCard.filter((card, index) => index !== id);
      const data: APIPayload = {
        wallet: {
          creditCard: newCreditCardArray,
          defaultCreditCardIndex: newDefaultCreditCardIndex || 0,
        },
      };
      updateUser(data);
    }
  }

  function setDefaultCreditCard(id: number): void {
    const data: APIPayload = {
      wallet: {
        creditCard: user.wallet?.creditCard || [],
        defaultCreditCardIndex: id,
      },
    };
    updateUser(data);
  }

  return (
    <>
      <h3 className="text-lg font-medium">Payment Information</h3>
      <Separator className="mt-5 mb-5"></Separator>
      <Form {...form}>
        {/* Wallet */}
        {user.role === "tourist" && (
          <FormField
            control={form.control}
            name="balance"
            render={({ field }) => (
              <FormItem>
                <h4 className="text-lg font-medium">Wallet</h4>
                <FormControl>
                  <Input type="number" disabled {...field} />
                </FormControl>
                <FormDescription>This is your wallet balance.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </Form>

      <Separator className="mt-5 mb-5"></Separator>

      {/* Credit Cards */}
      <h4 className="text-lg font-medium">Credit Cards Information</h4>
      {(!user.wallet || user.wallet?.creditCard?.length === 0) && (
        <div id={styles["NO_CARD_CONTAINER"]} className={styles["hero-body"]}>
          <h3 className={styles["title"]}>Book Faster!</h3>
          <h4 id={styles["noCardSubTitle"]} className={styles["subtitle"]}>
            <div className={styles["subtitleText"]}>
              Book trips with one easy click when you save a payment method to your Rahhal account.
            </div>
          </h4>
          <div className="grid justify-items-center">
            <Dialog>
              <DialogHeader>
                <DialogTitle></DialogTitle>
              </DialogHeader>
              <DialogTrigger>
                {" "}
                <Button id={styles["addBtn"]}>+ Add Payment Method</Button>
              </DialogTrigger>
              <DialogContent>
                <CardsPaymentMethod></CardsPaymentMethod>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
      {user.wallet && !(user.wallet?.creditCard?.length === 0) && (
        <>
          {user.wallet?.creditCard?.map((card, index) => (
            <>
              <div key={index} className={styles["credit"]}>
                <div className="grid flex grid-cols-12 gap-4 justify-content-center items-center">
                  <div className="col-span-2">
                    {card.typeOfCard === "Visa" && (
                      <img src={visaLogo} alt="Visa Logo" className="h-12" />
                    )}
                    {card.typeOfCard === "Mastercard" && (
                      <img src={mastercardLogo} alt="Mastercard Logo" className="h-12" />
                    )}
                    {card.typeOfCard === " " && (
                      <img src={genericCardLogo} alt="Mastercard Logo" className="h-12" />
                    )}
                  </div>
                  <div className="col-span-4">
                    <h3 className="text-lg font-medium">
                      {card.typeOfCard} **** {card.cardNumber.slice(-4)}
                    </h3>
                  </div>
                  <div className="col-span-2">
                    {user.wallet?.defaultCreditCardIndex === index && (
                      <Button disabled className="h-9" style={{ width: "100%" }}>
                        Default
                      </Button>
                    )}
                  </div>
                  <div className="col-span-3">
                    {/* <Dialog>
                      <DialogHeader>
                        <DialogTitle></DialogTitle>
                      </DialogHeader>
                      <DialogTrigger> */}
                    <Button className="h-9" style={{ width: "100%" }}>
                      Edit
                    </Button>
                    {/* </DialogTrigger>
                      <DialogContent>
                        <CardsPaymentMethod></CardsPaymentMethod>
                      </DialogContent>
                    </Dialog> */}
                  </div>
                  <div className="col-span-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-ellipsis-vertical"
                        >
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="12" cy="5" r="1" />
                          <circle cx="12" cy="19" r="1" />
                        </svg>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setDefaultCreditCard(index)}>
                          Set Default
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          style={{ backgroundColor: "red", color: "white" }}
                          onClick={() => {
                            deleteCreditCard(index);
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </>
          ))}
          <Dialog>
            <DialogHeader>
              <DialogTitle></DialogTitle>
            </DialogHeader>
            <DialogTrigger>
              <Button id={styles["addBtn"]}>+ Add Payment Method</Button>
            </DialogTrigger>
            <DialogContent>
              <CardsPaymentMethod></CardsPaymentMethod>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}
