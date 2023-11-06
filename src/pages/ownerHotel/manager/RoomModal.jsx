import { useEffect, useState } from "react";
import PhotosUploader from "../../hotel/PhotosUploader"
import Modal from "../../register/Modal"
import { createRoom, getRoomById, updateRoom } from "../../../redux/room/roomThunk";
import { useDispatch } from "react-redux";
import { createImageRoom } from "../../../redux/imageRoom/imageRoomThunk";


export const RoomModal =({isOpen, isClose, ...props})=>{
    const {type,id, hotelId, roomId} = {...props}
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [temporaryPhotos, setTemporaryPhotos] = useState([]);
    const handleAddPhotos = (photos) => {
        setTemporaryPhotos(photos);
      };
      const [room, setRoom] = useState({
        name: "",
        description: "",
        price: 1,
        occupancy: 1,
        categoryRoomId: roomId,
        hotelId: hotelId,
      });


      useEffect(()=>{
        setTemporaryPhotos([])
        const flechData=async()=>{
          await dispatch(getRoomById(id)).unwrap()
          .then((res)=>{
            setRoom({
              name: res.name,
              description:res.description,
              price:res.price,
              occupancy:res.occupancy,
              categoryRoomId: res.categoryRoomId,
              hotelId: res.hotelId
            })
              for(let i=0; i<res.imageRoom.length;i++){
                setTemporaryPhotos((prevPhotos) => [...prevPhotos, res.imageRoom[i].url]);
              }
          })
        }
        if(type === 'update'){
          flechData()
        }
      },[type,id])
    const handleAddorUpdate = async () =>{
        try {
          setIsLoading(true)
          if(type === 'update'){
            const exitingRoom = {...room, id:id}
            const updateRom = await dispatch(updateRoom(exitingRoom)).unwrap()
            // await Promise.all(updateRom)
          }else{
            const newRoom = await dispatch(createRoom(room)).unwrap();
            const imagesPromise=[];
            for(let i=0; i<temporaryPhotos.length;i++){
                const newImage = await dispatch(createImageRoom({roomId: newRoom.id, url:temporaryPhotos[0]})).unwrap();
                imagesPromise.push(newImage)
            }
            await Promise.all([...imagesPromise], newRoom)
          }
            isClose()
        } catch (error) {
            console.log('error', error)
        }finally{
          setIsLoading(false)
        }
    }
    const bodyModal = (
        <div className="flex flex-col gap-4">
          <label>
            Name:
            <input type="text" value={room.name} onChange={(e) => setRoom({...room, name: e.target.value})}  />
          </label>
          <label>
            Description
            <textarea 
                value={room.description}
                onChange={(e)=> setRoom({...room, description: e.target.value})}
            />
          </label>
          <label>
            Photo
          </label>
          <div className="w-[100vh]">
          <PhotosUploader addedPhotos={temporaryPhotos} onChange={handleAddPhotos} />
          </div>
          <label>
            Price($)
            <input type="number" 
            value={room.price}
            onChange={(e) => setRoom({...room, price: parseInt(e.target.value)})}
             />
          </label>
          <label>
            Maximum occupancy:
            <input
              type="number"
              value={room.occupancy}
              onChange={(e)=> setRoom({...room, occupancy: e.target.value})}
            />
          </label>
        </div>
    )
    
    // const footerContent=(
    //     <div className="flex flex-col gap-4 mt-3">
    //         <button className='button' type="submit">Add Room</button>
    //     </div>
    // )
    return(
        <Modal
        disabled={isLoading}
        title="Add modal" 
        isOpen={isOpen}
        onClose={isClose}
        body={bodyModal}
        actionLabel="Add Room"
        onSubmit={handleAddorUpdate}
        // footer={footerContent}
        />
    )
}

export default RoomModal;