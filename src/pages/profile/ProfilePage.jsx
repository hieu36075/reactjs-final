// import { useState } from "react";
import Navbar from "../../layout/navbar/navbar";
// import Header from "../../components/header/Header";
import "./profilePage.css"

export default function ProfilePage() {

  // const [user, setUser] = useState({
  //   name: 'John Doe',
  //   email: 'john.doe@example.com',
  //   age: "1221",
  //   phone: "019230-12"
  // });
  // const { name, email, age, phone } = user;


  return (
    <div>
      <Navbar />
      <div className="profile_content">
        <div className="profile_left">
          <h1>Personal information</h1>
          <div className="info">
            <div className="info_item">
              <h3>Tên pháp lý</h3>
              <h4>Hiếu ngu</h4>
            </div>
            <div className="info_item">
              <h3>Địa chỉ email</h3>
              <h4>Hiếu ngu</h4>
            </div>
            <div className="info_item">
              <h3>Số điện thoại</h3>
              <h4>Hiếu ngu</h4>
            </div>
            <div className="info_item">
              <h3>Giấy tờ tuỳ thân do chính phủ cấp</h3>
              <h4>Hiếu ngu</h4>
            </div>
            <div className="info_item">
              <h3>Địa chỉ</h3>
              <h4>Hiếu ngu</h4>
            </div>
            <div className="info_item">
              <h3>Liên hệ trong trường hợp khẩn cấp</h3>
              <h4>Hiếu ngu</h4>
            </div>
          </div>
          <div className="action">
            <a href="/" onClick={()=>{}}>Chỉnh sửa</a>
            <a href="/" onClick={()=>{}}>Chỉnh sửa</a>
            <a href="/" onClick={()=>{}}>Thêm</a>
            <a href="/" onClick={()=>{}}>Thêm</a>
            <a href="/" onClick={()=>{}}>Chỉnh sửa</a>
            <a href="/" onClick={()=>{}}>Thêm</a>
          </div>
        </div >

        <div className="profile_right">
          <div className="profile_item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <h2>Tại sao thông tin của tôi không được hiển thị ở đây?</h2>
            <p>Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Rerum, error!</p>
              <br />
          </div>
          <div className="profile_item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <h2>Bạn có thể chỉnh sửa những thông tin nào?</h2>
            <p>Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Rerum, error!</p>
          </div>
          <div className="profile_item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h2>Thông tin nào được chia sẽ với người khác?</h2>
            <h5>Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Rerum, error!</h5>
          </div>

        </div>

      </div>

    </div>
  );
}
