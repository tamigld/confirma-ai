import champagne from '../../assets/images/champanhe.png';
import brokenHeart from '../../assets/images/coracao-partido.png';
import { Guest } from "../../hooks/useGuestsStore";
import Button from "../Button";

type IModal = {
  data: Guest,
  isOpen: boolean,
  onClose: () => void,
  type: 'happy' | 'sad'
};

export default function ModalConfirm({ data, isOpen, onClose, type }: IModal){
  if (!isOpen) return null;

  const types = {
    happy: {
      title: `Agradecemos sua resposta, ${data.nome}`,
      subtitle: 'Estamos ansiosos para celebrar com você!',
      img: champagne,
    },
    sad: {
      title: `Agradecemos sua resposta, ${data.nome}`,
      subtitle:
        'Sentiremos sua falta, mas esperamos te ver em outras oportunidades!',
      img: brokenHeart,
    },
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-amber-950/45 text-texto font-montserrat'>
      <div className='bg-[#F7F4EF] p-6 rounded-2xl shadow-lg w-96 gap-4 flex flex-col items-center'>
        <img src={types[type].img} className='w-40' />
        <h1 className='font-semibold'>{types[type].title}</h1>
        <p className='text-center'>{types[type].subtitle}</p>
        <Button onClick={onClose} label='Fechar' colorType='cinza' />
      </div>
    </div>
  );
}
