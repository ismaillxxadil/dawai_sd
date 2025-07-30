// Button.tsx
import React, { ButtonHTMLAttributes, ReactNode, MouseEvent } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary"; // Changed from 'type' to 'variant' to avoid conflict
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  variant = "primary", // Changed from 'type' to 'variant'
  size = "medium",
  disabled = false,
  loading = false,
  onClick,
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles = `
    inline-flex items-center justify-center
    font-semibold rounded-xl
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    shadow-sm
  `;

  const variantStyles: Record<"primary" | "secondary", string> = {
    primary: `
      bg-primary text-white
      hover:bg-primary/90 
      focus:ring-primary/50
      hover:shadow-md
    `,
    secondary: `
      bg-white text-primary border-2 border-primary
      hover:bg-primary hover:text-white
      focus:ring-primary/50
      hover:shadow-md
    `,
  };

  const sizeStyles: Record<"small" | "medium" | "large", string> = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  const LoadingSpinner = () => (
    <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {children}
    </button>
  );
};

export default Button;
