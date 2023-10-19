import React from 'react'
import './MovieCard.css'

export default function MovieCard() {


	React.useEffect(() => {

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
	})

	return (
		<div className="card movie-scroll-card" style={{ borderColor: '#ececec' }}>
			<img src="./assets/img/poster/MV5BMTQ4OTgzNTkwNF5BMl5BanBnXkFtZTgwMzI3MDE3NDE@._V1_SX300.jpg"
				className="movie-scroll-card-img" alt="movie" />
			<div className="card-body">
				<h5 className="card-title movie-scroll-title">Tomorrow Land</h5>
				<p className="card-text movie-scroll-genres">
					Adventure, Science fiction, Family
				</p>
				<button type="button" className="btn ">
					Details
				</button>
			</div>
		</div>
	)
}
