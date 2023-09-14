import {MdAdd} from "react-icons/md";

import {SidebarLists} from "./";

const AddMore = () => {
  return (
    <div>
      <SidebarLists Icon={MdAdd} title="Add Channel" addNewChannel />
    </div>
  );
};

export default AddMore;
