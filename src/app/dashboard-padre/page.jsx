'use client';

import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='flex justify-center items-center pt-10'>
        <h1 className='text-[2rem] text-[#AB0000]'>BEM VINDO <span className='font-semibold'>PADRE MARCIO</span></h1>
        <Image src="/logo-sagrado.svg" alt="LogoSagrado" width={100} height={150} className='ml-2'/>
      </div>

      <div>
        <p className='font-montserrat text-[1.5rem] text-center text-[#AB0000] pt-5'>O que deseja fazer hoje ?</p>
      </div>

      <div className='flex justify-center items-center gap-5 pt-10'>
        <div>
          <div 
            className='bg-[#AB0000] w-32 h-32 flex justify-center items-center rounded-lg cursor-pointer' 
            onClick={() => router.push('/home')}
          >
            <div>
              <Image src="/avisos.svg" className='ml-2' alt="LogoPascom" width={50} height={50} />
              <p className='text-center text-[#fff] pt-2 font-medium '>Mandar<br/>Avisos</p>
            </div>
          </div>
        </div>

        <div>
          <div 
            className='bg-[#AB0000] w-32 h-32 flex justify-center items-center rounded-lg cursor-pointer' 
            onClick={() => router.push('/avisos')}
          >
            <div>
              <Image src="/eventos.svg" className='ml-2' alt="LogoPascom" width={50} height={50} />
              <p className='text-center text-[#fff] pt-2 font-medium '>Mandar<br/>Eventos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;