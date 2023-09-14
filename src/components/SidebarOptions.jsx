import {
  MdApps,
  MdBookmarkBorder,
  MdDrafts,
  MdExpandLess,
  MdFileCopy,
  MdInbox,
  MdInsertComment,
  MdPeopleAlt,
} from "react-icons/md";

import {SidebarLists} from "./";

const SidebarOptions = () => {
  return (
    <div>
      <SidebarLists Icon={MdInsertComment} title="Threads" />
      <SidebarLists Icon={MdInbox} title="Mentions & Reactions" />
      <SidebarLists Icon={MdDrafts} title="Saved items" />
      <SidebarLists Icon={MdBookmarkBorder} title="Channel browser" />
      <SidebarLists Icon={MdPeopleAlt} title="People & User groups" />
      <SidebarLists Icon={MdApps} title="Apps" />
      <SidebarLists Icon={MdFileCopy} title="File browser" />
      <SidebarLists Icon={MdExpandLess} title="Show less" />
    </div>
  );
};

export default SidebarOptions;
