import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const PrivateRoute = ({allowedRoles}) => {

    const token = localStorage.getItem('token')
    
    const decodeToken = jwtDecode(token)
    const location = useLocation()

  return(
    decodeToken.roles === allowedRoles[0] || 
    decodeToken.roles ===  allowedRoles[1] || 
    decodeToken.roles ===  allowedRoles[2] || 
    decodeToken.roles ===  allowedRoles[3] ?
   <Outlet/> :
    token ?
        <Navigate to="/" state={{ from: location }} replace />
        :<Navigate to="/login" state={{ from: location }} replace />
)
};

export default PrivateRoute;