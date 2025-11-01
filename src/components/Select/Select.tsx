type Props = React.ComponentProps<"select"> & {
  legend?: string;
};

export function Select({ legend, children, ...rest }: Props) {
  return (
    <fieldset>
      <legend className="text-gray-300 text-xs mb-2 uppercase font-bold ">
        {legend}
      </legend>
      <select className="w-full h-10 border-b border-gray-500" {...rest}>
        {children}
      </select>
    </fieldset>
  );
}
