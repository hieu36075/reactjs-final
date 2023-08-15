import "./featured.scss"
import { useNavigate } from "react-router-dom";


const Featured = ({data}) => {
    console.log(data)
    const navigate = useNavigate();

    return (
      <div className="featured">
    {data?.data?.map((item) => (
          <div className="featuredItem" onClick= {()=>{
            //
            navigate(`/hotels/${item?.id}`, {state:{type: "country"}})
          }} key={item?.id} >

          <img
            src={item?.image}
            alt=""
            className="featuredImg"
            />
          <div className="featuredTitles">
            <h1>{item?.name}</h1>
            <h2>{item?.hotels?.length}</h2>
          </div>
        </div>
    ))}
      </div>
    );
  };

export default Featured;