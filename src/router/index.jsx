import ErrorPage404 from '../pages/ErrorPage404'
import Home from '../pages/Home'
import MovieDetail from '../pages/MovieDetail'
import { createBrowserRouter } from 'react-router-dom'
import Register from '../pages/Register'
import Login from '../pages/Login'



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
        path: '*',
        element: <ErrorPage404/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/login',
        element: <Login/>
    }
])

export default router