import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import axios from 'axios'
import { Player } from '@lottiefiles/react-lottie-player'
import '../styles/MovieDetail.css'
import '../styles/MovieDetail.mobile.css'
import '../styles/App.css'

const MovieDetail = () => {

    const { slug } = useParams()
    const [detailMovies, setDetailMovies] = React.useState([])
    const [movieStatusCode, setMovieStatusCode] = React.useState(0)
    const [cinemasList, setCinemasList] = React.useState([])
    const [date, setDate] = React.useState('')
    const [time, setTime] = React.useState('')
    const isDisable = date === '' ? true : time === '' ? true : false || time === '' ? true : date === '' ? true : false
    const navigate = useNavigate()

    const handleInitPage = async () => {
        try {
            const detail = await axios({
                method: 'get',
                url: `https://tickitz-be.onrender.com/rizqi/movie/detail/${slug}`
            })

            const cinemas = await axios({
                method: 'get',
                url: `https://tickitz-be.onrender.com/rizqi/movie/${slug}/cinemas`
            })

            setMovieStatusCode(detail.status)
            setDetailMovies(detail.data.data)
            setCinemasList(cinemas.data.data)

        } catch (error) {
            setMovieStatusCode(error.response.status)
        }
    }

    React.useEffect(() => {

        if (movieStatusCode === 0) {
            window.scrollTo(0, 0)
        }

        // i just want to show if the app 
        // has no data on first load.
        setTimeout(() => {
            handleInitPage()
        }, 1200)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movieStatusCode, date, time])

    return (
        <div id='Page-Movie-Detail'>
            <Navbar />
            <div id='detail-movie' className='container'>
                {movieStatusCode === 0 ?
                    <div className='m-auto'>
                        <Player autoplay loop src="/lottie/loading-movie.json" style={{ height: '300px', width: '300px' }} />
                    </div> :
                    movieStatusCode === 404 ?
                        <div className='m-auto'>
                            <Player autoplay loop src="/lottie/404.json" />
                        </div> :
                        detailMovies
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
                                                <p><span className="content" style={{ color: 'var(--tic-color-muted)' }}>{movie.desc}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                }

            </div>

            <div id='select-cinema' style={{ backgroundColor: 'rgb(243 243 243)' }}>
                <div className='container d-flex flex-column'>
                    <h3 className='my-5' style={{ textAlign: 'center', fontWeight: 900 }}>Showtimes and Tickets</h3>
                    <div className='d-flex flex-row justify-content-center m-auto gap-2 mb-5' style={{ maxWidth: '50%' }}>
                        <input className='form-control' type="date" id="" onChange={(e) => {
                            setDate(e.target.value)
                        }} />
                        <select className="form-select" onChange={(e) => {
                            setTime(e.target.value)
                        }}>
                            <option defaultValue>Select time</option>

                            <option value="10:00">10:00 WIB</option>
                            <option value="13:00">13:00 WIB</option>
                            <option value="16:00">16:00 WIB</option>
                            <option value="19:00">19:00 WIB</option>
                        </select>
                    </div>

                    <div id='card-container'>
                        <div className='row p-2 mb-5 ciema-body'>
                            {cinemasList.map((cinema, key) => {
                                return (
                                    <div key={key} className='col-md-4 col-xs-12 cinema-card'>
                                        <div className='cinema-body d-flex flex-column p-4 justify-content-between'
                                            style={{ backgroundColor: 'white', width: '100%', borderRadius: '6px' }}>
                                            <div className='d-flex flex-row justify-content-between align-items-center gap-4'>
                                                <div>
                                                    <img src={cinema.logo} alt="logo" style={{ width: '100px' }} />
                                                </div>
                                                <div>
                                                    <h5>{cinema.name}</h5>
                                                    <p>{cinema.address}</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='d-flex justify-content-between my-3'>
                                                {cinema.movieStart.map((time, key) => <span key={key}> {time} </span>)}
                                            </div>
                                            <div className='d-flex justify-content-between my-3'>
                                                <span>Price</span> <span>Rp. {cinema.priceDisplay}</span>
                                            </div>
                                            <div>
                                                <button className='btn my-3 cinema-card-button'
                                                    onClick={()=>{
                                                        navigate( `/movie/${slug}/seat/` ,{state:{time,date,cinema,detailMovies}})
                                                    }}
                                                    disabled={isDisable ? true : false}>
                                                    {/* Bug Can't use && in this conditional rendering */}
                                                    Book Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>


    )
}

export default MovieDetail