import React, { useState } from "react";
import Modal from "./Modal";
import Heading from "./Heading";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import useLoginModal from "../../context/modal/useLoginModal";
import useRegisterModal from "../../context/modal/useRegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/auth/authThunks";
import { closeRegister, openLogin } from "../../redux/modal/modalSlice";

const RegisterModal = ({ onClose }) => {
  const registerModal = useRegisterModal();
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const open = useSelector((state) => state.modal.register)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    userName: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateStep1 = () => {
    const errors = {};

    if (formData.firstName.trim() === "") {
      errors.firstName = "First name is required.";
    }

    if (formData.lastName.trim() === "") {
      errors.lastName = "Last name is required.";
    }

    if (formData.phoneNumber.trim() === "") {
      errors.phoneNumber = "Phone number is required.";
    }

    if (formData.userName.trim() === "") {
      errors.userName = "User name is required.";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors = {};

    if (formData.email.trim() === "") {
      errors.email = "Email is required.";
    }

    if (formData.password.trim() === "") {
      errors.password = "Password is required.";
    }

    if (confirmPassword.trim() === "") {
      errors.confirmPassword = "Confirm Password is required.";
    }

    if (formData.password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const onSubmit = (data) => {
    if (currentStep === 1) {
      if (!validateStep1()) {
        return;
      }
    }
    if (currentStep === 2) {
      if (!validateStep2()) {
        return;
      }
      dispatch(register(formData))
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log("Logged in with Google:", response);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleCloseModal = () => {
    dispatch(closeRegister())
    dispatch(openLogin())
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col gap-4">
            <Heading title="Welcome to TravelVietNam" subtitle="Create an account!" />
            <div className="flex flex-row gap-4">
              <input
                className={`form__input ${validationErrors.firstName ? "border-red-500" : ""}`}
                name="firstName"
                type="text"
                placeholder="first name"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              {validationErrors.firstName && (
                <div className="text-red-500 text-sm">{validationErrors.firstName}</div>
              )}
              <input
                className={`form__input ${validationErrors.lastName ? "border-red-500" : ""}`}
                name="lastName"
                type="text"
                placeholder="last name"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              {validationErrors.lastName && (
                <div className="text-red-500 text-sm">{validationErrors.lastName}</div>
              )}
            </div>
            <input
              className={`form__input ${validationErrors.userName ? "border-red-500" : ""}`}
              name="userName"
              type="text"
              placeholder="User Name"
              value={formData.userName}
              onChange={handleInputChange}
            />
            {validationErrors.userName && (
              <div className="text-red-500 text-sm">{validationErrors.userName}</div>
            )}

            <input
              className={`form__input ${validationErrors.phoneNumber ? "border-red-500" : ""}`}
              name="phoneNumber"
              type="text"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
            {validationErrors.phoneNumber && (
              <div className="text-red-500 text-sm">{validationErrors.phoneNumber}</div>
            )}

          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-4">
            <input
              className={`form__input ${validationErrors.email ? "border-red-500" : ""}`}
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {validationErrors.email && (
              <div className="text-red-500 text-sm">{validationErrors.email}</div>
            )}
            <input
              className={`form__input ${validationErrors.password ? "border-red-500" : ""}`}
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {validationErrors.password && (
              <div className="text-red-500 text-sm">{validationErrors.password}</div>
            )}
            <input
              className={`form__input ${validationErrors.confirmPassword ? "border-red-500" : ""}`}
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            {validationErrors.confirmPassword && (
              <div className="text-red-500 text-sm">{validationErrors.confirmPassword}</div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <div className="flex justify-center">
          <GoogleLogin
            className="mt-16 w-full"
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
            onSuccess={handleGoogleLoginSuccess}
          />
        </div>
      </GoogleOAuthProvider>
      <div className="text-neutral-500 text-center mt-4 font-light">
        <p>
          Already have an account?
          <span
            onClick={handleCloseModal}
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
      isOpen={open}
      title="Register"
      actionLabel={currentStep === 2 ? "Submit" : "Next"}
      onClose={onClose}
      onSubmit={onSubmit}
      body={renderStep()}
      footer={footerContent}
      secondaryAction={currentStep > 1 ? handleBack : null}
      secondaryActionLabel="Back"
    />
  );
};

export default RegisterModal;
