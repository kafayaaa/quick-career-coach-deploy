interface Props {
  type?: "button" | "submit" | "reset" | undefined;
  disabled: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function ActionButton({
  type,
  disabled,
  onClick,
  children,
}: Props) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="bg-sky-400 text-sm md:text-base text-zinc-50 py-2 px-4 rounded-md cursor-pointer disabled:bg-zinc-500 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}
