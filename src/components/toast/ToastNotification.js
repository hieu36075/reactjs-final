import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { resetMessage } from '../../redux/modal/modalSlice';

const ToastNotification = () => {
  const dispatch = useDispatch();
  const { message, notificationType } = useSelector((state) => state.modal.notification);

  useEffect(() => {
    if (message && notificationType) {
      toast[notificationType](message, {
        onClose: () => dispatch(resetMessage())
      });
    }
  }, [dispatch, message, notificationType]);

  return <ToastContainer />;
};

export default ToastNotification;
