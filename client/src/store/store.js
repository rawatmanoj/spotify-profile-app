import React, { createContext, useReducer } from "react";
import Reducer from "./reducers";

const initialState = {
  error: null,
  user: null,
  followedArtists: null,
  topArtists: null,
  topTracks: null,
  token: "",
  userPlaylists: null,
  range: "long_term",
  recent: null,
  Artist: null,
  Track: null,
  isFollowingArtist: null,
  audioAnalysis: null,
  audioFeatures: null,
  playlistTracks: null,
  playlist: null,
  recommendations: null,
  playlistChart: null,
  isLoading: false,
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
