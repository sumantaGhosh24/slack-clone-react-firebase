import React, {useState} from "react";
import {Button} from "@material-ui/core";
import firebase from "firebase/compat/app";

import db from "./firebase";
import {useStateValue} from "./StateProvider";

const ChatInput = ({channelName, channelId}) => {
  const [input, setInput] = useState("");
  const [{user}] = useStateValue();

  const sendMessage = (e) => {
    e.preventDefault();

    if (channelId) {
      db.collection("rooms").doc(channelId).collection({
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: user.displayName,
        userImage: user.photoURL,
      });
    }
  };

  return (
    <div className="chatInput">
      <form>
        <input
          placeholder={`Message #${channelName?.toLowerCase()}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" onClick={sendMessage}>
          Send
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
