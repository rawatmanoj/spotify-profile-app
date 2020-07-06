import React from "react";
import Nav from "../Nav/Nav";
import TopArtists from "../TopArtists/TopArtists";
import TopTracks from "../TopTracks/TopTracks";
import Recent from "../Recent/Recent";
import Playlists from "../Playlists/Playlists";
import Artist from "../Artist/Artist";
import Track from "../Track/Track";
import Playlist from "../Playlist/Playlist";
import Recommendations from "../Recommendations/Recommendations";

import Profile from "../Profile/Profile";
import "./Home.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <BrowserRouter>
        <Nav />

        <Switch>
          <Route path="/" component={Profile} exact />
          <Route path="/artists" component={TopArtists} exact />
          <Route path="/tracks" component={TopTracks} exact />
          <Route path="/recent" component={Recent} exact />
          <Route path="/playlists" component={Playlists} exact />
          <Route path="/artist/:artistId" component={Artist} exact />
          <Route path="/track/:trackId" component={Track} exact />
          <Route path="/playlist/:playlistId" component={Playlist} exact />
          <Route
            path="/Recommendations/:playlistId"
            component={Recommendations}
            exact
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Home;
