import {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import propTypes from "prop-types";

import {db} from "../firebase";

const ChatInputField = ({channelName, channelId}) => {
  const [userInput, setUserInput] = useState("");
  const [userData, setUserData] = useState({});

  const {user} = useSelector((state) => state.auth);

  useEffect(() => {
    const data = async () => {
      const docSnap = await getDoc(doc(db, "users", user));
      const data = {id: docSnap.id, ...docSnap.data()};
      setUserData(data);
    };
    return () => data();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (channelId) {
      await addDoc(collection(db, "rooms", channelId, "messages"), {
        message: userInput,
        timestamp: serverTimestamp(),
        user: `${userData.firstName} ${userData.lastName}`,
        userId: user,
        userImage: userData.profileImage,
      });
    }
    setUserInput("");
  };

  return (
    <div className="rounded-2xl">
      <form className="flex relative justify-center">
        <input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          type="text"
          placeholder={`Send a message in #${channelName?.toLowerCase()}`}
          className="fixed bottom-8 w-[65%] border border-solid border-gray-800 py-2 px-2 rounded focus:outline-none"
        />
        <button type="submit" onClick={handleSend} className="hidden">
          Send
        </button>
      </form>
    </div>
  );
};

ChatInputField.propTypes = {
  channelName: propTypes.string,
  channelId: propTypes.string,
};

export default ChatInputField;
