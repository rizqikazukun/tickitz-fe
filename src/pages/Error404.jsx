import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { Player } from '@lottiefiles/react-lottie-player'

export default function Error404() {

    
	return (
		<div className='Error404'>
			<Navbar/>

			<Player autoplay loop src="/lottie/404.json" style={{ width: '100%' }} />
            

			<Footer/>
        
		</div>
	)
}
