import "./list.scss";
import Navbar from "../../layout/navbar/navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import {defaultDate, defaultOptions } from './defaults';
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getHotelByCategory, getHotelByCountry, searchHotel } from "../../redux/hotel/hotelThunks";


const List = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [destination, setDestination] = useState(location?.state?.destination || "");
  const [date, setDate] = useState(location?.state?.date || defaultDate);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location?.state?.options || defaultOptions);
  const {id} = useParams();
  const {loadding, data} = useSelector(state=> state.hotel)
  const type = location?.state?.type
  const [name, setName] = useState('')
  const [category, setCategory]= useState('')
  useEffect(()=>{
    if(type){
      if(type=== "country"){
        dispatch(getHotelByCountry(id))
      }else if(type ==="category"){
        dispatch(getHotelByCategory(id))
      }
    }else{
      console.log("get all")
    }

  },[id, dispatch])

  if (loadding) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button>Search</button>
          </div>
          <div className="listResult">
            <SearchItem data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;