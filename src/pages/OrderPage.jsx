import React from 'react'
import '../styles/OrderPage.css'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import axios from 'axios'
import { useLocation, useNavigate, useParams } from 'react-router-dom'


export default function OrderPage() {

    const { slug } = useParams()
    const location = useLocation()
    const [isLoading, setIsLoading] = React.useState(false)
    const [movie, setMovie] = React.useState({})
    const [cinema, setCinema] = React.useState({})
    const [emptySeat, setEmptySeat] = React.useState({})
    const navigate = useNavigate()
    const [selectedSeat, setSelectedSeat] = React.useState([])
    const [booked, setBooked] = React.useState(undefined)
    const [authError, setAuthError] = React.useState('')
    const [inputError, setInputError] = React.useState('')
    const [isSuccess, setIsSuccess] = React.useState(false)

    const initPage = ({ id, date, time }) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const monthIndex = new Date(date).getMonth()
        const dayIndex = new Date(date).getDay()
        const dayName = days[dayIndex]
        const monthName = months[monthIndex]
        const startMovie = `${dayName}, ${date.split('-')[2]} ${monthName} ${date.split('-')[0]} at ${time}`

        axios({
            method: 'post',
            url: `https://pijar-camp-batch15-tickitz.cyclic.app/rizqi/movie/${slug}/seat`,
            data: {
                startMovie,
                cinemaId: id
            }
        }).then(res => {
            setEmptySeat(res.data.data)
            setBooked(res.data.data.booked)
        })
            .catch(err => {
                if (err.response.status === 422) {
                    setInputError(err.response.data.messages.seat.message)
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const col = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

    const seat = (vertical, start, end) => {

        const horizontalArr = []
        for (let index = start; index < end; index++) {
            if (horizontalArr.length === 0) {
                horizontalArr.push(index)
            }
            horizontalArr.push(index + 1)
        }

        return (
            <div className='d-flex justify-content-between m-auto'>
                {
                    horizontalArr.map((col) => {
                        return (
                            <button value={vertical + col} className='btn seat-button'

                                style={{
                                    height: '40px',
                                    width: '40px',
                                    textAlign: 'center',
                                    fontSize: '9px',
                                    fontWeight: 900,
                                    borderRadius: '50%',
                                    border: 'var(--tic-branding-color-middle) solid',
                                }}
                                onClick={
                                    (e) => {
                                        const arrIdx = selectedSeat.findIndex(item => item === `${vertical + col}`)

                                        if (arrIdx === -1) {
                                            setSelectedSeat([...selectedSeat, vertical + col])
                                            e.target.style.backgroundColor = 'var(--tic-branding-color-middle)'
                                        }
                                        if (arrIdx !== -1) {
                                            setSelectedSeat([...selectedSeat.splice(arrIdx, 1)])
                                            e.target.style.backgroundColor = 'white'
                                        }
                                    }
                                }
                                disabled={!booked ? false : [...booked].findIndex(index => index === `${vertical + col}`) !== -1 ? true : false}
                            >
                                {vertical}{col}
                            </button>
                        )

                    })
                }
            </div>
        )
    }

    const handleCheckout = async () => {
        try {
            setIsLoading(true)
            const requestBooking = await axios.post(
                'https://pijar-camp-batch15-tickitz.cyclic.app/rizqi/ticket/seat',
                {
                    movieSlug: slug,
                    cinemaId: cinema.id,
                    seat: selectedSeat,
                    startMovie: emptySeat.date,
                },
                {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                }
            )

            if (requestBooking.data.data.paymentId) {
                const requestPayment = await axios.patch(
                    `https://pijar-camp-batch15-tickitz.cyclic.app/rizqi/ticket/purchase/${requestBooking.data.data.paymentId}`,
                    {
                        //empty-body-data
                    },
                    {
                        headers: {
                            Authorization: localStorage.getItem('token'),
                        },
                    }
                )
                if (requestPayment.data.data.redirect_url) {
                    setIsSuccess(true)
                    window.location.href = requestPayment.data.data.redirect_url
                }
            }

        } catch (err) {

            if (err.response.status === 401) {
                setAuthError(err.response.data.messages)
            }

            if (err.response.status === 422) {
                setInputError(err.response.data.messages.seat.message)
            }

        } finally {
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        setMovie(location.state.detailMovies[0])
        setCinema(location.state.cinema)

        if (inputError) {
            setTimeout(() => {
                setInputError('')
            }, 2000)
        }

        if (authError) {
            setTimeout(() => {
                setAuthError('')
            }, 2000)
        }

        initPage({
            id: location.state.cinema.id,
            date: location.state.date,
            time: location.state.time
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cinema, movie, selectedSeat, inputError, authError, isSuccess])


    return (
        <div id='OrderPage' >
            <Navbar />

            <div style={{ backgroundColor: 'rgb(243 243 243)' }} >
                <div id='OrderPage-body' className='container row m-auto py-5'>

                    <div className='col-md-8 col-sm-12 content-container' >

                        {/* Movie Selected */}
                        <h3><span className='div-title'>Movie Selected</span></h3>
                        <div className='content-container-child shadow rounded d-flex justify-content-between align-items-center'
                            style={{ maxWidth: '100%', backgroundColor: 'white', padding: '30px' }}>
                            <div className='d-flex justify-content-between' style={{ width: '100%' }}><p><span className='div-title'>{movie.title}</span></p>
                                <button className='btn' style={{
                                    color: 'var(--tic-branding-color-middle)', backgroundColor: '#ebebeb',
                                    fontWeight: 700, border: 'unset'
                                }} onClick={() => { navigate('/') }}>Change Movie</button></div>
                        </div>
                        {/* End of Movie Selected */}

                        {/* Choose seat */}
                        <h3><span className='div-title'>Choose Your Seat</span></h3>
                        <div className='content-container-child shadow rounded d-flex flex-wrap p-5 justify-content-center'
                            style={{ maxWidth: '100%', backgroundColor: 'white' }}>

                            <div className='d-flex flex-wrap justify-content-center gap-4' style={{ width: '80%' }}>
                                <div className='my-5 d-flex justify-content-center' style={{
                                    width: '100%',
                                    border: 'var(--tic-branding-color-middle) solid',
                                    borderRadius: '15px',
                                    fontWeight: 900,
                                    fontSize: '12px'
                                }}>Screen</div>
                            </div>
                            <div className='d-flex flex-wrap justify-content-center gap-4' style={{ width: '100%' }} >
                                <div>
                                    {col.map((item) => {
                                        return seat(item, 1, 7)
                                    })}
                                </div>
                                <div>
                                    {col.map((item) => {
                                        return seat(item, 8, 14)
                                    })}
                                </div>
                            </div>

                            <div className='d-flex flex-wrap flex-column mt-5' style={{ width: '80%' }}>
                                <p><span className='div-title' style={{ fontSize: '18px' }}>Seating Key</span></p>
                                <div className='d-flex flex-row flex-wrap gap-3'>
                                    
                                    <div className='d-flex flex-row justify-content-center align-content-center gap-3'>
                                        <div style={{
                                            height: '40px',
                                            width: '40px',
                                            textAlign: 'center',
                                            fontSize: '9px',
                                            fontWeight: 900,
                                            borderRadius: '50%',
                                            border: 'var(--tic-branding-color-middle) solid',
                                            marginTop: '-8px'
                                        }}></div>
                                        <p>Available</p>
                                    </div>

                                    <div className='d-flex flex-row justify-content-center align-content-center gap-3'>
                                        <div style={{
                                            height: '40px',
                                            width: '40px',
                                            textAlign: 'center',
                                            fontSize: '9px',
                                            fontWeight: 900,
                                            borderRadius: '50%',
                                            backgroundColor: 'var(--tic-branding-color-middle)',
                                            border: 'var(--tic-branding-color-middle) solid',
                                            marginTop: '-8px'
                                        }}></div>
                                        <p>Selected</p>
                                    </div>

                                    <div className='d-flex flex-row justify-content-center align-content-center gap-3'>
                                        <div style={{
                                            height: '40px',
                                            width: '40px',
                                            textAlign: 'center',
                                            fontSize: '9px',
                                            fontWeight: 900,
                                            borderRadius: '50%',
                                            border: 'var(--tic-branding-color-middle) solid',
                                            backgroundColor: 'gray',
                                            marginTop: '-8px',
                                        }}></div>
                                        <p>Sold</p>
                                    </div>
                                    
                                </div>

                            </div>
                        </div>
                        {/* End of  Choose seat */}
                    </div>

                    <div className='col-md-4 col-sm-12 content-container'>
                        <h3><span className='div-title'>Order Info</span></h3>
                        <div className='d-flex flex-column justify-content-between text-center shadow rounded' style={{
                            maxWidth: '100%',
                            backgroundColor: 'white',
                            padding: '30px 15px 15px 15px'
                        }}>
                            <p><img style={{ maxWidth: '160px' }} src={cinema.logo} alt="logo" /></p>
                            <p style={{
                                color: 'var(--Text---Title, #14142B)',
                                textAlign: 'center',
                                fontSize: '24px',
                                fontWeight: 600
                            }}>{cinema.name}</p>

                            <div className="alert alert-danger" role="alert" hidden={authError === '' ? true : false}>
                                Sorry, Please login first!
                            </div>

                            <div className="alert alert-danger" role="alert" hidden={inputError === '' ? true : false}>
                                Sorry, No seat choosed.
                            </div>

                            <div className="alert alert-success" role="alert" hidden={isSuccess ? false : true}>
                                Booked, You will redirect to the payment.
                            </div>

                            <div className='d-flex justify-content-between'> <p>Movie Selected</p> {movie.title}</div>

                            <div className='d-flex justify-content-between'>
                                <p>{String(emptySeat.date).split(' at ')[0]}</p>
                                <p>{String(emptySeat.date).split(' at ')[1]}</p>
                            </div>
                            <div className='d-flex justify-content-between'><p>Ticket Price</p> <p>Rp. {cinema.priceDisplay}</p></div>
                            <div className='d-flex justify-content-between'><p>Seat Choosed</p> <p> {selectedSeat.join(', ')} </p></div>
                            <hr />
                            <div className='d-flex justify-content-between'><p>Total Payment</p> <p>Rp. {cinema.price * selectedSeat.length}</p></div>
                            <button className='btn my-2' style={{
                                color: 'var(--tic-branding-color-middle)', backgroundColor: '#ebebeb',
                                fontWeight: 700, border: 'unset'
                            }}
                            onClick={() => { navigate(-1) }} >Change Cinema</button>
                            <button className='btn my-2' style={{
                                color: 'white', backgroundColor: 'var(--tic-branding-color-middle)',
                                fontWeight: 700, border: 'unset'
                            }}
                            onClick={() => {
                                setAuthError('')
                                setIsLoading(true)
                                handleCheckout()
                            }}
                            disabled={isLoading ? true : false}> {isLoading ? 'Loading...' : 'Checkout Now'}</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
