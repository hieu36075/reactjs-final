import Featured from "../../components/featured/Featured";
import PropertyList from "../../components/propertyList/PropertyList";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Header from "../../components/header/Header";
import "./home.css";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getHotels } from "../../redux/hotel/hotelThunks";
import { SelectAllHotel } from "../../redux/hotel/hotelSelect";
import { SelectCountry } from "../../redux/country/countrySelect";
import { getTopHotelInCountry } from "../../redux/country/countryThunks";
import { getCategory } from "../../redux/category/categoryThunks";
import { SelectCategories } from "../../redux/category/categorySelect";


const Home = () => {
  const dispatch = useDispatch()
  const hotel = useSelector(SelectAllHotel)
  const categoryData = useSelector(SelectCategories)
  const country = useSelector(SelectCountry)
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getHotels({ page: 1, perPage: 5 }));
        dispatch(getTopHotelInCountry());
        dispatch(getCategory({ page: 1, perPage: 5 }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(); 
  }, [dispatch]);
    return (
      <div>
        {/* <Navbar /> */}
        <Header/>
        <div className="homeContainer">
          <Featured data={country}/>
          <h1 className="homeTitle">Browse by property type</h1>
          <PropertyList data={categoryData}/>
          <h1 className="homeTitle">Homes guests love</h1>
          <FeaturedProperties data={hotel}/>
          {/* <MailList/> */}
          {/* <Footer/> */}
        </div>
      </div>
    );
  };
  
export default Home;