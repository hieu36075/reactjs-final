import { useState, useEffect } from "react";
import PhotosUploader from "./PhotosUploader";
import Perks from "./Perks";
import CustomAsyncSelect from "../../components/selectBox/CustomAsyncSelect";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../redux/category/categoryThunks";
import { getCountry } from "../../redux/country/countryThunks";
import { getAmenity } from "../../redux/amenity/amenityThunks";
import { SelectAmenity } from "../../redux/amenity/amenitySelect";
import { createHotel } from "../../redux/hotel/hotelThunks";
import { createIamgeHotel } from "../../redux/imageHotel/imageHotelThunk";
import { getCityByCountryId } from "../../redux/city/cityThunk";
import { useParams } from "react-router-dom";
import getCoordinatesFromAddress from "./getCoordinatesFromAddress";
import useAlert from "../../context/aleart/useAlert";


export default function HotelForm({type, onNext}) {
  const {id}= useParams();
  const {setAlert} = useAlert();
  const dispatch = useDispatch()
  const amenityData = useSelector(SelectAmenity);
  const [validationErrors, setValidationErrors] = useState({});
  const [hotel, setHotel] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    starRating:3,
    peeks: [],
    categoryId: "",
    countryId: "",
    checkInTime: "",
    checkOutTime: "",
    extraInfo:"",
    cityId:"",
    latitude:1,
    longitude:1
  });
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);

  const setHotelData = (fieldName, value) => {

    setHotel((prevHotel) => ({
      ...prevHotel,
      [fieldName]: value,
    }));
  };
  const onChangeCountry= (selected) =>{
    setCountry(selected.label)
    setHotel((preV)=>{
      return{...preV, countryId: selected.value}
    })
  }

  const onChangeCity= (selected) =>{
    setCity(selected.label)
    setHotel((preV)=>{
      return{...preV, cityId: selected.value}
    })
  }
  const handleAddPhotos = (photos) => {
    setAddedPhotos(photos);
  };
  useEffect(() => {
    dispatch(getAmenity());
  }, [dispatch])

  useEffect(()=>{
    const handleGetCoordinates = async () => {
      if(hotel.address && city && country){
      const coordinates = await getCoordinatesFromAddress(hotel.address, city, country);
      if (coordinates) {
        setHotel(prevHotel => ({
          ...prevHotel,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude
        }));
      }
      }
    };
      handleGetCoordinates()
  },[hotel.address, city, country ])
  function inputHeader(text) {
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    );
  }

  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    );
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  function validateTimeFormat(time) {
    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
  }

  const handleSubmit = async () => {
    if (type === "create") {
      if (validateFormData()) {
        try {
          const createdHotel = await dispatch(createHotel(hotel)).unwrap();
          addedPhotos.forEach(url => {
            dispatch(createIamgeHotel({ hotelId: createdHotel.id, url: url }));
          });
  
          onNext();
        } catch (error) {
          console.error("Error creating hotel and images:", error);
        }
      }
    } else {
      setAlert("Please Try Again")
    }
  };
  
  
  
  function validatePositiveNumber(number) {
    return parseFloat(number) > 0;
  }

  function validateFormData() {
    const errors = {};

    if (!hotel.name) {
      errors.name = "name is required.";
    }

    if (!hotel.address) {
      errors.address = "Address is required.";
    }

    if (!hotel.countryId) {
      errors.countryId = "Country is required.";
    }

    if (!hotel.categoryId) {
      errors.categoryId = "Category is required.";
    }

    if (!addedPhotos || addedPhotos.length === 0) {
      errors.addedPhotos = "At least one photo is required.";
    }

    if (!hotel.phoneNumber) {
      errors.phoneNumber = "phoneNumber is required.";
    }

    if (!hotel.peeks || hotel.peeks.length === 0) {
      errors.peeks = "At least one perk is required.";
    }

    // if (!hotel.extraInfo) {
    //   errors.extraInfo = "Extra info is required.";
    // }

    if (!validateTimeFormat(hotel.checkInTime)) {
      errors.checkInTime = "Invalid check in time format (HH:MM).";
    }

    if (!validateTimeFormat(hotel.checkOutTime)) {
      errors.checkOutTime = "Invalid check out time format (HH:MM).";
    }


    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }

  return (
    <div>
      <form>
        {preInput('Name', 'name for your place. should be short and catchy as in advertisement')}
        <input
          type="text"
          value={hotel.name}
          onChange={(ev) => setHotelData('name', ev.target.value)}
          placeholder="name, for example: My lovely apt"
        />
        {validationErrors.name && (
          <p className="text-red-500 text-sm">{validationErrors.name}</p>
        )}
  
        {preInput('Address', 'Address to this place')}
        <input
          type="text"
          value={hotel.address}
          onChange={(ev) => setHotelData('address', ev.target.value)}
          placeholder="address"
        />
        {validationErrors.address && (
          <p className="text-red-500 text-sm">{validationErrors.address}</p>
        )}
  
        {preInput('Country', 'select the country')}
        <CustomAsyncSelect 
            fetchDataAction={getCountry} 
            onChange={(selected) => onChangeCountry(selected)}
          />
        {validationErrors.countryId && (
          <p className="text-red-500 text-sm">{validationErrors.countryId}</p>
        )}

        {hotel.countryId !== "" && (
          <div>
            {preInput('City', 'select the city')}
            <CustomAsyncSelect 
              fetchDataAction={getCityByCountryId}
              id={hotel.countryId}
              onChange={(selected) => onChangeCity(selected)}
            />
          </div>
        )}
      {validationErrors.cityId && (
        <p className="text-red-500 text-sm">{validationErrors.cityId}</p>
      )}

      {preInput('Category', 'select the category')}
      <CustomAsyncSelect 
        fetchDataAction={getCategory} // Sử dụng action lấy dữ liệu category
        onChange={(selected) => setHotelData('categoryId', selected.value)}
      />
      {validationErrors.categoryId && (
        <p className="text-red-500 text-sm">{validationErrors.categoryId}</p>
      )}
  
        {preInput('Photos', 'more = better')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={handleAddPhotos} />
        {validationErrors.addedPhotos && (
          <p className="text-red-500 text-sm">{validationErrors.addedPhotos}</p>
        )}
  
        {preInput('Phone Number', 'phoneof the place')}
        <input
          type="text"
          value={hotel.phoneNumber}
          onChange={(ev) => setHotelData('phoneNumber', ev.target.value)}
          placeholder="phone, for example: 09817347708"
        />

        {validationErrors.phoneNumber && (
          <p className="text-red-500 text-sm">{validationErrors.phoneNumber}</p>
        )}
  
        {preInput('Perks', 'select all the perks of your place')}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={hotel.peeks} data={amenityData} onChange={(selectedPerks) => setHotelData('peeks', selectedPerks)} />
        </div>
        {validationErrors.peeks && (
          <p className="text-red-500 text-sm">{validationErrors.peeks}</p>
        )}
  
        {preInput('Extra info', 'house rules, etc')}
        <textarea
          value={hotel.extraInfo}
          onChange={(ev) => setHotelData('extraInfo', ev.target.value)}
        />
        {validationErrors.extraInfo && (
          <p className="text-red-500 text-sm">{validationErrors.extraInfo}</p>
        )}
  
        {preInput('Check in&out times', 'add check in and out times, remember to have some time window for cleaning the room between guests')}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              value={hotel.checkInTime}
              onChange={(ev) => setHotelData('checkInTime', ev.target.value)}
              placeholder="14:00"
            />
            {validationErrors.checkInTime && (
              <p className="text-red-500 text-sm">{validationErrors.checkInTime}</p>
            )}
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              value={hotel.checkOutTime}
              onChange={(ev) => setHotelData('checkOutTime', ev.target.value)}
              placeholder="11:00"
            />
            {validationErrors.checkOutTime && (
              <p className="text-red-500 text-sm">{validationErrors.checkOutTime}</p>
            )}
          </div>
          {/* <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type="number"
              value={hotel.price}
              onChange={(ev) => setHotel('price', ev.target.value)}
            />
            {validationErrors.price && (
              <p className="text-red-500 text-sm">{validationErrors.price}</p>
            )}
          </div> */}
        </div>
  
        <button
          className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
          type="button"
          onClick={handleSubmit}
        >
          {type === "create" ? "Next" : "Edit"}
        </button>
      </form>
    </div>
  );
}