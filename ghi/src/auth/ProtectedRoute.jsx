import useToken from '@galvanize-inc/jwtdown-for-react'
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const {token} = useToken();
    const location = useLocation();

    if(!token){
        return <Navigate to="/" state={{from: location}} replace />
    }
  return children
}

export default ProtectedRoute