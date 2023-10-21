import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import MovieCard from '../components/MovieCard/MovieCard'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import '../styles/Home.css'
import '../styles/Home.mobile.css'
import axios from 'axios'

function Home() {

	const [movies, setMovie] = React.useState([])
	const [selectedMonth, setMonth] = React.useState('')
	
	React.useEffect(() => {

		window.scrollTo(0, 0)

		const date = new Date()
		const currentMonth = date.toLocaleString('default', { month: 'long' }).toLowerCase()
		setMonth(currentMonth)
		// console.log(selectedMonth)

		setTimeout(() => {
			axios({ method: 'get', url: 'http://localhost:3000/api/movies.json' })
				.then(res => {
					if (res.status === 200) {
						setMovie(res.data)
					}
				}).catch(err => console.log(err))
		},
		1700)

		// const movies = document.getElementsByClassName('movie-scroll')
		// console.log(movies)
		// https://codepen.io/LCweb/pen/YZGVRg?editors=0010

		touchScroll('now-showing-movie-scroll')
		touchScroll('upcoming-movies-scroll')
		touchScroll('months-scroll')

		function touchScroll(nameIdAttribute) {
			const slider = document.getElementById(nameIdAttribute)
			let isDown = false
			let startX
			let scrollLeft

			slider.addEventListener('mousedown', (e) => {
				isDown = true
				slider.classList.add('active')
				startX = e.pageX - slider.offsetLeft
				scrollLeft = slider.scrollLeft
				cancelMomentumTracking()
			})

			slider.addEventListener('mouseleave', () => {
				isDown = false
				slider.classList.remove('active')
			})

			slider.addEventListener('mouseup', () => {
				isDown = false
				slider.classList.remove('active')
				beginMomentumTracking()
			})

			slider.addEventListener('mousemove', (e) => {
				if (!isDown) return
				e.preventDefault()
				const x = e.pageX - slider.offsetLeft
				const walk = (x - startX) * 3 //scroll-fast
				var prevScrollLeft = slider.scrollLeft
				slider.scrollLeft = scrollLeft - walk
				velX = slider.scrollLeft - prevScrollLeft
			})

			slider.addEventListener('wheel', (e) => {
				cancelMomentumTracking()
			})

			// Detecting animation
			var velX = 0
			var momentumID

			const beginMomentumTracking = () => {
				cancelMomentumTracking()
				momentumID = requestAnimationFrame(momentumLoop)
			}
			const cancelMomentumTracking = () => {
				cancelAnimationFrame(momentumID)
			}
			const momentumLoop = () => {
				slider.scrollLeft += velX
				velX *= 0.95
				if (Math.abs(velX) > 0.5) {
					momentumID = requestAnimationFrame(momentumLoop)
				}
			}
		}
	}, [])

	// console.log(movies)

	const months = [
		'January', 
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December']

	return (
		<div className="AppHome">
			<Navbar />
			<header className="container">
				{/* <!-- section --> */}
				<section className="row text-center">
					<div id="header-left-section" className="col-md-6 col-12 align-self-center">
						<p>Nearest Cinema, Newest Movie,</p>
						<h1>Find out now!</h1>
					</div>
					<div id="header-right-section" className="col-md-6 col-12 text-center">
						<img src="/assets/img/banner.png" alt="banner" style={{ width: '100%' }} />
					</div>
				</section>
				{/* <!-- end of section --> */}
			</header>

			<main>
				{/* <!-- now showing section --> */}
				<section id="now-showing">
					<div className="container">
						<div className="d-flex justify-content-between">
							<h2>
								<span className="text-indicator">Now Showing</span>
							</h2>
							<a href="/#"><span style={{
								color: 'var(--tic-branding-color-middle)',
								fontSize: '16px', fontWeight: 700
							}}> View All</span></a>
						</div>
					</div>
					<div id="now-showing-movie-scroll" className="container movie-scroll text-center">
						{movies.length === 0 ? 
							<div className='m-auto'>
								<Player autoplay loop src="/lottie/loading-movie.json" style={{ height: '300px', width: '300px' }} />
							</div> :
							movies
								.filter(movie => movie.isShowing === true)
								.slice(0, 5)
								.map((movie, key) => {
									return < MovieCard key={key} poster={movie.poster} title={movie.tittle} genres={movie.genres.join(', ')} />
								})
						}
					</div>
				</section>
				{/* <!-- end of now showing section --> */}

				{/* <!-- upcoming movies section --> */}
				<section id="upcoming-movies">
					<div className="container">
						<div className="d-flex justify-content-between">
							<h2>
								<span>Upcoming Movies<br /></span>
							</h2>
							<a href="/#"><span style={{
								color: 'var(--tic-branding-color-middle)',
								fontSize: '16px', fontWeight: 700
							}}>View All</span></a>
						</div></div>

					<div id="months-scroll" className="container months-scroll text-center">
						{months.map(monthName => (
							<button key={monthName} type="button" className={
								monthName.toLowerCase() === selectedMonth ?
									'months-scroll-item-selected' :
									'months-scroll-item'
							} 
							
							onClick={(e)=>{
								e.preventDefault()
								setMonth(monthName.toLowerCase())
								document.getElementById('months-scroll').scrollLeft = 0
							}}>
								{monthName}
							</button>))}
					</div>

					<div id="upcoming-movies-scroll" className="container movie-scroll text-center">
						{movies.length === 0 ? 
							<div className='m-auto'>
								<Player autoplay loop src="/lottie/loading-movie.json" style={{ height: '300px', width: '300px' }} />
							</div> : movies 
								.filter(movie => movie.showingMonth === selectedMonth )
								.filter(movie => movie.isShowing === false )
								.slice(0, 5)
								.length !== 0 ?
								movies 
									.filter(movie => movie.showingMonth === selectedMonth )
									.filter(movie => movie.isShowing === false )
									.slice(0, 5)
									.map((movie, key) => {
										return < MovieCard key={key} poster={movie.poster} title={movie.tittle} genres={movie.genres.join(', ')} />
									}) :
								<div className='m-auto'>
									<Player autoplay loop src="/lottie/movie-card-404.json" style={{ height: '300px', width: '300px' }} />
								</div>
						}
					</div>
				</section>
				{/* <!-- end of upcoming movies section --> */}

				{/* <!-- call-to-action movies section --> */}
				<section id="call-to-action">
					<div className="container shadow p-3 mb-5 bg-body-white rounded text-center">

						<p style={{ marginBottom: '-5px' }}>Be the vanguard of the</p>
						<h1>Moviegoers</h1>

						<div id="subcription-email-input" className="d-flex justify-content-center gap-2 my-3 m-auto"
							style={{ height: 'fit-content', width: '80%' }}>
							<input style={{ height: '53px', width: '38vh' }} type="email" className="form-control" id="input-email-form"
								placeholder="Type your email" />
							<button style={{ height: '53px', width: '14vh' }} id="input-email" className="btn form-control">Join Now</button>
						</div>

						<p style={{ fontSize: '14px' }}>
							By joining you as a Tickitz member,<br />
							we will always send you the latest updates via email.
						</p>

					</div>
				</section>
				{/* <!-- end of call-to-action movies section --> */}

				<Footer />

			</main>






		</div>
	)
}

export default Home
