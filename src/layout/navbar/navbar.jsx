import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./css/navbar.css";
import { GiAirplaneDeparture } from "react-icons/gi";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { NavLink } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { getNoticationById } from "../../redux/notification/notificationThunks";
import RegisterModal from "../../pages/register/Register";
import { logOut } from "../../redux/auth/authSlice";
import LoginModal from "../../pages/login/LoginModal";
import useLoginModal from "../../context/modal/useLoginModal";
import useRegisterModal from "../../context/modal/useRegisterModal";
import socket from "../../services/socket";
import { GrNotification } from "react-icons/gr"
import { BiLogoMessenger } from "react-icons/bi"
import { closeLogin, closeRegister, openLogin, openRegister } from "../../redux/modal/modalSlice";

function Navbar({ type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [socketInitialized, setSocketInitialized] = useState(false);
  const [notificationsLoaded, setNotificationsLoaded] = useState(false);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const { data, loading } = useSelector((state) => state.notification);
  const [notifications, setNotifications] = useState([]);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal(); 
  const tokenNew = useSelector((state) => state.auth.token)
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [decode, setDecode] = useState('')
  useEffect(() => {

    if (isLogin) {
      if (tokenNew?.length > 0) {
        setToken(tokenNew)
        setDecode(jwtDecode(tokenNew))
      } else {
        setDecode(jwtDecode(localStorage.getItem('token')))
      }
    }
  }, [tokenNew, isLogin])

  // useEffect(()=>{

  // },[])
  const openLoginModal = () => {
    dispatch(openLogin())
  };

  const closeLoginModal = () => {
dispatch(closeLogin())  };

  const openRegisterModal = () => {
dispatch(openRegister())
  };

  const closeRegisterModal = () => {
dispatch(closeRegister())  };


  useEffect(() => {
    if (!notificationsLoaded && isLogin) {
      dispatch(getNoticationById());
      setNotificationsLoaded(true);
    }

    if (data && isLogin) {
      setNotifications(data);
    }
  }, [dispatch, notificationsLoaded, data, isLogin]);

  useEffect(() => {
    if (isLogin && !socketInitialized && decode) {
      socket.emit("join", decode.id);
      socket.on("ping", () => {
        socket.emit("pong", { timestamp: new Date() });
      });

      setSocketInitialized(true);
      return () => {
        socket.emit("leave", decode.id);
      };
    }
  }, [isLogin, notifications, socketInitialized, token]);

  useEffect(() => {
    if (socketInitialized) {
      socket.on("notification", (data) => {
        setNotifications((prevNotifications) => [data, ...prevNotifications]);
      });
    }
  }, [socketInitialized]);

  const [scrolling, setScrolling] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const handleLogOut = () => {
    dispatch(logOut());
  };
  const handleNotification = (action, id) => {
    switch (action) {
      case "action_booking_hotel":
        navigate(`/account/bill/${id}`);
        break;
      case "action_view_booking_hotel":
        navigate(`/account/managerDashboard/${id}`);
        break;
      case "action_create_hotel":
        navigate(`/hotels/details/${id}`);
        break;

      default:
        console.log("Unknown action:", action);
    }
  };
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav
          className={`navbar ${scrolling ? "scrolled" : ""} ${type === "home" ? "navbar-home-custom" : ""
            }`}
        >
          <div className="navbar-container container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <GiAirplaneDeparture className="navbar-icon" />
              Travel
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>

              {!isLogin ? (
                <>

                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        "nav-links" + (isActive ? " activated" : "")
                      }
                      onClick={openLoginModal}
                    >
                      Login
                    </NavLink>
                  </li>
                  <LoginModal
                    isOpen={loginModal.isOpen}
                    onClose={closeLoginModal}
                  />
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        "nav-links" + (isActive ? " activated" : "")
                      }
                      onClick={openRegisterModal}
                    >
                      Register
                    </NavLink>
                  </li>
                  <RegisterModal
                    isOpen={registerModal.isOpen}
                    onClose={closeRegisterModal}
                  />
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      to={decode.roles === 'User' ? "/account/profile" : "/account/myHotel"}
                      className={({ isActive }) =>
                        "nav-links" + (isActive ? " activated" : "")
                      }
                      onClick={closeMobileMenu}
                    >
                      {decode.roles === 'User' ? (
                        'Accommodation for rent'
                      ) : ('Manager Hotel')}
                    </NavLink>
                  </li>
                  <li className="nav-item noti">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 "
                      style={{ color: "white", margin: "28px 20px 0 0px" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                      />
                    </svg>
                    <div className="noti-content h-96">
                      <h1 className="border-b-2 ">Thong Bao</h1>
                      {loading ? (
                        <p>Loading...</p>
                      ) : (
                        <>
                          {notifications?.length > 0 ? (
                            notifications?.map((item) => (
                              <div
                                key={item.id}
                                className="noti-item ml-2 mr-2 rounded-lg "
                                onClick={() => {
                                  handleNotification(item.action, item.actionId);
                                }}
                              >
                                <p>{item.data}</p>
                              </div>
                            ))
                          ) : (
                            <div className="flex flex-col h-96 justify-center items-center">
                              <GrNotification className="" size={80} />
                              <h1 className="font-normal">Don't have notification </h1>
                            </div>
                          )}
                        </>
                      )
                      }
                    </div>
                  </li>

                  <li className="mr-4 pt-7 h-full hover:border-b-2 border-customBlue ">
                    <Link to='/account/message'>
                      <BiLogoMessenger size={24} />
                    </Link>
                  </li>
                  <li className="nav-item profile ">
                    <div className="flex rounded-2xl gap-2">

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                        style={{ color: "white", margin: "28px 0 0" }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span style={{ color: "white", margin: "28px 0 0 0" }}>
                        Tai Khoan
                      </span>
                    </div>
                    <div class="profile-content text-center">
                      <a
                        class="flex items-center"
                        onClick={() => {
                          navigate("/account/profile");
                        }}
                      >
                        <div className="flex ">

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                            />
                          </svg>

                          <span className="spann ">Profile</span>
                        </div>

                      </a>

                      <a
                        onClick={() => {
                          navigate("/account/myBooking");
                        }}
                      >
                        My order
                      </a>
                      {decode.roles === 'Hotel Owner'
                        ?
                        <a
                          onClick={() => {
                            navigate("/account/myHotel");
                          }}
                        >
                          My Hotel
                        </a>

                        :
                        ''
                      }
                      <a onClick={() => handleLogOut()}>Log Out</a>
                    </div>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
      <Outlet />
    </>
  );
}

export default Navbar;
