import { useState } from "react";
import { useDispatch } from "react-redux"
import './login.scss'
import { login, loginByGoogle } from "../../context/auth/authThunks";
import {  useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

export default function Login(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [account, setAccount] = useState({
      email: "",
      password: "",
    });
 
    
    const handleSuccessLogin = async (response) => {
      const token = await response.credential;
         dispatch(loginByGoogle({token: token}))
      // const { isValid, error } = decodeTokenAndCheckExpiration(token);
  
      // if (isValid) {
      //   dispatch(
      //     loginByGoogleAccountAction({
      //       token: token,
      //     })
      //   );
      // } else {
      //   dispatch(showSnackbar(error));
      // }
    };
  
    const handleErrorLogin = (error) => {
      console.log(error)
      // dispatch(showSnackbar(error));
    };

    // const [isSignIn, setIsSignIn] = useState(true);

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


    const handleSubmit = async() => {
        await dispatch(login(account))

        navigate("/")
    };
    return(
      <div className="login-main">
      <div className="rightside" >
          <h2 className="form_title title">Sign in to Website</h2>
          <div className="form__icons">
            <i className="fab fa-facebook-f form__icon" />
            <i className="fab fa-twitter form__icon" />
            <i className="fab fa-instagram form__icon" />
            <i className="fab fa-google form__icon" />
          </div>
          <span className="form__span">or use your email account</span>
          <input className="form__input" type="text" placeholder="Email" value={account.email} onChange={handleEmail}/>
          <input className="form__input" type="password" placeholder="Password" value={account.password} onChange={handlePassword}/>
          {/* <a className="form__link">Forgot your password?</a> */}
          <button className="form__button button submit" onClick={handleSubmit}>SIGN IN</button>
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
    )
}
