import React, { useState } from 'react';
import "./RoomForm.css"

const danhSachLoaiPhong = [
  { id: '1', name: 'Phòng đơn' },
  { id: '2', name: 'Phòng đôi' },
  { id: '3', name: 'Phòng gia đình' },
];

const RoomForm = () => {
  const [selectedCategory, setSelectedCategory] = useState('1'); // Mặc định chọn "Phòng đơn"
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [roomPrice, setRoomPrice] = useState(0);
  const [roomOccupancy, setRoomOccupancy] = useState(1);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleRoomSubmit = (e) => {
    e.preventDefault();
    const newRoom = {
      id: Date.now().toString(),
      name: roomName,
      description: roomDescription,
      price: roomPrice,
      occupancy: roomOccupancy,
      idCategory: selectedCategory,
    };
    setRooms((prevRooms) => [...prevRooms, newRoom]);
    setRoomName('');
    setRoomDescription('');
    setRoomPrice(0);
    setRoomOccupancy(1);
  };

  const handleSaveToServer = () => {
    console.log('Dữ liệu phòng sẽ được gửi lên server:', rooms);
    setRooms([]);
  };

  return (
    <div>
      <h2 className='room_left'>Chọn loại phòng:</h2>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        {danhSachLoaiPhong.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      {selectedCategory && (
        <div>
          <h3>Các phòng thuộc loại {danhSachLoaiPhong.find((category) => category.id === selectedCategory).name}:</h3>
          <ul>
            {rooms
              .filter((room) => room.idCategory === selectedCategory)
              .map((room) => (
                <li key={room.id}>
                  {room.name} - {room.description} - {room.price} - {room.occupancy}
                </li>
              ))}
          </ul>

          <h3>Tạo phòng mới:</h3>
          <form onSubmit={handleRoomSubmit}>
            <label>
              Tên phòng:
              <input type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
            </label>
            <br />
            <label>
              Mô tả:
              <textarea value={roomDescription} onChange={(e) => setRoomDescription(e.target.value)} />
            </label>
            <br />
            <label>
              Giá:
              <input type="number" value={roomPrice} onChange={(e) => setRoomPrice(e.target.value)} />
            </label>
            <br />
            <label>
              Số người ở tối đa:
              <input type="number" value={roomOccupancy} onChange={(e) => setRoomOccupancy(e.target.value)} />
            </label>
            <br />
            <button className='button' type="submit">Thêm Phòng</button>
          </form>
        </div>
      )}

      {rooms.length > 0 && (
        <div>
          <h3>Lưu dữ liệu lên Server:</h3>
          <button onClick={handleSaveToServer}>Lưu dữ liệu</button>
        </div>
      )}
    </div>
  );
};

export default RoomForm;
