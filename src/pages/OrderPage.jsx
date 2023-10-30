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
    const [booked, setBooked] = React.useState([])

    // console.log(location.state.cinema)

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
            url: `https://tickitz-be.onrender.com/rizqi/movie/${slug}/seat`,
            data: {
                startMovie,
                cinemaId: id
            }
        }).then(res => {
            // eslint-disable-next-line no-console
            console.log(res.data.data)
            setEmptySeat(res.data.data)
            setBooked(res.data.data.booked)
        })
            // eslint-disable-next-line no-console
            .catch(err => console.log(err))
            .finally(() => { setIsLoading(false) })
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
                                disabled={booked.findIndex(index => index === `${vertical+col}`) !== -1 ? true : false }
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
            // HIT API BOOKING SEAT
            const requestBooking = await axios.post(
                'https://tickitz-be.onrender.com/rizqi/ticket/seat',
                {
                    movieSlug: slug,
                    cinemaId: cinema.id, // 1, 3, 3
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
                    `https://tickitz-be.onrender.com/rizqi/ticket/purchase/${requestBooking.data.data.paymentId}`,
                    {},
                    {
                        headers: {
                            Authorization: localStorage.getItem('token'),
                        },
                    }
                )
    
                if (requestPayment.data.data.redirect_url) {
                    window.location.href = requestPayment.data.data.redirect_url
                }
            }
    
            setIsLoading(false)
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        setMovie(location.state.detailMovies[0])
        setCinema(location.state.cinema)

        initPage({
            id: location.state.cinema.id,
            date: location.state.date,
            time: location.state.time
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cinema, movie, selectedSeat])




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
                                }} onClick={() => { navigate(-1) }}>Change Movie</button></div>
                        </div>
                        {/* End of Movie Selected */}

                        {/* Choose seat */}
                        <h3><span className='div-title'>Choose Your Seat</span></h3>
                        <div className='content-container-child shadow rounded d-flex flex-wrap p-5 justify-content-center' style={{ maxWidth: '100%', backgroundColor: 'white' }}>
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
                            }}> Change Movie </button>
                            <button className='btn my-2' style={{
                                color: 'white', backgroundColor: 'var(--tic-branding-color-middle)',
                                fontWeight: 700, border: 'unset'
                            }}
                            onClick={handleCheckout}> Checkout Now </button>
                        </div>
                    </div>



                </div>




            </div>
            <Footer />
        </div>
    )
}
