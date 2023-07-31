import { FaWifi, FaAirbnb, FaTv, FaSwimmingPool, FaParking } from 'react-icons/fa';
import { RiRestaurantLine, RiBarChartLine } from 'react-icons/ri';
import { MdRoomService } from 'react-icons/md';
import { GiSpa } from 'react-icons/gi';

const AmenityIcon = (amenityName) => {
  switch (amenityName) {
    case 'Wi-Fi':
      return <FaWifi />;
    case 'Air conditioning':
      return <FaAirbnb />;
    case 'TV':
      return <FaTv />;
    case 'Swimming pool':
      return <FaSwimmingPool />;
    case 'Parking':
      return <FaParking />;
    case 'Restaurant':
      return <RiRestaurantLine />;
    case 'Bar':
      return <RiBarChartLine />;
    case 'Room service':
      return <MdRoomService />;
    case 'Spa':
      return <GiSpa />;
    // Thêm các tên tiện ích và icon tương ứng tại đây
    default:
      return null;
  }
};
