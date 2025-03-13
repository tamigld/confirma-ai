import { useEffect, useState } from 'react';
import { FaEdit, FaShareSquare, FaTrash } from 'react-icons/fa';
import { useGuests } from '../hooks/useGuests';
import { Guest, useGuestsStore } from '../hooks/useGuestsStore';
import StatusTag from './StatusTag';
import ModalLink from './modal/ModalLink';


export default function GuestList() {
  const { fetchGuests, removeGuestById, findGuestById } = useGuests()
  const [open, setOpen] = useState<boolean>(false)
  const [data, setData] = useState<Guest>({} as Guest)
  const { guests } = useGuestsStore()

  const openModal = async (id: string) => {
    const response = await findGuestById(id);
    setData(response.data)

    setOpen(true)
  }

  useEffect(() => {
    fetchGuests();
  }, [guests]);

  return (
    <div className='bg-gray-100 max-h-f overflow-scroll w-full font-montserrat'>
      <div className='bg-dourado-claro rounded-4xl  max-h-full'>
        <table className='w-full border-collapse'>
          <thead>
            <tr className=' bg-transparent text-white rounded-tl-4xl rounded-tr-4xl'>
              <th className='p-3 text-left'>Nome</th>
              <th className='p-3 text-left'>Celular</th>
              <th className='p-3 text-center'>Status</th>
              <th className='p-3'>Gerar Convite</th>
              <th className='p-3'>Opções</th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            {guests.map((guest) => (
              <tr key={guest._id}>
                <td className='p-3'>{guest.nome}</td>
                <td className='p-3'>{guest.celular}</td>
                <td className='flex justify-center items-center'>
                  <StatusTag label={guest.confirmado} />
                </td>
                <td className='p-3 text-center'>
                  <button
                    onClick={() => openModal(guest._id)}
                    className='text-yellow-600 text-xl cursor-pointer'
                  >
                    <FaShareSquare />
                  </button>
                </td>
                <td className='p-3 flex gap-2 justify-center'>
                  <button
                    // onClick={() => handleEdit(guest.is)}
                    className='text-gray-600 text-xl cursor-pointer'
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => removeGuestById(guest._id)}
                    className='text-red-600 text-xl cursor-pointer'
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='p-4 bg-white flex justify-between text-gray-700 rounded-bl-4xl rounded-br-4xl'>
          <span>Total de convidados: {guests.length}</span>
          <span>
            Pendentes:{' '}
            {guests.filter((g) => g.confirmado === 'pendente').length}
          </span>
          <span>
            Confirmados:{' '}
            {guests.filter((g) => g.confirmado === 'confirmado').length}
          </span>
          <span>
            Não irão: {guests.filter((g) => g.confirmado === 'nao').length}
          </span>
        </div>
      </div>
      <ModalLink data={data} isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}
