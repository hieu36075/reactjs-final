import React from 'react';
import './confirmationPaymentPage.css'; 
/* eslint-disable jsx-a11y/anchor-is-valid */
const ConfirmationPaymentPage = () => {
  // const bookingInfo = {
  //   checkInDate: '2023-08-15',
  //   checkOutDate: '2023-08-20',
  //   totalNights: 5,
  //   totalPrice: 250,
  //   rooms: [
  //     {
  //       id: 1,
  //       name: 'Deluxe Room',
  //       price: 50,
  //       imageUrl: 'https://placeimg.com/200/200/arch',
  //     },
  //     {
  //       id: 2,
  //       name: 'Suite Room',
  //       price: 100,
  //       imageUrl: 'https://placeimg.com/200/200/nature',
  //     },
  //   ],
  // };

  return (
    <div >
      <div className='payment'>
        <div className='title'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
          </svg>
          <h1>Xác nhận và thanh toán</h1>
        </div>
        <div className='item1'>
          <div>
            <h4>Giá thấp hơn.</h4>
            <p>Những ngày bạn chọn có giá thấp hơn $121 so với mức giá trung bình theo đêm trong 60 ngày qua.</p>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
            </svg>
          </div>

        </div>
        <div className='item2'>
          <h2>Chuyến đi của bạn</h2>
          <div className='item'>
            <div>
              <h4>Ngày</h4>
              <p>Ngày 13 - Ngày 18 tháng 8</p>
            </div>
            <div>
              <a href="#">Chỉnh sửa</a>
            </div>
          </div>
          <div className='item'>
            <div>
              <h4>khách</h4>
              <p>1 khách</p>
            </div>
            <div>
              <a href="#">Chỉnh sửa</a>
            </div>
          </div>
        </div>
        <div className='item3'>
          <h2>Thanh toán bằng</h2>
          <input type="text" />
        </div>
        <div className='item4'>
          <h2>Bắt buộc cho chuyến đi của bạn</h2>
          <div className='item'>
            <div>
              <h4>Số điện thoại </h4>
              <p>Thêm và xác nhận số điện thoại của bạn để nhận thông tin cập nhật về chuyến đi.</p>
            </div>
            <div>
              <button>Thêm</button>
            </div>
          </div>
        </div>
        <div className='item5'>
          <h2>Chính sách huỷ</h2>
          <p>Đặt phòng/ đặt chỗ này không được hoàn tiền. <a href="">Tìm hiểu thêm</a></p>
        </div>
        <div className='item6'>
          <h2>Quy chuẩn chung</h2>
          <p>Chúng tôi yêu cầu tất cả khách phải ghi nhớ một số quy chuẩn đơn giản để làm một vị khách tuyệt vời.</p>
          <ul>
            <li className='list'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Tuân thủ nội quy nhà.</li>
            <li className='list'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Giữ gìn ngôi nhà như thể đó là nhà bạn.</li>
          </ul>
        </div>
        <div className='item7'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, saepe voluptates quo in explicabo ducimus natus quam, ut, necessitatibus quidem modi. Illo ab et iure ipsa doloribus tempora perspiciatis facere.</p>
          <button>Submit</button>
        </div>
      </div>
      <div className='payment_detail'>
        <div className='payment_item1'>
          <div>
            <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/ed/95/07/limak-eurasia-luxury.jpg?w=700&h=-1&s=1" alt="" />
          </div>
          <div className='payment_title'>
            <h2>Toàn bộ căn hộ cho thuê</h2>
            <p>Căn hộ studio đáng yêu với tầm nhìn view rộng từ ban công.</p>
          </div>
        </div>
        <div className='payment_item2'>
          <h2>Chi tiết giá</h2>
          <div className='payment_item'>
              <div>
                <h3>$81,46 x 5 đêm</h3>
              </div>
              <div>
                <p>$407,29</p>
              </div>
          </div>
          <div className='payment_item'>
              <div>
                <h3>Phí vệ sinh</h3>
              </div>
              <div>
                <p>$54,45</p>
              </div>
          </div>
          <div className='payment_item'>
              <div>
                <h3>Phí dịch vụ</h3>
              </div>
              <div>
                <p>$65,19</p>
              </div>
          </div>
          <div className='border_payment'></div>
          <div className='payment_item'>
              <div>
                <h4>Tổng</h4>
              </div>
              <div>
                <p>$526,93</p>
              </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ConfirmationPaymentPage;
