import { FaBed} from 'react-icons/fa';
import { BsFillPeopleFill, BsFillCalendarCheckFill, BsFillClockFill } from 'react-icons/bs';
import { MdOutlineFreeBreakfast } from 'react-icons/md';
import { BiSolidHelpCircle, BiWifi2 } from 'react-icons/bi';
import { getCategoryRoomByHotel } from "../../redux/categoryRoom/categoryRoomThunk";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
export default function CategoryRoomItem({hotel, onSubmit}){

    const dispatch = useDispatch();
    const {id} = hotel
    const {data, loading} = useSelector((state)=> state.categoryRoom)

    useEffect(() => {
        if(id){
            dispatch(getCategoryRoomByHotel({id:id, page:1, perPage:5}));
        }
      }, [id, dispatch]);

    if(loading){
        return <h1>loading</h1>
    }

    return(
        <>
        {data?.length > 0 && data?.map((item)=>(
                <div className="product" key={item.id}>
                <h1>{item.name}</h1>
                {item.rooms?.length>0 && item?.rooms?.map((room)=>(
                <div className="product_item" key={room?.id}>
                <div className="product_left">
                    <img src="https://ik.imagekit.io/tvlk/generic-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/67841452-b8eaa284b3e0d55d645958c3569be662.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-550" alt="" />
                </div>
                <div className="product_right">
                    <div className="product_title">
                    <div>
                        <h2>{room?.name}</h2>
                    </div>
                    <div>
                        <p>Miễn phí huỷ phòng trước {hotel?.checkOutTime}h</p>
                    </div>
                    </div>
                    <div className="product_quantity">
                    <div className="item_service">
                        <FaBed />
                        <span>{item?.numberOrBeds} bed big</span>
                    </div>
                    <div className="item_service item_service2">
                        <BsFillPeopleFill />
                        <span>{room?.occupancy} khách</span>
                    </div>
                    </div>
                    <div className="product_service">
                    <div>
                        <ul >
                        <li className="item_service "><MdOutlineFreeBreakfast /> <span className="decoration">Không gồm bữa sáng</span></li>
                        <li className="item_service service"><BiWifi2 /> <span className="service">Wifi miễn phí</span></li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                        <li className="item_service service"><BsFillClockFill /><span className="service">Miễn phí huỷ phòng</span></li>
                        <li className="item_service service"><BsFillCalendarCheckFill /> <span className="service">Có thể đổi lịch</span></li>
                        <li className="item_service help"><BiSolidHelpCircle /> <span className="help">Xem chính sách huỷ phòng</span></li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                        <li className="decoration">{room?.price}$</li>
                        <li className="service_total">{room?.price}$</li>
                        <li>/ Phòng / đêm</li>
                        <li className="help">giá cuối cùng</li>
                        </ul>
                    </div>
                    </div>
                    <button className="product_button" onClick={(e)=> onSubmit(e,room?.price, room.id)}>Đặt ngay</button>
                </div>
                </div>
                ))}
            </div>
        ))}
            </>
    )
}