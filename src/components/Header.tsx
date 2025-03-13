import { IoLogOut } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { logout } from '../utils/firebase';
import Button from './Button';

type IHeader = {
  className?: string
}

export default function Header({className}: IHeader) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header
      className={`w-full py-4 px-20 flex justify-between items-center border-b-dourado-claro border ${className}`}
    >
      <img src={logo} className='w-30' />
      <p className='cursor-default font-montserrat text-dourado-claro font-medium'>
        Almoço de Casamento
      </p>
      <Button
        label = {
          <div className='flex gap-2 items-center justify-center'>
            <IoLogOut/>
            Sair
          </div>
        }
        onClick={() => handleLogout()}
        colorType='rubi'
      />
    </header>
  );
}
