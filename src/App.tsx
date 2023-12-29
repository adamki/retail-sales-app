import React, { useEffect } from 'react';

import Product from './Product';
import { useAppDispatch } from './app/hooks';
import stacklineLogo from './assets/stacklineLogo.svg';
import { fetchSales } from './features/sales/salesSlice';


const App = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSales());
  }, [dispatch]);

  return (
    <div className='flex h-screen flex-col'>
      <header className='bg-blue-950 p-4'>
        <a href='https://stackline.com/' rel='noopener noreferrer'>
          <img src={stacklineLogo} className='h-4' alt='Stackline logo' />
        </a>
      </header>

      <div className='bg-neutral-100 flex flex-1 px-2 py-12'>
        <aside className='w-1/5 flex flex-col justify-start shadow-lg m-4 bg-white'>
          <Product />
        </aside>

        <main className='w-4/5 flex flex-col bg-white justify-center shadow-lg m-4 p-4'>
					<h2 className='mb-4 text-xl font-bold'>Retail Sales</h2>
					<p>ChartContent</p>
        </main>
      </div>
    </div>
  );
};

export default App;
