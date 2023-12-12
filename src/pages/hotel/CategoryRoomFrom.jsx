import cuid from "cuid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectAllHotel } from "../../redux/hotel/hotelSelect";
import { createCategoryRoom } from "../../redux/categoryRoom/categoryRoomThunk";
import { useLocation } from "react-router-dom";

const CategoryRoomForm = ({onNext}) =>{
    const dispatch = useDispatch();
    const hotel = useSelector((state) => state.hotel.newHotel)
    const location = useLocation();
    const hotelId = location?.state?.hotelId ? location.state.hotelId : hotel.id
  console.log(hotel)
    const [categoryRoom, setCategoryRoom] = useState({
        name: '',
        hotelId: hotelId,
        numberOrBeds: 1
    });
    const defaultValue ={
        name: '',
        hotelId: hotelId,
        numberOrBeds: 1
    }
    const [categoryRooms, setCategoryRooms] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(""); 

    const handleAddRoom = (newRoom) => {
        setCategoryRooms((prevRooms) => [...prevRooms, newRoom]);
      };
    const handleSubmit=(e) =>{
        e.preventDefault();

        if (selectedCategory) {
            const updatedCategoryRooms = categoryRooms.map((room) =>
              room.id === selectedCategory
                ? {
                    ...room,
                    name: categoryRoom.name,
                    hotelId: hotelId,
                    numberOrBeds: parseInt(categoryRoom.numberOrBeds),
                  }
                : room
            );
        
            setCategoryRooms(updatedCategoryRooms);
          } else {
 
            const newCategoryRoom = {
              id: cuid(),
              name: categoryRoom.name,
              hotelId: hotelId,
              numberOrBeds: parseInt(categoryRoom.numberOrBeds),
            };
            handleAddRoom(newCategoryRoom);
          }

        setCategoryRoom(defaultValue);
        setSelectedCategory("");
    };

    const handleRoomSelectChange = (e) => {
        const id = e.target.value
        setSelectedCategory(id)
        if(id){
            const selectedData = categoryRooms.find((data) => data.id === id );
            setCategoryRoom(selectedData);
        }else{
            setCategoryRoom(defaultValue)
        }

      };

    const handleCreateSubmit =async ()=>{
        try {
            const createPromises = categoryRooms.map(async (categoryRoom) => {
                return dispatch(createCategoryRoom(categoryRoom)).unwrap();
              });
              await Promise.all(createPromises);
              onNext();
        } catch (error) {
            console.error("Error", error)
        }
    }
    return(
        <div>
      <div className='title'>
        <div className='title_item'>
          <div>
            <h2>Các loại phòng:</h2>
          </div>
          <div>
            <select value={selectedCategory} onChange={handleRoomSelectChange}>
              <option value="">Choose Category Room</option>
              {categoryRooms?.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
            </select>
          </div>
        </div>
      </div>


      <div>
        <h3>New Category Room:</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={categoryRoom.name} onChange={(e) => setCategoryRoom({ ...categoryRoom, name: e.target.value })} />
          </label>
          <label>
            Number bed room:
            <input type="number" value={categoryRoom.numberOrBeds} onChange={(e) => setCategoryRoom({ ...categoryRoom, numberOrBeds: e.target.value })} />
          </label>
          <br />
          <button className='button' type="submit">Add Category</button>
        </form>
        {/* <div className='mt-4 gap-3 flex justify-center items-center'>
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
        </div> */}
            <div className='mt-4 gap-3 flex justify-center items-center'>
              {/* <button onClick={pre} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Previous</button> */}
              <button onClick={handleCreateSubmit} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Next</button>
            </div>

      </div>
    </div>
    );
}

export default CategoryRoomForm;