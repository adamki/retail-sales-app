import React, { useEffect } from 'react';

import { useAppDispatch } from './app/hooks';
import stacklineLogo from './assets/stacklineLogo.svg';
import Product from './components/Product';
import SalesChart from './components/SalesChart';
import { fetchSales } from './features/sales/salesSlice';

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSales());
  }, [dispatch]);

  return (
    <div className='flex h-screen flex-col'>
      <header className='bg-blue-950 p-6'>
        <a href='https://stackline.com/' rel='noopener noreferrer'>
          <img src={stacklineLogo} className='h-6' alt='Stackline logo' />
        </a>
      </header>

      <div className='bg-neutral-100 flex flex-col md:flex-row flex-1 px-2 py-12'>
        <aside className='w-fit md:min-w-30 flex md:flex-col md:justify-start shadow-lg m-4 bg-white'>
          <Product />
        </aside>

        <main className='w-grow md:w-4/5 flex flex-col bg-white justify-center shadow-lg m-4 p-4'>
          <h2 className='mb-4 text-xl font-light'>Retail Sales</h2>
          <SalesChart />
        </main>
      </div>
    </div>
  );
};

export default App;
