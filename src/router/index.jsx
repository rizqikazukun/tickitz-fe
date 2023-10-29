import ErrorPage404 from '../pages/ErrorPage404'
import Home from '../pages/Home'
import MovieDetail from '../pages/MovieDetail'
import { createBrowserRouter } from 'react-router-dom'
import Register from '../pages/Register'
import Login from '../pages/Login'
import ForgotPassword from '../pages/ForgotPassword'
import OrderPage from '../pages/OrderPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/detail/:slug',
        element: <MovieDetail/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword/>
    },
    {
        path: '/movie/:slug/seat/',
        element: <OrderPage/>
    },
    {
        path: '*',
        element: <ErrorPage404/>
    }
])

export default router