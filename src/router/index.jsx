import Error404 from '../pages/Error404'
import Home from '../pages/Home'
import MovieDetail from '../pages/MovieDetail'
import { createBrowserRouter } from 'react-router-dom'

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
		element: <Error404/>
	}
])

export default router