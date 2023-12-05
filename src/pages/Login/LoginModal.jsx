import React, { useEffect, useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Modal from "../register/Modal";
import Heading from "../register/Heading";
import { useDispatch, useSelector } from "react-redux";
import { login, loginByGoogle } from "../../redux/auth/authThunks";

const LoginModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    login: "", 
  });

  const handleEmail = (e) => {
    setAccount((prev) => {
      return { ...prev, email: e.target.value };
    });
    setErrors((prev) => ({ ...prev, email: "" }));
  };

  const handlePassword = (e) => {
    setAccount((prev) => {
      return { ...prev, password: e.target.value };
    });
    setErrors((prev) => ({ ...prev, password: "" }));
  };

  const validateInputs = () => {
    let isValid = true;
    const newErrors = {};

    if (!account.email.trim()) {
      newErrors.email = "Please enter your email.";
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(account.email)) {
      newErrors.email = "Invalid email address.";
      isValid = false;
    }

    if (!account.password.trim()) {
      newErrors.password = "Please enter your password.";
      isValid = false;
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));

    return isValid;
  };

  const onSubmit = async () => {
    if (validateInputs()) {
      try {
        await dispatch(login(account)).unwrap();
        onClose();
      } catch (error) {
        setErrors((prev) => ({ ...prev, login: "Email or password is incorrect." }));


        setTimeout(() => {
          setErrors((prev) => ({ ...prev, login: "" }));
        }, 5000);
      }
    }
  };

  const handleSuccessLogin = async (response) => {
    const token = await response.credential;
    dispatch(loginByGoogle({ token: token }));
  };

  const handleErrorLogin = (error) => {
    console.log(error);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to TravelVietNam" subtitle="Welcome back!" />
      <input
        className="form__input "
        name="email"
        placeholder="Email"
        type="email"
        value={account.email}
        onChange={handleEmail}
      />
      {errors.email && <p className="text-red-500">{errors.email}</p>}
      <input
        className="form__input "
        name="password"
        placeholder="Password"
        type="password"
        value={account.password}
        onChange={handlePassword}
      />
      {errors.password && <p className="text-red-500">{errors.password}</p>}
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleSuccessLogin}
          onError={handleErrorLogin}
          style={{ marginTop: "100px" }}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
        </div>
      </GoogleOAuthProvider>
      {errors.login && <p className="text-red-500">{errors.login}</p>}
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
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
