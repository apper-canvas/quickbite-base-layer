import { cn } from "@/utils/cn";

const Badge = ({ 
  children, 
  className, 
  variant = "default",
  size = "md"
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary/10 to-primary/5 text-primary",
    secondary: "bg-gradient-to-r from-secondary/10 to-secondary/5 text-secondary",
    accent: "bg-gradient-to-r from-accent/10 to-accent/5 text-secondary",
    success: "bg-gradient-to-r from-success/10 to-success/5 text-success",
    warning: "bg-gradient-to-r from-warning/10 to-warning/5 text-warning",
    error: "bg-gradient-to-r from-error/10 to-error/5 text-error",
    veg: "bg-green-100 text-green-800 border border-green-300",
    nonveg: "bg-red-100 text-red-800 border border-red-300"
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;