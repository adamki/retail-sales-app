import React from 'react';

import { useAppSelector } from '../app/hooks';
import { ISalesState } from '../features/sales/salesSlice';

const Product: React.FC = () => {
  const { data, loading, error } = useAppSelector(
    (state: { sales: ISalesState }) => state.sales,
  );

  if (!data || loading) {
    return <div>...loading</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const { brand, image, title, subtitle, tags } = data;

  return (
    <>
      <div className='border-slate-200 grid justify-items-center border-b p-8'>
        <img
          className='max-h-auto max-w-40'
          src={image}
          alt={`${brand}-${title}-img`}
        />
        <p className={`text-blue-950 text-xl font-bold`}>{title}</p>
        <p className={`text-slate-400 text-center text-md`}>{subtitle}</p>
      </div>
      <div className='md:border-b md:border-slate-200 p-4'>
        {tags.map(
          (tag: string, idx: number): JSX.Element => (
            <div
              key={idx}
              className={`mx-3 my-2 inline-block rounded-lg border px-3 py-1 border-slate-200 text-xs font-semibold`}
            >
              <span className={`text-blue-950`}>{tag}</span>
            </div>
          ),
        )}
      </div>
    </>
  );
};

export default Product;
