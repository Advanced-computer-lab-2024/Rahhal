import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios, { AxiosError, isAxiosError } from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { loginUser } from "@/api-calls/users-api-calls";
import { UserState } from "@/stores/user-state-store";
import { Eye, EyeOff } from "lucide-react";
interface LoginPageProps {
  redirectLink?: string;
}

export default function LoginCard({ redirectLink }: LoginPageProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // 👈 state for toggle

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newErrors = { username: "", password: "" };
    if (!username) {
      newErrors.username = "Username is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }

    if (newErrors.username || newErrors.password) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    setDisabled(true);
    try {
      newErrors.username = "";
      newErrors.password = "";
      setErrors(newErrors);
      const reqBody = { username: username, password: password };
      const response: any = await loginUser(reqBody);
      await UserState();
      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
        style: {
          backgroundColor: "#34D399",
          color: "#FFFFFF",
        },
        duration: 3000,
      });
      navigate(`/`);
    } catch (error) {
      if (isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          toast({
            title: "Error",
            description: (axiosError.response.data as any).error,
            variant: "destructive",
            duration: 3000,
          });
        }
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setLoading(false);
      setDisabled(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <>
      <Card className="w-[500px] h-[500px] p-6 shadow-2xl flex flex-col justify-center">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Login</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-4">
              <div className="grid gap-1">
                <Label
                  htmlFor="email"
                  className={`text-lg ${errors.username ? "text-red-500" : ""}`}
                >
                  Username
                </Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Please enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter")
                      setErrors({ ...errors, username: "", password: "" });
                  }}
                  className={`border ${errors.username ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.username && (
                  <p className="text-sm text-red-500">{errors.username}</p>
                )}
              </div>
              <div className="grid gap-1">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className={`text-lg ${errors.password ? "text-red-500" : ""}`}
                  >
                    Password
                  </Label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"} // 👈 toggle
                    placeholder="Please enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter")
                        setErrors({ ...errors, username: "", password: "" });
                    }}
                    className={`border pr-10 ${errors.password ? "border-red-500" : "border-gray-300"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-800"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={disabled || loading}
              className="w-full py-2 text-lg flex items-center justify-center"
              style={{ backgroundColor: "#E1BC6D" }}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="mt-6 text-center text-base">
          Don&apos;t have an account?{" "}
          <Link className="text-blue-600 hover:underline ml-1" to={"/signup"}>
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
