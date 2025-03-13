import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import rings from '../assets/icons/hugeicons_wedding.png';
import background from '../assets/images/fundo-login.png';
import Button from '../components/Button';
import Input from '../components/Input';
import { login } from '../utils/firebase';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userCredential = await login(email, password);

      if (userCredential) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <section className='flex flex-row items-center h-screen w-full justify-between'>
      <div
        className='w-[50%] h-full flex justify-center flex-col items-center bg-center text-nude gap-10'
        style={{ backgroundImage: `url(${background})` }}
      >
        <p className='font-montserrat font-medium'>Almoço de Casamento</p>
        <p className='font-playball text-6xl text-center'>
          Thamires <br /> & <br /> João Victor
        </p>
        <div className='backdrop-blur-xs border-[1px] rounded-3xl py-2 px-6'>
          <p className='font-montserrat'>15/03/2025 às 12h</p>
        </div>
      </div>
      <div className='w-[50%] bg-nude h-full flex justify-center flex-col items-center'>
        <div className='flex flex-col gap-2 items-center'>
          <img src={rings} className='w-10' />
          <h2 className='text-texto font-montserrat text-3xl font-bold'>
            Login
          </h2>
        </div>
        <form
          className='w-[60%] flex flex-col gap-6 items-center'
          onSubmit={handleSubmit}
        >
          <div className='w-[80%] flex flex-col gap-4'>
            <Input
              label='E-mail'
              type='email'
              placeholder='Digite o seu e-mail'
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label='Senha'
              type='password'
              placeholder='Digite a sua senha'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button label='Entrar' type='submit' />
        </form>
      </div>
    </section>
  );
}
