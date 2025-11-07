type Props = React.ComponentProps<"button"> & {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "danger";
  baseVariant?: "defaultBase" | "baseIcon";
};

const baseVariants = {
  defaultBase:
    "w-full h-10 rounded-1xl text-sm font-bold cursor-pointer hover:bg-gray-300 transition ease-linear",
  baseIcon:
    "w-7 h-7 rounded-1xl cursor-pointer flex items-center justify-center hover:bg-gray-600 transition ease-linear mr-2",
};

const variants = {
  primary: "bg-gray-200 text-gray-600",
  secondary: "bg-gray-500 text-gray-200",
  danger: "bg-gray-500",
};

export function Button({
  children,
  isLoading,
  type = "button",
  variant = "primary",
  baseVariant = "defaultBase",
  ...rest
}: Props) {
  return (
    <button
      className={`${baseVariants[baseVariant]} ${variants[variant]} disabled:opacity-50 disabled:cursor-progress`}
      disabled={isLoading}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
}
