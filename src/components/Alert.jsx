import {FaTimes} from "react-icons/fa";
import propTypes from "prop-types";
import {useState} from "react";

const Alert = ({message}) => {
  const [open, setOpen] = useState(true);

  const alertClass = `py-2 text-sm capitalize px-5 mb-5 rounded-md flex items-center justify-between bg-pink-500 text-white cursor-pointer ${
    !open && "hidden"
  }`;

  return (
    <div className={alertClass}>
      <p>{message}</p>
      <FaTimes onClick={() => setOpen(!open)} />
    </div>
  );
};

Alert.propTypes = {
  message: propTypes.string,
};

export default Alert;
