import { useNavigate } from "react-router-dom";
import "./propertyList.scss";
import { DEFAULT_IMAGE_URL } from "../../constants";

const PropertyList = ({data}) => {
  console.log(data)
  const navigate = useNavigate()
  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }
  return (
    <div className="pList">
      {data?.map((item) =>{
      return <div className="pListItem" key={item?.id} onClick={()=>{
        navigate(`/hotels/${item?.id}`, {state:{type: "category"}})
      }}>
        <img
          src={item?.imageURL || DEFAULT_IMAGE_URL}
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>{item?.name}</h1>
          <h2>{item?.hotels?.length}</h2>
        </div>
      </div>
      })}
    </div>
  );
};

export default PropertyList;