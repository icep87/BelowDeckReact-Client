import { useContext } from 'react'
import { Redirect, Route } from "react-router-dom"
import { ClientContext} from '../contexts/ClientContext'

const PrivateRoute = ({ children, ...rest }) => {
    const {userData} = useContext(ClientContext);

    return (
        <Route {...rest} render={() => {
            return userData
              ? children
              : <Redirect to='/login' />
          }} />
    )
}

export default PrivateRoute;