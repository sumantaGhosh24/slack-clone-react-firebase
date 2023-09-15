import {useSelector} from "react-redux";
import moment from "moment";
import propTypes from "prop-types";

const Message = ({message, timestamp, user, userId, userImage}) => {
  const {user: myId} = useSelector((state) => state.auth);

  const date = timestamp?.toDate().toDateString();

  return (
    <div className={`flex my-2 mx-2 ${myId === userId && "justify-end"}`}>
      <div
        className={`flex items-center p-5 rounded ${
          myId === userId ? "bg-pink-500" : "bg-pink-300"
        }`}
      >
        <img
          src={userImage}
          alt="user"
          className="h-[50px] w-[50px] object-cover rounded-full"
        />
        <div className="pl-2.5">
          <h4>
            <span className="font-bold">{user} </span>
            <span
              className={`font-light text-xs ml-5 ${
                myId === userId ? "text-white" : "text-gray-800"
              }`}
            >
              {moment(date).format("DD/MM/YYYY")}
            </span>
          </h4>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

Message.propTypes = {
  message: propTypes.string,
  timestamp: propTypes.string,
  user: propTypes.string,
  userId: propTypes.string,
  userImage: propTypes.string,
};

export default Message;
