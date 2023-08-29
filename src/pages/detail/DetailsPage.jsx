import { useEffect, useRef, useState } from "react";
import Navbar from "../../layout/navbar/navbar";
import { useNavigate, useParams } from "react-router-dom";
import "./detailsPage.css";
import { useDispatch, useSelector } from "react-redux";
import { getHotelById } from "../../redux/hotel/hotelThunks";
import CommentItem from "../../components/comment/CommentItem";
import "react-datepicker/dist/react-datepicker.css";
import { DateRange } from "react-date-range";
import { format  } from "date-fns";
import ImagesDatails from "./ImagesDatails";
import AmenityIcon from "../../components/amenity/AmenityIcon";
import moment from "moment";
import { createOrder } from "../../redux/order/orderThunk";
import { FaBed} from 'react-icons/fa';
import { BsFillPeopleFill, BsFillCalendarCheckFill, BsFillClockFill } from 'react-icons/bs';
import { MdOutlineFreeBreakfast } from 'react-icons/md';
import { BiSolidHelpCircle, BiWifi2 } from 'react-icons/bi';


export default function DetailsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { details, loading } = useSelector((state) => state.hotel);
  const roomsTest = useSelector((state)=> state.hotel.details.rooms)
  console.log(details)
  useEffect(() => {
    dispatch(getHotelById(id));
  }, [id, dispatch]);

  console.log(details)
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const datePickerRef = useRef(null);
  useEffect(() => {
    // Lắng nghe sự kiện click trên toàn bộ document
    const handleDocumentClick = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        // Nếu người dùng nhấp vào nơi khác ngoài DatePicker, đóng DatePicker
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

  if (!loading) {
    return <div>Loading...</div>;
  }

  const sampleComments = [
    {
      id: 1,
      author: "John Doe",
      date: "July 27, 2023",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, velit ac sodales fermentum, lacus dolor venenatis tortor.",
      avatarUrl: "url_to_user_avatar_1",
    },
    {
      id: 2,
      author: "Jane Smith",
      date: "July 28, 2023",
      content:
        "Praesent euismod enim vitae risus iaculis fermentum. In venenatis, turpis in facilisis vestibulum, ex est congue orci, sit amet.",
      avatarUrl: "url_to_user_avatar_2",
    },
    {
      id: 3,
      author: "Jane Smith",
      date: "July 28, 2023",
      content:
        "Praesent euismod enim vitae risus iaculis fermentum. In venenatis, turpis in facilisis vestibulum, ex est congue orci, sit amet.",
      avatarUrl: "url_to_user_avatar_2",
    },
    {
      id: 4,
      author: "Jane Smith",
      date: "July 28, 2023",
      content:
        "Praesent euismod enim vitae risus iaculis fermentum. In venenatis, turpis in facilisis vestibulum, ex est congue orci, sit amet.",
      avatarUrl: "url_to_user_avatar_2",
    },
    {
      id: 5,
      author: "Jane Smith",
      date: "July 28, 2023",
      content:
        "Praesent euismod enim vitae risus iaculis fermentum. In venenatis, turpis in facilisis vestibulum, ex est congue orci, sit amet.",
      avatarUrl: "url_to_user_avatar_2",
    },
    {
      id: 6,
      author: "Jane Smith",
      date: "July 28, 2023",
      content:
        "Praesent euismod enim vitae risus iaculis fermentum. In venenatis, turpis in facilisis vestibulum, ex est congue orci, sit amet.",
      avatarUrl: "url_to_user_avatar_2",
    },
    {
      id: 7,
      author: "Jane Smith",
      date: "July 28, 2023",
      content:
        "Praesent euismod enim vitae risus iaculis fermentum. In venenatis, turpis in facilisis vestibulum, ex est congue orci, sit amet.",
      avatarUrl: "url_to_user_avatar_2",
    },
    // Thêm các comment mẫu khác vào đây
  ];

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
  


  const vatRate = 0.1; // 10% VAT
  const serviceRate = 0.05;
  const roomPrice = details?.rooms?.reduce((total, item) => {
    return total + item.price * numberOfDays;
  }, 0);

  // Tính phí VAT dựa trên phí phòng
  const vatAmount = roomPrice * vatRate;
  const serviceAmount = roomPrice * serviceRate;
  const totalservice = vatAmount + serviceAmount
  const totalPrice = roomPrice + totalservice
  // // Tính phí dịch vụ dựa trên tổng tiền (bao gồm cả phí phòng và phí VAT)
  // const totalServiceWithVat = vatAmount * (1 + serviceRate);
  // const totalPriceWithVAT = roomPrice + totalServiceWithVat;


  const handleBooking= async (e)=>{
    e.preventDefault();

    try{
      const create = await dispatch(createOrder({checkIn:formattedStartDate, checkOut: formattedEndDate, price: totalPrice, roomId: roomsTest[0].id , hotelId: details?.id})).unwrap();
      console.log(create)
      navigate(`/hotels/stays/${create.id}`)

    }catch(error){
      console.error('Đã xảy ra lỗi:', error);
    }
  }


  
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

            <div className="my-4">
              <h2 className="font-semibold text-2xl break-words">
                Room Details
              </h2>
              <p>Number of beds: 2</p>
              {/* Thêm các thông tin cần thiết khác về phòng như chính sách hủy phòng, ... */}
              {/* <p>{details.extraInfo}</p> */}
            </div>
          </div>
          <div className="booking-criteria-container">
            {/* <div className="price-section">
  <div className="text-2xl text-center">Price: {item.price}$ / night</div>
</div> */}
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
                    <a href="">{item?.price} x {numberOfDays} night</a>
                  </div>
                  <div className="price">
                    <p>${item?.price * numberOfDays}</p>
                  </div>
                </div>
                {/* <div className="total_item">
                  <div className="title">
                    <a href="">Phí d</a>
                  </div>
                  <div className="price">
                    <p>$54</p>
                  </div>
                </div> */}
                <div className="total_item">
                  <div className="title">
                    <a href="">Service charge (including vat)</a>
                  </div>
                  <div className="price">
                    <p>${totalservice.toFixed(2)}</p>
                  </div>
                </div>
                <div className="total_border"></div>
                <div className="total_item">
                  <div className="title">
                    <a className="total_bill" href="">
                    Total 
                    </a>
                  </div>
                  <div className="price">
                    <p>${totalPrice.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        <div className="product">
          <h1>Căn hộ một phòng ngủ</h1>
          <div className="product_item">
            <div className="product_left">
              <img src="https://ik.imagekit.io/tvlk/generic-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/67841452-b8eaa284b3e0d55d645958c3569be662.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-550" alt="" />
            </div>
            <div className="product_right">
              <div className="product_title">
                <div>
                  <h2>Căn hộ một phòng ngủ</h2>
                </div>
                <div>
                  <p>Miễn phí huỷ phòng trước 13:00</p>
                </div>
              </div>
              <div className="product_quantity">
                <div className="item_service">
                  <FaBed />
                  <span>1 giường Cỡ King</span>
                </div>
                <div className="item_service item_service2">
                  <BsFillPeopleFill />
                  <span>3 khách</span>
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
                    <li className="decoration">1.350.000 VND</li>
                    <li className="service_total">800.000 VND</li>
                    <li>/ Phòng / đêm</li>
                    <li className="help">giá cuối cùng</li>
                  </ul>
                </div>
              </div>
              <button className="product_button">Đặt ngay</button>
            </div>
          </div>
          <div className="product_item">
            <div className="product_left">
              <img src="https://ik.imagekit.io/tvlk/generic-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/67841452-b8eaa284b3e0d55d645958c3569be662.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-550" alt="" />
            </div>
            <div className="product_right">
              <div className="product_title">
                <div>
                  <h2>Căn hộ một phòng ngủ</h2>
                </div>
                <div>
                  <p>Miễn phí huỷ phòng trước 13:00</p>
                </div>
              </div>
              <div className="product_quantity">
                <div className="item_service">
                  <FaBed />
                  <span>1 giường Cỡ King</span>
                </div>
                <div className="item_service item_service2">
                  <BsFillPeopleFill />
                  <span>3 khách</span>
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
                    <li className="decoration">1.350.000 VND</li>
                    <li className="service_total">800.000 VND</li>
                    <li>/ Phòng / đêm</li>
                    <li className="help">giá cuối cùng</li>
                  </ul>
                </div>
              </div>
              <button className="product_button">Đặt ngay</button>
            </div>
          </div>
        </div>

        
        <div className="w-full h-px bg-gray-300 my-4"></div>
        <CommentItem data={sampleComments} />
        <div className="w-full h-px bg-gray-300 my-4"></div>
      </div>
    </div>
  );
}
