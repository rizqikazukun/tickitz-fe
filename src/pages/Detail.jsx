
import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

const Detail = () => {

	const { slug } = useParams()

	React.useEffect(()=>{
		console.log('hello')
	},[])

	return (
		<>
			<Navbar />
			<div id='Page-Movie-Detail'>
				<div className='container' style={{height: '300px', backgroundColor: '#aaaaaa'}}> <p>Hello, {slug}!</p> </div>
			</div>
			<Footer />
		</>

	)
}

export default Detail