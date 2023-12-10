import { Alert } from '@mui/material';
import useAlert from '../../context/aleart/useAlert';
import { useEffect, useState } from 'react';

const AlertPopup = () => {
  const { text, type } = useAlert();
const [show, setShow] = useState(true);

  const showHideClassName = show
    ? 'right-0'
    : '-right-full';


  if (!text) return null;
  if (text && type) {
    return (
<div
  className={`fixed top-10 transform transition-transform ease-in-out ${showHideClassName} z-50`}
  style={{ transitionProperty: 'right', transitionDuration: '2000ms' }}
>
        <Alert severity={type}>{text}</Alert>
      </div>
    );
  } else {
    return <></>;
  }
};

export default AlertPopup;