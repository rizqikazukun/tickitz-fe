import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import MovieCard from '../components/MovieCard/MovieCard'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import '../styles/Home.css'
import '../styles/Home.mobile.css'
import axios from 'axios'
import Joi from 'joi'

function Home() {

    const [movies, setMovie] = React.useState([])
    const [selectedMonth, setMonth] = React.useState('')
    const [upcoming, setUpcoming] = React.useState([])
    // eslint-disable-next-line no-unused-vars
    const [mvErr, setMvErr] = React.useState([])
    const [ctaValue, setCtaValue] = React.useState('')
    const [ctaValid, setCtaValid] = React.useState(false)
    const [ctaStatus, setCtaStatus] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)

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

    const ctaButtonHandler = () => {
        axios({
            method: 'post',
            url: 'https://tikitz-v2.adaptable.app/rizqi/auth/cta',
            data: {
                email: ctaValue
            }
        }).then(res => {
            setCtaStatus('success')

        }).catch(err => {
            setCtaStatus('failed')

        }).finally(() => {
            setIsLoading(false)
        })
    }

    const initPage = async (isMovies, isUpcoming) => {
        try {
            if (isMovies.length === 0 && isUpcoming.length === 0) {

                const monthIndex = new Date().getMonth()
                const currentMonth = months[monthIndex].slice(0, 3).toLocaleLowerCase()
                setMonth(currentMonth)

                const nowShowingMovies = await axios({
                    method: 'get',
                    url: 'https://tikitz-v2.adaptable.app/rizqi/movie/now-showing'
                })

                const upcomingMoviesByMonth = await axios({
                    method: 'get',
                    url: `https://tikitz-v2.adaptable.app/rizqi/movie/upcoming/${currentMonth}`
                })

                setMovie(nowShowingMovies.data.data)
                setUpcoming(upcomingMoviesByMonth.data.data)
            }
        }
        catch (err) {
            setMvErr(err)
            // console.log(err)
        }
    }

    function upcomingMovieHandler(selectedMonth) {
        const slug = selectedMonth
        axios({
            method: 'get',
            url: `https://tikitz-v2.adaptable.app/rizqi/movie/upcoming/${slug}`
        }).then(
            movies =>
                setUpcoming(movies.data.data)
        ).catch(err => setMvErr(err))
    }

    const validateCta = (e) => {
        const ctaScheme = Joi.string().email({ tlds: { allow: false } })
        ctaScheme.validateAsync(e.target.value).then(() => setCtaValid(true)).catch(() => setCtaValid(false))
    }


    React.useEffect(() => {
        if (movies.length === 0) {
            window.scrollTo(0, 0)
        }

        if (ctaStatus === 'success') {
            setCtaValue('')
            document.getElementById('input-email-form').value = ''
            setTimeout(() => {
                setCtaStatus('')
            }, 3000)
        }

        if (ctaStatus === 'failed') {
            setTimeout(() => {
                setCtaStatus('')
            }, 3000)
        }

        initPage(movies, upcoming)
        upcomingMovieHandler(selectedMonth)

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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMonth, ctaValid, ctaValue, ctaStatus])

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
                        {
                            movies.length === 0 ?
                                <div className='m-auto'>
                                    <Player autoplay loop src="/lottie/loading-movie.json" style={{ height: '300px', width: '300px' }} />
                                </div> :
                                movies
                                    .slice(0, 5)
                                    .map((movie, key) => {
                                        return < MovieCard key={key} poster={movie.poster} title={movie.title} genres={movie.genres.join(', ')}
                                            slug={movie.slug} />
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
                                <span>Upcoming Movies</span>
                            </h2>
                            <a href="/#"><span style={{
                                color: 'var(--tic-branding-color-middle)',
                                fontSize: '16px', fontWeight: 700
                            }}>View All</span></a>
                        </div></div>

                    <div id="months-scroll" className="container months-scroll text-center">
                        {
                            months.map(monthName => (
                                <button key={monthName} type="button" className={
                                    monthName
                                        .slice(0, 3)
                                        .toLowerCase() === selectedMonth ?
                                        'months-scroll-item-selected' :
                                        'months-scroll-item'
                                }
                                onClick={(e) => {
                                    document.getElementById('months-scroll')
                                        .scrollLeft = 0
                                    setMonth(monthName.slice(0, 3).toLowerCase())
                                }}>
                                    {monthName}
                                </button>))}
                    </div>
                    <div id="upcoming-movies-scroll" className="container movie-scroll text-center">
                        {
                            upcoming.length === 0 ?
                                <div className='m-auto'>
                                    <Player autoplay loop src="/lottie/loading-movie.json" style={{ height: '300px', width: '300px' }} />
                                </div> :
                                movies.length === 0 ?
                                    <div className='m-auto'>
                                        <Player autoplay loop src="/lottie/movie-card-404.json" style={{ height: '300px', width: '300px' }} />
                                    </div> :
                                    upcoming
                                        .slice(0, 5)
                                        .map((movie, key) => {
                                            return < MovieCard key={key} poster={movie.poster} title={movie.title} genres={movie.genres.join(', ')}
                                                slug={movie.slug} />
                                        })
                        }
                    </div>
                </section>
                {/* <!-- end of upcoming movies section --> */}

                {/* <!-- call-to-action movies section --> */}
                <section id="call-to-action">
                    <div className="container shadow p-3 mb-5 bg-body-white rounded text-center">
                        <p style={{ marginBottom: '-5px' }}>Be the vanguard of the</p>
                        <h1>Moviegoers</h1>

                        <div className="alert alert-success" role="alert" hidden={ ctaStatus === 'success' ? false : true}>
                            CTA Email sended
                        </div>

                        <div className="alert alert-danger" role="alert"  hidden={ ctaStatus === 'failed' ? false : true}>
                            Email Invalid
                        </div>
                        
                        <div id="subcription-email-input" className="d-flex justify-content-center gap-2 my-3 m-auto"
                            style={{ height: 'fit-content', width: '80%' }}
                            onChange={(e) => {
                                validateCta(e)
                                setCtaValue(e.target.value)
                            }}>
                            <input style={{ height: '53px', width: '38vh' }} type="email" className="form-control" id="input-email-form"
                                placeholder="Type your email" />
                            <button
                                style={{ height: '53px', width: '14vh' }}
                                id="input-email"
                                className="btn form-control"
                                onClick={() => {
                                    setIsLoading(true)
                                    ctaButtonHandler()

                                }}
                                disabled={!ctaValid ? true : false || isLoading ? true : false}>
                                {!isLoading ? 'Join Now' : 'Loading...'}
                            </button>
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
