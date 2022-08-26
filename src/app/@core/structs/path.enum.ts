export enum Path {
  // General containers
  Home = '',
  NotFound = '404',

  // Auth
  SignIn = 'sign-in',
  SignUp = 'sign-up',

  // App base url
  Dashboard = 'dashboard',

  // User
  Users = 'users',
  UsersOverview = 'overview',
  UsersProfile = ':username',

  // Servicios
  Services = 'services',
  ServicesOverview = 'overviewServices',
  ServicesProfile = ':servicename',
}