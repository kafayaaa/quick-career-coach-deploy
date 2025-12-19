type Props = {
  title: string;
  value: string;
  fieldName: string;
  inputType?: string;
  isTextArea?: boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export default function TableField({
  title,
  value,
  fieldName,
  inputType = "text",
  isTextArea = false,
  onChange,
}: Props) {
  return (
    <div className="w-full flex flex-col">
      <label htmlFor={fieldName} className="ml-1 font-semibold mb-1">
        {title}
      </label>

      {isTextArea ? (
        <textarea
          name={fieldName}
          id={fieldName}
          className="w-full px-3 py-2 text-sm md:text-base bbg-zinc-100 dark:bg-zinc-700 rounded border border-zinc-300 dark:border-zinc-600 focus:outline-sky-500 focus:border-none caret-sky-500 resize-y"
          spellCheck={false}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          name={fieldName}
          id={fieldName}
          type={inputType}
          value={value}
          className="w-full px-3 py-2 text-sm md:text-base bg-zinc-100 dark:bg-zinc-700 rounded border border-zinc-300 dark:border-zinc-600 focus:outline-sky-500 focus:border-none caret-sky-500 "
          onChange={onChange}
        />
      )}
    </div>
  );
}
