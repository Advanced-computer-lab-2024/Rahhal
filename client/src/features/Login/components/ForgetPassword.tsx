import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { HomeIcon, UserIcon as Male } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { SuccessPopup } from "@/components/SuccessPopup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  forgotPassword,
  resetPassword,
  verifyOTP,
} from "@/api-calls/users-api-calls";
import { useToast } from "@/hooks/use-toast";
// import { verify } from "crypto";
import SecondaryLogo from "@/features/logos/SecondaryLogo";
import { STATUS_CODES } from "http";
import { Label } from "@/components/ui/label";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [usernameError, setUsernameError] = useState("");
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showOTP && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [showOTP, timer]);

  useEffect(() => {
    if (showSuccess) {
      const timeout = setTimeout(() => {
        setShowSuccess(false);
        navigate("/signin");
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [showSuccess, navigate]);

  // const validateOtp = () => {
  //   return otp.length === 6;
  // };

  const validatePasswords = () => {
    let isValid = true;
    const newErrors = {
      password: "",
      confirmPassword: "",
    };

    if (passwords.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (passwords.password !== passwords.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === "") {
      setUsernameError("Username is required");
      return;
    }
    try {
      await forgotPassword(username);
      setShowOTP(true);
    } catch (error) {
      setUsernameError("Something went wrong.");
    }
  };

  const handleResendCode = async () => {
    setTimer(60);
    setCanResend(false);
    try {
      await forgotPassword(username);
    } catch (error) {
      toast({
        title: "Unable to resend code",
        description: "Please try again later",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await verifyOTP(username, otp);
      console.log(response.status);
      if (response.status === 500) throw new Error();
      setShowOTP(false);
      setShowNewPassword(true);
    } catch (error) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct OTP",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePasswords()) {
      return;
    }
    try {
      // Here you would typically call your API to reset the password
      await resetPassword(username, passwords.password);
      setShowSuccess(true);
    } catch (error) {
      console.error("Failed to reset password:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50">
      <Link
        className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 flex items-center"
        to={"/"}
      >
        <HomeIcon className="h-6 w-6 mr-2" />
        <span className="ml-2 text-lg hover:underline">Home</span>
      </Link>
      <div className="absolute mt-5 top-10 flex justify-center w-full">
        <SecondaryLogo width={200} height={100} />
      </div>
      <SuccessPopup show={showSuccess} />
      <Card className="w-full max-w-md p-6 shadow-2xl">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E1BC6D]/10">
            <Male className="h-6 w-6 text-[#E1BC6D]" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {showNewPassword ? "Set new password" : "Forgot your password?"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {showNewPassword
              ? "Your new password must be different to previously used passwords."
              : showOTP
                ? "Enter the OTP sent to your email"
                : "No worries, we'll send you reset instructions."}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <AnimatePresence mode="wait">
            {!showOTP && !showNewPassword ? (
              <motion.form
                key="username-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleUsernameSubmit}
              >
                <div className="space-y-2">
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    type="text"
                    className={usernameError ? "border-red-500 " : ""}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {usernameError && (
                    <p className="text-xs text-red-500">{usernameError}</p>
                  )}
                </div>
                <Button
                  className="w-full bg-[var(--primary-color-dark)] hover:bg-[var(--primary-color-fade)] mt-4"
                  type="submit"
                >
                  Send reset instructions
                </Button>
              </motion.form>
            ) : showOTP ? (
              <motion.div
                key="otp-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4 ">
                  <div className="flex justify-center itmes-center">
                    <InputOTP
                      maxLength={6}
                      className=" gap-2"
                      onChange={setOtp}
                    >
                      <InputOTPGroup className="flex justify-center">
                        {[...Array(6)].map((_, index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className={cn(
                              "w-10 h-12 text-lg border-[#E1BC6D]/20",
                              "focus:border-[#E1BC6D] focus:ring-[#E1BC6D]"
                            )}
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <Button
                    className="w-full bg-[var(--primary-color-dark)] hover:bg-[var(--primary-color-fade)] disabled:bg-[--primary-color-fade] hover:bg-[#E1BC6D]/90"
                    disabled={otp.length !== 6}
                    onClick={handleVerifyOTP}
                  >
                    Verify
                  </Button>
                  <div className="text-center flex flex-col">
                    <span className="text-xs">
                      Please, keep and eye on your spam folder
                    </span>
                    <Button
                      variant="link"
                      className="text-sm text-muted-foreground hover:text-[#E1BC6D]"
                      onClick={handleResendCode}
                      disabled={!canResend}
                    >
                      Resend code {timer > 0 && `(${timer}s)`}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="new-password-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handlePasswordSubmit}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="password" className="sr-only">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your new password"
                    required
                    className={`w-full ${errors.password ? "border-red-500" : ""}`}
                    value={passwords.password}
                    onChange={(e) => {
                      setPasswords((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }));
                      if (errors.password) {
                        setErrors((prev) => ({
                          ...prev,
                          password: "",
                        }));
                      }
                    }}
                  />
                  {errors.password && (
                    <p className="text-xs text-red-500">{errors.password}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Must be at least 8 characters.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Confirm password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Re-enter your new password"
                    required
                    className={`w-full ${errors.confirmPassword ? "border-red-500" : ""}`}
                    value={passwords.confirmPassword}
                    onChange={(e) => {
                      setPasswords((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }));
                      if (errors.confirmPassword) {
                        setErrors((prev) => ({
                          ...prev,
                          confirmPassword: "",
                        }));
                      }
                    }}
                  />
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
                <Button
                  className="w-full bg-[#E1BC6D] hover:bg-[#E1BC6D]/90"
                  type="submit"
                >
                  Reset password
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
          {!showNewPassword && (
            <div className="text-center">
              <Link
                to="/signin"
                className="text-sm text-muted-foreground hover:text-[#E1BC6D] inline-flex items-center gap-2"
              >
                ← Back to log in
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
