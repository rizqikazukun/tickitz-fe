import React from 'react';
import './style/App.css';

function App() {

  React.useEffect(() => {

    // const movies = document.getElementsByClassName('movie-scroll')
    // console.log(movies)
    // https://codepen.io/LCweb/pen/YZGVRg?editors=0010

    touchScroll('now-showing-movie-scroll');
    touchScroll('upcoming-movies-scroll');
    touchScroll('months-scroll')

    function touchScroll(nameIdAttribute) {
      const slider = document.getElementById(nameIdAttribute);
      let isDown = false;
      let startX;
      let scrollLeft;

      slider.addEventListener("mousedown", (e) => {
        isDown = true;
        slider.classList.add("active");
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        cancelMomentumTracking();
      });

      slider.addEventListener("mouseleave", () => {
        isDown = false;
        slider.classList.remove("active");
      });

      slider.addEventListener("mouseup", () => {
        isDown = false;
        slider.classList.remove("active");
        beginMomentumTracking();
      });

      slider.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        var prevScrollLeft = slider.scrollLeft;
        slider.scrollLeft = scrollLeft - walk;
        velX = slider.scrollLeft - prevScrollLeft;
      });

      slider.addEventListener("wheel", (e) => {
        cancelMomentumTracking();
      });

      // Detecting animation
      var velX = 0;
      var momentumID;

      const beginMomentumTracking = () => {
        cancelMomentumTracking();
        momentumID = requestAnimationFrame(momentumLoop);
      }
      const cancelMomentumTracking = () => {
        cancelAnimationFrame(momentumID);
      }
      const momentumLoop = () => {
        slider.scrollLeft += velX;
        velX *= 0.95;
        if (Math.abs(velX) > 0.5) {
          momentumID = requestAnimationFrame(momentumLoop);
        }
      }
    }
  })


  return (
    <div className="App">

      <header className="container">
        {/* <!-- nav link --> */}
        <nav className="d-flex justify-content-between my-5">
          <div id="nav-left-item" className="gap-4">
            <a href="/#"><img src="/assets/img/logo.svg" alt="logo" height="64px" /></a>
            <a className="desktop-component" href="/#">Home</a>
            <a className="desktop-component" href="/#">List Movie</a>
          </div>
          <div id="nav-right-item">
            <button id="signin-button" type="button" className="desktop-component btn" style={{ width: "120px" }}>
              Login
            </button>
            <button id="signup-button" type="button" className="desktop-component btn" style={{ width: "120px" }}>
              Register
            </button>
            {/* <!-- Burger Icon --> */}
            <button className="mobile-component btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop">
              <img className="svg-color-tickitz-branding" src="/assets/img/icons/Hamburger_icon.svg" alt="menu" height="54px" />
            </button>
          </div>
        </nav>
        {/* <!-- end nav link --> */}

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
            <img src="/assets/img/banner.png" alt="banner" style={{ width: "100%" }} />
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
                color: "var(--tic-branding-color-middle)",
                fontSize: "16px", fontWeight: 700
              }}> View All</span></a>
            </div>
          </div>
          <div id="now-showing-movie-scroll" className="container movie-scroll text-center">
            <div className="card movie-scroll-card" style={{ borderColor: "#ececec" }}>
              <img
                src="./assets/img/poster/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg"
                className="movie-scroll-card-img" alt="movie" />
              <div className="card-body">
                <h5 className="card-title movie-scroll-title">Openheimer</h5>
                <p className="card-text movie-scroll-genres">
                  History, Action, Thriller
                </p>
                <button type="button" className="btn ">
                  Details
                </button>
              </div>
            </div>
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
                color: "var(--tic-branding-color-middle)",
                fontSize: "16px", fontWeight: 700
              }}>View All</span></a>
            </div>
          </div>

          <div id="months-scroll" className="container months-scroll text-center">
            <button type="button" className="btn months-scroll-item">January</button>
            <button type="button" className="btn months-scroll-item">February</button>
            <button type="button" className="btn months-scroll-item">March</button>
            <button type="button" className="btn months-scroll-item">April</button>
            <button type="button" className="btn months-scroll-item">May</button>
            <button type="button" className="btn months-scroll-item">June</button>
            <button type="button" className="btn months-scroll-item">July</button>
            <button type="button" className="btn months-scroll-item">August</button>
            <button type="button" className="btn months-scroll-item">September</button>
            <button type="button" className="btn months-scroll-item">October</button>
            <button type="button" className="btn months-scroll-item">November</button>
            <button type="button" className="btn months-scroll-item">December</button>
          </div>

          <div id="upcoming-movies-scroll" className="container movie-scroll text-center">
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
          </div>
        </section>
        {/* <!-- end of upcoming movies section --> */}

        {/* <!-- call-to-action movies section --> */}
        <section id="call-to-action">
          <div className="container shadow p-3 mb-5 bg-body-white rounded text-center">

            <p style={{ marginBottom: "-5px" }}>Be the vanguard of the</p>
            <h1>Moviegoers</h1>

            <div id="subcription-email-input" className="d-flex justify-content-center gap-2 my-3 m-auto"
              style={{ height: "fit-content", width: "80%" }}>
              <input style={{ height: "53px", width: "38vh" }} type="email" className="form-control" id="input-email-form"
                placeholder="Type your email" />
              <button style={{ height: "53px", width: "14vh" }} id="input-email" className="btn form-control">Join Now</button>
            </div>

            <p style={{ fontSize: "14px" }}>
              By joining you as a Tickitz member,<br />
              we will always send you the latest updates via email.
            </p>

          </div>
        </section>
        {/* <!-- end of call-to-action movies section --> */}

        <footer className="container my-5">
          <div className="row m-auto">
            <div className="col-md-4 col-xs-12 p-4">
              <img src="./assets/img/logo.svg" alt="logo" style={{ width: "60%" }} />
              <p>
                <span className="footer-item-content">
                  Stop waiting in line. Buy tickets conveniently, watch movies quietly.
                </span>
              </p>
            </div>
            <div className="col-md-2 col-xs-12 p-3">
              <p><span className="footer-item-title">Explore</span></p>
              <p><a href="/#"><span className="footer-item-content">Home</span></a></p>
              <p><a href="/#"><span className="footer-item-content">Movie List</span></a></p>
            </div>
            <div className="col-md-3 col-xs-12 p-3">
              <p><span className="footer-item-title">Our Sponsors</span></p>
              <p>
                <img className="m-2" src="./assets/img/cinemas/ebv.id 2.svg" alt="logo" />
              </p>
              <p>
                <img className="m-2" src="./assets/img/cinemas/CineOne21 2.svg" alt="logo" />
              </p>
              <p>
                <img className="m-2" src="./assets/img/cinemas/hiflix 2.svg" alt="logo" />
              </p>
            </div>
            <div className="col-md-3 col-xs-12 p-3">
              <p><span className="footer-item-title">Follow Us</span></p>
              <p>
                <img className="m-2" src="./assets/img/icons/facebook.svg" alt="logo" />
                <span className="footer-item-content">Tickitz Cinema id</span>
              </p>
              <p>
                <img className="m-2" src="./assets/img/icons/bx_bxl-instagram.svg" alt="logo" />
                <span className="footer-item-content">tickitz.id</span>
              </p>
              <p>
                <img className="m-2" src="./assets/img/icons/twitter.svg" alt="logo" />
                <span className="footer-item-content">tickitz.id</span>
              </p>
              <p>
                <img className="m-2" src="./assets/img/icons/youtube.svg" alt="logo" />
                <span className="footer-item-content">Tickitz Cinema id</span>
              </p>

            </div>
          </div>
          <p className="text-center" style={{ color: "var(--tic-color-muted)" }} >&#169; 2023 Tickitz. All Rights Reserved.</p>
        </footer>

      </main>






    </div>
  );
}

export default App;
