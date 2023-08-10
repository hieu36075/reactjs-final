import { useState, useEffect } from "react";
import PhotosUploader from "./PhotosUploader";
import Perks from "./Perks";
import CustomAsyncSelect from "../../components/selectBox/CustomAsyncSelect";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../redux/category/categoryThunks";
import { getCountry } from "../../redux/country/countryThunks";
import { SelectCountry } from "../../redux/country/countrySelect";
import { SelectCategories } from "../../redux/category/categorySelect";
import { getAmenity } from "../../redux/amenity/amenityThunks";
import { SelectAmenity } from "../../redux/amenity/amenitySelect";



export default function HotelForm({hotel, setHotel, onNext }) {
  const dispatch = useDispatch()
  const countriesData = useSelector(SelectCountry);
  const categoriesData = useSelector(SelectCategories);
  const amenityData = useSelector(SelectAmenity);

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getCountry());
    dispatch(getAmenity());
  }, [dispatch])

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

  function validatePositiveNumber(number) {
    return parseFloat(number) > 0;
  }

  function validateFormData() {
    const errors = {};

    if (!hotel.title) {
      errors.title = "Title is required.";
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

    if (!hotel.addedPhotos || hotel.addedPhotos.length === 0) {
      errors.addedPhotos = "At least one photo is required.";
    }

    if (!hotel.description) {
      errors.description = "Description is required.";
    }

    if (!hotel.peeks || hotel.peeks.length === 0) {
      errors.peeks = "At least one perk is required.";
    }

    if (!hotel.extraInfo) {
      errors.extraInfo = "Extra info is required.";
    }

    if (!validateTimeFormat(hotel.checkIn)) {
      errors.checkIn = "Invalid check in time format (HH:MM).";
    }

    if (!validateTimeFormat(hotel.checkOut)) {
      errors.checkOut = "Invalid check out time format (HH:MM).";
    }

    if (!validatePositiveNumber(hotel.price)) {
      errors.price = "Price must be a positive number.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }

  return (
    <div>
      <form>
        {preInput('Name', 'Title for your place. should be short and catchy as in advertisement')}
        <input
          type="text"
          value={hotel.title}
          onChange={(ev) => setHotel('title', ev.target.value)}
          placeholder="title, for example: My lovely apt"
        />
        {validationErrors.title && (
          <p className="text-red-500 text-sm">{validationErrors.title}</p>
        )}
  
        {preInput('Address', 'Address to this place')}
        <input
          type="text"
          value={hotel.address}
          onChange={(ev) => setHotel('address', ev.target.value)}
          placeholder="address"
        />
        {validationErrors.address && (
          <p className="text-red-500 text-sm">{validationErrors.address}</p>
        )}
  
        {preInput('Country', 'select the country')}
        <CustomAsyncSelect 
          data={countriesData} 
          selectedOptions={hotel.countries}
          onChange={(selected) => setHotel('countryId', selected)}
        />
        {validationErrors.countryId && (
          <p className="text-red-500 text-sm">{validationErrors.countryId}</p>
        )}
  
        {preInput('Category', 'select the category')}
        <CustomAsyncSelect 
          data={categoriesData}
          onChange={(selected) => setHotel('categoryId', selected)}
        />
        {validationErrors.categoryId && (
          <p className="text-red-500 text-sm">{validationErrors.categoryId}</p>
        )}
  
        {preInput('Photos', 'more = better')}
        <PhotosUploader addedPhotos={hotel.addedPhotos} onChange={(photos) => setHotel('addedPhotos', photos)} />
        {validationErrors.addedPhotos && (
          <p className="text-red-500 text-sm">{validationErrors.addedPhotos}</p>
        )}
  
        {preInput('Description', 'description of the place')}
        <textarea
          value={hotel.description}
          onChange={(ev) => setHotel('description', ev.target.value)}
        />
        {validationErrors.description && (
          <p className="text-red-500 text-sm">{validationErrors.description}</p>
        )}
  
        {preInput('Perks', 'select all the perks of your place')}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={hotel.peeks} data={amenityData} onChange={(selectedPerks) => setHotel('peeks', selectedPerks)} />
        </div>
        {validationErrors.peeks && (
          <p className="text-red-500 text-sm">{validationErrors.peeks}</p>
        )}
  
        {preInput('Extra info', 'house rules, etc')}
        <textarea
          value={hotel.extraInfo}
          onChange={(ev) => setHotel('extraInfo', ev.target.value)}
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
              value={hotel.checkIn}
              onChange={(ev) => setHotel('checkIn', ev.target.value)}
              placeholder="14:00"
            />
            {validationErrors.checkIn && (
              <p className="text-red-500 text-sm">{validationErrors.checkIn}</p>
            )}
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              value={hotel.checkOut}
              onChange={(ev) => setHotel('checkOut', ev.target.value)}
              placeholder="11:00"
            />
            {validationErrors.checkOut && (
              <p className="text-red-500 text-sm">{validationErrors.checkOut}</p>
            )}
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type="number"
              value={hotel.price}
              onChange={(ev) => setHotel('price', ev.target.value)}
            />
            {validationErrors.price && (
              <p className="text-red-500 text-sm">{validationErrors.price}</p>
            )}
          </div>
        </div>
  
        <button
          className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
          type="button"
          onClick={() => {
            if (validateFormData()) {
              onNext();
            }
          }}
        >
          Next
        </button>
      </form>
    </div>
  );
}