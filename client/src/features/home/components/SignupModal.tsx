import PrimaryLogo from "@/features/logos/PrimaryLogo";
import { XIcon } from "lucide-react";
import CountdownRedirect from "./RedirectionState";
import { useNavigate } from "react-router-dom";

interface SignUpModalProps {
  text: string;
  onClose: (e: React.MouseEvent) => void;
}

function SignUpModal({ text, onClose }: SignUpModalProps) {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-md w-[30%] p-10">
        <div className="flex justify-between h-full mb-4">
          <PrimaryLogo width={50} height={50} />
          <XIcon className="cursor-pointer" onClick={onClose} />
        </div>
        <h3 className="text-lg w-[70%] font-medium">{text}</h3>
        <CountdownRedirect />
        <div className="flex justify-center gap-4">
          <button
            className="btn bg-white p-2 rounded-lg border border-[var(--primary-color)] text-[var(--primary-color)]"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="btn bg-[var(--primary-color)] p-2 rounded-lg text-white"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/signin");
            }}
          >
            Sign Up
          </button>
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
