import "./featuredProperties.scss";



const FeaturedProperties = (props) => {

  return (
    <div className="fp">
      <div className="fpItem">
        <img
          src={props.img}
          alt=""
          className="fpImg"
        />
        <span className="fpName">{props.name}</span>
        <span className="fpCity">{props.country}</span>
        <span className="fpPrice">{props.price}</span>
        <div className="fpRating">
          <button>{props.rating}</button>
          <span>Excellent</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperties;