import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import data from '../assets/images/data.png';
import imgLeft from '../assets/images/img-left.png';
import imgRight from '../assets/images/img-right.png';
import nomeNoivos from '../assets/images/nomes-noivos.png';
import Button from '../components/Button';
import Header from "../components/Header";
import ModalConfirm from '../components/modal/ModalConfirm';
import ModalInfo from '../components/modal/ModalInfo';
import { useGuests } from '../hooks/useGuests';
import { Guest } from '../hooks/useGuestsStore';
import handleConfettiClick from '../utils/confetti';

export default function Invite(){
  const { id } = useParams();
  const { findGuestById, editGuestById } = useGuests()
  const [guest, setGuest] = useState<Guest>({} as Guest)
  const [open, setOpen] = useState<boolean>(false);
  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [responseType, setResponseType] = useState<'happy' | 'sad'>('happy');

  const findGuest = async () => {
    const response = await findGuestById(id);
    setGuest(response.data)
  }

  const confirm = async (status: any) => {
    setResponseType(status === 'confirmado' ? 'happy' : 'sad');
    await editGuestById(
      id,
      { confirmado: status }
    );
    setOpen(true);
    status === 'confirmado' && handleConfettiClick();
  }

  const openModal = () => {
    setOpenInfo(true)
  }

  useEffect(() => {
    findGuest()
  }, [])

  return (
    <section className='w-full h-screen bg-marfim'>
      <Header className='fixed bg-marfim' />
      <div className='h-full flex justify-between'>
        <div
          className='w-[15%] bg-cover'
          style={{ backgroundImage: `url(${imgLeft})` }}
        />
        <div className='w-[45%] flex flex-col justify-center items-center gap-6'>
          <img src={nomeNoivos} className='w-60' />
          <p className='font-montserrat text-texto text-center'>
            Olá, {guest.nome}! <br /> <br />
            Estamos muito felizes em convidá-lo para comemorar com a gente no
            nosso almoço após o casamento civil!
          </p>
          <img src={data} className='w-64' />
          <p className='font-montserrat text-texto font-semibold text-center'>
            Por favor, confirme sua presença abaixo para nos ajudar a organizar
            melhor o evento e reservar seu lugar.
          </p>
          <div className='flex flex-col gap-2 items-center'>
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
            className='cursor-pointer underline text-texto'
            onClick={openModal}
          >
            Informações sobre o almoço
          </a>
        </div>
        <div
          className='w-[15%]'
          style={{ backgroundImage: `url(${imgRight})` }}
        />
      </div>
      <ModalConfirm
        data={guest}
        isOpen={open}
        onClose={() => setOpen(false)}
        type={responseType}
      />
      <ModalInfo
        isOpen={openInfo}
        onClose={() => setOpenInfo(false)}
      />
    </section>
  );
}
