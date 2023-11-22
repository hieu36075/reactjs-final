import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import './login.scss'
import {  useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { login, loginByGoogle } from "../../redux/auth/authThunks";
import useAlert from "../../context/aleart/useAlert";
export default function Login(){
  const { setAlert } = useAlert();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [account, setAccount] = useState({
      email: "",
      password: "",
    });
    
    const{ error} = useSelector(state => state.auth)

    const isLogin = useSelector((state) => state.auth.isLogin);
    const handleSuccessLogin = async (response) => {
      const token = await response.credential;
         dispatch(loginByGoogle({token: token}))
    };
  
    const handleErrorLogin = (error) => {
      console.log(error)
    };



    const handleEmail = (e) =>{
        setAccount((preV) => {
          return{...preV, email: e.target.value}
      })
    }

    const handlePassword = (e) =>{
      setAccount((preV) => {
          return{...preV, password: e.target.value}
      })
    }

    useEffect(() => {
      if (isLogin ) {
        setAlert("Login success!", "success");
      }
      if (error) {
        setAlert('Please check email or password!', "error");
      }


    }, [isLogin, error, navigate]);

    const handleSubmit = async() => {
      dispatch(login(account))
    };

    return(
      <div className="login-main">
      <div className="login__content">
      <div className="leftside">
            <div className="login__text">
              <h2>Welcome HieuNgu</h2>
              <p>Create your account. <br /> It's totally free</p>
              <br />
              <a href="#" className="button"> Sign Up</a>
            </div>
      </div>
    <div className="rightside" >
        <h2 className="form_title title">Sign in</h2>
        <input className="form__input" type="text" placeholder="Email" value={account.email} onChange={handleEmail}/>
        <br />
        <input className="form__input" type="password" placeholder="Password" value={account.password} onChange={handlePassword}/>
        {/* <a className="form__link">Forgot your password?</a> */}
        <br />
        <button className="form__button button submit" onClick={handleSubmit}>SIGN IN</button>
        <p className="form__span">Use your email account</p>
        <div className="form__google">
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                <GoogleLogin
                  onSuccess={handleSuccessLogin}
                  onError={handleErrorLogin}
                  style={{ marginTop: "100px" }}
                  cookiePolicy={"single_host_origin"}
                  isSignedIn={true}
                  
                />
              </GoogleOAuthProvider>
        </div>
    </div>
      </div>
  </div>
    )
}
