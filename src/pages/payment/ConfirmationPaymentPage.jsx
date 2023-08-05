import React from 'react';
import './confirmationPaymentPage.css'; // Import the Tailwind CSS file
import RoomItem from './RoomItem';
const ConfirmationPaymentPage = () => {
     const bookingInfo = {
    checkInDate: '2023-08-15',
    checkOutDate: '2023-08-20',
    totalNights: 5,
    totalPrice: 250,
    rooms: [
      {
        id: 1,
        name: 'Deluxe Room',
        price: 50,
        imageUrl: 'https://placeimg.com/200/200/arch',
      },
      {
        id: 2,
        name: 'Suite Room',
        price: 100,
        imageUrl: 'https://placeimg.com/200/200/nature',
      },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="bg-white shadow-md mx-auto rounded-md p-8 w-96">
        <h2 className="text-3xl font-bold mb-4">Xác nhận đặt phòng</h2>

        {/* Thông tin đặt phòng */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Thông tin đặt phòng</h3>
          <div className="flex flex-col text-gray-600">
            <div className="mb-2">
              <span className="font-bold">Ngày nhận phòng:</span> {bookingInfo.checkInDate}
            </div>
            <div className="mb-2">
              <span className="font-bold">Ngày trả phòng:</span> {bookingInfo.checkOutDate}
            </div>
            <div className="mb-2">
              <span className="font-bold">Tổng số đêm:</span> {bookingInfo.totalNights}
            </div>
            <div className="mb-2">
              <span className="font-bold">Tổng giá tiền:</span> ${bookingInfo.totalPrice}
            </div>
          </div>
        </div>

        {/* Danh sách các phòng đã chọn */}
        <div>
          <h3 className="text-xl font-bold mb-4">Các phòng đã chọn</h3>
          {bookingInfo.rooms.map((room) => (
            <RoomItem
              key={room.id}
              name={room.name}
              price={room.price}
              imageUrl={room.imageUrl}
            />
          ))}
        </div>

        {/* Nút hoàn tất */}
        <div className="mt-8">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md">
            Hoàn tất
          </button>
        </div>
      </div>
    </div>
  );
  };

export default ConfirmationPaymentPage;
