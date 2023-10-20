import React from 'react'
import { Link } from 'react-router-dom'
import './MovieCard.css'

export default function MovieCard(prop) {

	const { poster, title, genres } = prop

	const uri = String(title)

	return (
		<div className="card movie-scroll-card" style={{ borderColor: '#ececec' }}>
			<img src={poster}
				className="movie-scroll-card-img" alt="movie" />
			<div className="card-body">
				<h5 className="card-title movie-scroll-title">{title}</h5>
				<p className="card-text movie-scroll-genres">{genres}</p>

				<Link to={'/detail/' + uri.toLowerCase().split(' ').join('-')}>
					<button type="button" className="btn ">
						Detail
					</button>
				</Link>

			</div>
		</div>
	)
}
