import React, { useEffect, useState } from 'react';
import "./RoomForm.css"
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryRoom } from '../../redux/categoryRoom/categoryRoomThunk';
import { SelectCategoriesRoom } from '../../redux/categoryRoom/categoryRoomSelect';
import cuid from 'cuid';
import PhotosUploader from './PhotosUploader';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { createRoom } from '../../redux/room/roomThunk';
import { createImageRoom } from '../../redux/imageRoom/imageRoomThunk';
import { SelectAllHotel, SelectLoadingInHotel } from '../../redux/hotel/hotelSelect';


const RoomForm = ({ onPre }) => {
  const dispatch = useDispatch()
  const location = useLocation();
  const categoryRoomData = useSelector(SelectCategoriesRoom)
  const { loading } = useSelector(state => state.categoryRoom)
  const hotel = useSelector(SelectAllHotel)
  const hotelId = location?.state?.hotelId ? location.state.hotelId : hotel.id
  const categoryId = location?.state?.categoryId? location.state.categoryId : hotel.categoryId
  const navigate = useNavigate()
  const [room, setRoom] = useState({
    name: "",
    description: "",
    price: 1,
    occupancy: 1,
    categoryRoomId: "",
    hotelId: "",
    categoryId: ""
  });
  const [rooms, setRooms] = useState([])
  const defaultCategoryId = categoryRoomData && categoryRoomData.length > 0 ? categoryRoomData[0].id : '';
  const [selectedCategory, setSelectedCategory] = useState(defaultCategoryId);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [temporaryPhotos, setTemporaryPhotos] = useState([]);
  const [roomPhoto, setRoomPhoto] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  console.log(rooms)

  const defaultRoomValues = {
    name: "",
    description: "",
    price: 1,
    occupancy: 1,
    categoryRoomId: "",
    hotelId: "",
    categoryId: ""
  };
  useEffect(() => {
    dispatch(getCategoryRoom({ page: 1, perPage: 10 }))
  }, [dispatch])

  const handleAddRoom = (newRoom) => {
    setRooms((prevRooms) => [...prevRooms, newRoom]);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setRoom(defaultRoomValues); // Reset các trường giữ liệu input về giá trị mặc định
    setRoomPhoto([]);
    setTemporaryPhotos([]);



  };
  const handleAddPhotos = (photos) => {
    setTemporaryPhotos(photos);
  };

  const handleRoomSubmit = (e) => {
    e.preventDefault();
    const existingRoom = rooms.find((existingRoom) => existingRoom.id === room.id);
    if (existingRoom) {
      const updatedRooms = rooms.map((r) => (r.id === room.id ? { ...room } : r));
      setRooms(updatedRooms);
      const updatedRoomPhotos = roomPhoto.map((photo) =>
        photo.roomId === room.id ? { ...photo, url: temporaryPhotos } : photo
      );
      setRoomPhoto(updatedRoomPhotos);
    } else {
      const newRoom = {
        id: cuid(),
        name: room.name,
        description: room.description,
        price: parseInt(room.price),
        occupancy: parseInt(room.occupancy),
        categoryRoomId: selectedCategory,
        hotelId: hotelId,
        categoryId: categoryId
      };
      handleAddRoom(newRoom);
      const photosWithIdAndUrl = temporaryPhotos.map((photo) => {
        return {
          roomId: newRoom.id,
          url: photo
        };
      });
      setRoomPhoto(photosWithIdAndUrl);
      setTemporaryPhotos([]);
      setRoom(defaultRoomValues);
    }
  };
  const handleRoomSelectChange = (e) => {
    const selectedRoomId = e.target.value;
    setSelectedRoom(selectedRoomId);

    if (selectedRoomId) {
      const selectedRoomData = rooms.find((room) => room.id === selectedRoomId);
      setRoom(selectedRoomData);
      const selectedRoomPhotos = roomPhoto.find((room) => room.roomId === selectedRoomId)?.url;
      const photosArray = selectedRoomPhotos ? [selectedRoomPhotos] : [];
      setTemporaryPhotos(photosArray);
    } else {
      setRoom(defaultRoomValues);
      setRoomPhoto([]);
    }
  };
  const handleSubmit = async () => {
    try {
      setIsCreating(true);
      const roomPromises = [];
      for (let i = 0; i < rooms.length; i++) {
        const createRoomResponse = await dispatch(createRoom(rooms[i])).unwrap();
        roomPromises.push(createRoomResponse);
      }

      const imagePromises = [];
      for (let i = 0; i < roomPhoto.length; i++) {
        const createImageResponse = await dispatch(createImageRoom(roomPhoto[i])).unwrap();
        imagePromises.push(createImageResponse);
      }


      await Promise.all([...roomPromises, ...imagePromises]);
      navigate('/')
      console.log("b");
      console.log("Dữ liệu phòng và ảnh đã được gửi lên server thành công!");
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu lên server:", error);
    } finally {
      setIsCreating(false);
    }
  };

  if(loading ){
    return <h1>loading</h1>
  }
  return (
    <div>
      <div className='title'>
        <div className='title_item'>
          <div>
            <h2>Choose Category Room:</h2>
          </div>
          <div>
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">Choose Category Room</option>
              {categoryRoomData?.map((category) => (

                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='title_item'>
          <div>
            <h2>Các phòng thuộc loại {categoryRoomData.find((category) => category.id === selectedCategory)?.name}:</h2>
          </div>
          <div>
            <select value={selectedRoom} onChange={handleRoomSelectChange}>
              <option value="">Choose Room</option>
              {rooms.map((room) => (
                room.categoryRoomId === selectedCategory && (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                )
              ))}
            </select>
          </div>
        </div>
      </div>


      <div>
        <h3>New Room:</h3>
        <form onSubmit={handleRoomSubmit}>
          <label>
            Name:
            <input type="text" value={room.name} onChange={(e) => setRoom({ ...room, name: e.target.value })} />
          </label>
          <br />
          <label>
            Description
            <textarea value={room.description} onChange={(e) => setRoom({ ...room, description: e.target.value })} />
          </label>
          <br />
          <label>
            Photo
          </label>
          <PhotosUploader addedPhotos={temporaryPhotos} onChange={handleAddPhotos} />
          <br />
          <label>
            Price
            <input type="number" value={room.price} onChange={(e) => setRoom({ ...room, price: e.target.value })} />
          </label>
          <br />
          <label>
            Maximum occupancy:
            <input type="number" value={room.occupancy} onChange={(e) => setRoom({ ...room, occupancy: e.target.value })} />
          </label>
          <br />
          <button className='button' type="submit">Add Room</button>
        </form>
        <div className='mt-4 gap-3 flex justify-center items-center'>
          <button onClick={onPre} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Previous</button>
          {isCreating ?
            <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg w-full text-smpx-3 py-2 text-lg text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus:ring-blue-800 inline-flex items-center flex items-center justify-center">
              <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
              </svg>
              Loading...
            </button>
            : <button onClick={handleSubmit} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>
              Create
            </button>}
        </div>


      </div>
    </div>
  );
};

export default RoomForm;