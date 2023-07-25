import "./featured.scss"

const Featured = ({data}) => {
    return (
      <div className="featured">
    {data?.map((item) => (
          <div className="featuredItem" key={item.id} >
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