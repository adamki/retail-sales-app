import React, { useEffect } from 'react';

import Panel from './Panel';
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

      <div className={`bg-neutral-100 flex flex-grow px-2 py-12`}>
				<Panel>
					<Product />
				</Panel>

        <Panel>
					<p className={`text-blue-950 text-xl font-bold`}>Retail Sales</p>
        </Panel>
      </div>
    </div>
  );
};

export default App;
