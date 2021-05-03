import React, { FC, Suspense, useEffect, useReducer } from 'react';
import { AuthContext, authReducer, initialAuthState } from './context';
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import { protectedRoutes, publicRoutes, restrictedRoutes } from './config/router/routes'
import { ProtectedRouteWrapper, RestrictedRouteWrapper, PublicRouteWrapper } from './components/routerWrappers';
import './App.css';
import Navbar from './components/navbar';

// Code-splitting
const lazyPages: Record<string, React.ComponentType<unknown>> = {}
Object.entries({ ...protectedRoutes, ...publicRoutes, ...restrictedRoutes }).forEach(
  ([key, route]) => {
    lazyPages[key] = React.lazy(() => import(`./pages/${route.page}`))
  }
)

const App: FC = () => {
  const [authState, dispatchAuthAction] = useReducer(authReducer, initialAuthState)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token && !authState.isAuthenticated) {
      dispatchAuthAction({ type: 'SWITCH_AUTH_STATE', payload: { state: true } })
    }
  })

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, dispatchAuthAction }}>
        <BrowserRouter basename={process.env.APP_BASENAME_PATH}>
          {authState.isAuthenticated && <Navbar />}
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              {Object.entries(protectedRoutes).map(([key, route]) => {
                const C = lazyPages[key]
                return (
                  <ProtectedRouteWrapper key={key} path={route.path}>
                    <C />
                  </ProtectedRouteWrapper>
                )
              })}
              {Object.entries(restrictedRoutes).map(([key, route]) => {
                const C = lazyPages[key]
                return (
                  <RestrictedRouteWrapper key={key} path={route.path}>
                    <C />
                  </RestrictedRouteWrapper>
                )
              })}
              {Object.entries(publicRoutes).map(([key, route]) => {
                const C = lazyPages[key]
                return (
                  <PublicRouteWrapper key={key} path={route.path}>
                    <C />
                  </PublicRouteWrapper>
                )
              })}
              <Redirect from='*' to='/dashboard' />
              <Redirect to='/login' />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  )
}

export default App;