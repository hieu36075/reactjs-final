import io from 'socket.io-client';

const currentToken = localStorage.getItem('token')
const socket = io('http://localhost:3500', {
  transportOptions: {
    polling: {
      extraHeaders: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  }
});
 // Thay đổi URL thành máy chủ socket của bạn

export default socket;