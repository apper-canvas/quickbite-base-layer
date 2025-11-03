import { cn } from "@/utils/cn";

const Card = ({ 
  children, 
  className,
  hover = true,
  padding = "md",
  ...props 
}) => {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  };

  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-200",
        hover && "hover:shadow-lg hover:-translate-y-1",
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;