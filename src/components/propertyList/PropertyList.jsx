import { useNavigate } from "react-router-dom";
import "./propertyList.scss";

const PropertyList = ({data}) => {
  const navigate = useNavigate()

  return (
    <div className="pList">
      {data?.map((item) =>{
      return <div className="pListItem" key={item?.id} onClick={()=>{
        navigate(`/hotels/${item?.id}`, {state:{type: "category"}})
      }}>
        <img
          src={item?.imageURL}
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