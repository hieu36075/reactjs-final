import PhotosUploader from "./PhotosUploader";
import Perks from "./Perks";




export default function HotelForm({hotel, setHotel, onNext }) {
  // const {id} = useParams();



  const setHotelData = (fieldName, value) => {
    setHotel((prevHotel) => ({
      ...prevHotel,
      [fieldName]: value,
    }));
  };




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
  function preInput(header,description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  // const handleFormChange = () => {
  //   // Gọi hàm callback và truyền dữ liệu cần prop lên component cha
  //   onChange(hotel);
  // };
  // async function savePlace(ev) {
  //   ev.preventDefault();
  //   const placeData = hotel;
  //   if (id) {
  //     // update
  //     await axios.put('/places', {
  //       id, ...placeData
  //     });
  //     setRedirect(true);
  //   } else {
  //     // new place
  //     await axios.post('/places', placeData);
  //     setRedirect(true);
  //   }

  // }



  return (
    <div>
      {/* <div className="mt-4 bg-white-100 -mx-8 px-12 py-8"> */}
      <form>
      {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
      <input
        type="text"
        value={hotel.title}
        onChange={(ev) => setHotel('title', ev.target.value)}
        placeholder="title, for example: My lovely apt"
      />

      {preInput('Address', 'Address to this place')}
      <input
        type="text"
        value={hotel.address}
        onChange={(ev) => setHotel('address', ev.target.value)}
        placeholder="address"
      />

      {preInput('Photos', 'more = better')}
      <PhotosUploader addedPhotos={hotel.addedPhotos} onChange={(photos) => setHotelData('addedPhotos', photos)} />

      {preInput('Description', 'description of the place')}
      <textarea
        value={hotel.description}
        onChange={(ev) => setHotel('description', ev.target.value)}
      />

      {preInput('Perks', 'select all the perks of your place')}
      <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        <Perks selected={hotel.peeks} onChange={(selectedPerks) => setHotel('peeks', selectedPerks)} />
      </div>

      {preInput('Extra info', 'house rules, etc')}
      <textarea
        value={hotel.extraInfo}
        onChange={(ev) => setHotel('extraInfo', ev.target.value)}
      />

      {preInput('Check in&out times', 'add check in and out times, remember to have some time window for cleaning the room between guests')}
      <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
        <div>
          <h3 className="mt-2 -mb-1">Check in time</h3>
          <input
            type="text"
            value={hotel.checkIn}
            onChange={(ev) => setHotel('checkIn', ev.target.value)}
            placeholder="14"
          />
        </div>
        <div>
          <h3 className="mt-2 -mb-1">Check out time</h3>
          <input
            type="text"
            value={hotel.checkOut}
            onChange={(ev) => setHotel('checkOut', ev.target.value)}
            placeholder="11"
          />
        </div>
        <div>
          <h3 className="mt-2 -mb-1">Max number of guests</h3>
          <input
            type="number"
            value={hotel.maxGuests}
            onChange={(ev) => setHotel('maxGuests', ev.target.value)}
          />
        </div>
        <div>
          <h3 className="mt-2 -mb-1">Price per night</h3>
          <input
            type="number"
            value={hotel.price}
            onChange={(ev) => setHotel('price', ev.target.value)}
          />
        </div>
      </div>

      <button className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500" type="button" onClick={() => onNext()}>Next</button>
    </form>
    </div>

    // </div>
  );
}