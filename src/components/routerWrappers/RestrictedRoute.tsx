import { FC, useContext } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { protectedRoutes } from '../../config/router/routes'
import { AuthContext } from '../../context'

const RestrictedRoute: FC<RouteProps> = ({ children, ...restProps }) => {
  const { authState } = useContext(AuthContext)
  return (
    <Route
      {...restProps}
      render={({ location }) =>
        !authState.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: protectedRoutes.dashboard.path,
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export default RestrictedRoute
