import {doc, getDoc} from "firebase/firestore";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {MdAccessTime, MdSearch} from "react-icons/md";
import {FaSignOutAlt} from "react-icons/fa";

import {db} from "../firebase";
import {Avatar} from "./";
import {logout} from "../features/auth/authSlice";

const Header = () => {
  const [userData, setUserData] = useState({});

  const {user} = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const data = async () => {
      const docSnap = await getDoc(doc(db, "users", user));
      const data = {id: docSnap.id, ...docSnap.data()};
      setUserData(data);
    };
    return () => data();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex items-center justify-between py-1.5 px-0 bg-pink-500 text-white">
      <div className="flex items-center flex-[0.3] ml-5">
        <Avatar
          alt={`${userData?.firstName} ${userData?.lastName}`}
          src={userData?.profileImage}
        />
        <MdAccessTime className="mt-0 mr-8 mb-0 ml-auto text-2xl" />
      </div>
      <div className="flex-[0.4] items-center bg-pink-700 text-center flex py-2 px-4 text-gray-600 border border-solid border-gray-200 rounded-md">
        <MdSearch className="text-white text-2xl" />
        <input
          type="text"
          placeholder="Search on slack clone"
          className="bg-transparent border-none text-center min-w-[35vw] text-white focus:outline-none focus:border-none"
        />
      </div>
      <div className="flex-[0.3] flex items-end">
        <FaSignOutAlt
          className="mr-5 ml-auto text-2xl cursor-pointer"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Header;
