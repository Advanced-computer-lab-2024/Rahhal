import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios, { AxiosError, isAxiosError } from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import PrimaryLogo from "@/features/logos/PrimaryLogo";
import { HomeIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";

export function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });

  const userLogin: any = async (credentials: any) => {
    const response = await axios.post("http://localhost:3000/api/user/users/login", credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  };

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
    try {
      newErrors.username = "";
      newErrors.password = "";
      setErrors(newErrors);
      const reqBody = { username: username, password: password };
      const response = await userLogin(reqBody);
      console.log(response);
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
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setDisabled(false);
      if (response.role === "admin") {
        navigate(`/admin/${response._id}`);
      } else if (response.role === "tourGuide") {
        navigate(`/tour-guide/${response._id}`);
      } else if (response.role === "tourist") {
        navigate(`/entertainment/${response._id}`);
      } else if (response.role === "advertiser") {
        navigate(`/advertiser/${response._id}`);
      } else if (response.role === "tourismGovernor") {
        navigate(`/tourism-governor/${response._id}`);
      } else if (response.role === "seller") {
        navigate(`/seller/${response._id}`);
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

  const handleForgotPassword = () => {
    // alert('Please check your email for password reset instructions.');
    toast({
      title: "Password Reset",
      description: "Please check your email for password reset instructions.",
      duration: 3000,
    });
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[780px]">
      <Link className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 flex items-center" to={"/"}>
        <HomeIcon className="h-6 w-6 mr-2" />
        <span className="ml-2 text-lg hover:underline">Home</span>
      </Link>
      <div className="flex items-center justify-center py-12">
        <Card className="w-[500px] h-[500px] p-6 shadow-lg flex flex-col justify-center">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Login</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="grid gap-4">
                <div className="grid gap-1">
                  <Label htmlFor="email" className={`text-lg ${errors.username ? "text-red-500" : ""}`}>
                    Username
                  </Label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="Please enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") setErrors({ ...errors, username: "", password: "" });
                    }}
                    className={`border ${errors.username ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
                </div>
                <div className="grid gap-1">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className={`text-lg ${errors.password ? "text-red-500" : ""}`}>
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
                  <Input
                    id="password"
                    type="password"
                    placeholder="Please enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") setErrors({ ...errors, username: "", password: "" });
                    }}
                    className={`border ${errors.password ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>
              </div>

              <Button
                type="submit"
                disabled= {disabled}
                className="w-full py-2 text-lg"
                style={{ backgroundColor: "#E1BC6D" }}
              >
                Login
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
      </div>
      <div className="hidden lg:flex items-center justify-center bg-gray-50">

        <svg
          style={{paddingLeft: '200px'}}
          width="700"
          height="400"
          viewBox="0 0 300 276"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <PrimaryLogo />
        </svg>
      </div>
    </div>
    
  );
}
