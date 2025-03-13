import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

type IStatus = {
  label: 'pendente' | 'confirmado' | 'nao'
}

export default function StatusTag({ label }: IStatus){
  const styles = {
    pendente: `border-texto text-texto`,
    confirmado: `border-[#00A053] text-[#00A053]`,
    nao: `border-[#c92424] text-[#c92424]`,
  };

  return (
    <div className={`cursor-default w-fit flex items-center justify-center py-1 px-6 rounded-full border-2 font-medium ${styles[label]}`}>
      <p className="text-sm">{label === 'nao' ? 'Não irá' : capitalizeFirstLetter(label)}</p>
    </div>
  );
}
