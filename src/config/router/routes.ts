interface IRoute {
  page: string
  exact?: boolean
  path: string
}

type RestrictedRoute = 'login' | 'signup'

export const restrictedRoutes: Readonly<Record<RestrictedRoute, IRoute>> = {
  login: {
    page: 'login',
    exact: true,
    path: '/login'
  },
  signup: {
    page: 'signup',
    exact: true,
    path: '/signup'
  }
}

type PublicRoute = string
export const publicRoutes: Readonly<Record<PublicRoute, IRoute>> = {}

export type ProtectedRoute = 'dashboard' | 'profile'

export const protectedRoutes: Readonly<Record<ProtectedRoute, IRoute>> = {
  dashboard: {
    page: 'dashboard',
    exact: false,
    path: '/dashboard'
  },
  profile: {
    page: 'profile',
    exact: false,
    path: '/profile'
  }
}
