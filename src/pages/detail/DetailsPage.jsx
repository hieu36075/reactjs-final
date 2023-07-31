import { useEffect, useState } from "react"
import Navbar from "../../layout/navbar/navbar"
import Header from "../../components/header/Header"
import { useParams } from "react-router-dom"
import './detailsPage.css'
import { useDispatch, useSelector } from "react-redux"
import { getHotelById } from "../../redux/hotel/hotelThunks"
import CommentItem from "../../components/comment/CommentItem"
import { FaWifi, FaAirbnb, FaTv } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import ImagesDatails from "./ImagesDatails"



export default function DetailsPage(){
    const dispatch = useDispatch()

    const {id}= useParams()
    const {details, loading} = useSelector(state => state.hotel)

    useEffect(()=>{
        dispatch(getHotelById(id))

    },[id, dispatch])

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);
    const [date, setDate] = useState([
            {
              startDate: new Date(),
              endDate: new Date(),
              key: "selection",
            },
          ]);

       
          const [options, setOptions] = useState({
            adult: 1,
            children: 0,
            room: 1,
          });
 
    if (loading) {
        return <div>Loading...</div>;
    }




    const sampleComments = [
        {
          id: 1,
          author: 'John Doe',
          date: 'July 27, 2023',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, velit ac sodales fermentum, lacus dolor venenatis tortor.',
          avatarUrl: 'url_to_user_avatar_1',
        },
        {
          id: 2,
          author: 'Jane Smith',
          date: 'July 28, 2023',
          content:
            'Praesent euismod enim vitae risus iaculis fermentum. In venenatis, turpis in facilisis vestibulum, ex est congue orci, sit amet.',
          avatarUrl: 'url_to_user_avatar_2',
        },
        {
            id: 3,
            author: 'Jane Smith',
            date: 'July 28, 2023',
            content:
              'Praesent euismod enim vitae risus iaculis fermentum. In venenatis, turpis in facilisis vestibulum, ex est congue orci, sit amet.',
            avatarUrl: 'url_to_user_avatar_2',
          },
          {
            id: 4,
            author: 'Jane Smith',
            date: 'July 28, 2023',
            content:
              'Praesent euismod enim vitae risus iaculis fermentum. In venenatis, turpis in facilisis vestibulum, ex est congue orci, sit amet.',
            avatarUrl: 'url_to_user_avatar_2',
          },
          {
            id: 5,
            author: 'Jane Smith',
            date: 'July 28, 2023',
            content:
              'Praesent euismod enim vitae risus iaculis fermentum. In venenatis, turpis in facilisis vestibulum, ex est congue orci, sit amet.',
            avatarUrl: 'url_to_user_avatar_2',
          },
          {
            id: 6,
            author: 'Jane Smith',
            date: 'July 28, 2023',
            content:
              'Praesent euismod enim vitae risus iaculis fermentum. In venenatis, turpis in facilisis vestibulum, ex est congue orci, sit amet.',
            avatarUrl: 'url_to_user_avatar_2',
          },
          {
            id: 7,
            author: 'Jane Smith',
            date: 'July 28, 2023',
            content:
              'Praesent euismod enim vitae risus iaculis fermentum. In venenatis, turpis in facilisis vestibulum, ex est congue orci, sit amet.',
            avatarUrl: 'url_to_user_avatar_2',
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



    //data mẫu tiện ích
      const basicAmenities = [
        { id: 1, name: 'Wi-Fi', icon: <FaWifi /> },
        { id: 2, name: 'Air conditioning', icon: <FaAirbnb /> },
        { id: 3, name: 'TV', icon: <FaTv /> },
      ];

    return(
        <div>
            <Navbar />
            <Header type="list" />
            <div className="mt-4 bg-white-100 -mx-8 px-48 py-8">
                <h1 className="text-2xl">{details.name}</h1> 
                <ImagesDatails images={details}/>

                <div className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-2">
                  <div>
                    <div className="my-4 break-all">
                      <h2 className="font-semibold text-2xl break-words">Descriptions</h2>
                      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    </div>
                    <div className="w-full h-px bg-gray-300 my-4"></div>
                    <div className="flex flex-wrap justify-between my-4">
                        {basicAmenities.map((amenity) => (
                          <div key={amenity.id} className="w-full md:w-1/4 bg-gray-200 p-4 rounded-xl text-center h-62 mx-2 mb-4" style={{width: "30%"}}>
                            <div className="text-2xl mb-2">
                              {amenity.icon} {/* Thay "{amenity.icon}" bằng mã icon của tiện ích */}
                            </div>
                            <p>{amenity.name}</p> {/* Thay "{amenity.name}" bằng tên của tiện ích */}
                          </div>
                        ))}
                      </div>
                        <div className="my-4">
                          <h2 className="font-semibold text-2xl break-words">Room Details</h2>
                          <p>Number of beds: 2</p>
                          {/* Thêm các thông tin cần thiết khác về phòng như chính sách hủy phòng, ... */}
                        </div>
                      </div>
                          <div className="booking-criteria-container">
                      <div className="price-section">
                        <div className="text-2xl text-center">Price: $513 / night</div>
                      </div>

                      
                      <div className="date-section mt-4"onClick={()=>setShowDatePicker(!showDatePicker)}>
                          <div className="date-container" >
                            <label>Check-in Date</label>
                            <div>
                              <input
                                type="text"
                                value={`${format(date[0].startDate,"MM/dd/yyyy")}`}
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
                                value={`${format(date[0].endDate,"MM/dd/yyyy")}`}
                                readOnly
                                className="border rounded p-2"
                              />
                            </div>
                          </div>
                        </div>
                        {showDatePicker && (
                                <DateRange
                                  editableDateInputs={true}
                                  onChange={(item) => setDate([item.selection])}
                                  moveRangeOnFirstSelection={false}
                                  ranges={date}
                                  className="border rounded p-2"
                                  minDate={new Date()}
                                />
                              )}
                      <div className="guests-section">
                        <div className="guests-container" onClick={() => setOpenOptions(!openOptions)}>
                          <label>Guests</label>
                          <input
                            readOnly
                            placeholder={`${options.adult} adult · ${options.children} children · ${options.room} room`}
                            className="border rounded p-2"
                          />
                        </div>
                        {openOptions && (
                    <div className="4343">
                      <div className="4343">
                        <span className="4334">Adult</span>
                        <div className="223">
                          <button
                            disabled={options.adult <= 1}
                            className="44"
                            onClick={() => handleOption("adult", "d")}
                          >
                            -
                          </button>
                          <span className="3">
                            {options.adult}
                          </span>
                          <button
                            className="2"
                            onClick={() => handleOption("adult", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="3">
                        <span className="6">Children</span>
                        <div className="5">
                          <button
                            disabled={options.children <= 0}
                            className="4"
                            onClick={() => handleOption("children", "d")}
                          >
                            -
                          </button>
                          <span className="3">
                            {options.children}
                          </span>
                          <button
                            className="2"
                            onClick={() => handleOption("children", "i")}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="d">
                        <span className="">Room</span>
                        <div className="">
                          <button
                            disabled={options.room <= 1}
                            className="v"
                            onClick={() => handleOption("room", "d")}
                          >
                            -
                          </button>
                          <span className="">
                            {options.room}
                          </span>
                          <button
                            className="a"
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
                        <button className="book-now-button">Book Now</button>
                      </div>
                    </div>
                </div>

              <div className="w-full h-px bg-gray-300 my-4"></div>
                <CommentItem data={sampleComments}/>
                <div className="w-full h-px bg-gray-300 my-4"></div>
              
              
        </div>
        </div>
    )
}