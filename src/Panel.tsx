import React, { ReactNode } from 'react';

import { white } from './colors';

interface PanelProps {
  children: ReactNode;
  width?: string;
}

const Panel: React.FC<PanelProps> = ({ width = 'w-fit', children }) => {
  return (
    <div className='bg-white m-4 justify-center shadow-lg'>
      {children}
    </div>
  );
};

export default Panel;
