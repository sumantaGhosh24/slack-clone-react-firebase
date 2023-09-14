import {useState, useEffect} from "react";
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";

import {db} from "../firebase";
import {SidebarLists} from "./";

const SidebarChannels = () => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      );
    });

    const myCollectionRef = collection(db, "rooms");
    const myQuery = query(myCollectionRef, orderBy("timestamp", "asc"));
    onSnapshot(myQuery, (snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      );
    });
  }, []);

  return (
    <div className="sidebar__channels">
      {channels.map((channel) => (
        <SidebarLists key={channel.id} title={channel.name} id={channel.id} />
      ))}
    </div>
  );
};

export default SidebarChannels;
