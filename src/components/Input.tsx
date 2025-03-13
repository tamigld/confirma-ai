import { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<any> & {
  label: string;
  placeholder: string;
  className?: string
};

export default function Input({ label, placeholder, className, ...rest }: InputProps) {
  return (
    <div>
      <label className={`font-montserrat flex-col flex ${className}`} {...rest}>
        {label}
        <input
          className='w-full bg-white placeholder:text-gray-300 text-texto text-sm rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-dourado-claro hover:border-slate-300 focus:shadow'
          placeholder={placeholder}
        />
      </label>
    </div>
  );
}
