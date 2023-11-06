import { useEffect, useRef, useState } from "react";
import Navbar from "../../layout/navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import "./detailsPage.css";
import { useDispatch, useSelector } from "react-redux";
import { getHotelById } from "../../redux/hotel/hotelThunks";
import "react-datepicker/dist/react-datepicker.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import ImagesDatails from "./ImagesDatails";
import AmenityIcon from "../../components/amenity/AmenityIcon";
import moment from "moment";
import { createOrder, updateOrder } from "../../redux/order/orderThunk";
import CategoryRoomItem from "../../components/categoryRoomItem/CategoryRoomItem";
import { getUsersById } from "../../redux/user/userThunks";
import Map from "../../components/location/Map";
import { isWithinInterval } from "date-fns";
import Comment from "../../components/comment/Comment";
import { isDateBlockedISO } from "../../components/dateRangeModal/DateAction";
import { checkDateByRoom } from "../../redux/orderDetail/orderDetailThunk";

export default function DetailsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { details, loading } = useSelector((state) => state.hotel);
  const checkDate = useSelector((state) => state.orderDetail.data)
  const user = useSelector((state) => state.user.details)
  const { isLogin } = useSelector((state) => state.auth)
  const roomsTest = useSelector((state) => state.hotel.details.rooms)
  const [center, setCenter] = useState({
    lat: '',
    lng: '',
    address: "My Hotel",
  });
  useEffect(() => {
    dispatch(getHotelById(id)).unwrap()
      .then((res) => {
        dispatch(getUsersById(res.userId));
        setCenter(prevHotel => ({
          ...prevHotel,
          lat: res.latitude,
          lng: res.longitude
        }));
      });
  }, [id, dispatch]);

  useEffect(()=>{
    if(details?.rooms?.[0]?.id){
      dispatch(checkDateByRoom(details?.rooms?.[0]?.id))
    }
  },[details?.rooms?.[0]?.id])

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      key: "selection",
    },
  ]);

  const datePickerRef = useRef(null);
  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  if (loading && details) {
    return <div>Loading...</div>;
  }


  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleDateChange = (item) => {
    setDate([item.selection]);
  };

  const formattedStartDate = moment(date[0].startDate).format("YYYY-MM-DD") + "T" + details.checkInTime + ":00.000Z";
  const formattedEndDate = moment(date[0].endDate).format("YYYY-MM-DD") + "T" + details.checkOutTime + ":00.000Z";
  const startDate = moment(date[0].startDate);
  const endDate = moment(date[0].endDate);
  const numberOfDays = Math.max(endDate.diff(startDate, "days"), 1);

  const vatRate = 0.1; 
  const serviceRate = 0.05;
  const roomPrice = details?.rooms?.reduce((total, item) => {
    return total + item.price * numberOfDays;
  }, 0);

  const vatAmount = roomPrice * vatRate;
  const serviceAmount = roomPrice * serviceRate;
  const totalservice = vatAmount + serviceAmount
  const totalPrice = roomPrice + totalservice

  const isOrderChanged = (existingOrder, updatedOrder) => {
    const checkInChanged = existingOrder.checkIn !== updatedOrder.checkIn;
    const checkOutChanged = existingOrder.checkOut !== updatedOrder.checkOut;
    const priceChanged = existingOrder.price !== updatedOrder.price;
    return checkInChanged || checkOutChanged || priceChanged
  }

  const handleBooking = async (e, price, roomId) => {
    if (!isLogin) {
      return console.log('Please login')
    }
    e.preventDefault();
    const priceOrder = price ? price + totalservice : totalPrice
    const roomIdOrder = roomId ? roomId : roomsTest[0].id

    try {
      const order = await dispatch(createOrder({
        checkIn: formattedStartDate,
        checkOut: formattedEndDate,
        price: priceOrder,
        roomId: roomIdOrder,
        hotelId: details?.id
      })).unwrap();
      if (order) {
        const newOrder = {
          ...order,
          checkIn: formattedStartDate,
          checkOut: formattedEndDate,
          price: priceOrder
        }
        if (isOrderChanged(order, newOrder)) {
          await dispatch(updateOrder({
            id: order.id,
            checkIn: formattedStartDate,
            checkOut: formattedEndDate,
            price: priceOrder,
            hotelId: details?.id
          })).unwrap();
        }
      }
      navigate(`/hotels/stays/${order.id}`)
    } catch (error) {
      console.error('Đã xảy ra lỗi:', error);
    }
  }


  const handleMesage = (id) => {
    navigate(`/account/message`, { state: { userId: id } })
  }

  const blockedDateRanges = checkDate.map((item) => ({
    startDate: item.oder.checkIn,
    endDate: item.oder.checkOut
  }));


  return (
    <div>
      <Navbar />
      {/* <Header type="list" /> */}
      <div className="mt-4 bg-white-100 -mx-8 px-48 py-8 ">
        <h1 className="text-4xl font-bold font-roboto">{details.name}</h1>
        <h2 className="text-xl font-roboto">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          {details?.address},{details?.city?.name},{details?.country?.name}
        </h2>
        <ImagesDatails images={details} />

        <div className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-2 test" >
          <div>
            <div className="my-4 break-all">
              <h2 className="font-semibold text-2xl break-words">
                Descriptions
              </h2>
              {details.extraInfo}
            </div>
            <div className="w-full h-px bg-gray-300 my-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              {details?.amenities?.map((amenity) => (
                <div
                  key={amenity?.id}
                  className="bg-gray-200 p-4 rounded-xl text-center h-20 md:h-62 mx-2 flex items-center justify-center "
                >
                  <div className="text-2xl mb-2">
                    <AmenityIcon amenityName={amenity.name} />
                  </div>
                  <p>{amenity.name}</p>
                </div>
              ))}
            </div>
            <div className="w-full h-px bg-gray-300 my-4"></div>
            <div className="my-4">
              <h2 className="font-semibold text-2xl break-words">
                Room Details
              </h2>
              <p>Number of beds: 2</p>
            </div>

            <div className="w-full h-px bg-gray-300 my-4"></div>

            <div className="my-4">
              <h2 className="font-semibold text-2xl break-words">
                Infomation
              </h2>
              <div className="flex flex-col items-center">
                <img className="rounded-full w-32 h-32" src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="" />
                <h1 className="mb-4" >{user.email}</h1>
                <h1 className="mb-4">joined from {new Date(user.updatedAt).toLocaleDateString()}</h1>
                <button className="ml-4 rounded-full border border-black px-4 py-2 text-black bg-white hover:bg-gray-900" onClick={() => { handleMesage(user.id) }}> Contact the homeowner immediately</button>
              </div>
            </div>
          </div>
          <div className="booking-criteria-container">
            <div
              className="date-section mt-4"
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              <div className="date-container">
                <label>Check-in Date</label>
                <div>
                  <input
                    type="text"
                    value={`${format(date[0].startDate, "MM/dd/yyyy")}`}
                    readOnly
                    className="border rounded p-2"
                  />
                </div>
              </div>
              <div className="date-container">
                <label>Check-out Date</label>
                <div>
                  <input
                    type="text"
                    value={`${format(date[0].endDate, "MM/dd/yyyy")}`}
                    readOnly
                    className="border rounded p-2"
                  />
                </div>
              </div>
            </div>
            {showDatePicker && (
              <DateRange
                editableDateInputs={true}
                onChange={handleDateChange}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className="border rounded p-2"
                minDate={new Date()}
                disabledDay={(date) => isDateBlockedISO(date, blockedDateRanges)}
              />
            )}

            <div className="guests-section">
              <div
                className="guests-container"
                onClick={() => setOpenOptions(!openOptions)}
              >
                <label>Guests</label>
                <input
                  readOnly
                  placeholder={`${options.adult} adult · ${options.children} children · ${options.room} room`}
                  className="border rounded p-2"
                />
              </div>
              {openOptions && (
                <div className="option">
                  <div className="item">
                    <div className="item_title">
                      <span>Adult</span>
                    </div>
                    <div className="item_action">
                      <button
                        disabled={options.adult <= 1}
                        className="minus"
                        onClick={() => handleOption("adult", "d")}
                      >
                        -
                      </button>
                      <span className="number">{options.adult}</span>
                      <button
                        className="plus"
                        onClick={() => handleOption("adult", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="item">
                    <div className="item_title">
                      <span>Children</span>
                    </div>
                    <div className="item_action">
                      <button
                        disabled={options.children <= 0}
                        className="minus"
                        onClick={() => handleOption("children", "d")}
                      >
                        -
                      </button>
                      <span className="number">{options.children}</span>
                      <button
                        className="selectAsMainPhoto plus"
                        onClick={() => handleOption("children", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="item">
                    <div className="item_title">
                      <span>Room</span>
                    </div>
                    <div className="item_action">
                      <button
                        disabled={options.room <= 1}
                        className="minus"
                        onClick={() => handleOption("room", "d")}
                      >
                        -
                      </button>
                      <span className="number">{options.room}</span>
                      <button
                        className="plus"
                        onClick={() => handleOption("room", "i")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="book-now-section">
              <button className="book-now-button" onClick={handleBooking}>Book Now</button>
            </div>
            {details?.rooms?.map((item) => (
              <div className="total" key={item.id}>
                <h2>
                  ${item?.price} <span>/ night</span>
                </h2>
                <h3>You have not been deducted yet</h3>
                <div className="total_item ">
                  <div className="title">
                  <a href={`${item?.price}x${numberOfDays}night`}>{item?.price} x {numberOfDays} night</a>

                  </div>
                  <div className="price">
                    <p>${item?.price * numberOfDays}</p>
                  </div>
                </div>
                <div className="total_item">
                  <div className="title">
                    <h2>Service charge (including vat)</h2>
                  </div>
                  <div className="price">
                    <p>${totalservice.toFixed(2)}</p>
                  </div>
                </div>
                <div className="total_border"></div>
                <div className="total_item">
                  <div className="title">
                    <h2 className="total_bill">
                      Total
                    </h2>
                  </div>
                  <div className="price">
                    <p>${totalPrice.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-px bg-gray-300 my-4"></div>
        <CategoryRoomItem hotel={details} onSubmit={handleBooking} />
        <div className="w-full h-px bg-gray-300 my-4"></div>
              <Comment id={id}/>
        <div className="w-full h-px bg-gray-300 my-4"></div>
        {center?.lat && center?.lng ? (
          <div style={{ height: '600px', width: '100%' }}>
            {/* <Map location={center} zoomLevel={15}/> */}
          </div>

        ) : (
          ""
        )}
      </div>
    </div>
  );
}
