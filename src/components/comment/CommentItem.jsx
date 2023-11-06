import { useEffect, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { FaCommentSlash } from "react-icons/fa";
import moment from "moment";
import { getProfileById } from "../../redux/profile/profileThunk";

const CommentItem = ({ id, comment }) => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.comment);
  const [user, setUser] = useState([]);

  useEffect(()=>{
    if(comment?.userId){
      dispatch(getProfileById(comment?.userId)).unwrap()
      .then((res)=>{
          setUser(res)
      })
    }
},[comment?.userId])
  if (loading) {
    return <div>loading</div>;
  }

  return (
          <div className="bg-white rounded-lg p-4 shadow-md">
            {/* Hiển thị nội dung comment */}
            <div className="flex items-center">
              <img
                    className="w-8 h-8 rounded-full mr-4"
                    src={user? user.avatarUrl : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/1024px-Missing_avatar.svg.png'}
                    alt="User Avatar"
                />
              <div>
                <p className="font-medium">{user.fullName}</p>
                <p className="text-gray-500 text-sm">
                  {moment(comment.createAt).format("DD/MM/YYYY")}
                </p>
              </div>
            </div>
            <p className="mt-2">{comment.description}</p>
          </div>
  );
};

export default CommentItem;
