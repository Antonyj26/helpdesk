type Props = React.ComponentProps<"button"> & {
  isLoading?: boolean;
  variant?: "primary" | "secondary";
};

const base =
  "w-full h-10 rounded-1xl text-sm font-bold cursor-pointer hover:bg-gray-300 transition ease-linear";

const variants = {
  primary: "bg-gray-200 text-gray-600",
  secondary: "bg-gray-500 text-gray-200",
};

export function Button({
  children,
  isLoading,
  type = "button",
  variant = "primary",
  ...rest
}: Props) {
  return (
    <button
      className={`${base} ${variants[variant]} disabled:opacity-50 disabled:cursor-progress`}
      disabled={isLoading}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
}
