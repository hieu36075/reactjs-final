import { useState } from "react";


const CommentItem = ({data}) => {
    const initialVisibleComments = data.slice(0, 6);

    // State để quản lý số lượng comment hiển thị
    const [visibleComments, setVisibleComments] = useState(initialVisibleComments);
  
    // State để quản lý việc hiển thị popup xem tất cả comment
    const [showAllComments, setShowAllComments] = useState(false);
  
    // Hàm xử lý khi click vào nút "Hiển thị thêm"
    const handleShowMoreComments = () => {
        setVisibleComments(data); // Đặt visibleComments thành toàn bộ danh sách data (tất cả bình luận)
        setShowAllComments(true); // Hiển thị popup
      };
  
    // Hàm xử lý khi click vào nút "Đóng" trong popup
    const handleCloseAllComments = () => {
        setVisibleComments(initialVisibleComments); // Đặt visibleComments thành danh sách ban đầu được cắt giới hạn 6 comment
        setShowAllComments(false); // Ẩn popup
      };
    
    const renderAllComments = () => {
      return (
          <div className="bg-blackOverlay fixed inset-0 z-50 flex justify-center items-center">
          <div className="max-h-[80vh] m-20 overflow-y-auto bg-white rounded-lg p-4 shadow-md w-4/5 max-w-3xl max-h-4/5 relative">
            <button
              onClick={handleCloseAllComments}
              className="bg-blue-500 text-white px-4 py-2 rounded-full absolute top-4 left-4 "
            >
              Đóng
            </button>
            <div className="max-h-[80vh]">
              <h2 className="font-semibold text-2xl mb-4 text-center mb-5">Tất cả bình luận</h2>
              {visibleComments?.map((comment) => (
                <div key={comment.id} className="bg-white rounded-lg p-4 shadow-md mb-4">
                  {/* Hiển thị nội dung comment */}
                  <div className="flex items-center">
                    <img
                      className="w-8 h-8 rounded-full mr-4"
                      src="url_to_user_avatar"
                      alt="User Avatar"
                    />
                    <div>
                      <p className="font-medium">{comment.author}</p>
                      <p className="text-gray-500 text-sm">{comment.date}</p>
                    </div>
                  </div>
                  <p className="mt-2">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    };

    return (
        <div className="mt-8">
                    
        <h2 className="font-semibold text-2xl">Comments & Reviews</h2>
        <div className="mt-8 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
        <p className="font-semibold mr-4">
            Rating: 10 / 5
        </p>
        <p className="font-semibold">
            Total Comments: 150
        </p>
    </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibleComments?.map((comment) => (
            <div key={comment.id} className="bg-white rounded-lg p-4 shadow-md">
                {/* Hiển thị nội dung comment */}
                <div className="flex items-center">
                <img
                    className="w-8 h-8 rounded-full mr-4"
                    src="url_to_user_avatar"
                    alt="User Avatar"
                />
                <div>
                    <p className="font-medium">{comment.author}</p>
                    <p className="text-gray-500 text-sm">{comment.date}</p>
                </div>
                </div>
                <p className="mt-2">{comment.content}</p>
            </div>
            ))}
        </div>
        <div className="text-center">
            {!showAllComments && (
            <button
                onClick={handleShowMoreComments}
                className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4 block mx-auto"
            >
                Hiển thị thêm
            </button>
            )}
        </div>
        {showAllComments && renderAllComments()} {/* Hiển thị popup khi showAllComments = true */}
        </div>
    );
  };
  
  export default CommentItem;