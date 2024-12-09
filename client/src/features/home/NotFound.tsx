import { Link } from "react-router-dom";
import { FrownIcon, HomeIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <FrownIcon className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600 mb-4" />
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 dark:text-gray-500 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-[var(--complimentary-color-dark)] hover:bg-[var(--complimentary-color-fade)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <HomeIcon className="mr-2 h-5 w-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
