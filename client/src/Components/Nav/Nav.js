import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faUser,
  faMicrophone,
  faMusic,
  faHistory,
  faListUl,
} from "@fortawesome/free-solid-svg-icons";

import "./Nav.scss";
const Nav = () => {
  const inputEl = useRef(null);
  return (
    <div className="nav-container">
      <div className="navbar">
        <div ref={inputEl} className="nav-button-container">
          <Link className="nav-button" to={{ pathname: `/` }}>
            <div>
              <FontAwesomeIcon color="white" icon={faUser} />
              <div className="nav-name"> Profile</div>
            </div>
          </Link>
        </div>
        <div className="nav-button-container">
          <Link className="nav-button" to={{ pathname: `/artists` }}>
            <div>
              <FontAwesomeIcon color="white" icon={faMicrophone} />
              <div className="nav-name"> Artists</div>
            </div>
          </Link>
        </div>
        <div className="nav-button-container">
          <Link className="nav-button" to={{ pathname: `/tracks` }}>
            <div>
              <FontAwesomeIcon color="white" icon={faMusic} />
              <div className="nav-name"> Tracks</div>
            </div>
          </Link>
        </div>
        <div className="nav-button-container">
          <Link className="nav-button" to={{ pathname: `/recent` }}>
            <div>
              <FontAwesomeIcon color="white" icon={faHistory} />
              <div className="nav-name"> Recent</div>
            </div>
          </Link>
        </div>
        <div className="nav-button-container">
          <Link className="nav-button" to={{ pathname: `/playlists` }}>
            <div>
              <FontAwesomeIcon color="white" icon={faListUl} />
              <div className="nav-name"> Playlists</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
