import propTypes from "prop-types";

const Message = ({message, timestamp, user, userImage}) => {
  return (
    <div className="flex items-center p-5">
      <img
        src={userImage}
        alt="user"
        className="h-[50px] w-[50px] object-contain"
      />
      <div className="pl-2.5">
        <h4>
          {user}{" "}
          <span className="text-gray-800 font-light text-xs">
            {new Date(timestamp?.toDate()).toUTCString}
          </span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
};

Message.propTypes = {
  message: propTypes.string,
  timestamp: propTypes.string,
  user: propTypes.string,
  userImage: propTypes.string,
};

export default Message;
