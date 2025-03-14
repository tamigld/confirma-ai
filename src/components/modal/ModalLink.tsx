import { IoLink } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { Guest } from '../../hooks/useGuestsStore';
import Button from '../Button';

type IModal = {
  data: Guest,
  isOpen: boolean,
  onClose: () => void,
};

export default function ModalLink({ data, isOpen, onClose }: IModal){
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-amber-950/45 font-montserrat'>
      <div className='bg-[#F7F4EF] p-6 rounded-2xl shadow-lg w-96 gap-4 flex flex-col items-center'>
        <h2 className='font-semibold'>Link de compartilhamento</h2>
        <p>Convidado: {data.nome}</p>
        <Button
          onClick={() => navigate(`/invite/${data._id}`)}
          label={
            <div className='flex gap-2 items-center justify-center'>
              <IoLink />
              Acessar convite
            </div>
          }
        />
        <Button onClick={onClose} label='Fechar' colorType='cinza' />
      </div>
    </div>
  );
};
