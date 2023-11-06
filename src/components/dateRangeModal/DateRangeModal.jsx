import React, { useState } from 'react';
import Modal from 'react-modal';
import { DateRange } from "react-date-range";


Modal.setAppElement('#root'); 

const customModalStyles = {
    content: {
      width: '30%', // Điều chỉnh chiều rộng của modal tại đây
      margin: 'auto', // Để căn giữa modal
      height: '500px',
      padding: '20px', // Điều chỉnh khoảng cách nội dung trong modal
    },
  };
  
const DateRangeModal = ({ isOpen, onClose, initialDate, onSave, ...props }) => {
  const [tempDate, setTempDate] = useState(initialDate);

  const handleDateChange = (item) => {
    setTempDate([item.selection]);
  };

  const handleCancel = () => {
    setTempDate(initialDate); // Khôi phục tempDate về giá trị ban đầu
    onClose(); // Đóng modal
  };

  const handleSubmit = () => {
    onSave(tempDate); // Gửi tempDate cho component cha để cập nhật date
    onClose(); // Đóng modal
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Date Range Modal"
      style={customModalStyles}
      className="fixed inset-0 flex items-center justify-center"
    >

      <div className="bg-white p-4 rounded shadow-md w-96"> {/* Vùng trắng */}
        <DateRange
          editableDateInputs={true}
          onChange={handleDateChange}
          moveRangeOnFirstSelection={false}
          ranges={tempDate}
          className="border rounded p-2 flex"
          minDate={new Date()}
          {...props}
        />
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1 mr-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded px-3 py-1"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
  
};

export default DateRangeModal;
