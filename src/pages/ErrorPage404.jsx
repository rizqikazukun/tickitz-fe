import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Error404 from '../components/Error404/Error404'


export default function ErrorPage404() {

	React.useEffect(()=>{
		window.scrollTo(0, 0)
	},[])

	return (
		<div className='Error404'>
			<Navbar/>
			<div className='container'>
				<Error404/>
			</div>
			<Footer/>
		</div>
	)
}
