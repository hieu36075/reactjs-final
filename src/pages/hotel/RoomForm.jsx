import React, { useState } from 'react';

const danhSachLoaiPhong = [
  { id: '1', name: 'Phòng đơn' },
  { id: '2', name: 'Phòng đôi' },
  { id: '3', name: 'Phòng gia đình' },
];

const RoomForm = () => {
    // eslint-disable-next-line no-unused-vars
    const [categories, setCategories] = useState(danhSachLoaiPhong);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [roomName, setRoomName] = useState('');
    const [roomDescription, setRoomDescription] = useState('');
    const [roomPrice, setRoomPrice] = useState(0);
    const [roomOccupancy, setRoomOccupancy] = useState(1);

  // Hàm xử lý khi người dùng chọn loại phòng
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Hàm xử lý khi người dùng thêm phòng mới
  const handleRoomSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory) {
      const newRoom = {
        id: Date.now().toString(),
        name: roomName,
        description: roomDescription,
        price: roomPrice,
        occupancy: roomOccupancy,
        idCategory: selectedCategory,
      };
      setRooms((prevRooms) => [...prevRooms, newRoom]);
      // Reset form fields
      setRoomName('');
      setRoomDescription('');
      setRoomPrice(0);
      setRoomOccupancy(1);
    }
  };

  // Hàm xử lý khi người dùng lưu dữ liệu lên server
  const handleSaveToServer = () => {
    // Gửi dữ liệu rooms lên server để lưu vào cơ sở dữ liệu
    console.log('Dữ liệu phòng sẽ được gửi lên server:', rooms);
    // Reset state của rooms sau khi lưu lên server
    setRooms([]);
  };

  return (
    <div>
      <h2>Chọn loại phòng:</h2>
      <select onChange={handleCategoryChange}>
        <option value="">Chọn loại phòng</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      {selectedCategory && (
        <div>
          <h3>Các phòng thuộc loại {categories.find((category) => category.id === selectedCategory).name}:</h3>
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
          {/* Form tạo phòng mới */}
          <form onSubmit={handleRoomSubmit}>
            {/* Các trường thông tin của form để tạo phòng mới */}
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
            <button type="submit">Thêm Phòng</button>
          </form>

          {rooms.length > 0 && (
            <div>
              <h3>Lưu dữ liệu lên Server:</h3>
              <button onClick={handleSaveToServer}>Lưu dữ liệu</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RoomForm;