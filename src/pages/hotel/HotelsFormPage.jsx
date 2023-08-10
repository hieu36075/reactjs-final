
import { useState} from "react";
import Navbar from "../../layout/navbar/navbar";
import HotelForm from "./HotelForm";
import FormProgress from "./FormProgress";
import RoomForm from "./RoomForm";
export default function HotelsFormPage() {
  // const [title,setTitle] = useState('');
  // const [address,setAddress] = useState('');
  // const [addedPhotos,setAddedPhotos] = useState([]);
  // const [description,setDescription] = useState('');
  // const [perks,setPerks] = useState([]);
  // const [extraInfo,setExtraInfo] = useState('');
  // const [checkIn,setCheckIn] = useState('');
  // const [checkOut,setCheckOut] = useState('');
  // const [maxGuests,setMaxGuests] = useState(1);
  // const [price,setPrice] = useState(100);
  const formArray = [1, 2, 3];
  const [formNo, setFormNo] = useState(formArray[0])
  const [hotel, setHotel] = useState({
    title: "",
    address: "",
    addedPhotos: [],
    description: "",
    peeks: [],
    extraInfo: "",
    checkIn: "",
    checkOut: "",
    maxGuests: 1,
    categoryId: "",
    countryId: "",
    price: "",
  });
  console.log(hotel)
  const setHotelData = (fieldName, value) => {
    setHotel((prevHotel) => ({
      ...prevHotel,
      [fieldName]: value,
    }));
  };

  // useEffect(() => {
  //   if (!id) {
  //     return;
  //   }
  //   axios.get('/places/'+id).then(response => {
  //      const {data} = response;
  //      setTitle(data.title);
  //      setAddress(data.address);
  //      setAddedPhotos(data.photos);
  //      setDescription(data.description);
  //      setPerks(data.perks);
  //      setExtraInfo(data.extraInfo);
  //      setCheckIn(data.checkIn);
  //      setCheckOut(data.checkOut);
  //      setMaxGuests(data.maxGuests);
  //      setPrice(data.price);
  //   });
  // }, [id]);



  // if (redirect) {
  //   return navigate('/account/places') 
  // }
  const next = () => {
    // if (formNo === 1 && state.name && state.dept && state.batch) {
    //   setFormNo(formNo + 1)
    // }
    // else if (formNo === 2 && state.varsity && state.session && state.address) {
    //   setFormNo(formNo + 1)
    // } else {
    //   toast.error('Please fillup all input field')
    // }
    setFormNo(formNo + 1)
  }
  const pre = () => {
    setFormNo(formNo - 1)
  }

  return (
    <div>
      <Navbar/>
      <div className="mt-4 bg-white-100 -mx-8 px-12">
        <FormProgress formNo={formNo} />

        {formNo === 1 && (
         <HotelForm hotel={hotel} setHotel={setHotelData} onNext={next} />
        )}

        {
          formNo === 2 && <div>
            {/* {console.log("a",hotel)} */}
            <RoomForm/>
            <div className='mt-4 gap-3 flex justify-center items-center'>
              <button onClick={pre} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Previous</button>
              <button onClick={next} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Next</button>
            </div>
          </div>
        }

{
          formNo === 3 && <div>
            <div className='mt-4 gap-3 flex justify-center items-center'>
              <button onClick={pre} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Previous</button>
              <button onClick={next} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Next</button>
            </div>
          </div>
        }

{/* <button className="primary my-4" type="button" onClick={next}>
        Next
      </button> */}
</div>

    </div>
  );
}