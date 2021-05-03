import { FC, useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { restrictedRoutes } from '../../config/router/routes'
import { AuthContext } from '../../context'

const ProtectedRoute: FC<RouteProps> = ({ children, ...restProps }) => {
  const { authState } = useContext(AuthContext)

  return (
    <div>
      <Route
        {...restProps}
        render={({ location }: { location: any }) =>
          authState.isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: restrictedRoutes.login.path,
                state: { from: location }
              }}
            />
          )
        }
      />
    </div>
  )
}

export default ProtectedRoute
