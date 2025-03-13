import { IoCalendar, IoLocation } from 'react-icons/io5';
import Button from '../Button';

type IModal = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalInfo({ isOpen, onClose }: IModal) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-amber-950/45 text-texto font-montserrat'>
      <div className='bg-[#F7F4EF] p-6 rounded-2xl shadow-lg w-96 gap-4 flex flex-col items-center'>
        <h1 className='font-semibold'>Informações sobre o almoço</h1>
        <p className='text-center'>
          O pagamento do almoço pode ser feito no dia, mas se quiser garantir
          sua reserva com antecedência, o restaurante aceita Pix!
        </p>
        <p className='text-left'>
          🔹 Chave Pix: 11959560218 <br />
          🔹 Valor: R$ 54,90 por pessoa <br />
          🔹 Criança até 7 anos não paga, acima de 7 anos paga apenas metade do
          valor!
        </p>
        <hr className='text-dourado-claro w-full' />
        <div className='flex flex-col items-center gap-2'>
          <p className='text-center'>
            Caso faça o pagamento antecipado, utilize o botão abaixo para enviar
            o comprovante e confirmar sua presença:
          </p>
          <Button
            colorType='dourado'
            label='Enviar comprovante'
            onClick={() => window.open('https://wa.link/c5ck8r', '_blank')}
          />
        </div>
        <div className='mt-4 flex flex-col items-start gap-2.5'>
          <a
            href='https://maps.app.goo.gl/Gx1NkMq6NyFVusq96'
            className='flex gap-2.5 items-center'
          >
            <IoLocation size={34} />
            <div>
              <p className='font-semibold text-xs'>
                RESTAURANTE MARIA MARGARIDA
              </p>
              <p className='font-extrabold text-xs'>
                RUA DA PÁTRIA, 912 - VILA MAGINI, MAUÁ
              </p>
            </div>
          </a>
          <div className='flex gap-2.5 items-center'>
            <IoCalendar size={34} />
            <div>
              <p className='font-semibold text-xs'>
                Sábado, 15 de março de 2025
              </p>
              <p className='font-extrabold text-xs'>às 12:00</p>
            </div>
          </div>
        </div>
        <Button onClick={onClose} label='Fechar' colorType='cinza' />
      </div>
    </div>
  );
}
