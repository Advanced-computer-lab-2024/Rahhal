import React from "react";

interface ComingSoonProps {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  title = "Coming Soon",
  subtitle = "We're working on something amazing",
  description = "This feature is currently under development. Stay tuned for updates!",
  image,
  imageAlt = "Coming Soon",
}) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(135deg, #fff 0%, var(--complimentary-color-fade, #a4bce1) 100%)",
      }}
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* Image */}
        {image && (
          <div className="mb-8">
            <img
              src={image}
              alt={imageAlt}
              className="mx-auto w-64 h-64 md:w-80 md:h-80 object-contain"
            />
          </div>
        )}

        {/* Content */}
        <div className="space-y-6">
          <h1
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{ color: "var(--primary-color, #e1bc6d)" }}
          >
            {title}
          </h1>

          <h2
            className="text-xl md:text-2xl font-medium"
            style={{ color: "var(--complimentary-color, #6d91e1)" }}
          >
            {subtitle}
          </h2>

          <p
            className="text-lg md:text-xl max-w-md mx-auto leading-relaxed"
            style={{ color: "#555" }}
          >
            {description}
          </p>

          {/* Loading animation */}
          <div className="flex justify-center items-center space-x-2 mt-8">
            <div
              className="w-3 h-3 rounded-full animate-bounce"
              style={{ background: "var(--primary-color, #e1bc6d)" }}
            ></div>
            <div
              className="w-3 h-3 rounded-full animate-bounce"
              style={{
                background: "var(--complimentary-color, #6d91e1)",
                animationDelay: "0.1s",
              }}
            ></div>
            <div
              className="w-3 h-3 rounded-full animate-bounce"
              style={{
                background: "var(--primary-color, #e1bc6d)",
                animationDelay: "0.2s",
              }}
            ></div>
          </div>
        </div>

        {/* Back to home button */}
        <div className="mt-12">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white transition-colors duration-200"
            style={{
              background: "var(--primary-color, #e1bc6d)",
              color: "#fff",
              boxShadow: "0 2px 8px 0 rgba(109,145,225,0.10)",
            }}
          >
            <svg
              className="mr-2 -ml-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
