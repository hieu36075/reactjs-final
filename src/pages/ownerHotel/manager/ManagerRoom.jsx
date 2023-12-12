import { useParams } from "react-router-dom";
import { AiFillEdit, AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryRoomByHotel, updateCategoryRoom } from "../../../redux/categoryRoom/categoryRoomThunk";
import { deleteRoom } from "../../../redux/room/roomThunk";
import RoomModal from "./RoomModal";


export default function ManagerRoom() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.categoryRoom);
  console.log(data)
  const [edit, setEdit] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState({
    id: "",
    name: "",
  });
  const [openModal, setOpenModal] = useState(false)
  useEffect(() => {
    const flechData = async () => {
      await dispatch(
        getCategoryRoomByHotel({ id: id, page: 1, perPage: 10 })
      ).unwrap();
    };
    flechData();
  }, [id, dispatch]);

  const editName = (categoryId, nameCategory) => {
    setEdit(!edit);
    setCategory({
      id: categoryId,
      name: nameCategory,
    });
  };

  const handleDelete = (id) =>{
      dispatch(deleteRoom(id))
  }

  const handleClodeModal = () =>{
    setOpenModal(false)
  }

  const updateCategory = () =>{
    dispatch(updateCategoryRoom(category))
    setEdit(!edit)
  }
  if (loading) {
    return (
    <>
      <div className="w-full m-20 px-12 py-6">
        <div className="room ">
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5 "></div>
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
    </>
    );
  }

  return (
    <div>
      <div className="w-full m-20 px-12 py-6">
        <h1 className="text-4xl text-medium font-bold">Rooms</h1>
        {data &&
          data?.map((item) => (
            <div className="p-10" key={item?.id}>
              <div className="flex flex-row">
                {edit & (category.id === item.id) ? (
                  <div className="flex flex-row">
                  <input
                    className="bg-transparent border-none focus:outline-none text-lg w-20 mr-5"
                    type="name"
                    value={category.name}
                    onChange={(e) =>
                      setCategory({ ...category, name: e.target.value })
                    }
                    />
                  <AiOutlineCheck className=" text-xl " 
                  onClick={()=>{
                    updateCategory();
                  }}
                  />
                    </div>
                ) : (
                  <h2 className="text-2xl font-meidum mr-4  ">{item?.name}</h2>
                )}
                <AiFillEdit
                className=""
                size={24}
                  onClick={() => {
                    editName(item?.id, item?.name);
                  }}
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {item?.rooms?.map((room) => (
                  <div key={room.id}>
                    <div className="flex justify-center border rounded-lg border-black w-5/6 h-4/5 m-2.5">
                      <div className="w-auto m-10">
                        <h3>{room?.name}</h3>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="flex flex-col">
                        <button className="text-20 font-semibold my-2  bg-transparent underline"
                        onClick={()=>{
                          setRoomId(room.id)
                          setType('update')
                          setOpenModal(!openModal)
                        }}
                        >Update</button>
                        <button className="text-20 font-semibold my-2 bg-transparent underline" onClick={()=>{handleDelete(room.id)}}>Delete</button>
                          </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="h-5/6 w-20 mt-2"
                                  onClick={()=>{
                                    setOpenModal(!openModal)
                                    setType('add')
                                  }}
                >
                  <div 
                  className="border rounded-lg border-black flex items-center h-full w-full justify-center"

                  >
                    <AiOutlinePlus />
                  </div>
                </div>
                  <RoomModal 
                  isOpen={openModal} 
                  isClose={handleClodeModal}
                  hotelId={id}
                  categoryId={data.categoryId}
                  roomId={item.id}
                  id={roomId}
                  type={type}
                  />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
