import {useState, useEffect} from "react";
import {doc, getDoc} from "firebase/firestore";
import {useSelector} from "react-redux";
import {MdCreate, MdFiberManualRecord} from "react-icons/md";

import {db} from "../firebase";
import {SidebarOptions, ExpandMore, AddMore, SidebarChannels} from "./";

const Sidebar = () => {
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

  return (
    <div className="bg-pink-500 border-t border-solid border-t-pink-600 max-w-[250px] flex-[0.3] text-white max-h-[100vh] overflow-scroll no-scrollbar">
      <div className="flex p-3 border-b border-solid border-b-pink-600 pb-2.5">
        <div className="flex-[1]">
          <h2 className="text-base font-black mb-1.5">Slack Workspace</h2>
          <h3 className="flex items-center font-normal text-sm">
            <MdFiberManualRecord className="text-sm mt-1 mr-1 text-green-600" />
            {`${userData?.firstName} ${userData?.lastName}`}
          </h3>
        </div>
        <MdCreate className="p-2 text-white text-3xl bg-pink-600 rounded-full" />
      </div>
      <SidebarOptions />
      <hr className=" mt-2.5 border border-solid border-pink-600 mb-2.5" />
      <ExpandMore />
      <hr className=" mt-2.5 border border-solid border-pink-600 mb-2.5" />
      <AddMore />
      <SidebarChannels />
    </div>
  );
};

export default Sidebar;
