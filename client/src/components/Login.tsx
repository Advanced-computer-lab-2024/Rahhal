
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"

export function Login() {


    const navigate = useNavigate();

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[disabled, setDisabled] = useState(false);

    

    const userLogin : any = async (credentials:any)  => {
        const response = await axios.post('http://localhost:3000/api/user/users/login', credentials, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        return response.data;
      }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const reqBody = {"username": username, "password": password};
            const response = await userLogin(reqBody);
            console.log(response);
            setDisabled(true);
            await new Promise((resolve) => setTimeout(resolve,3000));
            setDisabled(false);
            if(response.role === "admin") {
              navigate(`/admin`);
            }
            else if(response.role === "tourGuide"){
              navigate(`/tour-guide/${response._id}`);
            }
            else if(response.role === "tourist"){
              navigate(`/entertainment/${response._id}`);
            }
            else if(response.role === "advertiser"){
              navigate(`/advertiser/${response._id}`);
            }
            else if(response.role === "tourismGovernor"){
              navigate(`/tourism-governor/${response._id}`);
            }
            else if(response.role === "seller"){
              navigate(`/seller/${response._id}`);
            }
            
        }
        catch (error) {
            console.log(error);
            if (axios.isAxiosError(error) && error.response) {
              alert(error.response.data.error);
          } else {
              alert(error);
          }
        }
    }


    
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
           
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Username</Label>
              <Input
                id="email"
                type="text"
                placeholder="Please enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input 
                    id="password" 
                    type="password" 
                    placeholder="Please enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
            </div>
            <Button type="submit" onClick={handleSubmit} disabled = {disabled} className="w-full">
              Login
            </Button>
            
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link className="underline" to={"/signup"}>
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
      </div>
    </div>
  )
}
