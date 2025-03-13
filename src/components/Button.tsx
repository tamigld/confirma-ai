import { ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<any> & {
  label: any;
  onClick?: (e: any) => void;
  className?: string;
  colorType?: 'dourado' | 'rubi' | 'cinza'
};

export default function Button({
  label,
  className,
  onClick,
  colorType = 'rubi',
  ...rest
}: ButtonProps) {
  const styles = {
    dourado: `bg-dourado-claro`,
    rubi: `bg-rubi`,
    cinza: `bg-cinza`
  }
  return (
    <button
      className={`${className} ${styles[colorType]} hover:opacity-70 active:scale-95 transition-all text-sm py-2 px-6 rounded-full text-white font-montserrat w-fit cursor-pointer`}
      onClick={onClick}
      {...rest}
    >
      {label}
    </button>
  );
}
