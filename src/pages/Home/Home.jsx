import Featured from "../../components/featured/Featured";
import PropertyList from "../../components/propertyList/PropertyList";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Header from "../../components/header/Header";
import "./home.css";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getHotels } from "../../context/hotel/hotelThunks"
import { getTopHotelInCountry } from "../../context/country/countryThunks";
import { SelectAllHotel } from "../../context/hotel/hotelSelect";
import { SelectCountry } from "../../context/country/countrySelect";

const Home = () => {
  const dispatch = useDispatch()
  const hotel = useSelector(SelectAllHotel)
  console.log("a", hotel)
  useEffect(()=>{
      dispatch(getHotels({page:1 , perPage:5}))
  },[])

  const country = useSelector(SelectCountry)
  console.log("b", country)
  useEffect(()=>{
    dispatch(getTopHotelInCountry())
  },[])

    return (
      <div>
        {/* <Navbar /> */}
        <Header/>
        <div className="homeContainer">
          <Featured data={country}/>
          <h1 className="homeTitle">Browse by property type</h1>
          <PropertyList/>
          <h1 className="homeTitle">Homes guests love</h1>
          <FeaturedProperties data={hotel}/>
          {/* <MailList/> */}
          {/* <Footer/> */}
        </div>
      </div>
    );
  };
  
export default Home;