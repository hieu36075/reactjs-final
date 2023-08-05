import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import "./searchItem.scss";
const SearchItem = ({data}) => {

  const navigate = useNavigate();
  const {loading} = useSelector(state=> state.hotel)
  if (loading) {
    return <div>Loading...</div>;
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
        <span className="siDistance">500m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">
          Entire studio • 1 bathroom • 21m² 1 full bed
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
          <span className="siPrice">$112</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton" >See availability</button>
        </div>
      </div>
    </div>
  ))}
        </div>
  );
};

export default SearchItem;