import {addDoc, collection} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import propTypes from "prop-types";

import {db} from "../firebase";

const SidebarLists = ({Icon, title, id, addNewChannel}) => {
  const navigate = useNavigate();

  const addChannel = async () => {
    const newChannelName = prompt("Enter new channel: ");
    if (newChannelName) {
      await addDoc(collection(db, "rooms"), {name: newChannelName});
    } else {
      prompt("Channel cannot be empty");
    }
  };

  const selectChannel = () => {
    if (id) {
      navigate(`/room/${id}`);
    } else {
      navigate(title.toLowerCase());
    }
  };

  return (
    <div
      className="flex items-center text-xs cursor-pointer p-1 hover:bg-pink-600 bg-opacity-90"
      onClick={addNewChannel ? addChannel : selectChannel}
    >
      {Icon && (
        <Icon className="pt-1 pr-2.5 pb-2.5 pl-2.5 text-4xl items-center" />
      )}
      {Icon ? (
        <h3 className="text-base font-medium">{title}</h3>
      ) : (
        <h3 className="py-2 px-0 text-base">
          <span className="p-3 text-2xl">#</span>
          {title}
        </h3>
      )}
    </div>
  );
};

SidebarLists.propTypes = {
  Icon: propTypes.any,
  title: propTypes.string,
  id: propTypes.string,
  addNewChannel: propTypes.any,
};

export default SidebarLists;
