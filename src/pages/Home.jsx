import React from 'react'
import './Home.css'
import MovieCard from '../components/MovieCard/MovieCard'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

function Home() {

	const months = [
		'January', 'February',
		'march',
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

			<div className="container">
				<Navbar />
			</div>

			<header className="container">
				{/* <!-- Bootstrap Canvas --> */}
				<div className="offcanvas offcanvas-top shadow text-center" tabIndex="-1" id="offcanvasTop">
					<div className="offcanvas-body">
						<button className="btn dropdown-item canvasItem">Home</button>
						<button className="btn dropdown-item canvasItem">List Movie</button>
						<button className="btn dropdown-item canvasItem">Login</button>
						<button className="btn dropdown-item canvasItem">Register</button>
						<button className="btn dropdown-item canvasItem" data-bs-dismiss="offcanvas">Close</button>
					</div>
				</div>
				{/* <!-- end of Bootstrap Canvas --> */}

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
						< MovieCard />
						< MovieCard />
						< MovieCard />
						< MovieCard />
						< MovieCard />
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
						{months.map(monthName => (<button key={monthName} type="button" className="btn months-scroll-item">{monthName}</button>))}
					</div>

					<div id="upcoming-movies-scroll" className="container movie-scroll text-center">
						< MovieCard />
						< MovieCard />
						< MovieCard />
						< MovieCard />
						< MovieCard />
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

				<Footer></Footer>

			</main>






		</div>
	)
}

export default Home
