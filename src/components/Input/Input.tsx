type Props = React.ComponentProps<"input"> & {
  legend?: string;
};

export function Input({ legend, type = "text", ...rest }: Props) {
  return (
    <fieldset>
      <legend className="text-gray-300 text-xs mb-2 uppercase font-bold ">
        {legend}
      </legend>
      <input
        type={type}
        className="w-full h-10 border-b-1 border-gray-500 placeholder-gray-400 px-1"
        {...rest}
      />
    </fieldset>
  );
}
