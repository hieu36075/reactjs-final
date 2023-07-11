import Featured from "../../components/featured/Featured";
import PropertyList from "../../components/propertyList/PropertyList";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Header from "../../components/header/Header";
import "./home.css";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getHotels } from "../../context/hotel/hotelThunks"

const Home = () => {
  const dispatch = useDispatch()
  const {data} = useSelector((state)=> state.hotel)
  useEffect(()=>{
      dispatch(getHotels({page:1 , perPage:5}))
  },[])
  
    return (
      <div>
        {/* <Navbar /> */}
        <Header/>
        <div className="homeContainer">
          <Featured/>
          <h1 className="homeTitle">Browse by property type</h1>
          <PropertyList/>
          <h1 className="homeTitle">Homes guests love</h1>
          {data && data.map((property) => (
            <FeaturedProperties
              key={property.id}
              img={property.img}
              name={property.name}
              country={property.country}
              price={property.price}
              rating={property.rating}
            />
          ))}
          {/* <MailList/> */}
          {/* <Footer/> */}
        </div>
      </div>
    );
  };
  
export default Home;