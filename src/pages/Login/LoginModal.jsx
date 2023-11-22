import React, { useEffect, useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Modal from "../register/Modal";
import Heading from "../register/Heading";
import { useDispatch, useSelector } from "react-redux";
import { login, loginByGoogle } from "../../redux/auth/authThunks";
import useAlert from "../../context/aleart/useAlert";

const LoginModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const { setAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

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


  const onSubmit = async() => {
    try {
      await dispatch(login(account)).unwrap();
      onClose();
    } catch (error) {
      setAlert('Please check email or password!', "error");
    }


  };

  const handleSuccessLogin = async (response) => {
    const token = await response.credential;
       dispatch(loginByGoogle({token: token}))
       
  };

  const handleErrorLogin = (error) => {
    console.log(error)
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Welecome back !" />
      <input
        className="form__input "
        name="email"
        placeholder="Email"
        type="email"
        value={account.email}
        onChange={handleEmail}
      />
      <input
        className="form__input "
        name="password"
        placeholder="Password"
        type="password"
        value={account.password}
        onChange={handlePassword}
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
              <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                <GoogleLogin
                  onSuccess={handleSuccessLogin}
                  onError={handleErrorLogin}
                  style={{ marginTop: "100px" }}
                  cookiePolicy={"single_host_origin"}
                  isSignedIn={true}
                  
                />
              </GoogleOAuthProvider>
      <div className="text-neutral-500 text-center mt-4 font-light">
        <p>
          Already have an account?
          <span
            onClick={onClose}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            {" "}
            Log In
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Login"
      actionLabel="Log In"
      onClose={onClose}
      onSubmit={onSubmit} // Đã không cần () ở đây
      body={bodyContent}
      footer={footerContent}
      // secondaryAction={onSubmit} // (tuỳ chọn) Thêm secondaryAction và secondaryActionLabel nếu bạn muốn
      // secondaryActionLabel="Secondary Action"
    />
  );
};

export default LoginModal;
