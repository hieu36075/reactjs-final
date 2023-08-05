import "./featuredProperties.scss";
import { DEFAULT_IMAGE_URL } from "../../constants";
const FeaturedProperties = ({data}) => {
  
  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }
  return (
    <div className="fp">
      {data && data?.map((item) => (
            <div className="fpItem" key={item.id}>
              <img
                src={item.images.length > 0 ? item.images[0].url : DEFAULT_IMAGE_URL}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
              {item.rating && <div className="fpRating">
                <button>{item.rating}</button>
                <span>Excellent</span>
              </div>}
            </div>
          ))}
    </div>
      
  );
};

export default FeaturedProperties;