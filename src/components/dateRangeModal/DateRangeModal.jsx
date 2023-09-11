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
  
const DateRangeModal = ({ isOpen, onClose, initialDate, onSave }) => {
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
      style={customModalStyles} //
    >
    <div className="modal-header">
      <h2>Date Range Selection</h2>
    </div>
      <DateRange
        editableDateInputs={true}
        onChange={handleDateChange}
        moveRangeOnFirstSelection={false}
        ranges={tempDate}
        className="border rounded p-2 flex"
        minDate={new Date()}
      />
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleSubmit}>Submit</button>
    </Modal>
  );
};

export default DateRangeModal;
