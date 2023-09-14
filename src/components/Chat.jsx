import {useState, useEffect} from "react";
import {collection, doc, onSnapshot, orderBy, query} from "firebase/firestore";
import {useParams} from "react-router-dom";
import {MdOutlineStarBorder, MdInfoOutline} from "react-icons/md";

import {db} from "../firebase";
import {ChatInputField, Message} from "./";

const Chat = () => {
  const [roomName, setRoomName] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);
  const {roomId} = useParams();

  useEffect(() => {
    if (roomId) {
      onSnapshot(doc(db, "rooms", roomId), (doc) => {
        setRoomName(doc.data());
      });
    }

    const myCollectionRef = collection(db, "rooms", roomId, "messages");
    const myQuery = query(myCollectionRef, orderBy("timestamp", "asc"));
    onSnapshot(myQuery, (snapshot) => {
      setRoomMessages(snapshot.docs.map((doc) => doc.data()));
    });
  }, [roomId]);

  return (
    <div className="flex-[0.7] flex-grow overflow-y-scroll pb-[150px]">
      <div className="flex items-center justify-between p-3.5 border-b border-solid border-b-gray-200">
        <div>
          <h4 className="lowercase">
            <strong className="text-base"># {roomName?.name}</strong>
            <MdOutlineStarBorder className="ml-2.5 text-lg" />
          </h4>
        </div>
        <div>
          <p className="flex items-center text-sm">
            <MdInfoOutline className="!mr-1.5 text-base" /> Details
          </p>
        </div>
      </div>
      <div>
        {roomMessages.map((el) => (
          <Message
            key={el.timestamp}
            message={el.message}
            timestamp={el.timestamp}
            user={el.user}
            userImage={el.userImage}
          />
        ))}
      </div>
      <ChatInputField channelName={roomName?.name} channelId={roomId} />
    </div>
  );
};

export default Chat;
