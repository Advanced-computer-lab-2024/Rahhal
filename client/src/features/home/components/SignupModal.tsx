import PrimaryLogo from "@/features/logos/PrimaryLogo";
import { XIcon } from "lucide-react";
import CountdownRedirect from "./RedirectionState";
import { useNavigate } from "react-router-dom";
import LoginCard from "@/features/Login/components/LoginCard";
import LoginCardModals from "@/features/Login/components/LoginCardModals";

interface SignUpModalProps {
  text: string;
  onClose: (e: React.MouseEvent) => void;
}

function SignUpModal({ text, onClose }: SignUpModalProps) {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-md w-fill p-10 w-[35%]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between h-full mb-4">
          <PrimaryLogo width={50} height={50} />
          <XIcon className="cursor-pointer" onClick={onClose} />
        </div>

        <div className="flex justify-left">
          <h3 className="text-lg w-[70%] font-medium ">{text}</h3>
        </div>
        <div className="flex items-center justify-center my-6 ">
        <LoginCardModals onLogin={(e) => onClose(e)} />
        </div>

        <footer className=" text-gray-400 mt-12">
          <div className="container mx-auto text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Rahhal. All rights reserved.
            </p>
            <p className="text-sm mt-2">
              <a href="/terms" className="hover:text-black">
                Terms of Service
              </a>{" "}
              |{" "}
              <a href="/privacy" className="hover:text-black">
                Privacy Policy
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
export default SignUpModal;
