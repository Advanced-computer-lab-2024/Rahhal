import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, useContext, useEffect, useState } from "react";
import { EditContext } from "./SettingsView";
import { useForm } from "react-hook-form";
import styles from "../styles/WalletForm.module.css";
import visaLogo from "@/assets/visalogo.png";
import mastercardLogo from "@/assets/Mastercard-logo.png";
import genericCardLogo from "@/assets/genericCC.png";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
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
import { updateUser } from "@/api-calls/users-api-calls";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { GetCardType } from "../utils/CheckCardType";
import { redeemLoyalityPoints } from "@/api-calls/users-api-calls";
import BronzeRBadge from "@/assets/BronzeRFavi.png";
import SilverRBadge from "@/assets/SilverRFavi.png";
import GoldRBadge from "@/assets/GoldRFavi.png";
import { useCurrencyStore } from "@/stores/currency-exchange-store";
import currencyExchange from "@/utils/currency-exchange";
export const editCardContext = createContext({ editingCard: false, editedIndex: 0 });

export default function AccountForm() {
  const [openDialogs, setOpenDialogs] = useState<{ [key: number]: boolean }>({});

  const handleDialogOpen = (index: number, isOpen: boolean) => {
    setOpenDialogs((prev) => ({
      ...prev,
      [index]: isOpen,
    }));
  };

  const { user } = useContext(EditContext);
  const { toast } = useToast();
  const redeemValidator = z.object({
    balance: z.number().optional(),
    points: z.number().optional(),
  });

  // Handling Displaying of Badge
  // ================================================
  let badgeImage = BronzeRBadge;
  let badgeLevelColor = "Bronze";
  let badgeLevel = "1";

  if (user.level && user.level == 2) {
    badgeLevelColor = "Silver";
    badgeLevel = "2";
    badgeImage = SilverRBadge;
    
  }
  if (user.level && user.level == 3) {
    badgeLevelColor = "Gold";
    badgeLevel = "3";
    badgeImage = GoldRBadge;
  }
  // ================================================

  const [editingCard, setEditingCard] = useState<boolean>(false);
  const [editedIndex, setEditedCardIndex] = useState<number>(-1);
  const price = 100;

  const { currency } = useCurrencyStore();
  const convertedPrice = currencyExchange("EGP", price);
  const displayPrice = convertedPrice ? convertedPrice.toFixed(2) : "N/A";

  type balanceValues = z.infer<typeof redeemValidator>;
  const { id } = useParams();
  const form = useForm<balanceValues>({
    resolver: zodResolver(redeemValidator),
    mode: "onChange",
    defaultValues: {
      balance: user.balance || 0,
      points: user.points || 0,
    },
  });

  const displayBalance = currencyExchange("EGP", form.watch("balance") || 0)?.toFixed(2);

  useEffect(() => {
    form.reset({
      balance: user.balance || 0,
      points: user.points || 0,
    });
  }, [user, form]);

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

  async function update(successMessage: string, data: APIPayload) {
    try {
      await updateUser(user, data);
      toast({
        title: successMessage,
        style: {
          backgroundColor: "#34D399",
          color: "#FFFFFF",
        },
      });
      // Update user data without reloading the page
      user.wallet = data.wallet;
    } catch (error) {
      toast({
        title: "Error: " + error,
        variant: "destructive",
      });
    }
  }

  function deleteCreditCard(id: number): void {
    // delete credit card
    // make a patch request with the same wallet, but without the credit card
    const creditCard = user.wallet?.creditCard;
    let newDefaultCreditCardIndex = user.wallet?.defaultCreditCardIndex;
    if (id === user.wallet?.defaultCreditCardIndex) {
      newDefaultCreditCardIndex = 0;
    } else {
      if (id < (user.wallet?.defaultCreditCardIndex ?? 0)) {
        newDefaultCreditCardIndex = (user.wallet?.defaultCreditCardIndex ?? 0) - 1;
      }
    }

    if (creditCard) {
      const newCreditCardArray = creditCard.filter((_, index) => index !== id);
      const data: APIPayload = {
        wallet: {
          creditCard: newCreditCardArray,
          defaultCreditCardIndex: newDefaultCreditCardIndex || 0,
        },
      };
      update("Deleted Successfully!", data);
    }
  }

  function setDefaultCreditCard(id: number): void {
    const data: APIPayload = {
      wallet: {
        creditCard: user.wallet?.creditCard || [],
        defaultCreditCardIndex: id,
      },
    };
    update("New Default Card Set Successfully!", data);
  }

  function editCard(edit: boolean, index: number) {
    setEditingCard(edit);
    setEditedCardIndex(index);
  }

  async function redeemPoints() {
    if (id) {
      try {
        const response = await redeemLoyalityPoints(id);
        const updatedUser = response;
        const userData = updatedUser as { balance: number; points: number };

        form.setValue("balance", userData.balance);
        form.setValue("points", userData.points);
        user.balance = userData.balance;
        user.points = userData.points;
        
        toast({
          title: "Success",
          description: "Points redeemed successfully",
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
    } else {
      toast({
        title: "Error: User ID is missing",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <div className="flex items-center gap-4" style={{ width: "80%" }}>
        <h3 className="text-lg font-medium">Payment Information</h3>
        {/* <div className="flex items-center"> */}
        <div className="ml-auto flex items-center">
          <p style={{ fontSize: "0.875rem" }}>
            <i>
              Experience Level {badgeLevel}: <b>{badgeLevelColor}</b>
            </i>
          </p>
          <img src={badgeImage} alt="" className="ml-2 h-10" />
        </div>
        {/* </div> */}
      </div>
      <Separator className="mt-5 mb-5" style={{ width: "80%" }}></Separator>
      <Form {...form}>
        {/* Wallet */}
        {user.role === "tourist" && (
          <div className="grid grid-cols-12 gap-6" style={{ width: "80%" }}>
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="balance"
                render={({ field }) => (
                  <FormItem>
                    <h4 className="text-lg font-medium">Balance</h4>
                    <FormControl>
                      <Input
                        type="number"
                        disabled
                        {...field}
                        value={displayBalance || user.balance}
                      />
                    </FormControl>
                    <FormDescription>This is your wallet balance.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="points"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <h4 className="text-lg font-medium">Points</h4>
                      <p
                        id={styles["responsive-points-text"]}
                        className="text-xs text-muted-foreground ml-2"
                      >
                        10000 Points = {displayPrice} {currency}
                      </p>
                    </div>
                    <FormControl>
                      <div className="grid grid-cols-12 gap-1">
                        <div className="col-span-10">
                          <Input type="number" disabled {...field} />
                        </div>

                        <div className="col-span-2">
                          <HoverCard>
                            <HoverCardTrigger>
                              <Button
                                disabled={user.points && user.points >= 10000 ? false : true}
                                onClick={redeemPoints}
                                className="bg-[var(--primary-color-dark)] hover:bg-[var(--primary-color-fade)] text-white shadow-lg inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2"

                              >
                                Redeem
                              </Button>
                            </HoverCardTrigger>
                            {!(user.points == undefined) && user.points < 10000 && (
                              <>
                                <HoverCardContent>
                                  You need to have 10000 points or more to redeem.
                                </HoverCardContent>
                              </>
                            )}
                          </HoverCard>
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      You have {user.points ? user.points - (user.points % 10000) : 0} points to
                      redeem.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}
      </Form>

      <Separator id={styles["cardWidth"]} className="mt-5 mb-5"></Separator>

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
            <Dialog open={openDialogs[-1]} onOpenChange={(isOpen) => handleDialogOpen(-1, isOpen)}>
              <DialogHeader>
                <DialogTitle></DialogTitle>
              </DialogHeader>
              <DialogTrigger>
                <Button
                  id={styles["addBtn"]}
                  onClick={() => {
                    setEditingCard(false);
                  }}
                >
                  + Add Payment Method
                </Button>
              </DialogTrigger>
              <DialogContent>
                <CardsPaymentMethod setOpen={(isOpen) => handleDialogOpen(-1, isOpen)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
      {user.wallet && !(user.wallet?.creditCard?.length === 0) && (
        <>
          {user.wallet?.creditCard?.map((card, index) => (
            <>
              <div key={index} id={styles["cardWidth"]} className={styles["credit"]}>
                <div className="grid flex grid-cols-12 gap-5 justify-content-center items-center">
                  <div className="col-span-2">
                    {GetCardType(card.cardNumber) === "Visa" && (
                      <img src={visaLogo} alt="Visa Logo" className="h-12" />
                    )}
                    {GetCardType(card.cardNumber) === "Mastercard" && (
                      <img src={mastercardLogo} alt="Mastercard Logo" className="h-12" />
                    )}
                    {GetCardType(card.cardNumber) != "Mastercard" &&
                      GetCardType(card.cardNumber) != "Visa" && (
                        <img src={genericCardLogo} alt="Generic Logo" className="h-12" />
                      )}
                  </div>
                  <div className="col-span-4">
                    <h3 className="text-lg font-medium">
                      {GetCardType(card.cardNumber)} **** {card.cardNumber.slice(-4)}
                    </h3>
                  </div>
                  <div className="col-span-3"></div>
                  <div className="col-span-1">
                    {user.wallet?.defaultCreditCardIndex === index && (
                      <div>
                        <Button
                          disabled
                          id={styles["buttonSize"]}
                          className="h-9 mb-1"
                          style={{
                            width: "50px",
                            color: "white",
                            backgroundColor: "var(--complimentary-color-dark)",
                            height: "27px",
                            fontSize: "12px",
                            marginLeft: "-30px"
                          }}
                        >
                          Default
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="col-span-1">
                    <Dialog
                      open={openDialogs[index]}
                      onOpenChange={(isOpen) => handleDialogOpen(index, isOpen)}
                    >
                      <DialogHeader>
                        <DialogTitle></DialogTitle>
                      </DialogHeader>
                      <DialogTrigger className="w-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          onClick={() => editCard(true, index)}
                        >
                          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
                        </svg>
                      </DialogTrigger>
                      <DialogContent>
                        <editCardContext.Provider value={{ editingCard, editedIndex }}>
                          <CardsPaymentMethod
                            setOpen={(isOpen) => handleDialogOpen(index, isOpen)}
                          />
                        </editCardContext.Provider>
                      </DialogContent>
                    </Dialog>
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
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
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
          <Dialog open={openDialogs[-1]} onOpenChange={(isOpen) => handleDialogOpen(-1, isOpen)}>
            <DialogHeader>
              <DialogTitle></DialogTitle>
            </DialogHeader>
            <DialogTrigger>
              <Button
                id={styles["addBtn"]}
                onClick={() => {
                  setEditingCard(false);
                }}
              >
                + Add Payment Method
              </Button>
            </DialogTrigger>
            <DialogContent>
              <CardsPaymentMethod setOpen={(isOpen) => handleDialogOpen(-1, isOpen)} />
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}
