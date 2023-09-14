import {doc, getDoc} from "firebase/firestore";
import {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {MdAccessTime, MdSearch, MdHelpOutline} from "react-icons/md";

import {db} from "../firebase";
import {Avatar} from "./";

const Header = () => {
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
    <div className="flex items-center justify-between py-1.5 px-0 bg-pink-500 text-white">
      <div className="flex items-center flex-[0.3] ml-5">
        <Avatar
          alt={`${userData?.firstName} ${userData?.lastName}`}
          src={userData?.profileImage}
        />
        <MdAccessTime className="mt-0 mr-8 mb-0 ml-auto" />
      </div>
      <div className="flex-[0.4] bg-pink-700 text-center flex py-0 px-12 text-gray-600 border border-solid border-gray-600 rounded-md">
        <MdSearch />
        <input
          type="text"
          placeholder="Search on slack clone"
          className="bg-transparent border-none text-center min-w-[35vw] text-white"
        />
      </div>
      <div className="flex-[0.3] flex items-end">
        <MdHelpOutline className="mr-5 ml-auto" />
      </div>
    </div>
  );
};

export default Header;
