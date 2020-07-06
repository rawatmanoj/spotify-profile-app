import React, { useContext, useEffect, useCallback } from "react";
import "./Playlists.scss";
import { token } from "../../spotify/spotify";
import Spotify from "spotify-web-api-js";
import { Context } from "../../store/store";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
const spotifyWebApi = new Spotify();
const TopPlaylists = () => {
  spotifyWebApi.setAccessToken(token);

  const [state, dispatch] = useContext(Context);

  const fetchPlaylists = useCallback(async () => {
    dispatch({ type: "LOADING", payload: true });
    const res = await spotifyWebApi.getUserPlaylists();

    // console.log(res);

    dispatch({ type: "USER_PLAYLIST", payload: res });
    dispatch({ type: "LOADING", payload: false });
  }, [dispatch]);

  useEffect(() => {
    fetchPlaylists("long_term");
  }, [fetchPlaylists]);

  // console.log(state.userPlaylists);

  return (
    <div className="playlist-container">
      {state.isLoading ? (
        <Spinner />
      ) : (
        <>
          {" "}
          <div className="header-playlists">
            <h1>TopPlaylists</h1>
          </div>
          {state.userPlaylists ? (
            <div className="playlist-lower">
              <div className="playlist">
                {state.userPlaylists.items.map((item, i) => {
                  return (
                    <Link
                      key={i}
                      style={{
                        textDecoration: "inherit",
                        color: "inherit",
                        marginLeft: "2rem",
                        marginRight: "2rem",
                        marginBottom: "8rem",
                      }}
                      to={{ pathname: `/playlist/${item.id}` }}
                    >
                      <div className="playlist-image-container">
                        <img
                          className="playlist-image"
                          src={item.images[0].url}
                          alt="playlist"
                        />
                        <div className="playlist-name">{item.name}</div>
                        <div className="playlist-total-tracks">
                          {item.tracks.total} Tracks
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default TopPlaylists;
