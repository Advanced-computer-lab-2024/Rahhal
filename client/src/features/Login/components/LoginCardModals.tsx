import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios, { AxiosError, isAxiosError } from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { loginUser } from "@/api-calls/users-api-calls";
import { UserState } from "@/stores/user-state-store";

interface LoginPageProps {
    redirectLink?: string;
    onLogin: (e: React.MouseEvent) => void;
  }

export default function LoginCardModals({ redirectLink,onLogin }: LoginPageProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });

  const handleSubmit = async (e: any) => {
    e.stopPropagation();
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
    try {
      newErrors.username = "";
      newErrors.password = "";
      setErrors(newErrors);
      const reqBody = { username: username, password: password };
      const response = await loginUser(reqBody);
      await UserState();
      setDisabled(true);
      
      toast({
        title: "Login Successfull",
        description: "You have successfully logged in.",
        style: {
          backgroundColor: "#34D399",
          color: "#FFFFFF",
        },
        duration: 3000,
      });
      onLogin(e);
      setDisabled(false);

      if (response.role === "tourist") {
        if (redirectLink) {
          navigate(redirectLink);
        } 
        else{
          navigate('/');
        }
      } else  {
        navigate(`/`);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          toast({
            title: "Error",
            description: axiosError.response.data.error,
            variant: "destructive",
            duration: 3000,
          });
        }
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate("/forgot-password");
  };

  return (
    <>
      <Card className="w-[fill] h-fill flex flex-col justify-center border-none shadow-none ">
        <CardContent className="flex flex-col justify-center px-0">
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-4">
              <div className="grid gap-1">
                <Label
                  htmlFor="email"
                  className={`text-md ${errors.username ? "text-red-500" : ""}`}
                >
                  Username
                </Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Please enter your username"
                  value={username}
                  onChange={(e) => {
                    e.stopPropagation();
                    setUsername(e.target.value);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    if (e.key === "Enter") setErrors({ ...errors, username: "", password: "" });
                  }}
                  className={`border ${errors.username ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
              </div>
              <div className="grid gap-1">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className={`text-md ${errors.password ? "text-red-500" : ""}`}
                  >
                    Password
                  </Label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Please enter your password"
                  value={password}
                  onChange={(e) => {
                    e.stopPropagation();
                    setPassword(e.target.value);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    if (e.key === "Enter") setErrors({ ...errors, username: "", password: "" });
                  }}
                  className={`border ${errors.password ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>
            </div>

            <Button
              type="submit"
              disabled={disabled}
              className="w-full py-2 text-lg"
              style={{ backgroundColor: "#E1BC6D" }}
              onClick={(e) => {
                e.stopPropagation(); 
              
              }}
            >
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="mt-6 px-0 text-center text-base">
          Don&apos;t have an account?{" "}
          <Link
            className="text-sm text-blue-600 hover:underline ml-1"
            to={"/signup"}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
