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
	}
])

export default router