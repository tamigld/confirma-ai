import { useState } from 'react';
import { useGuests } from '../../hooks/useGuests';
import { Guest } from '../../hooks/useGuestsStore';
import Input from '../Input';

type IModal = {
  isOpen: boolean,
  onClose: () => void,
};

const ModalNovoConvidado = ({ isOpen, onClose }: IModal) => {
  const { addGuest } = useGuests()
  const [nome, setNome] = useState('');
  const [celular, setCelular] = useState<number>(0);

  const handleNewSave = async (nome: string, celular: number) => {
    const newGuest = {
      nome,
      celular,
      confirmado: 'pendente'
    }

    await addGuest(newGuest as Guest)

    setTimeout(() => {
      onClose()
    }, 500);
  }

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-amber-950/45'>
      <div className='bg-[#F7F4EF] p-6 rounded-2xl shadow-lg w-96 gap-4 flex flex-col'>
        <h2 className='text-xl font-semibold text-[#403921]'>
          Novo convidado
        </h2>
        <Input
          type='text'
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder='Digite o nome do convidado'
          label='Nome'
        />
        <Input
          type='number'
          value={celular}
          onChange={(e) => setCelular(e.target.value)}
          placeholder={'Digite o número de celular'}
          label={'Número'}
        />
        <div className='flex justify-between'>
          <button
            onClick={() => handleNewSave(nome, celular)}
            className='bg-[#C4A47C] text-white py-2 px-4 rounded-lg hover:bg-[#a28563]'
          >
            Adicionar
          </button>
          <button
            onClick={onClose}
            className='bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400'
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalNovoConvidado;
