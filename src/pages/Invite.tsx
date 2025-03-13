import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import data from '../assets/images/data.png';
import fundo from '../assets/images/img-center.png';
import nomeNoivos from '../assets/images/nomes-noivos.png';
import Button from '../components/Button';
import ModalConfirm from '../components/modal/ModalConfirm';
import ModalInfo from '../components/modal/ModalInfo';
import { useGuests } from '../hooks/useGuests';
import { Guest } from '../hooks/useGuestsStore';
import handleConfettiClick from '../utils/confetti';

export default function Invite() {
  const { id } = useParams();
  const { findGuestById, editGuestById } = useGuests();
  const [guest, setGuest] = useState<Guest>({} as Guest);
  const [open, setOpen] = useState<boolean>(false);
  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [responseType, setResponseType] = useState<'happy' | 'sad'>('happy');

  const findGuest = async () => {
    const response = await findGuestById(id);
    setGuest(response.data);
  };

  const confirm = async (status: any) => {
    setResponseType(status === 'confirmado' ? 'happy' : 'sad');
    await editGuestById(id, { confirmado: status });
    setOpen(true);
    status === 'confirmado' && handleConfettiClick();
  };

  const openModal = () => {
    setOpenInfo(true);
  };

  useEffect(() => {
    findGuest();
  }, []);

  return (
    <section className='w-full bg-marfim'>
      <div
        className='h-screen bg-cover flex justify-center items-center'
        style={{ backgroundImage: `url(${fundo})` }}
      >
        <div className='w-full flex justify-center items-center'>
          <div className='bg-marfim rounded-4xl lg:w-2/4 flex flex-col justify-center items-center gap-6 px-16 py-8'>
            <img
              src={nomeNoivos}
              className='w-40 sm:w-50'
              alt='Nome dos noivos'
            />
            <p className='font-montserrat text-texto text-center text-sm sm:text-lg lg:text-xl'>
              Olá, {guest.nome}! <br /> <br />
              Estamos muito felizes em convidá-lo para comemorar com a gente no
              nosso almoço após o casamento civil!
            </p>
            <img src={data} className='w-48 sm:w-64' alt='Data do evento' />
            <p className='font-montserrat text-texto font-semibold text-center text-sm sm:text-base lg:text-lg'>
              Por favor, confirme sua presença abaixo para nos ajudar a
              organizar melhor o evento e reservar seu lugar.
            </p>
            <div className='flex flex-col gap-4 items-center'>
              <Button
                label='Confirmar presença 😍'
                colorType='dourado'
                value='confirmado'
                onClick={(e) => confirm(e.target.value)}
              />
              <Button
                label='Não irei 😢'
                value='nao'
                colorType='cinza'
                onClick={(e) => confirm(e.target.value)}
              />
            </div>
            <a
              className='cursor-pointer underline text-texto text-sm sm:text-base lg:text-lg'
              onClick={openModal}
            >
              Informações sobre o almoço
            </a>
          </div>
        </div>
      </div>
      <ModalConfirm
        data={guest}
        isOpen={open}
        onClose={() => setOpen(false)}
        type={responseType}
      />
      <ModalInfo isOpen={openInfo} onClose={() => setOpenInfo(false)} />
    </section>
  );
}

