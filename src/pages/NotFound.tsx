import React from 'react';
import Header from '../components/Header';

type Props = {};

const NotFound = (props: Props) => {
  return (
    <>
      <Header />
      <div>
        <h1>Ничего не найдено</h1>
      </div>
    </>
  );
};

export default NotFound;
