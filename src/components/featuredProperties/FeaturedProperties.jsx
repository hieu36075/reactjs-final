import "./featuredProperties.scss";
import { DEFAULT_IMAGE_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
const FeaturedProperties = ({data}) => {
  const navigate = useNavigate();
  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }
  const filteredData = data.filter((item) => item.isActive);
  return (
    <div className="fp">
      {filteredData && filteredData?.map((item) => (
            <div 
            className="fpItem" 
            key={item?.id}
            onClick={()=>{
              navigate(`/hotels/details/${item?.id}`)
            }}
            >
              <img
                src={item?.images?.length > 0 ? item?.images[0]?.url : DEFAULT_IMAGE_URL}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item?.name}</span>
              <span className="fpCity">{item?.city?.name}</span>
              <span className="fpPrice">Starting from ${item?.rooms?.[0]?.price}</span>
              {item?.rating && <div className="fpRating">
                <button>{item?.rating}</button>
                <span>Excellent</span>
              </div>}
            </div>
          ))}
    </div>
      
  );
};

export default FeaturedProperties;