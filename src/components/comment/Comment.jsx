import { useEffect, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getAllCommentByHotelId, getCommentByHotelId } from "../../redux/comment/commentThunks";
import CommentItem from "./CommentItem";

const Comment = ({ id }) => {
  const dispatch = useDispatch();
  const comment = useSelector((state) => state.comment.data)
  const allComment = useSelector((state) => state.comment.total)
  const data = comment.slice(0, 6);
  const [showAllComments, setShowAllComments] = useState(false);
  const [description, setDescription] = useState('');
  const { isLogin } = useSelector((state) => state.auth)
  useEffect(() => {
    dispatch(getCommentByHotelId({ id: id, page: 1, perPage: 6 }))
    dispatch(getAllCommentByHotelId({ id: id }))
  }, [dispatch, id]);


  const handleShowMoreComments = () => {
    setShowAllComments(true);
  };

  const handleCloseAllComments = () => {
    setShowAllComments(false);
  };

  const addNewComment = () => {
    try {
      dispatch(addComment({ description: description, hotelId: id }))
      setDescription('')
    } catch {
      console.log('error')
    }

  }
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
            {allComment?.map((comment) => (
              <div className="mt-4">
                <CommentItem comment={comment} key={comment.id} />
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
          Total Comments: {comment?.length}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {data?.map((item) => (
          <CommentItem id={id} comment={item} key={item?.id} />
        ))}
      </div>
      {!isLogin ? '' :
        <div className="mt-10 mb-10 relative">
          <textarea
            type="text"
            className="border rounded-lg p-2 h-20"
            placeholder="Commnet in here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="absolute bottom-8 right-2 bg-blue-500 text-white rounded-full p-2"
            onClick={() => { addNewComment() }}
          >
            <BsFillSendFill className="text-2xl" />
          </button>
        </div>
      }
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
      {showAllComments && renderAllComments()}

    </div>
  );
};

export default Comment;
