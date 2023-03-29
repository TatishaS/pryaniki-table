import React from 'react';
import { ReactComponent as SpinnerIcon } from '../assets/images/icon-spinner.svg';

const Spinner = () => {
  return (
    <div className="spinner">
      <SpinnerIcon className="spinner__icon" width="48" height="48" />
    </div>
  );
};

export default Spinner;
