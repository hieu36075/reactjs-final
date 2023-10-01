import React, { useEffect, useState } from "react";
import "./confirmationPaymentPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { confirmOrder, getOrderById, updateOrder } from "../../redux/order/orderThunk";
import moment from "moment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import {
  createBill,
  updateAmountPayment,
} from "../../redux/payment/paymentThunk";
import DateRangeModal from "../../components/dateRangeModal/DateRangeModal";
import Navbar from "../../layout/navbar/navbar";

const stripePromise = loadStripe(
  "pk_test_51NegkOC0zJif8DInBG11CS3Q6BKxWNiCgJfLHv03zSjIUn6WRZd4qDTFP7Hvxf87F9Z8DabAl2hHxKMmp9gs7lq400m8CGZXCA"
);


const ConfirmationPaymentPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState();
  // console.log(data)
  const { loading } = useSelector((state) => state.order);
  const [elements, setElements] = useState(null);
  const [stripe, setStripe] = useState(null);
  const [onChange, setOnChange] = useState(false);
  const navigate = useNavigate();
  const handleStripeElementsSet = (stripe, elements) => {
    setStripe(stripe);
    setElements(elements);
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getOrderById(id))
        .unwrap()
        .then((res) => {
          setData(res);
          const newDate = [
            {
              startDate: new Date(res.checkIn),
              endDate: new Date(res.checkOut),
              key: "selection",
            },
          ];
          setDate(newDate);
        });
    };
    fetchData();
  }, [id, dispatch]);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      key: "selection",
    },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const formattedStartDate = moment(date[0].startDate).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
  const formattedEndDate = moment(date[0].endDate).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
  
  const startDate = moment(date[0].startDate);
  const endDate = moment(date[0].endDate);
  // const numberOfDays = Math.max(endDate.diff(startDate, "days"), 1);
  const diffInMilliseconds = Math.abs(endDate - startDate);
  const numberOfDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
  console.log(numberOfDays)


  const vatRate = 0.1;
  const serviceRate = 0.05;
  const roomPrice = data?.orderdetails?.reduce((total, item) => {
    return total + item?.room?.price * numberOfDays;
  }, 0);

  const vatAmount = roomPrice * vatRate;
  const serviceAmount = roomPrice * serviceRate;
  const totalservice = vatAmount + serviceAmount;
  const totalPrice = roomPrice + totalservice;

  // const [order, setOrder]= useState({
  //   checkIn: formattedStartDate,
  //   checkOut: formattedEndDate,
  //   price: '',
  // })



  useEffect(() => {
    if (data?.status == "IN_PROGRESS" && !loading) {
      const convertedPrice = data?.price * 100;
      dispatch(
        createBill({
          amount: convertedPrice,
          currency: "usd",
          orderId: data?.id,
        })
      )
        .unwrap()
        .then((result) => {
          setClientSecret(result.clientSecret);
        });
    }
  }, [data, loading]);
  
  const billId = clientSecret.split('_secret_')[0];
  
  useEffect(() => {
    const updateData = async () => {
      await dispatch(
        updateOrder({
          id: data?.id,
          checkIn: formattedStartDate,
          checkOut: formattedEndDate,
          price: totalPrice,
        })
      )
        .unwrap()
        .then((res) => {
          dispatch(
            updateAmountPayment({ id: billId, amount: res.price *100 })
          );
        });
      setOnChange(false);
    };
    if (onChange) {
      updateData();
    }
  }, [onChange]);
  if (loading || !data) {
    return <h1>loading</h1>;
  }
  const handleGoBack = () => {
    navigate(-1); // Quay lại trang trước đó
  };
  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const closeDatePicker = () => {
    setShowDatePicker(false);
  };

  const handleDateSave = (newDate) => {
    setDate(newDate); // Cập nhật date với giá trị mới từ modal
    setOnChange(true);
  };
  const checkInDay = startDate.date();
  const checkOutDay = endDate.date();
  const checkOutMonth = endDate.format("MMM");

  const resultString = `${checkOutMonth}  ${checkInDay} - ${checkOutDay} `;

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  const handleSubmmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentIntent  } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000",
      },
      redirect: 'if_required'  // Thay URL_CHUYEN_HUONG_SAU_THANH_TOAN bằng URL bạn muốn chuyển hướng
    });
    
    if(error){
      if (error.type === "card_error" || error.type === "validation_error") {
        // setMessage(error.message);
      } else {
        // setMessage("An unexpected error occurred.");
      }
    }else{
      dispatch(confirmOrder(id))
      navigate(`/account/bill/${id}`)
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="payment">
        <div className="title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-8"
            onClick={handleGoBack}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
          <h1>Confirm and payment</h1>
        </div>
        <div className="item1">
          <div>
            <h4>Giá thấp hơn.</h4>
            <p>
              Những ngày bạn chọn có giá thấp hơn $121 so với mức giá trung bình
              theo đêm trong 60 ngày qua.
            </p>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6h.008v.008H6V6z"
              />
            </svg>
          </div>
        </div>
        <div className="item2">
          <h2>Your trip</h2>
          <div className="item">
            <div>
              <h4>Dates</h4>
              <p>{resultString}</p>
            </div>
            <div>
              <a onClick={() => setShowDatePicker(!showDatePicker)}>Edit</a>
            </div>
          </div>
          <DateRangeModal
            isOpen={showDatePicker}
            onClose={closeDatePicker}
            initialDate={date}
            onSave={handleDateSave}
          />
          <div className="item">
            <div>
              <h4>Guest</h4>
              <p>1 guest</p>
            </div>
            <div>
              <a href="#">Edit</a>
            </div>
          </div>
        </div>
        <div className="item3">
          <h2>Method Payment</h2>
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm onStripeElementsSet={handleStripeElementsSet} />
            </Elements>
          )}
          <input type="text" />
        </div>
        <div className="item4">
          <h2>Required for your trip</h2>
          <div className="item">
            <div>
              <h4>Phone Number</h4>
              <p>Add and confirm your phone number to get trip updates.</p>
            </div>
            <div>
              <button>Add</button>
            </div>
          </div>
        </div>
        <div className="item5">
          <h2>Cancellation Policy</h2>
          <p>
            Đặt phòng/ đặt chỗ này không được hoàn tiền.{" "}
            <a href="">Tìm hiểu thêm</a>
          </p>
        </div>
        <div className="item6">
          <h2>General standards</h2>
          <p>
            We ask all guests to keep in mind some simple rules to be a great
            guest.
          </p>
          <ul>
            <li className="list">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              Follow the house rules.
            </li>
            <li className="list">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              Treat your Host’s home like your own.
            </li>
          </ul>
        </div>
        <div className="item7">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
            saepe voluptates quo in explicabo ducimus natus quam, ut,
            necessitatibus quidem modi. Illo ab et iure ipsa doloribus tempora
            perspiciatis facere.
          </p>
          <button onClick={handleSubmmit}>Submit</button>
        </div>
      </div>
      <div className="payment_detail">
        <div className="payment_item1">
          <div>
            <img
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/ed/95/07/limak-eurasia-luxury.jpg?w=700&h=-1&s=1"
              alt=""
            />
          </div>
          <div className="payment_title">
            <h2>Toàn bộ căn hộ cho thuê</h2>
            <p>Căn hộ studio đáng yêu với tầm nhìn view rộng từ ban công.</p>
          </div>
        </div>
        <div className="payment_item2">
          <h2>Chi tiết giá</h2>
          <div className="payment_item">
            <div>
              <h3>
                ${data?.orderdetails[0]?.room?.price} x {numberOfDays} đêm
              </h3>
            </div>
            <div>
              <p>${roomPrice}</p>
            </div>
          </div>
          <div className="payment_item">
            <div>
              <h3>Service (10%)</h3>
            </div>
            <div>
              <p>${totalservice.toFixed(2)}</p>
            </div>
          </div>
          <div className="border_payment"></div>
          <div className="payment_item">
            <div>
              <h4>Tổng</h4>
            </div>
            <div>
              <p>${totalPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPaymentPage;
