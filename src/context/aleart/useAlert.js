import { useContext } from 'react';
import AlertContext from './aleartContext';

const useAlert = () => useContext(AlertContext);

export default useAlert;