import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = forwardRef(({ 
  children, 
  className, 
  variant = "primary", 
  size = "md", 
  icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg hover:from-primary/90 hover:to-primary hover:shadow-xl",
    secondary: "bg-gradient-to-r from-secondary to-secondary/90 text-white shadow-lg hover:from-secondary/90 hover:to-secondary hover:shadow-xl",
    accent: "bg-gradient-to-r from-accent to-accent/90 text-secondary shadow-lg hover:from-accent/90 hover:to-accent hover:shadow-xl",
    outline: "border-2 border-primary text-primary bg-white hover:bg-primary hover:text-white",
    ghost: "text-primary hover:bg-primary/10",
    success: "bg-gradient-to-r from-success to-success/90 text-white shadow-lg hover:from-success/90 hover:to-success hover:shadow-xl",
    danger: "bg-gradient-to-r from-error to-error/90 text-white shadow-lg hover:from-error/90 hover:to-error hover:shadow-xl"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-base rounded-lg",
    lg: "px-6 py-3 text-lg rounded-xl",
    xl: "px-8 py-4 text-xl rounded-xl"
  };

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {icon && iconPosition === "left" && <ApperIcon name={icon} className="w-4 h-4" />}
          {children}
          {icon && iconPosition === "right" && <ApperIcon name={icon} className="w-4 h-4" />}
        </>
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;