import React, { useEffect, useState } from 'react';
import './confirmationPaymentPage.css'; 
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../../redux/order/orderThunk';
import moment from 'moment';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { DateRange } from "react-date-range";
import CheckoutForm from './CheckoutForm';
import { createBill } from '../../redux/payment/paymentThunk';
const stripePromise = loadStripe("pk_test_51NegkOC0zJif8DInBG11CS3Q6BKxWNiCgJfLHv03zSjIUn6WRZd4qDTFP7Hvxf87F9Z8DabAl2hHxKMmp9gs7lq400m8CGZXCA");
/* eslint-disable jsx-a11y/anchor-is-valid */
const ConfirmationPaymentPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const {id} = useParams();
  const dispatch = useDispatch();
  const {data, loading} = useSelector((state) => state.order)
  console.log(data)
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  console.log(date)
  const handleDateChange = (item) => {
    setDate([item.selection]);
  };
  const [showDatePicker, setShowDatePicker] = useState(false);
  const formattedStartDate = moment(date[0].startDate).format("YYYY-MM-DD") + "T" + data?.checkIn + ":00.000Z";
  const formattedEndDate = moment(date[0].endDate).format("YYYY-MM-DD") + "T" + data?.checkOut + ":00.000Z";
  console.log()
  const [order, setOrder]= useState({
    id: '',
    checkIn: formattedStartDate,
    checkOut: formattedEndDate,
    price: '',
  })
  console.log(order)

  useEffect(()=>{
      dispatch(getOrderById(id));
      // await dispatch(createBill({amount: data?.price, currency: "usd"})).unwrap();
  },[id, dispatch])

  // console.log(clientSecret)
  useEffect(()=>{
    if(data && loading){
      dispatch(createBill({amount: data?.price, currency: "usd", orderId: data?.id}))
      .unwrap()
      .then((result)=>{ 
        setClientSecret(result.clientSecret)
      })
    }
  },[data])
  if(!loading){
    return <h1>loading</h1> 
  }

  const checkInMoment  = moment(data?.checkIn);
  const checkOutMoment  = moment(data?.checkOut);

  const checkInDay = checkInMoment.date();
  const checkOutDay = checkOutMoment.date();
  const checkOutMonth = checkOutMoment.format("M");

  // Tạo chuỗi kết quả
  const resultString = `Ngày ${checkInDay} - Ngày ${checkOutDay} tháng ${checkOutMonth}`;
 
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };


  return (
    <div >
      <div className='payment'>
        <div className='title'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
          </svg>
          <h1>Confirm and payment</h1>
        </div>
        <div className='item1'>
          <div>
            <h4>Giá thấp hơn.</h4>
            <p>Những ngày bạn chọn có giá thấp hơn $121 so với mức giá trung bình theo đêm trong 60 ngày qua.</p>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
            </svg>
          </div>

        </div>
        <div className='item2'>
          <h2>Your trip</h2>
          <div className='item'>
            <div>
              <h4>Day</h4>
              <p>{resultString}</p>
            </div>
            <div>
              <a onClick={()=>setShowDatePicker(!showDatePicker)}>Chỉnh sửa</a>
            </div>
          </div>
          {showDatePicker && (
              <DateRange
                editableDateInputs={true}
                onChange={handleDateChange}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="border rounded p-2 flex"
                minDate={new Date()}
              />
            )}
          <div className='item'>
            <div>
              <h4>Guest</h4>
              <p>1 khách</p>
            </div>
            <div>
              <a href="#">Chỉnh sửa</a>
            </div>
          </div>
        </div>
        <div className='item3'>
          <h2>Method Payment</h2>
          {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
          <input type="text" />
        </div>
        <div className='item4'>
          <h2>Bắt buộc cho chuyến đi của bạn</h2>
          <div className='item'>
            <div>
              <h4>Phone Number</h4>
              <p>Thêm và xác nhận số điện thoại của bạn để nhận thông tin cập nhật về chuyến đi.</p>
            </div>
            <div>
              <button>Add</button>
            </div>
          </div>
        </div>
        <div className='item5'>
          <h2>Cancellation Policy</h2>
          <p>Đặt phòng/ đặt chỗ này không được hoàn tiền. <a href="">Tìm hiểu thêm</a></p>
        </div>
        <div className='item6'>
          <h2>General standards</h2>
          <p>We ask all guests to keep in mind some simple rules to be a great guest.</p>
          <ul>
            <li className='list'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Tuân thủ nội quy nhà.</li>
            <li className='list'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Giữ gìn ngôi nhà như thể đó là nhà bạn.</li>
          </ul>
        </div>
        <div className='item7'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, saepe voluptates quo in explicabo ducimus natus quam, ut, necessitatibus quidem modi. Illo ab et iure ipsa doloribus tempora perspiciatis facere.</p>
          <button>Submit</button>
        </div>
      </div>
      <div className='payment_detail'>
        <div className='payment_item1'>
          <div>
            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/ed/95/07/limak-eurasia-luxury.jpg?w=700&h=-1&s=1" alt="" />
          </div>
          <div className='payment_title'>
            <h2>Toàn bộ căn hộ cho thuê</h2>
            <p>Căn hộ studio đáng yêu với tầm nhìn view rộng từ ban công.</p>
          </div>
        </div>
        <div className='payment_item2'>
          <h2>Chi tiết giá</h2>
          <div className='payment_item'>
              <div>
                <h3>$81,46 x 5 đêm</h3>
              </div>
              <div>
                <p>$407,29</p>
              </div>
          </div>
          <div className='payment_item'>
              <div>
                <h3>Phí vệ sinh</h3>
              </div>
              <div>
                <p>$54,45</p>
              </div>
          </div>
          <div className='payment_item'>
              <div>
                <h3>Phí dịch vụ</h3>
              </div>
              <div>
                <p>$65,19</p>
              </div>
          </div>
          <div className='border_payment'></div>
          <div className='payment_item'>
              <div>
                <h4>Tổng</h4>
              </div>
              <div>
                <p>$526,93</p>
              </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ConfirmationPaymentPage;
