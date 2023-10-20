import Home from '../pages/Home'
import Detail from '../pages/Detail'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />
	},
	{
		path: '/detail/:slug',
		element: <Detail/>
	}
])

export default router