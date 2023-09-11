import { useParams } from "react-router-dom";
import Navbar from "../../../layout/navbar/navbar";
import SidebarHotel from "../../../layout/sidebarHotel/SidebarHotel";
import "./ManagerHotel.css";
import { AiFillEdit } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryRoomByHotel } from "../../../redux/categoryRoom/categoryRoomThunk";

export default function ManagerHotel() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.categoryRoom);
  const [edit, setEdit] = useState(false)
  const [category, setCategory] = useState({
    id: '',
    name: ''
  })
  useEffect(() => {
    const flechData = async () => {
      await dispatch(
        getCategoryRoomByHotel({ id: id, page: 1, perPage: 10 })
      ).unwrap();
    };
    flechData();
  }, [id]);

  const editName = (categoryId, nameCategory) =>{
    setEdit(!edit)
        // setCategory((preV)=>{
        //     return{...preV, id: categoryId}
        // })
    setCategory({
        id: categoryId,
        name: nameCategory
    })
  }

  if (!loading) {
    return (
      <div>
        <Navbar />
        <div>
          <SidebarHotel />
        </div>
        <div className="room ">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="room_type">
            <div className="room_title">
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
            </div>
            <div className="room_content ">
              <div className="room_item animate-pulse">
                <div className="room_left">
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
                </div>
                <div className="room_right">
                  <button></button>
                  <br />
                  <button></button>
                </div>
              </div>
              <div className="room_item animate-pulse">
                <div className="room_left">
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
                </div>
                <div className="room_right">
                  <button></button>
                  <br />
                  <button></button>
                </div>
              </div>
              <div className="room_item animate-pulse">
                <div className="room_left">
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
                </div>
                <div className="room_right">
                  <button></button>
                  <br />
                  <button></button>
                </div>
              </div>
              <div className="room_item animate-pulse">
                <div className="room_left">
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
                </div>
                <div className="room_right">
                  <button></button>
                  <br />
                  <button></button>
                </div>
              </div>
              <div className="room_item animate-pulse">
                <div className="room_left">
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
                </div>
                <div className="room_right">
                  <button></button>
                  <br />
                  <button></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div>
        <SidebarHotel />
      </div>
      <div className="room">
        <h1>Rooms</h1>
        {data &&
          data?.map((item) => (
            <div className="room_type" key={item?.id}>
              <div className="room_title">
                {edit & category.id === item.id ? 
                <input
                className="bg-transparent border-none focus:outline-none text-lg w-20" 
                type="name"
                 value={category.name}  
                 onChange={(e) => setCategory({ ...category, name: e.target.value })} 
                 
                 />
                :
                <h2>{item?.name}</h2>
                }
                <AiFillEdit onClick={()=>{editName(item?.id, item?.name)}} />
              </div>
              {item?.rooms?.map((room) => (
                <div className="room_content" key={room.id}>
                  <div className="room_item">
                    <div className="room_left">
                      <h3>{room?.name}</h3>
                      <p>Còn cái nịt</p>
                    </div>
                    <div className="room_right">
                      <button>Update</button>
                      <br />
                      <button>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
