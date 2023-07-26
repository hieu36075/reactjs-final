import "./featured.scss"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Featured = ({data}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
      <div className="featured">
    {data?.map((item) => (
          <div className="featuredItem" onClick= {()=>{
            //
            navigate(`/hotels/${item.id}`)
          }} key={item.id} >

          <img
            src={item.image}
            alt=""
            className="featuredImg"
            />
          <div className="featuredTitles">
            <h1>{item.name}</h1>
            <h2>{item.hotels.length}</h2>
          </div>
        </div>
    ))}
      </div>
    );
  };

export default Featured;