import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

// import Button from "../Button";

const Modal = (props) => {
  const {
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    actionLabel,
    footer,
    disabled,
    secondaryAction,
    secondaryActionLabel,
    // Thêm các prop khác của Modal tại đây
  } = props;

  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-x-hidden overflow-y-auto bg-neutral-800/70">
      <div className="flex justify-center items-center h-full">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          <div
            className={`${
              showModal ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            } duration-300 h-full border-0 rounded-lg shadow-lg relative flex flex-col w-100 bg-white outline-none focus:outline-none transform transition-all ease-in-out`}
          >
            <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
              <button
                className="p-1 bg-black border-0 hover:opacity-70 transition absolute left-9"
                onClick={handleClose}
              >
                <IoMdClose className='text-white'size={18} />
              </button>
              <div className="text-lg font-semibold">{title}</div>
            </div>
            <div className="relative p-6 flex-auto min-h-[100px] h-auto max-h-[60vh] overflow-y-auto">{body}</div>
            <div className="flex flex-col gap-2 p-6">
              <div className="flex flex-row items-center gap-4 w-full">
                {secondaryAction && secondaryActionLabel && (
                  <button
                  className="relative
                  disabled:opacity-70
                  disabled:cursor-not-allowed
                  rounded-lg
                  hover:opacity-80
                  transition
                  w-full
                   bg-white
                  border-black
                  text-black
                  text-sm
                  py-3
                  font-light
                  border-[1px]"
                    disabled={disabled}
                    onClick={handleSecondaryAction}
                  >{secondaryActionLabel}</button>
                )}
                <button className=" relative
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    rounded-lg
                    hover:opacity-80
                    transition
                    w-full
                    bg-blue-500
                    border-blue-500
                    text-white
                    text-md
                    py-2
                    font-semibold
                    border-2"
                    onClick={handleSubmit}> {actionLabel} </button>
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
