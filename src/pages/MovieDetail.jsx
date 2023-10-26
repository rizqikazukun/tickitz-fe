
import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import axios from 'axios'
import { Player } from '@lottiefiles/react-lottie-player'
import '../styles/MovieDetail.css'
import '../styles/MovieDetail.mobile.css'


const MovieDetail = () => {


    const { slug } = useParams()
    const [movies, setMovie] = React.useState([])

    React.useEffect(() => {
		
		
        window.scrollTo(0, 0)
		
        setTimeout(() => {
            axios({ method: 'get', url: 'http://localhost:3000/api/movies.json' })
                .then(res => {
                    if (res.status === 200) {
                        setMovie(res.data)
                    }
                }).catch(err => console.log(err))
        },
        1200)
    }, [])

    return (
        <div id='Page-Movie-Detail'>
            <Navbar />
            <div id='detail-movie' className='container'>
                {movies.length === 0 ?
                    <div className='m-auto'>
                        <Player autoplay loop src="/lottie/loading-movie.json" style={{ height: '300px', width: '300px' }} />
                    </div> : 
                    movies
                        .filter(movie => String(movie.title)
                            .toLowerCase()
                            .split(' ')
                            .join('-') === slug).length === 0 ?
                        <div className='m-auto'>
                            <Player autoplay loop src="/lottie/404.json" />
                        </div> :
                        movies
                            .filter(movie => String(movie.title)
                                .toLowerCase()
                                .split(' ')
                                .join('-') === slug)
                            .map((movie, key) => {
                                return (
                                    <div key={key} className='row'>
                                        <div className="col-md-4 poster-container" >
                                            <img src={movie.poster} alt="poster" />
                                        </div>
                                        <div className="col-md-8 row m-auto" style={{ paddingLeft: '3vw' }}>
                                            <div className=' col-md-12 col-xs-12'>
                                                <h1>{movie.title}</h1>
                                                <p><span className="content">{movie.genres.join(', ')}</span></p>
                                            </div>
                                            <div className=" col-md-4 col-xs-12" >
                                                <div>
                                                    <p>
                                                        <span className="content-title">
														Release Date
                                                        </span>
                                                    </p>
                                                    <p>
                                                        <span className="content">
                                                            {movie.release}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        <span className="content-title">
														Duration
                                                        </span>
                                                    </p>
                                                    <p>
                                                        <span className="content">
                                                            {movie.duration}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className=" col-md-8 col-xs-12">
                                                <div>
                                                    <p>
                                                        <span className="content-title">
														Directed By :
                                                        </span>
                                                    </p>
                                                    <p>
                                                        <span className="content">
                                                            {movie.director}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        <span className="content-title">
														Casts :
                                                        </span>
                                                    </p>
                                                    <p>
                                                        <span className="content">
                                                            {movie.cast.join(', ')}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className=' col-md-12 col-xs-12'>
                                                <h5>Synopsis</h5>
                                                <p><span className="content" style={{color: 'var(--tic-color-muted)'}}>{movie.desc}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                }

            </div>
            <Footer />
        </div>


    )
}

export default MovieDetail