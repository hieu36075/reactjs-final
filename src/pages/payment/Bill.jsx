import { useParams } from "react-router-dom";
import Navbar from "../../layout/navbar/Navbar";
import "./Bill.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../redux/order/orderThunk";
import moment from "moment";
import { getProfileById } from "../../redux/profile/profileThunk";
import { getHotelByRoom } from "../../redux/hotel/hotelThunks";
import jwtDecode from "jwt-decode";
export default function BillPage() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {details, loading} = useSelector((state) => state.order)
    const user = useSelector((state) => state.profile.data)
    const hotel = useSelector((state)=> state.hotel.details)
    const token = jwtDecode(localStorage.getItem('token'))
  
    useEffect(()=>{
       dispatch(getOrderById(id)).unwrap()
       .then((res)=>{
           dispatch(getHotelByRoom({hotelId: res.hotelId, roomId: res?.orderdetails[0]?.roomId}))
           dispatch(getProfileById(res.userId))
        //    if(res.status !== 'DONE'){
        //     navigate('/')
        //     }
       })
       
    },[id, dispatch])

    if(loading){
        return <h1>Loading</h1>
    }
    const startDate = moment(details.checkIn);
    const endDate = moment(details.checkOut);
    const diffInMilliseconds = Math.abs(endDate - startDate);
    const numberOfDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));

    const vatRate = 0.1;
    const serviceRate = 0.05;
    const roomPrice = hotel?.rooms?.reduce((total, item) => {
        return total + item.price * numberOfDays;
      }, 0);

    const vatAmount = roomPrice * vatRate;
    const serviceAmount = roomPrice * serviceRate;
    const totalservice = vatAmount + serviceAmount;


    return (
        <>
            <Navbar />
            <div className="bill">
                <div className="bill_left">
                    <h1>Bill</h1>
                    <div className="info_product">
                        <h2>Your Bill</h2>
                        <div className="info_product_item">
                            <h3>OrderId</h3>
                            <p># {details.id}</p>
                        </div>
                        <div className="info_product_item">
                            <h3>Name</h3>
                            <p>{user.fullName}</p>
                        </div>
                        <div className="info_product_item">
                            <h3>Phone number</h3>
                            <p>{user.phoneNumber}</p>
                        </div>
                        <div className="info_product_item">
                            <h3>Email</h3>
                            <p>{token.email}</p>
                        </div>
                        <div className="info_product_item">
                            <h3>Check In</h3>
                            <p>{details.checkIn}</p>
                        </div>
                        <div className="info_product_item">
                            <h3>Check Out</h3>
                            <p>{details.checkOut}</p>
                        </div>
                        
                    </div>
                    <div className="info_bill">
                        <h2>Thông tin giao dịch</h2>
                        <div className="info_bill_item">
                            <h4>Phương thức thanh toán</h4>
                            <p>Thẻ ATM nội địa</p>
                        </div>
                        <div className="info_bill_item">
                            <h4>Trạng thái</h4>
                            <p>Thanh toán thành công</p>
                        </div>
                    </div>
                    <div className="info_policy">
                        <h2>Chính sách huỷ đơn hàng & hoàn tiền</h2>
                        <p>Time cancel: <b>Trước {moment(details.checkIn).format('YYYY-MM-DD')}</b> </p>
                        <button>Cancel your order</button>
                    </div>

                </div>

                <div className="bill_right ">
                    <div className="mb-6 w-full h-80 object-cover">
                        <img
                            src={hotel?.images?.[0]?.url || ''}
                            alt=""
                            className="w-full h-full "
                        />
                    </div>
                    <div className="bill_title">
                        <h2>{hotel.name}</h2>
                        <p>{hotel?.rooms?.[0]?.description || ''}</p>
                    </div>
                    <div className="bill_detail">
                        <h3> Chi tiết giá</h3>
                        <div className="bill_detail_item">
                            <h4>{hotel?.rooms?.[0]?.price || ''} x {numberOfDays} night</h4>
                            <p>{roomPrice}</p>
                        </div>
                        <div className="bill_detail_item">
                            <h4>Service (10%)</h4>
                            <p>{totalservice}$</p>
                        </div>
                    </div>
                    <div className="bill_total">
                        <h4>Total</h4>
                        <p>{details.price}$</p>
                    </div>
                    <button className="bill_success">Payment success</button>
                </div>
            </div>
        </>
    )
}