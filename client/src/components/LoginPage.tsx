import { Link } from "react-router-dom";
import PrimaryLogo from "@/features/logos/PrimaryLogo";
import { HomeIcon } from "lucide-react";
import LoginCard from "@/features/Login/components/LoginCard";

export function LoginPage() {
  return (
    <div className="w-full lg:grid lg:grid-cols-2 h-full flex flex-col justify-center">
      <Link
        className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 flex items-center"
        to={"/"}
      >
        <HomeIcon className="h-6 w-6 mr-2" />
        <span className="ml-2 text-lg hover:underline">Home</span>
      </Link>
      <div className="flex items-center justify-center py-12">
        <LoginCard />
      </div>
      <div className="hidden lg:flex items-center justify-center bg-gray-50">
        <svg
          style={{ paddingLeft: "200px" }}
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
