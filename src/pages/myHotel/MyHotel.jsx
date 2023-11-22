
import { useEffect, useState } from "react";
// import PlaceImg from "../PlaceImg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../layout/navbar/Navbar";
import { filterHotelByUserId, getHotelByUserId } from "../../redux/hotel/hotelThunks";
import { getMyUser } from "../../redux/user/userThunks";


export default function MyHotelPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState(false)
  const [type, setType] = useState('all')
  const hotel = useSelector((state) => state.hotel.managerHotel)
  console.log(hotel)
  const user = useSelector((state) => state.user.data)
  const { loading } = useSelector((state) => state.hotel)
  useEffect(() => {
    const flechData = async () => {
      await dispatch(getHotelByUserId({ page: 1, perPage: 5 })).unwrap()
    }
    if (type === 'all') {
      flechData();
    }
  }, [dispatch, type]);

  useEffect(() => {
    if (type === 'filter') {
      dispatch(filterHotelByUserId(active))
    }
  }, [type, active])

  useEffect(() => {
    dispatch(getMyUser());
  }, [])
  if (loading) {
    return <h1>loading ...</h1>
  }
  if (!hotel) {
    return (
      <>
        <h1>khong co hang</h1>
      </>
    )
  }
  const handleNavigate = (hotel) => {
    if (hotel?.categoryRooms?.length === 0) {
      navigate(`/hotels/new/${user.id}`, { state: { form: 1, hotelId: hotel.id, categoryId: hotel.categoryId } })
    } else if (hotel?.rooms?.length === 0) {
      navigate(`/hotels/new/${user.id}`, { state: { form: 2, hotelId: hotel.id, categoryId: hotel.categoryId } })
    }
    else {
      navigate(`/account/manager/${hotel.id}`)
    }
  }

  return (
    <>
      <Navbar />
      <div className="p-20">
        <div className="flex flex-row justify-between ">
          <h1 className="text-3xl font-semibold"> Wellcome to comback </h1>
          <button
            className="px-20 py-1 border border-1 border-black rounded-xl font-medium hover:bg-gray-200 "
            onClick={() => { navigate(`/hotels/new/${user?.id}`) }}
          >
            New Hotel
          </button>
        </div>
        <div className="flex flex-row justify-between mt-10">
          <h1 className="text-2xl font-medium">List Your Hotel</h1>
          <h1
            className="font-semibold underline"
            onClick={() => setType('all')}
          >
            View all hotel ({hotel?.length})
          </h1>
        </div>
        <div className="mt-10 mb-10">
          <bottom
            className='px-6 py-1 font-medium border border-1 border-black rounded-2xl mr-10 hover:bg-gray-200'
            onClick={() => {
              setType('filter')
              setActive(true)
            }}
          >
            Hotel activity
          </bottom>
          <bottom
            className='px-6 py-1 font-medium border border-1 border-black rounded-2xl hover:bg-gray-200'
            onClick={() => {
              setType('filter')
              setActive(false)
            }}
          >
            Hotel not activity
          </bottom>
        </div>
        {hotel?.length > 0 && hotel?.map(hotel => (
          <div
            key={hotel.id}
            className="border border-gray-300 p-4 mb-4 rounded-xl bg-gray-200"
            onClick={() => handleNavigate(hotel)}
          >
            <div className="text-xl">
              {hotel?.isActive === false ? (
                <div className="flex gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
                  </svg>
                  <span className="text-2xl">
                    Status: chưa hoàn thành
                  </span>
                </div>
              ) : ("")}
            </div>
            <div className="list-hotel flex gap-60 px-6">
              <div className="">
                <img src={hotel?.images?.[0]?.url} alt="" style={{ width: '400px', height: '200px' }} />
              </div>
              <div className="">
                <div className="flex ">
                  <div className="flex-1">
                    <h2 className="text-xl">{hotel?.name}</h2>
                    <p>SDT: 12313123</p>
                    <p>Dia chi: qweqweqwe</p>
                  </div>
                  <div className="flex-1">
                    <h2>check-In Time: {hotel?.checkInTime}</h2>
                    <h2>check-In out: {hotel?.checkOutTime}</h2>
                  </div>
                </div>
                <div className="py-4">
                  <h2 className="text-xl">Ghi chu:</h2>
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae aut dignissimos libero, voluptates quo asperiores.</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}