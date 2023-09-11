// import React from "react";
// import { GoogleLogin } from "react-google-login";

// const GoogleLoginButton = ({ onSuccess, onFailure }) => {
//   const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

//   const handleSuccess = (response) => {
//     console.log("Google login success:", response);
//     // Xử lý đăng nhập thành công ở đây (ví dụ: gửi thông tin đăng nhập lên máy chủ)
//     if (onSuccess) {
//       onSuccess(response);
//     }
//   };

//   const handleError = (error) => {
//     console.error("Google login error:", error);
//     // Xử lý lỗi đăng nhập ở đây (ví dụ: hiển thị thông báo lỗi)
//     if (onFailure) {
//       onFailure(error);
//     }
//   };

//   return (
//     <GoogleLogin
//       clientId={googleClientId}
//       onSuccess={handleSuccess}
//       onFailure={handleError}
//       cookiePolicy={"single_host_origin"}
//       isSignedIn={false}
//     />
//   );
// };

// export default GoogleLoginButton;
