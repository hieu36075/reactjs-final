import axios from 'axios';

const getCoordinatesFromAddress = async (address, city, country) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: `${address}, ${city}, ${country}`,
        key: process.env.REACT_APP_GOOGLE_MAP_KEY, // Thay YOUR_API_KEY bằng API Key của bạn
      },
    });
    const { results } = response.data;
    if (results.length > 0) {
      const { lat, lng } = results[0].geometry.location;
      return { latitude: lat, longitude: lng };
    }
    return null;
  } catch (error) {
    console.error('Error getting coordinates:', error);
    return null;
  }
};

export default getCoordinatesFromAddress;
