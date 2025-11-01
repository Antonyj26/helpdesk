type Props = React.ComponentProps<"textarea"> & {
  legend: string;
};

export function TextArea({ legend, ...rest }: Props) {
  return (
    <fieldset>
      <legend className="text-gray-300 text-xs mb-2 uppercase font-bold ">
        {legend}
      </legend>
      <textarea
        className="resize-none w-full h-36 border-b-1 border-gray-500 placeholder-gray-400 px-1"
        {...rest}
      ></textarea>
    </fieldset>
  );
}
