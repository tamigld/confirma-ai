import { useEffect, useState } from "react";
import { IoAdd, IoReload, IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import GuestList from "../components/GuestList";
import Header from "../components/Header";
import ModalNovoConvidado from "../components/modal/ModalNovoConvidado";
import { useAuth } from "../context/AuthContext";
import { useGuests } from "../hooks/useGuests";

export default function Dashboard(){
  const [open, setOpen] = useState<boolean>(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const { fetchGuests } = useGuests();

  const openModal = () => {
    setOpen(true);
  };

  const onReload = () => {
    fetchGuests();
  };

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className='h-screen w-full flex items-center justify-center font-montserrat'>
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className='h-screen w-full flex items-center justify-center'>
        Por favor, faça login
      </div>
    );
  }

  return (
    <section className='w-full h-screen bg-marfim'>
      <Header />
      <div className='px-20 py-14 w-full flex flex-col gap-4'>
        <h1 className='text-texto text-4xl font-montserrat font-semibold'>
          Lista de Convidados
        </h1>
        <div className='flex gap-2'>
          <input className='w-full py-1 px-6 border border-dourado-claro rounded-full' />
          <Button colorType='dourado' label={<IoSearch />} type='submit' />
          <Button
            colorType='dourado'
            label={<IoAdd />}
            onClick={() => openModal()}
          />
          <Button
            colorType='dourado'
            label={<IoReload />}
            type='submit'
            onClick={onReload}
          />
        </div>
        <GuestList />
      </div>
      <ModalNovoConvidado isOpen={open} onClose={() => setOpen(false)} />
    </section>
  );
}
