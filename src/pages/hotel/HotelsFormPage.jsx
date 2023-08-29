
import { useState} from "react";
import Navbar from "../../layout/navbar/navbar";
import HotelForm from "./HotelForm";
import FormProgress from "./FormProgress";
import RoomForm from "./RoomForm";
import TermsPage from "./TermsPage";
import CategoryRoomForm from "./CategoryRoomFrom";
import { useLocation } from "react-router-dom";

export default function HotelsFormPage() {
  const location = useLocation();

  const formArray = [1, 2, 3];
  const [formNo, setFormNo] = useState(formArray[location?.state?.form ? location.state.form : 0])

  console.log(location)

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
          <div>
         <HotelForm type='create' onNext={next} />
         </div>
        )}

        {
          formNo === 3 && <div>
            {/* {console.log("a",hotel)} */}
            <RoomForm onPre={pre}/>
            {/* <div className='mt-4 gap-3 flex justify-center items-center'>
              <button onClick={pre} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Previous</button>
              <button onClick={next} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Next</button>
            </div> */}
          </div>
        }

      {
          formNo === 2 && <div>
            {/* <TermsPage/> */}
            <CategoryRoomForm onNext={next}/>
            {/* <div className='mt-4 gap-3 flex justify-center items-center'>
              <button onClick={pre} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Previous</button>
              <button onClick={next} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Next</button>
            </div> */}
          </div>
        }

{/* <button className="primary my-4" type="button" onClick={next}>
        Next
      </button> */}
</div>

    </div>
  );
}