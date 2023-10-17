import React from 'react'

export default function MovieCard() {
    return (
        <div className="card movie-scroll-card" style={{ borderColor: "#ececec" }}>
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
