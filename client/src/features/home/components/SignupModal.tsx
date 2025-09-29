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
        className="bg-white rounded-lg shadow-md w-[95%] sm:w-[85%] md:w-[70%] lg:w-[50%] xl:w-[35%] p-4 sm:p-6 md:p-8 lg:p-10 max-h-[90vh] overflow-y-auto mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <PrimaryLogo width={40} height={40} className="sm:w-[50px] sm:h-[50px]" />
          <XIcon className="cursor-pointer w-6 h-6 sm:w-8 sm:h-8" onClick={onClose} />
        </div>

        <div className="flex justify-left">
          <h3 className="text-base sm:text-lg w-full sm:w-[85%] md:w-[70%] font-medium leading-relaxed">{text}</h3>
        </div>
        <div className="flex items-center justify-center my-4 sm:my-6">
        <LoginCardModals onLogin={(e) => onClose(e)} />
        </div>

        <footer className="text-gray-400 mt-8 sm:mt-12">
          <div className="container mx-auto text-center">
            <p className="text-xs sm:text-sm">
              &copy; {new Date().getFullYear()} Rahhal. All rights reserved.
            </p>
            <p className="text-xs sm:text-sm mt-2">
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
