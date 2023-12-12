

import Navbar from "../../layout/navbar/Navbar";
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
import { searchHotel } from "../../redux/hotel/hotelThunks";
import CustomAsyncSelect from "../../components/selectBox/CustomAsyncSelect";
import { getCountry } from "../../redux/country/countryThunks";
import { getCategory } from "../../redux/category/categoryThunks";
import moment from "moment";

const List = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [destination, setDestination] = useState(location?.state?.destination || "");
  const [date, setDate] = useState(location?.state?.date || defaultDate);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location?.state?.options || defaultOptions);
  const {id} = useParams();
  const {data} = useSelector(state=> state.hotel)
  const type = location?.state?.type
    const isoFormattedDate = moment(date[0].startDate).format('YYYY-MM-DD');
  const [countryId, setCountryId] = useState('');
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [occupancy, setOccupancy] = useState(location?.state?.options?.adult || 1);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(9999999);
  const handleSearch = () => {
    dispatch(searchHotel({ countryId, name, categoryId, occupancy, minPrice, maxPrice, isoFormattedDate}));
  };

  useEffect(()=>{
    if(type){
      if(type=== "country"){
       setCountryId(id)
      }else if(type ==="category"){
        setCategoryId(id)
      }
    }else{
      setCountryId("")
      setCategoryId("")
    }
  },[id, type ])
  

  useEffect(()=>{
    dispatch(searchHotel({ countryId, name, categoryId, occupancy, minPrice, maxPrice, isoFormattedDate }));
  },[countryId, name, categoryId, occupancy, minPrice, maxPrice, destination, isoFormattedDate])
  
  return (
    <div>
      <Navbar />
      <Header type="list" setOccupancy={setOccupancy}/>
      <div className="flex justify-center mt-5 ">
        <div className="w-full max-w-screen-lg flex">
          <div className="bg-white p-2 sticky rounded-md ">
            <h1 className="text-xl mb-2">Search</h1>
            <div className="flex flex-col mb-2">
              <label>Name</label>
              <input
               placeholder={destination} 
               type="text" 
               onChange={(e) => setName(e.target.value)}
               />
            </div>
            <div className="flex flex-col mb-2">
              <label className="text-xs">Check-in Date</label>
              <span 
              className="h-8 p-1 bg-white flex items-center cursor-pointer"
              onClick={() => setOpenDate(!openDate)}>{`${format(
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
            <div className="flex flex-col mb-2">
              <label>Options</label>
              <div className="p-2">
                <div className="flex justify-between mb-2 text-xs">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="w-12"  onChange={(e) => setMinPrice(e.target.value)}/>
                </div>
                <div className="flex justify-between mb-2 text-xs">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="w-12" onChange={(e) => setMaxPrice(e.target.value)} />
                </div>
                <div className="mb-2">
                <CustomAsyncSelect 
                  fetchDataAction={getCountry}
                  onChange={(selected) => setCountryId(selected.value)}
                />
                </div>
                <CustomAsyncSelect
                  fetchDataAction={getCategory}
                  onChange={(selected) => setCategoryId(selected.value)}
                />
              </div>
            </div>
            <button className="p-2 bg-blue-700 text-white w-full font-medium cursor-pointer" onClick={handleSearch}>Search</button>
          </div>
          <div className="flex flex-3 ml-5">
            
            <SearchItem  data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;