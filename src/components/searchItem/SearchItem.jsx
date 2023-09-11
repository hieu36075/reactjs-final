import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {CiLocationOn} from 'react-icons/ci'
import "./searchItem.scss";

const SearchItem = ({data}) => {

  const navigate = useNavigate();
  const {loading} = useSelector(state=> state.hotel)

  if (loading) {
    return (
      <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
          <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
              <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
              </svg>
          </div>
          <div className="w-full">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          </div>
          <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }
  
  return (
  <div>
  {data?.map(item=>(
    <div className="searchItem" key={item?.id} onClick={()=>{
      navigate(`/hotels/details/${item?.id}`)
    }}>
      <img
        src={item?.images.length > 0 ? item?.images[0].url : ''}
        alt=""
        className="siImg"
        />
      <div className="siDesc">
        <h1 className="siTitle">{item?.name}</h1>
        {/* <span className="siDistance">500m from center</span> */}
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          {item?.category?.name} with Air conditioning
        </span>
        <span className="siFeatures">
          <CiLocationOn/> 
          {item?.address}, {item?.city?.name}, {item?.country?.name}
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          <button>{item?.starRating}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${item?.rooms?.length > 0 ? item?.rooms[0].price : ""} / night</span>
          <span className="siTaxOp">Taxes and fees are not included</span>
          <button className="siCheckButton" >See availability</button>
        </div>
      </div>
    </div>
  ))}
        </div>
  );
};

export default SearchItem;