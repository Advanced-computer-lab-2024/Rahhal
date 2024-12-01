"use client";

import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CountdownRedirectProps {
  maxCount?: number;
}
export default function CountdownRedirect({ maxCount = 5 }: CountdownRedirectProps) {
  const [count, setCount] = useState(maxCount);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          navigate("/signin");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-6">
        <p className="text-lg">Redirecting you to login in {count}...</p>
        <Loader className="h-10 w-10 animate-spin" />
      </div>
    </div>
  );
}
