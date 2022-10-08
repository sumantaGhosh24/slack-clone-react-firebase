import React from "react";
import {Avatar} from "@material-ui/core";
import {AccessTime, Help, Search} from "@material-ui/icons";

import {useStateValue} from "./StateProvider";

const Header = () => {
  const [{user}] = useStateValue();

  return (
    <div className="header">
      <div className="header__left">
        <Avatar
          className="header__avatar"
          alt={user?.displayName}
          src={user?.photoURL}
        />
        <AccessTime />
      </div>
      <div className="header__search">
        <Search />
        <input type="text" placeholder="search something" />
      </div>
      <div className="header__right">
        <Help />
      </div>
    </div>
  );
};

export default Header;
