import {useState, useEffect} from "react";
import {collection, onSnapshot, query} from "firebase/firestore";

import {db} from "../firebase";
import {SidebarLists} from "./";

const SidebarChannels = () => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "rooms"));
    onSnapshot(q, (querySnapshot) => {
      const rooms = [];
      querySnapshot.forEach((doc) => {
        rooms.push({id: doc.id, name: doc.data().name});
        setChannels(rooms);
      });
    });
  }, []);

  return (
    <div>
      {channels.map((channel) => (
        <SidebarLists key={channel.id} title={channel.name} id={channel.id} />
      ))}
    </div>
  );
};

export default SidebarChannels;
