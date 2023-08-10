import React from 'react';
import { FaWifi, FaSwimmingPool, FaDumbbell, FaSpa, FaClock, FaDog, FaCar, FaBabyCarriage, FaMoneyBill, FaShieldAlt, FaRegCreditCard, FaBed, FaTicketAlt, FaBusinessTime } from 'react-icons/fa';
import { MdFreeBreakfast } from 'react-icons/md';
import { RiBarChartLine, RiRestaurantLine } from 'react-icons/ri';

const AmenityIcon = ({ amenityName }) => {
  switch (amenityName) {
    case 'Wifi':
      return <FaWifi />;
    case 'Swimming pool':
      return <FaSwimmingPool />;
    case 'Gym':
      return <FaDumbbell />;
    case 'Spa':
      return <FaSpa />;
    case 'Restaurant':
      return <RiRestaurantLine />;
    case 'Bar':
      return <RiBarChartLine />;
    case '24/7 room service':
      return <FaClock />;
    case 'Free breakfast':
      return <MdFreeBreakfast />;
    case 'Parking':
      return <FaCar />;
    case 'Airport shuttle':
      return <FaCar />;
    case 'Laundry service':
      return <FaMoneyBill />;
    case 'Wedding and conference services':
      return <FaShieldAlt />;
    case 'Babysitting service':
      return <FaBabyCarriage />;
    case 'Pet-friendly':
      return <FaDog />;
    case 'Currency exchange':
      return <FaRegCreditCard />;
    case 'In-room safe':
      return <FaBed />;
    case '24/7 front desk':
      return <FaTicketAlt />;
    case 'Tour booking services':
      return <FaTicketAlt />;
    case 'Business center':
      return <FaBusinessTime />;
    // Add more amenities and corresponding icons here
    default:
      return null;
  }
};

export default AmenityIcon;
