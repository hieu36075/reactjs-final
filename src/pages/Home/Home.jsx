import React from 'react'
import Featured from "../../components/featured/Featured";
import PropertyList from "../../components/propertyList/PropertyList";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Header from "../../components/header/Header";
import "./home.css";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getListHotelAction} from "../../redux/action/hotel-action";
import { getListTopCountryInHotelAction } from '../../redux/action/country-action';

const Home = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
      dispatch(getListHotelAction({page:1 , perPage:5}))
  },[])
  const listHotel = useSelector(state=>state.hotelReducer.list_hotel.data)
  const listCountry = useSelector(state=>state.countryReducer.list_country)

  useEffect(()=>{
    dispatch(getListTopCountryInHotelAction())
  },[])

  return (
    <div>
    {/* <Navbar /> */}
    <Header/>
    <div className="homeContainer">
      <Featured data={listCountry}/>
      <h1 className="homeTitle">Browse by property type</h1>
      <PropertyList/>
      <h1 className="homeTitle">Homes guests love</h1>
      <FeaturedProperties data={listHotel}/>
      {/* <MailList/> */}
      {/* <Footer/> */}
    </div>
  </div>
  )
}

export default Home





  
