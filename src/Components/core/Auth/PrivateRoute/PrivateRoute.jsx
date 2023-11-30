import { Navigate } from "react-router-dom"
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
    // const { token } = useSelector((state) => state.auth)
    const token = localStorage.getItem('jwtToken') ? (localStorage.getItem('jwtToken')) : null;

    if (token !== null) {
        return children
    } else {
        toast.error("please login to access this resource")
        return <Navigate to="/signin" />
    }
}
PrivateRoute.PropTypes = {
    children: PropTypes.element.isRequired
};

export default PrivateRoute